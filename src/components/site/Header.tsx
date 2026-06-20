import { Link } from "@tanstack/react-router";
import { Globe, Search } from "lucide-react";

const nav = [
  { to: "/destinations", label: "Destinations" },
  { to: "/journeys", label: "Journeys" },
  { to: "/about", label: "About us" },
  { to: "/journal", label: "Magazine" },
  { to: "/contact", label: "Contact" },
];

export function Header({ transparent = false }: { transparent?: boolean }) {
  const onDark = transparent;
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-7">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="grid place-items-center rounded-full text-[18px] font-black"
            style={{
              background: "var(--signal)",
              color: "#fff",
              width: 42,
              height: 42,
            }}
          >
            R
          </span>
          <span
            className={
              "hidden font-display text-[18px] font-extrabold tracking-tight md:block " +
              (onDark ? "text-white" : "text-foreground")
            }
          >
            REMARKABLE<span style={{ color: "var(--signal)" }}>.</span>
          </span>
        </Link>

        {/* Pill nav */}
        <nav
          className={
            "hidden items-center gap-1 rounded-full px-2 py-1.5 lg:flex " +
            (onDark
              ? "bg-white/85 backdrop-blur-md"
              : "bg-white shadow-[0_1px_0_rgba(11,14,46,0.06)]")
          }
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-[14px] font-medium text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "bg-foreground text-white rounded-full px-4 py-2 text-[14px] font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className={
              "grid h-11 w-11 place-items-center rounded-full " +
              (onDark ? "bg-white/85 text-foreground" : "bg-white text-foreground")
            }
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Language"
            className={
              "grid h-11 w-11 place-items-center rounded-full " +
              (onDark ? "bg-white/85 text-foreground" : "bg-white text-foreground")
            }
          >
            <Globe className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}