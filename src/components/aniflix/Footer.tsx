import { motion } from "framer-motion";
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Logo } from "./Logo";

const socials = [
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@iamsiddiqui32" },
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61560559612747" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/iamsiddiqui32/" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-siddiqui-123970304/?skipRedirect=true" },
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
            A premium animated cinema destination — curated favorites, streamed in-app.
          </p>

          <ul className="mt-6 flex items-center justify-center gap-4">
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
                  <Icon />
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
