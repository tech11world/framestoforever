import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Send } from "lucide-react";
import { Logo } from "./Logo";

const explore = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "Packages", to: "/packages" },
  { label: "Contact", to: "/contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-ivory pt-20 pb-8">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="bg-ivory rounded-xl p-4 inline-block">
            <Logo className="h-16 w-auto" />
          </div>
          <p className="mt-6 text-ivory/70 max-w-sm leading-relaxed">
            Capturing moments, creating memories that last a lifetime. A luxury photography studio by Fraz Saifi.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full border border-ivory/20 grid place-items-center hover:bg-gold hover:text-ink hover:border-gold transition-colors">
                <Icon className="h-4 w-4" strokeWidth={1.4} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow !text-champagne">Explore</p>
          <ul className="mt-5 space-y-3 text-ivory/75 text-sm">
            {explore.map((l) => (
              <li key={l.label}><Link to={l.to} className="hover:text-gold transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow !text-champagne">Studio</p>
          <ul className="mt-5 space-y-3 text-ivory/75 text-sm">
            <li>New Delhi, India</li>
            <li><a href="mailto:hello@framestoforever.in" className="hover:text-gold">hello@framestoforever.in</a></li>
            <li><a href="tel:+919876543210" className="hover:text-gold">+91 98765 43210</a></li>
            <li>Available worldwide</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow !text-champagne">Newsletter</p>
          <p className="mt-5 text-sm text-ivory/70">
            Behind-the-scenes stories and rare frames — straight to your inbox.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="mt-4 flex items-center border-b border-ivory/25 focus-within:border-gold transition-colors"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent py-3 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
            />
            <button className="p-2 text-ivory/70 hover:text-gold transition-colors" aria-label="Subscribe">
              <Send className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:px-10 border-t border-ivory/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
        <p>© {year} Frames to Forever · Crafted for Fraz Saifi</p>
        <p className="tracking-[0.3em] uppercase">Capturing moments · Creating memories</p>
      </div>
    </footer>
  );
}
