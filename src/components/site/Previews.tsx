import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import fraz from "@/assets/fraz.jpg";
import { previewPhotos, categorySlug } from "@/lib/photos";
import { SERVICES } from "@/lib/services";

function SectionCTA({ to, label }: { to: string; label: string }) {
  return (
    <div className="mt-14 flex justify-center">
      <Link
        to={to}
        className="group inline-flex items-center gap-3 rounded-full border border-ink/80 px-8 py-4 text-[11px] tracking-[0.28em] uppercase text-ink hover:bg-ink hover:text-ivory transition-all"
      >
        {label}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/* ---------- About preview ---------- */
export function AboutPreview() {
  return (
    <section className="relative bg-warm py-24 md:py-32 grain">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative overflow-hidden rounded-lg shadow-luxury">
            <img
              src={fraz}
              alt="Fraz Saifi, founder of Frames to Forever"
              loading="lazy"
              width={900}
              height={1100}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 md:-right-8 rotate-3 bg-ivory shadow-soft px-6 py-4 border border-border">
            <p className="font-script text-3xl text-coffee leading-none">Fraz</p>
            <p className="eyebrow mt-1">Founder · Photographer</p>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <span className="eyebrow">About Me</span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl text-ink text-balance leading-[1.05]"
          >
            Turning moments into <span className="italic font-serif">timeless</span> stories.
          </motion.h2>

          <div className="mt-8 space-y-5 text-coffee leading-relaxed max-w-2xl">
            <p>
              I'm <span className="text-ink font-medium">Fraz Saifi</span>, a professional photographer
              and visual storyteller with a passion for capturing moments that feel real, timeless, and unforgettable.
            </p>
            <p>
              My journey began in <span className="text-ink">2020</span>, when I turned my passion for photography
              into an independent creative career — working closely with clients to bring their unique visions to life.
            </p>
            <p className="font-serif italic text-chocolate">
              Your moments. Your story. Captured timelessly.
            </p>
          </div>

          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-ink/80 px-7 py-3.5 text-[11px] tracking-[0.28em] uppercase text-ink hover:bg-ink hover:text-ivory transition-all group"
          >
            Read Full Story
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Portfolio preview ---------- */
export function PortfolioPreview() {
  const photos = previewPhotos(8);
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Our Portfolio</span>
          <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance">
            Moments <span className="italic font-serif">captured</span>
          </h2>
          <p className="mt-4 max-w-xl text-coffee">
            A glimpse across chapters — weddings, portraits, and the quiet in-between.
          </p>
        </div>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]">
          {photos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 block w-full break-inside-avoid"
            >
              <Link
                to="/portfolio/$category"
                params={{ category: categorySlug(p.category) }}
                className="group relative block w-full overflow-hidden rounded-md bg-champagne/30"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  width={p.w}
                  height={p.h}
                  className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="absolute left-4 bottom-4 eyebrow !text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {p.category}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <SectionCTA to="/portfolio" label="View Full Portfolio" />
      </div>
    </section>
  );
}

/* ---------- Services preview ---------- */
export function ServicesPreview() {
  const items = SERVICES.slice(0, 6);
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">What I Do</span>
          <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance">
            A studio for <span className="italic font-serif">every</span> chapter
          </h2>
          <p className="mt-4 max-w-xl text-coffee">
            From intimate portraits to sweeping wedding films — a curated set of services shaped by craft.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-500 hover:shadow-luxury hover:-translate-y-1 block"
                >
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
                </Link>
              </motion.div>
            );
          })}
        </div>

        <SectionCTA to="/services" label="Explore All Services" />
      </div>
    </section>
  );
}

/* ---------- Testimonials preview ---------- */
import { Star, Quote } from "lucide-react";

const testimonialSample = [
  { name: "Anjali & Rohit", role: "Wedding, Udaipur",
    quote: "Fraz turned our three-day wedding into a film we relive every week. Every glance, every laugh — held perfectly." },
  { name: "Neha & Karan", role: "Pre-Wedding, Manali",
    quote: "Highly professional and endlessly creative. He made our pre-wedding shoot feel like a private editorial." },
  { name: "Pooja & Amit", role: "Wedding, Delhi",
    quote: "The best decision we made for our wedding. Simply breathtaking and deeply personal." },
];

export function TestimonialsPreview() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Kind Words</span>
          <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance">
            What clients <span className="italic font-serif">say</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonialSample.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-lg border border-border bg-card p-8 shadow-soft"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-champagne" strokeWidth={1} />
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 font-serif text-lg leading-relaxed text-chocolate">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="h-11 w-11 rounded-full bg-champagne grid place-items-center font-display text-lg text-chocolate">
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

        <SectionCTA to="/testimonials" label="Read All Stories" />
      </div>
    </section>
  );
}

/* ---------- FAQ preview ---------- */
const faqSample = [
  { q: "How far in advance should I book?", a: "For weddings, we recommend booking 4–8 months in advance. Portraits can typically be arranged within 2–4 weeks." },
  { q: "Do you travel for destination weddings?", a: "Yes — we regularly travel across India and internationally. Travel and accommodation are quoted transparently." },
  { q: "When will I receive my photographs?", a: "Sneak peeks within 48 hours. The full edited gallery within 4–6 weeks." },
];

export function FAQPreview() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Frequently Asked</span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl text-ink text-balance">
            Every <span className="italic font-serif">question</span>, answered
          </h2>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqSample.map((f) => (
            <div key={f.q} className="py-6">
              <p className="font-display text-xl md:text-2xl text-ink">{f.q}</p>
              <p className="mt-3 text-coffee leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <SectionCTA to="/faq" label="See All FAQs" />
      </div>
    </section>
  );
}

/* ---------- Contact preview ---------- */
export function ContactPreview() {
  return (
    <section className="bg-warm py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10 text-center">
        <span className="eyebrow">Get in Touch</span>
        <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance leading-[1.05]">
          Let's create something <span className="italic font-serif">beautiful</span>.
        </h2>
        <p className="mt-5 text-coffee max-w-md mx-auto">
          Whether it's a wedding, a portrait, or a story only you know how to tell — I'd love to hear about it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn-luxury">Contact Studio</Link>
          <Link to="/book" className="btn-ghost">Book Your Story</Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Packages preview (compact) ---------- */
export function PackagesPreview() {
  const compact = [
    { name: "Basic", price: "15,000" },
    { name: "Standard", price: "25,000", highlight: true },
    { name: "Premium", price: "40,000" },
  ];
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Packages & Pricing</span>
          <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance">
            Thoughtfully <span className="italic font-serif">crafted</span> collections
          </h2>
          <p className="mt-4 max-w-xl text-coffee">Every package can be tailored to suit your story, venue, and vision.</p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {compact.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl p-10 text-center ${
                p.highlight
                  ? "bg-ink text-ivory shadow-luxury lg:-translate-y-4 border border-gold/40"
                  : "bg-card text-ink border border-border shadow-soft"
              }`}
            >
              <p className={`eyebrow ${p.highlight ? "!text-champagne" : ""}`}>{p.name}</p>
              <p className="font-display mt-4 text-5xl md:text-6xl leading-none">
                <span className={p.highlight ? "text-champagne" : "text-coffee"}>₹</span>{p.price}
              </p>
              <p className={`mt-2 text-xs ${p.highlight ? "text-ivory/60" : "text-coffee/70"}`}>Starting from</p>
            </motion.div>
          ))}
        </div>
        <SectionCTA to="/packages" label="View Full Pricing" />
      </div>
    </section>
  );
}
