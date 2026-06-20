import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Linkedin, Youtube } from "lucide-react";

const groups = [
  {
    title: "Company",
    items: ["About us", "Newsroom", "Investors", "Magazine", "Careers"],
  },
  {
    title: "Destinations",
    items: ["Rwanda", "Kenya", "Tanzania", "Zanzibar", "Namibia", "Botswana"],
  },
  {
    title: "Journeys",
    items: ["Honeymoon", "Family", "Photographic", "Conservation", "Private jet"],
  },
  {
    title: "Responsibility",
    items: ["Sustainability", "Communities", "Wildlife funds", "Carbon offsetting"],
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
                  <li key={i} className="hover:text-white">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Remarkable Destinations Ltd · Kigali, Rwanda</div>
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