import { veiculosType } from "./veiculos"

export type serviceType = {
  veiculo: veiculosType
  type: "freio" | "motor" | "pneus" | "eletrica"
  desc: string
  worker: string
  date: string
  value: number
  status: "concluidos" | "em andamento" | "pendentes"
}
