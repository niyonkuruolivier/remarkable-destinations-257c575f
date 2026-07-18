import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-pool.jpg";
import heroGorilla from "@/assets/hero-slide-gorilla.jpg";
import heroKivu from "@/assets/hero-slide-kivu.jpg";
import heroHills from "@/assets/hero-slide-hills.jpg";
import destRwanda from "@/assets/dest-rwanda.jpg";
import destKenya from "@/assets/dest-kenya.jpg";
import destTanzania from "@/assets/dest-tanzania.jpg";
import destZanzibar from "@/assets/dest-zanzibar.jpg";
import destNamibia from "@/assets/dest-namibia.jpg";
import lodge from "@/assets/lodge.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, ShieldCheck, Leaf, Users, Compass, Sparkles, MapPin, Clock, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettings, type HeroSetting, type HomeSection } from "@/lib/site-settings";
import { mediaUrl } from "@/lib/media";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Remarkable Collection — The company of unforgettable journeys" },
      { name: "description", content: "An integrated African travel group: bespoke safaris, conservation-led lodges, private journeys and editorial storytelling, headquartered in Kigali." },
      { property: "og:title", content: "Remarkable Collection" },
      { property: "og:description", content: "The company of unforgettable journeys." },
    ],
    links: [
      { rel: "preload", as: "image", href: heroGorilla, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

function Index() {
  const [showFixed, setShowFixed] = useState(false);
  const settings = useQuery({ queryKey: ["site_settings"], queryFn: getSiteSettings, staleTime: 30_000 });
  const sections: HomeSection[] = settings.data?.["home.sections"] ?? [];
  const isEnabled = (id: string) => {
    const s = sections.find((x) => x.id === id);
    return !s || s.enabled !== false;
  };

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
      {isEnabled("intro") && <Intro />}
      {isEnabled("destinations") && <Brands />}
      {isEnabled("stats") && <Stats />}
      {isEnabled("magazine") && <Magazine />}
      {isEnabled("responsibility") && <Responsibility />}
      {isEnabled("cta") && <CTA />}
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
  const settings = useQuery({ queryKey: ["site_settings"], queryFn: getSiteSettings, staleTime: 30_000 });
  const h: HeroSetting | undefined = settings.data?.["home.hero"];
  const heroTitle = h?.title || "The company of journeys";
  const heroImage = h?.imageUrl ? mediaUrl(h.imageUrl) : hero;
  const ctaLabel = h?.ctaLabel || "Book your safari";
  const ctaHref = h?.ctaHref || "/contact";

  const slides = [
    { src: heroGorilla, alt: "Mountain gorilla in Volcanoes National Park, Rwanda" },
    { src: heroKivu, alt: "Sunset over Lake Kivu with traditional boats" },
    { src: heroHills, alt: "Rwanda's rolling green hills at golden hour with luxury eco-lodge" },
  ];
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setActive((i) => (i + dir + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--ink)" }}>
      <div
        className="group/hero relative flex h-[100svh] min-h-[600px] w-full flex-col md:min-h-[640px]"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        {/* Slider */}
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding={i === 0 ? "sync" : "async"}
              className={[
                "absolute inset-0 h-full w-full object-cover will-change-transform",
                "transition-opacity duration-1000 ease-out",
                i === active ? "opacity-100 animate-hero-kenburns" : "opacity-0",
              ].join(" ")}
              style={{ objectPosition: "center" }}
            />
          ))}
          {/* Hidden fallback for CMS-provided hero image */}
          <img src={heroImage} alt="" aria-hidden className="hidden" />
        </div>
        {/* 50% dark overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />
        {/* Bottom fade into page background */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,14,46,0) 55%, rgba(229,227,241,0.95) 100%)" }} />

        <Header transparent />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-1 flex-col items-center justify-center px-6 text-center md:max-w-[1280px] md:px-12">
          <div className="mx-auto flex max-w-[720px] flex-col items-center md:max-w-[1040px] md:animate-fade-in">
            <h1 className="font-display font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white text-[clamp(1.9rem,7vw,2.6rem)] sm:text-[clamp(2.4rem,6vw,3.25rem)] md:font-normal md:tracking-[0.005em] md:leading-[1.08] md:text-[clamp(2.2rem,4.2vw,4rem)]">
              Wild beauty &{" "}
              <span className="block md:inline">unforgettable</span>{" "}
              <span className="italic" style={{ color: "var(--sun)" }}>
                journeys
              </span>
            </h1>
            <p className="mt-4 max-w-[520px] text-[14px] leading-[1.6] text-white/85 sm:text-[15px] md:mt-5 md:max-w-[640px] md:text-[16px] md:leading-[1.7] md:text-white/90">
              Remarkable Collection invites you to experience the magic of Africa.
              Whether it's safaris, cultural journeys, or gorilla trekking — we
              craft adventures that connect you to the heart of the continent.
            </p>

            <div className="relative z-30 mt-6 flex flex-col gap-3 sm:max-w-[380px] md:mt-8 md:max-w-none md:flex-row md:items-center md:justify-center md:gap-5">
              <Link
                to={ctaHref as any}
                className="group flex items-center justify-center gap-3 rounded-2xl px-6 py-3.5 text-[14px] font-semibold text-white shadow-xl transition-all hover:brightness-110 sm:text-[15px] md:px-8 md:py-4 md:text-[15px] md:tracking-[0.02em]"
                style={{ background: "var(--signal)" }}
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/experiences"
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/60 px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:text-[15px] md:px-8 md:py-4 md:text-[15px] md:tracking-[0.02em]"
              >
                Join a group journey
              </Link>
            </div>
          </div>
        </div>

        {/* Prev / Next arrows (desktop, on hover) */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full bg-white/15 p-3 text-white opacity-0 backdrop-blur transition-all hover:bg-white/30 md:grid md:group-hover/hero:opacity-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full bg-white/15 p-3 text-white opacity-0 backdrop-blur transition-all hover:bg-white/30 md:grid md:group-hover/hero:opacity-100"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 md:bottom-24">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={[
                "h-2 rounded-full transition-all duration-500",
                i === active ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
              ].join(" ")}
            />
          ))}
        </div>

        {/* floating CTA card */}
        <Link
          to="/contact"
          className="absolute bottom-24 left-4 right-4 z-20 hidden items-center justify-between gap-4 rounded-2xl bg-white/95 p-3 pl-4 shadow-xl backdrop-blur sm:flex sm:left-auto sm:right-5 sm:bottom-36 sm:w-[280px] md:hidden"
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
          className="absolute -bottom-px left-0 z-10 h-[10vw] min-h-[60px] w-full"
          viewBox="0 0 1500 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,120 L0,70 Q750,30 1500,70 L1500,120 Z" fill="var(--lavender)" />
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
        We are <span style={{ color: "var(--signal)" }}>Remarkable Collection</span>, an
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
const countries = [
  { name: "Rwanda",     flag: "🇷🇼", tag: "Gorilla Country",   img: destRwanda },
  { name: "Kenya",      flag: "🇰🇪", tag: "Great Migration",   img: destKenya },
  { name: "Tanzania",   flag: "🇹🇿", tag: "Serengeti Plains",  img: destTanzania },
  { name: "Zanzibar",   flag: "🇹🇿", tag: "Indian Ocean",      img: destZanzibar },
  { name: "Namibia",    flag: "🇳🇦", tag: "Desert & Dunes",    img: destNamibia },
  { name: "Botswana",   flag: "🇧🇼", tag: "Okavango Delta",    img: lodge },
  { name: "Uganda",     flag: "🇺🇬", tag: "Pearl of Africa",   img: destRwanda },
  { name: "S. Africa",  flag: "🇿🇦", tag: "Cape & Kruger",     img: destNamibia },
  { name: "Ethiopia",   flag: "🇪🇹", tag: "Ancient Highlands", img: destKenya },
];

function Brands() {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            if (e.isIntersecting) {
              const i = Number((e.target as HTMLElement).dataset.i);
              next.add(i);
            }
          }
          return next;
        });
      },
      { threshold: 0.25 },
    );
    el.querySelectorAll<HTMLElement>("[data-i]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden pb-24 md:pb-32">
      {/* topographic backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <pattern id="topo" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q30 20 60 60 T120 60" fill="none" stroke="currentColor" strokeWidth="0.6" />
              <path d="M0 90 Q30 50 60 90 T120 90" fill="none" stroke="currentColor" strokeWidth="0.6" />
              <path d="M0 30 Q30 -10 60 30 T120 30" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#topo)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-10">
        {/* Header row: giant 9 + intro */}
        <div className="mb-12 grid items-end gap-8 md:mb-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 relative">
            <div className="eyebrow">Our footprint across Africa</div>
            <div className="relative mt-2 leading-none">
              <span
                className="block font-display text-[220px] md:text-[340px] leading-[0.8] tracking-tight"
                style={{
                  background: "linear-gradient(180deg, var(--ink) 0%, var(--cobalt) 60%, var(--sun) 120%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                9
              </span>
              <span
                className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, var(--sun), transparent 60%)" }}
              />
            </div>
            <h2 className="mt-2 font-display text-[36px] leading-[1.05] tracking-tight text-foreground md:text-[56px]">
              countries.<br />
              <span className="italic" style={{ color: "var(--signal)" }}>One remarkable standard.</span>
            </h2>
          </div>

          <div className="md:col-span-7 md:pl-8">
            <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
              From misted volcanoes in Rwanda to the endless Serengeti and the dune seas
              of Namibia — we operate our own teams, own our own vehicles, and answer
              directly for every hour of every journey. Nine countries. One standard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/destinations" className="btn-ink">
                All destinations <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/experiences" className="btn-ghost-pill">
                Signature experiences
              </Link>
            </div>
          </div>
        </div>

        {/* Country grid: glass cards */}
        <div ref={gridRef} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {countries.map((c, i) => (
            <Link
              key={c.name}
              to="/destinations"
              data-i={i}
              className={[
                "group relative block aspect-[4/5] overflow-hidden rounded-3xl transition-all duration-700 ease-out",
                visible.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 50% 100%, rgba(42,75,255,0.35), transparent 60%)" }} />

              {/* Glass badge top-left */}
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white glass-card">
                <span className="text-[14px] leading-none">{c.flag}</span>
                <span>{c.tag}</span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
                    0{i + 1}
                  </div>
                  <h3 className="mt-1 font-display text-[26px] leading-none tracking-tight text-white md:text-[34px]">
                    {c.name}
                  </h3>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:bg-[var(--sun)]">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* One Standard trust badge */}
        <OneStandard />
      </div>
    </section>
  );
}

function OneStandard() {
  const pillars = [
    { icon: ShieldCheck, label: "Verified Guides" },
    { icon: Compass,     label: "Local Expertise" },
    { icon: Leaf,        label: "Sustainability" },
    { icon: Users,       label: "Community First" },
    { icon: Sparkles,    label: "Unforgettable" },
  ];
  return (
    <div className="relative mt-24 md:mt-32">
      <div
        className="relative overflow-hidden rounded-[40px] px-6 py-16 md:px-16 md:py-24"
        style={{
          background: "linear-gradient(135deg, #0B0E2E 0%, #17205A 55%, #2A4BFF 130%)",
          color: "#fff",
        }}
      >
        {/* soft glow */}
        <span className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-40 blur-3xl" style={{ background: "var(--sun)" }} />
        <span className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl" style={{ background: "var(--signal)" }} />

        <div className="relative grid items-center gap-14 md:grid-cols-12">
          {/* Circular shield */}
          <div className="mx-auto md:col-span-5">
            <div className="relative grid place-items-center">
              <span className="absolute inset-0 m-auto h-56 w-56 rounded-full border border-white/30 animate-pulse-ring" />
              <span className="absolute inset-0 m-auto h-56 w-56 rounded-full border border-white/20 animate-pulse-ring" style={{ animationDelay: "1.5s" }} />
              <div className="relative grid h-56 w-56 place-items-center rounded-full text-center animate-float-slow"
                   style={{ background: "radial-gradient(circle at 30% 30%, #ffffff22, #ffffff08)", boxShadow: "0 0 60px rgba(255,180,0,0.35), inset 0 0 30px rgba(255,255,255,0.15)" }}>
                <div className="absolute inset-2 rounded-full border border-white/40 animate-spin-slow" style={{ borderStyle: "dashed" }} />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">Since 2014</div>
                  <div className="mt-2 font-display text-[38px] leading-none" style={{ color: "var(--sun)" }}>ONE</div>
                  <div className="font-display text-[22px] leading-tight">Standard of<br/>Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="md:col-span-7">
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>The Remarkable Promise</div>
            <h3 className="mt-3 font-display text-[32px] leading-[1.1] md:text-[52px]">
              Every journey, held to <span className="italic" style={{ color: "var(--sun)" }}>the same standard</span>.
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {pillars.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className="glass-card group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-500 hover:-translate-y-1 hover:bg-white/15"
                  style={{ animation: `reveal-up 0.7s ease-out ${i * 80}ms both` }}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: "rgba(255,180,0,0.2)", color: "var(--sun)" }}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-wider text-white">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
          <h2 className="font-display text-[34px] font-extrabold leading-[0.95] tracking-tight text-white sm:text-[44px] md:col-span-7 md:text-[88px]">
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
    author: "Amara Nyong'o",
    location: "Maasai Mara, Kenya",
    duration: "8 min read",
  },
  {
    img: destRwanda,
    tag: "Newsroom",
    date: "May 2026",
    title: "A new gorilla naming ceremony in Volcanoes",
    author: "Jean-Pierre Habimana",
    location: "Volcanoes NP, Rwanda",
    duration: "6 min read",
  },
  {
    img: destZanzibar,
    tag: "Stories",
    date: "Apr 2026",
    title: "The dhow builders of Stone Town — a portrait",
    author: "Layla Al-Saidi",
    location: "Zanzibar",
    duration: "10 min read",
  },
  {
    img: destTanzania,
    tag: "Field notes",
    date: "Mar 2026",
    title: "Following the great migration river crossings",
    author: "Thomas Otieno",
    location: "Serengeti, Tanzania",
    duration: "12 min read",
  },
  {
    img: destNamibia,
    tag: "Journal",
    date: "Feb 2026",
    title: "Sleeping under the stars in Sossusvlei's dunes",
    author: "Anika Van Wyk",
    location: "Namib, Namibia",
    duration: "7 min read",
  },
];

function Magazine() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.75), behavior: "smooth" });
  };
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, var(--lavender) 0%, #ECEAF5 100%)" }}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">Magazine & Newsroom</div>
            <h2 className="mt-3 font-display text-[40px] leading-[1.02] tracking-tight text-foreground md:text-[72px]">
              Stories from<br />
              <span className="italic" style={{ color: "var(--cobalt)" }}>the field.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous story" className="grid h-12 w-12 place-items-center rounded-full border border-foreground/20 bg-white/70 backdrop-blur transition hover:bg-foreground hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next story" className="grid h-12 w-12 place-items-center rounded-full border border-foreground/20 bg-white/70 backdrop-blur transition hover:bg-foreground hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
            <Link to="/blog" className="btn-ghost-pill ml-2 hidden md:inline-flex">
              Read the magazine <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 md:gap-8 md:px-10"
      >
        {stories.map((s, i) => (
          <article
            key={s.title}
            className="group relative snap-start shrink-0 overflow-hidden rounded-[28px] bg-black shadow-xl transition-transform duration-500 hover:-translate-y-2 w-[85vw] sm:w-[65vw] md:w-[520px] lg:w-[560px]"
            style={{ animation: `reveal-up 0.6s ease-out ${i * 60}ms both` }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              {/* Top row */}
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white glass-card">
                  {s.tag}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">{s.date}</span>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-white/75">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {s.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {s.duration}</span>
                </div>
                <h3 className="mt-3 font-display text-[26px] leading-[1.15] text-white md:text-[32px]">
                  {s.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-[13px] text-white/70">by <span className="text-white">{s.author}</span></div>
                  <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Read story <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="shrink-0 w-6 md:w-10" />
      </div>

      <div className="mx-auto mt-8 max-w-[1500px] px-6 md:hidden">
        <Link to="/blog" className="btn-ghost-pill w-full">
          Read the magazine <ArrowUpRight className="h-4 w-4" />
        </Link>
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
    <section className="relative overflow-hidden">
      <div className="relative h-[92vh] min-h-[620px] w-full">
        {/* Background image with parallax feel */}
        <img
          src={heroHills}
          alt="Sunset over African plains"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover animate-hero-kenburns"
        />
        {/* Layered gradients */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,14,46,0.55) 0%, rgba(11,14,46,0.35) 40%, rgba(11,14,46,0.85) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(11,14,46,0.5) 100%)" }} />

        {/* Decorative topographic / compass lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20 mix-blend-screen" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <radialGradient id="compassGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB400" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFB400" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* dashed safari route */}
          <path d="M -50 600 C 200 500, 400 700, 700 500 S 1100 300, 1300 400" fill="none" stroke="#FFB400" strokeWidth="1.5" strokeDasharray="6 10" />
          <path d="M -50 700 C 250 640, 500 780, 800 620 S 1200 500, 1300 540" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 8" opacity="0.5" />
          {/* compass rings top-right */}
          <g transform="translate(1050,180)">
            <circle r="120" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
            <circle r="90"  fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeDasharray="4 6" />
            <circle r="60"  fill="none" stroke="#FFB400" strokeOpacity="0.6" />
            <circle r="4"   fill="url(#compassGrad)" />
            <line x1="0" y1="-120" x2="0" y2="120" stroke="#ffffff" strokeOpacity="0.3" />
            <line x1="-120" y1="0" x2="120" y2="0" stroke="#ffffff" strokeOpacity="0.3" />
          </g>
        </svg>

        {/* Floating decorative pins */}
        <span className="pointer-events-none absolute left-[12%] top-[28%] hidden h-2 w-2 rounded-full bg-[var(--sun)] shadow-[0_0_20px_5px_rgba(255,180,0,0.6)] animate-float-slow md:block" />
        <span className="pointer-events-none absolute right-[22%] top-[62%] hidden h-2 w-2 rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,0.5)] animate-float-slow md:block" style={{ animationDelay: "1.5s" }} />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col items-center justify-center px-6 text-center text-white md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] glass-card animate-reveal-up">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--sun)" }} />
            Plan with us
          </div>
          <h2
            className="mt-6 font-display leading-[0.98] tracking-tight text-white animate-reveal-up"
            style={{ animationDelay: "120ms", fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
          >
            Your Remarkable<br />
            <span className="italic" style={{ color: "var(--sun)" }}>starts here.</span>
          </h2>
          <p
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/85 md:text-[17px] animate-reveal-up"
            style={{ animationDelay: "240ms" }}
          >
            Speak with a travel designer in Kigali. We respond within 24 hours
            with a private, tailored proposal — at no obligation.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row animate-reveal-up" style={{ animationDelay: "360ms" }}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-white shadow-2xl transition-all hover:brightness-110 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, var(--signal), #0BA751)" }}
            >
              Start planning
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/experiences"
              className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/5 px-7 py-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:-translate-y-0.5"
            >
              Explore journeys
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/40 animate-float-slow">
              <ChevronDown className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
