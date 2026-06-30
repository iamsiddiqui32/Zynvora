import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const ratio = max > 0 ? h.scrollTop / max : 0;
      setShow(h.scrollTop > 600);
      setP(ratio);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const R = 22;
  const C = 2 * Math.PI * R;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-black/70 backdrop-blur-xl text-gold hover:text-primary-foreground hover:bg-gold transition-colors glow-gold"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r={R} fill="none" stroke="oklch(1 0 0 / 10%)" strokeWidth="3" />
            <circle
              cx="28" cy="28" r={R} fill="none" stroke="var(--gold)" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - p)}
              style={{ transition: "stroke-dashoffset 100ms linear" }}
            />
          </svg>
          <FaArrowUp className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
