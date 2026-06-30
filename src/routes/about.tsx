import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zynvora" },
      { name: "description", content: "Zynvora is a premium animated cinema platform — discover films and stream them in-app." },
      { property: "og:title", content: "About Zynvora" },
      { property: "og:description", content: "Premium animated cinema. Stream beyond imagination." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-12 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold"
      >
        About <span className="text-gold">Zynvora</span>
      </motion.h1>

      <div className="prose prose-invert mt-8 space-y-5 text-muted-foreground">
        <p className="text-lg">
          Zynvora is a premium <span className="text-foreground">animated cinema platform</span>.
          We curate the best in animation — from anime classics to modern blockbusters —
          and stream them right inside the app with a cinematic, theater-mode experience.
        </p>
        <p>
          Playback is powered by an embedded player sourced from publicly available
          uploads. All rights remain with the original publishers and creators.
        </p>
        <p>
          The interface is built with React, TanStack Router, Tailwind CSS, and
          Framer Motion — designed to feel cinematic on any device.
        </p>

        <div className="glass mt-10 rounded-2xl p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Created by</p>
          <p className="mt-2 text-xl font-semibold text-foreground">Abdullah Siddiqui</p>
          <p className="mt-1 text-sm">Designer & developer. Find me on the socials in the footer.</p>
        </div>
      </div>
    </div>
  );
}
