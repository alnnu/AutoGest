"use client"
import { Button } from "@/components/ui/button"
import { clientsColection } from "@/utils/data/clientsData"
import { clientType } from "@/utils/types/clients"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import ClientCard from "@/components/cards/clientCard"
import DefaultInfoCard from "@/components/cards/defaultInfoCard"

export default function Clientes() {
  const [clients, setClients] = useState<clientType[]>(clientsColection)
  const [filter, setFilter] = useState<string>("")

  const totalClients = clients.length

  const totalMonthClients = clients.filter((client) =>
    client.createdAt.includes("/05/")
  ).length

  const totalActiveClients = clients.filter(
    (client) => client.active === true
  ).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Clientes</h2>
          <p className="text-sm text-muted-foreground">Gerencie seus clientes cadastrados</p>
        </div>
        <div>
          <Button className="w-full bg-blue-500 px-5 py-4 hover:bg-blue-600 sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
      </div>

      <div className="w-full rounded-xl bg-white px-6 py-4 shadow-sm">
        <Input
          placeholder="Buscar por nome"
          className="h-12"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DefaultInfoCard label="Total de Clientes" info={totalClients} />
        <DefaultInfoCard label="Novos este Mês" info={totalMonthClients} />
        <DefaultInfoCard label="Clientes Ativos" info={totalActiveClients} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients
          .filter((client) =>
            client.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )
          .map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
      </div>
    </div>
  )
}
