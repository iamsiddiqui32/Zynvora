import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { MovieCard } from "./MovieCard";
import type { Movie } from "@/data/movies";

export function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  if (movies.length === 0) return null;

  return (
    <section className="relative px-4 sm:px-6 lg:px-12 py-6">
      <motion.h2
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-4 text-xl sm:text-2xl font-semibold tracking-tight"
      >
        <span className="bg-gradient-to-r from-foreground to-gold bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>

      <div className="group relative">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 grid-cols-1 place-items-center h-10 w-10 rounded-full bg-black/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 md:grid hover:text-gold"
        >
          <FaChevronLeft />
        </button>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-12 bg-gradient-to-r from-background to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-12 bg-gradient-to-l from-background to-transparent opacity-0 transition group-hover:opacity-100" />

        <div
          ref={ref}
          className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {movies.map((m, i) => (
            <MovieCard key={m.id} movie={m} index={i} />
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 grid-cols-1 place-items-center h-10 w-10 rounded-full bg-black/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 md:grid hover:text-gold"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
