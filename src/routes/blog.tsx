import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Travel Insights — Remarkable Destinations" },
      { name: "description", content: "Field notes, planning guides and conservation stories from East Africa's most experienced safari designers." },
      { property: "og:title", content: "Blog & Travel Insights — Remarkable Destinations" },
      { property: "og:description", content: "Field notes, planning guides and conservation stories from East Africa." },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/blog" }],
  }),
  component: BlogPage,
});

const featured = {
  tag: "Field notes",
  date: "Jun 2026",
  title: "What a gorilla trek actually feels like — minute by minute",
  excerpt: "A first-person account from one of our senior trackers in Volcanoes National Park, from the 5am briefing to the hour you spend, breath held, in their company.",
  img: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&w=1600&q=80",
};

const posts = [
  { tag: "Planning", date: "May 2026", title: "When to travel for the Great Migration — month by month", excerpt: "A complete calendar of the migration's movements across the Serengeti–Mara ecosystem, and the camps positioned to receive it.", img: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80" },
  { tag: "Conservation", date: "May 2026", title: "How a gorilla permit actually pays for protection", excerpt: "We trace the path of a single Rwandan permit — from your booking confirmation to the salaries of the rangers it funds.", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80" },
  { tag: "Families", date: "Apr 2026", title: "A safari with children — what we ask first", excerpt: "Ages, pacing, lodges with family rooms, and the four questions every honest safari designer should ask before quoting.", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" },
  { tag: "Photography", date: "Mar 2026", title: "Five frames every safari photographer regrets missing", excerpt: "Pre-dawn balloon shadows, the wildebeest crossing eye-line, the lion-cub yawn — and how to position your vehicle for each.", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80" },
  { tag: "Honeymoons", date: "Feb 2026", title: "Three honeymoons we designed last season — and why each was right", excerpt: "Gorillas & beach, Mara & Lamu, Volcanoes & Lake Kivu. Different couples, different rhythms — the same quiet logic.", img: "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?auto=format&fit=crop&w=1200&q=80" },
  { tag: "Field notes", date: "Jan 2026", title: "A week with the elephants of Amboseli", excerpt: "Our head of conservation spent seven days with the Amboseli Trust's matriarch families. These are the notes she brought back.", img: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1200&q=80" },
];

function BlogPage() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Travel insights"
        title={<>STORIES FROM<br />THE FIELD.</>}
        subtitle="Planning guides, conservation reporting and quiet field notes — written by the guides, designers and photographers who carry the Remarkable name across East Africa."
        image="https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=1920&q=80"
        alt="Vehicle silhouette in storm light over savanna"
      />

      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 md:py-28">
        <article className="grid items-center gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-[32px]">
            <img src={featured.img} alt={featured.title} className="aspect-[5/4] w-full object-cover" />
          </div>
          <div>
            <span className="tag-pill">{featured.tag}</span>
            <div className="mt-4 text-[12px] uppercase tracking-wider text-muted-foreground">{featured.date} · Featured</div>
            <h2 className="mt-3 font-display text-[34px] font-extrabold leading-[1] text-foreground md:text-[56px]">
              {featured.title}
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-muted-foreground md:text-[17px]">{featured.excerpt}</p>
            <button type="button" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-foreground">
              Read the article <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="mb-10">
          <span className="eyebrow">Latest</span>
          <h2 className="mt-3 font-display text-[32px] font-extrabold leading-[0.95] text-foreground md:text-[48px]">
            More from the journal.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="group flex flex-col overflow-hidden rounded-3xl bg-white">
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="tag-pill absolute left-4 top-4">{p.tag}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="text-[12px] uppercase tracking-wider text-muted-foreground">{p.date}</div>
                <h3 className="mt-3 font-display text-[20px] font-extrabold leading-[1.15] text-foreground md:text-[24px]">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground">{p.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-[14px] font-medium text-foreground">
                  Read article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-28 md:px-10 md:pb-40">
        <div className="rounded-[40px] px-8 py-16 text-center md:px-16 md:py-20" style={{ background: "var(--cream)" }}>
          <h2 className="font-display text-[32px] font-extrabold leading-[0.98] text-foreground md:text-[48px]">
            Reading is the easy part.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted-foreground">
            When you are ready to step into the story, our designers are in Kigali — and on email.
          </p>
          <Link to="/contact" className="btn-ink mt-8 inline-flex">
            Plan my safari <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}