import { TrendingDown, TrendingUp } from "lucide-react"

export default function DashboardInfoCard({
  label,
  thisMonth,
  lastMonth,
  isCurrency = false,
}: {
  label: string
  thisMonth: number
  lastMonth: number
  isCurrency?: boolean
}) {
  const formatValue = (value: number) => {
    if (isCurrency) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    }
    return value.toLocaleString("pt-BR")
  }

  const growth = lastMonth !== 0 ? (thisMonth - lastMonth) / lastMonth : 0
  const percentage = Math.abs(Math.round(growth * 100))

  return (
    <div>
      <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
        <h3 className="text-sm">{label}</h3>
        <p className="mt-4 text-2xl font-bold">{formatValue(thisMonth)}</p>
        <div>
          {growth >= 0 ? (
            <span className="flex items-center gap-2 text-xs text-green-500">
              <TrendingUp className="size-4" /> +{percentage}%{" "}
              <span className="text-muted-foreground">vs mês anterior</span>
            </span>
          ) : (
            <span className="flex items-center gap-2 text-xs text-red-500">
              <TrendingDown className="size-4" /> -{percentage}%{" "}
              <span className="text-muted-foreground">vs mês anterior</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
