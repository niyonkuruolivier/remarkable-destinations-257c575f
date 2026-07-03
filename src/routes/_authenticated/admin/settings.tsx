import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminUpsertSiteSetting } from "@/lib/admin.functions";
import { getSiteSettings, type ContactSetting, type BrandingSetting } from "@/lib/site-settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const qc = useQueryClient();
  const upsert = useServerFn(adminUpsertSiteSetting);
  const q = useQuery({ queryKey: ["site_settings"], queryFn: getSiteSettings });
  const [contact, setContact] = useState<ContactSetting | null>(null);
  const [brand, setBrand] = useState<BrandingSetting | null>(null);

  useEffect(() => {
    if (q.data) {
      setContact(q.data["site.contact"] ?? { email: "", phone: "", address: "", instagram: "", facebook: "" });
      setBrand(q.data["site.branding"] ?? { siteName: "", tagline: "" });
    }
  }, [q.data]);

  const save = useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) => upsert({ data: { key, value } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["site_settings"] }); toast.success("Saved"); },
  });

  if (!contact || !brand) return null;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Site Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Global contact info and branding.</p>
      </div>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="font-display text-xl font-bold">Branding</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5"><Label>Site name</Label><Input value={brand.siteName} onChange={(e) => setBrand({ ...brand, siteName: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Tagline</Label><Input value={brand.tagline} onChange={(e) => setBrand({ ...brand, tagline: e.target.value })} /></div>
        </div>
        <div className="flex justify-end"><Button onClick={() => save.mutate({ key: "site.branding", value: brand })}>Save branding</Button></div>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="font-display text-xl font-bold">Contact</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5"><Label>Email</Label><Input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Phone</Label><Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></div>
          <div className="space-y-1.5 md:col-span-2"><Label>Address</Label><Input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Instagram URL</Label><Input value={contact.instagram} onChange={(e) => setContact({ ...contact, instagram: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Facebook URL</Label><Input value={contact.facebook} onChange={(e) => setContact({ ...contact, facebook: e.target.value })} /></div>
        </div>
        <div className="flex justify-end"><Button onClick={() => save.mutate({ key: "site.contact", value: contact })}>Save contact</Button></div>
      </section>
    </div>
  );
}
