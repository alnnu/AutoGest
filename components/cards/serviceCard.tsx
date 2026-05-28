import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { serviceType } from "@/utils/types/services"
import { Badge } from "@/components/ui/badge"
import { Wrench, Calendar, DollarSign } from "lucide-react"

export default function ServiceCard({ service }: { service: serviceType }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex w-full items-center justify-between">
            <CardTitle className="text-xl">{service.desc}</CardTitle>
            <Badge
              className={
                service.status === "em andamento"
                  ? "border border-green-700 bg-green-100 text-green-700"
                  : service.status === "concluidos"
                    ? "border border-yellow-700 bg-yellow-100 text-yellow-700"
                    : "border border-blue-700 bg-blue-100 text-blue-700"
              }
            >
              {service.status}
            </Badge>
          </div>
        </div>

        <CardDescription>{service.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl bg-gray-100 px-3 py-4">
          <p className="font-bold">{service.veiculo.model}</p>
          <p>{service.veiculo.placa}</p>
        </div>
        <div className="mt-4">
          <div className="flex w-full justify-between">
            <span className="flex items-center gap-3 text-muted-foreground">
              <Wrench className="size-4" /> Mecânico
            </span>
            <span>{service.worker}</span>
          </div>
          <div className="my-3 flex w-full justify-between">
            <span className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="size-4" /> Data
            </span>
            <span>{service.createdAt}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="flex items-center gap-3 text-muted-foreground">
              <DollarSign className="size-4" /> Valor
            </span>
            <span>{formatCurrency(service.value)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t">
        <Link
          href={`/veiculos/${service.veiculo.placa}`}
          className="w-full rounded-xl px-4 py-2 text-center hover:bg-muted"
        >
          Ver Carro
        </Link>
      </CardFooter>
    </Card>
  )
}
