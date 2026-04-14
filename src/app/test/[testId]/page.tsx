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
  Mic,
  Monitor,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRecorder } from "@/hooks/useRecorder";

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
  | "submitting"
  | "done"
  | "maxed";

export default function TestPage() {
  const { testId } = useParams<{ testId: string }>();
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
  const [name, setName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [phone, setPhone] = useState("");
  const [gateError, setGateError] = useState("");
  const [gateLoading, setGateLoading] = useState(false);

  const [attemptId, setAttemptId] = useState("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [testDuration, setTestDuration] = useState(30);
  const [answers, setAnswers] = useState<Record<string, AttemptAnswer>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [doneMessage, setDoneMessage] = useState("");

  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recorder = useRecorder();

  // ── Auto start if came from apply ─────────────────────────
  useEffect(() => {
    if (cameFromApply && testId)
      startAttempt(prefillName, prefillEmail, undefined);
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
      setGateError("Test ID missing.");
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

  // ── Start recording + begin test ──────────────────────────
  async function handleStartTest() {
    const started = await recorder.startRecording();
    if (!started) return; // error shown by hook
    setPage("test");
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

  // ── Submit test + stop recording + upload ─────────────────
  async function handleSubmit(auto = false) {
    alert("Submit test? You cannot change answers after submitting.");
    // ← capture FIRST before anything else
    const recorderIsRecording = recorder.state === "recording";
    const currentAttemptId = attemptId;

    console.log("🔵 [1] handleSubmit called, auto:", auto);
    console.log("🔵 [2] recorder.state:", recorder.state);
    console.log("🔵 [3] recorderIsRecording:", recorderIsRecording);
    console.log("🔵 [4] attemptId:", currentAttemptId);
    console.log("🔵 [5] page:", page);

    if (page === "submitting") {
      console.log("🔴 [6] already submitting, returning early");
      return;
    }
    if (
      !auto &&
      !confirm("Submit test? You cannot change answers after submitting.")
    ) {
      console.log("🔴 [7] user cancelled confirm");
      return;
    }

    console.log("🟡 [8] setting page to submitting");
    setPage("submitting");

    console.log("🟡 [9] about to post submit to backend");
    try {
      const res = await publicApi.post(`/attempts/${currentAttemptId}/submit`);
      console.log("✅ [10] test submitted, response:", res.data);
    } catch (e: any) {
      console.warn(
        "⚠️ [10] test submit failed:",
        e?.response?.status,
        e?.response?.data
      );
    }

    console.log("🟡 [11] checking recorderIsRecording:", recorderIsRecording);
    console.log("🟡 [12] recorder.state RIGHT NOW:", recorder.state);
    console.log(
      "🟡 [13] recorder.stopAndUpload fn:",
      typeof recorder.stopAndUpload
    );

    if (recorderIsRecording) {
      console.log(
        "🟡 [14] calling recorder.stopAndUpload with attemptId:",
        currentAttemptId
      );
      let url: string | null = null;
      try {
        url = await recorder.stopAndUpload(currentAttemptId);
        console.log("✅ [15] stopAndUpload returned:", url);
      } catch (e: any) {
        console.error("🔴 [15] stopAndUpload THREW:", e?.message, e);
      }
      setDoneMessage(
        url
          ? "Your test and recording have been submitted successfully. The hiring team will review and get back to you."
          : "Test submitted. Recording upload failed — please contact the hiring team."
      );
      console.log("🟡 [16] doneMessage set, url was:", url);
    } else {
      console.warn("🔴 [14] recorderIsRecording was false, skipping upload");
      setDoneMessage(
        "Test submitted. No recording was captured — please contact the hiring team."
      );
    }

    console.log("🟡 [17] setting page to done");
    setPage("done");
    console.log("✅ [18] handleSubmit complete");
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

  // ══════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════

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

  if (page === "submitting")
    return (
      <CenteredCard>
        <Loader2
          size={36}
          className="text-zinc-400 mx-auto mb-4 animate-spin"
        />
        <h2 className="text-lg font-bold text-zinc-900 mb-2">
          {recorder.state === "uploading"
            ? "Uploading Recording..."
            : "Submitting Test..."}
        </h2>
        {recorder.state === "uploading" && recorder.uploadProgress > 0 && (
          <div className="w-full mt-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span>Uploading recording</span>
              <span>{recorder.uploadProgress}%</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2">
              <div
                className="bg-zinc-900 h-2 rounded-full transition-all"
                style={{ width: `${recorder.uploadProgress}%` }}
              />
            </div>
          </div>
        )}
        <p className="text-xs text-zinc-400 mt-3">
          Please don't close this tab
        </p>
      </CenteredCard>
    );

  if (page === "done")
    return (
      <CenteredCard>
        <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-zinc-900 mb-2">All Done!</h2>
        <p className="text-sm text-zinc-500 text-center leading-relaxed">
          {doneMessage}
        </p>
      </CenteredCard>
    );

  // Loading spinner while auto-starting
  if (page === "gate" && cameFromApply)
    return (
      <CenteredCard>
        <Loader2
          size={32}
          className="text-zinc-400 mx-auto mb-4 animate-spin"
        />
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
            {/* Recording info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Video size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    📹 Screen + Webcam Recording
                  </p>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    When you click "Start Test", your browser will ask
                    permission to share your
                    <strong> screen and webcam</strong>. You must allow both.
                    Recording starts automatically and uploads when you submit.{" "}
                    <strong>
                      Tests without a valid recording are disqualified.
                    </strong>
                  </p>
                  <div className="flex gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">
                      <Monitor size={11} /> Share your entire screen
                    </span>
                    <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">
                      <Mic size={11} /> Allow microphone
                    </span>
                  </div>
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
                  label={`You have ${testDuration} minutes. Timer starts when recording begins and cannot be paused.`}
                />
                <InfoRow
                  icon="🔁"
                  label="Answers are saved automatically every few seconds."
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
                  label="Your face must be visible on webcam throughout the test."
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
                    Sharing, reproducing, or distributing any test question is a{" "}
                    <strong>serious violation</strong>. Candidates found sharing
                    questions or using unauthorized assistance will be
                    <strong> immediately disqualified</strong> and{" "}
                    <strong>permanently banned</strong> for a minimum of{" "}
                    <strong>3 years</strong>. Legal action may be pursued.
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

            {/* Recording error */}
            {recorder.error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                {recorder.error}
                <button
                  onClick={() => window.location.reload()}
                  className="ml-2 underline text-xs"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Start button */}
            <Button
              className="w-full gap-2 h-12 text-base"
              onClick={handleStartTest}
              disabled={recorder.state === "requesting"}
            >
              {recorder.state === "requesting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Waiting for
                  permissions...
                </>
              ) : (
                <>
                  <Video size={16} /> Start Recording & Begin Test
                </>
              )}
            </Button>

            <p className="text-xs text-zinc-400 text-center">
              Your browser will ask for screen share and camera permissions.
              Click "Allow" on both.
            </p>
          </div>
        </div>
      </div>
    );

  // ── Test ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Top bar */}
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
          {/* Recording indicator */}
          {recorder.state === "recording" && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              Recording
            </div>
          )}
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
            className="gap-1.5"
          >
            <Send size={13} />
            Submit
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question panel */}
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

        {/* Sidebar */}
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

          {/* Recording status */}
          <div
            className={`rounded-2xl p-4 border ${
              recorder.state === "recording"
                ? "bg-red-50 border-red-200"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {recorder.state === "recording" && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
              <p
                className={`text-xs font-semibold ${
                  recorder.state === "recording"
                    ? "text-red-700"
                    : "text-zinc-500"
                }`}
              >
                {recorder.state === "recording"
                  ? "Recording Active"
                  : "Recording"}
              </p>
            </div>
            <p
              className={`text-xs leading-relaxed ${
                recorder.state === "recording"
                  ? "text-red-600"
                  : "text-zinc-400"
              }`}
            >
              {recorder.state === "recording"
                ? "Screen + webcam recording in progress. Will auto-upload on submit."
                : "Not recording."}
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
