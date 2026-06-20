import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/journeys")({
  head: () => ({
    meta: [
      { title: "Journeys — Remarkable Destinations" },
      { name: "description", content: "Bespoke African safaris by Remarkable Destinations." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Journeys"
      title="Quietly composed."
      body="This chapter of our atelier is being written. For now, every journey is bespoke — please write to us and we will design yours by hand."
    />
  ),
});
