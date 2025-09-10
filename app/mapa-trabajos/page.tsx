"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Search, Filter, Building2, Map } from "lucide-react"
import Link from "next/link"

const trabajosEjemplo = [
  {
    id: "1",
    titulo: "Desarrollador Frontend React",
    empresa: "TechCorp Solutions",
    ubicacion: "Lima, Perú",
    coordenadas: { lat: -12.0464, lng: -77.0428 },
    salario: "S/ 3,500 - S/ 4,500",
    tipo: "Tiempo completo",
    modalidad: "Híbrido",
    industria: "Tecnología",
    descripcion: "Buscamos desarrollador Frontend con experiencia en React y TypeScript.",
  },
  {
    id: "2",
    titulo: "Diseñador UX/UI Senior",
    empresa: "InnovaTech",
    ubicacion: "Arequipa, Perú",
    coordenadas: { lat: -16.409, lng: -71.5375 },
    salario: "S/ 4,000 - S/ 5,000",
    tipo: "Tiempo completo",
    modalidad: "Remoto",
    industria: "Diseño",
    descripcion: "Diseñador UX/UI con experiencia en investigación de usuarios y prototipado.",
  },
  {
    id: "3",
    titulo: "Analista de Datos",
    empresa: "DataCorp",
    ubicacion: "Trujillo, Perú",
    coordenadas: { lat: -8.1116, lng: -79.0287 },
    salario: "S/ 3,000 - S/ 4,000",
    tipo: "Tiempo completo",
    modalidad: "Presencial",
    industria: "Análisis",
    descripcion: "Analista de datos con expertise en Python, SQL y machine learning.",
  },
  {
    id: "4",
    titulo: "Marketing Digital Manager",
    empresa: "Creative Agency",
    ubicacion: "Cusco, Perú",
    coordenadas: { lat: -13.5319, lng: -71.9675 },
    salario: "S/ 3,200 - S/ 4,200",
    tipo: "Tiempo completo",
    modalidad: "Híbrido",
    industria: "Marketing",
    descripcion: "Manager de marketing digital con experiencia en campañas y analytics.",
  },
  {
    id: "5",
    titulo: "Desarrollador Backend Node.js",
    empresa: "StartupTech",
    ubicacion: "Piura, Perú",
    coordenadas: { lat: -5.1945, lng: -80.6328 },
    salario: "S/ 3,800 - S/ 4,800",
    tipo: "Tiempo completo",
    modalidad: "Remoto",
    industria: "Tecnología",
    descripcion: "Desarrollador Backend especializado en Node.js y bases de datos.",
  },
]

export default function MapaTrabajos() {
  const [trabajos, setTrabajos] = useState(trabajosEjemplo)
  const [trabajosFiltrados, setTrabajosFiltrados] = useState(trabajosEjemplo)
  const [filtros, setFiltros] = useState({
    busqueda: "",
    ubicacion: "",
    industria: "todas",
    modalidad: "todas",
    tipo: "todos",
  })
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState<(typeof trabajosEjemplo)[0] | null>(null)

  useEffect(() => {
    let filtrados = trabajos

    if (filtros.busqueda) {
      filtrados = filtrados.filter(
        (trabajo) =>
          trabajo.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          trabajo.empresa.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
          trabajo.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()),
      )
    }

    if (filtros.ubicacion) {
      filtrados = filtrados.filter((trabajo) =>
        trabajo.ubicacion.toLowerCase().includes(filtros.ubicacion.toLowerCase()),
      )
    }

    if (filtros.industria !== "todas") {
      filtrados = filtrados.filter((trabajo) => trabajo.industria.toLowerCase() === filtros.industria)
    }

    if (filtros.modalidad !== "todas") {
      filtrados = filtrados.filter((trabajo) => trabajo.modalidad.toLowerCase() === filtros.modalidad)
    }

    if (filtros.tipo !== "todos") {
      filtrados = filtrados.filter((trabajo) => trabajo.tipo.toLowerCase() === filtros.tipo)
    }

    setTrabajosFiltrados(filtrados)
  }, [filtros, trabajos])

  const actualizarFiltro = (clave: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [clave]: valor }))
  }

  const MapaComponent = () => {
    return (
      <div className="w-full h-full relative overflow-hidden rounded-lg">
        {/* Google Maps embebido */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15606038.739273!2d-84.35374999999999!3d-9.189967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c850c05914f5%3A0x2e5c84c91c36f2c0!2sPer%C3%BA!5e0!3m2!1ses!2spe!4v1699999999999!5m2!1ses!2spe"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />

        {/* Overlay con marcadores de trabajos */}
        <div className="absolute inset-0 pointer-events-none">
          {trabajosFiltrados.map((trabajo, index) => {
            const left = 20 + ((index * 80) % 300)
            const top = 50 + Math.floor(index / 4) * 60
            const isSelected = trabajoSeleccionado?.id === trabajo.id

            return (
              <div
                key={trabajo.id}
                className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-xs font-bold text-white pointer-events-auto ${
                  isSelected ? "bg-red-500 z-20 scale-110" : "bg-[#CEC4AE]"
                }`}
                style={{ left: `${left}px`, top: `${top}px` }}
                onClick={() => setTrabajoSeleccionado(trabajo)}
                title={`${trabajo.titulo} - ${trabajo.empresa}`}
              >
                {index + 1}

                {/* Tooltip mejorado */}
                {isSelected && (
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl min-w-52 z-30 border">
                    <div className="text-sm font-semibold text-gray-800 mb-1">{trabajo.titulo}</div>
                    <div className="text-xs text-gray-600 mb-1">{trabajo.empresa}</div>
                    <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {trabajo.ubicacion}
                    </div>
                    <div className="text-xs font-semibold text-[#CEC4AE] mb-2">{trabajo.salario}</div>
                    <div className="text-xs text-gray-600">
                      {trabajo.modalidad} • {trabajo.tipo}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Título del mapa */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm z-10">
          <span className="text-sm font-medium text-gray-700">Trabajos en Perú - Google Maps</span>
        </div>

        {/* Leyenda */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm z-10">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-[#CEC4AE] rounded-full border border-white"></div>
            <span className="text-gray-700">Trabajos disponibles</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-accent" />
              <h1 className="text-lg md:text-2xl font-bold text-foreground">Joy Working</h1>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">Volver al Inicio</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <MapPin className="h-6 w-6 md:h-8 md:w-8 text-accent" />
            Mapa de Trabajos
          </h2>
          <p className="text-muted-foreground">
            Explora oportunidades laborales por ubicación geográfica y encuentra tu trabajo ideal cerca de ti.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="busqueda">Buscar trabajo</Label>
                <Input
                  id="busqueda"
                  placeholder="Título, empresa, descripción..."
                  value={filtros.busqueda}
                  onChange={(e) => actualizarFiltro("busqueda", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Input
                  id="ubicacion"
                  placeholder="Ciudad, región..."
                  value={filtros.ubicacion}
                  onChange={(e) => actualizarFiltro("ubicacion", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industria">Industria</Label>
                <Select value={filtros.industria} onValueChange={(value) => actualizarFiltro("industria", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="tecnología">Tecnología</SelectItem>
                    <SelectItem value="diseño">Diseño</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="análisis">Análisis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modalidad">Modalidad</Label>
                <Select value={filtros.modalidad} onValueChange={(value) => actualizarFiltro("modalidad", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="remoto">Remoto</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="híbrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={filtros.tipo} onValueChange={(value) => actualizarFiltro("tipo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="tiempo completo">Tiempo completo</SelectItem>
                    <SelectItem value="medio tiempo">Medio tiempo</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Mapa Interactivo ({trabajosFiltrados.length} trabajos)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full p-4">
              <div className="w-full h-full" style={{ minHeight: "400px" }}>
                <MapaComponent />
              </div>
            </CardContent>
          </Card>

          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Trabajos Disponibles ({trabajosFiltrados.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
              <div className="space-y-4">
                {trabajosFiltrados.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No se encontraron trabajos</p>
                    <p className="text-sm text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
                  </div>
                ) : (
                  trabajosFiltrados.map((trabajo) => (
                    <Card
                      key={trabajo.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        trabajoSeleccionado?.id === trabajo.id ? "ring-2 ring-accent" : ""
                      }`}
                      onClick={() => setTrabajoSeleccionado(trabajo)}
                    >
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{trabajo.titulo}</h3>
                            <p className="text-sm text-muted-foreground">{trabajo.empresa}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {trabajo.industria}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {trabajo.modalidad}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {trabajo.tipo}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {trabajo.ubicacion}
                            </span>
                            <span className="font-medium text-accent">{trabajo.salario}</span>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">{trabajo.descripcion}</p>

                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1">
                              Ver Detalles
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              Postularse
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent mb-2">{trabajosFiltrados.length}</div>
              <div className="text-sm text-muted-foreground">Trabajos Disponibles</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent mb-2">
                {new Set(trabajosFiltrados.map((t) => t.ubicacion.split(",")[0])).size}
              </div>
              <div className="text-sm text-muted-foreground">Ciudades</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent mb-2">
                {new Set(trabajosFiltrados.map((t) => t.empresa)).size}
              </div>
              <div className="text-sm text-muted-foreground">Empresas</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent mb-2">
                {new Set(trabajosFiltrados.map((t) => t.industria)).size}
              </div>
              <div className="text-sm text-muted-foreground">Industrias</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
