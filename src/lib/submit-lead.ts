import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RECIPIENT = "contact@utkarshsharma.in";
const MAIL_API = "https://api.mail.hostinger.com/api/v1";

const submissionSchema = z.object({
  source: z.enum(["contact", "opportunity-finder"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(1).max(120),
  message: z.string().trim().max(3000).optional(),
  answers: z.array(z.string().trim().max(120)).max(6).optional(),
  website: z.string().max(200).optional(),
}).strict();

let mailboxId: string | undefined;
const recentSubmissions = new Map<string, { count: number; resetAt: number }>();

async function getMailboxId(token: string): Promise<string> {
  if (mailboxId) return mailboxId;

  const response = await fetch(`${MAIL_API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Mail account lookup failed (${response.status})`);

  const account = await response.json() as {
    data?: { mailboxes?: Array<{ resourceId: string; address: string }> };
  };
  const mailbox = account.data?.mailboxes?.find(
    (entry) => entry.address.toLowerCase() === RECIPIENT,
  );
  if (!mailbox) throw new Error("The form delivery mailbox is unavailable");
  mailboxId = mailbox.resourceId;
  return mailboxId;
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => submissionSchema.parse(data))
  .handler(async ({ data }) => {
    // Quietly accept honeypot submissions without sending mail.
    if (data.website?.trim()) return { success: true };

    const key = data.email.toLowerCase();
    const now = Date.now();
    const current = recentSubmissions.get(key);
    if (current && current.resetAt > now && current.count >= 3) {
      throw new Error("Too many submissions. Please try again later.");
    }

    const token = process.env["HOSTINGER_MAIL_API_TOKEN"];
    if (!token) throw new Error("Form email delivery is not configured");

    try {
      const id = await getMailboxId(token);
      const details = [
        `Name: ${data.name}`,
        `Work email: ${data.email}`,
        `Company: ${data.company}`,
        `Source: ${data.source === "contact" ? "Contact page" : "Opportunity finder"}`,
      ];
      if (data.message) details.push("", "Where work gets stuck:", data.message);
      if (data.answers?.length) {
        details.push("", "Opportunity finder answers:");
        data.answers.forEach((answer, index) => details.push(`${index + 1}. ${answer}`));
      }

      const response = await fetch(`${MAIL_API}/mailboxes/${encodeURIComponent(id)}/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: [RECIPIENT],
          displayName: "OBOU website",
          subject: data.source === "contact"
            ? "New website workflow enquiry"
            : "New AI opportunity finder enquiry",
          text: details.join("\n"),
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`Mail send failed (${response.status})`);

      recentSubmissions.set(key, {
        count: current && current.resetAt > now ? current.count + 1 : 1,
        resetAt: current && current.resetAt > now ? current.resetAt : now + 15 * 60 * 1000,
      });
      return { success: true };
    } catch (error) {
      // Keep provider details server-side; never expose the token or request body.
      console.error("Website form delivery error:", error);
      throw new Error("Website form delivery failed");
    }
  });
