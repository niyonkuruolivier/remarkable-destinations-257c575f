import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminListRows } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Overview,
});

function Overview() {
  const list = useServerFn(adminListRows);
  const tables = ["destinations", "packages", "testimonials", "gallery_items", "blog_posts", "inquiries"] as const;
  const q = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: async () => {
      const results = await Promise.all(
        tables.map((t) => list({ data: { table: t } }).catch(() => []))
      );
      return Object.fromEntries(tables.map((t, i) => [t, results[i]])) as Record<string, any[]>;
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          One source of truth. Everything you edit here shows up on the live site immediately.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t) => (
          <Link key={t} to={"/admin/" + (t === "gallery_items" ? "gallery" : t === "blog_posts" ? "blog" : t) as any}
            className="rounded-xl border bg-card p-5 transition hover:shadow-sm">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.replace("_", " ")}</div>
            <div className="mt-2 font-display text-3xl font-bold">
              {q.data?.[t]?.length ?? "—"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
