import { Header } from "./Header";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  alt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--ink)" }}>
      <div className="relative h-[58svh] min-h-[420px] w-full md:h-[62svh] md:min-h-[480px]">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,14,46,0.55) 0%, rgba(11,14,46,0.35) 45%, rgba(11,14,46,0.78) 100%)",
          }}
        />
        <Header transparent />
        <div className="relative z-20 mx-auto flex h-full max-w-[1500px] flex-col items-center justify-end px-6 pb-24 text-center md:px-10 md:pb-32">
          <span className="tag-pill">{eyebrow}</span>
          <h1 className="mt-5 max-w-4xl font-display text-[26px] font-extrabold leading-[0.92] tracking-[-0.02em] text-foreground sm:text-[38px] md:text-[58px]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-foreground/85 md:text-[18px]">
              {subtitle}
            </p>
          ) : null}
        </div>
        <svg
          className="absolute -bottom-px left-0 z-10 h-[10vw] min-h-[60px] w-full"
          viewBox="0 0 1500 160"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,160 L0,90 Q750,-20 1500,90 L1500,160 Z" fill="var(--lavender)" />
        </svg>
      </div>
    </section>
  );
}