"use client";

import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { HOMEWORK_PASSWORD } from "@/data/homework";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const STORAGE_KEY = "teslablox:homework-unlocked";
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

// useSyncExternalStore is the React-sanctioned way to read an external store (localStorage
// here) — unlike a plain useEffect+setState, it tells React up front that this value may
// legitimately differ between the server render and the client, so React handles the
// post-hydration correction itself without a manual "null until mounted" workaround.
function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback); // changes made from another tab
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return false; // locked by default for the server-rendered HTML / first client paint
}

export default function HomeworkPasswordGate({ children }: { children: ReactNode }) {
  const unlocked = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (input === HOMEWORK_PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, "true");
      emitChange();
      setWrong(false);
    } else {
      setWrong(true);
    }
  }

  function lockAgain() {
    window.localStorage.removeItem(STORAGE_KEY);
    emitChange();
    setInput("");
  }

  if (!unlocked) {
    return (
      <Card className="mx-auto max-w-sm p-8 text-center">
        <p className="text-4xl">🔐</p>
        <p className="mt-3 font-heading text-lg font-semibold text-ink-700">
          This week&apos;s homework is locked
        </p>
        <p className="mt-1 text-sm text-ink-500">Ask Daddy for the password!</p>
        <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
          <label htmlFor="homework-password" className="sr-only">
            Password
          </label>
          <input
            id="homework-password"
            type="password"
            autoComplete="off"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setWrong(false);
            }}
            placeholder="Password"
            className="rounded-2xl border-2 border-ink-700/10 px-4 py-3 text-center font-medium text-ink-700 focus:border-electric-400"
          />
          <Button type="submit" variant="electric">
            Unlock
          </Button>
        </form>
        {wrong && (
          <p className="mt-3 text-sm font-medium text-coral-600 animate-fade-up">
            Hmm, that&apos;s not quite right — try again!
          </p>
        )}
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-3 text-right">
        <button
          type="button"
          onClick={lockAgain}
          className="text-xs font-medium text-ink-500 underline underline-offset-4"
        >
          🔒 Lock this again
        </button>
      </div>
      {children}
    </div>
  );
}
