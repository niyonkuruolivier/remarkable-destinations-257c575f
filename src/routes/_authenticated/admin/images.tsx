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

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Images</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Replace any photo on the website. Upload a new image for a slot and it goes live
          instantly; remove it to restore the original design image.
        </p>
      </div>

      {IMAGE_GROUPS.map((group) => (
        <section key={group} className="rounded-xl border bg-card p-6">
          <h2 className="font-display text-xl font-bold">{group}</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {IMAGE_SLOTS.filter((s) => s.group === group).map((slot) => (
              <div key={slot.key} className="space-y-2">
                {overrides[slot.key] ? (
                  <MediaUploader
                    label={slot.label}
                    value={overrides[slot.key]}
                    prefix="site"
                    onChange={(p) => set(slot.key, p)}
                  />
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
