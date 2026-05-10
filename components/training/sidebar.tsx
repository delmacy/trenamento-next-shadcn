'use client'

import { useState } from 'react'
import type { NavItem } from '@/types'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, LayoutDashboard, Box, Database, FormInput, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  items: NavItem[]
  className?: string
  onNavigate?: (href: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const iconMap: Record<string, React.ElementType> = {
  '#overview': LayoutDashboard,
  '#components': Box,
  '#data': Database,
  '#forms': FormInput,
  '#layouts': Layers,
}

export function Sidebar({ items, className, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  const [activeHref, setActiveHref] = useState(items.find(i => i.active)?.href || items[0]?.href)
  
  const handleClick = (href: string) => {
    setActiveHref(href)
    onNavigate?.(href)
  }
  
  return (
    <aside className={cn(
      "h-full border-r border-border bg-card/50 transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-4 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleCollapse}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {items.map((item) => {
              const Icon = iconMap[item.href] || LayoutDashboard
              const isActive = activeHref === item.href
              
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleClick(item.href)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className={cn(
                            "px-2 py-0.5 text-xs font-medium rounded-full",
                            isActive 
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
        
        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Training Lab v1.0
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
