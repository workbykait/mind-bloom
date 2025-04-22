import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"
import type { Database } from "@/types/supabase"
import { isSupabaseConfigured } from "@/lib/supabase/middleware"

// Create a cached version of the Supabase client for Server Components
export const createClient = cache(() => {
  // If Supabase is not configured, return a mock client
  if (!isSupabaseConfigured) {
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      },
    } as any
  }

  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})
