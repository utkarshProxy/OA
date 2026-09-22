import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bell, DollarSign, FileBarChart, Share2, Users } from "lucide-react";
import { OpportunityFinder } from "@/components/opportunity-finder";
import { Eyebrow, FinalCTA, PageFrame, PrimaryLink, SectionIntro } from "@/components/site";
import { SolutionTabs } from "@/components/solution-showcase";
import canvaLogo from "@/assets/tool-logos/canva.svg.asset.json";
import chatgptLogo from "@/assets/tool-logos/chatgpt.svg.asset.json";
import claudeLogo from "@/assets/tool-logos/claude.svg.asset.json";
import facebookLogo from "@/assets/tool-logos/facebook.svg.asset.json";
import gmailLogo from "@/assets/tool-logos/gmail.svg.asset.json";
import calendarLogo from "@/assets/tool-logos/google-calendar.svg.asset.json";
import driveLogo from "@/assets/tool-logos/google-drive.svg.asset.json";
import hubspotLogo from "@/assets/tool-logos/hubspot.svg.asset.json";
import instagramLogo from "@/assets/tool-logos/instagram.svg.asset.json";
import metaLogo from "@/assets/tool-logos/meta.svg.asset.json";
import museLogo from "@/assets/tool-logos/muse.svg.asset.json";
import n8nLogo from "@/assets/tool-logos/n8n.svg.asset.json";
import outlookLogo from "@/assets/tool-logos/outlook.svg.asset.json";
import quickbooksLogo from "@/assets/tool-logos/quickbooks.svg.asset.json";
import salesforceLogo from "@/assets/tool-logos/salesforce.svg.asset.json";
import trelloLogo from "@/assets/tool-logos/trello.svg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" },
    { name: "description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:title", content: "OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" },
    { property: "og:description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: Index,
});

function Index() { return <PageFrame><Hero/><ToolTicker/><Story/><Solutions/><WorkflowCompare/><QuickWins/><Audit/><Ways/><Process/><HumanLoop/><Finder/><FinalCTA/></PageFrame>; }

const toolLogos = [
  ["Gmail", gmailLogo.url], ["Trello", trelloLogo.url], ["Google Drive", driveLogo.url],
  ["Microsoft Outlook", outlookLogo.url], ["Facebook", facebookLogo.url], ["Instagram", instagramLogo.url],
  ["Meta Business", metaLogo.url], ["Muse AI", museLogo.url], ["Google Calendar", calendarLogo.url],
  ["Claude", claudeLogo.url], ["ChatGPT", chatgptLogo.url], ["n8n", n8nLogo.url],
  ["Salesforce", salesforceLogo.url], ["HubSpot", hubspotLogo.url], ["Canva", canvaLogo.url],
  ["QuickBooks", quickbooksLogo.url],
] as const;
function ToolTicker(){return <section className="tool-ticker section-light" aria-label={`Agents that talk to your tools: ${toolLogos.map(([name])=>name).join(", ")}`}><p className="t-label ticker-label">Agents that talk to your tools</p><div className="ticker-window"><div className="ticker-track" aria-hidden="true">{[...toolLogos,...toolLogos].map(([name,src],i)=><span className="ticker-item" key={`${name}-${i}`}><img src={src} alt="" /></span>)}</div></div></section>}

function Hero(){return <section className="home-hero section-light"><HeroField/><div className="wrap hero-inner"><div><h1><span className="mark mark-yellow">AI Automation</span> that learns and adapts to your business.<br/>Deploy <span className="mark mark-coral">AI Agents</span> in your painstaking workflows 👉 GROWTH</h1><p className="hero-copy">We do practical AI implementation and integration into existing processes to boos efficiency and productivity, so your team can create more, and spend less time on repetitive work.</p><div className="hero-actions"><PrimaryLink>TALK TO US</PrimaryLink><Link className="text-link" to="/" hash="solutions">See what we can do. <ArrowRight size={15}/></Link></div></div></div></section>}

function HeroField(){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d");if(!ctx)return;let id=0,t=0;const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;const styles=getComputedStyle(document.documentElement);const colors=[styles.getPropertyValue("--accent-primary"),styles.getPropertyValue("--accent-secondary"),styles.getPropertyValue("--ink"),styles.getPropertyValue("--muted")];const draw=()=>{const d=devicePixelRatio||1,w=c.clientWidth,h=c.clientHeight;c.width=w*d;c.height=h*d;ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w,h);ctx.font="11px monospace";const chars=["·","+","×","#"];for(let y=20;y<h;y+=20)for(let x=20;x<w;x+=20){const v=(Math.sin(x*.018+t)+Math.cos(y*.022-t*.8)+2)/4;if(v>.42){ctx.globalAlpha=.08+v*.35;ctx.fillStyle=colors[(x/20+y/20|0)%colors.length]??styles.getPropertyValue("--ink");ctx.fillText(chars[Math.min(3,Math.floor(v*4))]??"·",x,y)}}t+=.025;if(!reduce)id=requestAnimationFrame(draw)};draw();return()=>cancelAnimationFrame(id)},[]);return <canvas ref={ref} className="hero-field" aria-hidden="true"/>}

const automationTasks = [
  { title: "AI-powered notifications", subtitle: "Smart alerts for critical events", icon: Bell },
  { title: "Automated payroll", subtitle: "Error-free salary processing", icon: DollarSign },
  { title: "Employee insights", subtitle: "Track productivity in real time", icon: Users },
  { title: "Social campaigns", subtitle: "AI-curated content suggestions", icon: Share2 },
  { title: "AI-driven reports", subtitle: "Weekly insights and performance", icon: FileBarChart },
] as const;

function AutomationTaskList(){return <div className="automation-run">{automationTasks.map(({title,subtitle,icon:Icon},i)=><div className="automation-task" key={title}><span className="automation-index">{String(i+1).padStart(2,"0")}</span><span className="automation-task-icon"><Icon size={19} strokeWidth={1.7}/></span><span className="automation-task-copy"><b>{title}</b><small>{subtitle}</small></span><span className="automation-status">Ready</span></div>)}</div>}

function Story(){return <section className="story-strip section-dark"><div className="wrap automation-showcase"><div className="automation-demo"><div className="automation-demo-label"><span className="t-label">Live workflow queue</span><span><i/>5 systems active</span></div><div className="automation-window" aria-label="Examples of business workflows OBOU can automate"><div className="automation-track"><AutomationTaskList/><div aria-hidden="true"><AutomationTaskList/></div></div><div className="automation-fade automation-fade-top"/><div className="automation-fade automation-fade-bottom"/></div><div className="automation-demo-footer"><span>OBOU / AUTOMATION LAYER</span><b>RUNNING</b></div></div><div className="automation-copy"><Eyebrow>Workflow automation</Eyebrow><h2>Automate repetitive tasks. <span>Keep your team focused on the decisions that matter.</span></h2><p>We streamline day-to-day operations with dependable AI automation—from payroll and reporting to employee insights and smart notifications. Reduce human error, save time, and scale without adding more admin.</p><div className="automation-tags"><span>AI task agents</span><span>100+ automations</span><span>Built to scale</span></div><div className="automation-proof"><b>One connected system</b><span>that works across the tools your team already uses.</span></div></div></div></section>}

function Solutions(){return <section id="solutions" className="home-solutions section-light"><div className="wrap"><SectionIntro eyebrow="What we install" title="AI systems for the work that eats your week." copy="Pick the one that hurts most. Each system is built around your tools, your rules and a human who makes the final call."/><SolutionTabs/></div></section>}

const today=["New inquiry","Someone notices it","Research in four tabs","Check CRM","Write reply","Update CRM","Create follow-up","Hopefully remember later"];
const obou=["New inquiry","AI researches","AI qualifies","AI prepares response","Human reviews","System responds","CRM updates","Follow-up scheduled"];
function WorkflowCompare(){const [mode,setMode]=useState<"today"|"obou">("today");const steps=mode==="today"?today:obou;return <section className="compare section-dark"><div className="wrap compare-layout"><div><SectionIntro dark eyebrow="Before / after" title="What actually changes when you automate a workflow?"/><div className="segmented"><button className={mode==="today"?"active":""} onClick={()=>setMode("today")}>Today</button><button className={mode==="obou"?"active":""} onClick={()=>setMode("obou")}>With OBOU</button></div><p className="compare-note">AI doesn't have to replace the person.<br/><strong>It removes the mechanical work surrounding the decision.</strong></p></div><div className={`compare-flow ${mode}`}>{steps.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b>{mode==="obou"&&i===4&&<em>Human decision</em>}</div>)}</div></div></section>}

function QuickWins(){return <section className="quick-wins section-light"><div className="wrap quick-grid"><div><Eyebrow>Start small</Eyebrow><h2 className="t-h2">AI<br/><span className="highlight-yellow">Quick Wins</span></h2><p>Launch one useful workflow solving one repetitive or expensive problem.</p><div className="tag-list">{["AI phone receptionist","Proposal builder","Inbox triage","Meeting-to-action","SOP assistant","Sales research","Lead follow-up"].map(x=><span key={x}>{x}</span>)}</div></div><div className="one-system"><span>One problem</span><i>→</i><span>One working system</span></div></div></section>}

function Audit(){const rows=[["Lead follow-up","High","Low"],["Proposal creation","High","Medium"],["Internal knowledge","Medium","Low"],["Weekly reporting","Medium","Low"]];return <section className="audit section-light"><div className="wrap audit-grid"><div><SectionIntro eyebrow="Start smart" title="AI Opportunity Audit" copy="Find where time disappears, where customers wait, and which automation is most likely to create measurable value."/><PrimaryLink>Find my best AI opportunity</PrimaryLink></div><div className="audit-report"><header><img src="/logo.svg" alt=""/><div><b>Opportunity report</b><span>Priority map / 01</span></div></header><div className="audit-summary"><span><b>12</b> workflows reviewed</span><span><b>3</b> quick wins</span><span><b>18h</b> estimated weekly saving</span></div><div className="audit-table"><p><b>Opportunity</b><b>Value</b><b>Complexity</b></p>{rows.map(r=><p key={r[0]}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span></p>)}</div><footer>Recommended tools · Priority · Value · Longer-term opportunities</footer></div></div></section>}

function Ways(){const cards=[["AI Opportunity Audit","Find the opportunity","Best when you know AI could help but aren't sure where."],["AI Quick Win","Fastest way to begin","One clearly defined workflow solving one expensive or repetitive problem."],["Complete AI System","End-to-end improvement","Several connected workflows improving one complete business function."]];return <section className="ways section-dark"><div className="wrap"><SectionIntro dark eyebrow="Ways to work together" title="Start small. Expand when the value is clear."/><div className="way-grid">{cards.map((c,i)=><article className={i===1?"featured":""} key={c[0]}><p className="t-label">{c[0]}</p><h3>{c[1]}</h3><p>{c[2]}</p><Link to="/how-to-start">Learn more <ArrowRight size={14}/></Link></article>)}</div></div></section>}

function Process(){return <section className="process-home section-light"><div className="wrap"><SectionIntro eyebrow="How OBOU works" title="From “we should automate that” to working in your business."/><div className="process-line">{[["01","Discover","See the real work"],["02","Design","Choose AI, automation, and approvals"],["03","Build & test","Include the failure cases"],["04","Launch","Train, monitor, improve"]].map(x=><div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></div></section>}

function HumanLoop(){return <section className="loop-banner"><div className="wrap"><Eyebrow>Human in the loop</Eyebrow><div className="loop-steps"><b>AI does the prep</b><i>↓</i><b>Human makes the call</b><i>↓</i><b>System does the admin</b></div><p>Judgment and relationships stay human. Research, drafting, routing, and admin do not need to.</p></div></section>}
function Finder(){return <section className="finder-section section-dark"><div className="wrap"><SectionIntro dark eyebrow="Interactive tool" title="What should you automate first?" copy="Six quick questions. A practical mock opportunity map. No jargon required."/><OpportunityFinder/></div></section>}
