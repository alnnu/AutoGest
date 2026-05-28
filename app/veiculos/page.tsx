"use client"
import DefaultInfoCard from "@/components/cards/defaultInfoCard"
import NewVeiculoDialog from "@/components/modals/newVeiculoDialog"
import NotFoundMessageBlock from "@/components/blocks/notFoundMessageBlock"
import VeiculosTable from "@/components/tables/veiculosTable"
import { Input } from "@/components/ui/input"
import { veiculosColection } from "@/utils/data/veiculoData"
import { veiculosType } from "@/utils/types/veiculos"
import { useEffect, useState } from "react"

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState<veiculosType[]>(veiculosColection)
  const [search, setSearch] = useState("")
  const [filteredVeiculos, setFilteredVeiculos] =
    useState<veiculosType[]>(veiculos)

  useEffect(() => {
    const aux = veiculos.filter((veiculo) =>
      veiculo.placa.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    setFilteredVeiculos(aux)
  }, [search, veiculos])

  const totalVeiculos = veiculos.length

  const totalManutencaoVeiculos = veiculos.filter(
    (veiculo) => veiculo.status === "Em Manutenção"
  ).length

  const totalAtivosVeiculos = veiculos.filter(
    (veiculo) => veiculo.status === "ativo"
  ).length

  const handleAddVeiculo = (newVeiculo: veiculosType) => {
    setVeiculos((prev) => [newVeiculo, ...prev])
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
          <NewVeiculoDialog onAddVeiculo={handleAddVeiculo} />
        </div>
      </div>

      <div className="w-full rounded-xl bg-white px-6 py-4 shadow-sm">
        <Input
          placeholder="Buscar por placa"
          className="h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
          <NotFoundMessageBlock label="veículo" />
        </>
      )}
    </div>
  )
}
