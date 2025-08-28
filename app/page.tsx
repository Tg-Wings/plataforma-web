"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authService, type User } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Briefcase, Users, Search, FileText, ArrowRight, CheckCircle, Volume2 } from "lucide-react"
import Link from "next/link"
import { initializeDemoData } from "@/lib/demo-data"

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [audioPermissionRequested, setAudioPermissionRequested] = useState(false)
  const [showAudioPermission, setShowAudioPermission] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const startLoading = async () => {
      setShowAudioPermission(true)

      // Inicializar datos demo
      initializeDemoData()

      const duration = 5000 // 5 segundos
      const interval = 100 // Actualizar cada 100ms
      const steps = duration / interval
      let currentStep = 0

      const progressInterval = setInterval(() => {
        currentStep++
        const progress = (currentStep / steps) * 100
        setLoadingProgress(Math.min(progress, 100))

        if (currentStep >= steps) {
          clearInterval(progressInterval)

          // Verificar usuario después de la carga
          const user = authService.getCurrentUser()
          setCurrentUser(user)
          setIsLoading(false)

          if (user) {
            if (user.userType === "candidato") {
              router.push("/candidato/dashboard")
            } else {
              router.push("/empresa/dashboard")
            }
          }
        }
      }, interval)
    }

    startLoading()
  }, [router])

  const handleAudioPermission = async (allow: boolean) => {
    setAudioPermissionRequested(true)
    setShowAudioPermission(false)

    if (allow) {
      localStorage.setItem("audioPermissionGranted", "true")
    } else {
      localStorage.setItem("audioPermissionGranted", "false")
    }
  }

  if (showAudioPermission && !audioPermissionRequested) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl">Permisos de Audio</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              TalentConnect incluye mensajes de bienvenida con voz. ¿Deseas permitir el audio para una mejor
              experiencia?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => handleAudioPermission(true)} className="flex-1">
                Permitir Audio
              </Button>
              <Button variant="outline" onClick={() => handleAudioPermission(false)} className="flex-1">
                Continuar sin Audio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Logo y título */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
              <Briefcase className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">TalentConnect</h1>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300 ease-out rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          {/* Porcentaje */}
          <div className="text-2xl font-semibold text-foreground mb-4">{Math.round(loadingProgress)}%</div>

          <div className="space-y-2">
            <p className="text-lg text-foreground font-medium">
              {loadingProgress < 40 && "Inicializando plataforma..."}
              {loadingProgress >= 40 && loadingProgress < 80 && "Cargando sistema..."}
              {loadingProgress >= 80 && "Finalizando..."}
            </p>
            <p className="text-sm text-muted-foreground">Conectando talento con oportunidades</p>
          </div>

          {/* Indicador de carga animado */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentUser) {
    return null // Se redirige automáticamente
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              <h1 className="text-lg md:text-2xl font-bold text-foreground">TalentConnect</h1>
            </div>
            <div className="flex items-center space-x-2">
              <nav className="hidden lg:flex space-x-4 mr-4">
                <Link href="/acerca" className="text-sm text-muted-foreground hover:text-foreground">
                  Acerca de
                </Link>
                <Link href="/descargar" className="text-sm text-muted-foreground hover:text-foreground">
                  Descargar
                </Link>
              </nav>
              <Button
                variant="outline"
                size="sm"
                className="text-xs md:text-sm px-2 md:px-4 bg-transparent hidden md:inline-flex"
                asChild
              >
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button size="sm" className="text-xs md:text-sm px-2 md:px-4 hidden md:inline-flex" asChild>
                <Link href="/login">Registrarse</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 text-balance leading-tight">
            Conecta Talento con Oportunidades
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 text-pretty px-2">
            La plataforma minimalista que une a los mejores candidatos con las empresas que buscan talento excepcional.
          </p>
          <div className="flex flex-col gap-3 justify-center max-w-sm mx-auto md:max-w-none md:flex-row md:gap-4">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 w-full md:w-auto" asChild>
              <Link href="/login">
                Buscar Empleo
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base md:text-lg px-6 md:px-8 py-3 w-full md:w-auto bg-transparent"
              asChild
            >
              <Link href="/login">
                Contratar Talento
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Sin Complicaciones</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Conexión Directa</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground">
            ¿Por qué elegir TalentConnect?
          </h3>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <Users className="h-10 w-10 md:h-12 md:w-12 text-accent mx-auto mb-3 md:mb-4" />
                <CardTitle className="text-lg md:text-xl">Para Candidatos</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                  Crea tu perfil profesional, sube tu CV y conecta con empresas que buscan tu talento.
                </p>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>• Perfil profesional completo</li>
                  <li>• Gestión de experiencia laboral</li>
                  <li>• Búsqueda de empresas</li>
                  <li>• Contacto directo</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-4">
                <Search className="h-10 w-10 md:h-12 md:w-12 text-accent mx-auto mb-3 md:mb-4" />
                <CardTitle className="text-lg md:text-xl">Para Empresas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                  Encuentra candidatos calificados de manera rápida y eficiente con nuestro sistema de búsqueda.
                </p>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>• Filtros avanzados de búsqueda</li>
                  <li>• Acceso a CVs completos</li>
                  <li>• Perfiles verificados</li>
                  <li>• Proceso simplificado</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-4">
                <FileText className="h-10 w-10 md:h-12 md:w-12 text-accent mx-auto mb-3 md:mb-4" />
                <CardTitle className="text-lg md:text-xl">Proceso Simple</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                  Interfaz minimalista y proceso de registro sencillo para una experiencia sin complicaciones.
                </p>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>• Registro en 2 minutos</li>
                  <li>• Interfaz intuitiva</li>
                  <li>• Sin costos ocultos</li>
                  <li>• Soporte 24/7</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">¿Listo para comenzar?</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Únete a TalentConnect y descubre nuevas oportunidades
            </p>
            <div className="flex flex-col gap-3 justify-center max-w-sm mx-auto md:max-w-none md:flex-row md:gap-4">
              <Button size="lg" className="w-full md:w-auto" asChild>
                <Link href="/login">
                  Buscar Empleo
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full md:w-auto bg-transparent" asChild>
                <Link href="/login">
                  Buscar Talento
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-card py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-accent" />
              <span className="font-semibold text-sm md:text-base">TalentConnect</span>
            </div>
            <nav className="flex space-x-4 md:space-x-6">
              <Link href="/acerca" className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
                Acerca de
              </Link>
              <Link href="/descargar" className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
                Descargar
              </Link>
            </nav>
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              © 2024 TalentConnect. Conectando talento con oportunidades.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
