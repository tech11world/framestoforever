import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Camera } from "lucide-react";

export function CTA() {
  return (
    <section className="relative bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-ink text-ivory grain shadow-luxury px-8 py-16 md:px-20 md:py-24 text-center"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gold blur-3xl animate-float-slow" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-champagne blur-3xl animate-float-slow" style={{ animationDelay: "4s" }} />
          </div>
          <div className="relative">
            <Camera className="mx-auto h-8 w-8 text-gold" strokeWidth={1.2} />
            <p className="eyebrow mt-6 !text-champagne">Let’s Create</p>
            <h2 className="font-display mt-4 text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-balance">
              Something <span className="font-script text-gold text-6xl md:text-8xl">beautiful</span>
              <br/> together.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-ivory/70">
              Reserve your date, share your vision, and let’s begin the story your family will keep forever.
            </p>
            <Link to="/book" className="btn-luxury mt-10 !bg-gold !text-ink hover:!bg-champagne">
              Book Your Story
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
