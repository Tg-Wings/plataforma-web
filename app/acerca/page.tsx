"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Target, Users, Zap, Shield, Heart } from "lucide-react"
import Link from "next/link"

export default function AcercaPage() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Acerca de TalentConnect</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Nuestra misión es conectar el talento excepcional con las empresas que buscan crecer
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Simplificar el proceso de búsqueda de empleo y contratación, creando conexiones significativas entre
                candidatos talentosos y empresas innovadoras a través de una plataforma minimalista y eficiente.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Nuestra Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ser la plataforma líder en conexión de talento, donde cada profesional encuentre su oportunidad ideal y
                cada empresa descubra el talento que necesita para alcanzar sus objetivos.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Valores */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Nuestros Valores</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Conexión Humana</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Creemos en el poder de las conexiones auténticas entre personas y organizaciones.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Transparencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Promovemos la honestidad y claridad en todas las interacciones de nuestra plataforma.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Simplicidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Diseñamos experiencias simples e intuitivas que faciliten el proceso para todos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Por qué elegir TalentConnect */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">¿Por qué elegir TalentConnect?</CardTitle>
            <CardDescription className="text-center">Descubre las ventajas que nos hacen diferentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Para Candidatos</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Interfaz minimalista y fácil de usar</li>
                  <li>• Perfil profesional completo con CV</li>
                  <li>• Búsqueda inteligente de empresas</li>
                  <li>• Contacto directo con reclutadores</li>
                  <li>• Sin costos ocultos ni suscripciones</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Para Empresas</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Filtros avanzados de búsqueda</li>
                  <li>• Acceso a perfiles verificados</li>
                  <li>• Descarga directa de CVs</li>
                  <li>• Gestión eficiente de candidatos</li>
                  <li>• Proceso de contratación simplificado</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Gratuito</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Disponible</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">0</div>
            <div className="text-sm text-muted-foreground">Complicaciones</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">∞</div>
            <div className="text-sm text-muted-foreground">Oportunidades</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">¿Listo para conectar?</h3>
          <p className="text-muted-foreground mb-6">
            Únete a nuestra comunidad y descubre tu próxima oportunidad profesional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/#auth-section">Comenzar Ahora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/descargar">Ver Más Información</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2024 TalentConnect. Conectando talento con oportunidades.</p>
        </div>
      </footer>
    </div>
  )
}
