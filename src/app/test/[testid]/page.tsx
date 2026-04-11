/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Send,
  Video,
  ShieldAlert,
  Upload,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const publicApi = axios.create({ baseURL: "/api/v1" });

type QuestionType = "MCQ" | "MULTI" | "LONG_TEXT" | "CODING";

interface Option {
  id: string;
  text: string;
  order: number;
}
interface Question {
  id: string;
  type: QuestionType;
  text: string;
  marks: number;
  language?: string;
  order: number;
  options: Option[];
}
interface AttemptAnswer {
  questionId: string;
  selectedOptionIds: string[];
  textAnswer?: string;
}
type PageState =
  | "gate"
  | "instructions"
  | "test"
  | "upload_recording"
  | "done"
  | "expired"
  | "maxed";

export default function TestPage() {
  const { testid: testId } = useParams<{ testid: string }>();
  const searchParams = useSearchParams();

  const applicationId = searchParams.get("appId") ?? undefined;
  const prefillName = searchParams.get("name")
    ? decodeURIComponent(searchParams.get("name")!)
    : "";
  const prefillEmail = searchParams.get("email")
    ? decodeURIComponent(searchParams.get("email")!)
    : "";
  const cameFromApply = !!(applicationId && prefillName && prefillEmail);

  const [page, setPage] = useState<PageState>("gate");

  // Gate
  const [name, setName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [phone, setPhone] = useState("");
  const [gateError, setGateError] = useState("");
  const [gateLoading, setGateLoading] = useState(false);

  // Attempt
  const [attemptId, setAttemptId] = useState("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [testDuration, setTestDuration] = useState(30);
  const [answers, setAnswers] = useState<Record<string, AttemptAnswer>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [recordingConfirmed, setRecordingConfirmed] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Recording upload
  const [recordingFile, setRecordingFile] = useState<File | null>(null);
  const [recordingLink, setRecordingLink] = useState("");
  const [uploadingRecording, setUploadingRecording] = useState(false);
  const [recordingUploadDone, setRecordingUploadDone] = useState(false);
  const [recordingError, setRecordingError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // ── Auto start if came from apply ─────────────────────────
  useEffect(() => {
    if (cameFromApply && testId) {
      startAttempt(prefillName, prefillEmail, undefined);
    }
  }, [testId]);

  // ── Timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (page !== "test" || !expiresAt) return;
    const tick = setInterval(() => {
      const left = Math.max(
        0,
        Math.floor((expiresAt.getTime() - Date.now()) / 1000)
      );
      setTimeLeft(left);
      if (left === 0) {
        clearInterval(tick);
        handleSubmit(true);
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [page, expiresAt]);

  // ── Start attempt ─────────────────────────────────────────
  async function startAttempt(n: string, e: string, p?: string) {
    if (!testId) {
      setGateError("Test ID missing — please use the link sent to you.");
      return;
    }
    setGateLoading(true);
    setGateError("");
    try {
      const res = await publicApi.post("/attempts/start", {
        testId,
        candidateName: n.trim(),
        candidateEmail: e.trim(),
        candidatePhone: p?.trim() || undefined,
        applicationId,
      });
      const { attemptId: aid, expiresAt: exp } = res.data;
      setAttemptId(aid);
      setExpiresAt(new Date(exp));

      const attempt = await publicApi
        .get(`/attempts/${aid}`)
        .then((r) => r.data);
      const qs: Question[] = attempt.test.questions.sort(
        (a: Question, b: Question) => a.order - b.order
      );
      setQuestions(qs);
      setTestTitle(attempt.test.title);
      setTestDescription(attempt.test.description ?? "");
      setTestDuration(attempt.test.duration);

      const restored: Record<string, AttemptAnswer> = {};
      for (const ans of attempt.answers ?? []) {
        restored[ans.questionId] = {
          questionId: ans.questionId,
          selectedOptionIds: ans.selectedOptionIds ?? [],
          textAnswer: ans.textAnswer ?? undefined,
        };
      }
      setAnswers(restored);
      setTimeLeft(
        Math.max(0, Math.floor((new Date(exp).getTime() - Date.now()) / 1000))
      );
      setPage("instructions");
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? "Something went wrong";
      if (msg.includes("Max attempts")) setPage("maxed");
      else setGateError(msg);
    } finally {
      setGateLoading(false);
    }
  }

  async function handleGateSubmit() {
    if (!name.trim() || !email.trim()) {
      setGateError("Name and email are required");
      return;
    }
    await startAttempt(name, email, phone);
  }

  // ── Save answer ───────────────────────────────────────────
  const saveAnswer = useCallback(
    async (
      questionId: string,
      selectedOptionIds: string[],
      textAnswer?: string
    ) => {
      if (!attemptId) return;
      try {
        await publicApi.post(`/attempts/${attemptId}/answer`, {
          questionId,
          selectedOptionIds,
          textAnswer: textAnswer ?? null,
        });
      } catch {
        /* silent */
      }
    },
    [attemptId]
  );

  function handleOptionSelect(question: Question, optionId: string) {
    setAnswers((prev) => {
      const existing = prev[question.id] ?? {
        questionId: question.id,
        selectedOptionIds: [],
      };
      const newSelected =
        question.type === "MCQ"
          ? [optionId]
          : existing.selectedOptionIds.includes(optionId)
          ? existing.selectedOptionIds.filter((id) => id !== optionId)
          : [...existing.selectedOptionIds, optionId];
      saveAnswer(question.id, newSelected, existing.textAnswer);
      return {
        ...prev,
        [question.id]: { ...existing, selectedOptionIds: newSelected },
      };
    });
  }

  function handleTextChange(question: Question, value: string) {
    setAnswers((prev) => {
      const existing = prev[question.id] ?? {
        questionId: question.id,
        selectedOptionIds: [],
      };
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        saveAnswer(question.id, existing.selectedOptionIds, value);
      }, 800);
      return { ...prev, [question.id]: { ...existing, textAnswer: value } };
    });
  }

  // ── Submit → go to recording upload ──────────────────────
  async function handleSubmit(auto = false) {
    if (submitting) return;
    if (
      !auto &&
      !confirm("Submit test? You cannot change answers after submitting.")
    )
      return;
    setSubmitting(true);
    try {
      await publicApi.post(`/attempts/${attemptId}/submit`);
    } catch {
      /* ignore — move forward anyway */
    } finally {
      setSubmitting(false);
      setPage("upload_recording");
    }
  }

  // ── Upload recording ──────────────────────────────────────
  async function handleRecordingUpload() {
    if (!recordingFile && !recordingLink.trim()) {
      setRecordingError("Please upload a file or paste your Zoom cloud link.");
      return;
    }
    setUploadingRecording(true);
    setRecordingError("");
    try {
      if (recordingFile) {
        const formData = new FormData();
        formData.append("file", recordingFile);
        formData.append("attemptId", attemptId);
        await publicApi.post("/attempts/upload-recording", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            if (e.total)
              setUploadProgress(Math.round((e.loaded * 100) / e.total));
          },
        });
      } else {
        await publicApi.patch(`/attempts/${attemptId}/recording-link`, {
          recordingUrl: recordingLink.trim(),
        });
      }
      setRecordingUploadDone(true);
      setPage("done");
    } catch (err: any) {
      setRecordingError(
        err?.response?.data?.error ?? "Upload failed. Please try again."
      );
    } finally {
      setUploadingRecording(false);
    }
  }

  function handleSkipRecording() {
    if (
      !confirm(
        "Skipping will mean your application is not considered. Are you sure?"
      )
    )
      return;
    setPage("done");
  }

  // ── Computed ──────────────────────────────────────────────
  const currentQ = questions[currentIdx];
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;
  const answeredCount = Object.keys(answers).filter((qId) => {
    const a = answers[qId];
    return (
      a.selectedOptionIds.length > 0 || (a.textAnswer?.trim() ?? "").length > 0
    );
  }).length;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeWarning = timeLeft < 300;

  // ════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════

  if (page === "maxed")
    return (
      <CenteredCard>
        <AlertTriangle size={36} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-zinc-900 mb-2">
          Max Attempts Reached
        </h2>
        <p className="text-sm text-zinc-500">
          You've already used all allowed attempts for this test.
        </p>
      </CenteredCard>
    );

  if (page === "done")
    return (
      <CenteredCard>
        <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-zinc-900 mb-2">
          {recordingUploadDone ? "All Done! 🎉" : "Test Submitted"}
        </h2>
        <p className="text-sm text-zinc-500 text-center leading-relaxed">
          {recordingUploadDone
            ? "Your test and recording have been submitted. The hiring team will review and get back to you."
            : "Your test was submitted but no recording was provided. Your application may not be considered."}
        </p>
      </CenteredCard>
    );

  // Loading spinner while auto-starting from apply
  if (page === "gate" && cameFromApply)
    return (
      <CenteredCard>
        <div className="w-10 h-10 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-medium text-zinc-900">
          Loading your test...
        </p>
      </CenteredCard>
    );

  // ── Gate ─────────────────────────────────────────────────
  if (page === "gate")
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 w-full max-w-md shadow-sm">
          <div className="mb-6">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12h6M9 16h4" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-zinc-900">Screening Test</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Enter your details to begin
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-zinc-500">Full Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="mt-1 h-10"
                onKeyDown={(e) => e.key === "Enter" && handleGateSubmit()}
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-500">Email Address *</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="mt-1 h-10"
                onKeyDown={(e) => e.key === "Enter" && handleGateSubmit()}
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-500">Phone (optional)</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="mt-1 h-10"
                onKeyDown={(e) => e.key === "Enter" && handleGateSubmit()}
              />
            </div>
            {gateError && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {gateError}
              </p>
            )}
            <Button
              className="w-full mt-2"
              onClick={handleGateSubmit}
              disabled={gateLoading}
            >
              {gateLoading ? "Verifying..." : "Continue →"}
            </Button>
          </div>
        </div>
      </div>
    );

  // ── Instructions ─────────────────────────────────────────
  if (page === "instructions")
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-2xl shadow-sm overflow-hidden">
          <div className="bg-zinc-950 text-white px-8 py-6">
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">
              Screening Assessment
            </p>
            <h1 className="text-xl font-bold">{testTitle}</h1>
            <div className="flex items-center gap-4 mt-3 text-xs text-zinc-400">
              <span>⏱ {testDuration} minutes</span>
              <span>📝 {questions.length} questions</span>
              <span>💾 Auto-saved</span>
            </div>
          </div>

          <div className="px-8 py-6 space-y-5">
            {/* Step flow */}
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-zinc-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold shrink-0">
                1
              </span>
              <span className="font-medium text-zinc-700">
                Start Zoom recording
              </span>
              <span className="text-zinc-300 mx-1">→</span>
              <span className="bg-zinc-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold shrink-0">
                2
              </span>
              <span className="font-medium text-zinc-700">Complete test</span>
              <span className="text-zinc-300 mx-1">→</span>
              <span className="bg-zinc-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold shrink-0">
                3
              </span>
              <span className="font-medium text-zinc-700">
                Upload recording
              </span>
            </div>

            {/* Recording requirement */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Video size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    📹 Zoom Recording is Mandatory
                  </p>
                  <p className="text-xs text-blue-800 leading-relaxed mb-2">
                    Start a <strong>Zoom meeting</strong> and record your screen
                    + webcam <strong>before</strong> clicking "Start Test".
                    After submitting, you will upload the recording file or
                    paste the Zoom cloud link.
                    <strong>
                      {" "}
                      Applications without a valid recording will not be
                      reviewed.
                    </strong>
                  </p>
                  <a
                    href="https://support.zoom.us/hc/en-us/articles/201362473-Local-recording"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-700 underline"
                  >
                    How to record in Zoom <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
                Test Rules
              </p>
              <div className="space-y-2">
                <InfoRow
                  icon="⏱"
                  label={`You have ${testDuration} minutes. Timer starts when you click "Start Test" and cannot be paused.`}
                />
                <InfoRow
                  icon="🔁"
                  label="Answers are saved automatically. Do not worry about losing progress."
                />
                <InfoRow
                  icon="🚫"
                  label="Do not close, refresh, or switch tabs during the test."
                />
                <InfoRow
                  icon="📵"
                  label="No phones, no external help, no assistance from others."
                />
                <InfoRow
                  icon="🤖"
                  label="Do not use ChatGPT, Copilot, or any AI tools."
                />
                <InfoRow
                  icon="📹"
                  label="Your face and screen must be visible throughout the Zoom recording."
                />
              </div>
            </div>

            {/* Anti-cheat */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert
                  size={18}
                  className="text-red-600 shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-1">
                    ⚠️ Strict Anti-Cheating Policy
                  </p>
                  <p className="text-xs text-red-800 leading-relaxed">
                    Sharing, reproducing, or distributing any test question in
                    any form is a <strong>serious violation</strong>. Candidates
                    found sharing questions, using unauthorized assistance, or
                    engaging in any form of dishonesty will be{" "}
                    <strong>immediately disqualified</strong> and{" "}
                    <strong>permanently banned</strong> from applying to our
                    company for a minimum of <strong>3 years</strong>. Legal
                    action may be pursued under applicable intellectual property
                    and confidentiality laws.
                  </p>
                </div>
              </div>
            </div>

            {testDescription && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                  Additional Instructions
                </p>
                <p className="text-sm text-zinc-700 whitespace-pre-wrap">
                  {testDescription}
                </p>
              </div>
            )}

            {/* Confirm checkbox */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={recordingConfirmed}
                onChange={(e) => setRecordingConfirmed(e.target.checked)}
                className="mt-0.5 rounded"
              />
              <span className="text-sm text-zinc-700">
                I have started my Zoom screen + webcam recording and I agree to
                all the rules above. I understand that failing to upload my
                recording will disqualify my application.
              </span>
            </label>

            <Button
              className="w-full"
              disabled={!recordingConfirmed}
              onClick={() => setPage("test")}
            >
              {recordingConfirmed
                ? "Start Test →"
                : "Confirm recording above to continue"}
            </Button>
          </div>
        </div>
      </div>
    );

  // ── Upload Recording ──────────────────────────────────────
  if (page === "upload_recording")
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-lg shadow-sm overflow-hidden">
          <div className="bg-zinc-950 text-white px-8 py-6">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <p className="text-xs font-medium text-emerald-400">
                Test submitted successfully
              </p>
            </div>
            <h1 className="text-xl font-bold">Upload Your Zoom Recording</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Last step — mandatory to complete your application
            </p>
          </div>

          <div className="px-8 py-6 space-y-5">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
              ⚠️ <strong>Stop your Zoom recording now</strong> if you haven't
              already, then upload the file below. Applications without a
              recording will not be reviewed.
            </div>

            {/* File upload */}
            <div>
              <Label className="text-xs font-semibold text-zinc-700 mb-1 block">
                Option 1 — Upload recording file (MP4/MOV)
              </Label>
              <p className="text-xs text-zinc-400 mb-2">
                Export from Zoom and upload directly.
              </p>
              <input
                type="file"
                accept="video/*,.mp4,.mov,.avi,.webm"
                onChange={(e) => {
                  setRecordingFile(e.target.files?.[0] ?? null);
                  setRecordingLink("");
                }}
                className="w-full text-xs text-zinc-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-zinc-900 file:text-white hover:file:bg-zinc-700 cursor-pointer"
              />
              {recordingFile && (
                <p className="text-xs text-emerald-600 mt-1.5">
                  ✓ {recordingFile.name} (
                  {(recordingFile.size / 1024 / 1024).toFixed(1)} MB)
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-zinc-200" />
              <span className="text-xs text-zinc-400">or</span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>

            {/* Cloud link */}
            <div>
              <Label className="text-xs font-semibold text-zinc-700 mb-1 block">
                Option 2 — Paste Zoom cloud recording link
              </Label>
              <p className="text-xs text-zinc-400 mb-2">
                Set the link to <strong>public / anyone with link</strong>{" "}
                before pasting.
              </p>
              <Input
                value={recordingLink}
                onChange={(e) => {
                  setRecordingLink(e.target.value);
                  setRecordingFile(null);
                }}
                placeholder="https://zoom.us/rec/share/..."
                className="h-9 text-sm font-mono"
              />
            </div>

            {/* Progress bar */}
            {uploadingRecording && uploadProgress > 0 && (
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2">
                  <div
                    className="bg-zinc-900 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {recordingError && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {recordingError}
              </p>
            )}

            <Button
              className="w-full gap-2"
              onClick={handleRecordingUpload}
              disabled={
                uploadingRecording || (!recordingFile && !recordingLink.trim())
              }
            >
              <Upload size={15} />
              {uploadingRecording
                ? `Uploading... ${uploadProgress}%`
                : "Submit Recording"}
            </Button>

            <button
              onClick={handleSkipRecording}
              className="w-full text-xs text-zinc-400 hover:text-zinc-600 underline py-1 transition-colors"
            >
              I don't have a recording (my application will not be considered)
            </button>
          </div>
        </div>
      </div>
    );

  // ── Test ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50">
      <div
        className={`sticky top-0 z-20 border-b px-6 py-3 flex items-center justify-between shadow-sm ${
          timeWarning ? "bg-red-50 border-red-200" : "bg-white border-zinc-200"
        }`}
      >
        <div>
          <p className="text-xs text-zinc-400">
            Question {currentIdx + 1} of {questions.length}
          </p>
          <p className="text-sm font-semibold text-zinc-900 truncate max-w-xs">
            {testTitle}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Zoom recording in progress
          </div>
          <div
            className={`flex items-center gap-1.5 text-sm font-mono font-bold ${
              timeWarning ? "text-red-600" : "text-zinc-700"
            }`}
          >
            <Clock size={15} />
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
          <Button
            size="sm"
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="gap-1.5"
          >
            <Send size={13} />
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {currentQ && (
            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {currentIdx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-zinc-400">
                      {currentQ.type === "MCQ"
                        ? "Single correct answer"
                        : currentQ.type === "MULTI"
                        ? "Select all that apply"
                        : currentQ.type === "CODING"
                        ? `Coding — ${currentQ.language ?? "any language"}`
                        : "Long answer"}
                    </span>
                    <span className="text-xs text-zinc-400">
                      · {currentQ.marks} mark{currentQ.marks !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="text-base text-zinc-900 font-medium leading-relaxed">
                    {currentQ.text}
                  </p>
                </div>
              </div>

              {(currentQ.type === "MCQ" || currentQ.type === "MULTI") && (
                <div className="space-y-2">
                  {currentQ.options.map((opt) => {
                    const selected =
                      currentAnswer?.selectedOptionIds.includes(opt.id) ??
                      false;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionSelect(currentQ, opt.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                          selected
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
                        }`}
                      >
                        <span
                          className={`inline-flex w-5 h-5 mr-3 rounded-full border items-center justify-center text-xs shrink-0 ${
                            selected
                              ? "border-white bg-white text-zinc-900"
                              : "border-zinc-300"
                          }`}
                        >
                          {currentQ.type === "MCQ"
                            ? selected
                              ? "●"
                              : ""
                            : selected
                            ? "✓"
                            : ""}
                        </span>
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQ.type === "LONG_TEXT" && (
                <Textarea
                  value={currentAnswer?.textAnswer ?? ""}
                  onChange={(e) => handleTextChange(currentQ, e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[160px] text-sm resize-y"
                />
              )}

              {currentQ.type === "CODING" && (
                <div>
                  {currentQ.language && (
                    <p className="text-xs text-zinc-400 mb-2 font-mono">
                      Language: {currentQ.language}
                    </p>
                  )}
                  <Textarea
                    value={currentAnswer?.textAnswer ?? ""}
                    onChange={(e) => handleTextChange(currentQ, e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    placeholder={`Write your ${
                      currentQ.language ?? "code"
                    } here...\n\n// Note: paste is disabled`}
                    className="min-h-[240px] text-sm resize-y font-mono bg-zinc-950 text-emerald-400 border-zinc-800 focus:border-zinc-600"
                    spellCheck={false}
                  />
                  <p className="text-xs text-zinc-400 mt-1.5">
                    ⚠️ Copy-paste is disabled for coding questions
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => i - 1)}
                  className="gap-1"
                >
                  <ChevronLeft size={14} /> Previous
                </Button>
                <span className="text-xs text-zinc-400">
                  {answeredCount} / {questions.length} answered
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentIdx === questions.length - 1}
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className="gap-1"
                >
                  Next <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 sticky top-20">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
              Questions
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((q, idx) => {
                const ans = answers[q.id];
                const answered =
                  (ans?.selectedOptionIds?.length ?? 0) > 0 ||
                  (ans?.textAnswer?.trim() ?? "").length > 0;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-full aspect-square rounded-lg text-xs font-semibold transition-all ${
                      currentIdx === idx
                        ? "bg-zinc-900 text-white"
                        : answered
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 space-y-1 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" />{" "}
                Answered
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-zinc-100" /> Unanswered
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-zinc-900" /> Current
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <p className="text-xs font-semibold text-red-700">
                Zoom Recording Active
              </p>
            </div>
            <p className="text-xs text-red-600 leading-relaxed">
              Keep Zoom running. You'll upload the recording after submitting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 rounded-2xl p-8 w-full max-w-md shadow-sm text-center">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-start gap-3 text-sm text-zinc-700">
      <span className="text-base shrink-0">{icon}</span>
      <span className="leading-relaxed">{label}</span>
    </div>
  );
}
