import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Check, Crown, Star, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "15,000",
    icon: Sparkles,
    features: ["4 Hours Coverage", "1 Photographer", "100+ Edited Photos", "Private Online Gallery", "Standard Delivery"],
    cta: "Choose Basic",
  },
  {
    name: "Standard",
    price: "25,000",
    icon: Star,
    highlight: true,
    features: ["8 Hours Coverage", "1 Photographer", "200+ Edited Photos", "Private Online Gallery", "Premium Photo Book", "Priority Delivery"],
    cta: "Choose Standard",
  },
  {
    name: "Premium",
    price: "40,000",
    icon: Crown,
    features: ["Full Day Coverage", "2 Photographers", "500+ Edited Photos", "Private Online Gallery", "Luxury Photo Album", "Cinematic Teaser Film", "Express Delivery"],
    cta: "Choose Premium",
  },
];

export function Packages() {
  return (
    <section id="packages" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Packages & Pricing</span>
          <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance">
            Thoughtfully <span className="italic font-serif">crafted</span> collections
          </h2>
          <p className="mt-4 max-w-xl text-coffee">Every package can be tailored to suit your story, venue, and vision.</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl p-8 md:p-10 flex flex-col ${
                p.highlight
                  ? "bg-ink text-ivory shadow-luxury lg:-translate-y-4 border border-gold/40"
                  : "bg-card text-ink border border-border shadow-soft"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink px-4 py-1 rounded-full text-[10px] tracking-[0.28em] uppercase font-medium">
                  Most Popular
                </div>
              )}
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${p.highlight ? "bg-ivory/10" : "bg-cream"}`}>
                <p.icon className="h-5 w-5" strokeWidth={1.4} />
              </div>
              <p className={`eyebrow mt-6 ${p.highlight ? "!text-champagne" : ""}`}>{p.name}</p>
              <p className="font-display mt-3 text-5xl md:text-6xl leading-none">
                <span className={p.highlight ? "text-champagne" : "text-coffee"}>₹</span>{p.price}
              </p>
              <p className={`mt-1 text-xs ${p.highlight ? "text-ivory/60" : "text-coffee/70"}`}>Starting from</p>

              <ul className={`mt-8 space-y-3 text-sm ${p.highlight ? "text-ivory/85" : "text-coffee"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.highlight ? "text-gold" : "text-chocolate"}`} strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/book"
                className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full py-4 text-[11px] tracking-[0.28em] uppercase transition-all ${
                  p.highlight
                    ? "bg-gold text-ink hover:bg-champagne"
                    : "bg-ink text-ivory hover:bg-chocolate"
                }`}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-10 text-xs text-coffee/70">
          * Packages can be customised as per your needs. GST additional.
        </p>
      </div>
    </section>
  );
}
