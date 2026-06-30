import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaStar, FaPlay } from "react-icons/fa";
import type { Movie } from "@/data/movies";

type Ctx = { open: (m: Movie) => void; close: () => void; current: Movie | null };
const PlayerCtx = createContext<Ctx | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}

function extractYouTubeId(url: string): string | null {
  // handles ...?v=ID, ?v=ID&t=..., youtu.be/ID, and the malformed `v=ID&t=...` (no `?`)
  const m =
    url.match(/[?&]v=([A-Za-z0-9_-]{6,})/) ||
    url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
    url.match(/(?:^|[^A-Za-z0-9_-])v=([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Movie | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const open = useCallback((m: Movie) => setCurrent(m), []);

  // Lock body scroll + close on escape
  useEffect(() => {
    if (!current) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [current, close]);

  const value = useMemo(() => ({ open, close, current }), [open, close, current]);

  return (
    <PlayerCtx.Provider value={value}>
      {children}
      <AnimatePresence>
        {current && <PlayerModal key={current.id} movie={current} onClose={close} />}
      </AnimatePresence>
    </PlayerCtx.Provider>
  );
}

function PlayerModal({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const id = extractYouTubeId(movie.youtube);
  const src = id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/85 backdrop-blur-xl px-3 py-6 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Now playing: ${movie.title}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_120px_-20px_var(--gold-soft)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close player"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white transition hover:bg-gold hover:text-primary-foreground"
        >
          <FaTimes />
        </button>

        <div className="relative aspect-video w-full bg-black">
          {src ? (
            <iframe
              src={src}
              title={movie.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-center text-sm text-muted-foreground">
              <div>
                <FaPlay className="mx-auto mb-3 text-3xl text-gold" />
                Video unavailable. Please try another title.
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold leading-tight">{movie.title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-md bg-gold/15 px-2 py-0.5 text-gold">
              <FaStar className="text-[10px]" /> {movie.rating.toFixed(1)} IMDb
            </span>
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span>{movie.genre.join(" / ")}</span>
          </div>
          <p className="line-clamp-3 text-sm text-muted-foreground sm:line-clamp-none">{movie.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}