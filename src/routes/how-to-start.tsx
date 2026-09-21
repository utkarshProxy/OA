import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA, PageFrame, PageHero, SectionIntro } from "@/components/site";

export const Route = createFileRoute("/how-to-start")({
  head: () => ({ meta: [
    { title: "How to Start with AI — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { name: "description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:title", content: "How to Start with AI — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { property: "og:description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: StartPage,
});

const offers = [
  ["AI Opportunity Audit", "Find the opportunity", "Best when you know AI could help but aren't sure where.", "Workflow analysis|Opportunity ranking|Impact estimate|Complexity estimate|Recommended first project"],
  ["AI Quick Win", "Fastest way to begin", "One clearly defined workflow solving one expensive or repetitive problem.", "Design|Implementation|Integration|Testing|Documentation|Handover"],
  ["Complete AI System", "End-to-end improvement", "Several connected workflows improving one complete business function.", "AI + automation|Integrations|Human approvals|Exception handling|Monitoring"],
] as const;
const process = [["01", "Discover", "Understand how the work actually happens today. Not how the SOP says it happens."], ["02", "Design", "Decide what AI should do, what automation should do, and where people should approve."], ["03", "Build & test", "Build against realistic examples—including the awkward failure cases."], ["04", "Launch", "Deploy carefully with documentation, training, monitoring, and human judgment where it matters."]];

function StartPage() { return <PageFrame><PageHero eyebrow="How to start" title="Start small. Expand when the value is clear." copy="No enormous transformation programme. Pick the right first workflow, make it useful, and earn the next step." />
  <section className="offers section-dark"><div className="wrap"><SectionIntro dark eyebrow="Ways to work together" title="Choose the smallest sensible first step." /> <div className="offer-grid">{offers.map(([label,title,copy,list], i) => <article className={i===1 ? "featured" : ""} key={label}><p className="t-label">{label}</p><h3>{title}</h3><p>{copy}</p><ul>{list.split("|").map(x=><li key={x}>↳ {x}</li>)}</ul><a href="/contact">{i===0?"Start with the audit":i===1?"Choose a quick win":"Build a complete system"} ↗</a></article>)}</div></div></section>
  <section className="process section-light"><div className="wrap"><SectionIntro eyebrow="The process" title="From “we should automate that” to working in your business." /><div className="process-grid">{process.map(([n,t,c])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div><p className="process-note">AI should improve the work — not create another tool your team has to manage.</p></div></section><FinalCTA /></PageFrame>; }