import type { Component } from '@/types'
import { cn } from '@/lib/utils'
import { Layout, FormInput, Database, Bell, Navigation } from 'lucide-react'

interface ComponentCardProps {
  component: Component
  className?: string
}

const categoryIcons: Record<Component['category'], React.ElementType> = {
  layout: Layout,
  form: FormInput,
  data: Database,
  feedback: Bell,
  navigation: Navigation,
}

const categoryLabels: Record<Component['category'], string> = {
  layout: 'Layout',
  form: 'Formulário',
  data: 'Dados',
  feedback: 'Feedback',
  navigation: 'Navegação',
}

const difficultyStyles: Record<Component['difficulty'], string> = {
  iniciante: 'bg-primary/20 text-primary',
  intermediario: 'bg-blue-500/20 text-blue-400',
  avancado: 'bg-orange-500/20 text-orange-400',
}

const difficultyLabels: Record<Component['difficulty'], string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export function ComponentCard({ component, className }: ComponentCardProps) {
  const CategoryIcon = categoryIcons[component.category]
  
  return (
    <div className={cn(
      "p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all group",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
          <CategoryIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <span className={cn(
          "px-2 py-0.5 text-xs font-medium rounded-full",
          difficultyStyles[component.difficulty]
        )}>
          {difficultyLabels[component.difficulty]}
        </span>
      </div>
      
      <div className="mt-4">
        <h3 className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
          {'<'}{component.name}{' />'}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {component.description}
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Categoria: {categoryLabels[component.category]}
        </span>
      </div>
    </div>
  )
}
