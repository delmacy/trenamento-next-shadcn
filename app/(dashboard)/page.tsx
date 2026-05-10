'use client'

import * as React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StatCard } from '@/components/training/stat-card'
import { DataTable, ColumnDef } from '@/components/training/data-table'
import { dashboardData } from '@/lib/mock-data'
import { Order } from '@/types'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

// Orders columns configuration
const orderColumns: ColumnDef<Order>[] = [
  {
    header: 'Cliente',
    accessorKey: 'customer',
    sortable: true,
    cell: (order) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={order.avatar} alt={order.customer} />
          <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{order.customer}</span>
          <span className="text-xs text-muted-foreground">{order.email}</span>
        </div>
      </div>
    )
  },
  {
    header: 'Data',
    accessorKey: 'date',
    sortable: true,
    cell: (order) => (
      <span className="text-sm text-muted-foreground">
        {order.date.split('-').reverse().join('/')}
      </span>
    )
  },
  {
    header: 'Valor',
    accessorKey: 'amount',
    sortable: true,
    cell: (order) => (
      <span className="text-sm font-medium">
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.amount)}
      </span>
    )
  },
  {
    header: 'Status',
    accessorKey: 'status',
    sortable: true,
    cell: (order) => {
      const isPaid = order.status === 'Paid'
      const isDue = order.status === 'Due'
      const isCanceled = order.status === 'Canceled'

      return (
        <Badge
          variant="outline"
          className={cn(
            "border-transparent font-medium",
            isPaid && "text-green-500 bg-green-500/10",
            isDue && "text-yellow-500 bg-yellow-500/10",
            isCanceled && "text-red-500 bg-red-500/10"
          )}
        >
          {order.status}
        </Badge>
      )
    }
  }
]

export default function DashboardOverviewPage() {
  const { stats, recentOrders, chartData } = dashboardData

  return (
    <div className="space-y-6">
      {/* 1. Topo (Grid 4 colunas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* 2. Meio (Grid 12 colunas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Lado Esquerdo (col-span-8): Gráfico de Área */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>Histórico de Vendas</CardTitle>
            <CardDescription>Acompanhamento mensal de vendas e visitantes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "Vendas",
                  color: "hsl(var(--primary))",
                },
                visitors: {
                  label: "Visitantes",
                  color: "hsl(var(--muted-foreground))",
                },
              }}
              className="h-[300px] w-full"
            >
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="visitors" stroke="var(--color-visitors)" fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="sales" stroke="var(--color-sales)" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Lado Direito (col-span-4): Support Tracker */}
        <Card className="lg:col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Support Tracker</CardTitle>
            <CardDescription>Resolução de tickets (últimos 7 dias)</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <ChartContainer
              config={{
                completed: {
                  label: "Concluídos",
                  color: "hsl(var(--primary))",
                }
              }}
              className="h-[250px] w-full aspect-square"
            >
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
                barSize={20}
                data={[{ name: "Concluídos", value: 85, fill: "var(--color-completed)" }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background={{ fill: "hsl(var(--muted))" }}
                  dataKey="value"
                  cornerRadius={10}
                />
                {/* Custom text inside radial */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground font-bold text-3xl"
                >
                  85%
                </text>
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-sm"
                >
                  Resolvidos
                </text>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* 3. Base (col-span-12): Tabela de Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Recentes</CardTitle>
          <CardDescription>Gerencie as últimas vendas da plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={orderColumns}
            data={recentOrders}
            searchKey="customer"
            className="border-none shadow-none"
          />
        </CardContent>
      </Card>
    </div>
  )
}
