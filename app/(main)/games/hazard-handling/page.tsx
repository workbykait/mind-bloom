"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { AlertTriangle, Clock } from "lucide-react"

type Hazard = {
  id: number
  title: string
  description: string
  timeLimit: number // in seconds
  options: {
    id: string
    text: string
    outcome: string
    correct: boolean
  }[]
}

const hazards: Hazard[] = [
  {
    id: 1,
    title: "Kitchen Fire",
    description: "You're cooking and oil in a pan catches fire. What should you do?",
    timeLimit: 15,
    options: [
      {
        id: "a",
        text: "Pour water on it",
        outcome: "Water causes the oil fire to explode and spread, making the situation much worse.",
        correct: false,
      },
      {
        id: "b",
        text: "Cover the pan with a lid and turn off the heat",
        outcome: "The fire is smothered as it's deprived of oxygen. Good job!",
        correct: true,
      },
      {
        id: "c",
        text: "Try to carry the burning pan outside",
        outcome: "The burning oil could spill while moving, spreading the fire and causing burns.",
        correct: false,
      },
      {
        id: "d",
        text: "Leave the kitchen and call emergency services",
        outcome: "While calling for help is good, this small fire could be handled safely first.",
        correct: false,
      },
    ],
  },
  {
    id: 2,
    title: "Power Outage During Storm",
    description:
      "During a severe thunderstorm, the power goes out. You hear a loud crash outside. What's your first action?",
    timeLimit: 20,
    options: [
      {
        id: "a",
        text: "Go outside immediately to check what happened",
        outcome:
          "Going outside during a severe storm puts you at risk of injury from lightning, falling debris, or flooding.",
        correct: false,
      },
      {
        id: "b",
        text: "Call emergency services to report the power outage",
        outcome: "Emergency services should be reserved for immediate dangers, not routine power outages.",
        correct: false,
      },
      {
        id: "c",
        text: "Use candles throughout the house for light",
        outcome: "Candles pose a fire hazard, especially if left unattended or if there are children or pets.",
        correct: false,
      },
      {
        id: "d",
        text: "Stay inside, use flashlights, and listen to a battery-powered radio for updates",
        outcome: "This keeps you safe while staying informed about the situation. Good decision!",
        correct: true,
      },
    ],
  },
  {
    id: 3,
    title: "Chemical Spill",
    description:
      "You accidentally spill a household cleaning chemical and it starts emitting strong fumes. What should you do first?",
    timeLimit: 15,
    options: [
      {
        id: "a",
        text: "Mix it with another cleaning product to neutralize it",
        outcome: "Mixing cleaning chemicals can create toxic gases and make the situation much more dangerous.",
        correct: false,
      },
      {
        id: "b",
        text: "Open windows and doors to ventilate the area",
        outcome: "Good choice! Ventilation helps disperse the fumes and reduce their concentration.",
        correct: true,
      },
      {
        id: "c",
        text: "Immediately clean it up with a cloth",
        outcome: "Direct contact with the chemical could cause skin irritation or burns.",
        correct: false,
      },
      {
        id: "d",
        text: "Leave it to dry on its own",
        outcome: "The chemical could damage surfaces and continue to release harmful fumes.",
        correct: false,
      },
    ],
  },
]

export default function HazardHandlingGame() {
  const [currentHazard, setCurrentHazard] = useState<Hazard | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [hazardsCompleted, setHazardsCompleted] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    // Start with a random hazard
    const randomIndex = Math.floor(Math.random() * hazards.length)
    const hazard = hazards[randomIndex]
    setCurrentHazard(hazard)
    setTimeLeft(hazard.timeLimit)
    setTimerActive(true)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false)
      if (!isAnswered) {
        toast.error("Time's up! You need to act faster in an emergency.")
        setIsAnswered(true)
        setHazardsCompleted(hazardsCompleted + 1)
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timeLeft, timerActive, isAnswered, hazardsCompleted])

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return

    setTimerActive(false)
    setSelectedOption(optionId)
    setIsAnswered(true)

    const option = currentHazard?.options.find((opt) => opt.id === optionId)

    if (option?.correct) {
      setScore(score + 1)
      toast.success("Good decision!")
    } else {
      toast.error("That wasn't the safest choice.")
    }

    setHazardsCompleted(hazardsCompleted + 1)
  }

  const handleNextHazard = () => {
    // Filter out the current hazard
    const remainingHazards = hazards.filter((h) => h.id !== currentHazard?.id)

    if (remainingHazards.length > 0) {
      // Get a random hazard from the remaining ones
      const randomIndex = Math.floor(Math.random() * remainingHazards.length)
      const hazard = remainingHazards[randomIndex]
      setCurrentHazard(hazard)
      setTimeLeft(hazard.timeLimit)
    } else {
      // If all hazards have been used, reset with all hazards
      const randomIndex = Math.floor(Math.random() * hazards.length)
      const hazard = hazards[randomIndex]
      setCurrentHazard(hazard)
      setTimeLeft(hazard.timeLimit)
    }

    setSelectedOption(null)
    setIsAnswered(false)
    setTimerActive(true)
  }

  const resetGame = () => {
    setScore(0)
    setHazardsCompleted(0)
    const randomIndex = Math.floor(Math.random() * hazards.length)
    const hazard = hazards[randomIndex]
    setCurrentHazard(hazard)
    setTimeLeft(hazard.timeLimit)
    setSelectedOption(null)
    setIsAnswered(false)
    setTimerActive(true)
  }

  if (!currentHazard) {
    return <div className="flex justify-center items-center h-[calc(100vh-4rem)]">Loading...</div>
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <CardTitle className="text-xl">{currentHazard.title}</CardTitle>
              </div>
              <CardDescription>Emergency Response Simulation</CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4" />
              <span className={`font-mono ${timeLeft < 5 ? "text-red-500" : ""}`}>{timeLeft}s</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-gray-700 dark:text-gray-300">{currentHazard.description}</p>
          </div>

          <div className="space-y-3">
            {currentHazard.options.map((option) => (
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

                {isAnswered && (option.id === selectedOption || option.correct) && (
                  <p
                    className={`mt-1 ml-6 text-sm ${option.correct ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {option.outcome}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm font-medium">
              Score: {score}/{hazardsCompleted}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={resetGame}>
              Reset
            </Button>

            {isAnswered && (
              <Button className="bg-gray-800 hover:bg-gray-700" onClick={handleNextHazard}>
                Next Scenario
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
