import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { MovieCard } from "@/components/aniflix/MovieCard";
import { useFavorites } from "@/lib/favorites";
import { movies } from "@/data/movies";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "My List — Zynvora" },
      { name: "description", content: "Your saved animated movies, stored locally in your browser." },
      { property: "og:title", content: "My List — Zynvora" },
      { property: "og:description", content: "Your saved animated movies." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { ids } = useFavorites();
  const list = movies.filter((m) => ids.includes(m.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold">My Favorites</h1>
          <p className="mt-2 text-muted-foreground">
            {list.length === 0 ? "You haven't saved anything yet." : "Your private collection, stored locally."}
          </p>
        </div>
        {list.length > 0 && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-3 rounded-full glass px-5 py-2 glow-gold"
          >
            <FaHeart className="text-gold" />
            <span className="font-display text-2xl font-bold text-gold">{list.length}</span>
            <span className="text-sm text-muted-foreground">{list.length === 1 ? "title" : "titles"}</span>
          </motion.div>
        )}
      </div>

      {list.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20 grid place-items-center text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 animate-float-slow rounded-full bg-gold/20 blur-3xl" />
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-32 w-32 place-items-center rounded-full glass glow-gold"
            >
              <FaHeart className="text-5xl text-gold" />
            </motion.div>
          </div>
          <h2 className="mt-8 font-display text-2xl font-semibold">Your watchlist is empty</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Tap the heart on any movie poster to curate your own private collection of animated favorites.
          </p>
          <Link
            to="/movies"
            className="mt-6 inline-flex rounded-md bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 shadow-[0_10px_40px_-10px_var(--gold-soft)]"
          >
            Discover Movies
          </Link>
        </motion.div>
      ) : (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {list.map((m, i) => (
            <MovieCard key={m.id} movie={m} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
