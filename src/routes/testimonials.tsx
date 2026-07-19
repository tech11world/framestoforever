import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Frames to Forever" },
      { name: "description", content: "Kind words from couples, families, and brands photographed by Fraz Saifi." },
      { property: "og:title", content: "Testimonials — Frames to Forever" },
      { property: "og:description", content: "Stories and words from the families we've photographed." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        eyebrow="Kind Words"
        title="Stories from the"
        italic="families we've served."
        intro="A few of the notes that reach the studio each month — the reason we keep doing this."
      />
      <Testimonials />
      <CTA />
    </PageShell>
  ),
});
