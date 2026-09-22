import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FinalCTA, Flow, PageFrame, PageHero } from "@/components/site";
import { solutions } from "@/lib/site-content";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Practical AI Systems — OBOU Automations" },
      {
        name: "description",
        content:
          "Five practical AI systems for operations, sales, marketing, knowledge, and custom workflows.",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <PageFrame>
      <PageHero
        eyebrow="Solutions"
        title="Less mechanical work. More useful work."
        copy="Five focused systems for work that is repetitive, slow, frequently missed, or trapped between tools."
      />
      <section className="solution-detail-list section-light">
        <div className="wrap">
          {solutions.map((solution) => (
            <article className="solution-detail" id={solution.slug} key={solution.slug}>
              <div className="solution-heading">
                <p className="t-label">
                  {solution.number} / {solution.label}
                </p>
                <h2>{solution.title}</h2>
                <p>{solution.summary}</p>
                <Link className="text-link" to="/solutions/$slug" params={{ slug: solution.slug }}>
                  Explore this system <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <div>
                {solution.flow.length > 0 && <Flow steps={solution.flow} compact />}
                <div className="tag-list">
                  {solution.systems.map((system) => (
                    <span key={system}>{system}</span>
                  ))}
                </div>
              </div>
              <span className="solution-watermark">{solution.number}</span>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA />
    </PageFrame>
  );
}
