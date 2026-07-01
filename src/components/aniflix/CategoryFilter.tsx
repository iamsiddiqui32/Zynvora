import { motion } from "framer-motion";

export function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: readonly string[];
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
      {categories.map((c) => {
        const on = c === active;
        return (
          <motion.button
            key={c}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(c)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
              on
                ? "bg-gold text-primary-foreground glow-gold"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </motion.button>
        );
      })}
    </div>
  );
}
