import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useSiteImages } from "@/lib/site-images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Remarkable Collection" },
      { name: "description", content: "An atelier of African journey designers headquartered in Kigali — guided by craft, conservation and a deep respect for the wild." },
      { property: "og:title", content: "About — Remarkable Collection" },
      { property: "og:description", content: "An atelier of African journey designers headquartered in Kigali — guided by craft, conservation and a deep respect for the wild." },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/about" }],
  }),
  component: AboutPage,
});

const team = [
  { name: "Aline Mukamana", role: "Founder & Head of Journey Design", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80" },
  { name: "James Otieno", role: "Director, East Africa Operations", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { name: "Naledi Khumalo", role: "Head of Conservation Partnerships", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80" },
  { name: "Patrick Niyonzima", role: "Lead Field Guide, Volcanoes", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
];

const values = [
  { k: "Crafted by hand", v: "No two itineraries are the same. Every route, lodge and guide is chosen in conversation with you." },
  { k: "Led by guides", v: "Our journey designers begin as field guides. Decisions are made by the people who walk the land." },
  { k: "Anchored in place", v: "We are East African, owned and operated. Profits return to the communities that protect the wild." },
  { k: "Quietly luxurious", v: "Refined, unhurried, never theatrical. The wilderness is the headline; we set the stage." },
];

function AboutPage() {
  const img = useSiteImages();
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="About us"
        title={<>AN ATELIER<br />FOR THE WILD.</>}
        subtitle="Remarkable Collection is an East African journey house headquartered in Kigali, designing private safaris that move at the pace of the land — and leave it better than we found it."
        image={img("hero.about", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80")}
        alt="Acacia trees on the African savanna at dawn"
      />

      {/* Story */}
      <section className="mx-auto max-w-[1180px] px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 font-display text-[36px] font-extrabold leading-[0.95] text-foreground md:text-[56px]">
              Born of a single<br />morning in Akagera.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-[17px] leading-[1.8] text-foreground/80">
            <p>
              Remarkable Collection began in 2014 with a single hand-drawn itinerary —
              seven nights between the gorillas of Volcanoes and the elephants of Akagera,
              designed for a family who had been told East Africa was not for them. They left
              changed. We did too.
            </p>
            <p>
              A decade later we operate across nine African countries, but our discipline is
              unchanged: every journey is composed in private, in conversation, by a small team
              of designers who have all guided in the field. We do not run group tours. We do
              not publish brochures. The only itinerary we will ever propose is yours.
            </p>
            <p>
              Today, more than 1,400 guides, trackers, hosts and conservationists carry the
              Remarkable name across East and Southern Africa — a quiet network of people who
              believe that travel, done with care, can still be one of the most generous things
              we do.
            </p>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section style={{ background: "var(--ink)", color: "var(--cream)" }}>
        <div className="mx-auto grid max-w-[1500px] gap-12 px-6 py-24 md:grid-cols-2 md:px-10 md:py-32">
          <div>
            <span className="eyebrow text-white/60">Our mission</span>
            <h2 className="mt-4 font-display text-[40px] font-extrabold leading-[0.95] text-white md:text-[64px]">
              To design journeys that<br />out-last the journey.
            </h2>
          </div>
          <div>
            <span className="eyebrow text-white/60">Our vision</span>
            <p className="mt-4 text-[18px] leading-[1.7] text-white/85">
              An Africa where wildness is a thriving inheritance — where every traveller
              becomes an unwitting custodian, every lodge a community livelihood, and every
              dawn a small, daily act of conservation.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-12">
          <span className="eyebrow">What guides us</span>
          <h2 className="mt-3 font-display text-[40px] font-extrabold leading-[0.95] text-foreground md:text-[72px]">
            FOUR PRINCIPLES.<br />ONE PROMISE.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.k} className="rounded-3xl bg-white p-7">
              <div className="font-display text-[22px] font-extrabold text-foreground">{v.k}</div>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{v.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">The atelier</span>
            <h2 className="mt-3 font-display text-[40px] font-extrabold leading-[0.95] text-foreground md:text-[64px]">
              People behind<br />the journeys.
            </h2>
          </div>
          <Link to="/contact" className="btn-ink">
            Speak with a designer <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="overflow-hidden rounded-3xl bg-white">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="font-display text-[18px] font-extrabold text-foreground">{m.name}</div>
                <div className="mt-1 text-[13px] text-muted-foreground">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
