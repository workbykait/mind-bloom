"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GamePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [counter, setCounter] = useState(4)
  const animationRef = useRef<number | null>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1)
      } else {
        // Cycle through phases
        if (phase === "inhale") {
          setPhase("hold")
          setCounter(4)
        } else if (phase === "hold") {
          setPhase("exhale")
          setCounter(4)
        } else {
          setPhase("inhale")
          setCounter(4)
        }
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [isPlaying, counter, phase])

  useEffect(() => {
    if (!circleRef.current) return

    if (isPlaying) {
      if (phase === "inhale") {
        circleRef.current.style.transform = "scale(1.5)"
        circleRef.current.style.backgroundColor = "rgb(96, 96, 96)"
      } else if (phase === "hold") {
        circleRef.current.style.backgroundColor = "rgb(147, 147, 147)"
      } else {
        circleRef.current.style.transform = "scale(1)"
        circleRef.current.style.backgroundColor = "rgb(59, 59, 59)"
      }
    } else {
      circleRef.current.style.transform = "scale(1)"
      circleRef.current.style.backgroundColor = "rgb(156, 163, 175)"
    }
  }, [isPlaying, phase])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setPhase("inhale")
      setCounter(4)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle>Mindful Breathing</CardTitle>
          <CardDescription>A simple exercise to help you relax and focus</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-8 p-6">
          <div
            ref={circleRef}
            className="h-48 w-48 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-white font-medium transition-all duration-1000"
          >
            {isPlaying && (
              <div className="text-center">
                <div className="text-xl">{phase}</div>
                <div className="text-3xl font-bold">{counter}</div>
              </div>
            )}
          </div>

          <div className="text-center space-y-2">
            <p className="font-medium">Instructions:</p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Breathe in for 4 seconds</li>
              <li>Hold for 4 seconds</li>
              <li>Exhale for 4 seconds</li>
              <li>Repeat the cycle</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={togglePlay} className="w-32 bg-gray-800 hover:bg-gray-700">
            {isPlaying ? "Pause" : "Start"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
