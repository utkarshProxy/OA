import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Search,
  MousePointer2,
  AudioLines,
  Plus,
  Minus,
} from "lucide-react";
import { useId, useState } from "react";
import { BOOKING_URL } from "@/lib/site-content";
import { Eyebrow, PageFrame } from "@/components/site";
import "@/marketing.css";
import { AiSearchIllustration } from "@/components/ai-search-illustration";

export const marketingServices = [
  {
    slug: "ai-search",
    name: "AI Search Visibility",
    short: "AI search",
    tag: "AEO / GEO",
    outcome: "Get found.",
    headline: "Get recommended by AI.",
    copy: "Help customers find your business when they ask AI for answers, options, and recommendations.",
    pain: "Customers can’t find us.",
    icon: Search,
  },
  {
    slug: "conversion",
    name: "Conversion Optimisation",
    short: "Conversion",
    tag: "CRO",
    outcome: "Get chosen.",
    headline: "Turn more visits into enquiries.",
    copy: "Give the right visitors a clearer reason to choose you and an easier way to take the next step.",
    pain: "People visit. Few enquire.",
    icon: MousePointer2,
  },
  {
    slug: "content",
    name: "Content Multiplier",
    short: "Content",
    tag: "CONTENT ENGINE",
    outcome: "Stay visible.",
    headline: "One conversation. A month of content.",
    copy: "Turn your calls, webinars, and voice notes into articles, newsletters, and social posts. All in your voice.",
    pain: "We struggle to post consistently.",
    icon: AudioLines,
  },
] as const;
export type MarketingSlug = (typeof marketingServices)[number]["slug"];
export function MarketingNav() {
  return (
    <div className="mkt-subnav">
      <div className="wrap">
        <Link
          to="/solutions/marketing"
          activeOptions={{ exact: true }}
          activeProps={{ className: "active" }}
        >
          Marketing overview
        </Link>
        <nav aria-label="Marketing solutions">
          {marketingServices.map((s) => (
            <Link
              key={s.slug}
              to={`/solutions/marketing/${s.slug}`}
              activeProps={{ className: "active" }}
            >
              {s.short}
              <ArrowUpRight size={12} />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
function BookingLink({ children = "Find your marketing bottleneck" }: { children?: string }) {
  return (
    <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}
export function MarketingHub() {
  return (
    <PageFrame>
      <MarketingNav />
      <section className="mkt-hero">
        <div className="wrap">
          <div className="mkt-hero-top">
            <Eyebrow>Marketing / Three connected solutions</Eyebrow>
            <span className="t-label">Built around your business</span>
          </div>
          <h1>
            Get found.
            <br />
            Get chosen.
            <br />
            <span className="mkt-highlight">Stay visible.</span>
          </h1>
          <div className="mkt-hero-bottom">
            <p>
              Better marketing starts where you’re getting stuck. Help customers discover you, turn
              their interest into enquiries, and keep showing up with something worth saying.
            </p>
            <BookingLink />
          </div>
          <div className="mkt-index">
            {marketingServices.map((s, i) => (
              <a key={s.slug} href={`#${s.slug}`}>
                <span>
                  0{i + 1} / {s.tag}
                </span>
                <b>{s.name}</b>
                <ArrowRight size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="mkt-services">
        <div className="wrap">
          <div className="mkt-section-heading">
            <Eyebrow>Choose your starting point</Eyebrow>
            <h2>
              Three problems.
              <br />
              Three practical ways forward.
            </h2>
            <p>Start with one. Connect the others when they earn their place.</p>
          </div>
          {marketingServices.map((s, i) => (
            <article className="mkt-service" id={s.slug} key={s.slug}>
              <div className="mkt-service-copy">
                <span className="mkt-number">0{i + 1}</span>
                <p className="t-label">
                  {s.name} · {s.tag}
                </p>
                <h3>{s.headline}</h3>
                <p>{s.copy}</p>
                <Link className="text-link" to={`/solutions/marketing/${s.slug}`}>
                  Explore {s.name}
                  <ArrowRight size={16} />
                </Link>
              </div>
              <MarketingDemo kind={s.slug} />
            </article>
          ))}
        </div>
      </section>
      <section className="mkt-diagnosis section-dark">
        <div className="wrap">
          <Eyebrow>Find the friction</Eyebrow>
          <h2>
            Where does your
            <br />
            marketing get stuck?
          </h2>
          <div className="mkt-pain-list">
            {marketingServices.map((s) => (
              <Link to={`/solutions/marketing/${s.slug}`} key={s.slug}>
                <span>{s.pain}</span>
                <b>
                  {s.name}
                  <ArrowUpRight size={21} />
                </b>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mkt-connected">
        <div className="wrap">
          <div className="mkt-section-heading">
            <Eyebrow>Better together</Eyebrow>
            <h2>
              Your expertise.
              <br />
              Working harder.
            </h2>
            <p>
              Content gives you something useful to say. AI search helps people discover it.
              Conversion work makes it easier to act.
            </p>
          </div>
          <div className="mkt-loop">
            {marketingServices.map((s, i) => (
              <div key={s.slug}>
                <s.icon size={28} />
                <span className="t-label">
                  0{i + 1} / {s.short}
                </span>
                <h3>{s.outcome}</h3>
                <p>
                  {
                    [
                      "Make your expertise easier to discover and reference.",
                      "Give interested visitors a clear next step.",
                      "Keep useful ideas moving across your channels.",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
          <p className="mkt-note">
            Each solution stands on its own. We recommend the combination that fits your bottleneck.
          </p>
        </div>
      </section>
      <MarketingCTA />
    </PageFrame>
  );
}
export function MarketingCTA() {
  return (
    <section className="mkt-cta">
      <div className="wrap">
        <Eyebrow>Start with a conversation</Eyebrow>
        <h2>
          Find the gap.
          <br />
          <span>Fix what matters.</span>
        </h2>
        <div>
          <p>
            Tell us what’s working, what isn’t, and where you want to grow. We’ll help you choose a
            useful first step.
          </p>
          <BookingLink />
        </div>
        <small>Fixed price · Written scope before work starts</small>
      </div>
    </section>
  );
}

export function MarketingDemo({ kind }: { kind: MarketingSlug }) {
  const [after, setAfter] = useState(true);
  const [output, setOutput] = useState("Article");
  if (kind === "ai-search") return <AiSearchIllustration />;
  return (
    <div className={`mkt-demo mkt-demo-${kind}`}>
      <header>
        <span className="mkt-demo-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="t-label">
          {kind === "conversion" ? "The enquiry journey" : "Content workspace"}
        </span>
        <small>Illustrative example</small>
      </header>
      {kind === "conversion" ? (
        <>
          <div className="mkt-demo-body">
            <div className="mkt-toggle" aria-label="Compare enquiry journeys">
              <button aria-pressed={!after} onClick={() => setAfter(false)}>
                Before
              </button>
              <button aria-pressed={after} onClick={() => setAfter(true)}>
                After optimisation
              </button>
            </div>
            <div className="mkt-mini-page">
              <span className="t-label">Your service page</span>
              <h4>
                {after
                  ? "Less admin. More time for your customers."
                  : "Innovative solutions for your business."}
              </h4>
              <p>
                {after
                  ? "We connect your tools and automate the repetitive work. See a clear scope before you commit."
                  : "Discover our comprehensive range of cutting-edge services and capabilities."}
              </p>
              <div className={after ? "mkt-mini-cta" : "mkt-mini-cta muted"}>
                {after ? "Book a 20-minute discovery call ↗" : "Learn more →"}
              </div>
              <small>
                {after
                  ? "Clear next step · Simple form · What happens next"
                  : "Vague promise · Unclear action · Extra friction"}
              </small>
            </div>
            <div className="mkt-audit-action">
              <MousePointer2 size={18} />
              <p>
                {after
                  ? "A specific promise. A useful reason to act. A shorter path to an enquiry."
                  : "Visitors have to work out what you offer and what to do next."}
              </p>
            </div>
          </div>
          <footer>Example improvements, not measured conversion results</footer>
        </>
      ) : (
        <>
          <div className="mkt-demo-body">
            <span className="t-label">Start with what you already know</span>
            <div className="mkt-source">
              <AudioLines size={27} />
              <div>
                <b>A conversation worth sharing</b>
                <span>Webinar / Voice note / Interview</span>
              </div>
              <span>40:00</span>
            </div>
            <div className="mkt-output-tabs" aria-label="Content output">
              {["Article", "Newsletter", "Social posts"].map((o) => (
                <button key={o} onClick={() => setOutput(o)} aria-pressed={output === o}>
                  {o}
                </button>
              ))}
            </div>
            <div className="mkt-content-output">
              <span className="t-label">{output} / Draft ready to review</span>
              <h4>
                {output === "Article"
                  ? "The work you can stop doing by hand."
                  : output === "Newsletter"
                    ? "One idea to take into your next week."
                    : "Your best ideas deserve a second life."}
              </h4>
              <p>
                {output === "Article"
                  ? "Your examples and expertise, shaped into a structured article in your voice."
                  : output === "Newsletter"
                    ? "The same expertise, edited into a useful read for your subscribers."
                    : "A set of focused posts, adapted for the channels your audience uses."}
              </p>
            </div>
          </div>
          <footer>
            <Check size={14} />
            Your voice. Your approval. Every time.
          </footer>
        </>
      )}
    </div>
  );
}

const detailContent = {
  "ai-search": {
    eyebrow: "AI Search Visibility / AEO & GEO",
    before: "Be part of",
    mark: "the answer.",
    lede: "When customers ask AI who to work with, give it clearer reasons to find, understand, and reference your business.",
    problem: "Your expertise exists. Can customers discover it?",
    problemCopy:
      "A good business can be hard to understand online. Unclear services, thin answers, and scattered business details make discovery harder. We start by finding those gaps.",
    deliverables: [
      [
        "Visibility baseline",
        "Review a defined set of customer questions and record where your business appears, with sources and dates.",
      ],
      [
        "Question & content map",
        "Identify the questions people ask before they buy, then map them to useful service pages, FAQs, and guides.",
      ],
      [
        "Clearer website signals",
        "Improve crawlability, service descriptions, internal links, and relevant structured data that matches visible content.",
      ],
      [
        "Evidence that supports your expertise",
        "Bring real examples, credentials, and consistent business information into the pages customers use to evaluate you.",
      ],
    ],
    steps: [
      ["Audit", "Review your site and a relevant set of customer questions."],
      ["Prioritise", "Agree which content and technical gaps matter most."],
      ["Improve", "Implement the scoped changes, with your review."],
      ["Monitor", "Revisit the same questions and track changes over time."],
    ],
    measures: [
      ["Visibility", "Mentions and citations across the agreed question set."],
      ["Discovery", "Relevant referral visits where they can be attributed."],
      ["Business value", "Enquiries and lead quality linked to those visits."],
    ],
    measureNote:
      "AI answers vary by platform, time, and context. We document observations and trends; we don’t promise a recommendation or a fixed ranking.",
    faqs: [
      [
        "Is this AEO or GEO?",
        "We group both under AI Search Visibility. AEO means answer engine optimisation; GEO means generative engine optimisation. The scope focuses on clear, useful, discoverable information and evidence about your business.",
      ],
      [
        "Does it replace SEO?",
        "It builds on technical SEO and useful content. We review the foundations alongside how your business is represented in AI search.",
      ],
      [
        "Can you guarantee AI will recommend us?",
        "No. Platforms decide what to include. We can improve your content and technical foundations, monitor an agreed set of questions, and report what changes.",
      ],
      [
        "Do we need the Content Multiplier too?",
        "Only if consistent content production is a bottleneck. AI Search Visibility can be scoped as a standalone project.",
      ],
    ],
  },
  conversion: {
    eyebrow: "Conversion Optimisation / CRO",
    before: "More of the right visitors.",
    mark: "Taking the next step.",
    lede: "Make your value easier to understand and your website easier to act on. Improve the journey from a first visit to a qualified enquiry.",
    problem: "The visit happened. The enquiry didn’t.",
    problemCopy:
      "More traffic won’t resolve an unclear offer, a confusing page, or a form that asks too much. We review the journey and prioritise the friction that gets in the way.",
    deliverables: [
      [
        "Journey & measurement audit",
        "Review your key landing pages, calls to action, forms, and the events needed to understand completion and drop-off.",
      ],
      [
        "Sharper messaging",
        "Explain who you help, the problem you solve, and why a visitor should take the next step.",
      ],
      [
        "Less friction",
        "Improve page hierarchy, mobile usability, forms, trust information, and the path into a call or enquiry.",
      ],
      [
        "A prioritised experiment plan",
        "Define changes, hypotheses, and success measures. Run controlled tests when traffic supports reliable comparisons.",
      ],
    ],
    steps: [
      ["Understand", "Agree the conversion goal and check the baseline."],
      ["Diagnose", "Find the friction and prioritise improvements."],
      ["Implement", "Refine the pages, forms, and calls to action."],
      ["Evaluate", "Review results, lead quality, and the next useful change."],
    ],
    measures: [
      ["Completion", "Qualified enquiries as a share of relevant visits."],
      ["Friction", "Form completion and drop-off at key journey steps."],
      ["Quality", "The proportion of enquiries that fit your business."],
    ],
    measureNote:
      "For sites with limited traffic, we prioritise evidence-led usability improvements. Before-and-after trends provide context; they don’t establish the certainty of a controlled test.",
    faqs: [
      [
        "Do you need to redesign our whole website?",
        "Usually we start with the pages and steps closest to an enquiry. A full redesign is only useful if the diagnosis supports it and it is included in the agreed scope.",
      ],
      [
        "Can you work with a low-traffic website?",
        "Yes. We can review usability, clarity, and conversion tracking. We only recommend A/B tests when traffic and conversion volume support meaningful comparisons.",
      ],
      [
        "What counts as a conversion?",
        "We agree this with you: a qualified enquiry, a completed form, or a booked call. We also review lead quality so that more submissions don’t become the only goal.",
      ],
      [
        "How is this different from your Sales solution?",
        "CRO improves the website journey up to the enquiry or booking. Our Sales solution handles responding, qualifying, and following up with incoming leads.",
      ],
    ],
  },
} as const;
export function MarketingDetail({ kind }: { kind: "ai-search" | "conversion" }) {
  const d = detailContent[kind];
  return (
    <PageFrame>
      <MarketingNav />
      <section className="mkt-detail-hero">
        <div className="wrap">
          <div>
            <Eyebrow>{d.eyebrow}</Eyebrow>
            <h1>
              {d.before}
              <br />
              <span className="mkt-highlight">{d.mark}</span>
            </h1>
            <p>{d.lede}</p>
            <BookingLink
              children={
                kind === "ai-search"
                  ? "Discuss your AI visibility"
                  : "Discuss your conversion journey"
              }
            />
          </div>
          <MarketingDemo kind={kind} />
        </div>
      </section>
      <section className="mkt-deliverables">
        <div className="wrap">
          <div className="mkt-section-heading">
            <Eyebrow>The problem / The practical work</Eyebrow>
            <h2>{d.problem}</h2>
            <p>{d.problemCopy}</p>
          </div>
          <div className="mkt-deliverable-grid">
            {d.deliverables.map(([title, text], i) => (
              <article key={title}>
                <span className="t-label">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mkt-process section-dark">
        <div className="wrap">
          <Eyebrow>How it works</Eyebrow>
          <h2>
            A clear scope.
            <br />A useful next step.
          </h2>
          <div className="mkt-steps">
            {d.steps.map(([title, text], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mkt-measure">
        <div className="wrap">
          <div className="mkt-section-heading">
            <Eyebrow>What we measure</Eyebrow>
            <h2>
              Progress you can
              <br />
              actually review.
            </h2>
          </div>
          <div className="mkt-loop">
            {d.measures.map(([title, text]) => (
              <div key={title}>
                <Check size={23} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="mkt-note">{d.measureNote}</p>
        </div>
      </section>
      <section className="mkt-faq">
        <div className="wrap">
          <Eyebrow>A few useful answers</Eyebrow>
          <h2>Before we start.</h2>
          {d.faqs.map(([q, a]) => (
            <FAQ key={q} question={q} answer={a} />
          ))}
        </div>
      </section>
      <section className="mkt-related">
        <div className="wrap">
          <p className="t-label">Also under marketing</p>
          {marketingServices
            .filter((s) => s.slug !== kind)
            .map((s) => (
              <Link key={s.slug} to={`/solutions/marketing/${s.slug}`}>
                <span>{s.name}</span>
                <ArrowUpRight size={24} />
              </Link>
            ))}
        </div>
      </section>
      <MarketingCTA />
    </PageFrame>
  );
}
function FAQ({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();
  return (
    <div className="mkt-faq-item">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
      >
        {question}
        {open ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <p id={answerId} hidden={!open}>
        {answer}
      </p>
    </div>
  );
}
