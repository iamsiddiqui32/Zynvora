import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { FaPlay, FaStar } from "react-icons/fa";
import type { Movie } from "@/data/movies";
import { Particles } from "./Particles";
import { usePlayer } from "./MoviePlayer";

export function Hero({ movie, rotation }: { movie: Movie; rotation?: Movie[] }) {
  const { open } = usePlayer();
  const slides = rotation && rotation.length > 0 ? rotation : [movie];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const t = setInterval(
      () => setI((v) => (v + 1) % slides.length),
      7000
    );

    return () => clearInterval(t);
  }, [slides.length]);

  const current = slides[i] ?? movie;

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={current.id}
          src={current.image}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 1.18 }}
          animate={{ opacity: 0.6, scale: 1.1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover blur-sm"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* floating gold orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute left-[10%] top-[30%] h-40 w-40 rounded-full bg-gold/20 blur-3xl" />

        <div
          className="animate-float-slow absolute right-[15%] top-[60%] h-56 w-56 rounded-full bg-gold/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Particles count={22} />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 sm:px-6 lg:px-12 pb-20 pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-3 inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold"
            >
              ✦ Featured Tonight
            </motion.span>

            <h1 className="max-w-3xl text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
              <span className="bg-gradient-to-br from-foreground via-foreground to-gold bg-clip-text text-transparent">
                {current.title}
              </span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 text-gold">
                <FaStar /> {current.rating.toFixed(1)} IMDb
              </span>

              <span>•</span>
              <span>{current.year}</span>

              <span>•</span>
              <span>{current.duration}</span>

              <span>•</span>
              <span>{current.genre.join(" / ")}</span>
            </div>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground line-clamp-2">
              {current.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => open(current)}
                className="inline-flex items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:glow-gold active:scale-[0.98] shadow-[0_10px_40px_-10px_var(--gold-soft)]"
              >
                <FaPlay /> Watch Now
              </button>

              <Link
                to="/movies"
                className="inline-flex items-center gap-2 rounded-md glass px-7 py-3.5 text-sm font-semibold text-foreground transition hover:text-gold"
              >
                Browse Movies
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="mt-8 flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i
                    ? "w-10 bg-gold"
                    : "w-5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
