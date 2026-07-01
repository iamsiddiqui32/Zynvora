import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBars, FaTimes, FaUserCircle, FaStar, FaHistory, FaHeart, FaPlay, FaTrash, FaClock } from "react-icons/fa";
import { movies } from "@/data/movies";
import { Logo } from "./Logo";
import { useWatchHistory, clearHistory } from "@/lib/history";
import { useFavorites } from "@/lib/favorites";
import { usePlayer } from "./MoviePlayer";

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const { entries } = useWatchHistory();
  const { ids: favIds } = useFavorites();
  const { open: openPlayer } = usePlayer();

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
      if (!profileRef.current?.contains(e.target as Node)) setProfileOpen(false);
      if (!mobileSearchRef.current?.contains(e.target as Node)) setMobileSearchOpen(false);
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
    setMobileSearchOpen(false);
    setOpen(false);
    navigate({ to: "/movies", search: { q: v } as never });
  };

  const historyMovies = useMemo(
    () => entries.map((e) => movies.find((m) => m.id === e.id)).filter(Boolean).slice(0, 5) as typeof movies,
    [entries],
  );
  const continueWatching = historyMovies[0];

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

        <ProfileMenu
          className="hidden md:block"
          open={profileOpen}
          setOpen={setProfileOpen}
          triggerRef={profileRef}
          historyMovies={historyMovies}
          favCount={favIds.length}
          continueWatching={continueWatching}
          onPlay={(m) => { setProfileOpen(false); openPlayer(m); }}
          onNav={(to) => { setProfileOpen(false); navigate({ to } as never); }}
        />

        {/* Mobile: search + profile + menu */}
        <div ref={mobileSearchRef} className="ml-auto md:hidden flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Search"
            aria-expanded={mobileSearchOpen}
            className="grid h-10 w-10 place-items-center rounded-full glass text-foreground"
          >
            {mobileSearchOpen ? <FaTimes /> : <FaSearch />}
          </button>
          <ProfileMenu
            className="block"
            open={profileOpen}
            setOpen={setProfileOpen}
            triggerRef={profileRef}
            historyMovies={historyMovies}
            favCount={favIds.length}
            continueWatching={continueWatching}
            onPlay={(m) => { setProfileOpen(false); openPlayer(m); }}
            onNav={(to) => { setProfileOpen(false); navigate({ to } as never); }}
          />
          <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full glass text-foreground"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
        </div>
      </div>

      {/* Mobile search sheet */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3">
              <form
                onSubmit={(e) => { e.preventDefault(); submit(q); }}
                className="flex items-center gap-2 rounded-full glass px-3 py-2"
              >
                <FaSearch className="text-muted-foreground text-xs" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search titles, genres…"
                  aria-label="Search"
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                {q && (
                  <button type="button" onClick={() => setQ("")} aria-label="Clear" className="text-muted-foreground">
                    <FaTimes className="text-xs" />
                  </button>
                )}
              </form>
              {(q.trim() ? suggestions.length > 0 : recent.length > 0) && (
                <div className="mt-2 overflow-hidden rounded-xl glass">
                  {q.trim() ? (
                    <ul className="py-1">
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
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

type Movie = typeof movies[number];

function ProfileMenu({
  className,
  open,
  setOpen,
  triggerRef,
  historyMovies,
  favCount,
  continueWatching,
  onPlay,
  onNav,
}: {
  className?: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  historyMovies: Movie[];
  favCount: number;
  continueWatching: Movie | undefined;
  onPlay: (m: Movie) => void;
  onNav: (to: string) => void;
}) {
  return (
    <div ref={triggerRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Account menu"
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-full glass text-gold hover:glow-gold transition"
      >
        <FaUserCircle />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-[280px] overflow-hidden rounded-xl glass shadow-2xl z-50"
          >
            <div className="border-b border-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Signed in as</p>
              <p className="mt-0.5 truncate text-sm font-semibold">Guest Viewer</p>
            </div>

            {continueWatching && (
              <button
                type="button"
                onClick={() => onPlay(continueWatching)}
                className="flex w-full items-center gap-3 border-b border-white/5 p-3 text-left hover:bg-white/5"
              >
                <img src={continueWatching.image} alt="" className="h-14 w-10 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-gold">Continue Watching</p>
                  <p className="truncate text-sm font-medium">{continueWatching.title}</p>
                </div>
                <FaPlay className="text-xs text-gold" />
              </button>
            )}

            <MenuRow icon={<FaHeart />} label="Favorites" hint={favCount ? String(favCount) : undefined} onClick={() => onNav("/favorites")} />
            <MenuRow icon={<FaHistory />} label="Watch History" hint={historyMovies.length ? String(historyMovies.length) : undefined} onClick={() => setOpen(false)} />

            {historyMovies.length > 0 && (
              <>
                <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Recently Watched
                </div>
                <ul className="max-h-52 overflow-y-auto pb-2">
                  {historyMovies.map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => onPlay(m)}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-white/5"
                      >
                        <img src={m.image} alt="" className="h-10 w-7 rounded object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm">{m.title}</p>
                          <p className="text-[10px] text-muted-foreground">{m.year} · {m.duration}</p>
                        </div>
                        <FaClock className="text-[10px] text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => { clearHistory(); }}
                  className="flex w-full items-center gap-2 border-t border-white/5 px-4 py-2.5 text-left text-xs text-red-400 hover:bg-red-500/10"
                >
                  <FaTrash /> Clear Watch History
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuRow({ icon, label, hint, onClick }: { icon: React.ReactNode; label: string; hint?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-white/5"
    >
      <span className="text-gold">{icon}</span>
      <span className="flex-1">{label}</span>
      {hint && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold">{hint}</span>}
    </button>
  );
}
