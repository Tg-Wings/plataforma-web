import type { User, CandidateProfile, CompanyProfile } from "./auth"

// Datos de demostración para testing
export const demoUsers: User[] = [
  // Candidatos
  {
    id: "1",
    email: "juan.perez@email.com",
    password: "123456",
    userType: "candidato", // Corregido de "type" a "userType"
    name: "Juan Pérez",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "maria.garcia@email.com",
    password: "123456",
    userType: "candidato", // Corregido de "type" a "userType"
    name: "María García",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "carlos.rodriguez@email.com",
    password: "123456",
    userType: "candidato", // Corregido de "type" a "userType"
    name: "Carlos Rodríguez",
    createdAt: new Date().toISOString(),
  },
  // Empresas
  {
    id: "4",
    email: "rrhh@techcorp.com",
    password: "123456",
    userType: "empresa", // Corregido de "type" a "userType"
    name: "TechCorp Solutions",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    email: "contacto@innovatech.com",
    password: "123456",
    userType: "empresa", // Corregido de "type" a "userType"
    name: "InnovaTech",
    createdAt: new Date().toISOString(),
  },
]

export const demoCandidateProfiles: CandidateProfile[] = [
  {
    userId: "1",
    name: "Juan Pérez", // Agregado campo name requerido
    email: "juan.perez@email.com", // Agregado campo email requerido
    phone: "+34 600 123 456",
    location: "Madrid, España",
    summary:
      "Desarrollador Full Stack con 5 años de experiencia en React, Node.js y bases de datos. Apasionado por crear soluciones innovadoras.",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB", "Git"],
    experience: [
      {
        id: "1",
        company: "Digital Solutions",
        position: "Desarrollador Senior",
        startDate: "2021-01",
        endDate: "2024-12",
        description: "Desarrollo de aplicaciones web usando React y Node.js. Liderazgo de equipo de 3 desarrolladores.",
        current: false,
      },
      {
        id: "2",
        company: "StartupTech",
        position: "Desarrollador Junior",
        startDate: "2019-06",
        endDate: "2020-12",
        description: "Desarrollo frontend con React y integración de APIs REST.",
        current: false,
      },
    ],
    profileImage: undefined,
    cvFile: undefined,
  },
  {
    userId: "2",
    name: "María García", // Agregado campo name requerido
    email: "maria.garcia@email.com", // Agregado campo email requerido
    phone: "+34 600 789 012",
    location: "Barcelona, España",
    summary:
      "Diseñadora UX/UI con experiencia en investigación de usuarios y prototipado. Especializada en diseño centrado en el usuario.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "HTML/CSS"],
    experience: [
      {
        id: "1",
        company: "Design Studio",
        position: "UX Designer",
        startDate: "2020-03",
        endDate: "2024-12",
        description:
          "Diseño de experiencias digitales para aplicaciones móviles y web. Investigación de usuarios y testing.",
        current: false,
      },
    ],
    profileImage: undefined,
    cvFile: undefined,
  },
  {
    userId: "3",
    name: "Carlos Rodríguez", // Agregado campo name requerido
    email: "carlos.rodriguez@email.com", // Agregado campo email requerido
    phone: "+34 600 345 678",
    location: "Valencia, España",
    summary:
      "Analista de datos con expertise en Python, SQL y machine learning. Experiencia en análisis predictivo y visualización de datos.",
    skills: ["Python", "SQL", "Pandas", "Tableau", "Machine Learning", "Excel"],
    experience: [
      {
        id: "1",
        company: "DataCorp",
        position: "Data Analyst",
        startDate: "2022-01",
        endDate: "2024-12",
        description: "Análisis de grandes volúmenes de datos y creación de dashboards interactivos.",
        current: false,
      },
    ],
    profileImage: undefined,
    cvFile: undefined,
  },
]

export const demoCompanyProfiles: CompanyProfile[] = [
  {
    userId: "4",
    companyName: "TechCorp Solutions",
    email: "rrhh@techcorp.com", // Agregado campo email requerido
    industry: "Tecnología",
    description: "Empresa líder en desarrollo de software empresarial con más de 10 años de experiencia.",
    website: "https://techcorp.com",
    phone: "+34 91 123 4567",
    location: "Madrid, España",
  },
  {
    userId: "5",
    companyName: "InnovaTech",
    email: "contacto@innovatech.com", // Agregado campo email requerido
    industry: "Startups",
    description: "Startup innovadora enfocada en soluciones de inteligencia artificial y machine learning.",
    website: "https://innovatech.com",
    phone: "+34 93 987 6543",
    location: "Barcelona, España",
  },
]

// Función para inicializar datos de demostración
export function initializeDemoData() {
  // Solo inicializar si no hay datos existentes
  const existingUsers = localStorage.getItem("talentconnect_users") // Corregido nombre de clave
  if (!existingUsers) {
    localStorage.setItem("talentconnect_users", JSON.stringify(demoUsers)) // Corregido nombre de clave
    localStorage.setItem("talentconnect_candidate_profiles", JSON.stringify(demoCandidateProfiles)) // Corregido nombre de clave
    localStorage.setItem("talentconnect_company_profiles", JSON.stringify(demoCompanyProfiles)) // Corregido nombre de clave
  }
}
