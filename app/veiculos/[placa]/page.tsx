"use client"
import NotFoundMessageBlock from "@/components/blocks/notFoundMessageBlock"
import ClientCard from "@/components/cards/clientCard"
import ServiceHistoryCard from "@/components/cards/servicesHistoryCard"
import VeiculoCard from "@/components/cards/veiculoCard"
import VeiculoServiceStatisticsCard from "@/components/cards/veiculoServiceStatisticsCard"
import NewServiceOrderDialog from "@/components/modals/newServiceOrderDialog"
import EditVeiculoDialog from "@/components/modals/editVeiculoDialog"
import { Badge } from "@/components/ui/badge"
import { servicesColection } from "@/utils/data/ServicesData"
import { veiculosColection } from "@/utils/data/veiculoData"
import { serviceType } from "@/utils/types/services"
import { veiculosType } from "@/utils/types/veiculos"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { use, useEffect, useState } from "react"

export default function Veiculo({
  params,
}: {
  params: Promise<{ placa: string }>
}) {
  const { placa } = use(params)

  const [veiculo, setVeiculo] = useState<veiculosType | undefined>(undefined)
  const [services, setServices] = useState<serviceType[]>([])

  useEffect(() => {
    const v = veiculosColection.find((e) => e.placa === placa)
    setVeiculo(v)

    const s = servicesColection
      .filter((e) => e.veiculo.placa === placa)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    setServices(s)
  }, [placa])

  const handleAddService = (newService: serviceType) => {
    setServices((prev) => [newService, ...prev])
  }

  const handleUpdateVeiculo = (updatedVeiculo: veiculosType) => {
    setVeiculo(updatedVeiculo)
  }

  if (veiculo) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <Link href="/veiculos" className="mr-10 flex items-center">
              <ArrowLeft className="mr-2 size-4" /> <span>voltar</span>
            </Link>
            <div>
              <h2 className="text-2xl font-bold">{veiculo.model}</h2>
              <p className="text-sm text-muted-foreground">{veiculo.placa}</p>
            </div>
          </div>
          <div>
            <Badge
              className={
                veiculo.status === "ativo"
                  ? "border border-green-700 bg-green-100 text-green-700"
                  : veiculo.status === "Em Manutenção"
                    ? "border border-yellow-700 bg-yellow-100 text-yellow-700"
                    : "border border-blue-700 bg-blue-100 text-blue-700"
              }
            >
              {veiculo.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <VeiculoCard veiculo={veiculo} />
          <ClientCard client={veiculo.owner} />
          <ServiceHistoryCard services={services} />
          <VeiculoServiceStatisticsCard services={services} />
          <div className="flex flex-col gap-3 rounded-xl bg-white px-5 py-4 shadow-sm lg:col-start-3">
            <NewServiceOrderDialog
              onAddService={handleAddService}
              defaultPlaca={veiculo.placa}
            />
            <EditVeiculoDialog
              veiculo={veiculo}
              onUpdateVeiculo={handleUpdateVeiculo}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return <NotFoundMessageBlock label="veiculo" />
  }
}
