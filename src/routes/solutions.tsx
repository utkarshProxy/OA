import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA, Flow, PageFrame, PageHero } from "@/components/site";
import { solutions } from "@/lib/site-content";

export const Route = createFileRoute("/solutions")({
  head: () => ({ meta: [
    { title: "Practical AI Systems — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" },
    { name: "description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:title", content: "Practical AI Systems — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" },
    { property: "og:description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: SolutionsPage,
});

function SolutionsPage() { return <PageFrame><PageHero eyebrow="Solutions" title="Less mechanical work. More useful work." copy="We install focused systems where work is repetitive, slow, frequently missed, or trapped between tools." />
  <section className="solution-detail-list section-light"><div className="wrap">{solutions.map((s, i) => <article className="solution-detail" id={s.slug} key={s.slug}><div className="solution-heading"><p className="t-label">{s.number} / {s.label}</p><h2>{s.title}</h2><p>{s.summary}</p></div><div><Flow steps={s.flow} compact /><div className="tag-list">{s.systems.map(x => <span key={x}>{x}</span>)}</div></div><span className="solution-watermark">0{i + 1}</span></article>)}</div></section><FinalCTA /></PageFrame>; }