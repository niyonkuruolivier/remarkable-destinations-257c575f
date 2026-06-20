import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function InquiryForm({ source = "homepage" }: { source?: string }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.from("inquiries").insert({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || "") || null,
      interest: String(fd.get("interest") || "") || null,
      travel_date: (fd.get("travel_date") as string) || null,
      travelers: fd.get("travelers") ? Number(fd.get("travelers")) : null,
      message: String(fd.get("message") || "") || null,
      source,
    });
    setLoading(false);
    if (error) {
      toast.error("Something interrupted us. Please try again.");
      return;
    }
    toast.success("Received. A safari designer will write to you within 24 hours.");
    (e.target as HTMLFormElement).reset();
  }

  const field =
    "w-full border-b border-foreground/20 bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      <input className={field} required name="name" placeholder="Your name" />
      <input className={field} required type="email" name="email" placeholder="Email address" />
      <input className={field} name="phone" placeholder="Telephone (optional)" />
      <input className={field} name="interest" placeholder="Safari interest — e.g. gorilla trek" />
      <input className={field} type="date" name="travel_date" />
      <input className={field} type="number" min={1} name="travelers" placeholder="Travelers" />
      <textarea
        className={field + " md:col-span-2 resize-none"}
        rows={4}
        name="message"
        placeholder="Tell us what you dream of seeing…"
      />
      <div className="md:col-span-2">
        <button disabled={loading} className="btn-primary w-full md:w-auto" type="submit">
          {loading ? "Sending…" : "Begin the Conversation"}
        </button>
      </div>
    </form>
  );
}