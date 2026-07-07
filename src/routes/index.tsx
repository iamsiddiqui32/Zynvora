import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/aniflix/Hero";
import { MovieRow } from "@/components/aniflix/MovieRow";
import { movies, sections } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Zynvora — Stream Beyond Imagination",
      },
      {
        name: "description",
        content:
          "Zynvora is a premium animated movie platform where you can explore trending anime and animated movies with a modern cinematic streaming experience.",
      },
      {
        name: "keywords",
        content:
          "Zynvora, animated movies, anime, cartoons, fantasy movies, streaming",
      },
      {
        property: "og:title",
        content: "Zynvora — Stream Beyond Imagination",
      },
      {
        property: "og:description",
        content:
          "Explore the best animated movies and anime with Zynvora's fast, modern, and immersive streaming experience.",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = movies.find((m) => m.featured) ?? movies[0];

  const rotation = movies.filter((m) => m.featured);

  return (
    <div className="-mt-16">
      <Hero
        movie={featured}
        rotation={rotation.length ? rotation : [featured]}
      />

      <div className="pb-10">
        {sections.map((s) => (
          <MovieRow
            key={s.title}
            title={s.title}
            movies={movies.filter(s.filter)}
          />
        ))}
      </div>
    </div>
  );
}
