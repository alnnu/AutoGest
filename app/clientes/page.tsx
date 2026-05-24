"use client"
import { Button } from "@/components/ui/button"
import { clientsColection } from "@/utils/data/clientsData"
import { clientType } from "@/utils/types/clients"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

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
    <>
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Clientes</h2>
          <p className="text-sm">Gerencie seus clientes cadastrados</p>
        </div>
        <div>
          <Button className="bg-blue-500 px-5 py-4">
            <Plus className="mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>

      <div className="mt-10 w-full rounded-xl bg-white px-6 py-4 shadow-sm">
        <Input
          placeholder="Buscar por nome"
          className="h-12"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="mt-6 grid grid-flow-col gap-4">
        <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
          <h3 className="text-sm">Total de Clientes</h3>
          <p className="mt-4 text-2xl font-bold">{totalClients}</p>
        </div>
        <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
          <h3 className="text-sm">Novos este Mês</h3>
          <p className="mt-4 text-2xl font-bold">{totalMonthClients}</p>
        </div>
        <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
          <h3 className="text-sm">Clientes Ativos</h3>
          <p className="mt-4 text-2xl font-bold">{totalActiveClients}</p>
        </div>
      </div>

      {clients
        .filter((client) =>
          client.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        )
        .map((client, i) => (
          <div key={i}>{client.name}</div>
        ))}
    </>
  )
}
