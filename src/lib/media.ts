import { supabase } from "@/integrations/supabase/client";

/**
 * Convert a stored media path to a public URL that streams from our
 * server route (works with a private bucket).
 * Accepts either a bare path ("hero-abc.jpg") or an already-formed URL.
 */
export function mediaUrl(pathOrUrl: string | null | undefined): string {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith("/")) return pathOrUrl;
  return `/api/public/media/${pathOrUrl}`;
}

/** Upload a file to the media bucket. Returns the stored path. */
export async function uploadMedia(file: File, prefix = ""): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${prefix ? prefix.replace(/\/$/, "") + "/" : ""}${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  return path;
}

/** Delete a media object (best-effort). */
export async function deleteMedia(path: string | null | undefined): Promise<void> {
  if (!path || /^https?:\/\//i.test(path) || path.startsWith("/")) return;
  await supabase.storage.from("media").remove([path]);
}

export async function listMedia(): Promise<{ name: string; path: string; updated_at?: string | null }[]> {
  const { data, error } = await supabase.storage.from("media").list("", {
    limit: 1000,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error) throw error;
  return (data ?? [])
    .filter((f) => f.name && !f.name.endsWith("/"))
    .map((f) => ({ name: f.name, path: f.name, updated_at: f.updated_at }));
}
