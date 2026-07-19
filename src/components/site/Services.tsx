import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services";

interface ServicesProps {
  showHeader?: boolean;
  limit?: number;
  linkable?: boolean;
}

export function Services({ showHeader = true, limit, linkable = true }: ServicesProps = {}) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;
  return (
    <section id="services" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {showHeader && (
          <div className="flex flex-col items-center text-center">
            <span className="eyebrow">What I Do</span>
            <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance">
              A studio for <span className="italic font-serif">every</span> chapter
            </h2>
            <p className="mt-4 max-w-xl text-coffee">
              From intimate portraits to sweeping wedding films — a curated set of services shaped by craft.
            </p>
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s, i) => {
            const Icon = s.icon;
            const inner = (
              <>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-cream group-hover:bg-ink group-hover:text-ivory group-hover:border-ink transition-all duration-500">
                  <Icon className="h-5 w-5" strokeWidth={1.4} />
                </div>
                <h3 className="font-display mt-6 text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-coffee">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-chocolate/70 group-hover:text-ink transition-colors">
                  <span>Learn more</span>
                  <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
                </div>
              </>
            );
            const className = "group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-500 hover:shadow-luxury hover:-translate-y-1 block text-left";
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {linkable ? (
                  <Link to="/services/$slug" params={{ slug: s.slug }} className={className}>
                    {inner}
                  </Link>
                ) : (
                  <article className={className}>{inner}</article>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
