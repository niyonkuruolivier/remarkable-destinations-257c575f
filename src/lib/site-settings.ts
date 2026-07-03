import { supabase } from "@/integrations/supabase/client";

export type HeroSetting = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
};

export type HomeSection = {
  id: string;
  type: string;
  enabled: boolean;
  title?: string;
  subtitle?: string;
  itemIds?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type ContactSetting = {
  email: string;
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
};

export type BrandingSetting = {
  siteName: string;
  tagline: string;
};

export async function getSiteSetting<T = unknown>(key: string): Promise<T | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) return null;
  return (data?.value as T) ?? null;
}

export async function getSiteSettings(): Promise<Record<string, any>> {
  const { data, error } = await supabase.from("site_settings").select("key,value");
  if (error || !data) return {};
  return Object.fromEntries(data.map((r) => [r.key, r.value]));
}
