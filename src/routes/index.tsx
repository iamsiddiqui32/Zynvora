import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/aniflix/Hero";
import { MovieRow } from "@/components/aniflix/MovieRow";
import { movies, sections } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zynvora — Stream Beyond Imagination" },
      { name: "description", content: "Trending animated movies, curated rows, and an in-app cinematic player." },
      { property: "og:title", content: "Zynvora — Premium Animated Cinema" },
      { property: "og:description", content: "Trending animated movies, curated rows, and an in-app cinematic player." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = movies.find((m) => m.featured) ?? movies[0];
  const rotation = movies.filter((m) => m.featured);
  return (
    <div className="-mt-16">
      <Hero movie={featured} rotation={rotation.length ? rotation : [featured]} />
      <div className="pb-10">
        {sections.map((s) => (
          <MovieRow key={s.title} title={s.title} movies={movies.filter(s.filter)} />
        ))}
      </div>
    </div>
  );
}
