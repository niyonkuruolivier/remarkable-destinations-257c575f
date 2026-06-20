import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/journeys", label: "Journeys" },
  { to: "/gallery", label: "Gallery" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
];

export function Header({ transparent = false }: { transparent?: boolean }) {
  return (
    <header
      className={
        "absolute inset-x-0 top-0 z-40 " +
        (transparent ? "" : "bg-background border-b border-border")
      }
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Remarkable Destinations"
            className={"h-10 w-auto " + (transparent ? "invert" : "")}
          />
          <div className="hidden flex-col leading-tight md:flex">
            <span
              className={
                "font-display text-[20px] italic " +
                (transparent ? "text-ivory" : "text-foreground")
              }
            >
              Remarkable
            </span>
            <span
              className={
                "text-[10px] tracking-[0.32em] uppercase " +
                (transparent ? "text-gold" : "text-muted-foreground")
              }
            >
              Destinations
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={
                "text-[12px] font-medium tracking-[0.18em] uppercase transition-colors " +
                (transparent
                  ? "text-ivory/80 hover:text-gold"
                  : "text-foreground/80 hover:text-gold")
              }
              activeProps={{
                className: transparent ? "text-gold" : "text-gold",
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="btn-primary !py-3 !px-5 text-[11px]">
          Plan Your Safari
        </Link>
      </div>
    </header>
  );
}