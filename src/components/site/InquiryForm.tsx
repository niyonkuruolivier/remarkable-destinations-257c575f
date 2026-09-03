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

  const label = "mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground";
  const field =
    "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-cobalt focus:bg-card focus:outline-none focus:ring-2 focus:ring-cobalt/20";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label className={label} htmlFor="cf-name">Your name</label>
        <input id="cf-name" className={field} required name="name" placeholder="Jane Doe" />
      </div>
      <div>
        <label className={label} htmlFor="cf-email">Email address</label>
        <input id="cf-email" className={field} required type="email" name="email" placeholder="jane@email.com" />
      </div>
      <div>
        <label className={label} htmlFor="cf-phone">Telephone <span className="normal-case tracking-normal font-normal">(optional)</span></label>
        <input id="cf-phone" className={field} name="phone" placeholder="+250 …" />
      </div>
      <div>
        <label className={label} htmlFor="cf-interest">Safari interest</label>
        <input id="cf-interest" className={field} name="interest" placeholder="e.g. gorilla trek" />
      </div>
      <div>
        <label className={label} htmlFor="cf-date">Approximate travel date</label>
        <input id="cf-date" className={field} type="date" name="travel_date" />
      </div>
      <div>
        <label className={label} htmlFor="cf-travelers">Travelers</label>
        <input id="cf-travelers" className={field} type="number" min={1} name="travelers" placeholder="2" />
      </div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="cf-message">Tell us more</label>
        <textarea
          id="cf-message"
          className={field + " resize-none"}
          rows={5}
          name="message"
          placeholder="Tell us what you dream of seeing…"
        />
      </div>
      <div className="sm:col-span-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button disabled={loading} className="btn-cobalt w-full sm:w-auto" type="submit">
          {loading ? "Opening Gmail…" : "Begin the Conversation"}
        </button>
        <p className="text-[13px] text-muted-foreground">We reply within 24 hours — 7 days a week.</p>
      </div>
    </form>
  );
}
