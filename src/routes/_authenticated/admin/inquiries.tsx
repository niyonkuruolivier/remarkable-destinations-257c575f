import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminListRows, adminUpsertRow, adminDeleteRow } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/inquiries")({
  component: Inquiries,
});

function Inquiries() {
  const qc = useQueryClient();
  const list = useServerFn(adminListRows);
  const upsert = useServerFn(adminUpsertRow);
  const del = useServerFn(adminDeleteRow);

  const q = useQuery({
    queryKey: ["admin", "inquiries"],
    queryFn: () => list({ data: { table: "inquiries" } }),
  });
  const setStatus = useMutation({
    mutationFn: (row: any) => upsert({ data: { table: "inquiries", row } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "inquiries"] }),
  });
  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { table: "inquiries", id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "inquiries"] }); toast.success("Deleted"); },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Inquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">Traveler messages submitted through the contact form.</p>
      </div>
      <div className="space-y-3">
        {q.isLoading && <div className="text-sm text-muted-foreground">Loading…</div>}
        {(q.data ?? []).map((r: any) => (
          <div key={r.id} className="rounded-xl border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{r.name} <span className="text-muted-foreground font-normal">· {r.email}</span></div>
                <div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}{r.travelers ? ` · ${r.travelers} travelers` : ""}{r.travel_date ? ` · ${r.travel_date}` : ""}</div>
                {r.interest && <div className="mt-1 text-xs">Interest: {r.interest}</div>}
              </div>
              <div className="flex items-center gap-2">
                <select value={r.status ?? "new"} onChange={(e) => setStatus.mutate({ ...r, status: e.target.value })}
                  className="rounded-md border bg-background px-2 py-1 text-sm">
                  <option value="new">New</option>
                  <option value="in_progress">In progress</option>
                  <option value="closed">Closed</option>
                </select>
                <Button size="sm" variant="ghost" onClick={() => { if (confirm("Delete?")) delMut.mutate(r.id); }}>Delete</Button>
              </div>
            </div>
            {r.message && <p className="mt-3 whitespace-pre-wrap text-sm">{r.message}</p>}
          </div>
        ))}
        {q.data && q.data.length === 0 && <div className="text-sm text-muted-foreground">No inquiries yet.</div>}
      </div>
    </div>
  );
}
