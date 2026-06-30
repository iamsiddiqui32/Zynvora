import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { movies, categories } from "@/data/movies";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Zynvora" },
      { name: "description", content: "Browse Zynvora by genre — Anime, Action, Fantasy, Family and more." },
      { property: "og:title", content: "Categories — Zynvora" },
      { property: "og:description", content: "Browse Zynvora by genre." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const cats = categories.filter((c) => c !== "All");
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-10">
      <h1 className="text-4xl sm:text-5xl font-bold">Categories</h1>
      <p className="mt-2 text-muted-foreground">Pick a genre and dive in.</p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {cats.map((c, i) => {
          const count = movies.filter((m) => m.genre.includes(c)).length;
          const sample = movies.find((m) => m.genre.includes(c));
          return (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <a
                href={`/movies?q=${encodeURIComponent(c)}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl glass hover:glow-gold transition"
              >
                {sample && (
                  <img
                    src={sample.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-semibold">{c}</h3>
                  <p className="text-sm text-gold">{count} {count === 1 ? "film" : "films"}</p>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
