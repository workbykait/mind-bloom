"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing up...
        </>
      ) : (
        "Sign Up"
      )}
    </Button>
  )
}

export default function SignUpForm({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const router = useRouter()
  // Initialize with null as the initial state
  const [state, formAction] = useActionState(signUp, null)

  if (isLoggedIn) {
    return (
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Already Logged In</h1>
          <p className="text-gray-500 dark:text-gray-400">You are already signed in to your account</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => router.push("/")} className="bg-gray-800 hover:bg-gray-700 text-white">
            Go to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400">Sign up to get started</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-700 px-4 py-3 rounded">{state.error}</div>
        )}

        {state?.success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-700 px-4 py-3 rounded">
            {state.success}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input id="password" name="password" type="password" required />
          </div>
        </div>

        <SubmitButton />

        <div className="text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-gray-800 hover:underline dark:text-gray-300">
            Log in
          </Link>
        </div>
      </form>
    </div>
  )
}
