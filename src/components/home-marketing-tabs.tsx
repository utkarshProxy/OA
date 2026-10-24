import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketingDemo, marketingServices } from "@/components/marketing";

const content = {
  "ai-search": {
    before: "Get recommended ",
    mark: "by AI.",
    cta: "Explore AI Search",
    features: [
      ["Know where you stand", "A visibility baseline across the questions your customers ask."],
      [
        "Close the content gaps",
        "Clear service pages, useful answers, and evidence of your expertise.",
      ],
      ["Track what changes", "Review mentions, citations, and relevant enquiries over time."],
    ],
  },
  conversion: {
    before: "Turn more visits ",
    mark: "into enquiries.",
    cta: "Explore Conversion",
    features: [
      ["Make your offer clear", "Messaging that explains who you help and why to choose you."],
      ["Remove the friction", "Simpler forms, clearer actions, and an easier mobile journey."],
      ["Measure useful outcomes", "Track completed enquiries and lead quality, then refine."],
    ],
  },
  content: {
    before: "One conversation. ",
    mark: "A month of content.",
    cta: "Explore Content Multiplier",
    features: [
      [
        "Start with your expertise",
        "Calls, webinars, interviews, research, or a quick voice note.",
      ],
      ["Make it work everywhere", "Articles, newsletters, social posts, and sales briefs."],
      ["Keep your voice", "Every draft uses your material and waits for your approval."],
    ],
  },
} as const;

export function HomeMarketingTabs() {
  return (
    <Tabs defaultValue="ai-search" className="home-marketing-tabs">
      <div className="home-marketing-bar">
        <p className="t-label">03 / Marketing</p>
        <Link to="/solutions/marketing">
          All marketing solutions <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <TabsList className="home-marketing-tab-list" aria-label="Marketing solutions">
        {marketingServices.map(({ slug, name, tag, icon: Icon }) => (
          <TabsTrigger className="home-marketing-tab" key={slug} value={slug}>
            <Icon size={18} aria-hidden="true" />
            <span>
              <b>{name}</b>
              <small>{tag}</small>
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      {marketingServices.map((service) => {
        const detail = content[service.slug];
        return (
          <TabsContent key={service.slug} value={service.slug} className="home-marketing-content">
            <article className="solution-panel home-marketing-panel">
              <div className="solution-panel-intro">
                <p className="t-label">
                  {service.outcome} / {service.tag}
                </p>
                <h3>
                  {detail.before}
                  <span className="mark mark-yellow">{detail.mark}</span>
                </h3>
                <p>{service.copy}</p>
              </div>
              <div className="home-marketing-demo">
                <MarketingDemo kind={service.slug} />
              </div>
              <div className="solution-feature-list">
                {detail.features.map(([title, text]) => (
                  <div className="solution-feature" key={title}>
                    <span className="solution-icon">
                      <Check size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <b>{title}</b>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                className="btn btn-primary solution-panel-cta"
                to={`/solutions/marketing/${service.slug}`}
              >
                {detail.cta}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
