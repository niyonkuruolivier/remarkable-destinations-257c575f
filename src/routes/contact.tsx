import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Remarkable Destinations" },
      { name: "description", content: "Write to our Kigali atelier and begin designing your bespoke African safari." },
      { property: "og:title", content: "Contact — Remarkable Destinations" },
      { property: "og:description", content: "Write to our Kigali atelier and begin designing your bespoke African safari." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-background">
      <div className="bg-dark pt-2">
        <Header />
      </div>
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">Begin</span>
            <h1 className="mt-5 font-display text-[48px] leading-[1.05] text-foreground md:text-[72px]">
              <em className="italic font-light">A conversation,</em><br />not a transaction.
            </h1>
            <p className="mt-8 max-w-md text-[16px] leading-[1.8] text-muted-foreground">
              Tell us a little — when you might travel, what stirs your imagination
              — and a safari designer will write back from Kigali within 24 hours.
            </p>
          </div>
          <div className="md:col-span-7">
            <InquiryForm source="contact" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}