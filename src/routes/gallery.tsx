import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — A Visual Field-Book | Heritage Africa Collection" },
      { name: "description", content: "Wildlife, lodges, landscapes and people — a visual field-book from our safaris across East Africa." },
      { property: "og:title", content: "Gallery — Heritage Africa Collection" },
      { property: "og:description", content: "A visual field-book from our East African safaris." },
      { property: "og:url", content: "https://remarkable-destinations.lovable.app/gallery" },
    ],
    links: [{ rel: "canonical", href: "https://remarkable-destinations.lovable.app/gallery" }],
  }),
  component: GalleryPage,
});

type Cat = "All" | "Wildlife" | "Landscapes" | "Lodges" | "People";
const cats: Cat[] = ["All", "Wildlife", "Landscapes", "Lodges", "People"];

const photos: { src: string; cat: Cat; alt: string }[] = [
  { src: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=900&q=80", cat: "Wildlife", alt: "Cheetah on the Mara plains" },
  { src: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=900&q=80", cat: "Wildlife", alt: "Elephant herd at sunset" },
  { src: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&w=900&q=80", cat: "Wildlife", alt: "Mountain gorilla portrait" },
  { src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80", cat: "Landscapes", alt: "Acacia tree at dawn" },
  { src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=80", cat: "Landscapes", alt: "Volcanic rainforest" },
  { src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=900&q=80", cat: "Landscapes", alt: "Savanna storm light" },
  { src: "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?auto=format&fit=crop&w=900&q=80", cat: "Lodges", alt: "Canvas suite at dusk" },
  { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80", cat: "Lodges", alt: "Pool deck overlooking plains" },
  { src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80", cat: "Lodges", alt: "Fireside dinner" },
  { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=900&q=80", cat: "People", alt: "Maasai elder" },
  { src: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=80", cat: "People", alt: "Field guide reading tracks" },
  { src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80", cat: "Wildlife", alt: "Giraffe silhouette" },
];

function GalleryPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? photos : photos.filter((p) => p.cat === active);

  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Gallery"
        title={<>A VISUAL<br />FIELD-BOOK.</>}
        subtitle="Frames carried home from our safaris — the wildlife, the landscapes, the lodges, and the people who make each journey possible."
        image="https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1920&q=80"
        alt="Cheetah at dawn on the savanna"
      />

      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={
                "rounded-full px-5 py-2.5 text-[13px] font-semibold transition " +
                (active === c
                  ? "bg-foreground text-white"
                  : "bg-white text-foreground/80 hover:text-foreground")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {filtered.map((p, i) => (
            <figure
              key={p.src}
              className={
                "group relative overflow-hidden rounded-3xl " +
                (i % 5 === 0 ? "md:col-span-2" : "")
              }
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-[4/3]"
              />
              <figcaption className="absolute bottom-3 left-3">
                <span className="tag-pill" style={{ background: "rgba(11,14,46,0.85)" }}>{p.cat}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-28 md:px-10 md:pb-40">
        <div className="rounded-[40px] px-8 py-16 text-center md:px-16 md:py-20" style={{ background: "var(--ink)", color: "#fff" }}>
          <h2 className="font-display text-[32px] font-extrabold leading-[0.98] md:text-[56px]">
            Carry your own home.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] text-white/80">
            Every Heritage Africa journey can be paired with a dedicated photographic guide — from first-time travellers to professional shooters.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-foreground hover:bg-foreground hover:text-white">
            Plan a photographic safari <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
