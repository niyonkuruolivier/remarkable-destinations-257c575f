import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: () => (
    <CrudTable
      table="gallery_items"
      title="Gallery"
      description="Uploaded images for the gallery."
      mediaPrefix="gallery"
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "category", label: "Category", type: "select", required: true, options: ["Wildlife", "Landscapes", "Lodges", "People"] },
        { key: "image_url", label: "Image", type: "image" },
        { key: "alt_text", label: "Alt text", type: "text", colInList: false },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "active", label: "Active", type: "boolean" },
      ]}
    />
  ),
});
