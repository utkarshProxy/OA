import { Link } from "@tanstack/react-router";
import { Check, Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type FaqItem = { value: string; question: string; answer: string };
type PricingPlan = {
  kind: "custom" | "quickwin";
  kicker: string;
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  costNote?: string;
  action: string;
};

const plans: PricingPlan[] = [
  {
    kind: "custom",
    kicker: "Built around your business",
    title: "Custom Workflow",
    description: "Tell us what drains your team. We'll map it, scope it, and build an automation system around it, integrated with your existing tools.",
    price: "Talk to us",
    period: "Scoped and priced for your operation",
    features: [
      "Free automation audit and roadmap",
      "Bespoke build, scoped after a feasibility review",
      "Live in 5–14 days, depending on the system",
      "Specialized agents with defined roles, coordinated handoffs, and shared state",
      "Custom integrations, monitoring, guardrails, and quality controls",
      "Deployed in your accounts, yours to own",
      "Handoff walkthrough and 30 days of free maintenance",
    ],
    action: "Talk to us",
  },
  {
    kind: "quickwin",
    kicker: "Fixed price / one deployment",
    title: "Single Workflow Automation",
    description: "One clearly defined workflow that solves an expensive or repetitive problem in your business. Includes a free automation audit and roadmap.",
    price: "$1,499",
    period: "per deployment*",
    features: [
      "One focused workflow or problem",
      "Fixed scope: design, build, integrations, testing, and documentation",
      "Build and delivery within 7–14 days",
      "Up to four integrated applications",
      "Specialized agents, coordinated handoffs, and shared state where needed",
      "Error handling, retry logic, and Slack or Discord alerts",
      "Monitoring, guardrails, and quality controls",
      "Deployed in your accounts, yours to own",
      "Complete workflow documentation and diagram",
    ],
    costNote: "*AI tool subscriptions, cloud hosting, API usage, and AI tokens are paid separately by the client.",
    action: "Talk to us",
  },
];

const faqs: FaqItem[] = [
  {
    value: "price",
    question: "What does the deployment price cover? Are there other costs?",
    answer: "The $1,499 deployment price covers one defined workflow. We'll confirm the scope and intended outcome before work begins. Ongoing cloud hosting, AI model and tool subscriptions, API usage, and AI tokens are paid directly by your business.",
  },
  {
    value: "audit",
    question: "What's included in the free audit?",
    answer: "We start with a 45-minute discovery and scoping call to understand how your business works today. We then review the findings and share a report with our recommendations and a roadmap for possible improvements.",
  },
  {
    value: "timeline",
    question: "How long does it take to build and deploy?",
    answer: "A fixed-scope workflow is typically built and delivered in 7–14 days, including connections, customization, testing, and refinement. Custom systems depend on the agreed scope and effort.",
  },
  {
    value: "start",
    question: "Can we start small and expand later?",
    answer: "Yes. We can start with one workflow, then expand into other areas if it works well for your team.",
  },
  {
    value: "small-business",
    question: "How much does AI automation cost for a small business?",
    answer: "A typical first single-workflow project ranges from $1,499–$5,000. Larger programs across functions such as sales, operations, and finance can range from $5,000–$20,000. After a free automation audit, we'll quote a fixed price before we build.",
  },
  {
    value: "platform",
    question: "Which platform is best: n8n, Make, or Zapier?",
    answer: "Zapier is useful for simple connections, Make supports more complex visual workflows, and n8n offers self-hosting and room to scale. We often use n8n for production systems, but recommend a platform based on your volume, budget, and data privacy needs.",
  },
  {
    value: "integrations",
    question: "Can this work with our existing CRM and tools?",
    answer: "Yes. We integrate with tools such as HubSpot, Salesforce, GoHighLevel, Pipedrive, QuickBooks, Stripe, Google Workspace, Microsoft 365, Slack, Shopify, and WordPress. We can also assess other tools and systems without an API during scoping.",
  },
  {
    value: "privacy",
    question: "Is our data safe in AI workflows?",
    answer: "We design for privacy: workflows run in your accounts, AI calls use only the context needed for the task, and credentials are managed securely. For sensitive industries, we can discuss self-hosted options and the right safeguards during scoping.",
  },
  {
    value: "maintenance",
    question: "What do you build on, and who handles maintenance?",
    answer: "We use tools such as GoHighLevel, n8n, Twilio, and OpenAI or Anthropic models, depending on the problem. Your system is deployed in your accounts and documented for handoff. We include 30 days of maintenance and offer an optional ongoing support plan for later fixes and changes.",
  },
  {
    value: "ownership",
    question: "Who owns my data?",
    answer: "You own your data. We deploy in your accounts and agree on access to business or customer data before work starts. For regulated industries, we can put appropriate NDAs and business agreements in place.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="pricing-section section-light">
      <div className="wrap pricing-inner">
        <div className="pricing-heading">
          <Badge variant="outline" className="pricing-badge">Pricing &amp; Plans</Badge>
          <h2 id="pricing-title">Choose the right scope for your business.</h2>
          <p>Start with a fixed-price Single Workflow Automation or build a connected Custom Workflow.</p>
        </div>

        <div className="pricing-layout">
          {plans.map((plan) => (
            <article key={plan.kind} className={`pricing-card pricing-card--${plan.kind}`}>
              <div>
                <p className="pricing-card-kicker">{plan.kicker}</p>
                <h3>{plan.title}</h3>
                <p className="pricing-card-description">{plan.description}</p>
              </div>

              <div className="pricing-price">
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>

              <Separator className="pricing-separator" />

              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}><Check size={17} aria-hidden="true" /><span>{feature}</span></li>
                ))}
              </ul>

              {plan.costNote && <p className="pricing-cost-note">{plan.costNote}</p>}
              <Link to="/contact" className="pricing-button">{plan.action} <span aria-hidden="true">↗</span></Link>
            </article>
          ))}

          <div className="pricing-faq">
            <h3>Frequently asked questions</h3>
            <Accordion type="multiple" defaultValue={["price"]} className="pricing-accordion">
              {faqs.map((item) => (
                <AccordionItem key={item.value} value={item.value} className="pricing-faq-item">
                  <AccordionTrigger className="pricing-faq-trigger group [&>svg]:hidden">
                    <span>{item.question}</span>
                    <span className="pricing-faq-icon" aria-hidden="true">
                      <Plus className="group-data-[state=open]:hidden" />
                      <Minus className="hidden group-data-[state=open]:block" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pricing-faq-answer">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
