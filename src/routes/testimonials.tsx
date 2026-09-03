import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useSiteImages } from "@/lib/site-images";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Stories from Remarkable travellers" },
      { name: "description", content: "Real letters from travellers who entrusted us with their East African journeys — gorillas in Rwanda, the Great Migration, honeymoons and family safaris." },
      { property: "og:title", content: "Testimonials — Remarkable Collection" },
      { property: "og:description", content: "Letters from Remarkable travellers, in their own words." },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/testimonials" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/testimonials" }],
  }),
  component: TestimonialsPage,
});

const featured = [
  { name: "Eleanor & Marcus Whitfield", place: "London, UK · Honeymoon · 12 nights", body: "We had been to East Africa twice before, with two well-known firms, and assumed we had seen what it could offer. Remarkable showed us a country we did not know — and a way of moving through it that was both deeply private and quietly conscious. The morning Patrick walked us into the gorillas, neither of us spoke for an hour afterwards. We are already planning our return.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
  { name: "The Tanaka Family", place: "Tokyo, Japan · Family safari · 10 nights", body: "Travelling with two children, aged eight and eleven, we expected compromise. There was none. Every camp was ready for us, every guide spoke to the children as equals, and the itinerary changed three times mid-trip to follow the migration. Our son still draws cheetahs in his notebook. Thank you, Aline.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
];

const more = [
  { name: "Priya Sharma", place: "Mumbai · Photography safari", body: "Two private vehicles, two of the best wildlife photographers in Kenya, and a designer who refused to settle for the obvious frames. The portfolio I came home with would not have been possible anywhere else." },
  { name: "Daniel & Sofia Reyes", place: "Madrid · Honeymoon", body: "From the moment we landed in Kigali we were held — by our guides, by every host, by Remarkable. The most thoughtfully composed twelve nights of our lives." },
  { name: "The Olusegun Family", place: "Lagos · Family safari", body: "An African family travelling to East Africa — Remarkable understood every nuance of that, and made it feel like coming home rather than visiting." },
  { name: "Margaret Holloway", place: "Sydney · Solo traveller", body: "I was a little nervous to travel alone at 68. By the second day I had forgotten the question entirely. The care was discreet, the company exceptional, the wildlife everything I had hoped." },
  { name: "Dr. Henrik Lindqvist", place: "Stockholm · Conservation safari", body: "I came for the elephants of Amboseli and stayed an extra week to spend time with the conservancies Remarkable partners with. This is a company that means every word." },
  { name: "James & Olivia Carter", place: "New York · Anniversary", body: "Twenty years of marriage, ten years of safaris, and the most extraordinary trip of either. Aline's team listened, then designed something we did not know we wanted." },
];

function TestimonialsPage() {
  const img = useSiteImages();
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Testimonials"
        title={<>LETTERS FROM<br />THE FIELD.</>}
        subtitle="We do not write our own copy on this page. These are the words of the travellers who entrusted us with their journeys — printed, with their permission, exactly as written."
        image={img("hero.testimonials", "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80")}
        alt="Pool deck overlooking the plains at dusk"
      />

      <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 md:grid-cols-2">
          {featured.map((t) => (
            <article key={t.name} className="rounded-[32px] bg-white p-8 md:p-12">
              <Quote className="h-10 w-10 text-foreground/15" />
              <p className="mt-6 font-display text-[22px] italic leading-[1.45] text-foreground md:text-[26px]">
                "{t.body}"
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-foreground/10 pt-6">
                <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-display text-[16px] font-extrabold text-foreground">{t.name}</div>
                  <div className="text-[13px] text-muted-foreground">{t.place}</div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-foreground">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
          <div className="mb-12">
            <span className="eyebrow">More letters</span>
            <h2 className="mt-3 font-display text-[40px] font-extrabold leading-[0.95] text-foreground md:text-[64px]">
              IN THEIR<br />OWN WORDS.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {more.map((t) => (
              <article key={t.name} className="rounded-3xl bg-white p-7">
                <div className="flex items-center gap-1 text-foreground">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-[1.7] text-foreground/85">"{t.body}"</p>
                <div className="mt-6 border-t border-foreground/10 pt-4">
                  <div className="font-display text-[15px] font-extrabold text-foreground">{t.name}</div>
                  <div className="text-[12px] text-muted-foreground">{t.place}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 md:py-40">
        <div className="rounded-[40px] px-8 py-16 text-center md:px-16 md:py-24" style={{ background: "var(--ink)", color: "#fff" }}>
          <h2 className="mx-auto max-w-3xl font-display text-[36px] font-extrabold leading-[0.98] md:text-[60px]">
            Your story is the next one we'd love to print.
          </h2>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-foreground hover:bg-cream">
            Begin a conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}