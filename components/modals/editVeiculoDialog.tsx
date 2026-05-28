"use client"

import { useEffect, useState } from "react"
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
import { Edit } from "lucide-react"
import { clientsColection } from "@/utils/data/clientsData"
import { veiculosType } from "@/utils/types/veiculos"

interface EditVeiculoDialogProps {
  veiculo: veiculosType
  onUpdateVeiculo: (veiculo: veiculosType) => void
}

export default function EditVeiculoDialog({
  veiculo,
  onUpdateVeiculo,
}: EditVeiculoDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    clientCpf: veiculo.owner.cpf,
    model: veiculo.model,
    ano: veiculo.yaer.toString(),
    cor: veiculo.color,
    placa: veiculo.placa,
    km: veiculo.km.toString(),
    status: veiculo.status,
  })

  // Sincroniza o estado se o veículo mudar externamente
  useEffect(() => {
    setFormData({
      clientCpf: veiculo.owner.cpf,
      model: veiculo.model,
      ano: veiculo.yaer.toString(),
      cor: veiculo.color,
      placa: veiculo.placa,
      km: veiculo.km.toString(),
      status: veiculo.status,
    })
  }, [veiculo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedClient = clientsColection.find(
      (c) => c.cpf === formData.clientCpf
    )

    if (!selectedClient) {
      alert("Selecione um cliente válido")
      return
    }

    const updatedVeiculo: veiculosType = {
      ...veiculo,
      model: formData.model,
      yaer: parseInt(formData.ano) || 0,
      color: formData.cor,
      placa: formData.placa.toUpperCase(),
      owner: selectedClient,
      km: parseInt(formData.km) || 0,
      status: formData.status as veiculosType["status"],
    }

    onUpdateVeiculo(updatedVeiculo)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex w-full justify-center gap-2 rounded-xl bg-gray-100 py-2 text-sm font-medium hover:bg-gray-200">
          <Edit className="size-4" /> Editar Veículo
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Veículo</DialogTitle>
            <DialogDescription>
              Atualize as informações do veículo {veiculo.placa}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Select
                value={formData.clientCpf}
                onValueChange={(v) => setFormData({ ...formData, clientCpf: v })}
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

            <div className="grid gap-2">
              <Label htmlFor="model">Modelo / Marca</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                placeholder="Ex: Toyota Corolla"
                required
              />
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

            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
