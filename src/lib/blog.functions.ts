import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getPublishedBlogPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  }
);
