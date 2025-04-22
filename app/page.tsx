import { createClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/supabase/middleware"

export default async function Home() {
  // Get the user from the server only if Supabase is configured
  let user = null

  if (isSupabaseConfigured) {
    const supabase = createClient()
    const {
      data: { user: userData },
    } = await supabase.auth.getUser()
    user = userData
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-gray-800 dark:text-gray-100">Mind-Bloom</h1>

        {user ? (
          <>
            <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">Welcome, {user.email}</p>
            <form action="/api/auth/signout" method="post">
              <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">Your AI therapy companion</p>
        )}
      </div>
    </div>
  )
}
