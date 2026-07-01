import { useCallback, useSyncExternalStore } from "react";

const KEY = "zynvora:watch-history";
const MAX = 40;

export type HistoryEntry = { id: number; ts: number };

let snapshot: HistoryEntry[] = [];
const listeners = new Set<() => void>();

function persist() {
  try { window.localStorage.setItem(KEY, JSON.stringify(snapshot)); } catch { /* ignore */ }
}

function emit() { listeners.forEach((l) => l()); }

function hydrate() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    snapshot = raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch { snapshot = []; }
}

let hydrated = false;
function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  hydrate();
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) { hydrate(); emit(); }
  });
}

function subscribe(cb: () => void) {
  ensureHydrated();
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

const EMPTY: HistoryEntry[] = [];
const getServerSnapshot = () => EMPTY;

export function recordWatch(id: number) {
  ensureHydrated();
  const filtered = snapshot.filter((e) => e.id !== id);
  snapshot = [{ id, ts: Date.now() }, ...filtered].slice(0, MAX);
  persist();
  emit();
}

export function clearHistory() {
  ensureHydrated();
  snapshot = [];
  persist();
  emit();
}

export function useWatchHistory() {
  const entries = useSyncExternalStore(subscribe, () => snapshot, getServerSnapshot);
  const clear = useCallback(() => clearHistory(), []);
  return { entries, clear };
}