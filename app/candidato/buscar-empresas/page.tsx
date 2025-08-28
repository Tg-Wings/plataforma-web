"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { authService, type User, type CompanyProfile } from "@/lib/auth"
import { searchService, type CompanySearchFilters } from "@/lib/search"
import { Briefcase, LogOut, Search, Building2, MapPin, Globe, Mail, Phone } from "lucide-react"

export default function BuscarEmpresas() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [companies, setCompanies] = useState<CompanyProfile[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<Partial<CompanySearchFilters>>({
    searchTerm: "",
    location: "",
    industry: "todas", // Updated default value to be a non-empty string
  })
  const router = useRouter()

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (!user || user.userType !== "candidato") {
      router.push("/")
      return
    }

    setCurrentUser(user)
    const allCompanies = authService.getCompanyProfiles()
    setCompanies(allCompanies)
    setFilteredCompanies(allCompanies)
    setIsLoading(false)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [router])

  useEffect(() => {
    const filtered = searchService.searchCompanies(companies, filters)
    setFilteredCompanies(filtered)
  }, [filters, companies])

  const handleLogout = () => {
    authService.logout()
    router.push("/")
  }

  const updateFilter = (key: keyof CompanySearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando empresas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              <h1 className="text-lg md:text-2xl font-bold text-foreground">TalentConnect</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/candidato/dashboard")}>
                Mi Perfil
              </Button>
              <span className="text-sm text-muted-foreground">Hola, {currentUser?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Buscar Empresas</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Encuentra empresas que se ajusten a tus intereses profesionales
          </p>
        </div>

        {/* Filtros de búsqueda */}
        <Card className="mb-4 md:mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Search className="h-4 w-4 md:h-5 md:w-5" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm">
                  Buscar empresa
                </Label>
                <Input
                  id="search"
                  placeholder="Nombre, industria, descripción..."
                  value={filters.searchTerm || ""}
                  onChange={(e) => updateFilter("searchTerm", e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm">
                  Ubicación
                </Label>
                <Input
                  id="location"
                  placeholder="Ciudad, país..."
                  value={filters.location || ""}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm">
                  Industria
                </Label>
                <Select value={filters.industry || "todas"} onValueChange={(value) => updateFilter("industry", value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Todas las industrias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las industrias</SelectItem>
                    <SelectItem value="tecnologia">Tecnología</SelectItem>
                    <SelectItem value="finanzas">Finanzas</SelectItem>
                    <SelectItem value="salud">Salud</SelectItem>
                    <SelectItem value="educacion">Educación</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufactura">Manufactura</SelectItem>
                    <SelectItem value="servicios">Servicios</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg md:text-xl">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 md:h-5 md:w-5" />
                Empresas Disponibles ({filteredCompanies.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-6 md:py-8">
                <Building2 className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm md:text-base">No se encontraron empresas</p>
                <p className="text-xs md:text-sm text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredCompanies.map((company) => (
                  <Card key={company.userId} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="space-y-3 md:space-y-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold">{company.companyName}</h3>
                          {company.industry && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {company.industry}
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                          {company.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                              {company.location}
                            </span>
                          )}
                          {company.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3 md:h-4 md:w-4" />
                              {company.phone}
                            </span>
                          )}
                          {company.website && (
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3 md:h-4 md:w-4" />
                              <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                              >
                                Sitio web
                              </a>
                            </span>
                          )}
                        </div>

                        {company.description && (
                          <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">{company.description}</p>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              window.location.href = `mailto:${company.email}?subject=Interés en oportunidades laborales`
                            }}
                            className="flex-1 text-xs md:text-sm"
                          >
                            <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                            Contactar
                          </Button>
                          {company.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(company.website, "_blank")}
                              className="flex-1 text-xs md:text-sm"
                            >
                              <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                              Visitar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
