import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { serviceType } from "@/utils/types/services"

import { Calendar, DollarSign, Wrench } from "lucide-react"
export default function VeiculoServiceStatisticsCard({
  services,
}: {
  services: serviceType[]
}) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const totalSpent = services.reduce((total, curr) => total + curr.value, 0)
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-bold">Statistics </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-5 rounded-xl bg-blue-100 p-4">
          <Wrench className="size-6 text-blue-700" />
          <span className="flex-1">Total de Serviços</span>
          <span className="text-end text-2xl font-bold tracking-tight">
            {services.length}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-5 rounded-xl bg-green-100 p-4">
          <DollarSign className="size-6 text-green-700" />
          <span className="flex-1">Total Gasto</span>
          <span className="text-end text-xl font-bold tracking-tight">
            {formatCurrency(totalSpent)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
