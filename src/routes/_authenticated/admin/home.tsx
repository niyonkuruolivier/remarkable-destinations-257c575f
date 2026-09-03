import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminUpsertSiteSetting } from "@/lib/admin.functions";
import { getSiteSettings, type HeroSetting, type HomeSection, type HeroSlide, type CountryCard } from "@/lib/site-settings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

const DEFAULT_COUNTRIES: CountryCard[] = [
  { name: "Rwanda", flag: "🇷🇼", tag: "Gorilla Country", imageUrl: "" },
  { name: "Kenya", flag: "🇰🇪", tag: "Great Migration", imageUrl: "" },
  { name: "Tanzania", flag: "🇹🇿", tag: "Serengeti Plains", imageUrl: "" },
  { name: "Zanzibar", flag: "🇹🇿", tag: "Indian Ocean", imageUrl: "" },
  { name: "Namibia", flag: "🇳🇦", tag: "Desert & Dunes", imageUrl: "" },
  { name: "Botswana", flag: "🇧🇼", tag: "Okavango Delta", imageUrl: "" },
  { name: "Uganda", flag: "🇺🇬", tag: "Pearl of Africa", imageUrl: "" },
  { name: "S. Africa", flag: "🇿🇦", tag: "Cape & Kruger", imageUrl: "" },
  { name: "Ethiopia", flag: "🇪🇹", tag: "Ancient Highlands", imageUrl: "" },
];

export const Route = createFileRoute("/_authenticated/admin/home")({
  component: HomeEditor,
});

function HomeEditor() {
  const qc = useQueryClient();
  const upsert = useServerFn(adminUpsertSiteSetting);

  const q = useQuery({ queryKey: ["site_settings"], queryFn: getSiteSettings });

  const [hero, setHero] = useState<HeroSetting | null>(null);
  const [sections, setSections] = useState<HomeSection[]>([]);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [countries, setCountries] = useState<CountryCard[]>([]);

  useEffect(() => {
    if (q.data) {
      setHero(q.data["home.hero"] ?? { eyebrow: "", title: "", subtitle: "", ctaLabel: "", ctaHref: "", imageUrl: "" });
      setSections(q.data["home.sections"] ?? []);
      setSlides(q.data["home.slides"] ?? []);
      setCountries((q.data["home.countries"] ?? DEFAULT_COUNTRIES).map((c: CountryCard) => ({ ...c })));
    }
  }, [q.data]);

  const save = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => upsert({ data: { key, value } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["site_settings"] }); toast.success("Saved"); },
    onError: (e: any) => toast.error(e?.message ?? "Save failed"),
  });

  function moveSlide(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= slides.length) return;
    const next = [...slides];
    [next[i], next[j]] = [next[j], next[i]];
    setSlides(next);
  }

  function moveSection(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
  }

  if (!hero) return <div className="text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Home Page</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit the hero, section order, and enable/disable sections. Changes go live instantly.
        </p>
      </div>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="font-display text-xl font-bold">Hero</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Eyebrow</Label>
            <Input value={hero.eyebrow} onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>CTA label</Label>
            <Input value={hero.ctaLabel} onChange={(e) => setHero({ ...hero, ctaLabel: e.target.value })} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Title</Label>
            <Input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Subtitle</Label>
            <Textarea rows={2} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label>CTA link</Label>
            <Input value={hero.ctaHref} onChange={(e) => setHero({ ...hero, ctaHref: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <MediaUploader label="Hero background image (optional — overrides default video poster)"
              value={hero.imageUrl} prefix="home" onChange={(p) => setHero({ ...hero, imageUrl: p ?? "" })} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => save.mutate({ key: "home.hero", value: hero })} disabled={save.isPending}>
            Save hero
          </Button>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold">Hero Slider</h2>
            <p className="text-xs text-muted-foreground">Add, reorder or remove the rotating background images. Leave empty to use the defaults.</p>
          </div>
          <Button variant="outline" onClick={() => setSlides([...slides, { imageUrl: "", alt: "" }])}>
            <Plus className="mr-1 h-4 w-4" /> Add slide
          </Button>
        </div>
        <div className="space-y-3">
          {slides.length === 0 && <p className="text-sm text-muted-foreground">No custom slides — the default 3 images are showing.</p>}
          {slides.map((s, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Slide {i + 1}</div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => moveSlide(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => moveSlide(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => setSlides(slides.filter((_, j) => j !== i))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <MediaUploader label="Slide image" value={s.imageUrl} prefix="hero"
                onChange={(p) => { const n = [...slides]; n[i] = { ...s, imageUrl: p ?? "" }; setSlides(n); }} />
              <div className="space-y-1">
                <Label className="text-xs">Video link (optional)</Label>
                <Input placeholder="https://www.youtube.com/watch?v=... or https://.../clip.mp4"
                  value={s.videoUrl ?? ""}
                  onChange={(e) => { const n = [...slides]; n[i] = { ...s, videoUrl: e.target.value }; setSlides(n); }} />
                <p className="text-[11px] text-muted-foreground">If set, this video plays in the hero for this slide (the image is used as its poster/fallback).</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Alt text</Label>
                <Input value={s.alt ?? ""} onChange={(e) => { const n = [...slides]; n[i] = { ...s, alt: e.target.value }; setSlides(n); }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => save.mutate({ key: "home.slides", value: slides.filter((s) => s.imageUrl || s.videoUrl) })} disabled={save.isPending}>
            Save slides
          </Button>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold">Countries grid</h2>
          <p className="text-xs text-muted-foreground">The “Nine countries — One remarkable standard” section. Upload a photo to replace the default image for each country, and edit its name or tagline.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {countries.map((c, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Card {i + 1}</div>
              <MediaUploader label="Photo" value={c.imageUrl} prefix="countries"
                onChange={(p) => { const n = [...countries]; n[i] = { ...c, imageUrl: p ?? "" }; setCountries(n); }} />
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Name</Label>
                  <Input value={c.name} onChange={(e) => { const n = [...countries]; n[i] = { ...c, name: e.target.value }; setCountries(n); }} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Flag emoji</Label>
                  <Input value={c.flag ?? ""} onChange={(e) => { const n = [...countries]; n[i] = { ...c, flag: e.target.value }; setCountries(n); }} />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Tagline</Label>
                <Input value={c.tag ?? ""} onChange={(e) => { const n = [...countries]; n[i] = { ...c, tag: e.target.value }; setCountries(n); }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => save.mutate({ key: "home.countries", value: countries })} disabled={save.isPending}>
            Save countries
          </Button>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">

        <h2 className="font-display text-xl font-bold">Sections</h2>
        <p className="text-xs text-muted-foreground">Toggle sections on/off and reorder. Titles below override defaults where applicable.</p>
        <div className="space-y-3">
          {sections.map((s, i) => (
            <div key={s.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.type}</div>
                  <div className="font-semibold">{s.title || s.id}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={s.enabled} onCheckedChange={(v) => {
                    const next = [...sections]; next[i] = { ...s, enabled: v }; setSections(next);
                  }} />
                  <Button variant="ghost" size="sm" onClick={() => moveSection(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => moveSection(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="space-y-1"><Label className="text-xs">Title</Label>
                  <Input value={s.title ?? ""} onChange={(e) => { const n = [...sections]; n[i] = { ...s, title: e.target.value }; setSections(n); }} />
                </div>
                <div className="space-y-1"><Label className="text-xs">Subtitle</Label>
                  <Input value={s.subtitle ?? ""} onChange={(e) => { const n = [...sections]; n[i] = { ...s, subtitle: e.target.value }; setSections(n); }} />
                </div>
                {s.type === "cta" && (
                  <>
                    <div className="space-y-1"><Label className="text-xs">CTA label</Label>
                      <Input value={s.ctaLabel ?? ""} onChange={(e) => { const n = [...sections]; n[i] = { ...s, ctaLabel: e.target.value }; setSections(n); }} />
                    </div>
                    <div className="space-y-1"><Label className="text-xs">CTA link</Label>
                      <Input value={s.ctaHref ?? ""} onChange={(e) => { const n = [...sections]; n[i] = { ...s, ctaHref: e.target.value }; setSections(n); }} />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => save.mutate({ key: "home.sections", value: sections })} disabled={save.isPending}>
            Save sections
          </Button>
        </div>
      </section>
    </div>
  );
}
