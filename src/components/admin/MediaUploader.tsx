import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadMedia, mediaUrl, deleteMedia } from "@/lib/media";
import { toast } from "sonner";

export function MediaUploader({
  value,
  onChange,
  prefix = "",
  label = "Image",
}: {
  value: string | null | undefined;
  onChange: (path: string | null) => void;
  prefix?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function pick(file: File) {
    setBusy(true);
    try {
      const path = await uploadMedia(file, prefix);
      if (value) {
        try { await deleteMedia(value); } catch {}
      }
      onChange(path);
      toast.success("Uploaded");
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function clear() {
    if (value) {
      try { await deleteMedia(value); } catch {}
    }
    onChange(null);
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>
      {value ? (
        <div className="relative w-full max-w-xs overflow-hidden rounded-lg border">
          <img src={mediaUrl(value)} alt="" className="h-40 w-full object-cover" />
          <div className="flex items-center justify-between gap-2 p-2 text-xs">
            <span className="truncate text-muted-foreground">{value}</span>
            <div className="flex gap-1">
              <button type="button" onClick={() => inputRef.current?.click()} className="rounded bg-secondary px-2 py-1 hover:bg-secondary/80" disabled={busy}>
                Replace
              </button>
              <button type="button" onClick={clear} className="rounded bg-destructive px-2 py-1 text-destructive-foreground" disabled={busy}>
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={busy}
          className="flex h-32 w-full max-w-xs flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 text-sm text-muted-foreground hover:border-muted-foreground/60">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
          <span>Click to upload</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) pick(f); e.target.value = ""; }} />
    </div>
  );
}
