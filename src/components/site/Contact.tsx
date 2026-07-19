import { Phone, Mail, MessageCircle, Instagram, Facebook, Youtube, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const items = [
  { icon: Phone,         label: "Phone",     value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail,          label: "Email",     value: "hello@framestoforever.in", href: "mailto:hello@framestoforever.in" },
  { icon: MessageCircle, label: "WhatsApp",  value: "Chat with Fraz", href: "https://wa.me/919876543210" },
  { icon: Instagram,     label: "Instagram", value: "@framestoforever", href: "https://instagram.com" },
  { icon: Facebook,      label: "Facebook",  value: "Frames to Forever", href: "https://facebook.com" },
  { icon: Youtube,       label: "YouTube",   value: "Frames to Forever", href: "https://youtube.com" },
];

export function Contact() {
  return (
    <section id="contact" className="bg-warm py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow">Get in Touch</span>
          <h2 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance leading-[1.05]">
            Let’s create something <span className="italic font-serif">beautiful</span>.
          </h2>
          <p className="mt-5 text-coffee max-w-md">
            Whether it’s a wedding, a portrait, or a story only you know how to tell — I’d love to hear about it.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="group flex items-center gap-4 rounded-lg border border-border bg-card px-5 py-4 hover:shadow-soft hover:-translate-y-0.5 transition-all"
              >
                <div className="h-10 w-10 rounded-full bg-cream grid place-items-center group-hover:bg-ink group-hover:text-ivory transition-colors">
                  <it.icon className="h-4 w-4" strokeWidth={1.4} />
                </div>
                <div className="min-w-0">
                  <p className="eyebrow">{it.label}</p>
                  <p className="text-ink text-sm truncate">{it.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 text-coffee">
            <MapPin className="h-5 w-5 mt-0.5 text-chocolate" strokeWidth={1.4} />
            <p>Studio · New Delhi, India · Available worldwide</p>
          </div>

          <Link to="/book" className="btn-luxury mt-10">Book Your Story</Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-2xl overflow-hidden border border-border shadow-luxury min-h-[420px] bg-cream"
        >
          <iframe
            title="Studio location"
            src="https://www.google.com/maps?q=New+Delhi,India&output=embed"
            className="absolute inset-0 h-full w-full grayscale-[30%] contrast-[.95]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
