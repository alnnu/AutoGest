"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { clientsColection } from "@/utils/data/clientsData"
import { veiculosType } from "@/utils/types/veiculos"

interface NewVeiculoDialogProps {
  onAddVeiculo: (veiculo: veiculosType) => void
}

export default function NewVeiculoDialog({
  onAddVeiculo,
}: NewVeiculoDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    clientCpf: "",
    marca: "",
    modelo: "",
    ano: "",
    cor: "",
    placa: "",
    km: "",
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const selectedClient = clientsColection.find(
      (c) => c.cpf === formData.clientCpf
    )

    if (!selectedClient) {
      alert("Selecione um cliente válido")
      return
    }

    const newVeiculo: veiculosType = {
      model: `${formData.marca} ${formData.modelo}`.trim(),
      yaer: parseInt(formData.ano) || 0,
      color: formData.cor,
      placa: formData.placa.toUpperCase(),
      owner: selectedClient,
      km: parseInt(formData.km) || 0,
      status: "ativo",
      createdAt: new Date().toLocaleDateString("pt-BR"),
    }

    onAddVeiculo(newVeiculo)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      clientCpf: "",
      marca: "",
      modelo: "",
      ano: "",
      cor: "",
      placa: "",
      km: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 px-5 py-4 hover:bg-blue-600 sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo Veículo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Novo Veículo</DialogTitle>
            <DialogDescription>
              Cadastre um novo veículo no sistema associado a um cliente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Select
                value={formData.clientCpf}
                onValueChange={(v) =>
                  setFormData({ ...formData, clientCpf: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientsColection.map((client) => (
                    <SelectItem key={client.cpf} value={client.cpf}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="marca">Marca</Label>
                <Input
                  id="marca"
                  value={formData.marca}
                  onChange={(e) =>
                    setFormData({ ...formData, marca: e.target.value })
                  }
                  placeholder="Ex: Toyota"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  id="modelo"
                  value={formData.modelo}
                  onChange={(e) =>
                    setFormData({ ...formData, modelo: e.target.value })
                  }
                  placeholder="Ex: Corolla"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ano">Ano</Label>
                <Input
                  id="ano"
                  type="number"
                  value={formData.ano}
                  onChange={(e) =>
                    setFormData({ ...formData, ano: e.target.value })
                  }
                  placeholder="2024"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cor">Cor</Label>
                <Input
                  id="cor"
                  value={formData.cor}
                  onChange={(e) =>
                    setFormData({ ...formData, cor: e.target.value })
                  }
                  placeholder="Ex: Prata"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="placa">Placa</Label>
              <Input
                id="placa"
                value={formData.placa}
                onChange={(e) =>
                  setFormData({ ...formData, placa: e.target.value })
                }
                placeholder="ABC-1234"
                className="uppercase"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="km">Quilometragem</Label>
              <Input
                id="km"
                type="number"
                value={formData.km}
                onChange={(e) =>
                  setFormData({ ...formData, km: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Cadastrar Veículo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
