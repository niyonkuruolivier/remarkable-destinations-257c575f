import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Rwanda, Kenya, Tanzania, Uganda | Remarkable Collection" },
      { name: "description", content: "Hand-designed safaris across Rwanda, Kenya, Tanzania and Uganda. Gorilla trekking, the Great Migration, Serengeti plains and pearl-of-Africa rainforests." },
      { property: "og:title", content: "Destinations — Remarkable Collection" },
      { property: "og:description", content: "Hand-designed safaris across Rwanda, Kenya, Tanzania and Uganda." },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/destinations" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/destinations" }],
  }),
  component: DestinationsPage,
});

const destinations = [
  {
    name: "Rwanda",
    tag: "Land of a Thousand Hills",
    img: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&w=1600&q=80",
    blurb: "Eye-to-eye with mountain gorillas in Volcanoes, golden monkeys in the bamboo, and a quiet, dignified country that has rewritten what a safari nation can be.",
    parks: ["Volcanoes National Park", "Akagera National Park", "Nyungwe Forest", "Lake Kivu"],
    wildlife: ["Mountain gorillas", "Golden monkeys", "Big Five (Akagera)", "Chimpanzees"],
    when: "June – September, December – February",
  },
  {
    name: "Kenya",
    tag: "Theatre of the Great Migration",
    img: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1600&q=80",
    blurb: "Lions on the Mara, flamingos on Nakuru, elephants beneath Kilimanjaro. The original safari country, still — for our money — the most cinematic.",
    parks: ["Maasai Mara", "Amboseli", "Samburu", "Laikipia", "Lewa Conservancy"],
    wildlife: ["Lion, leopard, cheetah", "Migration herds", "Elephant", "Rare northern species"],
    when: "July – October (migration), January – March (calving in Tanzania crossings)",
  },
  {
    name: "Tanzania",
    tag: "The Endless Plain",
    img: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1600&q=80",
    blurb: "The Serengeti is not a park — it is an idea, a moving river of life across the Ngorongoro highlands and the Mara crossings, finishing in the white sands of Zanzibar.",
    parks: ["Serengeti", "Ngorongoro Crater", "Tarangire", "Selous / Nyerere", "Zanzibar"],
    wildlife: ["Migration herds", "Big Five", "African wild dog", "Tree-climbing lions"],
    when: "June – October (dry), January – March (calving in the south)",
  },
  {
    name: "Uganda",
    tag: "The Pearl of Africa",
    img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    blurb: "Half of the world's remaining mountain gorillas, chimpanzees in Kibale, tree-climbing lions in Ishasha and the boat-cruise drama of the Kazinga Channel.",
    parks: ["Bwindi Impenetrable", "Queen Elizabeth", "Kibale Forest", "Murchison Falls"],
    wildlife: ["Mountain gorillas", "Chimpanzees", "Tree-climbing lions", "Shoebill stork"],
    when: "June – September, December – February",
  },
];

function DestinationsPage() {
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Destinations"
        title={<>FOUR COUNTRIES.<br />ONE HORIZON.</>}
        subtitle="From the misted highlands of Rwanda to the sun-burnt plains of the Serengeti, we design private journeys across East Africa's four most extraordinary safari nations."
        image="https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1920&q=80"
        alt="Elephants crossing the Serengeti plains"
      />

      <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32 space-y-24">
        {destinations.map((d, i) => (
          <article key={d.name} className="grid gap-10 md:grid-cols-12 md:gap-14">
            <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="overflow-hidden rounded-[32px]">
                <img src={d.img} alt={d.name} loading="lazy" className="aspect-[5/4] w-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-5 self-center">
              <span className="tag-pill">{d.tag}</span>
              <h2 className="mt-5 font-display text-[44px] font-extrabold leading-[0.95] text-foreground md:text-[72px]">
                {d.name.toUpperCase()}
              </h2>
              <p className="mt-6 text-[16px] leading-[1.75] text-foreground/80">{d.blurb}</p>

              <dl className="mt-8 space-y-4 text-[14px]">
                <div>
                  <dt className="eyebrow">National parks</dt>
                  <dd className="mt-1 text-foreground/85">{d.parks.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Signature wildlife</dt>
                  <dd className="mt-1 text-foreground/85">{d.wildlife.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="eyebrow">When to travel</dt>
                  <dd className="mt-1 text-foreground/85">{d.when}</dd>
                </div>
              </dl>

              <Link to="/contact" className="btn-ink mt-8">
                Plan my {d.name} safari <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1500px] px-6 pb-28 md:px-10 md:pb-40">
        <div className="rounded-[40px] px-8 py-16 text-center md:px-16 md:py-24" style={{ background: "var(--cream)" }}>
          <h2 className="mx-auto max-w-3xl font-display text-[36px] font-extrabold leading-[0.98] text-foreground md:text-[60px]">
            Not sure where to begin?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-muted-foreground">
            Tell us when you can travel and what stirs you. We will return a private proposal — usually within 24 hours.
          </p>
          <Link to="/contact" className="btn-ink mt-8 inline-flex">
            Begin a conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
