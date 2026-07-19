import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowDown, Play } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const reveal: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 + i * 0.12 },
    }),
  };

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[720px] overflow-hidden bg-ink">
      {/* Background image with parallax + ken burns */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={hero}
          alt="Luxury wedding couple in golden light"
          className="h-full w-full object-cover animate-ken-burns"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
      </motion.div>

      {/* Floating decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-24 right-16 h-40 w-40 rounded-full bg-gold/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-40 left-16 h-52 w-52 rounded-full bg-champagne/25 blur-3xl animate-float-slow" style={{ animationDelay: "3s" }}/>
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <motion.p
            variants={reveal} initial="hidden" animate="show" custom={0}
            className="eyebrow text-ivory/80"
          >
            Frames to Forever · Est. 2020
          </motion.p>

          <motion.h1
            variants={reveal} initial="hidden" animate="show" custom={1}
            className="font-display mt-6 max-w-4xl text-balance text-5xl leading-[1.02] text-ivory sm:text-6xl md:text-7xl lg:text-[6.5rem]"
          >
            Capturing moments
            <br />
            <span className="italic font-serif text-champagne/95">that last</span>{" "}
            <span className="font-script text-gold-soft text-6xl md:text-8xl lg:text-9xl leading-none">forever</span>
          </motion.h1>

          <motion.p
            variants={reveal} initial="hidden" animate="show" custom={2}
            className="mt-8 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg"
          >
            Photography is more than pictures — it is preserving emotions, connections,
            stories, and memories that never fade.
          </motion.p>

          <motion.div
            variants={reveal} initial="hidden" animate="show" custom={3}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/book" className="btn-luxury !bg-ivory !text-ink hover:!bg-champagne">
              Book Now
            </Link>
            <Link to="/portfolio" className="btn-ghost !text-ivory !border-ivory/40 hover:!bg-ivory/10">
              <Play className="h-3.5 w-3.5" />
              View Gallery
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/60"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
