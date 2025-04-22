import { xai } from "@ai-sdk/xai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()

  // Add system prompt for therapy context
  const messagesWithSystem = [
    {
      role: "system",
      content:
        "You are Mind-Bloom, an empathetic AI therapy companion. Your goal is to provide supportive, thoughtful responses to users seeking mental health support. Be compassionate, non-judgmental, and focus on active listening. Avoid giving medical advice or diagnosing conditions. Instead, encourage healthy coping strategies, mindfulness, and professional help when appropriate.",
    },
    ...messages,
  ]

  // Call the language model
  const result = streamText({
    model: xai("grok-3"),
    messages: messagesWithSystem,
  })

  // Respond with the stream
  return result.toDataStreamResponse()
}
