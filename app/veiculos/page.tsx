"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import DefaultInfoCard from "@/components/cards/defaultInfoCard"
import NotFoundMessageBlock from "@/components/blocks/notFoundMessageBlock"
import { veiculosType } from "@/utils/types/veiculos"
import { veiculosColection } from "@/utils/data/veiculoData"
import VeiculosTable from "@/components/tables/veiculosTable"

export default function veiculos() {
  const [veiculos, setVeiculos] = useState<veiculosType[]>(veiculosColection)
  const [filteredVeiculos, setFilteredVeiculos] =
    useState<veiculosType[]>(veiculos)

  const totalVeiculos = veiculos.length

  const totalManutencaoVeiculos = veiculos.filter(
    (veiculo) => veiculo.status === "Em Manutenção"
  ).length

  const totalAtivosVeiculos = veiculos.filter(
    (veiculo) => veiculo.status === "ativo"
  ).length

  const filterByPlaca = (placa: string) => {
    const aux = veiculos.filter((veiculo) =>
      veiculo.placa.toLocaleLowerCase().includes(placa.toLocaleLowerCase())
    )

    setFilteredVeiculos(aux)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Veículos</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie os veículos cadastrados
          </p>
        </div>
        <div>
          <Button className="w-full bg-blue-500 px-5 py-4 hover:bg-blue-600 sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Novo Veículo
          </Button>
        </div>
      </div>

      <div className="w-full rounded-xl bg-white px-6 py-4 shadow-sm">
        <Input
          placeholder="Buscar por placa"
          className="h-12"
          onChange={(e) => filterByPlaca(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DefaultInfoCard label="Total de Veículos" info={totalVeiculos} />
        <DefaultInfoCard label="Em Manutenção" info={totalManutencaoVeiculos} />
        <DefaultInfoCard label="Ativos" info={totalAtivosVeiculos} />
      </div>
      {filteredVeiculos.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <VeiculosTable data={filteredVeiculos} />
        </div>
      )}
      {filteredVeiculos.length <= 0 && (
        <>
          <NotFoundMessageBlock label="cliente" />
        </>
      )}
    </div>
  )
}
