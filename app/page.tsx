import DashboardInfoCard from "@/components/dashboard/DashboardInfoCard"
import { servicesColection } from "@/utils/data/ServicesData"
import { serviceType } from "@/utils/types/services"
import { veiculosType } from "@/utils/types/veiculos"
import { veiculosColection } from "@/utils/data/veiculoData"
import { clientType } from "@/utils/types/clients"
import { clientsColection } from "@/utils/data/clientsData"
import DefaultInfoCard from "@/components/cards/defaultInfoCard"
import { ChartLine } from "@/components/dashboard/chart/lineChart"
import { WorkerChartBar } from "@/components/dashboard/chart/workersChart"

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number)
  return new Date(year, month - 1, day)
}

const getThisMonth = <T extends { createdAt: string }>(items: T[]): T[] => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return items.filter((item) => {
    const itemDate = parseDate(item.createdAt)
    return (
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear
    )
  })
}

const getLastMonth = <T extends { createdAt: string }>(items: T[]): T[] => {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const targetMonth = lastMonth.getMonth()
  const targetYear = lastMonth.getFullYear()

  return items.filter((item) => {
    const itemDate = parseDate(item.createdAt)
    return (
      itemDate.getMonth() === targetMonth &&
      itemDate.getFullYear() === targetYear
    )
  })
}

const getMonthlyStats = (services: serviceType[]) => {
  const stats = services.reduce(
    (acc, service) => {
      const date = parseDate(service.createdAt)
      const monthName = date.toLocaleString("pt-BR", { month: "long" })
      const year = date.getFullYear()
      const key = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`

      if (!acc[key]) {
        acc[key] = {
          mes: key,
          totalServicos: 0,
          totalReceita: 0,
        }
      }

      acc[key].totalServicos += 1
      acc[key].totalReceita += service.value

      return acc
    },
    {} as Record<
      string,
      { mes: string; totalServicos: number; totalReceita: number }
    >
  )

  return Object.values(stats)
}

const getWorkerStats = (services: serviceType[]) => {
  const currentMonthServices = getThisMonth(services) as serviceType[]

  const stats = currentMonthServices.reduce(
    (acc, service) => {
      const worker = service.worker
      if (!acc[worker]) {
        acc[worker] = {
          worker: worker,
          totalServicos: 0,
          totalReceita: 0,
        }
      }
      acc[worker].totalServicos += 1
      acc[worker].totalReceita += service.value
      return acc
    },
    {} as Record<
      string,
      { worker: string; totalServicos: number; totalReceita: number }
    >
  )

  return Object.values(stats).sort((a, b) => b.totalServicos - a.totalServicos)
}

export default function Page() {
  const services: serviceType[] = servicesColection

  const veiculos: veiculosType[] = veiculosColection

  const client: clientType[] = clientsColection

  const servicesThisMonth = getThisMonth(services)
  const servicesLastMonth = getLastMonth(services)

  const totalReceivedThisMonth = servicesThisMonth.reduce(
    (acc, service) => acc + service.value,
    0
  )
  const totalReceivedLastMonth = servicesLastMonth.reduce(
    (acc, service) => acc + service.value,
    0
  )

  const ticketMedioThisMonth =
    servicesThisMonth.length > 0
      ? totalReceivedThisMonth / servicesThisMonth.length
      : 0
  const ticketMedioLastMonth =
    servicesLastMonth.length > 0
      ? totalReceivedLastMonth / servicesLastMonth.length
      : 0

  const vehiclesInMaintenance = veiculos.filter(
    (v) => v.status === "Em Manutenção"
  ).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Visão geral da oficina</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardInfoCard
          label="Total de Clientes Mensal"
          thisMonth={getThisMonth(client).length}
          lastMonth={getLastMonth(client).length}
        />
        <DashboardInfoCard
          label="Veículos Cadastrados Mensal"
          thisMonth={getThisMonth(veiculos).length}
          lastMonth={getLastMonth(veiculos).length}
        />
        <DashboardInfoCard
          label="Serviços Realizados Mensal"
          thisMonth={servicesThisMonth.length}
          lastMonth={servicesLastMonth.length}
        />
        <DashboardInfoCard
          label="Receita Mensal"
          thisMonth={totalReceivedThisMonth}
          lastMonth={totalReceivedLastMonth}
          isCurrency
        />
        <DashboardInfoCard
          label="Ticket Médio Mensal"
          thisMonth={ticketMedioThisMonth}
          lastMonth={ticketMedioLastMonth}
          isCurrency
        />

        <DefaultInfoCard
          label="Em Manutenção (Agora)"
          info={vehiclesInMaintenance}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartLine
          chartData={getMonthlyStats(services)}
          title="Evolução de Receita e Serviços Anual"
        />
        <WorkerChartBar
          chartData={getWorkerStats(services)}
          title="Performance dos Mecânicos Mensal"
        />
      </div>
    </div>
  )
}
