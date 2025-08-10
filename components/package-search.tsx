"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Search } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

type PackageInfo = {
  address: string
  inferredEvents: number
  lastEventAt: string
  objects: number
  daily: Array<{ day: string; events: number }>
}

export default function PackageSearch() {
  const [addr, setAddr] = useState("0xabc...")
  const [info, setInfo] = useState<PackageInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function isSuiPackage(a: string) {
    return (
      /^0x[a-fA-F0-9]{3,}$/.test(a.trim()) ||
      a.trim() === "0xabc..." ||
      a.trim() === "0x123..." ||
      a.trim() === "0xdef..."
    )
  }

  function seedRandom(seed: string) {
    let h = 0
    for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
    return function rand() {
      h ^= h << 13
      h ^= h >>> 17
      h ^= h << 5
      return ((h < 0 ? ~h + 1 : h) % 1000) / 1000
    }
  }

  async function run() {
    setError(null)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    if (!isSuiPackage(addr)) {
      setError("Please enter a valid Sui package address starting with 0x")
      setInfo(null)
      setLoading(false)
      return
    }
    const rand = seedRandom(addr)
    const days = 14
    const daily: PackageInfo["daily"] = []
    const now = new Date()
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      daily.push({
        day: d.toISOString().slice(0, 10),
        events: Math.round(100 + rand() * 160 + 30 * Math.sin(i / 3)),
      })
    }
    const infoData: PackageInfo = {
      address: addr.trim(),
      inferredEvents: 6 + Math.floor(rand() * 8),
      lastEventAt: new Date(now.getTime() - Math.floor(rand() * 6) * 60_000).toISOString(),
      objects: 100 + Math.floor(rand() * 900),
      daily,
    }
    setInfo(infoData)
    setLoading(false)
  }

  return (
    <div className="grid gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          run()
        }}
        className="flex gap-2"
        aria-label="Search by package address"
      >
        <Input
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          placeholder="Enter Sui package address e.g. 0x..."
          aria-label="Package address"
        />
        <Button type="submit" disabled={loading} className="bg-slate-900 hover:bg-slate-800">
          <Search className="h-4 w-4 text-white-700" />
          <span className="ml-2 text-white-700">{loading ? "Searching..." : "Search"}</span>
        </Button>
      </form>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4 text-slate-700" />
          <AlertTitle>Invalid address</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {info && (
        <div className="grid gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Package</span>
            <Badge variant="secondary" className="font-mono text-slate-700">
              {info.address}
            </Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard label="Inferred event types" value={info.inferredEvents.toString()} />
            <StatCard label="Objects" value={info.objects.toLocaleString()} />
            <StatCard label="Last event" value={new Date(info.lastEventAt).toLocaleString()} />
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-700">Daily events</CardTitle>
              <CardDescription className="text-slate-700">Events emitted per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  events: { label: "Events", color: "hsl(var(--chart-2))" },
                }}
                className="h-[240px]"
              >
                <LineChart data={info.daily} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} width={40} />
                  <ChartTooltip content={<ChartTooltipContent nameKey="events" />} />
                  <Line type="monotone" dataKey="events" stroke="var(--color-events)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}
