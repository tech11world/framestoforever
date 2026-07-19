import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { photosFor } from "@/lib/photos";

export function InstagramFeed() {
  const posts = [
    ...photosFor("Wedding", 4),
    ...photosFor("Pre Wedding", 4),
    ...photosFor("Fashion", 4),
  ];
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Follow the Journey</span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl text-ink">
            @<span className="italic font-serif">framestoforever</span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
          {posts.slice(0, 12).map((p, i) => (
            <motion.a
              key={p.id + i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-md bg-champagne/40"
            >
              <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="h-6 w-6 text-ivory" strokeWidth={1.4} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
