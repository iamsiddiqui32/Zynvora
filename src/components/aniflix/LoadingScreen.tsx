import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: [0.95, 1.02, 0.95], opacity: 1 }}
          transition={{ scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
        >
          <Logo size={88} />
        </motion.div>
        <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="h-full w-1/3 bg-gold"
          />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Stream Beyond Imagination
        </p>
      </div>
    </div>
  );
}
