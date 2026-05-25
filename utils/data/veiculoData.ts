import { veiculosType } from "../types/veiculos"
import { clientsColection } from "./clientsData"

export const veiculosColection: veiculosType[] = [
  {
    model: "Toyota Corolla",
    yaer: 2022,
    color: "Prata",
    placa: "ABC-1234",
    owner: clientsColection[0],
    km: 15000,
    status: "ativo",
  },
  {
    model: "Honda Civic",
    yaer: 2021,
    color: "Preto",
    placa: "DEF-5678",
    owner: clientsColection[1],
    km: 25000,
    status: "Em Manutenção",
  },
  {
    model: "Volkswagen Golf",
    yaer: 2023,
    color: "Branco",
    placa: "GHI-9012",
    owner: clientsColection[2],
    km: 5000,
    status: "Concluído",
  },
  {
    model: "Ford Ka",
    yaer: 2019,
    color: "Vermelho",
    placa: "JKL-3456",
    owner: clientsColection[3],
    km: 45000,
    status: "ativo",
  },
  {
    model: "Fiat Uno",
    yaer: 2015,
    color: "Escada",
    placa: "MNO-7890",
    owner: clientsColection[0],
    km: 120000,
    status: "ativo",
  },
  {
    model: "Chevrolet Onix",
    yaer: 2020,
    color: "Azul",
    placa: "PQR-1234",
    owner: clientsColection[1],
    km: 35000,
    status: "Em Manutenção",
  },
]
