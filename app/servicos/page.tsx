"use client"

import NotFoundMessageBlock from "@/components/blocks/notFoundMessageBlock"
import DefaultInfoCard from "@/components/cards/defaultInfoCard"
import ServiceCard from "@/components/cards/serviceCard"
import NewServiceOrderDialog from "@/components/modals/newServiceOrderDialog"
import { Input } from "@/components/ui/input"
import { servicesColection } from "@/utils/data/ServicesData"
import { serviceType } from "@/utils/types/services"
import { useEffect, useState } from "react"

export default function Servicos() {
  const [services, setServices] = useState<serviceType[]>(servicesColection)
  const [search, setSearch] = useState("")
  const [filteredServices, setFilteredServices] =
    useState<serviceType[]>(services)

  useEffect(() => {
    const aux = services.filter(
      (e) =>
        e.desc.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        e.veiculo.placa.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    setFilteredServices(aux)
  }, [search, services])

  const totalServices = services.length

  const totalFinishServices = services.filter(
    (e) => e.status === "concluidos"
  ).length

  const totalWorkingServices = services.filter(
    (e) => e.status === "em andamento"
  ).length

  const totalWaitingServices = services.filter(
    (e) => e.status === "pendentes"
  ).length

  const handleAddService = (newService: serviceType) => {
    setServices((prev) => [newService, ...prev])
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ordens de Serviço</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie todos os serviços da oficina
          </p>
        </div>
        <div>
          <NewServiceOrderDialog onAddService={handleAddService} />
        </div>
      </div>
      <div className="w-full rounded-xl bg-white px-6 py-4 shadow-sm">
        <Input
          placeholder="Buscar por placa ou descrição"
          className="h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DefaultInfoCard label="Total de Ordens" info={totalServices} />
        <DefaultInfoCard label="Concluídos" info={totalFinishServices} />
        <DefaultInfoCard label="Em Andamento" info={totalWorkingServices} />
        <DefaultInfoCard label="Pendentes" info={totalWaitingServices} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service, i) => (
          <ServiceCard key={i} service={service} />
        ))}
      </div>
      {filteredServices.length <= 0 && (
        <>
          <NotFoundMessageBlock label="serviço" />
        </>
      )}
    </div>
  )
}
