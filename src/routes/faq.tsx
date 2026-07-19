import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Frames to Forever" },
      { name: "description", content: "Answers to the most common questions about booking, delivery, travel, and pricing." },
      { property: "og:title", content: "FAQ — Frames to Forever" },
      { property: "og:description", content: "Every question, answered." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        eyebrow="Frequently Asked"
        title="Every question,"
        italic="answered."
        intro="If your question isn't here, reach out — I usually reply within a day."
      />
      <FAQ />
      <CTA />
    </PageShell>
  ),
});
