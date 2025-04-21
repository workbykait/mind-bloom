import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@/lib/actions"

export default async function Home() {
  // Get the user from the server
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-gray-800 dark:text-gray-200">Mind-Bloom</h1>

        {user ? (
          <>
            <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">Welcome, {user.email}</p>
            <form action={signOut}>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </>
        ) : (
          <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">Your AI therapy companion</p>
        )}
      </div>
    </div>
  )
}
