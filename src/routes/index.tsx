import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-pool.jpg";
import destRwanda from "@/assets/dest-rwanda.jpg";
import destKenya from "@/assets/dest-kenya.jpg";
import destTanzania from "@/assets/dest-tanzania.jpg";
import destZanzibar from "@/assets/dest-zanzibar.jpg";
import destNamibia from "@/assets/dest-namibia.jpg";
import lodge from "@/assets/lodge.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Remarkable Destinations — The company of unforgettable journeys" },
      { name: "description", content: "An integrated African travel group: bespoke safaris, conservation-led lodges, private journeys and editorial storytelling, headquartered in Kigali." },
      { property: "og:title", content: "Remarkable Destinations" },
      { property: "og:description", content: "The company of unforgettable journeys." },
    ],
  }),
  component: Index,
});

function Index() {
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setShowFixed(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background">
      <Hero />
      <Intro />
      <Brands />
      <Stats />
      <Magazine />
      <Responsibility />
      <CTA />
      <Footer />
      <Link
        to="/contact"
        className={[
          "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold shadow-xl transition-all duration-300 sm:hidden",
          showFixed ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ background: "var(--signal)" }}
      >
        <span className="text-white">Book</span>
        <ArrowRight className="h-4 w-4 text-white" />
      </Link>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const [playing, setPlaying] = useState(true);
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--ink)" }}>
      <div className="relative h-[100svh] min-h-[720px] w-full">
        <img
          src={hero}
          alt="Infinity pool overlooking the African savanna at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,14,46,0.35) 0%, rgba(11,14,46,0.15) 40%, rgba(229,227,241,0.95) 100%)" }} />

        <Header transparent />

        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-[44px] font-extrabold leading-[0.9] tracking-[-0.03em] text-white/85 sm:text-[72px] md:text-[120px] lg:text-[160px]">
            THE COMPANY<br />OF JOURNEYS
          </h1>
          <Link
            to="/contact"
            className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-white/95 p-3 pl-4 shadow-xl backdrop-blur sm:hidden w-full max-w-[340px]"
          >
            <div className="text-left">
              <span className="tag-pill">Book your safari</span>
              <div className="mt-2 text-[15px] font-medium text-foreground">With Remarkable</div>
            </div>
            <span className="icon-circle shrink-0">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>

        {/* play/pause */}
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label="Toggle background"
          className="absolute bottom-32 left-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/85 text-foreground backdrop-blur md:left-10"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        {/* floating CTA card */}
        <Link
          to="/contact"
          className="absolute bottom-20 left-4 right-4 z-20 hidden items-center justify-between gap-4 rounded-2xl bg-white/95 p-3 pl-4 shadow-xl backdrop-blur sm:flex sm:left-auto sm:right-5 sm:bottom-28 sm:w-[280px] md:right-10"
        >
          <div className="text-left">
            <span className="tag-pill">Book your safari</span>
            <div className="mt-2 text-[15px] font-medium text-foreground">With Remarkable</div>
          </div>
          <span className="icon-circle shrink-0">
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>

        {/* curved wave bottom */}
        <svg
          className="absolute -bottom-px left-0 z-10 h-[14vw] min-h-[80px] w-full"
          viewBox="0 0 1500 160"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,160 L0,80 Q750,-40 1500,80 L1500,160 Z" fill="var(--lavender)" />
        </svg>
      </div>
    </section>
  );
}

/* ---------------- INTRO ---------------- */
function Intro() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pt-20 pb-24 text-center md:pt-28 md:pb-32">
      <p className="font-display text-[24px] font-medium leading-[1.35] text-foreground md:text-[34px]">
        We are <span style={{ color: "var(--signal)" }}>Remarkable Destinations</span>, an
        integrated African travel group with operations across nine countries: our
        guests fly between continents, cross savannas at dawn, sleep under
        canvas and wake in lodges built by the communities that own them. Our
        teams in Kigali, Nairobi and Cape Town make remarkable possible — every
        day, for every guest.
      </p>
    </section>
  );
}

/* ---------------- PORTFOLIO / BRANDS ---------------- */
const portfolio = [
  { img: destRwanda, label: "Rwanda", tag: "Gorilla Country" },
  { img: destKenya, label: "Kenya", tag: "Great Migration" },
  { img: destTanzania, label: "Tanzania", tag: "Serengeti" },
  { img: destZanzibar, label: "Zanzibar", tag: "Indian Ocean" },
  { img: destNamibia, label: "Namibia", tag: "Desert & Dunes" },
  { img: lodge, label: "Botswana", tag: "Okavango Delta" },
];

function Brands() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="eyebrow">Our portfolio</div>
          <h2 className="mt-3 font-display text-[40px] font-extrabold leading-[0.95] tracking-tight text-foreground md:text-[72px]">
            NINE COUNTRIES.<br />ONE STANDARD.
          </h2>
        </div>
        <Link to="/destinations" className="btn-ink">
          All destinations <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {portfolio.map((p) => (
          <Link
            to="/destinations"
            key={p.label}
            className="group relative block aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <img
              src={p.img}
              alt={p.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <div className="absolute left-4 top-4">
              <span className="tag-pill">{p.tag}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <h3 className="font-display text-[26px] font-extrabold tracking-tight text-white md:text-[36px]">
                {p.label.toUpperCase()}
              </h3>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-foreground transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
const stats = [
  { k: "21M+", v: "Guests welcomed since 2014" },
  { k: "1,400", v: "Local guides & guardians" },
  { k: "9", v: "African countries operated" },
  { k: "62", v: "Owned & partnered lodges" },
];

function Stats() {
  return (
    <section style={{ background: "var(--ink)", color: "var(--cream)" }} className="overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <h2 className="font-display text-[44px] font-extrabold leading-[0.95] tracking-tight text-white md:col-span-7 md:text-[88px]">
            REMARKABLE<br />
            <span style={{ color: "var(--sun)" }}>IN NUMBERS.</span>
          </h2>
          <p className="text-[16px] leading-relaxed text-white/70 md:col-span-5">
            From a single safari atelier in Kigali to an integrated travel group
            operating across the continent — Remarkable today. Tomorrow we go
            further: more conservation, more community-owned lodges, and more
            unforgettable hours under the African sky.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.k} className="border-l border-white/15 px-5">
              <div className="font-display text-[48px] font-extrabold tracking-tight text-white md:text-[72px]">
                {s.k}
              </div>
              <div className="mt-3 max-w-[200px] text-[14px] text-white/65">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAGAZINE ---------------- */
const stories = [
  {
    img: destKenya,
    tag: "Magazine",
    date: "Jun 2026",
    title: "How the Mara is rewriting community conservation",
  },
  {
    img: destRwanda,
    tag: "Newsroom",
    date: "May 2026",
    title: "A new gorilla naming ceremony in Volcanoes National Park",
  },
  {
    img: destZanzibar,
    tag: "Stories",
    date: "Apr 2026",
    title: "The dhow builders of Stone Town — a portrait in motion",
  },
];

function Magazine() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="eyebrow">Magazine & Newsroom</div>
          <h2 className="mt-3 font-display text-[40px] font-extrabold leading-[0.95] tracking-tight text-foreground md:text-[72px]">
            STORIES FROM<br />THE FIELD.
          </h2>
        </div>
        <Link to="/blog" className="btn-ghost-pill">
          Read the magazine <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stories.map((s) => (
          <article key={s.title} className="group flex flex-col overflow-hidden rounded-3xl bg-white">
            <div className="relative aspect-[5/4] overflow-hidden">
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="tag-pill absolute left-4 top-4">{s.tag}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="text-[12px] uppercase tracking-wider text-muted-foreground">
                {s.date}
              </div>
              <h3 className="mt-3 font-display text-[22px] font-extrabold leading-[1.1] text-foreground md:text-[26px]">
                {s.title}
              </h3>
              <div className="mt-6 flex items-center gap-2 text-[14px] font-medium text-foreground">
                Read article <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- RESPONSIBILITY ---------------- */
function Responsibility() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-32">
      <div
        className="relative overflow-hidden rounded-[40px] p-8 md:p-14"
        style={{ background: "var(--cream)" }}
      >
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="tag-pill" style={{ background: "var(--ink)" }}>
              Responsibility
            </span>
            <h2 className="mt-6 font-display text-[36px] font-extrabold leading-[0.98] tracking-tight text-foreground md:text-[64px]">
              BETTER HOLIDAYS<br />FOR A BETTER WORLD.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
              Sustainability is not a department — it is the operating model.
              By 2030, every Remarkable journey will be carbon-balanced, every
              partner lodge community-owned, and every guest contribution will
              fund a measured conservation outcome.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/conservation" className="btn-ink">Our roadmap</Link>
              <Link to="/blog" className="btn-ghost-pill">Impact report 2025</Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "−46%", v: "Carbon per guest night, vs 2019" },
                { k: "100%", v: "Lodges on renewable energy by 2027" },
                { k: "$3.2M", v: "Conservation funded in 2025" },
                { k: "11", v: "Community partnerships across East Africa" },
              ].map((b) => (
                <div key={b.k} className="rounded-2xl bg-white p-5">
                  <div className="font-display text-[32px] font-extrabold tracking-tight text-foreground md:text-[40px]">
                    {b.k}
                  </div>
                  <div className="mt-2 text-[13px] text-muted-foreground">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 pb-28 md:px-10 md:pb-40">
      <div
        className="relative overflow-hidden rounded-[40px] px-8 py-20 text-center md:px-16 md:py-28"
        style={{ background: "var(--cobalt)", color: "#fff" }}
      >
        <span
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30"
          style={{ background: "var(--sun)" }}
        />
        <span
          className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-25"
          style={{ background: "var(--signal)" }}
        />
        <div className="relative">
          <div className="text-[12px] font-semibold uppercase tracking-wider text-white/70">
            Plan with us
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[42px] font-extrabold leading-[0.95] tracking-tight md:text-[80px]">
            YOUR REMARKABLE<br />STARTS HERE.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] text-white/85">
            Speak with a travel designer in Kigali. We respond within 24 hours
            with a private proposal — at no obligation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-foreground hover:bg-foreground hover:text-white"
            >
              Begin a conversation <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-white/10"
            >
              Explore experiences
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
