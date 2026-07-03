import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: () => (
    <CrudTable
      table="blog_posts"
      title="Blog Posts"
      description="Magazine articles and news."
      mediaPrefix="blog"
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "excerpt", label: "Excerpt", type: "textarea" },
        { key: "content", label: "Content (Markdown or HTML)", type: "textarea", colInList: false },
        { key: "category", label: "Category", type: "select", options: ["Field notes", "Planning", "Conservation", "Families", "Photography", "Honeymoons"] },
        { key: "featured_image_url", label: "Featured image", type: "image" },
        { key: "author_name", label: "Author", type: "text", colInList: false },
        { key: "author_avatar_url", label: "Author avatar", type: "image", colInList: false },
        { key: "seo_title", label: "SEO title", type: "text", colInList: false },
        { key: "seo_description", label: "SEO description", type: "textarea", colInList: false },
        { key: "published_at", label: "Published at (YYYY-MM-DD)", type: "text", colInList: false },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  ),
});
