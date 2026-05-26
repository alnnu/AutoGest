import NotFoundMessageBlock from "@/components/blocks/notFoundMessageBlock"
import ClientCard from "@/components/cards/clientCard"
import ServiceHistoryCard from "@/components/cards/servicesHistoryCard"
import VeiculoCard from "@/components/cards/veiculoCard"
import VeiculoServiceStatisticsCard from "@/components/cards/veiculoServiceStatisticsCard"
import { Badge } from "@/components/ui/badge"
import { servicesColection } from "@/utils/data/ServicesData"
import { veiculosColection } from "@/utils/data/veiculoData"
import { serviceType } from "@/utils/types/services"
import { veiculosType } from "@/utils/types/veiculos"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function Veiculo({
  params,
}: {
  params: Promise<{ placa: string }>
}) {
  const allVeiculos: veiculosType[] = veiculosColection
  const allServices: serviceType[] = servicesColection

  const { placa } = await params

  const veiculo: veiculosType | undefined = allVeiculos.find(
    (e) => e.placa === placa
  )

  const services: serviceType[] = allServices
    .filter((e) => e.veiculo.placa === placa)
    .sort((a, b) => a.date.localeCompare(b.date))
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

        <div className="grid grid-cols-3 gap-4">
          <VeiculoCard veiculo={veiculo} />

          <ClientCard client={veiculo.owner} />

          <ServiceHistoryCard services={services} />

          <VeiculoServiceStatisticsCard services={services} />
        </div>
      </div>
    )
  } else {
    return <NotFoundMessageBlock label="veiculo" />
  }
}
