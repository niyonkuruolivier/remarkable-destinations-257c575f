import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Failed to check admin role");
  if (!data) throw new Error("Forbidden: admin role required");
}

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: !!data, userId: context.userId };
  });

export const bootstrapFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("bootstrap_first_admin");
    if (error) throw new Error(error.message);
    return { promoted: !!data };
  });

export const adminListSiteSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("site_settings")
      .select("*")
      .order("key");
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpsertSiteSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { key: string; value: unknown }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("site_settings")
      .upsert({ key: data.key, value: data.value }, { onConflict: "key" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Generic CRUD for known content tables
type ContentTable =
  | "destinations"
  | "packages"
  | "testimonials"
  | "gallery_items"
  | "blog_posts"
  | "inquiries";

const ALLOWED: ContentTable[] = [
  "destinations",
  "packages",
  "testimonials",
  "gallery_items",
  "blog_posts",
  "inquiries",
];

function assertTable(t: string): asserts t is ContentTable {
  if (!ALLOWED.includes(t as ContentTable)) throw new Error("Invalid table");
}

export const adminListRows = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { table: string }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    assertTable(data.table);
    const { data: rows, error } = await context.supabase
      .from(data.table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const adminUpsertRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { table: string; row: Record<string, any> }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    assertTable(data.table);
    const { data: row, error } = await context.supabase
      .from(data.table)
      .upsert(data.row)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteRow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { table: string; id: string }) => d)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    assertTable(data.table);
    const { error } = await context.supabase.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
