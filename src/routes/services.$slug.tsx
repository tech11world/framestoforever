import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowLeft } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CTA } from "@/components/site/CTA";
import { serviceBySlug, SERVICES } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.service.title} — Frames to Forever` : "Service — Frames to Forever";
    const desc = loaderData?.service.desc ?? "Photography services by Frames to Forever.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  errorComponent: ({ reset }) => (
    <PageShell>
      <PageHeader eyebrow="Unavailable" title="This service couldn't load." />
      <div className="text-center py-16">
        <button onClick={reset} className="btn-luxury">Try again</button>
      </div>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <PageHeader eyebrow="404" title="Service not" italic="found" />
      <div className="text-center pb-24">
        <Link to="/services" className="btn-luxury">All Services</Link>
      </div>
    </PageShell>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <PageShell>
      <section className="bg-warm border-b border-border">
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-cream border border-border grid place-items-center">
            <Icon className="h-6 w-6 text-chocolate" strokeWidth={1.4} />
          </div>
          <span className="eyebrow mt-6 block">Service</span>
          <h1 className="font-display mt-4 text-4xl md:text-6xl text-ink text-balance leading-[1.05]">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-coffee">{service.desc}</p>
        </div>
      </section>

      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-10 grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <span className="eyebrow">Overview</span>
            <p className="mt-6 font-serif text-xl leading-relaxed text-chocolate">{service.long}</p>
            <div className="mt-10">
              <Link to="/book" className="btn-luxury">Enquire About {service.title}</Link>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-8">
              <p className="eyebrow">What's Included</p>
              <ul className="mt-6 space-y-4 text-sm text-coffee">
                {service.inclusions.map((f: string) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="h-4 w-4 mt-0.5 text-chocolate shrink-0" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center justify-between mb-10">
            <p className="eyebrow">Also Explore</p>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm text-chocolate hover:text-ink transition-colors">
              <ArrowLeft className="h-4 w-4" /> All Services
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group rounded-lg border border-border bg-card p-8 hover:shadow-luxury hover:-translate-y-1 transition-all"
                >
                  <div className="h-11 w-11 rounded-full bg-cream border border-border grid place-items-center group-hover:bg-ink group-hover:text-ivory group-hover:border-ink transition-all">
                    <SIcon className="h-4 w-4" strokeWidth={1.4} />
                  </div>
                  <h3 className="font-display text-xl text-ink mt-5">{s.title}</h3>
                  <p className="mt-2 text-sm text-coffee">{s.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </PageShell>
  );
}
