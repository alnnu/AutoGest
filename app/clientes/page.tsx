"use client"
import ClientCard from "@/components/cards/clientCard"
import DefaultInfoCard from "@/components/cards/defaultInfoCard"
import NewClientDialog from "@/components/modals/newClientDialog"
import NotFoundMessageBlock from "@/components/blocks/notFoundMessageBlock"
import { Input } from "@/components/ui/input"
import { clientsColection } from "@/utils/data/clientsData"
import { clientType } from "@/utils/types/clients"
import { useEffect, useState } from "react"

export default function Clientes() {
  const [clients, setClients] = useState<clientType[]>(clientsColection)
  const [search, setSearch] = useState("")
  const [filteredClients, setFilteredClients] = useState<clientType[]>(clients)

  useEffect(() => {
    const aux = clients.filter((client) =>
      client.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    setFilteredClients(aux)
  }, [search, clients])

  const totalClients = clients.length

  const totalMonthClients = clients.filter((client) =>
    client.createdAt.includes("/05/")
  ).length

  const totalActiveClients = clients.filter(
    (client) => client.active === true
  ).length

  const handleAddClient = (newClient: clientType) => {
    setClients((prev) => [newClient, ...prev])
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Clientes</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie seus clientes cadastrados
          </p>
        </div>
        <div>
          <NewClientDialog onAddClient={handleAddClient} />
        </div>
      </div>

      <div className="w-full rounded-xl bg-white px-6 py-4 shadow-sm">
        <Input
          placeholder="Buscar por nome"
          className="h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DefaultInfoCard label="Total de Clientes" info={totalClients} />
        <DefaultInfoCard label="Novos este Mês" info={totalMonthClients} />
        <DefaultInfoCard label="Clientes Ativos" info={totalActiveClients} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client, i) => (
          <ClientCard key={i} client={client} />
        ))}
      </div>

      {filteredClients.length <= 0 && (
        <>
          <NotFoundMessageBlock label="cliente" />
        </>
      )}
    </div>
  )
}
