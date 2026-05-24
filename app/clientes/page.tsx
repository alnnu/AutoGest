import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Clientes() {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Clientes</h2>
          <p className="text-sm">Gerencie seus clientes cadastrados</p>
        </div>
        <div>
          <Button className="bg-blue-500 px-5 py-4">
            <Plus className="mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>
    </>
  )
}
