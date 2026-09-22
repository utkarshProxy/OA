export const BOOKING_URL = "https://calendar.app.google/BovBGfzf4FPaK53v7";

export const solutions = [
  {
    number: "01",
    slug: "operations",
    label: "Operations",
    title: "Back Office on Autopilot",
    summary: "Sort incoming work, turn meetings into actions, prepare documents, route requests, and chase missing information.",
    systems: ["Meeting → Action System", "AI Inbox Triage", "Client Onboarding System", "Document Processing Agent", "Operations Assistant"],
    flow: ["Request arrives", "Classify", "Extract details", "Route work", "Human exception", "Report"],
  },
  {
    number: "02",
    slug: "sales",
    label: "Sales",
    title: "Never Miss a Lead",
    summary: "Answer inquiries, qualify leads, research prospects, prepare meetings, and keep follow-up moving.",
    systems: ["AI Phone Receptionist", "Lead Qualification Agent", "AI Account Researcher", "Proposal Builder", "Follow-Up Agent"],
    flow: ["Lead arrives", "Research", "Qualify", "Draft response", "Human review", "Follow up"],
  },
  {
    number: "03",
    slug: "marketing",
    label: "Marketing",
    title: "Content Multiplier",
    summary: "Turn conversations, webinars, voice notes, research, and interviews into useful content for every channel.",
    systems: ["Social Content", "Newsletters", "Articles", "Briefs", "Sales Enablement"],
    flow: ["One input", "AI system", "Article", "Newsletter", "Social posts", "Sales brief"],
  },
  {
    number: "04",
    slug: "knowledge",
    label: "Knowledge",
    title: "Ask Your Business",
    summary: "Give your team reliable answers grounded in SOPs, policies, training, client work, product information, and meetings.",
    systems: ["SOP Assistant", "Training Guide", "Policy Search", "Project Memory", "Internal Q&A"],
    flow: ["Team question", "Search company knowledge", "Cite source", "Answer", "Human decides"],
  },
  {
    number: "05",
    slug: "custom",
    label: "Custom",
    title: "Built For You",
    summary: "Not every problem fits a box. Tell us the task that drains your team, and we map it, scope it, and build a system around it.",
    systems: ["Workflow Mapping", "Custom Agent Build", "Tool Integration", "Human Checkpoints", "Ongoing Tuning"],
    flow: ["Mapped", "Scoped", "Built", "Live", "Improved"],
  },
] as const;

export const workExamples = [
  {
    title: "AI Account Researcher",
    problem: "Good prospect research takes time, so it often happens late or not at all.",
    before: ["Open company website", "Check LinkedIn", "Search recent news", "Read CRM notes", "Assemble a briefing"],
    installed: ["Collect relevant sources", "Summarise useful signals", "Prepare a structured briefing"],
    after: ["Read the briefing", "Add judgment", "Sell"],
  },
  {
    title: "Meeting → Action System",
    problem: "Actions disappear between the call, the notes, and the next busy day.",
    before: ["Find recording", "Write summary", "Pull out tasks", "Assign owners", "Send follow-up"],
    installed: ["Read transcript", "Draft decisions and actions", "Prepare follow-up"],
    after: ["Review actions", "Approve message", "Work begins"],
  },
  {
    title: "Company Knowledge Assistant",
    problem: "The right answer exists, but it is spread across documents and people.",
    before: ["Ask in chat", "Search folders", "Interrupt colleague", "Compare versions"],
    installed: ["Search approved sources", "Find relevant passage", "Draft cited answer"],
    after: ["Check source", "Apply judgment", "Move forward"],
  },
] as const;