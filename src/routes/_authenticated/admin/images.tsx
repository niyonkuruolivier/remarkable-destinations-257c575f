import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminUpsertSiteSetting } from "@/lib/admin.functions";
import { getSiteSettings } from "@/lib/site-settings";
import { IMAGE_SLOTS, IMAGE_GROUPS, type ImageOverrides } from "@/lib/site-images";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/images")({
  component: ImagesEditor,
});

function ImagesEditor() {
  const qc = useQueryClient();
  const upsert = useServerFn(adminUpsertSiteSetting);
  const q = useQuery({ queryKey: ["site_settings"], queryFn: getSiteSettings });
  const [overrides, setOverrides] = useState<ImageOverrides | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (q.data) setOverrides({ ...((q.data["images"] as ImageOverrides) ?? {}) });
  }, [q.data]);

  const save = useMutation({
    mutationFn: async (value: ImageOverrides) => upsert({ data: { key: "images", value } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_settings"] });
      toast.success("Images saved — live on the site");
    },
    onError: (e: any) => toast.error(e?.message ?? "Save failed"),
  });

  if (!overrides) return <div className="text-sm text-muted-foreground">Loading…</div>;

  const set = (key: string, path: string | null) => {
    const next = { ...overrides };
    if (path) next[key] = path;
    else delete next[key];
    setOverrides(next);
    save.mutate(next);
  };

  const q2 = search.trim().toLowerCase();
  const match = (label: string, group: string) =>
    !q2 || label.toLowerCase().includes(q2) || group.toLowerCase().includes(q2);
  const groups = IMAGE_GROUPS.map((g) => ({
    group: g,
    slots: IMAGE_SLOTS.filter((s) => s.group === g && match(s.label, g)),
  })).filter((g) => g.slots.length > 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Images</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every photo on the website is listed below, grouped by the page where it appears.
          Search for a page or image name, upload a replacement, and it goes live instantly —
          remove it to restore the original design image.
        </p>
        <div className="relative mt-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by page or image name (e.g. Gallery, hero, logo)…"
            className="pl-9"
          />
        </div>
      </div>

      {groups.length === 0 && (
        <p className="text-sm text-muted-foreground">No images match “{search}”.</p>
      )}

      {groups.map(({ group, slots }) => (
        <section key={group} className="rounded-xl border bg-card p-6">
          <h2 className="font-display text-xl font-bold">{group}</h2>
          <p className="text-xs text-muted-foreground">
            {slots.length} image{slots.length === 1 ? "" : "s"} on this page
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {slots.map((slot) => (
              <div key={slot.key} className="space-y-2">
                {overrides[slot.key] ? (
                  <div className="space-y-2">
                    <MediaUploader
                      label={slot.label}
                      value={overrides[slot.key]}
                      prefix="site"
                      onChange={(p) => set(slot.key, p)}
                    />
                    <p className="text-xs font-medium text-primary">Custom image — live on the site</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {slot.default ? (
                      <div className="overflow-hidden rounded-lg border">
                        <img src={slot.default} alt="" className="h-28 w-full object-cover" />
                      </div>
                    ) : null}
                    <MediaUploader
                      label={slot.label}
                      value={null}
                      prefix="site"
                      onChange={(p) => set(slot.key, p)}
                    />
                    <p className="text-xs text-muted-foreground">Using the default image</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <Button variant="outline" onClick={() => save.mutate(overrides)} disabled={save.isPending}>
        Save all
      </Button>
    </div>
  );
}
