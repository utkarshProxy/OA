import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CONTACT_FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc9ag3nN_qLcSzRL6_Htl7jHh-CtQSf1xd-QAh5KzA3D7E_0Q/formResponse";
const OPPORTUNITY_FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdGO2E685fEhkrpC6EN8lvsHbQzjLOji9LKPn2O8YHZEbZxNA/formResponse";

const CONTACT_FORM_FIELDS = {
  name: "entry.1332932639",
  email: "entry.1867795823",
  company: "entry.1477064106",
  message: "entry.1136254533",
} as const;

const OPPORTUNITY_FORM_FIELDS = {
  name: "entry.1824366337",
  email: "entry.1059725457",
  company: "entry.60863768",
  whatsapp: "entry.418170220",
  answers: "entry.1649746277",
  recommendations: "entry.455426300",
  hoursEstimate: "entry.199273406",
} as const;

const submissionSchema = z
  .object({
    source: z.enum(["contact", "opportunity-finder"]),
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254),
    company: z.string().trim().min(1).max(120),
    message: z.string().trim().max(3000).optional(),
    whatsapp: z.string().trim().max(30).optional(),
    answers: z.record(z.string(), z.string().trim().max(1000)).optional(),
    recommendations: z.array(z.enum(["sales", "marketing", "operations", "knowledge", "custom"])).max(3).optional(),
    hoursEstimate: z.string().trim().max(20).optional(),
    website: z.string().max(200).optional(),
  })
  .strict();

const recentSubmissions = new Map<string, { count: number; resetAt: number }>();

function formatAnswers(answers: Record<string, string> | undefined): string {
  if (!answers) return "";
  return Object.entries(answers)
    .map(([id, answer]) => `${id}: ${answer.trim() || "(skipped)"}`)
    .join("\n");
}

function buildContactMessage(data: z.infer<typeof submissionSchema>): string {
  const sections = [data.message?.trim()];
  const answers = formatAnswers(data.answers);
  if (answers) sections.push(`Opportunity finder answers:\n${answers}`);
  if (data.source === "opportunity-finder") sections.push("Source: AI opportunity finder");
  return sections.filter(Boolean).join("\n\n");
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => submissionSchema.parse(data))
  .handler(async ({ data }) => {
    // Quietly accept honeypot submissions without sending data to Google.
    if (data.website?.trim()) return { success: true };

    const key = data.email.toLowerCase();
    const now = Date.now();
    const current = recentSubmissions.get(key);
    if (current && current.resetAt > now && current.count >= 3) {
      throw new Error("Too many submissions. Please try again later.");
    }

    const isOpportunityFinder = data.source === "opportunity-finder";
    const formData = isOpportunityFinder
      ? new URLSearchParams({
          [OPPORTUNITY_FORM_FIELDS.name]: data.name,
          [OPPORTUNITY_FORM_FIELDS.email]: data.email,
          [OPPORTUNITY_FORM_FIELDS.company]: data.company,
          [OPPORTUNITY_FORM_FIELDS.whatsapp]: data.whatsapp ?? "",
          [OPPORTUNITY_FORM_FIELDS.answers]: formatAnswers(data.answers),
          [OPPORTUNITY_FORM_FIELDS.recommendations]: (data.recommendations ?? []).join(", "),
          [OPPORTUNITY_FORM_FIELDS.hoursEstimate]: data.hoursEstimate ?? "",
        })
      : new URLSearchParams({
          [CONTACT_FORM_FIELDS.name]: data.name,
          [CONTACT_FORM_FIELDS.email]: data.email,
          [CONTACT_FORM_FIELDS.company]: data.company,
          [CONTACT_FORM_FIELDS.message]: buildContactMessage(data),
        });

    const responseUrl = isOpportunityFinder
      ? OPPORTUNITY_FORM_RESPONSE_URL
      : CONTACT_FORM_RESPONSE_URL;

    try {
      const response = await fetch(responseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Google Form submission failed (${response.status})`);
      }

      recentSubmissions.set(key, {
        count: current && current.resetAt > now ? current.count + 1 : 1,
        resetAt:
          current && current.resetAt > now
            ? current.resetAt
            : now + 15 * 60 * 1000,
      });

      return { success: true };
    } catch (error) {
      console.error("Website form delivery error:", error);
      throw new Error("Website form delivery failed");
    }
  });
