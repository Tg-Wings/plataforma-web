"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authService } from "@/lib/auth"
import { Building2, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "candidato" as "candidato" | "empresa",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "candidato" as "candidato" | "empresa",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = authService.login(loginData.email, loginData.password, loginData.userType)
      if (success) {
        router.push("/welcome")
      } else {
        setError("Credenciales incorrectas")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = authService.register(
        registerData.name,
        registerData.email,
        registerData.password,
        registerData.userType,
      )
      if (success) {
        router.push("/welcome")
      } else {
        setError("Error al registrar usuario")
      }
    } catch (err) {
      setError("Error al registrar usuario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-2 sm:mb-4 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">TalentConnect</h1>
          </div>
          <p className="text-sm text-muted-foreground">Conecta talento con oportunidades</p>
        </div>

        <Card className="shadow-lg mx-2 sm:mx-0">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Accede a tu cuenta</CardTitle>
            <CardDescription className="text-sm">Inicia sesión o regístrate para continuar</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <Tabs defaultValue="login" className="space-y-3 sm:space-y-4">
              <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10">
                <TabsTrigger value="login" className="text-xs sm:text-sm">
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger value="register" className="text-xs sm:text-sm">
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="login-type" className="text-sm">
                      Tipo de cuenta
                    </Label>
                    <Select
                      value={loginData.userType}
                      onValueChange={(value: "candidato" | "empresa") =>
                        setLoginData((prev) => ({ ...prev, userType: value }))
                      }
                    >
                      <SelectTrigger className="h-9 sm:h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candidato">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="text-sm">Candidato</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="empresa">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="text-sm">Empresa</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="login-email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-9 sm:h-10 text-sm"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="login-password" className="text-sm">
                      Contraseña
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                      className="h-9 sm:h-10 text-sm"
                      placeholder="••••••••"
                    />
                  </div>

                  {error && <div className="text-xs sm:text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

                  <Button type="submit" className="w-full h-9 sm:h-10 text-sm" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="register-type" className="text-sm">
                      Tipo de cuenta
                    </Label>
                    <Select
                      value={registerData.userType}
                      onValueChange={(value: "candidato" | "empresa") =>
                        setRegisterData((prev) => ({ ...prev, userType: value }))
                      }
                    >
                      <SelectTrigger className="h-9 sm:h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candidato">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="text-sm">Candidato</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="empresa">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="text-sm">Empresa</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="register-name" className="text-sm">
                      {registerData.userType === "candidato" ? "Nombre completo" : "Nombre de la empresa"}
                    </Label>
                    <Input
                      id="register-name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      className="h-9 sm:h-10 text-sm"
                      placeholder={registerData.userType === "candidato" ? "Juan Pérez" : "Mi Empresa S.A."}
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="register-email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="h-9 sm:h-10 text-sm"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="register-password" className="text-sm">
                      Contraseña
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                      className="h-9 sm:h-10 text-sm"
                      placeholder="••••••••"
                    />
                  </div>

                  {error && <div className="text-xs sm:text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

                  <Button type="submit" className="w-full h-9 sm:h-10 text-sm" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrarse"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Credenciales demo */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-xs sm:text-sm mb-2">Credenciales de prueba:</h4>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p>
                  <strong>Candidatos:</strong>
                </p>
                <p>• juan.perez@email.com / 123456</p>
                <p>• maria.garcia@email.com / 123456</p>
                <p>
                  <strong>Empresas:</strong>
                </p>
                <p>• rrhh@techcorp.com / 123456</p>
                <p>• contacto@innovatech.com / 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
