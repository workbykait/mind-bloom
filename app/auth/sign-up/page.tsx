import { createClient } from "@/lib/supabase/server"
import SignUpForm from "@/components/signup-form"

export default async function SignUpPage() {
  // Check if user is already logged in
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <SignUpForm isLoggedIn={!!session} />
    </div>
  )
}
