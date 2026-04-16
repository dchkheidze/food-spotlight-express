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
      addon_purchases: {
        Row: {
          addon_type: Database["public"]["Enums"]["addon_type"]
          amount_gel: number
          created_at: string
          id: string
          is_active: boolean | null
          restaurant_id: string
          stripe_payment_id: string | null
          valid_from: string
          valid_until: string | null
        }
        Insert: {
          addon_type: Database["public"]["Enums"]["addon_type"]
          amount_gel: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          restaurant_id: string
          stripe_payment_id?: string | null
          valid_from?: string
          valid_until?: string | null
        }
        Update: {
          addon_type?: Database["public"]["Enums"]["addon_type"]
          amount_gel?: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          restaurant_id?: string
          stripe_payment_id?: string | null
          valid_from?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addon_purchases_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          country: string | null
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      cuisines: {
        Row: {
          created_at: string
          emoji: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          emoji?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          emoji?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      dishes: {
        Row: {
          category: string | null
          created_at: string
          currency: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          is_featured: boolean | null
          name: string
          price: number | null
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_featured?: boolean | null
          name: string
          price?: number | null
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_featured?: boolean | null
          name?: string
          price?: number | null
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dishes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          id: string
          job_id: string
          status: Database["public"]["Enums"]["application_status"] | null
          user_id: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_id: string
          status?: Database["public"]["Enums"]["application_status"] | null
          user_id: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          id?: string
          job_id?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      job_seekers: {
        Row: {
          about: string | null
          city: string | null
          created_at: string
          cv_url: string | null
          full_name: string
          id: string
          job_categories: string[] | null
          phone: string | null
          schedule_types: string[] | null
          title: string | null
          updated_at: string
          user_id: string
          visibility_status:
            | Database["public"]["Enums"]["visibility_status"]
            | null
        }
        Insert: {
          about?: string | null
          city?: string | null
          created_at?: string
          cv_url?: string | null
          full_name: string
          id?: string
          job_categories?: string[] | null
          phone?: string | null
          schedule_types?: string[] | null
          title?: string | null
          updated_at?: string
          user_id: string
          visibility_status?:
            | Database["public"]["Enums"]["visibility_status"]
            | null
        }
        Update: {
          about?: string | null
          city?: string | null
          created_at?: string
          cv_url?: string | null
          full_name?: string
          id?: string
          job_categories?: string[] | null
          phone?: string | null
          schedule_types?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string
          visibility_status?:
            | Database["public"]["Enums"]["visibility_status"]
            | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          city: string | null
          created_at: string
          currency: string | null
          description: string | null
          employment_type: string | null
          id: string
          published_at: string | null
          restaurant_id: string
          salary_max: number | null
          salary_min: number | null
          slug: string
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          published_at?: string | null
          restaurant_id: string
          salary_max?: number | null
          salary_min?: number | null
          slug: string
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          published_at?: string | null
          restaurant_id?: string
          salary_max?: number | null
          salary_min?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhoods: {
        Row: {
          city_id: string
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          city_id: string
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          city_id?: string
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "neighborhoods_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      promo_posts: {
        Row: {
          body: string | null
          created_at: string
          expires_at: string | null
          id: string
          image_url: string | null
          published_at: string | null
          restaurant_id: string
          status: Database["public"]["Enums"]["promo_post_status"]
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          restaurant_id: string
          status?: Database["public"]["Enums"]["promo_post_status"]
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          restaurant_id?: string
          status?: Database["public"]["Enums"]["promo_post_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "promo_posts_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string | null
          avg_rating: number | null
          city_id: string | null
          cover_image_url: string | null
          created_at: string
          cuisine_tags: string[] | null
          description: string | null
          features: string[] | null
          id: string
          instagram_url: string | null
          is_published: boolean | null
          is_verified: boolean | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          name: string
          neighborhood_id: string | null
          opening_hours: Json | null
          owner_user_id: string
          phone: string | null
          price_level: Database["public"]["Enums"]["price_level"] | null
          review_count: number | null
          slug: string | null
          subscription_expires_at: string | null
          subscription_started_at: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          video_cover_url: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          avg_rating?: number | null
          city_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          cuisine_tags?: string[] | null
          description?: string | null
          features?: string[] | null
          id?: string
          instagram_url?: string | null
          is_published?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name: string
          neighborhood_id?: string | null
          opening_hours?: Json | null
          owner_user_id: string
          phone?: string | null
          price_level?: Database["public"]["Enums"]["price_level"] | null
          review_count?: number | null
          slug?: string | null
          subscription_expires_at?: string | null
          subscription_started_at?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          video_cover_url?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          avg_rating?: number | null
          city_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          cuisine_tags?: string[] | null
          description?: string | null
          features?: string[] | null
          id?: string
          instagram_url?: string | null
          is_published?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          name?: string
          neighborhood_id?: string | null
          opening_hours?: Json | null
          owner_user_id?: string
          phone?: string | null
          price_level?: Database["public"]["Enums"]["price_level"] | null
          review_count?: number | null
          slug?: string | null
          subscription_expires_at?: string | null
          subscription_started_at?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          video_cover_url?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurants_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          body: string | null
          created_at: string
          id: string
          image_urls: string[] | null
          is_published: boolean | null
          rating: number
          restaurant_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          is_published?: boolean | null
          rating: number
          restaurant_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          is_published?: boolean | null
          rating?: number
          restaurant_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      supplier_offers: {
        Row: {
          created_at: string
          currency: string | null
          description: string | null
          id: string
          is_active: boolean | null
          price_from: number | null
          supplier_id: string
          title: string
          type: Database["public"]["Enums"]["offer_type"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          price_from?: number | null
          supplier_id: string
          title: string
          type?: Database["public"]["Enums"]["offer_type"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          price_from?: number | null
          supplier_id?: string
          title?: string
          type?: Database["public"]["Enums"]["offer_type"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_offers_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          categories: string[] | null
          city: string | null
          cover_image_url: string | null
          coverage_areas: string[] | null
          created_at: string
          description: string | null
          id: string
          is_published: boolean | null
          logo_url: string | null
          name: string
          owner_user_id: string
          phone: string | null
          slug: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          categories?: string[] | null
          city?: string | null
          cover_image_url?: string | null
          coverage_areas?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          logo_url?: string | null
          name: string
          owner_user_id: string
          phone?: string | null
          slug?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          categories?: string[] | null
          city?: string | null
          cover_image_url?: string | null
          coverage_areas?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean | null
          logo_url?: string | null
          name?: string
          owner_user_id?: string
          phone?: string | null
          slug?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      addon_type:
        | "homepage_spotlight"
        | "category_pin"
        | "extra_promo_post"
        | "job_board_post"
        | "push_notification_blast"
        | "new_opening_feature"
      app_role: "restaurant" | "supplier" | "jobseeker" | "admin"
      application_status:
        | "APPLIED"
        | "SHORTLISTED"
        | "INTERVIEW"
        | "OFFERED"
        | "REJECTED"
        | "HIRED"
      job_status: "DRAFT" | "PUBLISHED" | "CLOSED"
      offer_type: "PRODUCT" | "SERVICE"
      price_level: "budget" | "moderate" | "upscale" | "fine_dining"
      promo_post_status: "draft" | "scheduled" | "published" | "expired"
      subscription_tier: "freemium" | "standard" | "premium"
      visibility_status: "PRIVATE" | "PUBLIC"
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
    Enums: {
      addon_type: [
        "homepage_spotlight",
        "category_pin",
        "extra_promo_post",
        "job_board_post",
        "push_notification_blast",
        "new_opening_feature",
      ],
      app_role: ["restaurant", "supplier", "jobseeker", "admin"],
      application_status: [
        "APPLIED",
        "SHORTLISTED",
        "INTERVIEW",
        "OFFERED",
        "REJECTED",
        "HIRED",
      ],
      job_status: ["DRAFT", "PUBLISHED", "CLOSED"],
      offer_type: ["PRODUCT", "SERVICE"],
      price_level: ["budget", "moderate", "upscale", "fine_dining"],
      promo_post_status: ["draft", "scheduled", "published", "expired"],
      subscription_tier: ["freemium", "standard", "premium"],
      visibility_status: ["PRIVATE", "PUBLIC"],
    },
  },
} as const
