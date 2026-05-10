import type { Project } from '@/types'
import { cn } from '@/lib/utils'
import { Calendar, Users, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  project: Project
  className?: string
  onSelect?: (project: Project) => void
}

const statusStyles: Record<Project['status'], string> = {
  em_progresso: 'bg-blue-500/20 text-blue-400',
  concluido: 'bg-primary/20 text-primary',
  pausado: 'bg-yellow-500/20 text-yellow-500',
}

const statusLabels: Record<Project['status'], string> = {
  em_progresso: 'Em Progresso',
  concluido: 'Concluído',
  pausado: 'Pausado',
}

export function ProjectCard({ project, className, onSelect }: ProjectCardProps) {
  return (
    <div 
      className={cn(
        "p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all cursor-pointer group",
        className
      )}
      onClick={() => onSelect?.(project)}
    >
      <div className="flex items-start justify-between">
        <span className={cn(
          "px-3 py-1 text-xs font-medium rounded-full",
          statusStyles[project.status]
        )}>
          {statusLabels[project.status]}
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {project.description}
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-medium text-foreground">{project.progress}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <div className="flex -space-x-2">
            {project.assignees.slice(0, 3).map((user) => (
              <img
                key={user.id}
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                title={user.name}
                className="w-6 h-6 rounded-full border-2 border-card bg-secondary"
              />
            ))}
            {project.assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full border-2 border-card bg-secondary flex items-center justify-center text-xs text-muted-foreground">
                +{project.assignees.length - 3}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{new Date(project.updatedAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </div>
  )
}
