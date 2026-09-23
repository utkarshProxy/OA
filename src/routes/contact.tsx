import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageFrame, PageHero } from "@/components/site";
import { BOOKING_URL } from "@/lib/site-content";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc9ag3nN_qLcSzRL6_Htl7jHh-CtQSf1xd-QAh5KzA3D7E_0Q/viewform?usp=publish-editor";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title:
          "Find Your Best AI Opportunity — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster",
      },
      {
        name: "description",
        content:
          "Implement AI agents that handle 80% of the repetitive ops in a small business",
      },
      {
        property: "og:title",
        content:
          "Find Your Best AI Opportunity — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster",
      },
      {
        property: "og:description",
        content:
          "Implement AI agents that handle 80% of the repetitive ops in a small business",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageFrame>
      <PageHero
        eyebrow="Start a conversation"
        title="What work should your team stop doing by hand?"
        copy="Tell us where the friction is. We’ll help you work out whether AI is useful, what the first system could look like, and what should stay human."
      />
      <section className="contact-section section-light">
        <div className="wrap contact-grid">
          <div className="contact-form">
            <p>
              Share a few details about the work that feels slower or more
              manual than it should. Your responses are sent directly to OBOU
              Automations.
            </p>
            <a
              className="btn btn-primary"
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open the inquiry form <ArrowUpRight size={15} />
            </a>
            <p className="form-status" role="status">
              Opens a short, secure Google Form in a new tab.
            </p>
          </div>
          <aside>
            <p className="t-label">Prefer to talk?</p>
            <h2>Book a straightforward conversation.</h2>
            <p>
              No technical preparation needed. Bring one process that feels
              slower or more manual than it should.
            </p>
            <a
              className="btn btn-secondary"
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
            >
              Choose a time <ArrowUpRight size={15} />
            </a>
          </aside>
        </div>
      </section>
    </PageFrame>
  );
}
