import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Remarkable" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created");
      }
      navigate({ to: "/admin" });
    } catch (err: any) {
      toast.error(err?.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm">
        <Link to="/" className="text-xs uppercase tracking-widest text-muted-foreground">← Back to site</Link>
        <h1 className="mt-4 font-display text-3xl font-bold">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Admin access to Remarkable CMS</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <button type="button" onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground">
          {mode === "signin" ? "Need an account? Create one" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
