import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Linkedin, Youtube } from "lucide-react";

const groups = [
  {
    title: "Company",
    items: [
      { label: "About us", to: "/about" as const },
      { label: "Conservation", to: "/conservation" as const },
      { label: "Blog", to: "/blog" as const },
      { label: "Testimonials", to: "/testimonials" as const },
      { label: "Contact", to: "/contact" as const },
    ],
  },
  {
    title: "Destinations",
    items: [
      { label: "Rwanda", to: "/destinations" as const },
      { label: "Kenya", to: "/destinations" as const },
      { label: "Tanzania", to: "/destinations" as const },
      { label: "Uganda", to: "/destinations" as const },
      { label: "All destinations", to: "/destinations" as const },
    ],
  },
  {
    title: "Experiences",
    items: [
      { label: "Wildlife Safaris", to: "/experiences" as const },
      { label: "Birdwatching", to: "/experiences" as const },
      { label: "Walking Safaris", to: "/experiences" as const },
      { label: "Photography", to: "/experiences" as const },
      { label: "Cultural Journeys", to: "/experiences" as const },
    ],
  },
  {
    title: "Responsibility",
    items: [
      { label: "Sustainability", to: "/conservation" as const },
      { label: "Communities", to: "/conservation" as const },
      { label: "Wildlife funds", to: "/conservation" as const },
      { label: "Carbon offsetting", to: "/conservation" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div className="mx-auto max-w-[1500px] px-6 pt-20 pb-10 md:px-10 md:pt-28">
        {/* Top supergraphic */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[44px] font-extrabold tracking-tight text-white md:text-[88px]">
            REMARKABLE<span style={{ color: "var(--signal)" }}>.</span>
          </h2>
          <Link to="/contact" className="btn-cobalt self-start md:self-auto">
            Begin your journey <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-4">
          {groups.map((g) => (
            <div key={g.title}>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-white/50">
                {g.title}
              </div>
              <ul className="mt-5 space-y-3 text-[15px] text-white/85">
                {g.items.map((i) => (
                  <li key={i.label}>
                    <Link to={i.to} className="hover:text-white">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Remarkable Collection Ltd · Kigali, Rwanda</div>
          <div className="flex items-center gap-3">
            <a className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/10" href="#"><Instagram className="h-4 w-4" /></a>
            <a className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/10" href="#"><Linkedin className="h-4 w-4" /></a>
            <a className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/10" href="#"><Youtube className="h-4 w-4" /></a>
          </div>
          <div className="flex gap-5">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}