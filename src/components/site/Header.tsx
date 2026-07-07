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

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <img
            src={elephantLogo.url}
            alt="Remarkable Destination"
            className="h-16 w-auto md:h-20 lg:h-24"
          />
          <div className="flex flex-col justify-center leading-none">
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
              Destination
            </span>
          </div>
        </Link>

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
            <SheetContent side="right" className="w-full sm:w-[400px]">
              <SheetHeader>
              <SheetTitle className="flex items-center gap-3">
                  <img
                    src={elephantLogo.url}
                    alt="Remarkable Destination"
                    className="h-14 w-auto"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-[22px] font-extrabold tracking-tight uppercase">
                      Remarkable
                    </span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/60">
                      Destination
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-2">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-[16px] font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    activeProps={{ className: "rounded-xl px-4 py-3 text-[16px] font-medium bg-foreground text-white" }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}