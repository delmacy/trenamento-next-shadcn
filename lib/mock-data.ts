import type { User, Project, Statistic, NavItem, Component } from '@/types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana@exemplo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos@exemplo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    role: 'editor',
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Maria Costa',
    email: 'maria@exemplo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    role: 'user',
    status: 'pending',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Pedro Lima',
    email: 'pedro@exemplo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-05',
  },
]

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Dashboard de Vendas',
    description: 'Painel completo com métricas e gráficos de vendas',
    status: 'em_progresso',
    progress: 65,
    assignees: [mockUsers[0], mockUsers[1]],
    createdAt: '2024-01-10',
    updatedAt: '2024-03-20',
  },
  {
    id: '2',
    title: 'Sistema de Autenticação',
    description: 'Login, registro e recuperação de senha',
    status: 'concluido',
    progress: 100,
    assignees: [mockUsers[2]],
    createdAt: '2024-02-01',
    updatedAt: '2024-03-15',
  },
  {
    id: '3',
    title: 'API de Integração',
    description: 'Endpoints REST para integração com terceiros',
    status: 'pausado',
    progress: 30,
    assignees: [mockUsers[0], mockUsers[3]],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-18',
  },
]

export const mockStatistics: Statistic[] = [
  {
    id: '1',
    label: 'Total de Usuários',
    value: 2847,
    change: 12.5,
    trend: 'up',
    icon: 'users',
  },
  {
    id: '2',
    label: 'Projetos Ativos',
    value: 23,
    change: -2.3,
    trend: 'down',
    icon: 'folder',
  },
  {
    id: '3',
    label: 'Taxa de Conversão',
    value: '8.2%',
    change: 4.1,
    trend: 'up',
    icon: 'trending',
  },
  {
    id: '4',
    label: 'Tempo Médio',
    value: '3.2min',
    change: 0,
    trend: 'neutral',
    icon: 'clock',
  },
]

export const mockNavItems: NavItem[] = [
  { label: 'Visão Geral', href: '#overview', active: true },
  { label: 'Componentes', href: '#components', badge: '12' },
  { label: 'Dados', href: '#data' },
  { label: 'Formulários', href: '#forms' },
  { label: 'Layouts', href: '#layouts' },
]

export const mockComponents: Component[] = [
  {
    id: '1',
    name: 'StatCard',
    description: 'Card para exibir estatísticas com tendência',
    category: 'data',
    difficulty: 'iniciante',
  },
  {
    id: '2',
    name: 'UserCard',
    description: 'Card de perfil de usuário com avatar e informações',
    category: 'data',
    difficulty: 'iniciante',
  },
  {
    id: '3',
    name: 'ProjectCard',
    description: 'Card de projeto com barra de progresso',
    category: 'data',
    difficulty: 'intermediario',
  },
  {
    id: '4',
    name: 'DataTable',
    description: 'Tabela de dados com ordenação e filtros',
    category: 'data',
    difficulty: 'avancado',
  },
  {
    id: '5',
    name: 'Sidebar',
    description: 'Menu lateral responsivo',
    category: 'navigation',
    difficulty: 'intermediario',
  },
  {
    id: '6',
    name: 'Header',
    description: 'Cabeçalho com navegação e ações',
    category: 'layout',
    difficulty: 'iniciante',
  },
]
