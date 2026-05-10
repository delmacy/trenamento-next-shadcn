'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronUp, ChevronDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ColumnDef<TData> {
  header: string | React.ReactNode
  accessorKey?: keyof TData
  cell?: (item: TData) => React.ReactNode
  sortable?: boolean
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  className?: string
  searchKey?: keyof TData
}

export function DataTable<TData>({ columns, data, className, searchKey }: DataTableProps<TData>) {
  const [sortField, setSortField] = useState<keyof TData | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSort = (field: keyof TData | undefined) => {
    if (!field) return
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const filteredData = data.filter(item => {
    if (!searchKey || !searchTerm) return true
    const value = item[searchKey]
    if (typeof value === 'string') {
      return value.toLowerCase().includes(searchTerm.toLowerCase())
    }
    return true
  })
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (aValue === bValue) return 0

    const modifier = sortDirection === 'asc' ? 1 : -1

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * modifier
    }

    // Fallback for numbers or dates
    if (aValue < bValue) return -1 * modifier
    if (aValue > bValue) return 1 * modifier
    return 0
  })
  
  const SortIcon = ({ field }: { field?: keyof TData }) => {
    if (!field || sortField !== field) return null
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />
  }
  
  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      {/* Search */}
      {searchKey && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {columns.map((col, idx) => (
                <th key={idx} className="text-left p-4">
                  {col.sortable && col.accessorKey ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 font-medium -ml-2"
                      onClick={() => handleSort(col.accessorKey)}
                    >
                      {col.header}
                      <SortIcon field={col.accessorKey} />
                    </Button>
                  ) : (
                    <span className="font-medium text-sm text-muted-foreground">{col.header}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, rowIdx) => (
              <tr 
                key={rowIdx}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="p-4">
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                        ? String(item[col.accessorKey])
                        : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedData.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          Nenhum registro encontrado.
        </div>
      )}
    </div>
  )
}
