import { veiculosType } from "@/utils/types/veiculos"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VeiculoCard({ veiculo }: { veiculo: veiculosType }) {
  const formatMilhar = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR").format(valor)
  }

  const nome = veiculo.model.split(" ")

  return (
    <Card className="col-span-2">
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-bold">
          Informações do Veículo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-xl">
            <h4 className="text-muted-foreground">Marca</h4>
            <p className="mt-2 font-bold">{nome[0] || "-"}</p>
          </div>
          <div className="text-xl">
            <h4 className="text-muted-foreground">Modelo</h4>
            <p className="mt-2 font-bold">{nome[1] || "-"}</p>
          </div>
          <div className="text-xl">
            <h4 className="text-muted-foreground">Ano</h4>
            <p className="mt-2 font-bold">{veiculo.yaer || "-"}</p>
          </div>
          <div className="text-xl">
            <h4 className="text-muted-foreground">Placa</h4>
            <p className="mt-2 font-bold">{veiculo.placa || "-"}</p>
          </div>
          <div className="text-xl">
            <h4 className="text-muted-foreground">Cor</h4>
            <p className="mt-2 font-bold">{veiculo.color || "-"}</p>
          </div>
          <div className="text-xl">
            <h4 className="text-muted-foreground">Quilometragem</h4>
            <p className="mt-2 font-bold">
              {formatMilhar(veiculo.km) || "-"} km
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
