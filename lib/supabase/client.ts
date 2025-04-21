import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

// This ensures the client is only created once in the browser
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export const getSupabaseClient = () => {
  if (typeof window === "undefined") {
    // Server-side - create a new client each time
    return createClientComponentClient<Database>()
  }

  // Client-side - use singleton pattern
  if (!supabaseClient) {
    supabaseClient = createClientComponentClient<Database>()
  }

  return supabaseClient
}

// For backward compatibility and direct imports
export const supabase = getSupabaseClient()
