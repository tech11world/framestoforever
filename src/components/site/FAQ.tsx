import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How far in advance should I book?", a: "For weddings, we recommend booking 4–8 months in advance to secure your preferred date. Portrait and editorial sessions can typically be arranged within 2–4 weeks." },
  { q: "Do you travel for destination weddings?", a: "Yes — we regularly travel across India and internationally. Travel and accommodation are quoted transparently based on the destination." },
  { q: "When will I receive my photographs?", a: "Sneak peeks are delivered within 48 hours. The full edited gallery is delivered within 4–6 weeks, along with a beautifully packaged album where applicable." },
  { q: "Can we customise our package?", a: "Absolutely. Every package is a starting point — hours, deliverables, and add-ons are shaped around your day." },
  { q: "Do you offer cinematic wedding films?", a: "Yes. Our film team delivers story-driven highlight films and full-length ceremonies, edited to feel like memories in motion." },
  { q: "What is your payment structure?", a: "A 30% retainer secures your date, 40% is due a month before the event, and the remaining 30% on the day of coverage." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Frequently Asked</span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl text-ink text-balance">
            Every <span className="italic font-serif">question</span>, answered
          </h2>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-display text-xl md:text-2xl text-ink">{f.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-coffee transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                    strokeWidth={1.4}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-coffee leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
