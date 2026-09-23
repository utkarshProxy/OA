import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { BOOKING_URL } from "@/lib/site-content";

const navItems = [
  ["Solutions", "/solutions"],
  ["How to start", "/how-to-start"],
  ["Work", "/work"],
  ["Tools", "/tools"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap site-nav">
        <Link to="/" className="brand" aria-label="OBOU Automations home" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="" width="34" height="34" />
          <span>OBOU Automations</span>
        </Link>
        <button className="icon-button menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`nav-panel ${open ? "is-open" : ""}`}>
          <nav className="nav-links" aria-label="Primary navigation">
            {navItems.map(([label, to]) => <Link key={to} to={to} activeProps={{ className: "is-active" }} onClick={() => setOpen(false)}>{label}</Link>)}
          </nav>
          <Link to="/" hash="finder" className="nav-cta" onClick={() => setOpen(false)}>Find your best AI opportunity <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer section-dark">
      <div className="wrap footer-grid">
        <div><p className="brand footer-brand"><img src="/logo.svg" alt="" width="34" height="34" />OBOU Automations</p><p className="footer-line">Practical AI. Better work.</p></div>
        <div><p className="t-label">Explore</p>{navItems.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</div>
        <div><p className="t-label">Start</p><Link to="/" hash="finder">Find your opportunity ↗</Link><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book a conversation ↗</a></div>
      </div>
      <div className="wrap footer-bottom"><span>© 2026 OBOU Automations</span><span>Start with one workflow.</span></div>
    </footer>
  );
}

export function PageFrame({ children }: { children: ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></>; }

export function Eyebrow({ children }: { children: ReactNode }) { return <p className="t-label eyebrow"><span />{children}</p>; }

export function SectionIntro({ eyebrow, title, copy, dark = false }: { eyebrow: string; title: string; copy?: string; dark?: boolean }) {
  return <div className="section-intro"><Eyebrow>{eyebrow}</Eyebrow><h2 className="t-h2-sm">{title}</h2>{copy && <p className={`section-copy ${dark ? "on-dark" : ""}`}>{copy}</p>}</div>;
}

export function PrimaryLink({ to = "/", children }: { to?: "/" | "/contact" | "/solutions" | "/tools" | "/work" | "/how-to-start"; children: ReactNode }) {
  return <Link to={to} hash={to === "/" ? "finder" : undefined} className="btn btn-primary">{children}<ArrowUpRight size={15} /></Link>;
}

export function Flow({ steps, compact = false }: { steps: readonly string[]; compact?: boolean }) {
  return <div className={`flow ${compact ? "flow-compact" : ""}`} role="list">{steps.map((step, i) => <div className="flow-item" role="listitem" key={step}><span className="flow-index">{String(i + 1).padStart(2, "0")}</span><span>{step}</span>{i < steps.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}</div>)}</div>;
}

export function PageHero({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children?: ReactNode }) {
  return <section className="page-hero section-light"><div className="wrap"><Eyebrow>{eyebrow}</Eyebrow><h1 className="page-title">{title}</h1><div className="page-hero-bottom"><p>{copy}</p>{children}</div></div></section>;
}

export function FinalCTA({ title = "Start with one valuable workflow." }: { title?: string }) {
  return <section className="final-cta"><div className="wrap final-cta-inner"><p className="t-label">A practical first step</p><h2>{title}</h2><PrimaryLink>Find your best AI opportunity</PrimaryLink></div></section>;
}