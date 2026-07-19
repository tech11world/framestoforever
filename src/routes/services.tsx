import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Services } from "@/components/site/Services";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Frames to Forever" },
      { name: "description", content: "Wedding photography, cinematic films, portraits, commercial and more — a curated set of services by Fraz Saifi." },
      { property: "og:title", content: "Services — Frames to Forever" },
      { property: "og:description", content: "A curated set of photography services shaped by craft." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        eyebrow="Services"
        title="A studio for every"
        italic="chapter."
        intro="From intimate portraits to sweeping wedding films — every service is built around your story."
      />
      <Services showHeader={false} />
      <CTA />
    </PageShell>
  ),
});
