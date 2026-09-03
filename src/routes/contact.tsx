import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { useSiteImages } from "@/lib/site-images";
import { MapPin, Mail, Phone, MessageCircle, Clock, ArrowUpRight } from "lucide-react";

const WHATSAPP_NUMBER = "+250788444827";
const WHATSAPP_DISPLAY = "+250 788 444 827";
const WHATSAPP_MSG = encodeURIComponent("Hello Remarkable Destinations — I would like to plan a safari.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${WHATSAPP_MSG}`;
const EMAIL = "hello@remarkabledestinations.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Inquiries — Remarkable Destinations" },
      { name: "description", content: "Speak with a safari designer in Kigali. WhatsApp, email or the inquiry form — we reply within 24 hours, every day of the year." },
      { property: "og:title", content: "Contact & Inquiries — Remarkable Destinations" },
      { property: "og:description", content: "Speak with a safari designer in Kigali. We reply within 24 hours." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/contact" }],
  }),
  component: ContactPage,
});

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    hint: "Fastest reply — usually minutes",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: Phone,
    label: "Telephone",
    value: WHATSAPP_DISPLAY,
    hint: "Mon–Sat · 08:00–19:00 CAT",
    href: `tel:${WHATSAPP_NUMBER}`,
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    hint: "Detailed itineraries & quotations",
    href: `mailto:${EMAIL}`,
    external: false,
  },
];

const FACTS = [
  { icon: MapPin, label: "Atelier", value: "KN 4 Avenue, Kiyovu · Kigali, Rwanda" },
  { icon: Clock, label: "Hours", value: "Mon–Sat · 08:00–19:00 CAT · We answer 7 days" },
];

function ContactPage() {
  const img = useSiteImages();

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Contact"
        title={<>A conversation,<br />not a transaction.</>}
        subtitle="Tell us when you might travel and what stirs your imagination — a safari designer will write back from Kigali within 24 hours."
        image={img("hero.contact")}
        alt="Rwandan landscape at golden hour"
      />

      {/* Channels */}
      <section className="mx-auto max-w-[1400px] px-6 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-5 md:grid-cols-3">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group relative flex flex-col rounded-[28px] border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-cobalt hover:shadow-xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {c.label}
              </span>
              <span className="mt-2 break-words font-display text-[20px] leading-tight text-foreground md:text-[22px]">
                {c.value}
              </span>
              <span className="mt-3 text-[14px] text-muted-foreground">{c.hint}</span>
              <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
            </a>
          ))}
        </div>
      </section>

      {/* Form + details */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-[32px] border border-border bg-card p-6 shadow-sm md:p-10">
              <span className="eyebrow">Inquiry</span>
              <h2 className="mt-3 mb-8 font-display text-[26px] leading-tight text-foreground md:text-[34px]">
                Start planning your journey
              </h2>
              <InquiryForm source="contact" />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-[32px] p-7 md:p-9" style={{ background: "var(--ink)" }}>
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">
                Visit us
              </span>
              <h3 className="mt-3 font-display text-[24px] leading-tight text-white md:text-[28px]">
                The Kigali atelier
              </h3>
              <div className="mt-7 space-y-6">
                {FACTS.map((f) => (
                  <div key={f.label} className="flex gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                      <f.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/60">
                        {f.label}
                      </p>
                      <p className="mt-1 text-[15px] leading-[1.6] text-white/90">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-cobalt mt-9 w-full">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-[32px] border border-border">
              <iframe
                title="Remarkable Destinations office location in Kigali"
                src="https://www.google.com/maps?q=KN%204%20Avenue%2C%20Kiyovu%2C%20Kigali%2C%20Rwanda&output=embed"
                className="h-[300px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold text-white shadow-2xl transition-transform hover:scale-105"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="h-5 w-5" /> WhatsApp
      </a>

      <Footer />
    </div>
  );
}
