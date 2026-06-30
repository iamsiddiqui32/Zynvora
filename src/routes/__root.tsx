import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/aniflix/Navbar";
import { Footer } from "../components/aniflix/Footer";
import { BackToTop } from "../components/aniflix/BackToTop";
import { ScrollProgress } from "../components/aniflix/ScrollProgress";
import { PlayerProvider } from "../components/aniflix/MoviePlayer";
import { Toaster } from "sonner";
import zynvora from "../assets/zynvora.png.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost in the multiverse</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
          >
            Try again
          </button>
          <a href="/" className="rounded-md glass px-4 py-2 text-sm font-medium hover:text-gold">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zynvora — Stream Beyond Imagination" },
      { name: "description", content: "Zynvora is a premium animated cinema platform. Stream curated animated films in-app with a Netflix-grade experience." },
      { name: "author", content: "Abdullah Siddiqui" },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "Zynvora" },
      { property: "og:description", content: "Stream beyond imagination — premium animated cinema." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Zynvora" },
      { property: "og:image", content: zynvora.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: zynvora.url },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: zynvora.url },
      { rel: "apple-touch-icon", href: zynvora.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <div className="min-h-screen bg-background text-foreground">
          <ScrollProgress />
          <Navbar />
          <main className="pt-16">
            <Outlet />
          </main>
          <Footer />
          <BackToTop />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "oklch(0.10 0.005 25)",
                border: "1px solid oklch(0.58 0.24 27 / 35%)",
                color: "white",
              },
            }}
          />
        </div>
      </PlayerProvider>
    </QueryClientProvider>
  );
}
