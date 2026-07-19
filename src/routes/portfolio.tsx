import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Portfolio } from "@/components/site/Portfolio";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Frames to Forever" },
      { name: "description", content: "An editorial gallery of weddings, portraits, engagements, and more — captured across India by Fraz Saifi." },
      { property: "og:title", content: "Portfolio — Frames to Forever" },
      { property: "og:description", content: "Explore galleries across weddings, portraits, engagements and editorial work." },
    ],
  }),
  component: PortfolioIndex,
});

function PortfolioIndex() {
  return (
    <PageShell>
      <Portfolio showHeader={false} />
      <CTA />
    </PageShell>
  );
}
