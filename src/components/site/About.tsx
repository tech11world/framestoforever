import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import fraz from "@/assets/fraz.jpg";

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

export function About() {
  return (
    <section id="about" className="relative bg-warm py-24 md:py-32 grain">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-24">
        {/* Portrait */}
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

        {/* Copy */}
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
              I’m <span className="text-ink font-medium">Fraz Saifi</span>, a professional photographer
              and visual storyteller with a passion for capturing moments that feel real, timeless, and unforgettable.
            </p>
            <p>
              My journey began in <span className="text-ink">2020</span>, when I turned my passion for photography
              into an independent creative career. Since then, I have been managing my own bookings, working on
              freelance projects, and collaborating with clients to bring their unique visions to life.
            </p>
            <p>
              I believe photography is not just about creating beautiful images — it’s about capturing emotions,
              connections, and stories that last beyond the moment. Every project is approached with a fresh
              perspective, creative direction, and close attention to detail.
            </p>
            <p>
              From the first conversation to the final delivery, my focus is on creating a personalized and
              seamless experience while delivering visuals that truly reflect your story.
            </p>
            <p className="font-serif italic text-chocolate">
              Your moments. Your story. Captured timelessly.
            </p>
            <p className="font-script text-3xl text-coffee">— Fraz Saifi</p>
          </div>

          {/* Stats */}
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
  );
}
