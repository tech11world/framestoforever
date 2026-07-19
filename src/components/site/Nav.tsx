import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "Packages", to: "/packages" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <Logo className={scrolled ? "h-10 w-auto md:h-12" : "h-12 w-auto md:h-16"} />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-chocolate/80 hover:text-ink transition-colors group data-[status=active]:text-ink"
              >
                {l.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px scale-x-0 group-hover:scale-x-100 group-data-[status=active]:scale-x-100 origin-left bg-gold transition-transform duration-500" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/book" className="hidden sm:inline-flex btn-luxury !py-3 !px-5 text-[10px]">
              Book Now
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-ink"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ivory overflow-y-auto"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <Logo className="h-12 w-auto" />
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
                <X className="h-6 w-6 text-ink" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="flex flex-col items-center justify-center gap-6 mt-12 px-6 pb-16"
            >
              {links.map((l) => (
                <motion.li
                  key={l.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-ink"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Link to="/book" onClick={() => setOpen(false)} className="btn-luxury mt-4">
                  Book Now
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
