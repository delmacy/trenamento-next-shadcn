// Tipos de dados para treinamento de componentização

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'editor'
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  status: 'em_progresso' | 'concluido' | 'pausado'
  progress: number
  assignees: User[]
  createdAt: string
  updatedAt: string
}

export interface Statistic {
  id: string
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  icon?: string
}

export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: string | number
  active?: boolean
}

export interface Component {
  id: string
  name: string
  description: string
  category: 'layout' | 'form' | 'data' | 'feedback' | 'navigation'
  difficulty: 'iniciante' | 'intermediario' | 'avancado'
  codeExample?: string
}
