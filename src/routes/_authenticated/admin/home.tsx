import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminUpsertSiteSetting } from "@/lib/admin.functions";
import { getSiteSettings, type HeroSetting, type HomeSection } from "@/lib/site-settings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { toast } from "sonner";
import { ArrowDown, ArrowUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/home")({
  component: HomeEditor,
});

function HomeEditor() {
  const qc = useQueryClient();
  const upsert = useServerFn(adminUpsertSiteSetting);

  const q = useQuery({ queryKey: ["site_settings"], queryFn: getSiteSettings });

  const [hero, setHero] = useState<HeroSetting | null>(null);
  const [sections, setSections] = useState<HomeSection[]>([]);

  useEffect(() => {
    if (q.data) {
      setHero(q.data["home.hero"] ?? { eyebrow: "", title: "", subtitle: "", ctaLabel: "", ctaHref: "", imageUrl: "" });
      setSections(q.data["home.sections"] ?? []);
    }
  }, [q.data]);

  const save = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => upsert({ data: { key, value } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["site_settings"] }); toast.success("Saved"); },
    onError: (e: any) => toast.error(e?.message ?? "Save failed"),
  });

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
