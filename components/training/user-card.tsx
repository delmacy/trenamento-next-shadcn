import type { User } from '@/types'
import { cn } from '@/lib/utils'
import { Mail, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UserCardProps {
  user: User
  variant?: 'default' | 'compact'
  className?: string
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

const roleLabels: Record<User['role'], string> = {
  admin: 'Administrador',
  editor: 'Editor',
  user: 'Usuário',
}

export function UserCard({ user, variant = 'default', className }: UserCardProps) {
  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors",
        className
      )}>
        <img
          src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
          alt={user.name}
          className="w-8 h-8 rounded-full bg-secondary"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground">{roleLabels[user.role]}</p>
        </div>
        <span className={cn(
          "px-2 py-0.5 text-xs font-medium rounded-full",
          statusStyles[user.status]
        )}>
          {statusLabels[user.status]}
        </span>
      </div>
    )
  }

  return (
    <div className={cn(
      "p-6 rounded-xl border border-border bg-card",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
            alt={user.name}
            className="w-12 h-12 rounded-full bg-secondary"
          />
          <div>
            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{roleLabels[user.role]}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="w-4 h-4" />
        <span>{user.email}</span>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className={cn(
          "px-3 py-1 text-xs font-medium rounded-full",
          statusStyles[user.status]
        )}>
          {statusLabels[user.status]}
        </span>
        <span className="text-xs text-muted-foreground">
          Desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}
        </span>
      </div>
    </div>
  )
}
