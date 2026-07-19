import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="bg-ivory min-h-screen">
      <Nav />
      <div className="pt-24 md:pt-28">{children}</div>
      <Footer />
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  italic,
  intro,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: string;
}) {
  return (
    <section className="bg-warm border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="font-display mt-4 text-4xl md:text-6xl lg:text-7xl text-ink text-balance leading-[1.05]">
          {title} {italic && <span className="italic font-serif">{italic}</span>}
        </h1>
        {intro && <p className="mt-5 max-w-2xl mx-auto text-coffee">{intro}</p>}
      </div>
    </section>
  );
}
