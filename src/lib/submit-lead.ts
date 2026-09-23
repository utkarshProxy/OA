import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GOOGLE_FORM_RESPONSE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc9ag3nN_qLcSzRL6_Htl7jHh-CtQSf1xd-QAh5KzA3D7E_0Q/formResponse";

const GOOGLE_FORM_FIELDS = {
  name: "entry.1332932639",
  email: "entry.1867795823",
  company: "entry.1477064106",
  message: "entry.1136254533",
} as const;

const submissionSchema = z
  .object({
    source: z.enum(["contact", "opportunity-finder"]),
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254),
    company: z.string().trim().min(1).max(120),
    message: z.string().trim().max(3000).optional(),
    answers: z.array(z.string().trim().max(120)).max(6).optional(),
    website: z.string().max(200).optional(),
  })
  .strict();

const recentSubmissions = new Map<string, { count: number; resetAt: number }>();

function buildMessage(data: z.infer<typeof submissionSchema>): string {
  const sections = [data.message?.trim()];

  if (data.answers?.length) {
    sections.push(
      `Opportunity finder answers:\n${data.answers
        .map((answer, index) => `${index + 1}. ${answer}`)
        .join("\n")}`,
    );
  }

  if (data.source === "opportunity-finder") {
    sections.push("Source: AI opportunity finder");
  }

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

    const formData = new URLSearchParams({
      [GOOGLE_FORM_FIELDS.name]: data.name,
      [GOOGLE_FORM_FIELDS.email]: data.email,
      [GOOGLE_FORM_FIELDS.company]: data.company,
      [GOOGLE_FORM_FIELDS.message]: buildMessage(data),
    });

    try {
      const response = await fetch(GOOGLE_FORM_RESPONSE_URL, {
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
