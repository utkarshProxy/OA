import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageFrame, PageHero } from "@/components/site";
import { BOOKING_URL } from "@/lib/site-content";
import { submitLead } from "@/lib/submit-lead";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Find Your Best AI Opportunity — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { name: "description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" },
    { property: "og:title", content: "Find Your Best AI Opportunity — OBOU Automations - AI agents implementation - Automate Daily Tasks - AI Implementation for Business - Get More Done Faster" }, { property: "og:description", content: "Implement AI agents that handle 80% of the repetitive ops in a small business" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  const send = useServerFn(submitLead);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus("sending");

    try {
      await send({ data: {
        source: "contact",
        name: String(fields.get("name") ?? ""),
        email: String(fields.get("email") ?? ""),
        company: String(fields.get("company") ?? ""),
        message: String(fields.get("message") ?? ""),
        website: String(fields.get("website") ?? ""),
      } });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <PageFrame>
    <PageHero eyebrow="Start a conversation" title="What work should your team stop doing by hand?" copy="Tell us where the friction is. We’ll help you work out whether AI is useful, what the first system could look like, and what should stay human." />
    <section className="contact-section section-light">
      <div className="wrap contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name<input name="name" required maxLength={120} placeholder="Your name" /></label>
          <label>Work email<input name="email" required type="email" maxLength={254} placeholder="you@company.com" /></label>
          <label>Company<input name="company" required maxLength={120} placeholder="Company name" /></label>
          <label>Where does work get stuck?<textarea name="message" rows={5} maxLength={3000} placeholder="A repetitive task, slow handoff, missed follow-up, or anything else..." /></label>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
          <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send the workflow"} <ArrowUpRight size={15} />
          </button>
          <p className="form-status" role={status === "error" ? "alert" : "status"} aria-live="polite">
            {status === "success" && "Thanks. Your message was sent, and we’ll reply by email."}
            {status === "error" && "Your message could not be sent. Please try again."}
          </p>
        </form>
        <aside><p className="t-label">Prefer to talk?</p><h2>Book a straightforward conversation.</h2><p>No technical preparation needed. Bring one process that feels slower or more manual than it should.</p><a className="btn btn-secondary" href={BOOKING_URL} target="_blank" rel="noreferrer">Choose a time <ArrowUpRight size={15}/></a></aside>
      </div>
    </section>
  </PageFrame>;
}
