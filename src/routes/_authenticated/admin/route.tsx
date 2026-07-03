import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { checkIsAdmin, bootstrapFirstAdmin } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Home, Image as ImageIcon, MapPin, Package, Quote,
  BookOpen, Inbox, Settings, LogOut, LayoutDashboard, Images,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Remarkable" }, { name: "robots", content: "noindex" }] }),
  component: AdminShell,
});

const NAV: { to: string; label: string; icon: any; exact?: boolean }[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/home", label: "Home Page", icon: Home },
  { to: "/admin/destinations", label: "Destinations", icon: MapPin },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/blog", label: "Blog", icon: BookOpen },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { to: "/admin/media", label: "Media Library", icon: Images },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
];

function AdminShell() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const check = useServerFn(checkIsAdmin);
  const bootstrap = useServerFn(bootstrapFirstAdmin);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await check();
        if (r.isAdmin) { setIsAdmin(true); setChecking(false); return; }
        // Try to bootstrap (works only if no admins exist yet)
        const b = await bootstrap();
        if (b.promoted) {
          toast.success("You are the first user — promoted to admin.");
          setIsAdmin(true);
        } else {
          toast.error("Admin access required.");
          navigate({ to: "/" });
        }
      } catch (e: any) {
        toast.error(e?.message ?? "Access check failed");
        navigate({ to: "/" });
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (checking) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Checking access…</div>;
  }
  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r bg-card md:flex">
        <div className="border-b p-5">
          <Link to="/" className="text-xs uppercase tracking-widest text-muted-foreground">Remarkable</Link>
          <div className="mt-1 font-display text-xl font-bold">Admin</div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link key={n.to} to={n.to as any}
                className={"flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors " +
                  (active ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 md:ml-60">
        <div className="border-b bg-card px-6 py-3 md:hidden flex items-center justify-between">
          <span className="font-semibold">Admin</span>
          <Button variant="ghost" size="sm" onClick={signOut}>Sign out</Button>
        </div>
        <div className="mx-auto max-w-6xl p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
