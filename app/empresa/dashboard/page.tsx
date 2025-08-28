"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { authService, type User, type CompanyProfile, type CandidateProfile } from "@/lib/auth"
import { searchService, type SearchFilters } from "@/lib/search"
import { Building2, LogOut, Edit, Search, Users, MapPin, Phone, Globe, Mail, Download, Eye, Filter } from "lucide-react"

export default function CompanyDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [candidates, setCandidates] = useState<CandidateProfile[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    searchTerm: "",
    location: "",
    skills: [],
    experienceLevel: "any", // Updated default value
    industry: "",
  })
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null)
  const [candidateDialog, setCandidateDialog] = useState(false)
  const [popularSkills, setPopularSkills] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (!user || user.userType !== "empresa") {
      router.push("/")
      return
    }

    setCurrentUser(user)
    const companyProfile = authService.getCompanyProfile(user.id)
    setProfile(companyProfile)

    // Cargar todos los candidatos
    const allCandidates = authService.getCandidateProfiles()
    setCandidates(allCandidates)
    setFilteredCandidates(allCandidates)

    const skills = searchService.getPopularSkills(allCandidates)
    setPopularSkills(skills)

    setIsLoading(false)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [router])

  useEffect(() => {
    const filtered = searchService.searchCandidates(candidates, filters)
    setFilteredCandidates(filtered)
  }, [filters, candidates])

  const handleLogout = () => {
    authService.logout()
    router.push("/")
  }

  const handleProfileUpdate = (updatedProfile: Partial<CompanyProfile>) => {
    if (!profile) return

    const newProfile = { ...profile, ...updatedProfile }
    authService.updateCompanyProfile(newProfile)
    setProfile(newProfile)
  }

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleSkillFilter = (skill: string) => {
    const currentSkills = filters.skills || []
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill]
    updateFilter("skills", updatedSkills)
  }

  const viewCandidateDetails = (candidate: CandidateProfile) => {
    setSelectedCandidate(candidate)
    setCandidateDialog(true)
  }

  const downloadCV = (candidate: CandidateProfile) => {
    if (!candidate.cvFile) return

    const link = document.createElement("a")
    link.href = candidate.cvFile
    link.download = `CV_${candidate.name}.pdf`
    link.click()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando panel...</p>
        </div>
      </div>
    )
  }

  if (!currentUser || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-16 sm:pb-0">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              <h1 className="text-lg sm:text-2xl font-bold text-foreground">TalentConnect</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {profile?.companyName || currentUser?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs sm:text-sm bg-transparent">
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
                <span className="sm:hidden">Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-6xl">
        <div className="mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Panel de Empresa</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gestiona tu perfil corporativo y encuentra talento
          </p>
        </div>

        <Tabs defaultValue="search" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10">
            <TabsTrigger value="search" className="text-xs sm:text-sm">
              Buscar Candidatos
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm">
              Perfil de Empresa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                        Buscar Talento
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Encuentra candidatos que se ajusten a tus necesidades
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="text-xs sm:text-sm"
                    >
                      <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      {showAdvancedFilters ? "Ocultar" : "Filtros"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Filtros básicos */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="search" className="text-sm">
                        Buscar por nombre, habilidad o empresa
                      </Label>
                      <Input
                        id="search"
                        placeholder="Ej: React, JavaScript, Google..."
                        value={filters.searchTerm || ""}
                        onChange={(e) => updateFilter("searchTerm", e.target.value)}
                        className="h-9 sm:h-10 text-sm"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="location" className="text-sm">
                        Ubicación
                      </Label>
                      <Input
                        id="location"
                        placeholder="Ej: Madrid, Barcelona..."
                        value={filters.location || ""}
                        onChange={(e) => updateFilter("location", e.target.value)}
                        className="h-9 sm:h-10 text-sm"
                      />
                    </div>
                  </div>

                  {/* Filtros avanzados */}
                  {showAdvancedFilters && (
                    <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="experience" className="text-sm">
                          Nivel de experiencia
                        </Label>
                        <Select
                          value={filters.experienceLevel || "any"}
                          onValueChange={(value) => updateFilter("experienceLevel", value)}
                        >
                          <SelectTrigger className="h-9 sm:h-10">
                            <SelectValue placeholder="Cualquier nivel" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Cualquier nivel</SelectItem>
                            <SelectItem value="junior">Junior (0-2 años)</SelectItem>
                            <SelectItem value="mid">Mid-level (2-5 años)</SelectItem>
                            <SelectItem value="senior">Senior (5+ años)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Habilidades populares */}
                      <div className="space-y-2">
                        <Label className="text-sm">Habilidades populares (toca para filtrar)</Label>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {popularSkills.slice(0, 12).map((skill) => (
                            <Badge
                              key={skill}
                              variant={filters.skills?.includes(skill) ? "default" : "outline"}
                              className="cursor-pointer hover:bg-accent/10 text-xs px-2 py-1"
                              onClick={() => toggleSkillFilter(skill)}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Habilidades seleccionadas */}
                      {filters.skills && filters.skills.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm">Filtros activos:</Label>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {filters.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="default"
                                className="cursor-pointer text-xs px-2 py-1"
                                onClick={() => toggleSkillFilter(skill)}
                              >
                                {skill} ×
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Resultados */}
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                      Candidatos ({filteredCandidates.length})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredCandidates.length === 0 ? (
                    <div className="text-center py-6 sm:py-8">
                      <Users className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                      <p className="text-sm sm:text-base text-muted-foreground">No se encontraron candidatos</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Intenta ajustar los filtros de búsqueda
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {filteredCandidates.map((candidate) => (
                        <Card key={candidate.userId} className="hover:shadow-md transition-shadow">
                          <CardContent className="pt-3 sm:pt-4">
                            <div className="flex items-start space-x-3">
                              {candidate.profileImage ? (
                                <img
                                  src={candidate.profileImage || "/placeholder.svg"}
                                  alt={candidate.name}
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold truncate text-sm sm:text-base">{candidate.name}</h4>
                                {candidate.location && (
                                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span className="truncate">{candidate.location}</span>
                                  </p>
                                )}
                                {candidate.experience.length > 0 && (
                                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                    {candidate.experience[0].position} en {candidate.experience[0].company}
                                  </p>
                                )}
                              </div>
                            </div>

                            {candidate.skills.length > 0 && (
                              <div className="mt-2 sm:mt-3">
                                <div className="flex flex-wrap gap-1">
                                  {candidate.skills.slice(0, 2).map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {candidate.skills.length > 2 && (
                                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                      +{candidate.skills.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="flex gap-1 sm:gap-2 mt-3 sm:mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-transparent text-xs sm:text-sm h-8 sm:h-9"
                                onClick={() => viewCandidateDetails(candidate)}
                              >
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                Ver
                              </Button>
                              {candidate.cvFile && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadCV(candidate)}
                                  className="h-8 sm:h-9 px-2 sm:px-3"
                                >
                                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      Perfil de Empresa
                    </CardTitle>
                    <CardDescription className="text-sm">Actualiza la información de tu empresa</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="text-xs sm:text-sm"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {editingProfile ? "Cancelar" : "Editar"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="companyName" className="text-sm">
                      Nombre de la empresa
                    </Label>
                    <Input
                      id="companyName"
                      value={profile?.companyName || ""}
                      onChange={(e) => handleProfileUpdate({ companyName: e.target.value })}
                      disabled={!editingProfile}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="industry" className="text-sm">
                      Industria
                    </Label>
                    <Select
                      value={profile?.industry || ""}
                      onValueChange={(value) => handleProfileUpdate({ industry: value })}
                      disabled={!editingProfile}
                    >
                      <SelectTrigger className="h-9 sm:h-10">
                        <SelectValue placeholder="Selecciona una industria" />
                      </SelectTrigger>
                      <SelectContent>
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
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phone" className="text-sm">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={profile?.phone || ""}
                      onChange={(e) => handleProfileUpdate({ phone: e.target.value })}
                      disabled={!editingProfile}
                      placeholder="Ej: +1 234 567 8900"
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="website" className="text-sm">
                      Sitio web
                    </Label>
                    <Input
                      id="website"
                      value={profile?.website || ""}
                      onChange={(e) => handleProfileUpdate({ website: e.target.value })}
                      disabled={!editingProfile}
                      placeholder="Ej: https://miempresa.com"
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2 sm:col-span-2">
                    <Label htmlFor="location" className="text-sm">
                      Ubicación
                    </Label>
                    <Input
                      id="location"
                      value={profile?.location || ""}
                      onChange={(e) => handleProfileUpdate({ location: e.target.value })}
                      disabled={!editingProfile}
                      placeholder="Ej: Madrid, España"
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="description" className="text-sm">
                    Descripción de la empresa
                  </Label>
                  <Textarea
                    id="description"
                    value={profile?.description || ""}
                    onChange={(e) => handleProfileUpdate({ description: e.target.value })}
                    disabled={!editingProfile}
                    placeholder="Describe tu empresa, cultura, valores y lo que la hace única..."
                    rows={3}
                    className="text-sm resize-none"
                  />
                </div>

                {/* Vista previa del perfil */}
                <div className="border-t pt-4 sm:pt-6">
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Vista previa del perfil</h4>
                  <Card className="bg-muted/30">
                    <CardContent className="pt-3 sm:pt-4">
                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold">{profile?.companyName}</h3>
                          {profile?.industry && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {profile.industry}
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          {profile?.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                              {profile.location}
                            </span>
                          )}
                          {profile?.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                              {profile.phone}
                            </span>
                          )}
                          {profile?.website && (
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                              <a
                                href={profile.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                              >
                                Sitio web
                              </a>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                            {profile?.email}
                          </span>
                        </div>

                        {profile?.description && (
                          <p className="text-xs sm:text-sm text-muted-foreground">{profile.description}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para ver detalles del candidato */}
      <Dialog open={candidateDialog} onOpenChange={setCandidateDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto mx-2 sm:mx-auto">
          <DialogHeader className="pb-3 sm:pb-4">
            <DialogTitle className="text-lg sm:text-xl">Perfil del Candidato</DialogTitle>
            <DialogDescription className="text-sm">Información detallada del candidato</DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-4 sm:space-y-6">
              {/* Información personal */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                {selectedCandidate.profileImage ? (
                  <img
                    src={selectedCandidate.profileImage || "/placeholder.svg"}
                    alt={selectedCandidate.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold">{selectedCandidate.name}</h3>
                  <p className="text-sm text-muted-foreground break-all">{selectedCandidate.email}</p>
                  {selectedCandidate.phone && (
                    <p className="text-sm text-muted-foreground">{selectedCandidate.phone}</p>
                  )}
                  {selectedCandidate.location && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{selectedCandidate.location}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Resumen */}
              {selectedCandidate.summary && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Resumen Profesional</h4>
                  <p className="text-sm text-muted-foreground">{selectedCandidate.summary}</p>
                </div>
              )}

              {/* Habilidades */}
              {selectedCandidate.skills.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Habilidades</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiencia */}
              {selectedCandidate.experience.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">Experiencia Laboral</h4>
                  <div className="space-y-3">
                    {selectedCandidate.experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-accent pl-3 sm:pl-4">
                        <h5 className="font-medium text-sm sm:text-base">{exp.position}</h5>
                        <p className="text-accent text-sm">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                        </p>
                        {exp.description && <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t">
                {selectedCandidate.cvFile && (
                  <Button onClick={() => downloadCV(selectedCandidate)} className="flex-1 text-sm h-9 sm:h-10">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar CV
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    const subject = encodeURIComponent(`Oportunidad laboral en ${profile?.companyName}`)
                    const body = encodeURIComponent(
                      `Hola ${selectedCandidate.name},\n\nHemos revisado tu perfil en TalentConnect y nos interesa conocerte mejor para una oportunidad laboral en ${profile?.companyName}.\n\n¿Podrías contactarnos para coordinar una entrevista?\n\nSaludos,\n${profile?.companyName}`,
                    )
                    const mailtoLink = `mailto:${selectedCandidate.email}?subject=${subject}&body=${body}`

                    // Crear un enlace temporal y hacer click
                    const tempLink = document.createElement("a")
                    tempLink.href = mailtoLink
                    tempLink.target = "_blank"
                    tempLink.rel = "noopener noreferrer"
                    document.body.appendChild(tempLink)
                    tempLink.click()
                    document.body.removeChild(tempLink)
                  }}
                  className="flex-1 text-sm h-9 sm:h-10"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contactar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
