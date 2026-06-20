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
      <div className="relative h-[78svh] min-h-[560px] w-full">
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
              "linear-gradient(180deg, rgba(11,14,46,0.55) 0%, rgba(11,14,46,0.25) 45%, rgba(229,227,241,0.95) 100%)",
          }}
        />
        <Header transparent />
        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col items-start justify-end px-6 pb-24 md:px-10 md:pb-32">
          <span className="tag-pill">{eyebrow}</span>
          <h1 className="mt-5 max-w-4xl font-display text-[44px] font-extrabold leading-[0.92] tracking-[-0.02em] text-white sm:text-[64px] md:text-[96px]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-white/85 md:text-[18px]">
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