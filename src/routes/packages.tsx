import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Packages } from "@/components/site/Packages";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages & Pricing — Frames to Forever" },
      { name: "description", content: "Thoughtfully crafted photography packages by Fraz Saifi — every collection can be tailored to your story." },
      { property: "og:title", content: "Packages & Pricing — Frames to Forever" },
      { property: "og:description", content: "Wedding, portrait, and editorial photography packages." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        eyebrow="Investment"
        title="Thoughtfully crafted"
        italic="collections."
        intro="Starting prices for our most-requested collections — every package can be tailored to your day, venue, and vision."
      />
      <Packages />
      <FAQ />
      <CTA />
    </PageShell>
  ),
});
