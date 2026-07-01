import { memo, useCallback, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaHeart, FaRegHeart, FaPlay, FaStar } from "react-icons/fa";
import { toast } from "sonner";
import { useIsFavorite, toggleFavorite } from "@/lib/favorites";
import type { Movie } from "@/data/movies";
import { usePlayer } from "./MoviePlayer";

function MovieCardImpl({ movie, index = 0 }: { movie: Movie; index?: number }) {
  const fav = useIsFavorite(movie.id);
  const { open } = usePlayer();
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie.id);
    if (fav) toast(`Removed "${movie.title}" from favorites`);
    else toast.success(`Added "${movie.title}" to favorites`);
  }, [fav, movie.id, movie.title]);

  const handlePlay = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    open(movie);
  }, [open, movie]);

  const handleOpen = useCallback(() => open(movie), [open, movie]);

  return (
    <motion.article
      ref={ref}
      onClick={handleOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative w-[180px] sm:w-[200px] md:w-[220px] shrink-0 cursor-pointer rounded-xl overflow-hidden glass hover:glow-gold transition-shadow duration-300 will-change-transform"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(); } }}
      aria-label={`Play ${movie.title}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {!loaded && <div className="absolute inset-0 skeleton-shimmer" aria-hidden />}
        <img
          src={movie.image}
          alt={`${movie.title} poster`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

        {movie.hindiDubbed && (
          <span className="absolute top-2 left-2 rounded-md bg-gold px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary-foreground shadow-[0_0_15px_var(--gold-soft)]">
            HINDI DUBBED
          </span>
        )}

        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.15 }}
          type="button"
          onClick={handleToggle}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={fav}
          className="absolute top-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-black/60 backdrop-blur-md text-white transition hover:text-gold"
        >
          <motion.span
            key={fav ? "on" : "off"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
          >
            {fav ? <FaHeart className="text-gold" /> : <FaRegHeart />}
          </motion.span>
        </motion.button>

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handlePlay}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gold py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] shadow-[0_8px_30px_-10px_var(--gold-soft)]"
          >
            <FaPlay className="text-xs" /> Watch Now
          </button>
        </div>
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{movie.title}</h3>
        <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{movie.year} · {movie.duration}</span>
          <span className="flex items-center gap-1 text-gold">
            <FaStar className="text-[10px]" /> {movie.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
          {movie.genre.slice(0, 2).join(" · ")} · {movie.language}
        </p>
      </div>
    </motion.article>
  );
}

export const MovieCard = memo(MovieCardImpl);
