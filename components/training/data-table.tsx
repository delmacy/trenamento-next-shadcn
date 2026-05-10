'use client'

import { useState } from 'react'
import type { User } from '@/types'
import { cn } from '@/lib/utils'
import { ChevronUp, ChevronDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DataTableProps {
  data: User[]
  className?: string
}

type SortField = 'name' | 'email' | 'role' | 'status'
type SortDirection = 'asc' | 'desc'

const roleLabels: Record<User['role'], string> = {
  admin: 'Administrador',
  editor: 'Editor',
  user: 'Usuário',
}

const statusStyles: Record<User['status'], string> = {
  active: 'bg-primary/20 text-primary',
  inactive: 'bg-muted text-muted-foreground',
  pending: 'bg-yellow-500/20 text-yellow-500',
}

const statusLabels: Record<User['status'], string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  pending: 'Pendente',
}

export function DataTable({ data, className }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const filteredData = data.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    const modifier = sortDirection === 'asc' ? 1 : -1
    return aValue.localeCompare(bValue) * modifier
  })
  
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />
  }
  
  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 font-medium -ml-2"
                  onClick={() => handleSort('name')}
                >
                  Usuário
                  <SortIcon field="name" />
                </Button>
              </th>
              <th className="text-left p-4 hidden md:table-cell">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 font-medium -ml-2"
                  onClick={() => handleSort('email')}
                >
                  Email
                  <SortIcon field="email" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 font-medium -ml-2"
                  onClick={() => handleSort('role')}
                >
                  Função
                  <SortIcon field="role" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 font-medium -ml-2"
                  onClick={() => handleSort('status')}
                >
                  Status
                  <SortIcon field="status" />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user) => (
              <tr 
                key={user.id} 
                className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full bg-secondary"
                    />
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-muted-foreground">
                  {user.email}
                </td>
                <td className="p-4 text-muted-foreground">
                  {roleLabels[user.role]}
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    statusStyles[user.status]
                  )}>
                    {statusLabels[user.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedData.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          Nenhum usuário encontrado.
        </div>
      )}
    </div>
  )
}
