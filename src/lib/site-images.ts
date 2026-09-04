import { useQuery } from "@tanstack/react-query";
import heroPool from "@/assets/hero-pool.jpg";
import heroHills from "@/assets/hero-slide-hills.jpg";
import destRwanda from "@/assets/dest-rwanda.jpg";
import destKenya from "@/assets/dest-kenya.jpg";
import destTanzania from "@/assets/dest-tanzania.jpg";
import destZanzibar from "@/assets/dest-zanzibar.jpg";
import destNamibia from "@/assets/dest-namibia.jpg";
import story1 from "@/assets/story-1.jpeg";
import story2 from "@/assets/story-2.jpeg";
import elephantLogo from "@/assets/elephant-raw-logo.png.asset.json";
import { getSiteSettings } from "@/lib/site-settings";
import { mediaUrl } from "@/lib/media";

export type ImageSlot = { key: string; label: string; group: string; default: string };

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * Every replaceable image on the public site.
 * Admin → Images lets an administrator upload a replacement for any slot.
 */
const GALLERY_IDS = ["photo-1547970810-dc1eac37d174", "photo-1535941339077-2dd1c7963098", "photo-1551966775-a4ddc8df052b", "photo-1516426122078-c23e76319801", "photo-1547471080-7cc2caa01a7e", "photo-1493244040629-496f6d136cc3", "photo-1571406761758-9a3eed5338ef", "photo-1582719508461-905c673771fd", "photo-1542314831-068cd1dbfeeb", "photo-1523805009345-7448845a9e53", "photo-1504609813442-a8924e83f76e", "photo-1502920917128-1aa500764cbd"];

export const IMAGE_SLOTS: ImageSlot[] = [
  // Brand
  { key: "brand.logo", label: "Header logo", group: "Brand", default: elephantLogo.url },

  // Home
  { key: "home.hero.fallback", label: "Hero fallback image", group: "Home page", default: heroPool },
  { key: "home.cta.background", label: "Bottom CTA background", group: "Home page", default: heroHills },
  { key: "home.story.1", label: "Story card 1", group: "Home page", default: story1 },
  { key: "home.story.2", label: "Story card 2", group: "Home page", default: story2 },
  { key: "home.story.3", label: "Story card 3", group: "Home page", default: destZanzibar },
  { key: "home.story.4", label: "Story card 4", group: "Home page", default: destTanzania },
  { key: "home.story.5", label: "Story card 5", group: "Home page", default: destNamibia },

  // Page heroes
  { key: "hero.about", label: "About hero", group: "Page heroes", default: U("photo-1516426122078-c23e76319801", 1920) },
  { key: "hero.destinations", label: "Destinations hero", group: "Page heroes", default: U("photo-1535941339077-2dd1c7963098", 1920) },
  { key: "hero.experiences", label: "Safari Experiences hero", group: "Page heroes", default: U("photo-1547471080-7cc2caa01a7e", 1920) },
  { key: "hero.gallery", label: "Gallery hero", group: "Page heroes", default: U("photo-1547970810-dc1eac37d174", 1920) },
  { key: "hero.conservation", label: "Conservation hero", group: "Page heroes", default: U("photo-1564349683136-77e08dba1ef7", 1920) },
  { key: "hero.blog", label: "Blog hero", group: "Page heroes", default: U("photo-1493244040629-496f6d136cc3", 1920) },
  { key: "hero.testimonials", label: "Testimonials hero", group: "Page heroes", default: U("photo-1582719508461-905c673771fd", 1920) },
  { key: "hero.contact", label: "Contact hero", group: "Page heroes", default: U("photo-1516426122078-c23e76319801", 1920) },

  // About team
  { key: "about.team.1", label: "Team member 1", group: "About page", default: U("photo-1531123897727-8f129e1688ce", 600) },
  { key: "about.team.2", label: "Team member 2", group: "About page", default: U("photo-1507003211169-0a1dd7228f2d", 600) },
  { key: "about.team.3", label: "Team member 3", group: "About page", default: U("photo-1573497019940-1c28c88b4f3e", 600) },
  { key: "about.team.4", label: "Team member 4", group: "About page", default: U("photo-1500648767791-00dcc994a43e", 600) },

  // Destinations
  { key: "destinations.card.1", label: "Destination 1", group: "Destinations page", default: U("photo-1551966775-a4ddc8df052b", 1600) },
  { key: "destinations.card.2", label: "Destination 2", group: "Destinations page", default: U("photo-1547970810-dc1eac37d174", 1600) },
  { key: "destinations.card.3", label: "Destination 3", group: "Destinations page", default: U("photo-1535941339077-2dd1c7963098", 1600) },
  { key: "destinations.card.4", label: "Destination 4", group: "Destinations page", default: U("photo-1547471080-7cc2caa01a7e", 1600) },

  // Experiences
  { key: "experiences.card.1", label: "Experience 1", group: "Safari Experiences page", default: U("photo-1535941339077-2dd1c7963098") },
  { key: "experiences.card.2", label: "Experience 2", group: "Safari Experiences page", default: U("photo-1452857297128-d9c29adba80b") },
  { key: "experiences.card.3", label: "Experience 3", group: "Safari Experiences page", default: U("photo-1504609813442-a8924e83f76e") },
  { key: "experiences.card.4", label: "Experience 4", group: "Safari Experiences page", default: U("photo-1502920917128-1aa500764cbd") },
  { key: "experiences.card.5", label: "Experience 5", group: "Safari Experiences page", default: U("photo-1523805009345-7448845a9e53") },
  { key: "experiences.card.6", label: "Experience 6", group: "Safari Experiences page", default: U("photo-1582719508461-905c673771fd") },

  // Conservation
  { key: "conservation.card.1", label: "Conservation pillar 1", group: "Conservation page", default: U("photo-1551966775-a4ddc8df052b") },
  { key: "conservation.card.2", label: "Conservation pillar 2", group: "Conservation page", default: U("photo-1547970810-dc1eac37d174") },
  { key: "conservation.card.3", label: "Conservation pillar 3", group: "Conservation page", default: U("photo-1535941339077-2dd1c7963098") },
  { key: "conservation.card.4", label: "Conservation pillar 4", group: "Conservation page", default: U("photo-1547471080-7cc2caa01a7e") },

  // Blog
  { key: "blog.featured", label: "Featured post image", group: "Blog page", default: U("photo-1551966775-a4ddc8df052b", 1600) },
  { key: "blog.post.1", label: "Post 1", group: "Blog page", default: U("photo-1547970810-dc1eac37d174") },
  { key: "blog.post.2", label: "Post 2", group: "Blog page", default: U("photo-1547471080-7cc2caa01a7e") },
  { key: "blog.post.3", label: "Post 3", group: "Blog page", default: U("photo-1542314831-068cd1dbfeeb") },
  { key: "blog.post.4", label: "Post 4", group: "Blog page", default: U("photo-1502920917128-1aa500764cbd") },
  { key: "blog.post.5", label: "Post 5", group: "Blog page", default: U("photo-1571406761758-9a3eed5338ef") },
  { key: "blog.post.6", label: "Post 6", group: "Blog page", default: U("photo-1535941339077-2dd1c7963098") },

  // Gallery
  ...Array.from({ length: 12 }, (_, i) => ({
    key: `gallery.photo.${i + 1}`,
    label: `Gallery photo ${i + 1}`,
    group: "Gallery page",
    default: U(GALLERY_IDS[i], 900),
  })),

  // Testimonials
  { key: "testimonials.avatar.1", label: "Guest photo 1", group: "Testimonials page", default: U("photo-1494790108377-be9c29b29330", 400) },
  { key: "testimonials.avatar.2", label: "Guest photo 2", group: "Testimonials page", default: U("photo-1438761681033-6461ffad8d80", 400) },
];

export const IMAGE_GROUPS = Array.from(new Set(IMAGE_SLOTS.map((s) => s.group)));

export type ImageOverrides = Record<string, string>;

/** Resolve an image slot against the CMS overrides map. */
export function resolveImage(overrides: ImageOverrides | undefined, key: string, fallback = ""): string {
  const v = overrides?.[key];
  if (v) return mediaUrl(v);
  const slot = IMAGE_SLOTS.find((s) => s.key === key);
  return fallback || slot?.default || "";
}

/**
 * Returns `img(key, fallback)` — the admin-uploaded image when one exists,
 * otherwise the built-in default shipped with the design.
 */
export function useSiteImages() {
  const settings = useQuery({ queryKey: ["site_settings"], queryFn: getSiteSettings, staleTime: 30_000 });
  const overrides = (settings.data?.["images"] as ImageOverrides | undefined) ?? {};
  return (key: string, fallback = "") => resolveImage(overrides, key, fallback);
}
