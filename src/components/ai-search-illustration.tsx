import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Globe2,
  MessageCircle,
  Sparkles,
  Check,
  ArrowLeft,
} from "lucide-react";

const examples = [
  {
    label: "Plumber",
    question: "Who can help fix a leaking tap near me?",
    service: "Plumbing repairs",
    description: "For leaking taps and plumbing repairs, consider",
    reason:
      "Their service page explains the repairs they handle, the areas they cover, and how to book.",
    page: "Local plumbing repairs",
    copy: "Help with leaking taps, blocked drains, and everyday plumbing problems.",
    action: "Request a repair",
    path: "/plumbing-repairs",
  },
  {
    label: "Clinic",
    question: "Which local physio can help with a sports injury?",
    service: "Sports physiotherapy",
    description: "For sports physiotherapy, consider",
    reason:
      "Their treatment page describes the service, the practitioners, and how to arrange a first appointment.",
    page: "Sports injury physiotherapy",
    copy: "Find out about the team, available treatments, and your first appointment.",
    action: "Book an appointment",
    path: "/sports-physiotherapy",
  },
  {
    label: "Consultant",
    question: "Who helps small businesses automate their admin?",
    service: "Business automation",
    description: "For small-business automation, consider",
    reason:
      "Their website explains the workflows they build, with project examples and a clear process for getting started.",
    page: "Less admin. More time back.",
    copy: "Practical automation for the repetitive work in your business.",
    action: "Discuss your workflow",
    path: "/business-automation",
  },
] as const;

export function AiSearchIllustration() {
  const [selected, setSelected] = useState(0);
  const [website, setWebsite] = useState(false);
  const example = examples[selected]!;
  return (
    <div className="mkt-demo aeo-story">
      <header>
        <span className="aeo-header-icon">
          <Sparkles size={16} aria-hidden="true" />
        </span>
        <span className="t-label">From an AI answer to your website</span>
        <small>Illustrative example</small>
      </header>
      <div className="aeo-example-picker">
        <span>Try a business</span>
        <div aria-label="Example business type">
          {examples.map((item, i) => (
            <button
              type="button"
              key={item.label}
              aria-pressed={selected === i}
              onClick={() => {
                setSelected(i);
                setWebsite(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="aeo-story-body">
        <div className="aeo-step-label">
          <span>01</span> A customer asks AI
        </div>
        <div className="aeo-prompt">
          <MessageCircle size={18} aria-hidden="true" />
          <p>{example.question}</p>
        </div>
        <div className="aeo-connector" aria-hidden="true">
          <ArrowDown size={17} />
        </div>
        <div className="aeo-step-label">
          <span>02</span> Your business appears in the answer
        </div>
        <div className="aeo-answer">
          <div className="aeo-answer-label">
            <Sparkles size={16} aria-hidden="true" />
            <span>Example AI answer</span>
          </div>
          <p>
            {example.description} <strong>Your business</strong>
            <sup>[1]</sup>.
          </p>
          <p className="aeo-reason">{example.reason}</p>
          <div className="aeo-citation">
            <Globe2 size={13} aria-hidden="true" />
            <span>1 · yourwebsite.com{example.path}</span>
          </div>
        </div>
        <div className="aeo-connector" aria-hidden="true">
          <ArrowDown size={17} />
        </div>
        <div className="aeo-step-label">
          <span>03</span> They discover what you offer
        </div>
        <div className="aeo-website" aria-live="polite">
          {website ? (
            <>
              <div className="aeo-site-browser">
                <Globe2 size={12} aria-hidden="true" />
                yourwebsite.com{example.path}
              </div>
              <div className="aeo-site-content">
                <span className="t-label">Your business / Sample service page</span>
                <h4>{example.page}</h4>
                <p>{example.copy}</p>
                <span className="aeo-sample-action">
                  <Check size={14} aria-hidden="true" />
                  {example.action}
                </span>
              </div>
              <button type="button" className="aeo-close-preview" onClick={() => setWebsite(false)}>
                <ArrowLeft size={13} aria-hidden="true" />
                Back to the website link
              </button>
            </>
          ) : (
            <button type="button" className="aeo-website-link" onClick={() => setWebsite(true)}>
              <span className="aeo-site-icon">
                <Globe2 size={22} aria-hidden="true" />
              </span>
              <span>
                <b>Your business</b>
                <small>{example.service} · yourwebsite.com</small>
                <em>Preview the visit</em>
              </span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <footer>
        An illustrated journey, not a live AI result. Recommendations aren’t guaranteed.
      </footer>
    </div>
  );
}
