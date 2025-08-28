"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth"
import { Building2 } from "lucide-react"

export default function WelcomePage() {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("Iniciando sesión...")
  const [isExiting, setIsExiting] = useState(false)
  const router = useRouter()

  const messages = [
    "Iniciando sesión...",
    "Cargando tu perfil...",
    "Conectando con empresas...",
    "Preparando búsquedas...",
    "Optimizando resultados...",
    "Configurando dashboard...",
    "¡Casi listo!",
  ]

  useEffect(() => {
    // Verificar autenticación
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }

    let speechDuration = 12000 // 12 segundos para que coincida con el mensaje completo

    // Reproducir mensaje de bienvenida
    const speakWelcome = () => {
      if ("speechSynthesis" in window) {
        const welcomeText =
          "Bienvenido a TalentConnect, tu bolsa de trabajo efectiva. Conectamos el mejor talento con las mejores oportunidades laborales. Encuentra tu próximo empleo o el candidato perfecto para tu empresa."
        const utterance = new SpeechSynthesisUtterance(welcomeText)
        utterance.lang = "es-ES"
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 0.8

        utterance.onend = () => {
          speechDuration = Date.now() - startTime + 1000 // Agregar 1 segundo extra
        }

        speechSynthesis.speak(utterance)
      }
    }

    // Iniciar mensaje de voz después de un pequeño delay
    const startTime = Date.now()
    const voiceTimeout = setTimeout(speakWelcome, 500)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.83 // 100/120 para completar en 12 segundos

        // Cambiar mensajes según el progreso
        if (newProgress >= 15 && newProgress < 30) setCurrentMessage(messages[1])
        else if (newProgress >= 30 && newProgress < 45) setCurrentMessage(messages[2])
        else if (newProgress >= 45 && newProgress < 60) setCurrentMessage(messages[3])
        else if (newProgress >= 60 && newProgress < 75) setCurrentMessage(messages[4])
        else if (newProgress >= 75 && newProgress < 90) setCurrentMessage(messages[5])
        else if (newProgress >= 90) setCurrentMessage(messages[6])

        return Math.min(newProgress, 100)
      })
    }, 100)

    const redirectTimeout = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        const userType = currentUser.userType
        if (userType === "candidato") {
          router.push("/candidato/dashboard")
        } else {
          router.push("/empresa/dashboard")
        }
      }, 800)
    }, 12500)

    return () => {
      clearInterval(interval)
      clearTimeout(redirectTimeout)
      clearTimeout(voiceTimeout)
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
      }
    }
  }, [router])

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center transition-opacity duration-800 ${isExiting ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo minimalista */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <Building2 className="h-16 w-16 text-slate-700 animate-pulse" />
            <div className="absolute inset-0 bg-slate-700/10 rounded-full animate-ping" />
          </div>
        </div>

        {/* Título ultra minimalista */}
        <div className="space-y-2">
          <h1 className="text-3xl font-light text-slate-800 tracking-wide">TalentConnect</h1>
          <p className="text-slate-500 font-light text-sm tracking-wider uppercase">Conectando talento</p>
        </div>

        {/* Barra de progreso minimalista */}
        <div className="space-y-4">
          <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-slate-600 to-slate-800 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Mensaje actual */}
          <p className="text-slate-600 font-light text-sm animate-pulse">{currentMessage}</p>
        </div>

        {/* Indicador de progreso numérico */}
        <div className="text-slate-400 font-mono text-xs tracking-widest">{Math.round(progress)}%</div>
      </div>
    </div>
  )
}
