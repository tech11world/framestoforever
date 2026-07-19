import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Contact } from "@/components/site/Contact";
import { InstagramFeed } from "@/components/site/InstagramFeed";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Frames to Forever" },
      { name: "description", content: "Get in touch with Fraz Saifi at Frames to Forever — for weddings, portraits, and editorial commissions." },
      { property: "og:title", content: "Contact — Frames to Forever" },
      { property: "og:description", content: "Phone, email, WhatsApp, and studio details." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Let's begin your"
        italic="story."
        intro="Reach out via any channel you prefer — I usually reply the same day."
      />
      <Contact />
      <InstagramFeed />
    </PageShell>
  ),
});
