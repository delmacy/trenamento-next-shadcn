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

export const dashboardData = {
  stats: [
    {
      id: 'stat-1',
      label: 'Vendas',
      value: 'R$ 45.231,89',
      change: 20.1,
      trend: 'up',
      icon: 'trending',
      color: 'indigo'
    },
    {
      id: 'stat-2',
      label: 'Ganhos',
      value: 'R$ 12.053,41',
      change: 15.2,
      trend: 'up',
      icon: 'folder',
      color: 'green'
    },
    {
      id: 'stat-3',
      label: 'Visitantes',
      value: '2.405',
      change: -4.3,
      trend: 'down',
      icon: 'users',
      color: 'yellow'
    },
    {
      id: 'stat-4',
      label: 'Pedidos',
      value: '456',
      change: 8.4,
      trend: 'up',
      icon: 'clock',
      color: 'red'
    }
  ] as (Statistic & { color?: string })[],
  recentOrders: [
    {
      id: 'ORD-001',
      customer: 'João Silva',
      email: 'joao.silva@exemplo.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
      amount: 1500.00,
      status: 'Paid',
      date: '2024-05-10',
    },
    {
      id: 'ORD-002',
      customer: 'Maria Fernanda',
      email: 'maria.f@exemplo.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaF',
      amount: 3450.50,
      status: 'Due',
      date: '2024-05-09',
    },
    {
      id: 'ORD-003',
      customer: 'Carlos Andrade',
      email: 'carlos.a@exemplo.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosA',
      amount: 250.00,
      status: 'Canceled',
      date: '2024-05-08',
    },
    {
      id: 'ORD-004',
      customer: 'Ana Costa',
      email: 'ana.costa@exemplo.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaC',
      amount: 4500.00,
      status: 'Paid',
      date: '2024-05-08',
    },
    {
      id: 'ORD-005',
      customer: 'Pedro Santos',
      email: 'pedro.s@exemplo.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PedroS',
      amount: 120.00,
      status: 'Paid',
      date: '2024-05-07',
    }
  ] as import('@/types').Order[],
  chartData: [
    { name: 'Jan', sales: 4000, visitors: 2400 },
    { name: 'Fev', sales: 3000, visitors: 1398 },
    { name: 'Mar', sales: 2000, visitors: 9800 },
    { name: 'Abr', sales: 2780, visitors: 3908 },
    { name: 'Mai', sales: 1890, visitors: 4800 },
    { name: 'Jun', sales: 2390, visitors: 3800 },
    { name: 'Jul', sales: 3490, visitors: 4300 },
  ] as import('@/types').ChartDataPoint[]
}
