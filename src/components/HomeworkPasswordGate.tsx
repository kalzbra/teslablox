"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { ApiError, homeworkApi } from "@/lib/homework-api";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// The password is checked by the homework API — nothing about it ships in the website's code.
// Once accepted it's remembered on this device and sent with each homework request.
const STORAGE_KEY = "teslablox:homework-key";
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

// useSyncExternalStore is the React-sanctioned way to read an external store (localStorage
// here): it handles the server-render vs. client difference itself, no "null until mounted"
// workaround. The snapshot is a string (or null), so it's reference-stable as the API requires.
function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback); // changes made from another tab
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null; // locked in the server-rendered HTML / first client paint
}

type HomeworkKeyContext = { key: string; lock: () => void };
const KeyContext = createContext<HomeworkKeyContext | null>(null);

export function useHomeworkKey(): HomeworkKeyContext {
  const ctx = useContext(KeyContext);
  if (!ctx) throw new Error("useHomeworkKey must be used inside HomeworkPasswordGate");
  return ctx;
}

function lock() {
  window.localStorage.removeItem(STORAGE_KEY);
  emitChange();
}

export default function HomeworkPasswordGate({ children }: { children: ReactNode }) {
  const key = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!input) return;
    setChecking(true);
    setMessage(null);
    try {
      await homeworkApi.checkPassword(input);
      window.localStorage.setItem(STORAGE_KEY, input);
      setInput("");
      emitChange();
    } catch (err) {
      setMessage(
        err instanceof ApiError && err.status === 401
          ? "Hmm, that's not quite right — try again!"
          : "Can't reach the homework server right now. Try again in a little while!",
      );
    } finally {
      setChecking(false);
    }
  }

  if (!key) {
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
              setMessage(null);
            }}
            placeholder="Password"
            className="rounded-2xl border-2 border-ink-700/10 px-4 py-3 text-center font-medium text-ink-700 focus:border-electric-400"
          />
          <Button type="submit" variant="electric" disabled={checking}>
            {checking ? "Checking…" : "Unlock"}
          </Button>
        </form>
        {message && (
          <p className="mt-3 text-sm font-medium text-coral-600 animate-fade-up">{message}</p>
        )}
      </Card>
    );
  }

  return (
    <KeyContext.Provider value={{ key, lock }}>
      <div className="mb-3 text-right">
        <button
          type="button"
          onClick={lock}
          className="text-xs font-medium text-ink-500 underline underline-offset-4"
        >
          🔒 Lock this again
        </button>
      </div>
      {children}
    </KeyContext.Provider>
  );
}
