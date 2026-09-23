import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { submitLead } from "@/lib/submit-lead";

const questions = [
  { label: "What type of business are you?", options: ["Agency", "Professional services", "SaaS", "Other"] },
  { label: "How many people are on the team?", options: ["1–5", "6–20", "21–50", "51–100"] },
  { label: "Which department needs the most help?", options: ["Sales", "Operations", "Marketing", "Customer service"] },
  { label: "What work gets repeated frequently?", options: ["Research", "Writing and documents", "Sorting requests", "Follow-up"] },
  { label: "What gets delayed or forgotten?", options: ["Lead response", "Proposals", "Meeting actions", "Internal requests"] },
  { label: "Which tools do you use?", options: ["Google Workspace", "Microsoft 365", "HubSpot", "A mix of tools"] },
] as const;

export function OpportunityFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const choose = (answer: string) => {
    const next = [...answers]; next[step] = answer; setAnswers(next);
    if (step === questions.length - 1) setDone(true); else setStep(step + 1);
  };
  const reset = () => { setDone(false); setStep(0); setAnswers([]); };
  const currentQuestion = questions[step];

  if (!currentQuestion) return null;

  return <div className="finder-shell">
    {!done ? <>
      <div className="finder-progress"><span>Question {step + 1} / {questions.length}</span><span style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
      <div className="finder-question" aria-live="polite"><p className="t-label">Your workflow map</p><h3>{currentQuestion.label}</h3><div className="finder-options">{currentQuestion.options.map(option => <button type="button" key={option} onClick={() => choose(option)}><span>{option}</span><ArrowRight size={18} /></button>)}</div></div>
      <button className="finder-back" type="button" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Back</button>
  </> : <FinderResults answers={answers} onReset={reset} />}
  </div>;
}

function FinderResults({ answers, onReset }: { answers: string[]; onReset: () => void }) {
  const send = useServerFn(submitLead);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const items = [["01", "Lead research", "High", "Low"], ["02", "Proposal preparation", "High", "Medium"], ["03", "Meeting follow-up", "Medium", "Low"]];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus("sending");

    try {
      await send({ data: {
        source: "opportunity-finder",
        name: String(fields.get("name") ?? ""),
        email: String(fields.get("email") ?? ""),
        company: String(fields.get("company") ?? ""),
        answers,
        website: String(fields.get("website") ?? ""),
      } });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <div className="finder-results"><div className="results-head"><div><p className="t-label"><Check size={12} /> Your best AI opportunities</p><h3>Start where the value is clearest.</h3></div><div className="time-save"><strong>18–26</strong><span>potential hours saved / week</span></div></div>
    <div className="result-table">{items.map(([n, title, impact, complexity]) => <div className="result-row" key={title}><span>{n}</span><strong>{title}</strong><span>Impact <b>{impact}</b></span><span>Complexity <b>{complexity}</b></span></div>)}</div>
    <form className="capture-form" onSubmit={handleSubmit}>
      <label>Name<input name="name" required maxLength={120} placeholder="Your name" /></label>
      <label>Work email<input name="email" type="email" required maxLength={254} placeholder="you@company.com" /></label>
      <label>Company<input name="company" required maxLength={120} placeholder="Company name" /></label>
      <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Get the full workflow map"} <ArrowRight size={15} />
      </button>
      <p className="form-status" role={status === "error" ? "alert" : "status"} aria-live="polite">
        {status === "success" && "Thanks. Your answers were sent, and we’ll follow up by email."}
        {status === "error" && "Your answers could not be sent. Please try again."}
      </p>
    </form>
    <button className="finder-back" type="button" onClick={onReset}><ArrowLeft size={15} /> Start again</button>
  </div>;
}
