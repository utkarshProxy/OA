import { useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { submitLead } from "@/lib/submit-lead";

type SolutionSlug = "sales" | "marketing" | "operations" | "knowledge";
type AnswerId = "businessType" | "teamSize" | "operations" | "socialAndQueries" | "salesFollowUp" | "customerDelight" | "paperworkHours" | "problem";
type Answers = Partial<Record<AnswerId, string>>;

const FINDER_CONFIG = {
  questions: [
    { id: "businessType", label: "What kind of business do you run?", options: [
      "Home services (plumbing, HVAC, cleaning, repairs)", "Clinic, salon or wellness", "Professional services (legal, accounting, real estate, insurance)", "Other small local business",
    ] },
    { id: "teamSize", label: "How many people work in your business?", options: ["Just me", "2–10", "11–50", "51+"] },
    { id: "operations", label: "How does day-to-day work get tracked?", options: [
      "In people's heads and WhatsApp groups", "Spreadsheets and shared folders", "A booking, job or practice tool", "A CRM or system we keep up to date",
    ] },
    { id: "socialAndQueries", label: "How are your social media and customer messages going?", options: [
      "Posting is patchy, and messages wait until someone's free", "We post regularly, but replies to DMs and calls are slow", "Replies are quick, but we rarely post", "Both are fine, but they take too much time",
    ] },
    { id: "salesFollowUp", label: "What happens after someone enquires?", options: [
      "We reply when we can, with no set process", "We send a quote and follow up if we remember", "Leads are tracked, but every follow-up is manual", "Follow-ups already run automatically",
    ] },
    { id: "customerDelight", label: "After a job or visit, what happens next?", options: [
      "Nothing, unless they come back on their own", "We sometimes ask for a review", "We send reminders or rebooking messages by hand", "Reviews, reminders and offers go out automatically",
    ] },
    { id: "paperworkHours", label: "How many hours a week does your team spend on paperwork like claims, compliance forms, invoices and data entry?", options: ["Under 5", "5–15", "15–30", "30+"] },
    { id: "problem", label: "What problem do you want us to solve?", placeholder: "e.g. We miss calls after 6pm and lose bookings to competitors.", helper: "Optional, but it helps us come back with something useful." },
  ],
  scores: {
    operations: {
      A: { knowledge: 2, operations: 1 }, B: { operations: 2, knowledge: 1 }, C: { operations: 1 }, D: {},
    },
    socialAndQueries: {
      A: { sales: 2, marketing: 2 }, B: { sales: 3 }, C: { marketing: 3 }, D: { sales: 1, marketing: 1 },
    },
    salesFollowUp: { A: { sales: 3 }, B: { sales: 2 }, C: { sales: 1 }, D: {} },
    customerDelight: { A: { sales: 2 }, B: { sales: 1, marketing: 1 }, C: { sales: 1 }, D: {} },
    paperworkHours: { A: {}, B: { operations: 1 }, C: { operations: 2 }, D: { operations: 3 } },
  },
  tieBreak: ["sales", "operations", "marketing", "knowledge"] as SolutionSlug[],
  solutions: {
    sales: { title: "Never Miss a Lead", reason: "Enquiries wait and follow-ups depend on memory. An AI receptionist and follow-up agent answer calls and DMs in seconds and chase every quote, then bring customers back for the next visit." },
    marketing: { title: "Content Multiplier", reason: "Posting is patchy. Turn one voice note, job photo or client win into a week of posts." },
    operations: { title: "Back Office on Autopilot", reason: "Claims, forms and data entry are eating your week. Extract, file and chase automatically; anything unusual comes to you." },
    knowledge: { title: "Ask Your Business", reason: "Know-how lives in people's heads and WhatsApp threads. Give the team one place to get reliable answers." },
  },
  custom: { title: "Built for you", reason: "Your basics are already covered. Let's find the one custom workflow that moves the needle." },
  teamHeadlines: {
    "Just me": "Start with one quick win that gives you your evenings back.",
    "2–10": "Start where the value is clearest.",
    "11–50": "Start where the value is clearest for the whole team.",
    "51+": "Start where the value is clearest for the whole team.",
  },
  hours: { "Under 5": [1, 2], "5–15": [3, 7], "15–30": [6, 14], "30+": [12, 20] },
} as const;

type Recommendation = { slug: SolutionSlug | "custom"; title: string; reason: string; score: number };

function getRecommendations(answers: Answers): Recommendation[] {
  const scores: Record<SolutionSlug, number> = { sales: 0, operations: 0, marketing: 0, knowledge: 0 };
  const scoredQuestionIds = ["operations", "socialAndQueries", "salesFollowUp", "customerDelight", "paperworkHours"] as const;
  for (const id of scoredQuestionIds) {
    const answer = answers[id];
    const question = FINDER_CONFIG.questions.find((entry) => entry.id === id);
    if (!answer || !question || !("options" in question)) continue;
    const option = (["A", "B", "C", "D"] as const)[question.options.indexOf(answer)];
    if (!option) continue;
    const points = FINDER_CONFIG.scores[id][option];
    for (const [slug, score] of Object.entries(points) as [SolutionSlug, number][]) scores[slug] += score;
  }

  const recommendations = (Object.entries(scores) as [SolutionSlug, number][])
    .filter(([, score]) => score >= 2)
    .sort(([slugA, scoreA], [slugB, scoreB]) =>
      scoreB - scoreA || FINDER_CONFIG.tieBreak.indexOf(slugA) - FINDER_CONFIG.tieBreak.indexOf(slugB),
    )
    .slice(0, 3)
    .map(([slug, score]) => ({
      slug,
      title: FINDER_CONFIG.solutions[slug].title,
      reason: FINDER_CONFIG.solutions[slug].reason,
      score,
    }));

  return recommendations.length ? recommendations : [{ slug: "custom", ...FINDER_CONFIG.custom, score: 0 }];
}

function getHoursEstimate(answers: Answers): string {
  const [baseLow, baseHigh] = FINDER_CONFIG.hours[answers.paperworkHours as keyof typeof FINDER_CONFIG.hours] ?? [1, 2];
  const followUpBonus = answers.salesFollowUp?.startsWith("We reply when") || answers.salesFollowUp?.startsWith("We send a quote") ? 2 : 0;
  const slowReplyBonus = answers.socialAndQueries?.startsWith("Posting is patchy") || answers.socialAndQueries?.startsWith("We post regularly") ? 1 : 0;
  return `${baseLow + followUpBonus + slowReplyBonus}–${baseHigh + followUpBonus + slowReplyBonus}`;
}

export function OpportunityFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const choose = (answer: string) => {
    const question = FINDER_CONFIG.questions[step];
    if (!question) return;
    const next = { ...answers, [question.id]: answer } as Answers;
    setAnswers(next);
    if (step === FINDER_CONFIG.questions.length - 1) setDone(true);
    else setStep(step + 1);
  };
  const reset = () => { setDone(false); setStep(0); setAnswers({}); };
  const currentQuestion = FINDER_CONFIG.questions[step];

  if (!currentQuestion) return null;

  return <div className="finder-shell">
    {!done ? <>
      <div className="finder-progress"><span>Question {step + 1} / {FINDER_CONFIG.questions.length}</span><span style={{ width: `${((step + 1) / FINDER_CONFIG.questions.length) * 100}%` }} /></div>
      <div className="finder-question" aria-live="polite">
        <p className="t-label">Your workflow map</p>
        <h3>{currentQuestion.label}</h3>
        {"options" in currentQuestion ? <div className="finder-options">{currentQuestion.options.map((option, index) => <button type="button" key={option} onClick={() => choose(option)}><span>{option}</span><ArrowRight size={18} aria-hidden="true" /></button>)}</div> : <>
          <textarea rows={4} maxLength={1000} placeholder={currentQuestion.placeholder} value={answers.problem ?? ""} onChange={(event) => setAnswers({ ...answers, problem: event.target.value })} />
          <p className="finder-helper">{currentQuestion.helper}</p>
          <div className="finder-question-actions"><button className="btn btn-primary" type="button" onClick={() => choose(answers.problem ?? "")}>See my results <ArrowRight size={15} /></button><button className="finder-back" type="button" onClick={() => choose("")}>Skip</button></div>
        </>}
      </div>
      <button className="finder-back" type="button" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Back</button>
    </> : <FinderResults answers={answers} onReset={reset} />}
  </div>;
}

function FinderResults({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const send = useServerFn(submitLead);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const recommendations = useMemo(() => getRecommendations(answers), [answers]);
  const hoursEstimate = getHoursEstimate(answers);
  const headline = FINDER_CONFIG.teamHeadlines[answers.teamSize as keyof typeof FINDER_CONFIG.teamHeadlines] ?? "Start where the value is clearest.";

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
        whatsapp: String(fields.get("whatsapp") ?? ""),
        answers,
        recommendations: recommendations.map(({ slug }) => slug),
        hoursEstimate,
        website: String(fields.get("website") ?? ""),
      } });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <div className="finder-results">
    <div className="results-head"><div><p className="t-label"><Check size={12} /> Your best AI opportunities</p><h3>{headline}</h3></div><div className="time-save"><strong>{hoursEstimate}</strong><span>estimated hours saved / week</span></div></div>
    <div className="result-table">{recommendations.map(({ slug, title, reason, score }, index) => <div className="result-row" key={slug}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{slug === "custom" ? <Link to="/contact">{title}</Link> : <Link to="/solutions" hash={slug}>{title}</Link>}</strong>
      <span>Impact <b>{score >= 4 ? "High" : "Medium"}</b></span>
      <span>Complexity <b>{answers.operations?.startsWith("In people's heads") || answers.operations?.startsWith("Spreadsheets") ? "Low" : "Medium"}</b></span>
      <p className="result-reason">{reason}</p>
    </div>)}</div>
    <p className="finder-note">Estimates based on your answers. We confirm the real numbers in the audit.</p>
    <form className="capture-form" onSubmit={handleSubmit}>
      <label>Name<input name="name" required maxLength={120} placeholder="Your name" /></label>
      <label>Email<input name="email" type="email" required maxLength={254} placeholder="you@business.com" /></label>
      <label>Business name<input name="company" required maxLength={120} placeholder="Business name" /></label>
      <label>WhatsApp number (optional)<input name="whatsapp" type="tel" maxLength={30} placeholder="Optional" /></label>
      <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Get my full workflow map"} <ArrowRight size={15} aria-hidden="true" />
      </button>
      <p className="form-status" role={status === "error" ? "alert" : "status"} aria-live="polite">
        {status === "success" && "Thanks! We'll email your workflow map within one business day."}
        {status === "error" && "Your answers could not be sent. Please try again."}
      </p>
    </form>
    <button className="finder-back" type="button" onClick={onReset}><ArrowLeft size={15} /> Start again</button>
  </div>;
}
