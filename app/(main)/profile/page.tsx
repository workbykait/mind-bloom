"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, ChevronRight, Menu } from "lucide-react"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Mock chat history data
const chatHistory = [
  { id: 1, title: "Chat on 4/21/2025", preview: "I've been feeling anxious lately..." },
  { id: 2, title: "Chat on 4/18/2025", preview: "Today was a good day, I managed to..." },
  { id: 3, title: "Chat on 4/15/2025", preview: "I'm having trouble sleeping..." },
  { id: 4, title: "Chat on 4/10/2025", preview: "Work has been stressful..." },
]

export default function ProfilePage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const router = useRouter()

  const handleLogout = () => {
    toast.success("Logged out successfully")
    router.push("/login")
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <ProfileSidebar onLogout={handleLogout} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 border-r bg-gray-100 dark:bg-gray-800">
        <ProfileSidebar onLogout={handleLogout} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="grid gap-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Chat History</h2>
            <div className="grid gap-4">
              {chatHistory.map((chat) => (
                <Card
                  key={chat.id}
                  className={`cursor-pointer transition-colors ${selectedChat === chat.id ? "border-blue-500" : ""}`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex justify-between items-center">
                      {chat.title}
                      <ChevronRight className="h-4 w-4" />
                    </CardTitle>
                  </CardHeader>
                  {selectedChat === chat.id && (
                    <CardContent className="p-4 pt-0 text-sm text-gray-500">{chat.preview}</CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Mood Tracker</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 h-40 flex items-center justify-center text-gray-400">
                  Coming soon
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Journal Entries</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 h-40 flex items-center justify-center text-gray-400">
                  Coming soon
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function ProfileSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Jane Doe</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">jane@example.com</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account</h3>
        <Button variant="ghost" className="w-full justify-start">
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          Subscription
        </Button>
      </div>

      <Button variant="outline" className="mt-auto w-full" onClick={onLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </div>
  )
}
