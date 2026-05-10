import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function SectionTitle({ title, description, className, children }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6", className)}>
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  )
}
