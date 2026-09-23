import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Ban } from "lucide-react";
import {
  FeatureGrid,
  LeadChannelDemo,
  MarkedTitle,
  SolutionDemo,
  VoiceWaveform,
} from "@/components/solution-showcase";
import { Eyebrow, Flow, PageFrame } from "@/components/site";
import { BOOKING_URL, getSolution } from "@/lib/site-content";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return solution;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "AI system"} — OBOU Automations` },
      {
        name: "description",
        content: loaderData?.page.hero.lede ?? "A practical AI system built around your business.",
      },
    ],
  }),
  component: SolutionSystemPage,
});

function SolutionSystemPage() {
  const solution = Route.useLoaderData();
  const page = solution.page;
  return (
    <PageFrame>
      <section className="system-hero section-light">
        <div className="wrap system-hero-grid">
          <div className="system-hero-copy">
            <p className="t-label">
              System {solution.number} · {solution.label}
              {solution.slug === "sales" ? " · Lead-to-Booking" : ""}
            </p>
            <h1>
              <MarkedTitle heading={page.hero} />
            </h1>
            <p>{page.hero.lede}</p>
            <div className="system-hero-actions">
              <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noreferrer">
                Talk to us <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a className="text-link" href="#what">
                See what it does
              </a>
            </div>
          </div>
          {solution.slug === "sales" ? (
            <LeadChannelDemo />
          ) : (
            <SolutionDemo solution={solution} className="system-hero-demo" />
          )}
        </div>
      </section>

      <section className="system-facts section-light" aria-label="System facts">
        <div className="wrap system-fact-grid">
          {page.facts.map((fact) => (
            <div key={fact.value}>
              <b>{fact.value}</b>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="what" className="system-section section-light">
        <div className="wrap">
          <SystemHeading
            eyebrow="01 · What it does"
            title={page.deepDive.title}
            copy={page.deepDive.intro}
          />
          {solution.slug === "sales" && (
            <div className="voice-agent-band">
              <div>
                <p className="t-label">Incoming call · live</p>
                <h3>A natural voice, listening and responding.</h3>
              </div>
              <VoiceWaveform />
            </div>
          )}
          <FeatureGrid features={page.deepDive.features} />
        </div>
      </section>

      <section className="system-section system-problem section-light">
        <div className="wrap">
          <SystemHeading eyebrow="02 · The problem" title={page.problem.title} />
          <div className="problem-grid">
            {page.problem.cards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <ul>
                  {card.points.map((point) => (
                    <li key={point}>
                      <Ban size={17} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="problem-conclusion">{page.problem.conclusion}</p>
        </div>
      </section>

      <section className="system-section system-how section-dark">
        <div className="wrap">
          <SystemHeading eyebrow="03 · How it works" title={page.howTitle} dark />
          <Flow steps={page.steps.map((step) => step.title)} />
          <div className="system-step-notes">
            {page.steps.map((step, index) => (
              <p key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step.text}
              </p>
            ))}
          </div>
          <p className="system-how-copy">{page.howCopy}</p>
        </div>
      </section>

      <section className="system-section section-light">
        <div className="wrap">
          <div className="system-heading">
            <Eyebrow>04 · You stay in charge</Eyebrow>
            <h2>
              <MarkedTitle heading={page.control.heading} />
            </h2>
          </div>
          <FeatureGrid features={page.control.items} />
        </div>
      </section>

      <section className="system-section system-guardrails section-light">
        <div className="wrap">
          <SystemHeading
            eyebrow="05 · What we won't build"
            title="Three things we say no to, on purpose."
          />
          <div className="guardrail-grid">
            {page.guardrails.map((item) => (
              <article key={item.title}>
                <Ban size={26} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="system-cta">
        <div className="wrap">
          <p className="t-label">Get started</p>
          <h2>{page.cta.title}</h2>
          <p>{page.cta.text}</p>
          {"note" in page.cta && page.cta.note && <small>{page.cta.note}</small>}
          <div>
            <a className="btn btn-secondary" href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book a call <ArrowRight size={15} aria-hidden="true" />
            </a>
            <Link className="btn btn-secondary" to="/solutions">
              See other systems
            </Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function SystemHeading({
  eyebrow,
  title,
  copy,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  dark?: boolean;
}) {
  return (
    <div className="system-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p className={dark ? "on-dark" : ""}>{copy}</p>}
    </div>
  );
}
