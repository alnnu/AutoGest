import { clientType } from "./clients"

export type veiculosType = {
  model: string
  yaer: number
  color: string
  placa: string
  owner: clientType
  km: number
  status: "ativo" | "Concluído" | "Em Manutenção"
  createdAt: string
}
