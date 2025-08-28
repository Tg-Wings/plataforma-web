"use client"

import { useEffect, useState } from "react"

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const steps = [
    "Inicializando sistema...",
    "Cargando perfiles...",
    "Conectando con empresas...",
    "Preparando búsquedas...",
    "Finalizando...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsExiting(true), 200)
          return 100
        }
        return prev + 2
      })
    }, 100) // 5 segundos total (100 / 2 = 50 intervalos * 100ms = 5s)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const stepIndex = Math.floor((progress / 100) * steps.length)
    setCurrentStep(Math.min(stepIndex, steps.length - 1))
  }, [progress, steps.length])

  return (
    <div
      className={`min-h-screen bg-background flex items-center justify-center transition-opacity duration-1000 ${isExiting ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <div className="w-16 h-16 bg-primary rounded-xl mx-auto flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">TalentConnect</h1>
          <p className="text-sm text-muted-foreground">Conectando talento con oportunidades</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-200 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground font-medium">{steps[currentStep]}</p>
        </div>

        {/* Progress Percentage */}
        <div className="text-xs text-muted-foreground">{progress}%</div>
      </div>
    </div>
  )
}
