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
import { Plus } from "lucide-react"
import { veiculosColection } from "@/utils/data/veiculoData"
import { serviceType } from "@/utils/types/services"

interface NewServiceOrderDialogProps {
  onAddService: (service: serviceType) => void
  defaultPlaca?: string
}

export default function NewServiceOrderDialog({
  onAddService,
  defaultPlaca,
}: NewServiceOrderDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    placa: defaultPlaca || "",
    type: "motor" as serviceType["type"],
    desc: "",
    worker: "",
    value: "",
  })

  // Update placa if defaultPlaca changes
  useEffect(() => {
    if (defaultPlaca) {
      setFormData((prev) => ({ ...prev, placa: defaultPlaca }))
    }
  }, [defaultPlaca])

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const selectedVeiculo = veiculosColection.find(
      (v) => v.placa === formData.placa
    )

    if (!selectedVeiculo) {
      alert("Selecione um veículo válido")
      return
    }

    const newService: serviceType = {
      veiculo: selectedVeiculo,
      type: formData.type,
      desc: formData.desc,
      worker: formData.worker,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      value: parseFloat(formData.value) || 0,
      status: "pendentes",
    }

    onAddService(newService)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      placa: "",
      type: "motor",
      desc: "",
      worker: "",
      value: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-500 px-5 py-4 hover:bg-blue-600 sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nova Ordem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nova Ordem de Serviço</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para criar uma nova ordem de serviço.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="veiculo">Veículo (Placa)</Label>
              <Select
                value={formData.placa}
                onValueChange={(v) => setFormData({ ...formData, placa: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veículo" />
                </SelectTrigger>
                <SelectContent>
                  {veiculosColection.map((v) => (
                    <SelectItem key={v.placa} value={v.placa}>
                      {v.placa} - {v.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Serviço</Label>
              <Select
                value={formData.type}
                onValueChange={(v) =>
                  setFormData({ ...formData, type: v as serviceType["type"] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motor">Motor</SelectItem>
                  <SelectItem value="freio">Freio</SelectItem>
                  <SelectItem value="pneus">Pneus</SelectItem>
                  <SelectItem value="eletrica">Elétrica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="worker">Mecânico</Label>
              <Input
                id="worker"
                value={formData.worker}
                onChange={(e) =>
                  setFormData({ ...formData, worker: e.target.value })
                }
                placeholder="Nome do mecânico"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">Valor Estimado (R$)</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                placeholder="0,00"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Descrição</Label>
              <Input
                id="desc"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                placeholder="Descreva o serviço"
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
              Criar Ordem
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
