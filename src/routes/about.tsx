import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Camera, Award, Heart, MapPin, Aperture, Film, Sparkles, Clock } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CTA } from "@/components/site/CTA";
import fraz from "@/assets/fraz.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Fraz Saifi — Frames to Forever" },
      { name: "description", content: "The story, philosophy, and craft behind Frames to Forever — a luxury photography studio founded by Fraz Saifi in 2020." },
      { property: "og:title", content: "About Fraz Saifi — Frames to Forever" },
      { property: "og:description", content: "Founder story, journey, and craft behind Frames to Forever." },
    ],
  }),
  component: AboutPage,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const stats = [
  { label: "Years of experience", value: 5, suffix: "+" },
  { label: "Weddings captured",   value: 180, suffix: "+" },
  { label: "Happy clients",       value: 240, suffix: "+" },
  { label: "Events covered",      value: 320, suffix: "+" },
];

const journey = [
  { year: "2020", title: "The First Frame", body: "Turned a lifelong passion into an independent creative career, shooting first commissions for family and friends." },
  { year: "2021", title: "Studio Founded", body: "Launched Frames to Forever with a focus on wedding and editorial photography across North India." },
  { year: "2022", title: "First Destination Wedding", body: "Photographed a three-day celebration in Udaipur — a turning point in cinematic storytelling." },
  { year: "2024", title: "Editorial Expansion", body: "Added commercial and fashion work, collaborating with brands and creative directors." },
  { year: "2026", title: "A New Chapter", body: "A refreshed studio identity, a global waitlist, and a growing team of storytellers." },
];

const philosophy = [
  { icon: Heart, title: "Emotion over posing", body: "The best frames come from presence, not performance. I direct softly and observe deeply." },
  { icon: Aperture, title: "Light as language", body: "Every shoot is planned around the quality of light — the season, the hour, the room." },
  { icon: Film, title: "Editorial, always", body: "Warm, filmic tones. Considered composition. Photographs that feel like they were made to last." },
  { icon: Sparkles, title: "Personal, never templated", body: "No two stories are alike. Every wedding, portrait, and campaign is treated as its own body of work." },
];

const gear = [
  { label: "Cameras", items: ["Sony A7R V", "Sony A7 IV", "Canon R5 (backup)"] },
  { label: "Lenses",  items: ["24mm f/1.4 GM", "35mm f/1.4 GM", "50mm f/1.2 GM", "85mm f/1.4 GM", "70-200mm f/2.8 GM"] },
  { label: "Lighting",items: ["Profoto B10 Plus", "Godox AD200 Pro", "Natural + practical light"] },
  { label: "Motion",  items: ["DJI Ronin 4D", "DJI Mavic 3 Cine"] },
];

const achievements = [
  { icon: Award,   title: "WPJA Featured Photographer", year: "2024" },
  { icon: Award,   title: "Wedding Sutra 'Editor's Pick'", year: "2023" },
  { icon: Camera,  title: "Featured in WedMeGood Real Weddings", year: "2023" },
  { icon: MapPin,  title: "Photographed across 40+ cities", year: "2020 — Present" },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About the Studio"
        title="A photographer, a"
        italic="storyteller."
        intro="Frames to Forever is the personal studio of Fraz Saifi — dedicated to photographing the moments that make a life."
      />

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
              <img src={fraz} alt="Fraz Saifi" width={900} height={1100} className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-4 md:-right-8 rotate-3 bg-ivory shadow-soft px-6 py-4 border border-border">
              <p className="font-script text-3xl text-coffee leading-none">Fraz</p>
              <p className="eyebrow mt-1">Founder · Photographer</p>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <span className="eyebrow">The Founder</span>
            <h2 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl text-ink text-balance leading-[1.05]">
              Turning moments into <span className="italic font-serif">timeless</span> stories.
            </h2>
            <div className="mt-8 space-y-5 text-coffee leading-relaxed max-w-2xl">
              <p>
                I'm <span className="text-ink font-medium">Fraz Saifi</span>, a professional photographer and visual
                storyteller with a passion for capturing moments that feel real, timeless, and unforgettable.
              </p>
              <p>
                My journey began in <span className="text-ink">2020</span>, when I turned my passion for photography
                into an independent creative career. Since then, I have been managing my own bookings, working on
                freelance projects, and collaborating with clients to bring their unique visions to life.
              </p>
              <p>
                I believe photography is not just about creating beautiful images — it's about capturing emotions,
                connections, and stories that last beyond the moment. Every project is approached with a fresh
                perspective, creative direction, and close attention to detail.
              </p>
              <p>
                From the first conversation to the final delivery, my focus is on creating a personalized and
                seamless experience while delivering visuals that truly reflect your story.
              </p>
              <p className="font-serif italic text-chocolate">Your moments. Your story. Captured timelessly.</p>
              <p className="font-script text-3xl text-coffee">— Fraz Saifi</p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-border pt-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl md:text-5xl text-ink">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="eyebrow mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="text-center">
            <span className="eyebrow">The Journey</span>
            <h2 className="font-display mt-4 text-4xl md:text-5xl text-ink">
              A story <span className="italic font-serif">unfolding</span>
            </h2>
          </div>
          <ol className="mt-16 relative border-l border-border ml-4 md:ml-6 space-y-12">
            {journey.map((j, i) => (
              <motion.li
                key={j.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="pl-8 md:pl-12 relative"
              >
                <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-ivory" />
                <p className="eyebrow">{j.year}</p>
                <h3 className="font-display text-2xl md:text-3xl text-ink mt-2">{j.title}</h3>
                <p className="mt-3 text-coffee leading-relaxed max-w-xl">{j.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center">
            <span className="eyebrow">Philosophy</span>
            <h2 className="font-display mt-4 text-4xl md:text-5xl text-ink">
              How we <span className="italic font-serif">work</span>
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="rounded-lg border border-border bg-card p-8"
              >
                <div className="h-12 w-12 rounded-full bg-cream border border-border grid place-items-center">
                  <p.icon className="h-5 w-5 text-chocolate" strokeWidth={1.4} />
                </div>
                <h3 className="font-display text-xl text-ink mt-6">{p.title}</h3>
                <p className="mt-3 text-sm text-coffee leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Recognition</span>
            <h2 className="font-display mt-4 text-4xl md:text-5xl text-ink">
              Selected <span className="italic font-serif">achievements</span>
            </h2>
            <p className="mt-5 text-coffee max-w-md">A few of the milestones and features that have shaped the studio's journey.</p>
          </div>
          <ul className="space-y-4">
            {achievements.map((a) => (
              <li key={a.title} className="flex items-start gap-5 border-b border-border pb-5">
                <div className="h-11 w-11 rounded-full bg-cream border border-border grid place-items-center shrink-0">
                  <a.icon className="h-4 w-4 text-chocolate" strokeWidth={1.4} />
                </div>
                <div>
                  <p className="font-display text-lg text-ink">{a.title}</p>
                  <p className="text-xs text-coffee tracking-widest uppercase mt-1">{a.year}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-warm py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center">
            <span className="eyebrow">Behind the Craft</span>
            <h2 className="font-display mt-4 text-4xl md:text-5xl text-ink">
              The <span className="italic font-serif">equipment</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-coffee">Tools chosen for reliability, sharpness, and a distinctly cinematic look.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {gear.map((g) => (
              <div key={g.label} className="rounded-lg border border-border bg-card p-8">
                <p className="eyebrow">{g.label}</p>
                <ul className="mt-5 space-y-2 text-sm text-coffee">
                  {g.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center">
            <span className="eyebrow">Behind The Scenes</span>
            <h2 className="font-display mt-4 text-4xl md:text-5xl text-ink">
              A day in the <span className="italic font-serif">studio</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1035, 1040, 1050, 1062, 1074, 1080].map((id, i) => (
              <motion.img
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                src={`https://picsum.photos/id/${id}/900/700`}
                alt="Behind the scenes"
                loading="lazy"
                className="w-full h-64 md:h-72 object-cover rounded-md shadow-soft"
              />
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-3 text-coffee text-sm">
            <Clock className="h-4 w-4" strokeWidth={1.4} />
            <span>Available across India · Selective international dates</span>
          </div>
          <div className="mt-8 flex justify-center">
            <Link to="/book" className="btn-luxury">Book Your Story</Link>
          </div>
        </div>
      </section>

      <CTA />
    </PageShell>
  );
}
