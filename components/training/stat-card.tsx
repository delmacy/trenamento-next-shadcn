import { TrendingUp, TrendingDown, Minus, Users, Folder, Clock, BarChart3 } from 'lucide-react'
import type { Statistic } from '@/types'
import { cn } from '@/lib/utils'

interface StatCardProps {
  stat: Statistic
  className?: string
}

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  folder: Folder,
  clock: Clock,
  trending: BarChart3,
}

export function StatCard({ stat, className }: StatCardProps) {
  const Icon = stat.icon ? iconMap[stat.icon] || BarChart3 : BarChart3
  
  const TrendIcon = stat.trend === 'up' 
    ? TrendingUp 
    : stat.trend === 'down' 
    ? TrendingDown 
    : Minus

  const trendColor = stat.trend === 'up' 
    ? 'text-primary' 
    : stat.trend === 'down' 
    ? 'text-destructive' 
    : 'text-muted-foreground'

  return (
    <div className={cn(
      "p-6 rounded-xl border border-border bg-card hover:bg-card/80 transition-colors",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        
        {stat.change !== undefined && (
          <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
            <TrendIcon className="w-4 h-4" />
            <span>{Math.abs(stat.change)}%</span>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
      </div>
    </div>
  )
}
