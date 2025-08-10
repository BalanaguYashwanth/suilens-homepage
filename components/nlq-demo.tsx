"use client"

import React from "react"
import { Separator } from "@/components/ui/separator"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Loader2, Sparkles, Settings2, TrendingUp, Users, ArrowLeftRight, Coins } from "lucide-react"

type NLQDemoProps = {
  defaultQuery?: string
  compact?: boolean
}

type Plan = {
  metric: "transfers" | "swaps" | "volume" | "unique_wallets"
  days: number
  address: string
  label: string
}

const metricIcons = {
  transfers: TrendingUp,
  swaps: ArrowLeftRight,
  volume: Coins,
  unique_wallets: Users,
}

const metricColors = {
  transfers: "hsl(142.1 76.2% 36.3%)",
  swaps: "hsl(262.1 83.3% 57.8%)",
  volume: "hsl(48 96% 53%)",
  unique_wallets: "hsl(199 89% 48%)",
}

export default function NLQDemo({
  defaultQuery = "Show daily transfer count for package 0xabc...",
  compact = false,
}: NLQDemoProps) {
  const [query, setQuery] = useState(defaultQuery)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [data, setData] = useState<Array<{ day: string; value: number }>>([])

  const examplePrompts = [
    "Show daily transfers for 0xabc... last 14 days",
    "Plot swaps for package 0x123... past 30 days",
    "Unique wallets interacting with 0xdef... last 7 days",
    "Total volume for 0xabc... last 90 days",
  ]

  function parseQuery(q: string): Plan {
    const lowered = q.toLowerCase()
    const addressMatch = q.match(/0x[a-fA-F0-9.]{3,}/)
    const address = addressMatch ? addressMatch[0] : "0xabc..."
    let metric: Plan["metric"] = "transfers"
    if (lowered.includes("swap")) metric = "swaps"
    if (lowered.includes("volume")) metric = "volume"
    if (lowered.includes("unique") || lowered.includes("wallet")) metric = "unique_wallets"
    let days = 14
    const daysMatch = lowered.match(/last\s+(\d+)\s*days|past\s+(\d+)\s*days|(\d+)\s*days/)
    if (daysMatch) {
      const num = Number.parseInt(daysMatch[1] || daysMatch[2] || daysMatch[3] || "14", 10)
      if (!Number.isNaN(num)) days = Math.min(Math.max(num, 3), 120)
    } else if (lowered.includes("last 24h") || lowered.includes("24h")) {
      days = 1
    } else if (lowered.includes("last week")) {
      days = 7
    } else if (lowered.includes("last month")) {
      days = 30
    }
    const labelMap = {
      transfers: "Daily transfers",
      swaps: "Daily swaps",
      volume: "Daily volume",
      unique_wallets: "Unique wallets per day",
    } as const
    return { metric, days, address, label: `${labelMap[metric]} — ${address}` }
  }

  function seedRandom(seed: string) {
    let h = 0
    for (let i = 0; i < seed.length; i++) {
      h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
    }
    return function rand() {
      h ^= h << 13
      h ^= h >>> 17
      h ^= h << 5
      return ((h < 0 ? ~h + 1 : h) % 1000) / 1000
    }
  }

  function synthesizeSeries(p: Plan) {
    const r = seedRandom(`${p.address}:${p.metric}:${p.days}`)
    const base = p.metric === "volume" ? 1000 : p.metric === "swaps" ? 80 : p.metric === "unique_wallets" ? 60 : 120
    const series: Array<{ day: string; value: number }> = []
    const now = new Date()
    for (let i = p.days - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      const seasonal = 1 + 0.2 * Math.sin(i / 3)
      const noise = 0.6 + r() * 0.8
      const trend = 1 + (p.days > 20 ? (p.days - i) / (p.days * 12) : 0)
      const value = Math.max(0, Math.round(base * seasonal * noise * trend))
      series.push({ day: d.toISOString().slice(0, 10), value })
    }
    return series
  }

  async function run() {
    setLoading(true)
    const p = parseQuery(query)
    setPlan(p)
    // simulate planning & execution latency
    await new Promise((res) => setTimeout(res, 800))
    const series = synthesizeSeries(p)
    setData(series)
    setLoading(false)
  }

  const chartConfig = useMemo(
    () => ({
      value: { 
        label: plan?.metric ? plan.metric.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Value", 
        color: plan ? metricColors[plan.metric] : "hsl(var(--chart-1))" 
      },
    }),
    [plan],
  )

  const formatValue = (value: number) => {
    if (plan?.metric === "volume") {
      return `$${(value / 1000).toFixed(1)}k`
    }
    return value.toLocaleString()
  }

  const getMetricStats = () => {
    if (data.length === 0) return null
    const values = data.map(d => d.value)
    const total = values.reduce((sum, val) => sum + val, 0)
    const avg = total / values.length
    const max = Math.max(...values)
    const min = Math.min(...values)
    return { total, avg, max, min }
  }

  const stats = getMetricStats()

  return (
    <div className={`space-y-6 ${compact ? "p-4" : "p-6"}`}>
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
          SmartContract Analytics
        </h2>
        <p className="text-slate-600 text-sm">
          Ask questions about your Sui packages in plain English
        </p>
      </div>

      {/* Query Input Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100">
        <CardContent className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = "https://suilens.web.app/login"
            }}
            className="space-y-4"
            aria-label="Ask a question in natural language"
          >
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., Show daily transfers for 0xabc.."
                className="h-12 text-base border-2 border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition-all duration-200"
                aria-label="Natural language query"
              />
              <Button 
                type="submit" 
                disabled={loading} 
                className="absolute right-2 top-2 h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all duration-200"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span className="ml-2">{loading ? "Analyzing..." : "Ask"}</span>
              </Button>
            </div>
            
            {!compact && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 font-medium">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((prompt) => (
                    <Badge 
                      key={prompt} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-slate-200 transition-colors duration-200 text-xs px-3 py-1"
                      onClick={() => setQuery(prompt)}
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {plan && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Chart Card */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                {plan && React.createElement(metricIcons[plan.metric], { 
                  className: "h-5 w-5", 
                  style: { color: metricColors[plan.metric] } 
                })}
                <CardTitle className="text-lg">{plan.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className={compact ? "h-[250px]" : "h-[320px]"}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="day" 
                      tickLine={false} 
                      axisLine={false} 
                      tickMargin={8}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      width={60}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={formatValue}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent nameKey="value" />}
                      cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={metricColors[plan.metric]}
                      strokeWidth={3}
                      dot={{ fill: metricColors[plan.metric], strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: metricColors[plan.metric], strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Stats and Plan Card */}
          <div className="space-y-4">
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-2 gap-3">
                <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Total</p>
                    <p className="text-2xl font-bold text-blue-900">{formatValue(stats.total)}</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Average</p>
                    <p className="text-2xl font-bold text-green-900">{formatValue(Math.round(stats.avg))}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Plan Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-slate-600" />
                    Query Plan
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Metric</span>
                    <Badge variant="outline" className="capitalize">
                      {plan.metric.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Time Window</span>
                    <Badge variant="outline">
                      {plan.days === 1 ? '24 hours' : `${plan.days} days`}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Package</span>
                    <code className="text-xs bg-slate-200 px-2 py-1 rounded font-mono">
                      {plan.address}
                    </code>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">About this data</p>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>• Values are synthesized for demonstration</p>
                    <p>• Real app would stream live Sui blockchain events</p>
                    <p>• Data transforms in real-time as you query</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Empty State */}
      {/* {!plan && !loading && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-slate-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-700">Ready to analyze your data?</h3>
                <p className="text-slate-500 text-sm">
                  Ask a question above to see your Sui package analytics visualized in real-time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}
    </div>
  )
}
