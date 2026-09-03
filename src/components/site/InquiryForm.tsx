import { useState } from "react";
import { toast } from "sonner";

export function InquiryForm({ source = "homepage" }: { source?: string }) {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const interest = String(fd.get("interest") || "").trim();
    const travelDate = String(fd.get("travel_date") || "").trim();
    const travelers = String(fd.get("travelers") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const to = "hello@remarkabledestinations.com";
    const subject = encodeURIComponent(`New safari inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "",
        interest ? `Safari interest: ${interest}` : "",
        travelDate ? `Travel date: ${travelDate}` : "",
        travelers ? `Travelers: ${travelers}` : "",
        "",
        "Message:",
        message || "—",
        "",
        `Source: ${source}`,
      ]
        .filter(Boolean)
        .join("\n")
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      to
    )}&su=${subject}&body=${body}`;

    setLoading(false);
    window.open(gmailUrl, "_blank");
    toast.success("Opening Gmail so you can send your inquiry directly.");
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
          {loading ? "Opening Gmail…" : "Begin the Conversation"}
        </button>
      </div>
    </form>
  );
}