import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Portfolio } from "@/components/site/Portfolio";
import { CTA } from "@/components/site/CTA";
import { categoryFromSlug, CATEGORIES, categorySlug } from "@/lib/photos";

export const Route = createFileRoute("/portfolio/$category")({
  loader: ({ params }) => {
    const category = categoryFromSlug(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.category} Photography — Frames to Forever` : "Portfolio — Frames to Forever";
    const desc = loaderData
      ? `An editorial ${loaderData.category.toLowerCase()} photography gallery by Fraz Saifi — fifteen curated frames.`
      : "Photography galleries by Fraz Saifi.";
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
      <PageHeader eyebrow="Unavailable" title="This gallery couldn't load." />
      <div className="text-center py-16">
        <button onClick={reset} className="btn-luxury">Try again</button>
      </div>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <PageHeader eyebrow="404" title="Gallery not" italic="found" intro="This category doesn't exist yet — explore the full portfolio instead." />
      <div className="text-center pb-24">
        <Link to="/portfolio" className="btn-luxury">Back to Portfolio</Link>
      </div>
    </PageShell>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [category]);

  return (
    <PageShell>
      <section className="bg-cream pt-8 md:pt-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="overflow-x-auto -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0">
            <div className="flex min-w-max md:min-w-0 gap-2 md:justify-center md:flex-wrap">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  to="/portfolio/$category"
                  params={{ category: categorySlug(c) }}
                  className={`px-4 py-2 rounded-full text-[11px] tracking-[0.24em] uppercase transition-all ${
                    category === c
                      ? "bg-ink text-ivory shadow-soft"
                      : "bg-transparent text-chocolate/70 border border-border hover:border-ink hover:text-ink"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Portfolio lockedCategory={category} showFilters={false} showHeader={false} />

      <CTA />
    </PageShell>
  );
}
