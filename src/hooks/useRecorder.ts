/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef, useState, useCallback } from "react";
import axios from "axios";

export type RecorderState =
  | "idle"
  | "requesting"
  | "recording"
  | "stopped"
  | "uploading"
  | "done"
  | "error";

interface UseRecorderReturn {
  state: RecorderState;
  error: string;
  uploadProgress: number;
  startRecording: () => Promise<boolean>;
  stopAndUpload: (attemptId: string) => Promise<string | null>;
}

const IS_DEV = process.env.NODE_ENV === "development";

export function useRecorder(): UseRecorderReturn {
  const [state, setState] = useState<RecorderState>("idle");
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async (): Promise<boolean> => {
    setState("requesting");
    setError("");
    chunksRef.current = [];

    try {
      // ── Screen share — this is the stream we record directly ──
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 15 },
        audio: true,
      });
      screenStreamRef.current = screenStream;

      // ── Webcam — optional in dev, required in prod ─────────
      // We don't merge into canvas anymore — just log webcam status
      try {
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("[useRecorder] webcam available");
      } catch (webcamErr: any) {
        if (IS_DEV) {
          console.warn(
            "[useRecorder] No webcam in dev, screen only:",
            webcamErr?.message
          );
        } else {
          screenStream.getTracks().forEach((t) => t.stop());
          throw new Error(
            "Webcam access is required. Please connect a camera and allow access."
          );
        }
      }

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : MediaRecorder.isTypeSupported("video/webm")
        ? "video/webm"
        : "video/mp4";

      console.log(
        "[useRecorder] starting MediaRecorder with mimeType:",
        mimeType
      );

      // ── Record screenStream directly — no canvas, no merging ──
      const recorder = new MediaRecorder(screenStream, {
        mimeType,
        videoBitsPerSecond: 1_000_000,
      });

      recorder.ondataavailable = (e) => {
        console.log(
          `[useRecorder] ondataavailable fired, size: ${e.data?.size}`
        );
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
          console.log(
            `[useRecorder] chunk saved: ${(e.data.size / 1024).toFixed(
              1
            )}KB, total chunks: ${chunksRef.current.length}`
          );
        }
      };

      recorder.onerror = (e) => {
        console.error("[useRecorder] recorder error:", e);
        setError("Recording error occurred.");
        setState("error");
      };

      screenStream.getVideoTracks()[0].onended = () => {
        console.log("[useRecorder] screen share ended by user");
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
          setState("stopped");
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(1000);
      console.log("[useRecorder] recording started, mimeType:", mimeType);
      setState("recording");
      return true;
    } catch (err: any) {
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      const msg: string = err?.message ?? "Could not start recording";
      console.error("[useRecorder] startRecording error:", msg);

      if (
        msg.includes("Permission denied") ||
        msg.includes("NotAllowedError")
      ) {
        setError(
          "Permission denied. Please allow screen access and try again."
        );
      } else if (
        msg.includes("NotFoundError") ||
        msg.includes("Requested device not found")
      ) {
        setError(
          IS_DEV
            ? "No camera found. In production a webcam is required."
            : "Webcam not found. Please connect a camera and allow access."
        );
      } else {
        setError(msg);
      }

      setState("error");
      return false;
    }
  }, []);

  const stopAndUpload = useCallback(
    async (attemptId: string): Promise<string | null> => {
      console.log("[useRecorder] stopAndUpload called, attemptId:", attemptId);
      const recorder = mediaRecorderRef.current;

      if (!recorder) {
        console.error("[useRecorder] no recorder ref!");
        setError("No recorder found.");
        return null;
      }

      console.log("[useRecorder] recorder.state before stop:", recorder.state);

      if (recorder.state !== "inactive") {
        await new Promise<void>((resolve) => {
          const finalChunks: Blob[] = [];

          recorder.ondataavailable = (e) => {
            console.log(
              `[useRecorder] final ondataavailable, size: ${e.data?.size}`
            );
            if (e.data && e.data.size > 0) {
              finalChunks.push(e.data);
              console.log(
                `[useRecorder] final chunk saved: ${(
                  e.data.size / 1024
                ).toFixed(1)}KB`
              );
            }
          };

          recorder.onstop = () => {
            chunksRef.current = [...chunksRef.current, ...finalChunks];
            console.log(
              "[useRecorder] stopped. existing chunks:",
              chunksRef.current.length - finalChunks.length,
              "final chunks:",
              finalChunks.length,
              "total:",
              chunksRef.current.length
            );
            resolve();
          };

          recorder.stop();
        });
      }

      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      mediaRecorderRef.current = null;
      setState("stopped");

      const totalSize = chunksRef.current.reduce((s, c) => s + c.size, 0);
      console.log(
        `[useRecorder] final — chunks: ${chunksRef.current.length}, total: ${(
          totalSize /
          1024 /
          1024
        ).toFixed(2)}MB`
      );

      if (chunksRef.current.length === 0) {
        console.error("[useRecorder] no chunks! recording was empty.");
        setError("No recording data captured.");
        setState("error");
        return null;
      }

      const mimeType = recorder.mimeType || "video/webm";
      const ext = mimeType.includes("mp4") ? "mp4" : "webm";
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const file = new File([blob], `recording-${attemptId}.${ext}`, {
        type: mimeType,
      });

      console.log(
        `[useRecorder] uploading: ${file.name}, ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB`
      );

      setState("uploading");
      setUploadProgress(0);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("attemptId", attemptId);

        console.log(
          "[useRecorder] firing axios POST /api/v1/attempts/upload-recording"
        );

        const res = await axios.post(
          "/api/v1/attempts/upload-recording",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 10 * 60 * 1000,
            onUploadProgress: (e) => {
              if (e.total) {
                const pct = Math.round((e.loaded * 100) / e.total);
                setUploadProgress(pct);
                console.log(`[useRecorder] upload progress: ${pct}%`);
              }
            },
          }
        );

        const recordingUrl = res.data?.recordingUrl;
        console.log("[useRecorder] upload SUCCESS:", recordingUrl);
        setState("done");
        return recordingUrl;
      } catch (err: any) {
        const status = err?.response?.status;
        const msg =
          err?.response?.data?.error ?? err?.message ?? "Upload failed";
        console.error(
          `[useRecorder] upload FAILED — status: ${status}, msg: ${msg}`
        );
        setError(`Upload failed: ${msg}`);
        setState("error");
        return null;
      }
    },
    []
  );

  return { state, error, uploadProgress, startRecording, stopAndUpload };
}
