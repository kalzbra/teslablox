"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RETRY_COOLDOWN_MINUTES, type HomeworkQuestion, type HomeworkWeek } from "@/data/homework";
import { seededShuffle } from "@/lib/seeded-random";
import { lastAttemptAt, loadProgress, saveAttempt } from "@/lib/homework-progress";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SubjectTag from "@/components/SubjectTag";
import KeepExploring from "@/components/KeepExploring";

const COOLDOWN_MS = RETRY_COOLDOWN_MINUTES * 60 * 1000;

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function isCorrect(question: HomeworkQuestion, guess: string): boolean {
  const g = normalize(guess);
  const a = normalize(question.answer);
  if (g === a) return true;
  if (question.type === "type-answer" && g !== "") {
    const gn = Number(g);
    const an = Number(a);
    if (!Number.isNaN(gn) && !Number.isNaN(an)) return gn === an;
  }
  return false;
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

type HomeworkQuizProps = {
  week: HomeworkWeek;
  /** Called only when Tesla clicks through after a perfect score — lets the parent advance to
   * the next week in the sequence on his terms, not the instant he finishes. */
  onPassed?: () => void;
};

export default function HomeworkQuiz({ week, onPassed }: HomeworkQuizProps) {
  const [step, setStep] = useState(0);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const recordedRef = useRef(false);

  const questions = week.questions ?? [];
  const question = questions[step];
  const finished = step >= questions.length;
  const perfect = finished && questions.length > 0 && score === questions.length;

  // Deterministic (not Math.random) so static-export prerender and the client's first render
  // agree — see src/lib/seeded-random.ts and the hydration-mismatch note in CLAUDE.md.
  const options = useMemo(() => {
    if (!question || question.type !== "multiple-choice") return [];
    return seededShuffle(question.options, step * 104729 + round * 31 + 7);
  }, [question, step, round]);

  // Records the attempt exactly once per completion, and — if it wasn't a perfect score —
  // starts the retry cooldown. This only ever runs well after initial mount (finished starts
  // false and requires several real clicks to reach), so there's no hydration-mismatch risk;
  // the setState calls below are suppressed for react-hooks/set-state-in-effect because the
  // cooldown target genuinely depends on an external read (localStorage) combined with a
  // one-time side effect (saving the attempt) — it can't be derived during render.
  useEffect(() => {
    if (!finished || recordedRef.current) return;
    recordedRef.current = true;
    saveAttempt(week.id, score, questions.length);
    if (!perfect) {
      const progress = loadProgress();
      const last = lastAttemptAt(progress, week.id) ?? Date.now();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCooldownUntil(last + COOLDOWN_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  // Primes the countdown display immediately instead of waiting a full second for the first
  // interval tick.
  useEffect(() => {
    if (cooldownUntil === null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [cooldownUntil]);

  const cooldownRemainingMs =
    cooldownUntil !== null && now !== null ? Math.max(0, cooldownUntil - now) : 0;
  const inCooldown = cooldownUntil !== null && cooldownRemainingMs > 0;

  function submitGuess(value: string) {
    if (submitted || !question) return;
    setGuess(value);
    setSubmitted(true);
    if (isCorrect(question, value)) setScore((s) => s + 1);
  }

  function next() {
    setStep((s) => s + 1);
    setGuess("");
    setSubmitted(false);
  }

  function restart() {
    if (inCooldown) return;
    setStep(0);
    setGuess("");
    setSubmitted(false);
    setScore(0);
    setCooldownUntil(null);
    setNow(null);
    recordedRef.current = false;
    setRound((r) => r + 1);
  }

  if (questions.length === 0) {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center text-ink-500">
        Daddy hasn&apos;t added this week&apos;s questions yet — check back soon!
      </Card>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <Card className="mx-auto max-w-xl p-8 text-center">
        <p className="font-heading text-3xl font-semibold text-ink-700">
          You scored {score} / {questions.length}! {perfect ? "🌟" : pct >= 50 ? "🎉" : "💪"}
        </p>
        <p className="mt-2 text-ink-500">
          {perfect
            ? "Perfect score — amazing work!"
            : pct >= 70
              ? "Great job — you're really getting good at this!"
              : "Nice try! Learning is all about practice."}
        </p>

        {perfect ? (
          <>
            <p className="mt-4 font-heading text-lg font-semibold text-electric-600 animate-fade-up">
              🔓 You unlocked next week&apos;s homework!
            </p>
            <div className="mt-6">
              <Button variant="electric" onClick={() => onPassed?.()}>
                See Next Week&apos;s Homework →
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-sm text-ink-500">
              You need a perfect score to unlock next week — give it another shot!
            </p>
            {inCooldown ? (
              <p className="mt-2 text-sm font-medium text-coral-600">
                ⏳ Take a little break — you can try again in {formatCountdown(cooldownRemainingMs)}
              </p>
            ) : (
              <p className="mt-4 text-sm text-ink-500">
                📞 Don&apos;t forget to tell Daddy how you&apos;re doing next time you talk!
              </p>
            )}
            <div className="mt-6">
              <Button variant="electric" onClick={restart} disabled={inCooldown}>
                Try Again
              </Button>
            </div>
          </>
        )}

        <KeepExploring topics={week.topics ?? []} />
      </Card>
    );
  }

  const correct = submitted && isCorrect(question, guess);

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

      <h3 className="mt-3 font-heading text-xl font-semibold text-ink-700">
        {question.question}
      </h3>

      {question.type === "multiple-choice" ? (
        <div className="mt-5 flex flex-col gap-3">
          {options.map((option) => {
            const isSelected = guess === option;
            const optionCorrect = option === question.answer;
            let stateClasses = "border-ink-700/10 hover:border-electric-400";
            if (submitted && optionCorrect) stateClasses = "border-green-500 bg-green-50";
            else if (submitted && isSelected && !optionCorrect)
              stateClasses = "border-coral-500 bg-coral-500/10";

            return (
              <button
                key={option}
                type="button"
                onClick={() => submitGuess(option)}
                disabled={submitted}
                className={`rounded-2xl border-2 px-5 py-3 text-left font-medium text-ink-700 transition-colors ${stateClasses}`}
              >
                {option}
                {submitted && optionCorrect ? " ✅" : ""}
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="mt-5 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            submitGuess(guess);
          }}
        >
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer"
            aria-label={question.question}
            className="flex-1 rounded-2xl border-2 border-ink-700/10 px-4 py-3 font-medium text-ink-700 focus:border-electric-400"
          />
          {!submitted && (
            <Button type="submit" variant="electric">
              Check
            </Button>
          )}
        </form>
      )}

      {submitted && (
        <div
          className={`mt-5 rounded-2xl p-4 animate-fade-up ${
            correct ? "bg-green-50" : "bg-coral-500/10"
          }`}
        >
          <p className={`font-semibold ${correct ? "text-green-700" : "text-coral-600"}`}>
            {correct ? "Correct! 🎉" : `Not quite — the answer was "${question.answer}."`}
          </p>
          <p className="mt-1 text-sm text-ink-500">💡 {question.explanation}</p>
        </div>
      )}

      {submitted && (
        <div className="mt-5 text-right">
          <Button variant="spark" onClick={next}>
            {step + 1 === questions.length ? "See My Score" : "Next Question"}
          </Button>
        </div>
      )}
    </Card>
  );
}
