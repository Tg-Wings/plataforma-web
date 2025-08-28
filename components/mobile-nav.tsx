"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Search, Building2, Menu, X, User, LogOut, Settings } from "lucide-react"
import { authService, type AuthUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MobileNav() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const user = authService.getCurrentUser()
    setCurrentUser(user)
  }, [pathname])

  // Solo mostrar en móvil y si hay usuario logueado
  if (!currentUser) return null

  const handleLogout = () => {
    authService.logout()
    setIsMenuOpen(false)
    router.push("/")
  }

  const candidateNavItems = [
    { href: "/candidato/dashboard", icon: Home, label: "INICIO" },
    { href: "/candidato/buscar-empresas", icon: Search, label: "EMPRESAS" },
  ]

  const companyNavItems = [
    { href: "/empresa/dashboard", icon: Home, label: "INICIO" },
    { href: "/empresa/dashboard", icon: Building2, label: "EMPRESAS" },
  ]

  const navItems = currentUser.userType === "candidato" ? candidateNavItems : companyNavItems

  return (
    <>
      {/* Bottom Navigation Bar - Solo móvil */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}

          {/* Menú hamburguesa */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center py-2 px-3 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">MENÚ</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-card to-card/95 border-l border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del menú */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-accent/5 to-accent/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">TalentConnect</h3>
                  <p className="text-sm text-muted-foreground">Menú Principal</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Información del usuario */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  <p className="text-xs text-accent font-medium capitalize">{currentUser.userType}</p>
                </div>
              </div>
            </div>

            {/* Opciones del menú */}
            <div className="p-6 space-y-3">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Opciones</h4>

                <Link
                  href={currentUser.userType === "candidato" ? "/candidato/dashboard" : "/empresa/dashboard"}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <User className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                  <span className="text-sm font-medium">Mi Perfil</span>
                </Link>

                <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group w-full text-left">
                  <Settings className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                  <span className="text-sm font-medium">Configuración</span>
                </button>
              </div>

              {/* Botón de cerrar sesión */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>

            {/* Footer del menú */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-gradient-to-r from-muted/20 to-muted/10">
              <p className="text-xs text-center text-muted-foreground">TalentConnect v1.0</p>
            </div>
          </div>
        </div>
      )}

      {/* Espaciado para el bottom nav */}
      <div className="md:hidden h-16" />
    </>
  )
}
