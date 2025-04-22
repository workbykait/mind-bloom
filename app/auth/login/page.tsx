import { createClient } from "@/lib/supabase/server"
import LoginForm from "@/components/login-form"
import { isSupabaseConfigured } from "@/lib/supabase/middleware"

export default async function LoginPage() {
  // Check if user is already logged in, only if Supabase is configured
  let session = null

  if (isSupabaseConfigured) {
    const supabase = createClient()
    const {
      data: { session: sessionData },
    } = await supabase.auth.getSession()
    session = sessionData
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm isLoggedIn={!!session} />
    </div>
  )
}
