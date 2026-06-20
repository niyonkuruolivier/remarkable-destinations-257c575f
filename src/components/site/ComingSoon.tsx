import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ComingSoon({ title, eyebrow, body }: { title: string; eyebrow: string; body: string }) {
  return (
    <div className="bg-background">
      <div className="bg-dark pt-2">
        <Header />
      </div>
      <section className="mx-auto max-w-[1100px] px-6 py-40 md:px-10 md:py-56 text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-6 font-display text-[52px] leading-[1.05] text-foreground md:text-[80px]">
          <em className="italic font-light">{title}</em>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-[16px] leading-[1.8] text-muted-foreground">{body}</p>
        <Link to="/contact" className="btn-primary mt-12">Begin a Conversation</Link>
      </section>
      <Footer />
    </div>
  );
}