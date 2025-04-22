"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

type Scenario = {
  id: number
  title: string
  description: string
  options: {
    id: string
    text: string
    correct: boolean
    feedback: string
  }[]
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Logical Fallacy Detection",
    description:
      "Your friend says: 'Everyone is buying this new smartphone, so it must be the best one on the market.' What type of logical fallacy is this?",
    options: [
      {
        id: "a",
        text: "Appeal to authority",
        correct: false,
        feedback: "Appeal to authority involves citing an authority figure to support an argument.",
      },
      {
        id: "b",
        text: "Appeal to popularity (Bandwagon fallacy)",
        correct: true,
        feedback:
          "Correct! This is an appeal to popularity, suggesting something is good or true because it's popular.",
      },
      {
        id: "c",
        text: "False dilemma",
        correct: false,
        feedback: "A false dilemma presents only two options when more exist.",
      },
      {
        id: "d",
        text: "Slippery slope",
        correct: false,
        feedback: "Slippery slope suggests one event will lead to a chain of negative events.",
      },
    ],
  },
  {
    id: 2,
    title: "Evidence Evaluation",
    description:
      "You read a news article claiming a new diet can cure various health conditions. The article cites 'many doctors' but names none specifically. How would you evaluate this claim?",
    options: [
      {
        id: "a",
        text: "Accept it because it was published in a news article",
        correct: false,
        feedback: "Publication alone doesn't guarantee accuracy.",
      },
      {
        id: "b",
        text: "Reject it immediately as false",
        correct: false,
        feedback: "Immediate rejection without investigation isn't critical thinking.",
      },
      {
        id: "c",
        text: "Look for specific studies, named experts, and peer-reviewed research",
        correct: true,
        feedback: "Correct! Seeking specific, verifiable evidence is the best approach.",
      },
      {
        id: "d",
        text: "Ask friends if they've tried the diet",
        correct: false,
        feedback: "Anecdotal evidence isn't reliable for evaluating health claims.",
      },
    ],
  },
  {
    id: 3,
    title: "Correlation vs. Causation",
    description:
      "A study shows that cities with more ice cream sales have higher crime rates. What's the most reasonable conclusion?",
    options: [
      {
        id: "a",
        text: "Ice cream causes criminal behavior",
        correct: false,
        feedback: "This assumes causation from correlation.",
      },
      {
        id: "b",
        text: "Criminals prefer ice cream",
        correct: false,
        feedback: "This also assumes a direct relationship without evidence.",
      },
      {
        id: "c",
        text: "Both are likely influenced by a third factor (like warmer weather)",
        correct: true,
        feedback:
          "Correct! This recognizes that correlation doesn't imply causation and suggests a confounding variable.",
      },
      {
        id: "d",
        text: "The study must be flawed",
        correct: false,
        feedback: "Dismissing data without analysis isn't critical thinking.",
      },
    ],
  },
]

export default function CriticalThinkingGame() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [scenariosCompleted, setScenariosCompleted] = useState(0)

  useEffect(() => {
    // Start with a random scenario
    const randomIndex = Math.floor(Math.random() * scenarios.length)
    setCurrentScenario(scenarios[randomIndex])
  }, [])

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return

    setSelectedOption(optionId)
    setIsAnswered(true)

    const option = currentScenario?.options.find((opt) => opt.id === optionId)

    if (option?.correct) {
      setScore(score + 1)
      toast.success("Correct answer!")
    } else {
      toast.error("Incorrect answer.")
    }

    setScenariosCompleted(scenariosCompleted + 1)
  }

  const handleNextScenario = () => {
    // Filter out the current scenario
    const remainingScenarios = scenarios.filter((s) => s.id !== currentScenario?.id)

    if (remainingScenarios.length > 0) {
      // Get a random scenario from the remaining ones
      const randomIndex = Math.floor(Math.random() * remainingScenarios.length)
      setCurrentScenario(remainingScenarios[randomIndex])
    } else {
      // If all scenarios have been used, reset with all scenarios
      const randomIndex = Math.floor(Math.random() * scenarios.length)
      setCurrentScenario(scenarios[randomIndex])
    }

    setSelectedOption(null)
    setIsAnswered(false)
  }

  const resetGame = () => {
    setScore(0)
    setScenariosCompleted(0)
    const randomIndex = Math.floor(Math.random() * scenarios.length)
    setCurrentScenario(scenarios[randomIndex])
    setSelectedOption(null)
    setIsAnswered(false)
  }

  if (!currentScenario) {
    return <div className="flex justify-center items-center h-[calc(100vh-4rem)]">Loading...</div>
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">{currentScenario.title}</CardTitle>
              <CardDescription>Critical Thinking Exercise</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                Score: {score}/{scenariosCompleted}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">{currentScenario.description}</p>

          <div className="space-y-3">
            {currentScenario.options.map((option) => (
              <div key={option.id}>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left p-4 h-auto ${
                    isAnswered && option.id === selectedOption
                      ? option.correct
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : isAnswered && option.correct
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : ""
                  }`}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={isAnswered}
                >
                  <span className="font-medium mr-2">{option.id.toUpperCase()}.</span> {option.text}
                </Button>

                {isAnswered && option.id === selectedOption && (
                  <p
                    className={`mt-1 ml-6 text-sm ${option.correct ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {option.feedback}
                  </p>
                )}

                {isAnswered && option.id !== selectedOption && option.correct && (
                  <p className="mt-1 ml-6 text-sm text-green-600 dark:text-green-400">{option.feedback}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetGame}>
            Reset Game
          </Button>

          {isAnswered && (
            <Button className="bg-gray-800 hover:bg-gray-700" onClick={handleNextScenario}>
              Next Scenario
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
