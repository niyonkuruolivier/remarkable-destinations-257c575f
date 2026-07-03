import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminListRows, adminUpsertRow, adminDeleteRow } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { MediaUploader } from "./MediaUploader";
import { mediaUrl } from "@/lib/media";

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "image" | "array" | "json";
  required?: boolean;
  colInList?: boolean;
};

export function CrudTable({
  table,
  title,
  description,
  fields,
  mediaPrefix,
}: {
  table: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  mediaPrefix?: string;
}) {
  const qc = useQueryClient();
  const list = useServerFn(adminListRows);
  const upsert = useServerFn(adminUpsertRow);
  const del = useServerFn(adminDeleteRow);

  const key = ["admin", table];
  const q = useQuery({
    queryKey: key,
    queryFn: () => list({ data: { table } }),
  });

  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [open, setOpen] = useState(false);

  const saveMut = useMutation({
    mutationFn: (row: Record<string, any>) => upsert({ data: { table, row } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key });
      qc.invalidateQueries({ queryKey: ["public", table] });
      setOpen(false);
      toast.success("Saved");
    },
    onError: (e: any) => toast.error(e?.message ?? "Save failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { table, id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key });
      qc.invalidateQueries({ queryKey: ["public", table] });
      toast.success("Deleted");
    },
    onError: (e: any) => toast.error(e?.message ?? "Delete failed"),
  });

  const listCols = useMemo(() => fields.filter((f) => f.colInList !== false).slice(0, 4), [fields]);

  function startNew() {
    const blank: Record<string, any> = {};
    for (const f of fields) {
      blank[f.key] = f.type === "boolean" ? false : f.type === "array" ? [] : "";
    }
    setEditing(blank);
    setOpen(true);
  }

  function startEdit(row: Record<string, any>) {
    setEditing({ ...row });
    setOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        <Button onClick={startNew}><Plus className="mr-1 h-4 w-4" /> New</Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              {listCols.map((c) => (
                <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>
              ))}
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {q.isLoading ? (
              <tr><td colSpan={listCols.length + 1} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
            ) : (q.data ?? []).length === 0 ? (
              <tr><td colSpan={listCols.length + 1} className="px-4 py-8 text-center text-muted-foreground">No entries yet.</td></tr>
            ) : (
              (q.data ?? []).map((row: any) => (
                <tr key={row.id} className="border-t">
                  {listCols.map((c) => (
                    <td key={c.key} className="px-4 py-3 align-top">
                      {c.type === "image" ? (
                        row[c.key] ? <img src={mediaUrl(row[c.key])} alt="" className="h-10 w-16 rounded object-cover" /> : <span className="text-muted-foreground">—</span>
                      ) : c.type === "boolean" ? (
                        row[c.key] ? "Yes" : "No"
                      ) : c.type === "array" ? (
                        Array.isArray(row[c.key]) ? row[c.key].join(", ") : ""
                      ) : (
                        <span className="line-clamp-2">{String(row[c.key] ?? "")}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => startEdit(row)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => {
                        if (confirm("Delete this entry?")) deleteMut.mutate(row.id);
                      }}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit" : "New"} {title.slice(0, -1) || title}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  {f.type !== "boolean" && f.type !== "image" && <Label>{f.label}</Label>}
                  {f.type === "text" ? (
                    <Input value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} required={f.required} />
                  ) : f.type === "number" ? (
                    <Input type="number" value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value === "" ? null : Number(e.target.value) })} />
                  ) : f.type === "textarea" ? (
                    <Textarea rows={4} value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                  ) : f.type === "boolean" ? (
                    <div className="flex items-center gap-3">
                      <Switch checked={!!editing[f.key]} onCheckedChange={(v) => setEditing({ ...editing, [f.key]: v })} />
                      <Label>{f.label}</Label>
                    </div>
                  ) : f.type === "image" ? (
                    <MediaUploader
                      label={f.label}
                      value={editing[f.key]}
                      onChange={(p) => setEditing({ ...editing, [f.key]: p })}
                      prefix={mediaPrefix}
                    />
                  ) : f.type === "array" ? (
                    <Input
                      value={Array.isArray(editing[f.key]) ? editing[f.key].join(", ") : ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                      placeholder="Comma separated"
                    />
                  ) : f.type === "json" ? (
                    <Textarea rows={6} value={typeof editing[f.key] === "string" ? editing[f.key] : JSON.stringify(editing[f.key] ?? null, null, 2)}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      onBlur={(e) => { try { setEditing({ ...editing, [f.key]: JSON.parse(e.target.value) }); } catch {} }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => editing && saveMut.mutate(editing)} disabled={saveMut.isPending}>
              {saveMut.isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
