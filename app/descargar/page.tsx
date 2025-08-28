"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Download, Smartphone, Monitor, Users, Building2, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DescargarPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-accent" />
              <h1 className="text-2xl font-bold text-foreground">TalentConnect</h1>
            </Link>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/">Volver al Inicio</Link>
              </Button>
              <Button asChild>
                <Link href="/#auth-section">Comenzar Ahora</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Descarga TalentConnect</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Accede a nuestra plataforma desde cualquier dispositivo y conecta con oportunidades laborales
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Versión Web - Disponible Ahora
          </Badge>
        </div>

        {/* Plataformas disponibles */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Monitor className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Versión Web</CardTitle>
              <CardDescription>Accede desde cualquier navegador web</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Compatible con Chrome, Firefox, Safari</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Responsive design para móviles</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Sin necesidad de instalación</span>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Acceder Ahora
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center opacity-60">
            <CardHeader>
              <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-muted-foreground">App Móvil</CardTitle>
              <CardDescription>Próximamente en App Store y Google Play</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span>• Notificaciones push</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span>• Acceso offline</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span>• Experiencia nativa</span>
                </div>
                <Button variant="outline" className="w-full bg-transparent" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Próximamente
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Características principales */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">¿Qué puedes hacer con TalentConnect?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">Para Candidatos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Crear perfil profesional completo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Subir CV y documentos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Gestionar experiencia laboral
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Buscar empresas por industria
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Contactar directamente con empresas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">Para Empresas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Crear perfil corporativo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Buscar candidatos por habilidades
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Filtros avanzados de búsqueda
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Descargar CVs de candidatos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Contactar talento directamente
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Requisitos del sistema */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Requisitos del Sistema</CardTitle>
            <CardDescription className="text-center">
              Asegúrate de que tu dispositivo cumple con estos requisitos mínimos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Navegadores Web</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Chrome 90+</li>
                  <li>Firefox 88+</li>
                  <li>Safari 14+</li>
                  <li>Edge 90+</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Dispositivos Móviles</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>iOS 12+ (Safari)</li>
                  <li>Android 8+ (Chrome)</li>
                  <li>Responsive design</li>
                  <li>Touch optimizado</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Funcionalidades</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>JavaScript habilitado</li>
                  <li>Cookies permitidas</li>
                  <li>LocalStorage disponible</li>
                  <li>Conexión a internet</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Final */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">¿Listo para comenzar?</h3>
          <p className="text-muted-foreground mb-6">
            Únete a TalentConnect y descubre nuevas oportunidades profesionales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/#auth-section">Crear Cuenta Gratis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/acerca">Conocer Más</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2024 TalentConnect. Conectando talento con oportunidades.</p>
        </div>
      </footer>
    </div>
  )
}
