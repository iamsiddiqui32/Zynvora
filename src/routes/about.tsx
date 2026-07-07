import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zynvora" },
      {
        name: "description",
        content:
          "Learn more about Zynvora, a premium platform for discovering animated movies and anime with a modern cinematic experience.",
      },
      { property: "og:title", content: "About Zynvora" },
      {
        property: "og:description",
        content:
          "Discover the story behind Zynvora and our passion for animated entertainment.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 text-white">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold"
      >
        About <span className="text-gold">Zynvora</span>
      </motion.h1>

      <div className="mt-10 space-y-8 text-gray-300 leading-8">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Who We Are
          </h2>

          <p>
            Zynvora is a modern platform created for fans of animated movies and
            anime. Our mission is to provide a clean, fast, and immersive
            browsing experience where visitors can easily discover animated
            entertainment in one place.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Our Mission
          </h2>

          <p>
            We believe animation deserves a premium viewing experience.
            Zynvora focuses on elegant design, smooth performance, and simple
            navigation so users can explore their favorite animated content with
            ease across desktop and mobile devices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Our Content
          </h2>

          <p>
            Zynvora provides movie information, trailers, and a modern discovery
            experience for animation lovers. We aim to keep our content
            informative, organized, and enjoyable for our visitors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Copyright Notice
          </h2>

          <p>
            All movie titles, posters, trailers, logos, trademarks, and related
            materials displayed on this website belong to their respective
            copyright owners. Zynvora does not claim ownership of any
            third-party intellectual property and respects all applicable
            copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Built With
          </h2>

          <p>
            Zynvora is developed using modern technologies including React,
            TanStack Router, Tailwind CSS, and Framer Motion to deliver a fast,
            secure, responsive, and visually engaging experience.
          </p>
        </section>

        <div className="glass mt-12 rounded-2xl p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-gold">
            Created By
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            Abdullah Siddiqui
          </h3>

          <p className="mt-3 text-gray-300">
            Founder, Designer & Developer of Zynvora. Every part of the
            platform has been crafted with the goal of delivering a premium
            animated entertainment experience.
          </p>
        </div>
      </div>
    </div>
  );
}
