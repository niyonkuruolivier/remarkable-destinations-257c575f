import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Remarkable Destinations" },
      { name: "description", content: "Bespoke African safaris by Remarkable Destinations." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Gallery"
      title="Quietly composed."
      body="This chapter of our atelier is being written. For now, every journey is bespoke — please write to us and we will design yours by hand."
    />
  ),
});
