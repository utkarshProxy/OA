import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, Bell, DollarSign, FileBarChart, Share2, Users } from "lucide-react";
import { OpportunityFinder } from "@/components/opportunity-finder";
import { BorderBeam } from "@/components/ui/border-beam";
import { Eyebrow, FinalCTA, PageFrame, PrimaryLink, SectionIntro } from "@/components/site";
import { SolutionTabs } from "@/components/solution-showcase";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" },
    { name: "description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:title", content: "OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" },
    { property: "og:description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: Index,
});

function Index() { return <PageFrame><Hero/><ToolTicker/><Story/><Solutions/><WorkflowCompare/><Audit/><Ways/><Finder/><FinalCTA/></PageFrame>; }

const toolLogos = [
  ["Gmail", "/tool-logos/gmail.svg"], ["Trello", "/tool-logos/trello.svg"], ["Google Drive", "/tool-logos/google-drive.svg"],
  ["Microsoft Outlook", "/tool-logos/outlook.svg"], ["Facebook", "/tool-logos/facebook.svg"], ["Instagram", "/tool-logos/instagram.svg"],
  ["Meta Business", "/tool-logos/meta.svg"], ["Muse AI", "/tool-logos/muse.svg"], ["Google Calendar", "/tool-logos/google-calendar.svg"],
  ["Claude", "/tool-logos/claude.svg"], ["ChatGPT", "/tool-logos/chatgpt.svg"], ["n8n", "/tool-logos/n8n.svg"],
  ["Salesforce", "/tool-logos/salesforce.svg"], ["HubSpot", "/tool-logos/hubspot.svg"], ["Canva", "/tool-logos/canva.svg"],
  ["QuickBooks", "/tool-logos/quickbooks.svg"],
] as const;
function ToolTicker(){return <section className="tool-ticker section-light" aria-label={`Agents that talk to your tools: ${toolLogos.map(([name])=>name).join(", ")}`}><p className="t-label ticker-label">Agents that talk to your tools</p><div className="ticker-window"><div className="ticker-track" aria-hidden="true">{[...toolLogos,...toolLogos].map(([name,src],i)=><span className="ticker-item" key={`${name}-${i}`}><img src={src} alt="" /></span>)}</div></div></section>}

function Hero(){return <section className="home-hero section-light"><HeroRippleField/><div className="wrap hero-inner"><div><h1><span className="mark mark-yellow">AI Automation</span> that learns and adapts to your business.<br/>Deploy <span className="mark mark-coral">AI Agents</span> in your painstaking workflows 👉 GROWTH</h1><p className="hero-copy">We implement most advanced AI models into your existing processes.</p><p className="hero-points"><span>7 Day Builds.</span><span>Fixed Price, not an hourly rate.</span><span>Completely Custom</span></p><div className="hero-actions"><PrimaryLink to="/contact">TALK TO US</PrimaryLink><Link className="text-link" to="/" hash="solutions">See Solutions <ArrowRight size={15}/></Link></div></div></div></section>;}

/**
 * Hero ASCII ripple field (OpenClaw-style).
 *
 * Concentric elliptical rings of glyphs pulse outward from an origin point.
 * Rings are brightest at their crest and thin along the flanks, so they read
 * as arcs. Each ring takes one brand colour, and colours travel outward with
 * the rings. A faint dot lattice fills the rest of the hero.
 *
 * Desktop: rings radiate from the right. Mobile (<680px): rings rise from the
 * bottom edge into the open space under the CTA so they never sit behind text.
 * ~24fps, DPR capped at 1.5, paused off-screen / in hidden tabs, and a single
 * static frame under prefers-reduced-motion.
 */
function HeroRippleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const RAMP = " .:-=+xX#8@"; // light -> dense
    const PALETTE = [
      { rgb: "232,104,90", a: 1 }, // coral
      { rgb: "17,17,19", a: 0.55 }, // ink, toned down
      { rgb: "150,168,0", a: 1 }, // deep lime (brand lime is too pale on paper)
      { rgb: "139,135,129", a: 0.9 }, // warm grey
    ];
    const DOT = "17,17,19";
    const FRAME_MS = 42;
    const STATIC_T = 6;
    const DESKTOP_ORIGIN = { x: 0.74, y: 0.2, sx: 1, sy: 0.55 };
    const MOBILE_ORIGIN = { x: 0.5, y: 1.04, sx: 1, sy: 0.75 };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | null = null;
    let width = 0;
    let height = 0;
    let lastFrame = 0;
    let isVisible = true;
    const t0 = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const compact = width < 680;
      const cellW = compact ? 6.2 : 7.2;
      const cellH = compact ? 10 : 11.5;
      const cols = Math.ceil(width / cellW) + 1;
      const rows = Math.ceil(height / cellH) + 1;
      ctx.font = `600 ${compact ? 8.5 : 10}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const o = compact ? MOBILE_ORIGIN : DESKTOP_ORIGIN;
      const ox = o.x * width;
      const oy = o.y * height;
      const scale = compact ? height * 0.75 : Math.max(width, height * 1.4);
      const spacing = 0.085; // distance between rings
      const thick = 0.012; // ring half-thickness
      const speed = 0.018; // outward drift per second
      const inner = 0.07; // calm hole around the origin
      const reach = 0.62; // rings fade out past this

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;
          const dx = (x - ox) / scale / o.sx;
          const dy = ((y - oy) / scale / o.sy) * 0.55;
          const d = Math.sqrt(dx * dx + dy * dy);

          let v = 0;
          let tone = PALETTE[0]!;
          if (d > inner && d < reach) {
            const p = (d - t * speed) / spacing;
            const f = p - Math.floor(p);
            const off = Math.min(f, 1 - f) * spacing;
            const ring = Math.exp(-(off * off) / (2 * thick * thick));
            const ang = Math.atan2(y - oy, x - ox);
            const crest = 0.22 + 0.78 * Math.pow(Math.abs(Math.sin(ang)), 1.4);
            const shimmer = 0.75 + 0.25 * Math.sin(c * 0.9 + r * 1.7 + t * 1.3);
            const fadeIn = Math.min(1, (d - inner) / 0.06);
            const fadeOut = Math.max(0, 1 - Math.pow((d - inner) / (reach - inner), 1.6));
            v = ring * crest * shimmer * fadeIn * fadeOut;
            const n = PALETTE.length;
            tone = PALETTE[((Math.round(p) % n) + n) % n] ?? tone;
          }

          if (v > 0.06) {
            const idx = Math.min(RAMP.length - 1, 1 + Math.floor(v * (RAMP.length - 1)));
            ctx.fillStyle = `rgba(${tone.rgb},${((0.3 + v * 0.7) * tone.a).toFixed(3)})`;
            ctx.fillText(RAMP.charAt(idx), x, y);
          } else if (c % 6 === 0 && r % 3 === 0) {
            ctx.fillStyle = `rgba(${DOT},0.13)`;
            ctx.fillText("\u00b7", x, y);
          }
        }
      }
    };

    const currentT = () => (motionQuery.matches ? STATIC_T : STATIC_T + (performance.now() - t0) / 1000);

    const stop = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
    };
    const animate = (time: number) => {
      animationFrame = null;
      if (!isVisible || document.hidden || motionQuery.matches) return;
      if (time - lastFrame >= FRAME_MS) {
        lastFrame = time;
        draw(currentT());
      }
      animationFrame = requestAnimationFrame(animate);
    };
    const startAnimation = () => {
      if (animationFrame === null && isVisible && !document.hidden && !motionQuery.matches) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    const redraw = () => {
      resize();
      draw(currentT());
      startAnimation();
    };
    const onVisibilityChange = () => (document.hidden ? stop() : startAnimation());
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      isVisible = entry.isIntersecting;
      if (isVisible) startAnimation(); else stop();
    });
    const resizeObserver = new ResizeObserver(redraw);

    redraw();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", redraw);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", redraw);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-ripple-field" aria-hidden="true" />;
}

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

const today=["New inquiry arrives","Someone notices it","Research across four tabs","Check the CRM","Write a reply","Update the CRM","Create a follow-up","Remember to send it"];
const withAI=["Inquiry captured","AI qualifies the lead","Research gathered","CRM context added","AI drafts a response","Human reviews & approves","CRM updated automatically","Follow-up scheduled"];
function WorkflowCompare(){return <section className="compare section-dark"><div className="wrap"><div className="compare-heading"><div><Eyebrow>Before / after</Eyebrow><h2>What changes when AI handles the busywork?</h2></div><p>One new inquiry, two ways to handle it. The routine steps move faster; your team keeps the decision.</p></div><div className="compare-grid" aria-label="Comparison of a manual and AI-assisted lead workflow"><div className="compare-column compare-column--today"><header><span>01 / MANUAL</span><h3>Today</h3><p>Eight touches before follow-up.</p></header>{today.map((step,i)=><div className="compare-step" key={step}><span>{String(i+1).padStart(2,"0")}</span><b>{step}</b></div>)}</div><div className="compare-column compare-column--ai"><BorderBeam size={40} duration={5} colorFrom="#68a900" colorTo="#c3ef00" borderWidth={2}/><header><span>02 / AI-ASSISTED</span><h3>With AI</h3><p>Prepared automatically. Approved by a person.</p></header>{withAI.map((step,i)=><div className={`compare-step${i===5?" compare-step--human":""}`} key={step}><span>{String(i+1).padStart(2,"0")}</span><b>{step}</b>{i===5&&<em>Human decision</em>}</div>)}</div></div></div></section>}

function Audit(){const rows=[["Lead follow-up","High","Low"],["Proposal creation","High","Medium"],["Internal knowledge","Medium","Low"],["Weekly reporting","Medium","Low"]];return <section className="audit section-light"><div className="wrap audit-grid"><div><SectionIntro eyebrow="Start smart" title="AI Opportunity Audit" copy="Find where time disappears, where customers wait, and which automation is most likely to create measurable value."/><PrimaryLink>Find my best AI opportunity</PrimaryLink></div><div className="audit-report"><header><img src="/logo.svg" alt=""/><div><b>Opportunity report</b><span>Priority map / 01</span></div></header><div className="audit-summary"><span><b>12</b> workflows reviewed</span><span><b>3</b> quick wins</span><span><b>18h</b> estimated weekly saving</span></div><div className="audit-table"><p><b>Opportunity</b><b>Value</b><b>Complexity</b></p>{rows.map(r=><p key={r[0]}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span></p>)}</div><footer>Recommended tools · Priority · Value · Longer-term opportunities</footer></div></div></section>}

function Ways(){const cards=[["AI Opportunity Audit","Find the opportunity","Best when you know AI could help but aren't sure where."],["AI Quick Win","Fastest way to begin","One clearly defined workflow solving one expensive or repetitive problem."],["Complete AI System","End-to-end improvement","Several connected workflows improving one complete business function."]];return <section className="ways section-dark"><div className="wrap"><SectionIntro dark eyebrow="Ways to work together" title="Start small. Expand when the value is clear."/><div className="way-grid">{cards.map((c,i)=><article className={i===1?"featured":""} key={c[0]}><p className="t-label">{c[0]}</p><h3>{c[1]}</h3><p>{c[2]}</p><Link to="/how-to-start">Learn more <ArrowRight size={14}/></Link></article>)}</div></div></section>}

function Finder(){return <section id="finder" className="finder-section section-light"><div className="wrap"><SectionIntro eyebrow="Interactive tool" title="What should you automate first?" copy="Seven quick questions and one optional one. A practical opportunity map. No jargon required."/><OpportunityFinder/></div></section>}
router;
};
