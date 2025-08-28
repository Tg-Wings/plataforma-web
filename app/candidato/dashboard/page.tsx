"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { authService, type User, type CandidateProfile, type WorkExperience } from "@/lib/auth"
import { Briefcase, LogOut, UserIcon, FileText, Plus, Edit, Trash2, Upload, Camera, Search } from "lucide-react"

export default function CandidateDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<CandidateProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [experienceDialog, setExperienceDialog] = useState(false)
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null)
  const router = useRouter()

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (!user || user.userType !== "candidato") {
      router.push("/")
      return
    }

    setCurrentUser(user)
    const candidateProfile = authService.getCandidateProfile(user.id)
    setProfile(candidateProfile)
    setIsLoading(false)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [router])

  const handleLogout = () => {
    authService.logout()
    router.push("/")
  }

  const handleProfileUpdate = (updatedProfile: Partial<CandidateProfile>) => {
    if (!profile) return

    const newProfile = { ...profile, ...updatedProfile }
    authService.updateCandidateProfile(newProfile)
    setProfile(newProfile)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "cv" | "image") => {
    const file = event.target.files?.[0]
    if (!file || !profile) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (type === "cv") {
        handleProfileUpdate({ cvFile: result })
      } else {
        handleProfileUpdate({ profileImage: result })
      }
    }
    reader.readAsDataURL(file)
  }

  const addSkill = () => {
    if (!newSkill.trim() || !profile) return

    const updatedSkills = [...profile.skills, newSkill.trim()]
    handleProfileUpdate({ skills: updatedSkills })
    setNewSkill("")
  }

  const removeSkill = (skillToRemove: string) => {
    if (!profile) return

    const updatedSkills = profile.skills.filter((skill) => skill !== skillToRemove)
    handleProfileUpdate({ skills: updatedSkills })
  }

  const addOrUpdateExperience = (experience: Omit<WorkExperience, "id">) => {
    if (!profile) return

    let updatedExperience: WorkExperience[]

    if (editingExperience) {
      updatedExperience = profile.experience.map((exp) =>
        exp.id === editingExperience.id ? { ...experience, id: editingExperience.id } : exp,
      )
    } else {
      const newExperience: WorkExperience = {
        ...experience,
        id: Date.now().toString(),
      }
      updatedExperience = [...profile.experience, newExperience]
    }

    handleProfileUpdate({ experience: updatedExperience })
    setExperienceDialog(false)
    setEditingExperience(null)
  }

  const deleteExperience = (experienceId: string) => {
    if (!profile) return

    const updatedExperience = profile.experience.filter((exp) => exp.id !== experienceId)
    handleProfileUpdate({ experience: updatedExperience })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!currentUser || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header - Optimizado para móvil */}
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              <h1 className="text-lg md:text-2xl font-bold text-foreground">TalentConnect</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/candidato/buscar-empresas")}>
                <Search className="h-4 w-4 mr-2" />
                Buscar Empresas
              </Button>
              <span className="text-sm text-muted-foreground">Hola, {currentUser.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-4xl">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Mi Perfil Profesional</h2>
          <p className="text-sm md:text-base text-muted-foreground">Gestiona tu información y experiencia laboral</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="profile" className="text-xs md:text-sm px-2 py-2">
              <span className="hidden sm:inline">Información Personal</span>
              <span className="sm:hidden">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="text-xs md:text-sm px-2 py-2">
              <span className="hidden sm:inline">Experiencia Laboral</span>
              <span className="sm:hidden">Experiencia</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-xs md:text-sm px-2 py-2">
              <span className="hidden sm:inline">Documentos</span>
              <span className="sm:hidden">Docs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <UserIcon className="h-4 w-4 md:h-5 md:w-5" />
                      Información Personal
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Actualiza tu información de contacto y perfil profesional
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="w-full sm:w-auto"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingProfile ? "Cancelar" : "Editar"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage || "/placeholder.svg"}
                        alt="Foto de perfil"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                        <UserIcon className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                      </div>
                    )}
                    {editingProfile && (
                      <label className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-accent text-accent-foreground rounded-full p-1.5 md:p-2 cursor-pointer hover:bg-accent/90">
                        <Camera className="h-3 w-3 md:h-4 md:w-4" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "image")}
                        />
                      </label>
                    )}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                      disabled={!editingProfile}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone || ""}
                      onChange={(e) => handleProfileUpdate({ phone: e.target.value })}
                      disabled={!editingProfile}
                      placeholder="Ej: +1 234 567 8900"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location" className="text-sm">
                      Ubicación
                    </Label>
                    <Input
                      id="location"
                      value={profile.location || ""}
                      onChange={(e) => handleProfileUpdate({ location: e.target.value })}
                      disabled={!editingProfile}
                      placeholder="Ej: Ciudad, País"
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Resumen profesional */}
                <div className="space-y-2">
                  <Label htmlFor="summary" className="text-sm">
                    Resumen profesional
                  </Label>
                  <Textarea
                    id="summary"
                    value={profile.summary || ""}
                    onChange={(e) => handleProfileUpdate({ summary: e.target.value })}
                    disabled={!editingProfile}
                    placeholder="Describe brevemente tu experiencia y objetivos profesionales..."
                    rows={3}
                    className="text-sm resize-none"
                  />
                </div>

                <div className="space-y-3 md:space-y-4">
                  <Label className="text-sm">Habilidades</Label>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1 text-xs">
                        {skill}
                        {editingProfile && (
                          <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                            <Trash2 className="h-2.5 w-2.5 md:h-3 md:w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {editingProfile && (
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Agregar habilidad..."
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        className="text-sm"
                      />
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <Briefcase className="h-4 w-4 md:h-5 md:w-5" />
                      Experiencia Laboral
                    </CardTitle>
                    <CardDescription className="text-sm">Agrega y gestiona tu historial profesional</CardDescription>
                  </div>
                  <Dialog open={experienceDialog} onOpenChange={setExperienceDialog}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingExperience(null)} size="sm" className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Agregar Experiencia</span>
                        <span className="sm:hidden">Agregar</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-lg">
                          {editingExperience ? "Editar Experiencia" : "Agregar Experiencia"}
                        </DialogTitle>
                        <DialogDescription className="text-sm">
                          Completa la información de tu experiencia laboral
                        </DialogDescription>
                      </DialogHeader>
                      <ExperienceForm
                        experience={editingExperience}
                        onSave={addOrUpdateExperience}
                        onCancel={() => {
                          setExperienceDialog(false)
                          setEditingExperience(null)
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {profile.experience.length === 0 ? (
                  <div className="text-center py-6 md:py-8">
                    <Briefcase className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
                    <p className="text-sm md:text-base text-muted-foreground">
                      No has agregado experiencia laboral aún
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      Agrega tu experiencia para que las empresas conozcan tu trayectoria
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {profile.experience.map((exp) => (
                      <Card key={exp.id} className="border-l-4 border-l-accent">
                        <CardContent className="pt-3 md:pt-4">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-base md:text-lg truncate">{exp.position}</h4>
                              <p className="text-accent font-medium text-sm md:text-base truncate">{exp.company}</p>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                              </p>
                              {exp.description && (
                                <p className="mt-2 text-xs md:text-sm text-muted-foreground line-clamp-3">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingExperience(exp)
                                  setExperienceDialog(true)
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteExperience(exp.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <FileText className="h-4 w-4 md:h-5 md:w-5" />
                  Documentos
                </CardTitle>
                <CardDescription className="text-sm">Sube tu CV y otros documentos importantes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  <Label className="text-sm">Curriculum Vitae (PDF)</Label>
                  {profile.cvFile ? (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 border rounded-lg gap-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 md:h-8 md:w-8 text-accent flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm md:text-base">CV subido correctamente</p>
                          <p className="text-xs md:text-sm text-muted-foreground">Archivo PDF disponible</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const link = document.createElement("a")
                            link.href = profile.cvFile!
                            link.download = `CV_${profile.name}.pdf`
                            link.click()
                          }}
                          className="flex-1 sm:flex-none text-xs"
                        >
                          Descargar
                        </Button>
                        <label className="cursor-pointer flex-1 sm:flex-none">
                          <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                            <span className="text-xs">
                              <Upload className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                              Reemplazar
                            </span>
                          </Button>
                          <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "cv")}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 md:p-8 text-center">
                      <FileText className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
                      <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">No has subido tu CV aún</p>
                      <label className="cursor-pointer">
                        <Button size="sm" className="text-xs md:text-sm">
                          <Upload className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Subir CV (PDF)
                        </Button>
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "cv")}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ExperienceForm({
  experience,
  onSave,
  onCancel,
}: {
  experience: WorkExperience | null
  onSave: (exp: Omit<WorkExperience, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    company: experience?.company || "",
    position: experience?.position || "",
    startDate: experience?.startDate || "",
    endDate: experience?.endDate || "",
    current: experience?.current || false,
    description: experience?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm">
            Empresa
          </Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position" className="text-sm">
            Cargo
          </Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-sm">
            Fecha de inicio
          </Label>
          <Input
            id="startDate"
            type="month"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate" className="text-sm">
            Fecha de fin
          </Label>
          <Input
            id="endDate"
            type="month"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            disabled={formData.current}
            className="text-sm"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="current"
          checked={formData.current}
          onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: "" })}
          className="rounded border-border"
        />
        <Label htmlFor="current" className="text-sm">
          Trabajo actual
        </Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm">
          Descripción
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe tus responsabilidades y logros en este puesto..."
          rows={3}
          className="text-sm resize-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto bg-transparent">
          Cancelar
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Guardar
        </Button>
      </div>
    </form>
  )
}
