import { useCallback, useSyncExternalStore } from "react";

const KEY = "aniflix:favorites";

// External store — a single source of truth so components can subscribe
// granularly (per-id) and avoid the re-render storm that a shared
// `useState<number[]>` in every card would create.
let state: ReadonlySet<number> = new Set<number>();
let snapshot: number[] = [];
const listeners = new Set<() => void>();

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function setState(next: Set<number>) {
  state = next;
  snapshot = Array.from(next);
  persist();
  listeners.forEach((l) => l());
}

function hydrate() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as number[]) : [];
    state = new Set(parsed);
    snapshot = parsed;
  } catch {
    state = new Set();
    snapshot = [];
  }
}

let hydrated = false;
function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  hydrate();
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      hydrate();
      listeners.forEach((l) => l());
    }
  });
}

function subscribe(cb: () => void) {
  ensureHydrated();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const getServerSnapshot = () => EMPTY;
const EMPTY: number[] = [];

export function toggleFavorite(id: number) {
  ensureHydrated();
  const next = new Set(state);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  setState(next);
}

// Per-id subscription — only re-renders when THIS id flips.
export function useIsFavorite(id: number) {
  return useSyncExternalStore(
    subscribe,
    () => state.has(id),
    () => false,
  );
}

// Full list — used by the favorites page only.
export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, () => snapshot, getServerSnapshot);
  const toggle = useCallback((id: number) => toggleFavorite(id), []);
  const has = useCallback((id: number) => state.has(id), []);
  return { ids, toggle, has };
}
