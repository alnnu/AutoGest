import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { clientType } from "@/utils/types/clients"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Calendar, Car } from "lucide-react"
import Link from "next/link"

export default function ClientCard({ client }: { client: clientType }) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ")

    if (parts.length === 0) return ""

    if (parts.length === 1) return parts[0].substring(0, 2)

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src={client.image} />
            <AvatarFallback className="bg-blue-100 text-blue-500">
              {getInitials(client.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold"> {client.name} </CardTitle>
            <p className="text-sm font-light">cpf: {client.cpf}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="my-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <Mail className="size-4" />
            <p>{client.email}</p>
          </div>
          <div className="my-3 flex items-center gap-3">
            <Phone className="size-4" />
            <p>{client.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="size-4" />
            <p>Desde {client.createdAt}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Car className="size-4" />
          <p>2 veículo(s)</p>
        </div>

        <Link href="#" className="rounded-xl px-4 py-2 hover:bg-muted">
          Ver Veículos
        </Link>
      </CardFooter>
    </Card>
  )
}
