import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import hero from "@/assets/hero-savanna.jpg";
import destRwanda from "@/assets/dest-rwanda.jpg";
import destKenya from "@/assets/dest-kenya.jpg";
import destTanzania from "@/assets/dest-tanzania.jpg";
import lodge from "@/assets/lodge.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InquiryForm } from "@/components/site/InquiryForm";
import { ArrowUpRight, Compass, Feather, Leaf } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Remarkable Destinations — Bespoke Luxury African Safaris" },
      { name: "description", content: "Privately guided gorilla treks, Great Migration safaris and editorial photographic journeys across East Africa. Designed in Kigali." },
      { property: "og:title", content: "Remarkable Destinations" },
      { property: "og:description", content: "Bespoke luxury African safaris, designed in Kigali." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <Intro />
      <Destinations />
      <Journeys />
      <Philosophy />
      <Testimonials />
      <Inquiry />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-dark text-ivory">
      <img
        src={hero}
        alt="A herd of elephants crossing the African savanna at sunset"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark/85" />
      <Header transparent />
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 md:px-10 md:pb-32">
        <span className="eyebrow text-gold">Est. 2014 · Kigali, Rwanda</span>
        <h1 className="mt-6 max-w-4xl font-display text-[44px] leading-[1.05] text-ivory md:text-[72px]">
          <em className="not-italic font-light">Africa,</em>{" "}
          <span className="italic font-light">privately</span>{" "}
          <em className="not-italic font-light">remembered.</em>
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-[1.8] text-ivory/80">
          Bespoke safaris for travellers who measure a journey in stillness, not
          checklists. We design quiet, unforgettable passages across the continent
          we call home.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/journeys" className="btn-primary">
            Signature Journeys <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn-ghost">
            Begin a Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="eyebrow">The Atelier</span>
          <span className="hairline mt-6 block" />
        </div>
        <div className="md:col-span-8">
          <h2 className="font-display text-[34px] leading-[1.2] text-foreground md:text-[48px]">
            We do not sell safaris. We compose private chapters of a life —
            authored by the people, light and wildlife of Africa.
          </h2>
          <p className="mt-8 max-w-2xl text-[16px] leading-[1.8] text-muted-foreground">
            From our atelier in Kigali, our designers spend weeks scripting each
            itinerary by hand: choosing a guide for their philosophy, a camp for
            its silence, a single sundowner spot for the way the light falls at
            6:47pm. Nothing is templated. Nothing is rushed.
          </p>
        </div>
      </div>
    </section>
  );
}

const destinations = [
  { img: destRwanda, eyebrow: "Rwanda", title: "Mountain Gorillas of the Virunga", note: "Volcanoes National Park" },
  { img: destKenya, eyebrow: "Kenya", title: "Theatre of the Great Migration", note: "Masai Mara" },
  { img: destTanzania, eyebrow: "Tanzania", title: "Endless Plains of the Serengeti", note: "Northern Circuit" },
];

function Destinations() {
  return (
    <section className="bg-sand/50 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Destinations</span>
            <h2 className="mt-5 max-w-2xl font-display text-[38px] leading-[1.15] text-foreground md:text-[56px]">
              Three landscapes,<br />one continent of wonder.
            </h2>
          </div>
          <Link to="/destinations" className="text-[12px] tracking-[0.2em] uppercase text-foreground hover:text-gold">
            All Destinations →
          </Link>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {destinations.map((d, i) => (
            <article key={d.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={d.img}
                  alt={d.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute left-5 top-5 bg-ivory/95 px-3 py-1 text-[10px] tracking-[0.26em] uppercase text-foreground">
                  0{i + 1} · {d.eyebrow}
                </div>
              </div>
              <h3 className="mt-6 font-display text-[26px] leading-[1.2] text-foreground">
                {d.title}
              </h3>
              <p className="mt-2 text-[13px] tracking-[0.14em] uppercase text-muted-foreground">
                {d.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const journeys = [
  { days: "10 days", name: "Silverbacks & Savanna", from: "$14,800", desc: "Volcanoes National Park to the Masai Mara — gorillas, big cats, and the Migration in one privileged arc." },
  { days: "14 days", name: "The Northern Circuit", from: "$22,400", desc: "Serengeti, Ngorongoro, and a private mobile camp that follows the herds across Tanzania." },
  { days: "7 days", name: "Rwanda, Slowly", from: "$8,600", desc: "Two gorilla treks, golden monkeys, and a quiet finale by the still waters of Lake Kivu." },
];

function Journeys() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="eyebrow">Signature Journeys</span>
          <h2 className="mt-5 font-display text-[38px] leading-[1.15] text-foreground md:text-[56px]">
            Quietly composed itineraries, infinitely adjustable.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-muted-foreground">
            Each journey below is a starting point — a curated rhythm we will
            re-author in your hand. Departures are private; guides are chosen, not
            assigned.
          </p>
          <Link to="/journeys" className="btn-primary mt-10">
            View All Journeys
          </Link>
        </div>

        <div className="md:col-span-7">
          <ul className="divide-y divide-border border-y border-border">
            {journeys.map((j) => (
              <li key={j.name} className="group grid grid-cols-12 items-start gap-6 py-8 transition-colors hover:bg-sand/40">
                <div className="col-span-3 text-[12px] tracking-[0.18em] uppercase text-gold">
                  {j.days}
                </div>
                <div className="col-span-7">
                  <h3 className="font-display text-[28px] leading-[1.2] text-foreground">
                    {j.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">
                    {j.desc}
                  </p>
                </div>
                <div className="col-span-2 text-right">
                  <div className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">From</div>
                  <div className="mt-1 font-display text-[22px] text-foreground">{j.from}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <div className="mx-auto grid max-w-[1400px] gap-0 md:grid-cols-2">
        <div className="relative aspect-[5/4] md:aspect-auto">
          <img src={lodge} alt="Luxury tented camp at dusk" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="px-6 py-20 md:px-16 md:py-28">
          <span className="eyebrow text-gold">Our Philosophy</span>
          <h2 className="mt-5 font-display text-[38px] leading-[1.15] text-ivory md:text-[52px]">
            Small footprints.<br />
            <em className="italic font-light">Large memories.</em>
          </h2>
          <div className="mt-12 space-y-10">
            {[
              { icon: Feather, title: "Quietly designed", body: "No groups, no megaphones. A single safari designer holds your journey end-to-end." },
              { icon: Leaf, title: "Conservation-led", body: "A portion of every fee endows local rangers, anti-poaching units and community schools." },
              { icon: Compass, title: "Guides chosen for soul", body: "We work with eighteen guides across East Africa. We choose yours by temperament, not roster." },
            ].map((p) => (
              <div key={p.title} className="flex gap-5">
                <p.icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.14em] uppercase text-ivory">{p.title}</div>
                  <p className="mt-2 text-[15px] leading-[1.8] text-ivory/75">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const seedTestimonials = [
  {
    quote: "An extraordinary journey crafted with surgical precision. From the moment we landed in Kigali to our last sundowner on the Mara, every detail was anticipated.",
    name: "Eleanor & James Whitfield",
    where: "🇬🇧 United Kingdom",
    trip: "Gorilla Trek & Migration · Sep 2025",
  },
  {
    quote: "The silence of the Serengeti at dawn. The weight of a silverback's gaze in Volcanoes National Park. Some experiences cannot be photographed — they must be lived.",
    name: "Hiroshi Tanaka",
    where: "🇯🇵 Japan",
    trip: "Private Photographic Safari · Jul 2025",
  },
  {
    quote: "Three generations, one safari. Our guide Patrick made the children fall in love with the bush and the elders feel ten years younger. Faultless, soulful.",
    name: "The Hartley Family",
    where: "🇦🇺 Australia",
    trip: "Multi-Generational Safari · Aug 2025",
  },
];

function Testimonials() {
  return (
    <section className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="eyebrow">In Their Words</span>
          <h2 className="mt-5 font-display text-[38px] leading-[1.15] text-foreground md:text-[52px]">
            Letters from the road.
          </h2>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {seedTestimonials.map((t) => (
            <figure key={t.name} className="flex flex-col border-t border-foreground/15 pt-8">
              <div className="font-display text-gold text-5xl leading-none">“</div>
              <blockquote className="mt-4 font-display text-[22px] leading-[1.4] text-foreground italic">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 text-[12px] tracking-[0.16em] uppercase text-muted-foreground">
                <div className="text-foreground">{t.name}</div>
                <div className="mt-1">{t.where}</div>
                <div className="mt-1 text-gold">{t.trip}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inquiry() {
  return (
    <section id="contact" className="bg-sand py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <span className="eyebrow">Begin</span>
          <h2 className="mt-5 font-display text-[40px] leading-[1.1] text-foreground md:text-[56px]">
            Write to our atelier.
          </h2>
          <p className="mt-8 max-w-md text-[16px] leading-[1.8] text-foreground/75">
            A safari designer will respond within 24 hours from Kigali. No
            obligation — only a quiet conversation about what you would like to
            remember forever.
          </p>
          <div className="mt-10 space-y-2 text-[14px] text-foreground/70">
            <div>hello@remarkabledestinations.co</div>
            <div>+250 788 000 000</div>
          </div>
        </div>
        <div className="md:col-span-7">
          <InquiryForm source="homepage" />
        </div>
      </div>
    </section>
  );
}
