import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { serviceType } from "@/utils/types/services"
import { Badge } from "../ui/badge"

import { Calendar, Wrench } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
export default function ServiceHistoryCard({
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
  return (
    <Card className="col-span-2">
      <CardHeader className="border-b">
        <div className="flex justify-between">
          <CardTitle className="text-xl font-bold">
            Histórico de Serviços
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {services.length} serviços realizados
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60">
          <div className="ml-6 border-l-3 border-gray-400 pl-4">
            {services.map((service, i) => (
              <div key={i} className="relative mb-4 rounded-xl bg-gray-100 p-4">
                <div className="absolute top-3 -left-[21px] size-2 rounded-full bg-blue-500" />
                <div className="flex justify-between">
                  <div>
                    <p>{service.desc}</p>
                    <p className="text-muted-foreground">{service.type}</p>
                  </div>
                  <div>
                    <p>{formatCurrency(service.value)}</p>
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

                <div className="mt-4 grid grid-cols-3 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="size-4" /> {service.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Wrench className="size-4" /> {service.worker}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
