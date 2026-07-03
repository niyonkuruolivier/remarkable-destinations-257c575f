import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/packages")({
  component: () => (
    <CrudTable
      table="packages"
      title="Packages"
      description="Safari itineraries and journeys."
      mediaPrefix="packages"
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "duration_days", label: "Duration (days)", type: "number" },
        { key: "price_from", label: "Price from", type: "number" },
        { key: "price_currency", label: "Currency", type: "text", colInList: false },
        { key: "price_on_request", label: "Price on request", type: "boolean", colInList: false },
        { key: "image_url", label: "Image", type: "image" },
        { key: "destinations", label: "Destinations (comma-separated)", type: "array", colInList: false },
        { key: "activities", label: "Activities (comma-separated)", type: "array", colInList: false },
        { key: "featured", label: "Featured", type: "boolean" },
        { key: "active", label: "Active", type: "boolean", colInList: false },
      ]}
    />
  ),
});
