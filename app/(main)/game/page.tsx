"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MentalHealthGames() {
  // Breathing Exercise State
  const [isPlaying, setIsPlaying] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [counter, setCounter] = useState(4)
  const animationRef = useRef<number | null>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  // Gratitude Journal State
  const [gratitudeEntry, setGratitudeEntry] = useState("")
  const [gratitudeList, setGratitudeList] = useState<string[]>([])

  // Color Therapy State
  const [selectedColor, setSelectedColor] = useState("#ffffff")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Breathing Exercise Logic
  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1)
      } else {
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
        circleRef.current.style.backgroundColor = "rgb(96, 165, 250)"
      } else if (phase === "hold") {
        circleRef.current.style.backgroundColor = "rgb(147, 197, 253)"
      } else {
        circleRef.current.style.transform = "scale(1)"
        circleRef.current.style.backgroundColor = "rgb(59, 130, 246)"
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

  // Gratitude Journal Logic
  const handleGratitudeSubmit = () => {
    if (gratitudeEntry.trim()) {
      setGratitudeList([...gratitudeList, gratitudeEntry])
      setGratitudeEntry("")
    }
  }

  // Color Therapy Logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = selectedColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [selectedColor])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle>Mental Health Exercises</CardTitle>
          <CardDescription>Tools to help you relax and reflect</CardDescription>
        </CardHeader>
        <Tabs defaultValue="breathing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="gratitude">Gratitude</TabsTrigger>
            <TabsTrigger value="color">Color Therapy</TabsTrigger>
          </TabsList>

          {/* Breathing Exercise Tab */}
          <TabsContent value="breathing">
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
              <Button onClick={togglePlay} className="w-32 bg-blue-500 hover:bg-blue-600">
                {isPlaying ? "Pause" : "Start"}
              </Button>
            </CardFooter>
          </TabsContent>

          {/* Gratitude Journal Tab */}
          <TabsContent value="gratitude">
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <p className="font-medium">Write something you're grateful for:</p>
                <Textarea
                  value={gratitudeEntry}
                  onChange={(e) => setGratitudeEntry(e.target.value)}
                  placeholder="Today, I'm grateful for..."
                  className="min-h-[100px]"
                />
                <Button onClick={handleGratitudeSubmit} className="w-full bg-blue-500 hover:bg-blue-600">
                  Add to Journal
                </Button>
              </div>
              {gratitudeList.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium">Your Gratitude Journal:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {gratitudeList.map((entry, index) => (
                      <li key={index} className="border-b py-1">
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </TabsContent>

          {/* Color Therapy Tab */}
          <TabsContent value="color">
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <p className="font-medium">Choose a calming color:</p>
                <Input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-16 h-16 p-1"
                />
              </div>
              <canvas
                ref={canvasRef}
                width={300}
                height={200}
                className="border rounded-md"
              />
              <div className="text-center space-y-2">
                <p className="font-medium">Instructions:</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Select a color and focus on the canvas. Let the color fill your mind to promote relaxation.
                </p>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
