import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InquiryForm } from "@/components/site/InquiryForm";
import { MapPin, Mail, Phone, MessageCircle, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "+250788444827";
const WHATSAPP_DISPLAY = "+250 788 444 827";
const WHATSAPP_MSG = encodeURIComponent("Hello Remarkable Collection — I would like to plan a safari.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${WHATSAPP_MSG}`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Inquiries — Remarkable Collection" },
      { name: "description", content: "Speak with a safari designer in Kigali. WhatsApp, email or the inquiry form — we reply within 24 hours, every day of the year." },
      { property: "og:title", content: "Contact & Inquiries — Remarkable Collection" },
      { property: "og:description", content: "Speak with a safari designer in Kigali. We reply within 24 hours." },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-background">
      <div className="bg-dark pt-2">
        <Header />
      </div>
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-44">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 text-center">
            <span className="eyebrow">Begin</span>
            <h1 className="mt-5 font-display text-[29px] leading-[1.05] text-foreground md:text-[43px]">
              <em className="italic font-light">A conversation,</em><br />not a transaction.
            </h1>
            <p className="mx-auto mt-8 max-w-md text-[16px] leading-[1.8] text-muted-foreground">
              Tell us a little — when you might travel, what stirs your imagination
              — and a safari designer will write back from Kigali within 24 hours.
            </p>
            <div className="mt-10 space-y-4 text-[15px]">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-foreground hover:text-cobalt">
                <MessageCircle className="mt-0.5 h-5 w-5" />
                <span>
                  <strong className="block font-semibold">WhatsApp</strong>
                  <span className="text-muted-foreground">{WHATSAPP_DISPLAY}</span>
                </span>
              </a>
              <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-start gap-3 text-foreground hover:text-cobalt">
                <Phone className="mt-0.5 h-5 w-5" />
                <span>
                  <strong className="block font-semibold">Telephone</strong>
                  <span className="text-muted-foreground">{WHATSAPP_DISPLAY}</span>
                </span>
              </a>
              <a href="mailto:hello@remarkabledestinations.com" className="flex items-start gap-3 text-foreground hover:text-cobalt">
                <Mail className="mt-0.5 h-5 w-5" />
                <span>
                  <strong className="block font-semibold">Email</strong>
                  <span className="text-muted-foreground">hello@remarkabledestinations.com</span>
                </span>
              </a>
              <div className="flex items-start gap-3 text-foreground">
                <MapPin className="mt-0.5 h-5 w-5" />
                <span>
                  <strong className="block font-semibold">Atelier</strong>
                  <span className="text-muted-foreground">KN 4 Avenue, Kiyovu · Kigali, Rwanda</span>
                </span>
              </div>
              <div className="flex items-start gap-3 text-foreground">
                <Clock className="mt-0.5 h-5 w-5" />
                <span>
                  <strong className="block font-semibold">Hours</strong>
                  <span className="text-muted-foreground">Mon–Sat · 08:00–19:00 CAT · We answer 7 days</span>
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <InquiryForm source="contact" />
          </div>
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