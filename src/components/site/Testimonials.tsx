import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const items = [
  { name: "Anjali & Rohit", role: "Wedding, Udaipur", stars: 5,
    quote: "Fraz turned our three-day wedding into a film we relive every week. Every glance, every laugh — held perfectly." },
  { name: "Neha & Karan", role: "Pre-Wedding, Manali", stars: 5,
    quote: "Highly professional and endlessly creative. He made our pre-wedding shoot feel like a private editorial." },
  { name: "Pooja & Amit", role: "Wedding, Delhi", stars: 5,
    quote: "The best decision we made for our wedding. The photographs are simply breathtaking and deeply personal." },
  { name: "Ritika Malhotra", role: "Maternity Portrait", stars: 5,
    quote: "Calming, kind, and quietly brilliant. Every frame feels like it was made just for our family." },
  { name: "Aditya Verma", role: "Brand Campaign", stars: 5,
    quote: "The visuals elevated our entire brand. A studio that understands storytelling as well as light." },
  { name: "Sana & Ibrahim", role: "Nikah, Lucknow", stars: 5,
    quote: "Every detail preserved with love. We cried looking at the album — it felt like being there again." },
];

const avatarBg = ["bg-champagne", "bg-beige", "bg-sand", "bg-cream", "bg-champagne", "bg-beige"];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Kind Words</span>
          <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance">
            What clients <span className="italic font-serif">say</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-lg border border-border bg-card p-8 shadow-soft"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-champagne" strokeWidth={1} />
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: t.stars }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 font-serif text-lg leading-relaxed text-chocolate">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className={`h-11 w-11 rounded-full ${avatarBg[i]} grid place-items-center font-display text-lg text-chocolate`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display text-ink">{t.name}</p>
                  <p className="text-xs text-coffee tracking-wide">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
