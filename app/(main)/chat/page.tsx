"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  complete?: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm Mind-Bloom, your AI therapy companion. How are you feeling today?",
      complete: true,
    },
  ])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [selectedModel, setSelectedModel] = useState("grok-3")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isStreaming) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      complete: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Create assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      complete: false,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsStreaming(true)

    // Simulate streaming response
    const responses = getTherapyResponse(input)
    let responseIndex = 0
    let currentResponse = ""

    const streamInterval = setInterval(() => {
      if (responseIndex < responses.length) {
        currentResponse += responses[responseIndex]
        responseIndex++

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: currentResponse } : msg)),
        )
      } else {
        clearInterval(streamInterval)
        setMessages((prev) => prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, complete: true } : msg)))
        setIsStreaming(false)
      }
    }, 30) // Stream each character with a 30ms delay
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Therapy Chat</h1>
        <div className="flex items-center">
          <span className="text-sm mr-2">Model:</span>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grok-3">Grok-3</SelectItem>
              <SelectItem value="grok-2">Grok-2</SelectItem>
              <SelectItem value="grok-1">Grok-1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} max-w-[80%] gap-3`}>
              <Avatar className="h-8 w-8">
                {message.role === "user" ? (
                  <>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Mind-Bloom" />
                    <AvatarFallback>AI</AvatarFallback>
                  </>
                )}
              </Avatar>
              <Card
                className={`p-3 ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
                {!message.complete && (
                  <div className="mt-1 flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-150"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse delay-300"></div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isStreaming}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isStreaming} className="bg-blue-500 hover:bg-blue-600">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

// Helper function to simulate therapy responses
function getTherapyResponse(userInput: string): string[] {
  const lowerInput = userInput.toLowerCase()

  if (lowerInput.includes("anxious") || lowerInput.includes("anxiety")) {
    return "I understand that anxiety can be challenging. It's a normal response to stress, but it can become overwhelming. Have you noticed any specific triggers for your anxiety? Sometimes identifying patterns can help us develop coping strategies.".split(
      "",
    )
  } else if (lowerInput.includes("sad") || lowerInput.includes("depress")) {
    return "I'm sorry to hear you're feeling down. Depression and sadness are complex emotions that many people experience. Would you like to talk more about what might be contributing to these feelings? Remember that seeking support is a sign of strength, not weakness.".split(
      "",
    )
  } else if (lowerInput.includes("stress") || lowerInput.includes("overwhelm")) {
    return "Feeling stressed and overwhelmed is common in our busy lives. Let's break this down:\n\n1. What specific situations are causing you stress?\n2. How is this affecting your daily life?\n3. What self-care activities have helped you in the past?\n\nTaking small steps to address stress can make a big difference.".split(
      "",
    )
  } else {
    return "Thank you for sharing that with me. I'm here to listen and support you. Could you tell me more about how these feelings are affecting your daily life? Understanding your experience better will help us explore potential strategies together.".split(
      "",
    )
  }
}
