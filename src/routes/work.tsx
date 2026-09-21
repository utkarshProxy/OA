import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA, PageFrame, PageHero } from "@/components/site";
import { workExamples } from "@/lib/site-content";

export const Route = createFileRoute("/work")({
  head: () => ({ meta: [
    { title: "Example AI Systems — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { name: "description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:title", content: "Example AI Systems — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { property: "og:description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: WorkPage,
});
function WorkPage(){return <PageFrame><PageHero eyebrow="Work" title="Show the system. Skip the theatre." copy="These are example systems, not invented case studies. Each shows how a real workflow can change without pretending people disappear." />
  <section className="work-list section-light"><div className="wrap">{workExamples.map((item,i)=><article className="work-example" key={item.title}><header><p className="t-label">Example system / 0{i+1}</p><h2>{item.title}</h2><p>{item.problem}</p></header><div className="work-stages"><Stage label="Manual workflow" items={item.before}/><Stage label="System installed" items={item.installed} accent/><Stage label="New workflow" items={item.after}/></div></article>)}</div></section><FinalCTA title="What repetitive work is slowing your team down?" /></PageFrame>}
function Stage({label,items,accent=false}:{label:string;items:readonly string[];accent?:boolean}){return <div className={accent?"stage accent":"stage"}><p className="t-label">{label}</p>{items.map((x,i)=><p key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</p>)}</div>}