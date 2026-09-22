import { Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowRight,
  AudioLines,
  Bell,
  BookOpen,
  Calendar,
  Hash,
  Inbox,
  ListChecks,
  MessageSquare,
  Phone,
  Reply,
  Sparkles,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import instagramLogo from "@/assets/tool-logos/instagram.svg.asset.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  leadChannels,
  solutions,
  type DemoRow,
  type MarkedHeading,
  type Solution,
  type SolutionIcon,
} from "@/lib/site-content";

const solutionIcons: Record<SolutionIcon, LucideIcon> = {
  Phone,
  AudioLines,
  Hash,
  Calendar,
  MessageSquare,
  ArrowLeftRight,
  Inbox,
  ListChecks,
  User,
  Sparkles,
  Wrench,
  BookOpen,
  Bell,
  Reply,
};

export function MarkedTitle({ heading }: { heading: MarkedHeading }) {
  return (
    <>
      {heading.before}
      <span className="mark mark-yellow">{heading.mark}</span>
      {heading.after}
    </>
  );
}

export function VoiceWaveform() {
  return (
    <div className="voice-wave" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <span className="wave-bar" style={{ "--i": i } as CSSProperties} key={i} />
      ))}
    </div>
  );
}

function FeatureIcon({ name, title }: { name: SolutionIcon; title?: string }) {
  if (title?.startsWith("Instagram"))
    return (
      <span className="solution-icon">
        <img src={instagramLogo.url} alt="" aria-hidden="true" />
      </span>
    );
  const Icon = solutionIcons[name];
  return (
    <span className="solution-icon">
      <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

function DemoRows({ rows, kind }: { rows: readonly DemoRow[]; kind: Solution["demo"]["kind"] }) {
  return (
    <div className={`demo-rows demo-${kind}`}>
      {rows.map((row, i) => (
        <div className={`demo-row ${row.tone ?? ""}`} key={`${row.title}-${i}`}>
          {row.meta && <span className="demo-meta">{row.meta}</span>}
          <span className="demo-dot" aria-hidden="true" />
          <span className="demo-row-copy">
            <b>{row.title}</b>
            {row.detail && <small>{row.detail}</small>}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SolutionDemo({
  solution,
  className = "",
}: {
  solution: Solution;
  className?: string;
}) {
  const { demo } = solution;
  return (
    <div className={`solution-demo ${className}`}>
      <header>
        <FeatureIcon name={demo.icon} />
        <div>
          <b>{demo.title}</b>
          <span>{demo.sublabel}</span>
        </div>
        <em>Illustrative</em>
      </header>
      {demo.source && (
        <div className="demo-source">
          <span>{demo.source.meta}</span>
          <p>{demo.source.text}</p>
          {solution.slug === "sales" && <VoiceWaveform />}
        </div>
      )}
      <DemoRows rows={demo.rows} kind={demo.kind} />
      {demo.footer && (
        <footer>{demo.footer === "Voice waveform" ? <VoiceWaveform /> : demo.footer}</footer>
      )}
    </div>
  );
}

export function SolutionTabs() {
  return (
    <Tabs defaultValue="operations" className="solution-tabs">
      <TabsList className="solution-tab-list" aria-label="AI systems">
        {solutions.map((solution) => (
          <TabsTrigger value={solution.slug} className="solution-tab" key={solution.slug}>
            <span>{solution.label}</span>
            <small>{solution.subtitle}</small>
          </TabsTrigger>
        ))}
      </TabsList>
      {solutions.map((solution) => (
        <TabsContent value={solution.slug} className="solution-tab-content" key={solution.slug}>
          <article className="solution-panel">
            <div className="solution-panel-intro">
              <p className="t-label">
                {solution.number} / {solution.label}
              </p>
              <h3>
                <MarkedTitle heading={solution.headline} />
              </h3>
              <p>{solution.lede}</p>
            </div>
            <SolutionDemo solution={solution} />
            <div className="solution-feature-list">
              {solution.features.map((feature) => (
                <div className="solution-feature" key={feature.title}>
                  <FeatureIcon name={feature.icon} title={feature.title} />
                  <div>
                    <b>{feature.title}</b>
                    <p>{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              className="btn btn-primary solution-panel-cta"
              to="/solutions/$slug"
              params={{ slug: solution.slug }}
            >
              Explore {solution.label} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </article>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function LeadChannelDemo() {
  return (
    <Tabs defaultValue="call" className="channel-tabs">
      <p className="t-label">Pick where the lead comes from</p>
      <TabsList className="channel-tab-list" aria-label="Lead source">
        {leadChannels.map((channel) => {
          const Icon = solutionIcons[channel.icon];
          return (
            <TabsTrigger value={channel.value} className="channel-tab" key={channel.value}>
              {channel.value === "instagram" ? (
                <img src={instagramLogo.url} alt="" aria-hidden="true" />
              ) : (
                <Icon size={16} aria-hidden="true" />
              )}
              <span>{channel.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {leadChannels.map((channel) => (
        <TabsContent value={channel.value} className="channel-tab-content" key={channel.value}>
          <div className="solution-demo lead-channel-card">
            <header>
              <FeatureIcon name={channel.icon} title={channel.label} />
              <div>
                <b>{channel.label} lead</b>
                <span>{channel.source}</span>
              </div>
              <em>Illustrative</em>
            </header>
            <div className="demo-source">
              <span>{channel.source}</span>
              <p>{channel.message}</p>
              {channel.value === "call" && <VoiceWaveform />}
            </div>
            <DemoRows rows={channel.rows} kind="timeline" />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function FeatureGrid({
  features,
}: {
  features: readonly { icon: SolutionIcon; title: string; text: string }[];
}) {
  return (
    <div className="system-feature-grid">
      {features.map((feature) => (
        <article key={feature.title}>
          <FeatureIcon name={feature.icon} title={feature.title} />
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </div>
  );
}
