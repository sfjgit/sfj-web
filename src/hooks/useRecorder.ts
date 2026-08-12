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
  const webcamStreamRef = useRef<MediaStream | null>(null);
  // keep video elements in refs so they're never GC'd
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const webcamVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);

  const startRecording = useCallback(async (): Promise<boolean> => {
    setState("requesting");
    setError("");
    chunksRef.current = [];

    try {
      // ── 1. Screen share ────────────────────────────────────
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 15 },
        audio: true,
      });
      screenStreamRef.current = screenStream;

      // ── 2. Webcam — optional in dev, required in prod ──────
      let webcamStream: MediaStream | null = null;
      try {
        webcamStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, frameRate: 15 },
          audio: true,
        });
        webcamStreamRef.current = webcamStream;
        console.log("[useRecorder] webcam acquired");
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

      // ── 3. Canvas setup ────────────────────────────────────
      const canvas = document.createElement("canvas");
      canvas.width = 1280;
      canvas.height = 720;
      canvasRef.current = canvas;
      const ctx = canvas.getContext("2d")!;

      // screen video
      const screenVideo = document.createElement("video");
      screenVideo.srcObject = screenStream;
      screenVideo.muted = true;
      screenVideo.autoplay = true;
      screenVideoRef.current = screenVideo;
      // must append to DOM to keep alive in some browsers
      screenVideo.style.position = "fixed";
      screenVideo.style.opacity = "0";
      screenVideo.style.pointerEvents = "none";
      screenVideo.style.top = "-9999px";
      document.body.appendChild(screenVideo);
      await screenVideo.play();

      // webcam video
      let webcamVideo: HTMLVideoElement | null = null;
      if (webcamStream) {
        webcamVideo = document.createElement("video");
        webcamVideo.srcObject = webcamStream;
        webcamVideo.muted = true;
        webcamVideo.autoplay = true;
        webcamVideoRef.current = webcamVideo;
        webcamVideo.style.position = "fixed";
        webcamVideo.style.opacity = "0";
        webcamVideo.style.pointerEvents = "none";
        webcamVideo.style.top = "-9999px";
        document.body.appendChild(webcamVideo);
        await webcamVideo.play();
      }

      // ── 4. Draw loop ───────────────────────────────────────
      drawingRef.current = true;
      const drawFrame = () => {
        if (!drawingRef.current) return;
        // full screen
        ctx.drawImage(screenVideo, 0, 0, 1280, 720);
        // webcam PiP — bottom right, rounded corners
        if (webcamVideo && webcamVideo.readyState >= 2) {
          const pw = 240; // pip width
          const ph = 180; // pip height
          const px = 1280 - pw - 16;
          const py = 720 - ph - 16;
          const r = 12;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(px + r, py);
          ctx.lineTo(px + pw - r, py);
          ctx.quadraticCurveTo(px + pw, py, px + pw, py + r);
          ctx.lineTo(px + pw, py + ph - r);
          ctx.quadraticCurveTo(px + pw, py + ph, px + pw - r, py + ph);
          ctx.lineTo(px + r, py + ph);
          ctx.quadraticCurveTo(px, py + ph, px, py + ph - r);
          ctx.lineTo(px, py + r);
          ctx.quadraticCurveTo(px, py, px + r, py);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(webcamVideo, px, py, pw, ph);
          ctx.restore();

          // border around PiP
          ctx.save();
          ctx.strokeStyle = "rgba(255,255,255,0.8)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(px + r, py);
          ctx.lineTo(px + pw - r, py);
          ctx.quadraticCurveTo(px + pw, py, px + pw, py + r);
          ctx.lineTo(px + pw, py + ph - r);
          ctx.quadraticCurveTo(px + pw, py + ph, px + pw - r, py + ph);
          ctx.lineTo(px + r, py + ph);
          ctx.quadraticCurveTo(px, py + ph, px, py + ph - r);
          ctx.lineTo(px, py + r);
          ctx.quadraticCurveTo(px, py, px + r, py);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(drawFrame);
      };
      drawFrame();

      // ── 5. Audio — merge screen + webcam ──────────────────
      const audioCtx = new AudioContext();
      const dest = audioCtx.createMediaStreamDestination();

      const screenAudio = screenStream.getAudioTracks();
      const webcamAudio = webcamStream?.getAudioTracks() ?? [];
      if (screenAudio.length > 0)
        audioCtx
          .createMediaStreamSource(new MediaStream(screenAudio))
          .connect(dest);
      if (webcamAudio.length > 0)
        audioCtx
          .createMediaStreamSource(new MediaStream(webcamAudio))
          .connect(dest);

      // ── 6. Final merged stream ─────────────────────────────
      const canvasStream = canvas.captureStream(15);
      const mergedStream = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);

      // ── 7. MediaRecorder ───────────────────────────────────
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : MediaRecorder.isTypeSupported("video/webm")
        ? "video/webm"
        : "video/mp4";

      const recorder = new MediaRecorder(mergedStream, {
        mimeType,
        videoBitsPerSecond: 1_000_000,
      });

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
          console.log(
            `[useRecorder] chunk: ${(e.data.size / 1024).toFixed(
              1
            )}KB, total: ${chunksRef.current.length}`
          );
        }
      };

      recorder.onerror = (e) => {
        console.error("[useRecorder] recorder error:", e);
        drawingRef.current = false;
        setError("Recording error occurred.");
        setState("error");
      };

      screenStream.getVideoTracks()[0].onended = () => {
        console.log("[useRecorder] screen share ended");
        drawingRef.current = false;
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
          setState("stopped");
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(1000);
      console.log(
        "[useRecorder] recording started with canvas PiP, mimeType:",
        mimeType
      );
      setState("recording");
      return true;
    } catch (err: any) {
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      webcamStreamRef.current?.getTracks().forEach((t) => t.stop());
      const msg: string = err?.message ?? "Could not start recording";
      console.error("[useRecorder] startRecording error:", msg);

      if (
        msg.includes("Permission denied") ||
        msg.includes("NotAllowedError")
      ) {
        setError(
          "Permission denied. Please allow screen and camera access and try again."
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

      // stop draw loop
      drawingRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      const recorder = mediaRecorderRef.current;
      if (!recorder) {
        setError("No recorder found.");
        return null;
      }

      console.log("[useRecorder] recorder.state:", recorder.state);

      if (recorder.state !== "inactive") {
        await new Promise<void>((resolve) => {
          const finalChunks: Blob[] = [];

          recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
              finalChunks.push(e.data);
              console.log(
                `[useRecorder] final chunk: ${(e.data.size / 1024).toFixed(
                  1
                )}KB`
              );
            }
          };

          recorder.onstop = () => {
            chunksRef.current = [...chunksRef.current, ...finalChunks];
            console.log(
              `[useRecorder] stopped. total chunks: ${chunksRef.current.length}`
            );
            resolve();
          };

          recorder.stop();
        });
      }

      // cleanup — stop all tracks + remove hidden video elements
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      webcamStreamRef.current?.getTracks().forEach((t) => t.stop());
      if (screenVideoRef.current) {
        document.body.removeChild(screenVideoRef.current);
        screenVideoRef.current = null;
      }
      if (webcamVideoRef.current) {
        document.body.removeChild(webcamVideoRef.current);
        webcamVideoRef.current = null;
      }
      mediaRecorderRef.current = null;
      setState("stopped");

      const totalSize = chunksRef.current.reduce((s, c) => s + c.size, 0);
      console.log(
        `[useRecorder] chunks: ${chunksRef.current.length}, size: ${(
          totalSize /
          1024 /
          1024
        ).toFixed(2)}MB`
      );

      if (chunksRef.current.length === 0) {
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
        `[useRecorder] uploading: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      );

      setState("uploading");
      setUploadProgress(0);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("attemptId", attemptId);

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
                console.log(`[useRecorder] upload: ${pct}%`);
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
