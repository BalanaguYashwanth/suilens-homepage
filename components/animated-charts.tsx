"use client"

import { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Database, Bot, TrendingUp } from "lucide-react"

export function LoadingChart() {
  const [progress, setProgress] = useState(0)
  const [data, setData] = useState<Array<{ time: string; events: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev >= 100 ? 0 : prev + 2

        // Simulate data loading
        if (newProgress % 10 === 0) {
          setData((prevData) => {
            const newData = [...prevData]
            if (newData.length >= 10) {
              newData.shift()
            }
            newData.push({
              time: `${Math.floor(newProgress / 10)}s`,
              events: Math.floor(Math.random() * 50) + 20,
            })
            return newData
          })
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-5 w-5 text-slate-600 animate-pulse" />
        <span className="text-sm text-slate-600">Loading events...</span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
        <div
          className="bg-slate-700 h-2 rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <Line
              type="monotone"
              dataKey="events"
              stroke="#475569"
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function QueryChart() {
  const [queryStep, setQueryStep] = useState(0)
  const [data, setData] = useState<Array<{ day: string; transfers: number; volume: number }>>([])

  useEffect(() => {
    const steps = ["Parsing query...", "Planning execution...", "Fetching data...", "Generating chart..."]

    const interval = setInterval(() => {
      setQueryStep((prev) => (prev + 1) % steps.length)

      // Generate sample data
      const sampleData = Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        transfers: Math.floor(Math.random() * 100) + 50,
        volume: Math.floor(Math.random() * 1000) + 500,
      }))
      setData(sampleData)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const steps = ["Parsing query...", "Planning execution...", "Fetching data...", "Generating chart..."]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-slate-600 animate-bounce" />
        <span className="text-sm text-slate-600">{steps[queryStep]}</span>
      </div>

      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <Line
              type="monotone"
              dataKey="transfers"
              stroke="#475569"
              strokeWidth={2}
              dot={false}
              animationDuration={800}
            />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#64748b"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function InsightsChart() {
  const [insights, setInsights] = useState<Array<{ metric: string; value: number; trend: number }>>([])
  const [currentInsight, setCurrentInsight] = useState(0)

  useEffect(() => {
    const sampleInsights = [
      { metric: "Daily Transfers", value: 1250, trend: 15 },
      { metric: "Unique Users", value: 340, trend: 8 },
      { metric: "Total Volume", value: 45000, trend: -3 },
      { metric: "Gas Usage", value: 2100, trend: 12 },
    ]

    setInsights(sampleInsights)

    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % sampleInsights.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const currentData = insights[currentInsight]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-slate-600" />
        <span className="text-sm text-slate-600">Automated Insights</span>
      </div>

      {currentData && (
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-700 mb-1">{currentData.value.toLocaleString()}</div>
          <div className="text-sm text-slate-600 mb-2">{currentData.metric}</div>
          <div
            className={`text-xs flex items-center justify-center gap-1 ${
              currentData.trend > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <span>{currentData.trend > 0 ? "↗" : "↘"}</span>
            <span>{Math.abs(currentData.trend)}% vs last week</span>
          </div>
        </div>
      )}

      <div className="w-full h-16 mt-4">
        <div className="flex justify-center space-x-1">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="w-2 bg-slate-300 rounded-sm animate-pulse"
              style={{
                height: `${Math.random() * 40 + 10}px`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
