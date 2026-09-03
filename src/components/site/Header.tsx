import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, Search, Menu, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import elephantLogo from "@/assets/elephant-raw-logo.png.asset.json";
import { useSiteImages } from "@/lib/site-images";

const nav = [
  { to: "/about", label: "About" },
  { to: "/destinations", label: "Destinations" },
  { to: "/experiences", label: "Experiences" },
  { to: "/gallery", label: "Gallery" },
  { to: "/conservation", label: "Conservation" },
  { to: "/blog", label: "Blog" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export function Header({ transparent = false }: { transparent?: boolean }) {
  const onDark = transparent;
  const [open, setOpen] = useState(false);
  const img = useSiteImages();
  const logoSrc = img("brand.logo", elephantLogo.url);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="relative mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <img
            src={logoSrc}
            alt="Remarkable Destinations"
            className="h-16 w-auto md:h-20 lg:h-24"
          />
          <div className="hidden lg:flex flex-col justify-center leading-none">
            <span
              className={
                "font-display text-[22px] font-extrabold tracking-tight uppercase sm:text-[26px] md:text-[30px] lg:text-[34px] " +
                (onDark ? "text-white" : "text-foreground")
              }
            >
              Remarkable
            </span>
            <span
              className={
                "mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] sm:text-[11px] md:text-xs " +
                (onDark ? "text-white/70" : "text-foreground/60")
              }
            >
              Destinations
            </span>
          </div>
        </Link>

        {/* Centered brand text on mobile */}
        <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center leading-none pointer-events-none">
          <span
            className={
              "font-display text-[22px] font-extrabold tracking-tight uppercase sm:text-[26px] " +
              (onDark ? "text-white" : "text-foreground")
            }
          >
            Remarkable
          </span>
          <span
            className={
              "mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] sm:text-[11px] " +
              (onDark ? "text-white/70" : "text-foreground/60")
            }
          >
            Destinations
          </span>
        </div>

        {/* Desktop pill nav */}
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
              className="rounded-full px-3 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "bg-foreground text-white rounded-full px-3 py-2 text-[13px] font-medium" }}
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
              "hidden md:grid h-11 w-11 place-items-center rounded-full " +
              (onDark ? "bg-white/85 text-foreground" : "bg-white text-foreground")
            }
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Language"
            className={
              "hidden md:grid h-11 w-11 place-items-center rounded-full " +
              (onDark ? "bg-white/85 text-foreground" : "bg-white text-foreground")
            }
          >
            <Globe className="h-4 w-4" />
          </button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={
                  "lg:hidden grid h-11 w-11 place-items-center rounded-full " +
                  (onDark ? "bg-white/85 text-foreground" : "bg-white text-foreground")
                }
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[480px] border-l-0 bg-ink p-0 text-cream"
            >
              <div className="flex h-full flex-col px-8 pt-10 pb-12">
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="absolute right-6 top-6 text-cream/70 transition-colors hover:text-cream"
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="6" y1="6" x2="22" y2="22" />
                    <line x1="22" y1="6" x2="6" y2="22" />
                  </svg>
                </button>

                {/* Brand */}
                <div className="flex items-center gap-3 mb-14">
                  <img
                    src={logoSrc}
                    alt="Remarkable Destinations"
                    className="h-12 w-auto brightness-0 invert"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-[20px] font-extrabold tracking-tight uppercase text-cream">
                      Remarkable
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/60">
                      Destinations
                    </span>
                  </div>
                </div>

                {/* Nav */}
                <nav className="flex flex-col">
                  {nav.map((n) => (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between border-b border-cream/10 py-6 text-[13px] font-normal uppercase tracking-[0.18em] text-cream/80 transition-colors hover:text-cream"
                      activeProps={{ className: "group flex items-center justify-between border-b border-cream/10 py-6 text-[13px] font-normal uppercase tracking-[0.18em] text-cream" }}
                    >
                      <span>{n.label}</span>
                      <ArrowRight className="h-4 w-4 text-cream/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cream" />
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}