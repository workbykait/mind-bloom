"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare, User, Gamepad, LogIn, Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">Mind-Bloom</span>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/" passHref>
            <Button variant={pathname === "/" ? "default" : "ghost"} size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <Link href="/chat" passHref>
            <Button variant={pathname.includes("/chat") ? "default" : "ghost"} size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </Button>
          </Link>
          <Link href="/profile" passHref>
            <Button variant={pathname.includes("/profile") ? "default" : "ghost"} size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </Link>
          <Link href="/game" passHref>
            <Button variant={pathname.includes("/game") ? "default" : "ghost"} size="sm" className="gap-2">
              <Gamepad className="h-4 w-4" />
              <span className="hidden sm:inline">Game</span>
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant={pathname.includes("/login") ? "default" : "ghost"} size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
