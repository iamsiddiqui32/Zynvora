import { FaSearch } from "react-icons/fa";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search by title, genre, year…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex w-full items-center gap-3 rounded-full glass px-5 py-3">
      <FaSearch className="text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search movies"
        className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}
