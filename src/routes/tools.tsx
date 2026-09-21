import { createFileRoute } from "@tanstack/react-router";
import { OpportunityFinder } from "@/components/opportunity-finder";
import { PageFrame, PageHero, SectionIntro } from "@/components/site";

export const Route = createFileRoute("/tools")({
  head: () => ({ meta: [
    { title: "Practical AI Tools — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { name: "description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:title", content: "Practical AI Tools — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { property: "og:description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: ToolsPage,
});
const tools=["Workflow Cost Calculator","AI Readiness Assessment","AI Stack Recommender","Process Audit"];
function ToolsPage(){return <PageFrame><PageHero eyebrow="Tools" title="Useful before the first workshop." copy="Small tools for finding repetitive work, estimating its cost, and choosing a sensible place to start." />
  <section className="finder-section section-dark"><div className="wrap"><SectionIntro dark eyebrow="Live tool" title="What should you automate first?" copy="Answer six quick questions. Get a practical starting point—not a forty-page transformation strategy."/><OpportunityFinder/></div></section>
  <section className="tool-library section-light"><div className="wrap"><p className="t-label">Tool library</p><div className="tool-rows"><div><span>01</span><h3>Automation Opportunity Finder</h3><b>Live</b></div>{tools.map((x,i)=><div key={x}><span>0{i+2}</span><h3>{x}</h3><b>Coming soon</b></div>)}</div></div></section></PageFrame>}