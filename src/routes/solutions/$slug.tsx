import { createFileRoute, notFound } from "@tanstack/react-router";
import { getSolution } from "@/lib/site-content";
import { SolutionSystemPage } from "@/components/solution-system-page";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return solution;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "AI system"} — OBOU Automations` },
      {
        name: "description",
        content: loaderData?.page.hero.lede ?? "A practical AI system built around your business.",
      },
    ],
  }),
  component: () => <SolutionSystemPage solution={Route.useLoaderData()} />,
});
