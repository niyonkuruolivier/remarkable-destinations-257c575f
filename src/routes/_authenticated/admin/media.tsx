import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listMedia, uploadMedia, deleteMedia, mediaUrl } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { toast } from "sonner";
import { Upload, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: MediaLibrary,
});

function MediaLibrary() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const q = useQuery({ queryKey: ["media", "list"], queryFn: listMedia });

  const uploadMut = useMutation({
    mutationFn: (f: File) => uploadMedia(f),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["media", "list"] }); toast.success("Uploaded"); },
    onError: (e: any) => toast.error(e?.message ?? "Upload failed"),
  });
  const delMut = useMutation({
    mutationFn: (path: string) => deleteMedia(path),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["media", "list"] }); toast.success("Deleted"); },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Media Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">All uploaded images. Uploads only — no URLs.</p>
        </div>
        <Button onClick={() => fileRef.current?.click()}><Upload className="mr-2 h-4 w-4" /> Upload</Button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadMut.mutate(f); e.target.value = ""; }} />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {(q.data ?? []).map((m) => (
          <div key={m.path} className="group relative overflow-hidden rounded-lg border bg-card">
            <img src={mediaUrl(m.path)} alt={m.name} className="aspect-square w-full object-cover" />
            <div className="p-2 text-xs">
              <div className="truncate">{m.name}</div>
              <button onClick={() => { if (confirm("Delete this image?")) delMut.mutate(m.path); }}
                className="mt-1 inline-flex items-center gap-1 text-destructive">
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </div>
          </div>
        ))}
        {q.data && q.data.length === 0 && (
          <div className="col-span-full py-16 text-center text-sm text-muted-foreground">No files yet.</div>
        )}
      </div>
    </div>
  );
}
