import { createContext, memo, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaStar, FaPlay, FaClock, FaFilm, FaLanguage, FaCalendarAlt } from "react-icons/fa";
import { movies as ALL_MOVIES, type Movie } from "@/data/movies";
import { recordWatch } from "@/lib/history";

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

// Warm up YouTube connection at idle so first-play startup is faster.
let ytWarmed = false;
function warmYouTubeConnection() {
  if (ytWarmed || typeof document === "undefined") return;
  ytWarmed = true;
  for (const href of [
    "https://www.youtube-nocookie.com",
    "https://i.ytimg.com",
    "https://s.ytimg.com",
    "https://yt3.ggpht.com",
  ]) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "";
    document.head.appendChild(link);
  }
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Movie | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const open = useCallback((m: Movie) => {
    warmYouTubeConnection();
    recordWatch(m.id);
    setCurrent(m);
  }, []);

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

const PlayerModal = memo(function PlayerModal({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const src = useMemo(() => {
    const id = extractYouTubeId(movie.youtube);
    return id
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`
      : null;
  }, [movie.youtube]);

  const recommended = useMemo(() => {
    const genreSet = new Set(movie.genre);
    const scored = ALL_MOVIES
      .filter((m) => m.id !== movie.id)
      .map((m) => {
        const overlap = m.genre.filter((g) => genreSet.has(g)).length;
        const langBonus = m.language === movie.language ? 0.5 : 0;
        return { m, score: overlap + langBonus };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || b.m.rating - a.m.rating)
      .slice(0, 12)
      .map((x) => x.m);
    return scored;
  }, [movie]);

  const { open: openMovie } = usePlayer();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-xl px-0 py-0 sm:p-6"
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
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border sm:border-white/10 bg-black shadow-[0_30px_120px_-20px_var(--gold-soft)] my-0 sm:my-4"
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
              loading="eager"
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

        <div className="space-y-4 p-4 sm:p-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{movie.title}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-md bg-gold/15 px-2 py-0.5 text-gold font-semibold">
                <FaStar className="text-[10px]" /> {movie.rating.toFixed(1)} IMDb
              </span>
              {movie.hindiDubbed && (
                <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-white/90">
                  Hindi Dubbed
                </span>
              )}
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {movie.description}
          </p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/5">
            <Info icon={<FaCalendarAlt />} label="Release Year" value={String(movie.year)} />
            {movie.language && <Info icon={<FaLanguage />} label="Language" value={movie.language} />}
            {movie.duration && <Info icon={<FaClock />} label="Duration" value={movie.duration} />}
            {movie.genre.length > 0 && (
              <Info icon={<FaFilm />} label="Genre" value={movie.genre.slice(0, 3).join(", ")} />
            )}
          </dl>

          {recommended.length > 0 && (
            <div className="pt-4 border-t border-white/5">
              <h3 className="mb-3 text-lg sm:text-xl font-semibold">
                <span className="bg-gradient-to-r from-foreground to-gold bg-clip-text text-transparent">
                  Recommended For You
                </span>
              </h3>
              <div className="hide-scrollbar -mx-4 sm:mx-0 flex gap-3 overflow-x-auto scroll-smooth px-4 sm:px-0 pb-2">
                {recommended.map((rec) => (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => openMovie(rec)}
                    className="group relative w-[130px] sm:w-[150px] shrink-0 overflow-hidden rounded-lg text-left glass hover:glow-gold transition"
                    aria-label={`Play ${rec.title}`}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={rec.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-primary-foreground shadow-lg">
                          <FaPlay className="text-xs" />
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="line-clamp-1 text-xs font-semibold">{rec.title}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gold">
                        <FaStar className="text-[8px]" /> {rec.rating.toFixed(1)} · {rec.year}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="text-gold">{icon}</span>{label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}