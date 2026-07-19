import {
  Camera, Film, Heart, Gem, Cake, Baby, Building2, Sparkles,
  Package, Plane, ShoppingBag, type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  long: string;
  inclusions: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "wedding-photography",
    icon: Heart,
    title: "Wedding Photography",
    desc: "Every ritual, glance, and celebration — captured with cinematic intent.",
    long: "A full-day, editorial approach to your wedding — quiet observation of the moments most easily missed, and considered direction where it matters. Delivered as a timeless gallery you'll return to for generations.",
    inclusions: ["Full-day coverage", "Lead photographer + second shooter", "500+ hand-edited frames", "Private online gallery", "Optional heirloom album"],
  },
  {
    slug: "cinematic-wedding-films",
    icon: Film,
    title: "Cinematic Wedding Films",
    desc: "Story-driven films edited to feel like memories in motion.",
    long: "Documentary-style wedding films with a cinematic edit — the vows, the laughter, the room in golden light — cut to music that carries the emotion of the day.",
    inclusions: ["3–5 minute highlight film", "Full ceremony edit", "Cinematic color grade", "4K delivery"],
  },
  {
    slug: "pre-wedding",
    icon: Sparkles,
    title: "Pre Wedding",
    desc: "Locations and light chosen to reflect the beginning of your story.",
    long: "A curated pre-wedding experience — location scouting, styling notes, and unhurried direction so the frames feel like you, not a template.",
    inclusions: ["Half or full-day shoot", "Location consultation", "150+ edited photos", "Optional short film"],
  },
  {
    slug: "engagement",
    icon: Gem,
    title: "Engagement",
    desc: "Intimate coverage of the moment two lives promise to become one.",
    long: "Warm, editorial coverage of ring exchange, family portraits, and the quiet in-between moments.",
    inclusions: ["Up to 4 hours coverage", "200+ edited photos", "Family & couple portraits", "Fast preview delivery"],
  },
  {
    slug: "birthday",
    icon: Cake,
    title: "Birthday",
    desc: "Warm, candid frames that hold the joy of the day forever.",
    long: "From intimate at-home celebrations to grand parties — photography that captures the room, the details, and the little joys.",
    inclusions: ["2–4 hours coverage", "100+ edited photos", "Details + candids", "Fast delivery"],
  },
  {
    slug: "baby-maternity",
    icon: Baby,
    title: "Baby & Maternity",
    desc: "Soft, tender photographs celebrating the earliest chapters.",
    long: "Studio or at-home sessions with gentle direction, natural light, and a calm pace made for growing families.",
    inclusions: ["1–2 hour session", "80+ edited photos", "Wardrobe guidance", "Family portraits included"],
  },
  {
    slug: "corporate",
    icon: Building2,
    title: "Corporate",
    desc: "Editorial-quality imagery for founders, teams, and brand events.",
    long: "Portraits, team photography, and event coverage designed for websites, decks, and press features.",
    inclusions: ["On-location coverage", "Editorial post-production", "Full commercial license", "Same-week previews"],
  },
  {
    slug: "fashion",
    icon: Camera,
    title: "Fashion",
    desc: "Editorial direction with careful lighting and mood control.",
    long: "Look-books, editorial stories, and campaign photography with a distinctive tonal palette.",
    inclusions: ["Creative direction", "Studio or on-location", "Editorial retouching", "High-res delivery"],
  },
  {
    slug: "commercial",
    icon: ShoppingBag,
    title: "Commercial",
    desc: "Campaign photography built around your product and audience.",
    long: "Brand-forward commercial photography with attention to storytelling, styling, and post-production.",
    inclusions: ["Concepting & moodboards", "Full production", "Retouching + color", "Commercial usage rights"],
  },
  {
    slug: "drone-shoot",
    icon: Plane,
    title: "Drone Shoot",
    desc: "Elevated perspectives — grand venues, landscapes, cinematic wides.",
    long: "Aerial coverage for weddings, venues, and campaigns — captured with certified pilots and cinema-grade drones.",
    inclusions: ["4K/6K aerial capture", "Cinematic edit", "Stills + motion", "Licensed pilots"],
  },
  {
    slug: "product-photography",
    icon: Package,
    title: "Product Photography",
    desc: "Considered still-life work for e-commerce, catalogs, and PR.",
    long: "Studio product photography with clean, editorial styling — designed to convert on your site and stand out in press.",
    inclusions: ["Studio setup", "Multiple angles", "Retouching", "Web-ready delivery"],
  },
];

export function serviceBySlug(slug: string): Service | null {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}
