import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"
import { isSupabaseConfigured } from "@/lib/supabase/middleware"

// This ensures the client is only created once in the browser
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export const getSupabaseClient = () => {
  if (!isSupabaseConfigured) {
    // Return a mock client if Supabase is not configured
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      },
    } as any
  }

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
