"use client"

import { veiculosType } from "@/utils/types/veiculos"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { User, Gauge } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"

interface DataTableProps {
  data: veiculosType[]
}

const formatMilhar = (valor: number): string => {
  return new Intl.NumberFormat("pt-BR").format(valor)
}

const columns: ColumnDef<veiculosType>[] = [
  {
    accessorKey: "model",
    header: "Veículo",
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.model}</p>
          <p className="text-light text-sm text-muted-foreground">
            {row.original.yaer} - {row.original.color}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: "placa",
    header: "Placa",
    cell: ({ row }) => {
      return (
        <div className="w-fit rounded-xl bg-gray-100 px-3 py-2">
          {row.original.placa}
        </div>
      )
    },
  },
  {
    id: "owner",
    header: "Proprietário",
    cell: ({ row }) => {
      const owner = row.original.owner
      return (
        <div className="flex items-center">
          <User className="mr-2 size-4 text-muted-foreground" />
          <span>{owner.name}</span>
        </div>
      )
    },
  },
  {
    id: "km",
    header: "KM",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Gauge className="mr-2 size-4 text-muted-foreground" />
          <span>{formatMilhar(row.original.km)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          className={
            status === "ativo"
              ? "border border-green-700 bg-green-100 text-green-700"
              : status === "Em Manutenção"
                ? "border border-yellow-700 bg-yellow-100 text-yellow-700"
                : "border border-blue-700 bg-blue-100 text-blue-700"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Link href="#" className="rounded-xl px-4 py-2 hover:bg-muted">
            Ver detalhes
          </Link>
        </div>
      )
    },
  },
]

export default function VeiculosTable({ data }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="pb-4 font-bold text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum veículo encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
