import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Bird, Camera, Footprints, Mountain, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useSiteImages } from "@/lib/site-images";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Safari Experiences — Wildlife, Walking, Photography, Cultural | Remarkable" },
      { name: "description", content: "Six ways to encounter Africa — wildlife safaris, birdwatching, walking safaris, photography, cultural journeys and private luxury adventures." },
      { property: "og:title", content: "Safari Experiences — Remarkable Collection" },
      { property: "og:description", content: "Six ways to encounter Africa, each privately designed around you." },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/experiences" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/experiences" }],
  }),
  component: ExperiencesPage,
});

const experiences = [
  {
    icon: Mountain,
    title: "Wildlife Safaris",
    blurb: "Game drives at the hands of senior guides — the Great Migration, the predators of the Mara, the elephants of Amboseli, and the secret corners few travellers ever reach.",
    img: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Bird,
    title: "Birdwatching",
    blurb: "From the shoebill's stare in the Mabamba swamps to the flamingo flush of Lake Nakuru — itineraries with East Africa's most respected ornithological guides.",
    img: "https://images.unsplash.com/photo-1452857297128-d9c29adba80b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Footprints,
    title: "Walking Safaris",
    blurb: "Step off the vehicle and into the bush with armed rangers and trackers. The detail you have only ever read about — fresh prints, the smell of crushed sage, the long silence.",
    img: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Camera,
    title: "Photography Safaris",
    blurb: "Dedicated photographic vehicles, beanbags, two guests per row, golden-hour positioning, and optional one-on-one tuition with award-winning African photographers.",
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Users,
    title: "Cultural Experiences",
    blurb: "Coffee ceremonies in the Rwandan hills, an evening with Maasai elders, a Swahili kitchen on the coast — measured, respectful, never staged.",
    img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Sparkles,
    title: "Luxury Adventures",
    blurb: "Heli-safaris over the Serengeti, hot-air balloons at dawn, private mobile camps, helicopter to Mount Kenya, and ocean finales on the Indian Ocean.",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
  },
];

const sample = [
  { d: "10 nights", t: "Gorillas, Plains & Beach", p: "Rwanda · Kenya · Zanzibar" },
  { d: "7 nights", t: "The Migration Chase", p: "Maasai Mara · Serengeti" },
  { d: "12 nights", t: "Family Pearl of Africa", p: "Uganda · Lake Bunyonyi · Bwindi" },
];

function ExperiencesPage() {
  const img = useSiteImages();
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Safari experiences"
        title={<>SIX WAYS<br />TO MEET AFRICA.</>}
        subtitle="Every Remarkable journey is bespoke — but they begin from six well-loved foundations. Blend any of them, in any order, on any continent of the wild."
        image={img("hero.experiences", "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80")}
        alt="Rainforest canopy in Uganda"
      />

      <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((e) => {
            const Icon = e.icon;
            return (
              <article key={e.title} className="overflow-hidden rounded-[32px] bg-white">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={e.img} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-7 md:p-9">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: "var(--cream)" }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-[26px] font-extrabold text-foreground md:text-[32px]">
                      {e.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground md:text-[16px]">
                    {e.blurb}
                  </p>
                  <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-foreground">
                    Plan this experience <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ background: "var(--ink)", color: "#fff" }}>
        <div className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow text-white/60">Starting points</span>
              <h2 className="mt-3 font-display text-[40px] font-extrabold leading-[0.95] md:text-[64px]">
                A FEW IDEAS,<br />NEVER A SCRIPT.
              </h2>
            </div>
            <Link to="/contact" className="rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-foreground hover:bg-cream">
              Compose mine
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {sample.map((s) => (
              <div key={s.t} className="rounded-3xl border border-white/15 p-7">
                <div className="text-[12px] uppercase tracking-wider text-white/55">{s.d}</div>
                <h3 className="mt-3 font-display text-[26px] font-extrabold leading-tight text-white">{s.t}</h3>
                <p className="mt-3 text-[14px] text-white/70">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}