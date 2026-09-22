export const BOOKING_URL = "https://calendar.app.google/BovBGfzf4FPaK53v7";

export type SolutionSlug = "operations" | "sales" | "marketing" | "knowledge" | "custom";
export type SolutionIcon =
  | "Phone"
  | "AudioLines"
  | "Hash"
  | "Calendar"
  | "MessageSquare"
  | "ArrowLeftRight"
  | "Inbox"
  | "ListChecks"
  | "User"
  | "Sparkles"
  | "Wrench"
  | "BookOpen"
  | "Bell"
  | "Reply";
export type MarkedHeading = { before: string; mark: string; after?: string };
export type Feature = { icon: SolutionIcon; title: string; text: string };
export type DemoRow = {
  meta?: string;
  title: string;
  detail?: string;
  tone?: "accent" | "highlight";
};

export type Solution = {
  number: string;
  slug: SolutionSlug;
  label: string;
  subtitle: string;
  headline: MarkedHeading;
  title: string;
  summary: string;
  lede: string;
  features: readonly Feature[];
  systems: readonly string[];
  flow: readonly string[];
  demo: {
    kind: "timeline" | "chat" | "outputs";
    icon: SolutionIcon;
    title: string;
    sublabel: string;
    source?: { meta: string; text: string };
    rows: readonly DemoRow[];
    footer?: string;
  };
  page: {
    hero: MarkedHeading & { lede: string };
    facts: readonly { value: string; label: string }[];
    deepDive: { title: string; intro: string; features: readonly Feature[] };
    problem: {
      title: string;
      cards: readonly { title: string; text: string; points: readonly string[] }[];
      conclusion: string;
    };
    howTitle: string;
    howCopy: string;
    steps: readonly { title: string; text: string }[];
    control: { heading: MarkedHeading; items: readonly Feature[] };
    guardrails: readonly { title: string; text: string }[];
    cta: { title: string; text: string; note?: string };
  };
};

export const solutions = [
  {
    number: "01",
    slug: "operations",
    label: "Operations",
    subtitle: "Back office",
    headline: { before: "Back office on ", mark: "autopilot", after: "." },
    title: "Back Office on Autopilot",
    summary:
      "Sort incoming work, turn meetings into actions, prepare documents, route requests, and chase missing information.",
    lede: "Sort incoming work, turn meetings into actions, prepare documents, route requests, and chase missing information.",
    features: [
      {
        icon: "Inbox",
        title: "Sorts incoming work",
        text: "Emails, forms and requests tagged and routed.",
      },
      {
        icon: "ListChecks",
        title: "Meetings into actions",
        text: "Owners and follow-ups after every call.",
      },
      {
        icon: "User",
        title: "Exceptions come to you",
        text: "Anything unusual waits for a human.",
      },
    ],
    systems: [
      "Meeting → Action System",
      "AI Inbox Triage",
      "Client Onboarding System",
      "Document Processing Agent",
      "Operations Assistant",
    ],
    flow: [
      "Request arrives",
      "Classify",
      "Extract details",
      "Route work",
      "Human exception",
      "Report",
    ],
    demo: {
      kind: "timeline",
      icon: "Inbox",
      title: "Back-office autopilot",
      sublabel: "Inbox · Forms · Meetings",
      source: { meta: "Email · 8:02 AM", text: "Vendor invoice attached. PO number missing." },
      rows: [
        { meta: "8:02 AM", title: "Classified", detail: "invoice · finance" },
        { meta: "8:02 AM", title: "Extracted", detail: "vendor, amount, due date" },
        { meta: "8:03 AM", title: "Chased", detail: "asked the vendor for the PO", tone: "accent" },
        { meta: "11:40 AM", title: "Routed", detail: "to finance, ready to approve" },
        { meta: "Fri", title: "Reported", detail: "in the weekly summary", tone: "highlight" },
      ],
    },
    page: {
      hero: {
        before: "The admin still gets done. ",
        mark: "Just not by you.",
        lede: "Requests get sorted, details get pulled out, missing information gets chased, documents get prepared, and anything unusual lands on a human desk.",
      },
      facts: [
        { value: "Every request", label: "Sorted, tagged and routed" },
        { value: "Hours back", label: "The copy-paste work goes" },
        { value: "Your tools", label: "No rip and replace" },
        { value: "Exceptions to you", label: "Anything unusual waits" },
      ],
      deepDive: {
        title: "The work nobody wants to do on a Friday evening.",
        intro:
          "Not one big robot. A set of small, boring, reliable steps that sit on top of the tools your team already opens every morning.",
        features: [
          {
            icon: "Inbox",
            title: "Sorts incoming work",
            text: "Emails, forms and requests get tagged, prioritised and sent to the right person.",
          },
          {
            icon: "Sparkles",
            title: "Pulls out the details",
            text: "Names, amounts, dates and reference numbers lifted from attachments and messages.",
          },
          {
            icon: "Reply",
            title: "Chases missing information",
            text: "Politely asks the sender for what is missing, then follows up once.",
          },
          {
            icon: "BookOpen",
            title: "Prepares documents",
            text: "Quotes, reports, letters and summaries drafted from your own templates.",
          },
          {
            icon: "ListChecks",
            title: "Turns meetings into actions",
            text: "Notes, owners and follow-ups written up after every call.",
          },
          {
            icon: "ArrowLeftRight",
            title: "Routes and reports",
            text: "Work lands with the right person, and you get a weekly picture of it.",
          },
        ],
      },
      problem: {
        title: "Admin does not scale. It just eats evenings.",
        cards: [
          {
            title: "The same steps, every single day",
            text: "Open the email, read it, copy the details somewhere else, tell someone, remind them later.",
            points: [
              "Details retyped from one system into another",
              "Requests sitting unanswered in a shared inbox",
              "Follow-ups that depend on someone remembering",
            ],
          },
          {
            title: "The work is invisible until it breaks",
            text: "Nobody logs the hour spent chasing a missing number, so nobody fixes it.",
            points: [
              "No record of what happened to a request",
              "The same question asked three times",
              "Mistakes found weeks later, in the invoice",
            ],
          },
        ],
        conclusion:
          "Every hour spent moving information around is an hour not spent on the actual job.",
      },
      howTitle: "A request comes in. It gets handled.",
      howCopy:
        "Built around your inbox, your forms and your existing tools, with your rules for what gets routed where.",
      steps: [
        { title: "Request arrives", text: "Email, form, message or meeting note." },
        { title: "Classify", text: "What is this, who owns it, how urgent." },
        { title: "Extract details", text: "The fields you would have typed out yourself." },
        { title: "Route work", text: "To the right person, with everything attached." },
        { title: "Human exception", text: "Anything unusual stops and waits for a person." },
        { title: "Report", text: "A weekly picture of what came in and what happened." },
      ],
      control: {
        heading: { before: "It moves work. ", mark: "You", after: " approve it." },
        items: [
          {
            icon: "User",
            title: "Approvals stay with people",
            text: "Money, contracts and anything binding waits for a human yes.",
          },
          {
            icon: "Bell",
            title: "Exceptions come to you",
            text: "Odd requests stop and land on a desk with a short summary.",
          },
          {
            icon: "ListChecks",
            title: "Every action logged",
            text: "What came in, what was done, and who did it. Nothing in the dark.",
          },
        ],
      },
      guardrails: [
        {
          title: "No silent approvals",
          text: "It never approves spend, contracts or anything binding on its own.",
        },
        { title: "No black-box actions", text: "If it did something, you can see what and why." },
        {
          title: "No rip and replace",
          text: "It works with the tools you already have, not a migration project.",
        },
      ],
      cta: {
        title: "Add up the hours your team spends moving information around.",
        text: "We map where the requests come from, what happens to them, and which steps are worth automating first. If nothing is, we will tell you that.",
      },
    },
  },
  {
    number: "02",
    slug: "sales",
    label: "Sales",
    subtitle: "Lead-to-Booking",
    headline: { before: "", mark: "Never miss", after: " a lead." },
    title: "Never Miss a Lead",
    summary:
      "A natural voice agent answers calls, qualifies leads, replies on social channels, and books a real slot.",
    lede: "A voice agent with a natural, real voice picks up your phone line. Then the same system answers your socials and books a real slot.",
    features: [
      {
        icon: "Hash",
        title: "Instagram DMs",
        text: "Replies to DMs from reels and ads, then books.",
      },
      {
        icon: "MessageSquare",
        title: "WhatsApp",
        text: "Late-night messages answered with prices and slots.",
      },
      { icon: "Reply", title: "Website forms", text: "Every form gets a real reply in minutes." },
    ],
    systems: [
      "AI Phone Receptionist",
      "Lead Qualification Agent",
      "AI Account Researcher",
      "Proposal Builder",
      "Follow-Up Agent",
    ],
    flow: ["Capture", "Answer", "Qualify", "Book", "Remind", "Hand off"],
    demo: {
      kind: "timeline",
      icon: "Phone",
      title: "AI voice agent",
      sublabel: "ElevenLabs voice · Twilio line",
      source: { meta: "Live · 9:47 PM", text: "“Is there space in Saturday’s yoga? First class.”" },
      rows: [
        { meta: "9:47 PM", title: "Answered", detail: "in seconds, natural voice", tone: "accent" },
        { meta: "9:49 PM", title: "Qualified", detail: "first class, Saturday" },
        {
          meta: "9:50 PM",
          title: "Booked",
          detail: "Sat 10:30 AM, on the call",
          tone: "highlight",
        },
        { meta: "9:50 PM", title: "SMS sent", detail: "confirmation, reply-enabled" },
      ],
      footer: "Voice waveform",
    },
    page: {
      hero: {
        before: "Never miss another lead. ",
        mark: "Every call and message answered.",
        lede: "A voice agent with a real, natural voice picks up your phone line, day or night. The same system replies on Instagram, WhatsApp and web forms, books a real slot, and hands you the ones that need a human.",
      },
      facts: [
        { value: "Real voice", label: "ElevenLabs voice · Twilio line" },
        { value: "4 channels", label: "Calls · Instagram · WhatsApp · Forms" },
        { value: "24/7", label: "Nights and weekends included" },
        { value: "Human in the loop", label: "Hot leads come to you" },
      ],
      deepDive: {
        title: "A real voice on your phone line. Not a phone tree.",
        intro:
          "Callers talk naturally and get real answers about your classes, prices and free slots. It books during the call and texts the confirmation before they hang up.",
        features: [
          {
            icon: "Phone",
            title: "Picks up in seconds",
            text: "Every call, including nights and weekends.",
          },
          {
            icon: "AudioLines",
            title: "Natural, real voice",
            text: "Built on ElevenLabs voices, tuned to your studio.",
          },
          {
            icon: "Hash",
            title: "On your number",
            text: "Runs on your phone line through Twilio.",
          },
          {
            icon: "Calendar",
            title: "Books on the call",
            text: "Checks your calendar and locks the slot live.",
          },
          {
            icon: "MessageSquare",
            title: "Texts the confirmation",
            text: "SMS with the details, reply-enabled.",
          },
          {
            icon: "ArrowLeftRight",
            title: "Warm transfer to you",
            text: "Urgent or high-value calls go straight to you.",
          },
        ],
      },
      problem: {
        title: "The enquiry does not wait. It messages the next business.",
        cards: [
          {
            title: "Leads arrive everywhere. Replies arrive tomorrow.",
            text: "One lead is a call nobody picked up, one is an Instagram DM, one is a WhatsApp at 10 PM, one is a website form. By the time someone gets to them, the customer has already booked elsewhere.",
            points: ["Missed call · lost", "No reply", "Replied in minutes · booked"],
          },
          {
            title: "Generic auto-replies get ignored.",
            text: "A canned ‘we will get back to you’ answers fast but says nothing. It does not know your services, prices or free slots, so the customer keeps looking.",
            points: ["No useful answer", "No live availability", "No booking"],
          },
        ],
        conclusion: "Every slow reply is a booking that went to whoever answered first.",
      },
      howTitle: "One lead, start to booked.",
      howCopy:
        "Set up around your business: your classes, hours, prices, booking rules and the questions you would ask yourself.",
      steps: [
        { title: "Capture", text: "Calls first, then Instagram, WhatsApp and forms." },
        { title: "Answer", text: "Picks up or replies in seconds, in your tone." },
        { title: "Qualify", text: "Class, timing, experience, fit. Natural questions." },
        { title: "Book", text: "A real slot on your calendar, confirmed by SMS or DM." },
        { title: "Remind", text: "Reminder before the visit. Reply to reschedule." },
        { title: "Hand off", text: "Hot or unusual leads go to you with a summary." },
      ],
      control: {
        heading: { before: "AI does the chasing. ", mark: "You", after: " make the calls." },
        items: [
          {
            icon: "ListChecks",
            title: "You set the rules",
            text: "What it can book, what it can quote, and what it should never promise.",
          },
          {
            icon: "User",
            title: "Hot leads come to you",
            text: "High-value or unusual requests are flagged and passed over with a three-line summary.",
          },
          {
            icon: "BookOpen",
            title: "Every call and chat logged",
            text: "Recordings and transcripts show what was said, what was booked, and what needs you.",
          },
        ],
      },
      guardrails: [
        {
          title: "No pretending to be a person",
          text: "Warm and natural, and upfront that it is your studio's assistant.",
        },
        {
          title: "No cloning your voice",
          text: "A natural preset voice callers are comfortable with. Less uncanny, less legal mess.",
        },
        { title: "No endless follow-up spam", text: "A couple of helpful nudges, then it stops." },
      ],
      cta: {
        title: "Count the enquiries that never got a reply last week.",
        text: "That is the number this is for. We map where your leads come from, set the booking rules, and tell you up front whether this system earns its place.",
        note: "Fixed price · written scope before any work starts",
      },
    },
  },
  {
    number: "03",
    slug: "marketing",
    label: "Marketing",
    subtitle: "Content",
    headline: { before: "One conversation. ", mark: "Every channel", after: "." },
    title: "Content Multiplier",
    summary:
      "Turn conversations, webinars, voice notes, research, and interviews into useful content for every channel.",
    lede: "Turn webinars, voice notes, research and interviews into useful content for every channel.",
    features: [
      {
        icon: "AudioLines",
        title: "Any input",
        text: "Webinars, voice notes, interviews, research.",
      },
      {
        icon: "Sparkles",
        title: "Sounds like you",
        text: "Trained on your past content and tone.",
      },
      {
        icon: "Hash",
        title: "Every channel",
        text: "Article, newsletter, posts and a sales brief.",
      },
    ],
    systems: ["Social Content", "Newsletters", "Articles", "Briefs", "Sales Enablement"],
    flow: ["One input", "AI system", "Article", "Newsletter", "Social posts", "You approve"],
    demo: {
      kind: "outputs",
      icon: "Sparkles",
      title: "Content multiplier",
      sublabel: "One input · Every channel",
      source: { meta: "One input", text: "40-minute webinar recording" },
      rows: [
        { title: "Article", detail: "1,200-word draft" },
        { title: "Newsletter", detail: "ready to review" },
        { title: "Social posts", detail: "6 posts · LinkedIn + Instagram", tone: "accent" },
        { title: "Sales brief", detail: "objections answered" },
      ],
      footer: "Every draft waits for your approval",
    },
    page: {
      hero: {
        before: "One conversation. ",
        mark: "A month of content.",
        lede: "Webinars, voice notes, interviews and research become an article, a newsletter, social posts and a sales brief. All in your voice, all waiting for your approval.",
      },
      facts: [
        { value: "Any input", label: "Talks, notes, interviews" },
        { value: "Four outputs", label: "Article · Email · Social · Brief" },
        { value: "Your voice", label: "Trained on your own work" },
        { value: "You approve", label: "Nothing publishes alone" },
      ],
      deepDive: {
        title: "You already say smart things. They just die on the call.",
        intro:
          "Every client call, webinar and voice note is raw material. This turns what you already know into the content you keep meaning to write.",
        features: [
          {
            icon: "AudioLines",
            title: "Takes any input",
            text: "Recordings, voice notes, transcripts, research docs, rough bullet points.",
          },
          {
            icon: "Sparkles",
            title: "Sounds like you",
            text: "Trained on your past writing, so it reads like your work, not a template.",
          },
          {
            icon: "BookOpen",
            title: "Long-form article",
            text: "A structured draft with your arguments and your examples.",
          },
          {
            icon: "MessageSquare",
            title: "Newsletter",
            text: "The same story cut down for an inbox, ready to review.",
          },
          {
            icon: "Hash",
            title: "Social posts",
            text: "A set of posts per input, sized for each platform.",
          },
          {
            icon: "ListChecks",
            title: "Sales brief",
            text: "What your team should say when a prospect raises this topic.",
          },
        ],
      },
      problem: {
        title: "Marketing dies in the gap between busy weeks.",
        cards: [
          {
            title: "Consistency beats brilliance, and consistency is hard",
            text: "The month you are busy is the month you post nothing. Then the pipeline goes quiet two months later.",
            points: [
              "Great calls and webinars used once, then forgotten",
              "Drafts that never get finished",
              "Posting in bursts, then silence",
            ],
          },
          {
            title: "Generic AI content gets ignored",
            text: "Anyone can generate a thousand bland words. Readers can tell, and so can your clients.",
            points: [
              "Copy that sounds like every other agency",
              "Confident claims nobody checked",
              "Nothing specific to your own work",
            ],
          },
        ],
        conclusion:
          "Your best thinking is already recorded somewhere. It just never becomes anything.",
      },
      howTitle: "One input, every channel.",
      howCopy:
        "Your tone, your examples, your rules on what can never be claimed. You review every draft before it goes anywhere.",
      steps: [
        { title: "One input", text: "A call, webinar, voice note or research doc." },
        { title: "AI system", text: "Pulls the arguments, stories and quotable bits." },
        { title: "Article", text: "A long-form draft in your voice." },
        { title: "Newsletter", text: "The same story, inbox-sized." },
        { title: "Social posts", text: "Sized and written per platform." },
        { title: "You approve", text: "Edit or bin it. Nothing publishes alone." },
      ],
      control: {
        heading: { before: "It drafts. ", mark: "You", after: " publish." },
        items: [
          {
            icon: "User",
            title: "Nothing goes out unapproved",
            text: "Every piece waits in a queue for a human yes.",
          },
          {
            icon: "BookOpen",
            title: "Claims stay checkable",
            text: "It works from your material, not invented statistics.",
          },
          {
            icon: "Sparkles",
            title: "Your voice, not a template",
            text: "Tuned on your own writing, and corrected when you edit.",
          },
        ],
      },
      guardrails: [
        {
          title: "No auto-publishing",
          text: "Drafts wait for you. Your name is on it, so you press send.",
        },
        {
          title: "No invented facts or stats",
          text: "If a number is not in your material, it does not appear in the draft.",
        },
        {
          title: "No scraping competitors",
          text: "Your content comes from your work, not a rewrite of someone else's.",
        },
      ],
      cta: {
        title: "Count the good calls you had this month that nobody else will ever hear.",
        text: "We look at what you already record, what your audience needs, and whether this system is worth it for you. If it is not, we will say so.",
      },
    },
  },
  {
    number: "04",
    slug: "knowledge",
    label: "Knowledge",
    subtitle: "Ask your business",
    headline: { before: "", mark: "Ask", after: " your business." },
    title: "Ask Your Business",
    summary:
      "Give your team reliable answers grounded in SOPs, policies, training, client work, product information, and meetings.",
    lede: "Reliable answers for your team, grounded in your SOPs, policies, training, client work and meetings.",
    features: [
      {
        icon: "BookOpen",
        title: "Grounded in your docs",
        text: "SOPs, policies, training and meeting notes.",
      },
      {
        icon: "Hash",
        title: "Cites its source",
        text: "Every answer links to where it came from.",
      },
      { icon: "User", title: "You decide", text: "Answers inform. People make the call." },
    ],
    systems: ["SOP Assistant", "Training Guide", "Policy Search", "Project Memory", "Internal Q&A"],
    flow: ["Team question", "Search company knowledge", "Cite source", "Answer", "Human decides"],
    demo: {
      kind: "chat",
      icon: "BookOpen",
      title: "Ask your business",
      sublabel: "SOPs · Policies · Training",
      rows: [
        { meta: "Team member", title: "Can a client get a refund on an unused class pack?" },
        {
          meta: "Assistant",
          title: "Yes, within 14 days of purchase, minus any classes already used.",
          detail: "Refund policy · section 2",
          tone: "highlight",
        },
      ],
      footer: "A person makes the final call",
    },
    page: {
      hero: {
        before: "Ask your business. ",
        mark: "Get the answer, with the source.",
        lede: "Your SOPs, policies, training, client work and meeting notes become an assistant your team can ask, with a link to where every answer came from.",
      },
      facts: [
        { value: "Your documents", label: "SOPs, policies, training" },
        { value: "Every answer cited", label: "Linked to its source" },
        { value: "24/7", label: "New staff, late shifts" },
        { value: "Human decides", label: "Answers inform, people decide" },
      ],
      deepDive: {
        title: "The answer exists. It is just in someone's head.",
        intro:
          "Most teams do not have a knowledge problem. They have a finding problem. This makes what you have already written actually usable.",
        features: [
          {
            icon: "BookOpen",
            title: "Reads your material",
            text: "SOPs, policies, handbooks, training decks, client work, meeting notes.",
          },
          {
            icon: "Hash",
            title: "Cites its source",
            text: "Every answer links to the document and section it came from.",
          },
          {
            icon: "MessageSquare",
            title: "Says when it does not know",
            text: "No confident guessing. A gap is reported as a gap.",
          },
          {
            icon: "Sparkles",
            title: "Finds across systems",
            text: "One question instead of hunting through folders and old threads.",
          },
          {
            icon: "User",
            title: "Respects permissions",
            text: "People only get answers from material they are allowed to see.",
          },
          {
            icon: "Reply",
            title: "Where your team already chats",
            text: "Ask in the tools they use all day, not another app to remember.",
          },
        ],
      },
      problem: {
        title: "The same five questions, five times a week.",
        cards: [
          {
            title: "Your senior people are a search engine",
            text: "Every new starter and every busy shift ends with someone interrupting the person who knows.",
            points: [
              "The same questions answered again and again",
              "New staff slowed down for weeks",
              "Knowledge that leaves when a person does",
            ],
          },
          {
            title: "Nobody reads the 60-page handbook",
            text: "It is written, approved, stored somewhere, and never opened in a real situation.",
            points: [
              "Policies buried in shared folders",
              "Two versions of the same document",
              "People guessing instead of checking",
            ],
          },
        ],
        conclusion:
          "If the answer takes three interruptions to find, the policy may as well not exist.",
      },
      howTitle: "A question in. A sourced answer out.",
      howCopy:
        "Grounded only in the material you give it, with permissions honoured and a person making the final call.",
      steps: [
        { title: "Team question", text: "Asked where your team already works." },
        { title: "Search company knowledge", text: "Across SOPs, policies, training and notes." },
        { title: "Cite source", text: "The document and section it came from." },
        { title: "Answer", text: "Plain language, no invented detail." },
        { title: "Human decides", text: "The person applies judgement and decides." },
      ],
      control: {
        heading: { before: "It answers. ", mark: "People", after: " decide." },
        items: [
          {
            icon: "BookOpen",
            title: "Sources on every answer",
            text: "Nobody has to take its word for it. The link is right there.",
          },
          {
            icon: "User",
            title: "Permission-aware",
            text: "It cannot surface something a person is not allowed to see.",
          },
          {
            icon: "Bell",
            title: "Gaps get reported",
            text: "The questions it cannot answer show you what to write next.",
          },
        ],
      },
      guardrails: [
        {
          title: "No answers without a source",
          text: "If it cannot point at a document, it does not answer.",
        },
        {
          title: "No guessing to sound helpful",
          text: "A confident wrong answer is worse than no answer.",
        },
        {
          title: "No access it should not have",
          text: "It sees only the material you connect, with your permissions.",
        },
      ],
      cta: {
        title:
          "Count how many times this week someone asked a question that was already written down.",
        text: "We look at what you have documented, what your team actually asks, and whether this earns its place. If your documents are not ready, we will tell you that first.",
      },
    },
  },
  {
    number: "05",
    slug: "custom",
    label: "Custom",
    subtitle: "Built for you",
    headline: { before: "Something else eating your week? ", mark: "We'll build it." },
    title: "Built for Your Problem",
    summary:
      "Tell us the task that drains your team, and we will map it, scope it, and build a system around it.",
    lede: "Not every problem fits a box. Tell us the task that drains your team, and we'll map it, scope it and build a system around it.",
    features: [
      {
        icon: "Wrench",
        title: "Your problem, not our catalogue",
        text: "If it is repetitive, it can probably be automated.",
      },
      {
        icon: "ArrowLeftRight",
        title: "Built around your tools",
        text: "Works with the apps you already use.",
      },
      {
        icon: "User",
        title: "You approve the plan",
        text: "Nothing gets built until you sign off.",
      },
    ],
    systems: [
      "Workflow Audit",
      "Custom Agent",
      "Tool Integration",
      "Human Checkpoints",
      "Documentation",
    ],
    flow: [],
    demo: {
      kind: "timeline",
      icon: "Wrench",
      title: "Custom build",
      sublabel: "Your workflow · Your tools",
      source: {
        meta: "Your request",
        text: "“Every Monday I copy bookings into a spreadsheet and message the no-shows by hand.”",
      },
      rows: [
        { meta: "Step 1", title: "Mapped", detail: "where the hours actually go" },
        { meta: "Step 2", title: "Scoped", detail: "a written plan you approve" },
        { meta: "Step 3", title: "Built", detail: "on the tools you already use", tone: "accent" },
        { meta: "Step 4", title: "Live", detail: "you review every step" },
        { meta: "Step 5", title: "Improved", detail: "based on what you see", tone: "highlight" },
      ],
    },
    page: {
      hero: {
        before: "The thing eating your week ",
        mark: "is not in a brochure.",
        lede: "Some work does not fit a standard system. Tell us the task that drains your team, and we map it, scope it in writing, and build around the tools you already use.",
      },
      facts: [
        { value: "Your workflow", label: "Mapped before anything is built" },
        { value: "Your tools", label: "No new platform to learn" },
        { value: "Written scope", label: "Fixed plan up front" },
        { value: "Human checkpoints", label: "You approve the steps that matter" },
      ],
      deepDive: {
        title: "If it is repetitive, it can probably be automated.",
        intro:
          "The five systems cover the usual suspects. This is for everything else: the spreadsheet ritual, the weekly report, the handover nobody enjoys.",
        features: [
          {
            icon: "ListChecks",
            title: "Starts with the hours",
            text: "We look at where time actually goes before suggesting anything.",
          },
          {
            icon: "ArrowLeftRight",
            title: "Maps the real workflow",
            text: "Including the messy exceptions people handle by instinct.",
          },
          {
            icon: "BookOpen",
            title: "Scopes it in writing",
            text: "What gets built, what does not, and what it should change.",
          },
          {
            icon: "Wrench",
            title: "Builds on your tools",
            text: "Whatever you already use, rather than a new platform.",
          },
          {
            icon: "User",
            title: "Keeps humans in the loop",
            text: "Checkpoints wherever a wrong call would be expensive.",
          },
          {
            icon: "Sparkles",
            title: "Improves after go-live",
            text: "The first version is a starting point, not a monument.",
          },
        ],
      },
      problem: {
        title: "Generic tools solve generic problems.",
        cards: [
          {
            title: "Your worst task is specific to you",
            text: "It grew out of how your business actually works, so no off-the-shelf tool quite fits it.",
            points: [
              "A spreadsheet ritual nobody else would understand",
              "Steps that live only in one person's head",
              "Exceptions that break every standard tool",
            ],
          },
          {
            title: "DIY automations break quietly",
            text: "A weekend of wiring tools together works, until it does not, and nobody notices for a month.",
            points: [
              "No error handling when something fails",
              "Nobody left who remembers how it works",
              "Silent failures found far too late",
            ],
          },
        ],
        conclusion:
          "The task you would be embarrassed to describe out loud is usually the one worth automating.",
      },
      howTitle: "From ‘this eats my Monday’ to something that runs.",
      howCopy:
        "We scope the real workflow in writing, build it on your accounts, and keep human checkpoints wherever the consequences matter.",
      steps: [
        { title: "Audit", text: "Where the hours go, and what they cost." },
        { title: "Map", text: "The real workflow, exceptions included." },
        { title: "Scope", text: "A written plan you approve before any build." },
        { title: "Build", text: "On the tools you already use." },
        { title: "Review", text: "Human checkpoints where it matters." },
        { title: "Improve", text: "Adjusted once you have seen it run." },
      ],
      control: {
        heading: { before: "We build it. ", mark: "You", after: " stay in control." },
        items: [
          {
            icon: "BookOpen",
            title: "You approve the plan",
            text: "Nothing gets built until the scope is agreed in writing.",
          },
          {
            icon: "User",
            title: "Checkpoints by design",
            text: "Any step with real consequences waits for a person.",
          },
          {
            icon: "Wrench",
            title: "Yours to keep",
            text: "Built on your accounts and your tools, documented so you are not stuck.",
          },
        ],
      },
      guardrails: [
        {
          title: "No automation without a checkpoint",
          text: "Anything with money, legal or safety consequences keeps a human in it.",
        },
        {
          title: "No lock-in you cannot exit",
          text: "It runs on your accounts, and we document how it works.",
        },
        {
          title: "No project we do not believe in",
          text: "If the hours saved will not cover the build, we will say so.",
        },
      ],
      cta: {
        title: "Describe the task you would be embarrassed to admit you still do by hand.",
        text: "We will map where the hours go and tell you honestly whether automation pays for itself. Sometimes the answer is a better spreadsheet.",
      },
    },
  },
] as const satisfies readonly Solution[];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

export const leadChannels = [
  {
    value: "call",
    label: "Call",
    icon: "Phone",
    source: "Incoming call · 9:47 PM",
    message: "Hi, is there space in Saturday's restorative yoga? It would be my first class.",
    rows: [
      { meta: "9:47 PM", title: "Answered", detail: "natural voice, in seconds" },
      { meta: "9:49 PM", title: "Qualified", detail: "first class · lower-back note" },
      { meta: "9:50 PM", title: "Booked", detail: "Saturday · 10:30 AM" },
      { meta: "9:50 PM", title: "SMS sent", detail: "confirmation · reply-enabled" },
    ],
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: "Hash",
    source: "Instagram DM · 8:18 PM",
    message: "Saw your beginner class reel. Is there a space tomorrow evening?",
    rows: [
      { meta: "8:18 PM", title: "Answered", detail: "prices and beginner options" },
      { meta: "8:19 PM", title: "Qualified", detail: "first visit · evening" },
      { meta: "8:20 PM", title: "Booked", detail: "Tuesday · 6:00 PM" },
      { meta: "8:20 PM", title: "DM sent", detail: "confirmation and directions" },
    ],
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: "MessageSquare",
    source: "WhatsApp · 10:06 PM",
    message: "Can I bring my daughter to the Saturday class, and what does it cost?",
    rows: [
      { meta: "10:06 PM", title: "Answered", detail: "age rules and price" },
      { meta: "10:07 PM", title: "Checked", detail: "Saturday availability" },
      { meta: "10:08 PM", title: "Booked", detail: "two places held" },
      { meta: "10:08 PM", title: "Message sent", detail: "details and what to bring" },
    ],
  },
  {
    value: "form",
    label: "Form",
    icon: "Reply",
    source: "Website form · 3:14 PM",
    message: "I am looking for a private session next week. Mornings work best.",
    rows: [
      { meta: "3:14 PM", title: "Replied", detail: "in minutes, not tomorrow" },
      { meta: "3:15 PM", title: "Qualified", detail: "private · morning" },
      { meta: "3:16 PM", title: "Offered", detail: "three live slots" },
      { meta: "3:19 PM", title: "Booked", detail: "Wednesday · 9:00 AM" },
    ],
  },
] as const satisfies readonly {
  value: string;
  label: string;
  icon: SolutionIcon;
  source: string;
  message: string;
  rows: readonly DemoRow[];
}[];

export const workExamples = [
  {
    title: "AI Account Researcher",
    problem: "Good prospect research takes time, so it often happens late or not at all.",
    before: [
      "Open company website",
      "Check LinkedIn",
      "Search recent news",
      "Read CRM notes",
      "Assemble a briefing",
    ],
    installed: [
      "Collect relevant sources",
      "Summarise useful signals",
      "Prepare a structured briefing",
    ],
    after: ["Read the briefing", "Add judgment", "Sell"],
  },
  {
    title: "Meeting → Action System",
    problem: "Actions disappear between the call, the notes, and the next busy day.",
    before: [
      "Find recording",
      "Write summary",
      "Pull out tasks",
      "Assign owners",
      "Send follow-up",
    ],
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
