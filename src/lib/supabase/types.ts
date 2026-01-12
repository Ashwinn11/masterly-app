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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      individual_questions: {
        Row: {
          created_at: string | null
          id: string
          question_data: Json
          question_set_id: string
          question_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          question_data: Json
          question_set_id: string
          question_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          question_data?: Json
          question_set_id?: string
          question_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "individual_questions_question_set_id_fkey"
            columns: ["question_set_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          created_at: string | null
          extracted_text: string
          file_type: string
          file_url: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          extracted_text: string
          file_type: string
          file_url?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          extracted_text?: string
          file_type?: string
          file_url?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          onboarding_completed: boolean | null
          updated_at: string | null
          upload_count: number | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          onboarding_completed?: boolean | null
          updated_at?: string | null
          upload_count?: number | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          updated_at?: string | null
          upload_count?: number | null
          username?: string | null
        }
        Relationships: []
      }
      question_fsrs_state: {
        Row: {
          created_at: string | null
          difficulty: number | null
          id: string
          last_reviewed_at: string | null
          next_due_at: string | null
          question_id: string
          stability: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          difficulty?: number | null
          id?: string
          last_reviewed_at?: string | null
          next_due_at?: string | null
          question_id: string
          stability?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          difficulty?: number | null
          id?: string
          last_reviewed_at?: string | null
          next_due_at?: string | null
          question_id?: string
          stability?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_fsrs_state_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "individual_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string | null
          id: string
          material_id: string | null
          question_count: number | null
          question_data: Json
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          question_count?: number | null
          question_data: Json
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          question_count?: number | null
          question_data?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          attempts: number | null
          completed_at: string | null
          id: string
          is_correct: boolean | null
          question_id: string
          response_time_ms: number | null
          user_id: string
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id: string
          response_time_ms?: number | null
          user_id: string
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          id?: string
          is_correct?: boolean | null
          question_id?: string
          response_time_ms?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "individual_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          total_recalls: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          total_recalls?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          total_recalls?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      backfill_user_stats: { Args: never; Returns: undefined }
      delete_material: {
        Args: { p_material_id: string; p_user_id: string }
        Returns: Json
      }
      get_due_question_count: { Args: { p_user_id: string }; Returns: number }
      get_due_questions_for_play: {
        Args: { p_limit?: number; p_user_id: string }
        Returns: {
          difficulty: number
          id: string
          individual_question_id: string
          material_id: string
          next_due_at: string
          question_data: Json
          question_set_id: string
          question_type: string
          stability: number
        }[]
      }
      get_questions_for_material: {
        Args: { p_material_id: string; p_user_id: string }
        Returns: {
          id: string
          individual_question_id: string
          material_id: string
          question_data: Json
          question_set_id: string
          question_set_id_ref: string
          question_type: string
        }[]
      }
      get_user_questions: {
        Args: { user_uuid: string }
        Returns: {
          created_at: string | null
          id: string
          material_id: string | null
          question_count: number | null
          question_data: Json
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "questions"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_user_stats: { Args: { p_user_id: string }; Returns: Json }
      record_answer: {
        Args: {
          p_is_correct: boolean
          p_question_id: string
          p_response_time_ms: number
          p_update_fsrs?: boolean
          p_user_id: string
        }
        Returns: Json
      }
      save_questions: {
        Args: {
          p_material_id: string
          p_question_count: number
          p_question_data: Json
          p_user_id: string
        }
        Returns: Json
      }
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
