import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageFrame, PageHero } from "@/components/site";
import { BOOKING_URL } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Find Your Best AI Opportunity — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { name: "description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:title", content: "Find Your Best AI Opportunity — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { property: "og:description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: ContactPage,
});
function ContactPage(){return <PageFrame><PageHero eyebrow="Start a conversation" title="What work should your team stop doing by hand?" copy="Tell us where the friction is. We’ll help you work out whether AI is useful, what the first system could look like, and what should stay human." />
  <section className="contact-section section-light"><div className="wrap contact-grid"><form className="contact-form" onSubmit={e=>e.preventDefault()}><label>Name<input required placeholder="Your name"/></label><label>Work email<input required type="email" placeholder="you@company.com"/></label><label>Company<input required placeholder="Company name"/></label><label>Where does work get stuck?<textarea rows={5} placeholder="A repetitive task, slow handoff, missed follow-up, or anything else..."/></label><button className="btn btn-primary" type="submit">Send the workflow <ArrowUpRight size={15}/></button></form><aside><p className="t-label">Prefer to talk?</p><h2>Book a straightforward conversation.</h2><p>No technical preparation needed. Bring one process that feels slower or more manual than it should.</p><a className="btn btn-secondary" href={BOOKING_URL} target="_blank" rel="noreferrer">Choose a time <ArrowUpRight size={15}/></a></aside></div></section></PageFrame>}