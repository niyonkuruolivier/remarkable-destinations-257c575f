import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useSiteImages } from "@/lib/site-images";

export const Route = createFileRoute("/conservation")({
  head: () => ({
    meta: [
      { title: "Conservation & Sustainability — Remarkable Collection" },
      { name: "description", content: "Every Remarkable journey funds measurable conservation — gorilla protection, anti-poaching, community livelihoods and carbon balance across East Africa." },
      { property: "og:title", content: "Conservation & Sustainability — Remarkable Collection" },
      { property: "og:description", content: "Travel that pays the wild back. Real projects. Measured outcomes." },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/conservation" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/conservation" }],
  }),
  component: ConservationPage,
});

const projects = [
  {
    place: "Volcanoes, Rwanda",
    title: "Gorilla Guardian Programme",
    body: "Funding ranger salaries and veterinary outreach in partnership with the Rwanda Development Board. Every guest gorilla permit contributes to long-term habitat protection.",
    img: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    place: "Laikipia, Kenya",
    title: "Northern Rangelands Trust",
    body: "Community conservancies that have brought elephant numbers back from collapse — and given pastoral communities a stake in the wildlife on their land.",
    img: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80",
  },
  {
    place: "Serengeti, Tanzania",
    title: "Anti-Poaching Patrols",
    body: "Supporting K9 units and ranger deployment along the most contested corridors of the Western Serengeti. Independently audited; outcomes published annually.",
    img: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1200&q=80",
  },
  {
    place: "Bwindi, Uganda",
    title: "Forest Edge Livelihoods",
    body: "Beekeeping cooperatives, coffee-buying programmes and women-led tourism enterprises on the forest perimeter — alternatives to the forest, for the forest.",
    img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
  },
];

const pillars = [
  { k: "−46%", v: "Carbon per guest night since 2019" },
  { k: "100%", v: "Lodges on renewable energy by 2027" },
  { k: "$3.2M", v: "Conservation funded in 2025" },
  { k: "11", v: "Community partnerships across East Africa" },
];

function ConservationPage() {
  const img = useSiteImages();
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Conservation & sustainability"
        title={<>TRAVEL THAT PAYS<br />THE WILD BACK.</>}
        subtitle="Sustainability is not a department at Remarkable — it is the operating model. Each itinerary is engineered to leave the land, the wildlife and the people who steward them measurably better."
        image={img("hero.conservation", "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1920&q=80")}
        alt="Ranger watching elephants at dusk"
      />

      <section className="mx-auto max-w-[1180px] px-6 py-24 text-center md:py-32">
        <span className="eyebrow">The covenant</span>
        <h2 className="mt-4 font-display text-[36px] font-extrabold leading-[1] text-foreground md:text-[60px]">
          We do not protect the wild because we are travellers.<br />
          <span style={{ color: "var(--signal)" }}>We travel because the wild is worth protecting.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.8] text-muted-foreground">
          From the first dollar of your deposit to the last litre of fuel in a guide's vehicle, every part of a Remarkable journey is audited against four pillars: wildlife, climate, community and craft.
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="grid gap-4 md:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.k} className="rounded-3xl bg-white p-7">
              <div className="font-display text-[44px] font-extrabold tracking-tight text-foreground md:text-[56px]">{p.k}</div>
              <div className="mt-2 text-[14px] text-muted-foreground">{p.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="mb-12">
          <span className="eyebrow">Field projects</span>
          <h2 className="mt-3 font-display text-[40px] font-extrabold leading-[0.95] text-foreground md:text-[64px]">
            FOUR LANDSCAPES.<br />ONE CONTINENT.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} className="overflow-hidden rounded-[32px] bg-white">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-7 md:p-9">
                <div className="text-[12px] uppercase tracking-wider text-muted-foreground">{p.place}</div>
                <h3 className="mt-2 font-display text-[26px] font-extrabold text-foreground md:text-[30px]">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-28 md:px-10 md:pb-40">
        <div className="rounded-[40px] px-8 py-16 text-center md:px-16 md:py-24" style={{ background: "var(--cobalt)", color: "#fff" }}>
          <h2 className="mx-auto max-w-3xl font-display text-[36px] font-extrabold leading-[0.98] md:text-[60px]">
            Travel a little. Protect a lot.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/85">
            Begin a conversation, and we will show you exactly which project your journey will fund — to the dollar.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-foreground hover:bg-foreground hover:text-white">
            Plan with purpose <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}