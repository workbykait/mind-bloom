export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      // Add your tables here when you create them
      // For example:
      // profiles: {
      //   Row: {
      //     id: string
      //     name: string
      //     email: string
      //     created_at: string
      //   }
      //   Insert: {
      //     id: string
      //     name?: string
      //     email: string
      //     created_at?: string
      //   }
      //   Update: {
      //     id?: string
      //     name?: string
      //     email?: string
      //     created_at?: string
      //   }
      // }
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
  }
}
