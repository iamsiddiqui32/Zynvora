import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBars, FaTimes, FaUserCircle, FaStar, FaHistory } from "react-icons/fa";
import { movies } from "@/data/movies";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/categories", label: "Categories" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("aniflix:recent-searches");
      if (raw) setRecent(JSON.parse(raw));
    } catch { /* empty */ }
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setFocus(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const suggestions = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return [];
    return movies
      .filter((m) => m.title.toLowerCase().includes(n) || m.genre.some((g) => g.toLowerCase().includes(n)))
      .slice(0, 6);
  }, [q]);

  const submit = (value: string) => {
    const v = value.trim();
    if (!v) return;
    const next = [v, ...recent.filter((r) => r.toLowerCase() !== v.toLowerCase())].slice(0, 5);
    setRecent(next);
    try { window.localStorage.setItem("aniflix:recent-searches", JSON.stringify(next)); } catch { /* empty */ }
    setFocus(false);
    navigate({ to: "/movies", search: { q: v } as never });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Zynvora — Home" className="flex items-center">
          <Logo size={36} />
        </Link>

        <nav className="ml-6 hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-gold" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="transition hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div ref={boxRef} className="relative ml-auto hidden md:block">
          <form
            onSubmit={(e) => { e.preventDefault(); submit(q); }}
            className="flex items-center gap-2 rounded-full glass px-3 py-1.5 transition focus-within:glow-gold"
          >
            <FaSearch className="text-muted-foreground text-xs" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocus(true)}
              placeholder="Search titles, genres…"
              aria-label="Search"
              className="w-52 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>
          <AnimatePresence>
            {focus && (q.trim() ? suggestions.length > 0 : recent.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl glass shadow-2xl"
              >
                {q.trim() ? (
                  <ul className="py-2">
                    {suggestions.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => submit(s.title)}
                          className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-white/5"
                        >
                          <img src={s.image} alt="" className="h-10 w-7 rounded object-cover" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate">{s.title}</p>
                            <p className="truncate text-[11px] text-muted-foreground">{s.genre.slice(0,2).join(" · ")} · {s.year}</p>
                          </div>
                          <span className="flex items-center gap-1 text-[11px] text-gold"><FaStar />{s.rating.toFixed(1)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-2">
                    <p className="px-2 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">Recent</p>
                    <ul>
                      {recent.map((r) => (
                        <li key={r}>
                          <button
                            type="button"
                            onClick={() => submit(r)}
                            className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-white/5"
                          >
                            <FaHistory className="text-muted-foreground" />
                            <span>{r}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          aria-label="Account"
          className="hidden md:grid h-9 w-9 place-items-center rounded-full glass text-gold hover:glow-gold transition"
        >
          <FaUserCircle />
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="ml-auto md:hidden grid h-10 w-10 place-items-center rounded-md glass text-foreground"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-4 py-3">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="py-2 text-base transition hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
