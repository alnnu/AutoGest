"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  totalServicos: {
    label: "Serviços (Eixo Esq.)",
    color: "#22c55e",
  },
  totalReceita: {
    label: "Faturamento (Eixo Dir.)",
    color: "#3b82f6",
  },
} satisfies ChartConfig

export function ChartLine({
  chartData,
  title,
}: {
  chartData: any
  title: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              yAxisId="left"
              domain={[0, "auto"]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, "auto"]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value) =>
                `R$ ${value >= 1000 ? `${value / 1000}k` : value}`
              }
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              yAxisId="left"
              dataKey="totalServicos"
              type="monotone"
              stroke="var(--color-totalServicos)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-totalServicos)",
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              yAxisId="right"
              dataKey="totalReceita"
              type="monotone"
              stroke="var(--color-totalReceita)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-totalReceita)",
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
