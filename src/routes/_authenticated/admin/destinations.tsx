import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/destinations")({
  component: () => (
    <CrudTable
      table="destinations"
      title="Destinations"
      description="Countries and regions displayed across the site."
      mediaPrefix="destinations"
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "country", label: "Country", type: "text", required: true, colInList: false },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image_url", label: "Image", type: "image" },
        { key: "wildlife_highlights", label: "Wildlife highlights (comma-separated)", type: "array", colInList: false },
        { key: "best_months", label: "Best months (comma-separated)", type: "array", colInList: false },
        { key: "active", label: "Active", type: "boolean" },
      ]}
    />
  ),
});
