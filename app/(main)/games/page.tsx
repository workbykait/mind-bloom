import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, AlertTriangle } from "lucide-react"

export default function GamesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Mind-Bloom Games</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl">
          Enhance your critical thinking and emergency response skills with these interactive games.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              <CardTitle>Critical Thinking</CardTitle>
            </div>
            <CardDescription>Test your ability to identify logical fallacies and evaluate evidence</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              This game presents scenarios that challenge your critical thinking skills. Identify logical fallacies,
              evaluate evidence, and distinguish between correlation and causation.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/games/critical-thinking" passHref>
              <Button className="w-full bg-gray-800 hover:bg-gray-700">Play Game</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle>Hazard Handling</CardTitle>
            </div>
            <CardDescription>Practice making quick decisions in emergency situations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Test your ability to respond to common household and environmental hazards. Make quick decisions under
              time pressure and learn the safest responses to various emergencies.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/games/hazard-handling" passHref>
              <Button className="w-full bg-gray-800 hover:bg-gray-700">Play Game</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">More games coming soon! Check back for updates.</p>
        <Link href="/" passHref>
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
