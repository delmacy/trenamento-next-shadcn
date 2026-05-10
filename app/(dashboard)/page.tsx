'use client'

import { useState } from 'react'
import {
  StatCard,
  UserCard,
  ProjectCard,
  ComponentCard,
  SectionTitle,
  DataTable,
  CodeBlock
} from '@/components/training'
import {
  mockUsers,
  mockProjects,
  mockStatistics,
  mockComponents
} from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Grid3X3, List } from 'lucide-react'

const exampleCode = `// Exemplo de componentização
interface UserCardProps {
  user: User
  variant?: 'default' | 'compact'
}

export function UserCard({ user, variant = 'default' }: UserCardProps) {
  return (
    <div className="p-6 rounded-xl border bg-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}`

export default function TrainingPage() {
  const [userCardVariant, setUserCardVariant] = useState<'default' | 'compact'>('default')

  return (
    <div className="max-w-6xl mx-auto space-y-12">

      {/* Overview Section */}
      <section id="overview">
        <SectionTitle
          title="Visão Geral"
          description="Métricas e estatísticas do sistema"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStatistics.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      {/* Components Section */}
      <section id="components">
        <SectionTitle
          title="Biblioteca de Componentes"
          description="Componentes disponíveis para treinamento"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockComponents.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section>
        <SectionTitle
          title="Exemplo de Código"
          description="Como criar um componente reutilizável"
        />
        <CodeBlock
          code={exampleCode}
          language="tsx"
          title="user-card.tsx"
        />
      </section>

      {/* Data Section */}
      <section id="data">
        <SectionTitle
          title="Exibição de Dados"
          description="Diferentes formas de mostrar dados"
        >
          <Button
            variant={userCardVariant === 'default' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setUserCardVariant('default')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={userCardVariant === 'compact' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setUserCardVariant('compact')}
          >
            <List className="w-4 h-4" />
          </Button>
        </SectionTitle>

        <div className={userCardVariant === 'default'
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          : "space-y-2 max-w-2xl"
        }>
          {mockUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              variant={userCardVariant}
            />
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <SectionTitle
          title="Projetos"
          description="Cards de projeto com barra de progresso"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => alert(`Selecionado: ${p.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Table Section */}
      <section id="forms">
        <SectionTitle
          title="Tabela de Dados"
          description="Tabela com busca e ordenação"
        />
        <DataTable data={mockUsers} />
      </section>

      {/* Layouts Section */}
      <section id="layouts">
        <SectionTitle
          title="Padrões de Layout"
          description="Exemplos de estruturas de layout"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bento Grid Example */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">Bento Grid</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 h-24 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                Header
              </div>
              <div className="h-32 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                Card 1
              </div>
              <div className="h-32 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                Card 2
              </div>
              <div className="col-span-2 h-20 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                Footer
              </div>
            </div>
          </div>

          {/* Sidebar Layout Example */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">Sidebar Layout</h3>
            <div className="flex gap-3 h-48">
              <div className="w-16 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground text-xs">
                Nav
              </div>
              <div className="flex-1 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                Content
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="pb-8">
        <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
          <h3 className="font-semibold text-foreground mb-2">Dicas de Componentização</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>1. Sempre defina tipos/interfaces para props</li>
            <li>2. Use valores default para props opcionais</li>
            <li>3. Separe lógica de apresentação</li>
            <li>4. Mantenha componentes pequenos e focados</li>
            <li>5. Reutilize estilos com o cn() utility</li>
          </ul>
        </div>
      </section>

    </div>
  )
}
