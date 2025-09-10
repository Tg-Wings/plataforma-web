export interface User {
  id: string
  email: string
  password: string
  userType: "candidato" | "empresa"
  name: string
  createdAt: string
}

export interface CandidateProfile {
  userId: string
  name: string
  email: string
  phone?: string
  location?: string
  profileImage?: string
  cvFile?: string
  experience: WorkExperience[]
  skills: string[]
  summary?: string
}

export interface CompanyProfile {
  userId: string
  companyName: string
  email: string
  phone?: string
  location?: string
  website?: string
  description?: string
  industry?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

class AuthService {
  private readonly USERS_KEY = "joyworking_users"
  private readonly CURRENT_USER_KEY = "joyworking_current_user"
  private readonly CANDIDATE_PROFILES_KEY = "joyworking_candidate_profiles"
  private readonly COMPANY_PROFILES_KEY = "joyworking_company_profiles"

  // Gestión de usuarios
  getUsers(): User[] {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem(this.USERS_KEY)
    return users ? JSON.parse(users) : []
  }

  saveUsers(users: User[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
  }

  // Registro
  register(
    email: string,
    password: string,
    name: string,
    userType: "candidato" | "empresa",
  ): { success: boolean; message: string; user?: User } {
    const users = this.getUsers()

    if (users.find((u) => u.email === email)) {
      return { success: false, message: "El email ya está registrado" }
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      userType,
      name,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    this.saveUsers(users)

    // Crear perfil inicial
    if (userType === "candidato") {
      this.createCandidateProfile(newUser.id, name, email)
    } else {
      this.createCompanyProfile(newUser.id, name, email)
    }

    return { success: true, message: "Usuario registrado exitosamente", user: newUser }
  }

  // Login
  login(email: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers()
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, message: "Credenciales incorrectas" }
    }

    this.setCurrentUser(user)
    return { success: true, message: "Login exitoso", user }
  }

  // Usuario actual
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(this.CURRENT_USER_KEY)
    return user ? JSON.parse(user) : null
  }

  setCurrentUser(user: User): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user))
  }

  logout(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.CURRENT_USER_KEY)
  }

  // Perfiles de candidatos
  getCandidateProfiles(): CandidateProfile[] {
    if (typeof window === "undefined") return []
    const profiles = localStorage.getItem(this.CANDIDATE_PROFILES_KEY)
    return profiles ? JSON.parse(profiles) : []
  }

  saveCandidateProfiles(profiles: CandidateProfile[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.CANDIDATE_PROFILES_KEY, JSON.stringify(profiles))
  }

  createCandidateProfile(userId: string, name: string, email: string): void {
    const profiles = this.getCandidateProfiles()
    const newProfile: CandidateProfile = {
      userId,
      name,
      email,
      experience: [],
      skills: [],
    }
    profiles.push(newProfile)
    this.saveCandidateProfiles(profiles)
  }

  getCandidateProfile(userId: string): CandidateProfile | null {
    const profiles = this.getCandidateProfiles()
    return profiles.find((p) => p.userId === userId) || null
  }

  updateCandidateProfile(profile: CandidateProfile): void {
    const profiles = this.getCandidateProfiles()
    const index = profiles.findIndex((p) => p.userId === profile.userId)
    if (index !== -1) {
      profiles[index] = profile
      this.saveCandidateProfiles(profiles)
    }
  }

  // Perfiles de empresas
  getCompanyProfiles(): CompanyProfile[] {
    if (typeof window === "undefined") return []
    const profiles = localStorage.getItem(this.COMPANY_PROFILES_KEY)
    return profiles ? JSON.parse(profiles) : []
  }

  saveCompanyProfiles(profiles: CompanyProfile[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.COMPANY_PROFILES_KEY, JSON.stringify(profiles))
  }

  createCompanyProfile(userId: string, companyName: string, email: string): void {
    const profiles = this.getCompanyProfiles()
    const newProfile: CompanyProfile = {
      userId,
      companyName,
      email,
    }
    profiles.push(newProfile)
    this.saveCompanyProfiles(profiles)
  }

  getCompanyProfile(userId: string): CompanyProfile | null {
    const profiles = this.getCompanyProfiles()
    return profiles.find((p) => p.userId === userId) || null
  }

  updateCompanyProfile(profile: CompanyProfile): void {
    const profiles = this.getCompanyProfiles()
    const index = profiles.findIndex((p) => p.userId === profile.userId)
    if (index !== -1) {
      profiles[index] = profile
      this.saveCompanyProfiles(profiles)
    }
  }
}

export const authService = new AuthService()
