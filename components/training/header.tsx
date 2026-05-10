'use client'

import { Code2, Github, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({ 
  title = 'Training Lab', 
  subtitle = 'Next.js + shadcn/ui' 
}: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Documentação
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
