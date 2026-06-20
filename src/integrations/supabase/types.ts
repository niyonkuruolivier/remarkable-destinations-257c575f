export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_avatar_url: string | null
          author_name: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published: boolean | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          title: string
        }
        Insert: {
          author_avatar_url?: string | null
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          title: string
        }
        Update: {
          author_avatar_url?: string | null
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          active: boolean | null
          best_months: string[] | null
          country: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          wildlife_highlights: string[] | null
        }
        Insert: {
          active?: boolean | null
          best_months?: string[] | null
          country: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          wildlife_highlights?: string[] | null
        }
        Update: {
          active?: boolean | null
          best_months?: string[] | null
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          wildlife_highlights?: string[] | null
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          active: boolean | null
          alt_text: string | null
          category: string
          created_at: string
          id: string
          image_url: string
          sort_order: number | null
          title: string | null
        }
        Insert: {
          active?: boolean | null
          alt_text?: string | null
          category: string
          created_at?: string
          id?: string
          image_url: string
          sort_order?: number | null
          title?: string | null
        }
        Update: {
          active?: boolean | null
          alt_text?: string | null
          category?: string
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number | null
          title?: string | null
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          interest: string | null
          message: string | null
          name: string
          phone: string | null
          source: string | null
          status: string | null
          travel_date: string | null
          travelers: number | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest?: string | null
          message?: string | null
          name: string
          phone?: string | null
          source?: string | null
          status?: string | null
          travel_date?: string | null
          travelers?: number | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          source?: string | null
          status?: string | null
          travel_date?: string | null
          travelers?: number | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          active: boolean | null
          activities: string[] | null
          created_at: string
          destinations: string[] | null
          duration_days: number | null
          featured: boolean | null
          id: string
          image_url: string | null
          name: string
          price_currency: string | null
          price_from: number | null
          price_on_request: boolean | null
          slug: string
        }
        Insert: {
          active?: boolean | null
          activities?: string[] | null
          created_at?: string
          destinations?: string[] | null
          duration_days?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          price_currency?: string | null
          price_from?: number | null
          price_on_request?: boolean | null
          slug: string
        }
        Update: {
          active?: boolean | null
          activities?: string[] | null
          created_at?: string
          destinations?: string[] | null
          duration_days?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          price_currency?: string | null
          price_from?: number | null
          price_on_request?: boolean | null
          slug?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          approved: boolean | null
          country: string | null
          country_flag: string | null
          created_at: string
          id: string
          quote: string
          rating: number | null
          safari_type: string | null
          traveler_name: string
          trip_date: string | null
        }
        Insert: {
          approved?: boolean | null
          country?: string | null
          country_flag?: string | null
          created_at?: string
          id?: string
          quote: string
          rating?: number | null
          safari_type?: string | null
          traveler_name: string
          trip_date?: string | null
        }
        Update: {
          approved?: boolean | null
          country?: string | null
          country_flag?: string | null
          created_at?: string
          id?: string
          quote?: string
          rating?: number | null
          safari_type?: string | null
          traveler_name?: string
          trip_date?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
