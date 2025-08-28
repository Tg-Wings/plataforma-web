import type { CandidateProfile, CompanyProfile } from "./auth"

export interface SearchFilters {
  searchTerm: string
  location: string
  skills: string[]
  experienceLevel: "junior" | "mid" | "senior" | ""
  industry: string
  availability: "available" | "employed" | ""
}

export interface CompanySearchFilters {
  searchTerm: string
  location: string
  industry: string
  companySize: "startup" | "small" | "medium" | "large" | ""
}

export class SearchService {
  // Búsqueda avanzada de candidatos
  searchCandidates(candidates: CandidateProfile[], filters: Partial<SearchFilters>): CandidateProfile[] {
    let filtered = [...candidates]

    // Búsqueda por término general
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filtered = filtered.filter((candidate) => {
        return (
          candidate.name.toLowerCase().includes(term) ||
          candidate.summary?.toLowerCase().includes(term) ||
          candidate.skills.some((skill) => skill.toLowerCase().includes(term)) ||
          candidate.experience.some(
            (exp) =>
              exp.company.toLowerCase().includes(term) ||
              exp.position.toLowerCase().includes(term) ||
              exp.description.toLowerCase().includes(term),
          )
        )
      })
    }

    // Filtro por ubicación
    if (filters.location) {
      const location = filters.location.toLowerCase()
      filtered = filtered.filter((candidate) => candidate.location?.toLowerCase().includes(location))
    }

    // Filtro por habilidades específicas
    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter((candidate) =>
        filters.skills!.some((skill) =>
          candidate.skills.some((candidateSkill) => candidateSkill.toLowerCase().includes(skill.toLowerCase())),
        ),
      )
    }

    // Filtro por nivel de experiencia
    if (filters.experienceLevel) {
      filtered = filtered.filter((candidate) => {
        const totalExperience = this.calculateExperienceYears(candidate.experience)
        switch (filters.experienceLevel) {
          case "junior":
            return totalExperience <= 2
          case "mid":
            return totalExperience > 2 && totalExperience <= 5
          case "senior":
            return totalExperience > 5
          default:
            return true
        }
      })
    }

    return filtered
  }

  // Búsqueda de empresas para candidatos
  searchCompanies(companies: CompanyProfile[], filters: Partial<CompanySearchFilters>): CompanyProfile[] {
    let filtered = [...companies]

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filtered = filtered.filter((company) => {
        return (
          company.companyName.toLowerCase().includes(term) ||
          company.description?.toLowerCase().includes(term) ||
          company.industry?.toLowerCase().includes(term)
        )
      })
    }

    if (filters.location) {
      const location = filters.location.toLowerCase()
      filtered = filtered.filter((company) => company.location?.toLowerCase().includes(location))
    }

    if (filters.industry) {
      filtered = filtered.filter((company) => company.industry?.toLowerCase() === filters.industry!.toLowerCase())
    }

    return filtered
  }

  // Calcular años de experiencia
  private calculateExperienceYears(experience: any[]): number {
    if (experience.length === 0) return 0

    let totalMonths = 0
    experience.forEach((exp) => {
      const startDate = new Date(exp.startDate + "-01")
      const endDate = exp.current ? new Date() : new Date(exp.endDate + "-01")
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth()
      totalMonths += Math.max(0, months)
    })

    return Math.round((totalMonths / 12) * 10) / 10 // Redondear a 1 decimal
  }

  // Obtener habilidades más populares
  getPopularSkills(candidates: CandidateProfile[]): string[] {
    const skillCount: { [key: string]: number } = {}

    candidates.forEach((candidate) => {
      candidate.skills.forEach((skill) => {
        const normalizedSkill = skill.toLowerCase()
        skillCount[normalizedSkill] = (skillCount[normalizedSkill] || 0) + 1
      })
    })

    return Object.entries(skillCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([skill]) => skill)
  }

  // Obtener ubicaciones más populares
  getPopularLocations(candidates: CandidateProfile[]): string[] {
    const locationCount: { [key: string]: number } = {}

    candidates.forEach((candidate) => {
      if (candidate.location) {
        const normalizedLocation = candidate.location.toLowerCase()
        locationCount[normalizedLocation] = (locationCount[normalizedLocation] || 0) + 1
      }
    })

    return Object.entries(locationCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([location]) => location)
  }
}

export const searchService = new SearchService()
