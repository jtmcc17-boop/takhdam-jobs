export type ContractType = 'CDI' | 'CDD' | 'Stage' | 'Freelance'
export type UserRole = 'seeker' | 'employer'
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected'

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          description: string | null
          website: string | null
          city: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          description?: string | null
          website?: string | null
          city?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          description?: string | null
          website?: string | null
          city?: string | null
          created_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          description: string
          location: string | null
          city: string | null
          salary_min: number | null
          salary_max: number | null
          contract_type: ContractType
          is_remote: boolean
          sector: string | null
          company_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location?: string | null
          city?: string | null
          salary_min?: number | null
          salary_max?: number | null
          contract_type: ContractType
          is_remote?: boolean
          sector?: string | null
          company_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string | null
          city?: string | null
          salary_min?: number | null
          salary_max?: number | null
          contract_type?: ContractType
          is_remote?: boolean
          sector?: string | null
          company_id?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: UserRole
          full_name: string | null
          cv_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          role: UserRole
          full_name?: string | null
          cv_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: UserRole
          full_name?: string | null
          cv_url?: string | null
          created_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          user_id: string
          status: ApplicationStatus
          cover_letter: string | null
          created_at: string
        }
        Insert: {
          id?: string
          job_id: string
          user_id: string
          status?: ApplicationStatus
          cover_letter?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          user_id?: string
          status?: ApplicationStatus
          cover_letter?: string | null
          created_at?: string
        }
      }
    }
    Enums: {
      contract_type: ContractType
      user_role: UserRole
      application_status: ApplicationStatus
    }
  }
}
