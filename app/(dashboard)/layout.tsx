'use client'

import * as React from "react"
import { useState } from "react"
import { Header, Sidebar } from "@/components/training"
import { mockNavItems } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigate = (href: string) => {
    // Fechar menu mobile ao navegar
    setMobileMenuOpen(false)
    // Tratamento de rolagem para os mock links
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:block h-full",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar
          items={mockNavItems}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Main Wrapper */}
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out">
        <Header onToggleSidebar={() => setMobileMenuOpen(!mobileMenuOpen)} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-transparent transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  )
}
