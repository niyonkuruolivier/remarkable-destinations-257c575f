import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  component: () => (
    <CrudTable
      table="testimonials"
      title="Testimonials"
      description="Traveler stories and quotes."
      fields={[
        { key: "traveler_name", label: "Traveler name", type: "text", required: true },
        { key: "quote", label: "Quote", type: "textarea", required: true },
        { key: "country", label: "Country", type: "text" },
        { key: "country_flag", label: "Country flag emoji", type: "text", colInList: false },
        { key: "rating", label: "Rating (1–5)", type: "number", colInList: false },
        { key: "safari_type", label: "Safari type", type: "text", colInList: false },
        { key: "trip_date", label: "Trip date (YYYY-MM-DD)", type: "text", colInList: false },
        { key: "approved", label: "Approved", type: "boolean" },
      ]}
    />
  ),
});
