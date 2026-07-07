import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const socials = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/zynvoraofficial",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/zynvoraofficial/",
  },
];

export function Footer() {
  return (
    <footer className="relative mt-20 px-4 sm:px-6 lg:px-12 pb-10">
      <div className="mx-auto max-w-7xl">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--gold) 50%, transparent)",
            boxShadow: "0 0 20px var(--gold-soft)",
          }}
        />

        <div className="glass mt-10 rounded-2xl px-6 py-10 text-center">
          <div className="flex justify-center">
            <Logo size={56} />
          </div>

          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Stream Beyond Imagination
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            A premium animated cinema destination — curated favorites, streamed
            in-app.
          </p>

          {/* Footer Navigation */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <Link to="/contact" className="transition hover:text-gold">
              Contact
            </Link>

            <Link to="/privacy" className="transition hover:text-gold">
              Privacy Policy
            </Link>

            <Link to="/terms" className="transition hover:text-gold">
              Terms & Conditions
            </Link>

            <Link to="/disclaimer" className="transition hover:text-gold">
              Disclaimer
            </Link>
          </div>

          {/* Social Media */}
          <ul className="mt-8 flex items-center justify-center gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="grid h-11 w-11 place-items-center rounded-full glass text-foreground transition hover:text-gold hover:glow-gold"
                >
                  <Icon size={18} />
                </motion.a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            © 2026 Zynvora. All Rights Reserved.
          </p>

          <p
            className="mt-1 text-sm font-medium text-gold"
            style={{ textShadow: "0 0 12px var(--gold-soft)" }}
          >
            Designed &amp; Developed by Abdullah Siddiqui
          </p>
        </div>
      </div>
    </footer>
  );
}
