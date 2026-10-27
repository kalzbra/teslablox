"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ApiError,
  formatOpensOn,
  HOMEWORK_UPDATED_EVENT,
  homeworkApi,
  type ActiveWeek,
  type AnswerFeedback,
  type FinishResult,
  type StartResult,
} from "@/lib/homework-api";
import { seededShuffle } from "@/lib/seeded-random";
import { useHomeworkKey } from "@/components/HomeworkPasswordGate";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SubjectTag from "@/components/SubjectTag";
import KeepExploring from "@/components/KeepExploring";
import { useConfetti } from "@/components/Confetti";

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

type Phase = "intro" | "question" | "result";

type HomeworkQuizProps = {
  week: ActiveWeek;
  /** Reload the roadmap (after a perfect score, or to move on to the next week). */
  onDone: () => void;
};

export default function HomeworkQuiz({ week, onDone }: HomeworkQuizProps) {
  const { key, lock } = useHomeworkKey();
  const [phase, setPhase] = useState<Phase>("intro");
  const [attempt, setAttempt] = useState<StartResult | null>(null);
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<Record<string, AnswerFeedback>>({});
  const [guess, setGuess] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FinishResult | null>(null);
  const [retryAt, setRetryAt] = useState<number | null>(week.retryAt);
  const [now, setNow] = useState<number | null>(null);
  const { fire, confetti } = useConfetti(120);

  // Countdown tick. Only runs while a cooldown exists; `now` stays null until the first tick so
  // nothing time-dependent is rendered during the static prerender.
  useEffect(() => {
    if (retryAt === null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [retryAt]);

  const cooldownMs = retryAt !== null && now !== null ? Math.max(0, retryAt - now) : 0;
  const cooling = retryAt !== null && (now === null || cooldownMs > 0);

  const questions = attempt?.questions ?? [];
  const question = questions[step];
  const current = question ? feedback[question.id] : undefined;

  const options = useMemo(() => {
    if (!question || question.type !== "multiple-choice" || !question.options) return [];
    return seededShuffle(question.options, step * 104729 + questions.length * 31 + 7);
  }, [question, step, questions.length]);

  function handleError(err: unknown) {
    if (err instanceof ApiError && err.status === 401) {
      lock();
      return;
    }
    if (err instanceof ApiError && err.status === 429 && typeof err.body.retryAt === "number") {
      setRetryAt(err.body.retryAt);
      setPhase("intro");
      return;
    }
    setError(
      err instanceof ApiError ? err.message : "Can't reach the homework server — try again!",
    );
  }

  async function start() {
    setBusy(true);
    setError(null);
    try {
      const started = await homeworkApi.start(key);
      const firstUnanswered = started.questions.findIndex((q) => !started.answered[q.id]);
      setAttempt(started);
      setFeedback(started.answered);
      setGuess("");
      setResult(null);
      if (firstUnanswered === -1) {
        await finish(started.attemptId);
      } else {
        setStep(firstUnanswered);
        setPhase("question");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(false);
    }
  }

  async function submitAnswer(value: string) {
    if (!attempt || !question || current || busy || value.trim() === "") return;
    setBusy(true);
    setError(null);
    setGuess(value);
    try {
      const fb = await homeworkApi.answer(key, attempt.attemptId, question.id, value);
      setFeedback((f) => ({ ...f, [question.id]: fb }));
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(false);
    }
  }

  async function finish(attemptId: string) {
    setBusy(true);
    try {
      const done = await homeworkApi.finish(key, attemptId);
      setResult(done);
      setRetryAt(done.retryAt);
      setPhase("result");
      window.dispatchEvent(new Event(HOMEWORK_UPDATED_EVENT));
      if (done.perfect) fire();
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(false);
    }
  }

  function next() {
    if (!attempt) return;
    if (step + 1 >= questions.length) {
      void finish(attempt.attemptId);
    } else {
      setStep(step + 1);
      setGuess("");
    }
  }

  const errorLine = error && (
    <p className="mt-4 text-center text-sm font-medium text-coral-600">{error}</p>
  );

  if (phase === "intro") {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center">
        <p className="text-4xl">📝</p>
        <p className="mt-3 font-heading text-xl font-semibold text-ink-700">
          {week.questionCount} questions this week
        </p>
        <p className="mt-2 text-ink-500">
          Take your time and think each one through. Get every answer right to unlock next
          week&apos;s homework!
        </p>
        {cooling && now !== null && (
          <p className="mt-4 text-sm font-medium text-coral-600">
            ⏳ Take a little break — you can try again in {formatCountdown(cooldownMs)}
          </p>
        )}
        <div className="mt-6">
          <Button variant="electric" onClick={() => void start()} disabled={busy || cooling}>
            {busy ? "Loading…" : week.inProgress ? "Keep Going →" : "Start Homework →"}
          </Button>
        </div>
        {errorLine}
      </Card>
    );
  }

  if (phase === "result" && result) {
    const pct = Math.round((result.score / result.outOf) * 100);
    return (
      <Card className="mx-auto max-w-xl p-8 text-center">
        {confetti}
        <p className="font-heading text-3xl font-semibold text-ink-700">
          You scored {result.score} / {result.outOf}!{" "}
          {result.perfect ? "🌟" : pct >= 50 ? "🎉" : "💪"}
        </p>
        <p className="mt-2 text-ink-500">
          {result.perfect
            ? "Perfect score — amazing work! Daddy can see your score too."
            : pct >= 70
              ? "Great job — you're really getting good at this!"
              : "Nice try! Learning is all about practice."}
        </p>

        {result.perfect ? (
          <>
            <p className="mt-4 font-heading text-lg font-semibold text-electric-600 animate-fade-up">
              {!result.next
                ? "🏆 That was the last one — you're all caught up!"
                : result.next.status === "active"
                  ? `🔓 You unlocked ${result.next.theme}!`
                  : `🔓 ${result.next.theme} opens on ${formatOpensOn(result.next.opensOn)}.`}
            </p>
            <div className="mt-6">
              <Button variant="electric" onClick={onDone}>
                {result.next?.status === "active" ? "See Next Week's Homework →" : "Back to Roadmap"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-sm text-ink-500">
              You need a perfect score to unlock next week — give it another shot!
            </p>
            {cooling && now !== null && (
              <p className="mt-2 text-sm font-medium text-coral-600">
                ⏳ Take a little break — you can try again in {formatCountdown(cooldownMs)}
              </p>
            )}
            <div className="mt-6">
              <Button variant="electric" onClick={() => void start()} disabled={busy || cooling}>
                Try Again
              </Button>
            </div>
          </>
        )}
        {errorLine}

        <KeepExploring topics={week.topics} resources={week.resources} />
      </Card>
    );
  }

  if (!question) return null;

  return (
    <Card className="mx-auto max-w-xl p-6 sm:p-8">
      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-cream-200">
        <div
          className="h-full rounded-full bg-electric-500 transition-all duration-300"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink-500">
          Question {step + 1} of {questions.length}
        </p>
        <SubjectTag subject={question.subject} />
      </div>

      <h3 className="mt-3 font-heading text-xl font-semibold text-ink-700">{question.question}</h3>

      {question.type === "multiple-choice" ? (
        <div className="mt-5 flex flex-col gap-3">
          {options.map((option) => {
            const picked = (current?.answer ?? guess) === option;
            const isAnswer = current?.correctAnswer === option;
            let stateClasses = "border-ink-700/10 hover:border-electric-400";
            if (current && isAnswer) stateClasses = "border-green-500 bg-green-50";
            else if (current && picked) stateClasses = "border-coral-500 bg-coral-500/10";
            else if (!current && picked && busy) stateClasses = "border-electric-400";

            return (
              <button
                key={option}
                type="button"
                onClick={() => void submitAnswer(option)}
                disabled={Boolean(current) || busy}
                className={`rounded-2xl border-2 px-5 py-3 text-left font-medium text-ink-700 transition-colors ${stateClasses}`}
              >
                {option}
                {current && isAnswer ? " ✅" : ""}
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="mt-5 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            void submitAnswer(guess);
          }}
        >
          <input
            type="text"
            value={current?.answer ?? guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={Boolean(current) || busy}
            placeholder="Type your answer"
            aria-label={question.question}
            className="flex-1 rounded-2xl border-2 border-ink-700/10 px-4 py-3 font-medium text-ink-700 focus:border-electric-400"
          />
          {!current && (
            <Button type="submit" variant="electric" disabled={busy || guess.trim() === ""}>
              Check
            </Button>
          )}
        </form>
      )}

      {current && (
        <div
          className={`mt-5 rounded-2xl p-4 animate-fade-up ${
            current.correct ? "bg-green-50" : "bg-coral-500/10"
          }`}
        >
          <p className={`font-semibold ${current.correct ? "text-green-700" : "text-coral-600"}`}>
            {current.correct
              ? "Correct! 🎉 ⚡"
              : `Not quite — the answer was "${current.correctAnswer}."`}
          </p>
          <p className="mt-1 text-sm text-ink-500">💡 {current.explanation}</p>
        </div>
      )}

      {current && (
        <div className="mt-5 text-right">
          <Button variant="spark" onClick={next} disabled={busy}>
            {step + 1 === questions.length ? "See My Score" : "Next Question"}
          </Button>
        </div>
      )}
      {errorLine}
    </Card>
  );
}
