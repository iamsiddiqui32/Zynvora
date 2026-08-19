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

      // Open Graph
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
      {
        property: "og:url",
        content: "https://zynvora.vercel.app/",
      },
      {
        property: "og:image",
        content: "https://zynvora.vercel.app/zynvora-og.jpg",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: "Zynvora — Stream Beyond Imagination",
      },

      // Twitter / X
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Zynvora — Stream Beyond Imagination",
      },
      {
        name: "twitter:description",
        content:
          "Explore the best animated movies and anime with Zynvora's fast, modern, and immersive streaming experience.",
      },
      {
        name: "twitter:image",
        content: "https://zynvora.vercel.app/zynvora-og.jpg",
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
