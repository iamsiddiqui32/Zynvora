import { useMemo, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MovieCard } from "@/components/aniflix/MovieCard";
import { SearchBar } from "@/components/aniflix/SearchBar";
import { CategoryFilter } from "@/components/aniflix/CategoryFilter";
import { movies, categories } from "@/data/movies";

export const Route = createFileRoute("/movies")({
  head: () => ({
    meta: [
      { title: "All Movies — Zynvora" },
      { name: "description", content: "Browse the full Zynvora catalog of animated films with instant search and filters." },
      { property: "og:title", content: "All Movies — Zynvora" },
      { property: "og:description", content: "Browse the full Zynvora catalog with instant search and filters." },
    ],
  }),
  component: MoviesPage,
});

function MoviesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("q");
    if (initial) setQ(initial);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return movies.filter((m) => {
      if (cat !== "All" && !m.genre.includes(cat)) return false;
      if (!needle) return true;
      return (
        m.title.toLowerCase().includes(needle) ||
        m.genre.some((g) => g.toLowerCase().includes(needle)) ||
        String(m.year).includes(needle)
      );
    });
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl sm:text-5xl font-bold">All Movies</h1>
        <p className="mt-2 text-muted-foreground">
          {movies.length} curated animated films · search and filter instantly.
        </p>
      </motion.div>

      <div className="mt-8 space-y-4">
        <SearchBar value={q} onChange={setQ} />
        <CategoryFilter categories={categories} active={cat} onChange={setCat} />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{filtered.length} results</p>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center text-muted-foreground">
          No movies match your search.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filtered.map((m, i) => (
            <MovieCard key={m.id} movie={m} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
