import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import {
  AboutPreview, PortfolioPreview, ServicesPreview, PackagesPreview,
  TestimonialsPreview, FAQPreview, ContactPreview,
} from "@/components/site/Previews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frames to Forever — Luxury Wedding & Portrait Photography by Fraz Saifi" },
      { name: "description", content: "A luxury photography studio by Fraz Saifi. Timeless wedding, portrait, and editorial imagery — capturing moments that last forever." },
      { property: "og:title", content: "Frames to Forever — Photography by Fraz Saifi" },
      { property: "og:description", content: "Timeless wedding, portrait and editorial photography." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="bg-ivory">
      <Nav />
      <Hero />
      <AboutPreview />
      <PortfolioPreview />
      <ServicesPreview />
      <PackagesPreview />
      <TestimonialsPreview />
      <FAQPreview />
      <ContactPreview />
      <CTA />
      <Footer />
    </main>
  );
}
