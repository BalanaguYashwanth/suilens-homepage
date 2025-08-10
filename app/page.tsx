"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import {
  Bot,
  LineChartIcon as ChartLine,
  Cpu,
  Database,
  Sparkles,
  Bell,
  ShieldCheck,
  Search,
  PlugZap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import NLQDemo from "@/components/nlq-demo"
import PackageSearch from "@/components/package-search"
import { LoadingChart, QueryChart, InsightsChart } from "@/components/animated-charts"

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-6 md:px-8 lg:px-12 xl:px-16">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/metrix-logo-glyph.png" alt="Metrix logo" width={28} height={28} className="rounded" />
            <span>SuiLens</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="text-muted-foreground hover:text-foreground" href="#features">
              Features
            </a>
            <a className="text-muted-foreground hover:text-foreground" href="#how-it-works">
              How it works
            </a>
            <a className="text-muted-foreground hover:text-foreground" href="#demo">
              Demo
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="bg-slate-900 hover:bg-slate-800">
              <Link href="https://suilens.web.app/login">Log in</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full border-b">
          <div className="container mx-auto grid gap-8 px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:grid-cols-[1.05fr_.95fr] md:gap-12 md:py-20">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border bg-muted px-3 py-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-slate-700" />
                  Agentic analytics for Sui
                </span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <span className="inline-flex items-center gap-1">
                  <Image src="/sui-logo-simple.png" alt="Sui" width={14} height={14} />
                  Built for Sui
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Get analytics from any Sui contract package address
              </h1>
              <p className="mt-4 text-muted-foreground text-base sm:text-lg">
                SuiLens loads transaction data and events from your smart contract into our analytics database, enabling
                you to query insights using natural language and get automated analytics.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
                  <Link href="#demo">Try the NLQ demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#features">Explore features</Link>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-slate-700" />
                  Sui-native event ingestion
                </div>
                <div className="inline-flex items-center gap-2">
                  <Bell className="h-4 w-4 text-slate-700" />
                  Query monitors and alerts
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="overflow-hidden border-slate-200">
                <CardHeader className="border-b">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bot className="h-5 w-5 text-slate-700" />
                    Ask anything about your smart contract
                  </CardTitle>
                  <CardDescription>
                    Get analytics from your package address and query events data instantly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <NLQDemo defaultQuery="Show daily transfer count for package 0xabc..." />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Package search */}
        <section id="demo" className="w-full bg-muted/40 border-b">
          <div className="container mx-auto grid gap-8 px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:grid-cols-[.9fr_1.1fr] md:gap-12 md:py-20">
            <div className="flex flex-col justify-center gap-4">
              <h2 className="text-2xl font-semibold sm:text-3xl">Add your package address</h2>
              <p className="text-muted-foreground">
                Enter any Sui package address to load transaction data and events into our analytics database. Once
                loaded, query your contract data using natural language to get instant insights.
              </p>
              <ul className="text-sm text-muted-foreground grid gap-2">
                <li className="inline-flex items-center gap-2">
                  <Search className="h-4 w-4 text-slate-700" /> Load tx data and events into database
                </li>
                <li className="inline-flex items-center gap-2">
                  <ChartLine className="h-4 w-4 text-slate-700" /> Auto-generated analytics and charts
                </li>
                <li className="inline-flex items-center gap-2">
                  <Bell className="h-4 w-4 text-slate-700" /> Natural language query interface
                </li>
              </ul>
            </div>
            <div>
              <PackageSearch />
              <div className="mt-6 flex justify-center">
                {/* Animated Analytics Spectrum */}
                <div className="relative w-full max-w-md h-24 bg-slate-100 rounded-lg overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 400 96" preserveAspectRatio="none">
                    {/* Improved: More vertical distance, slower, circular (looping) motion */}
                    <defs>
                      <radialGradient id="spectrum-bg" cx="50%" cy="50%" r="80%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.9" />
                      </radialGradient>
                    </defs>
                    <rect x="0" y="0" width="400" height="96" fill="url(#spectrum-bg)" />
                    
                    {/* Top curve */}
                    <path
                      d="M0,28 Q80,0 160,28 T400,28"
                      stroke="hsl(142.1 76.2% 36.3%)"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.7"
                    >
                      <animate
                        attributeName="d"
                        values="
                          M0,28 Q80,0 160,28 T400,28;
                          M0,28 Q120,10 240,28 T400,28;
                          M0,28 Q80,56 160,28 T400,28;
                          M0,28 Q-40,10 80,28 T400,28;
                          M0,28 Q80,0 160,28 T400,28
                        "
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </path>
                    
                    {/* Middle curve */}
                    <path
                      d="M0,48 Q100,24 200,48 T400,48"
                      stroke="hsl(199 89% 48%)"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="d"
                        values="
                          M0,48 Q100,24 200,48 T400,48;
                          M0,48 Q200,72 400,48;
                          M0,48 Q100,72 200,48 T400,48;
                          M0,48 Q-100,24 200,48 T400,48;
                          M0,48 Q100,24 200,48 T400,48
                        "
                        dur="7.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                    
                    {/* Bottom curve */}
                    <path
                      d="M0,76 Q80,96 160,76 T400,76"
                      stroke="hsl(48 96% 53%)"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="d"
                        values="
                          M0,76 Q80,96 160,76 T400,76;
                          M0,76 Q160,56 320,76 T400,76;
                          M0,76 Q80,56 160,76 T400,76;
                          M0,76 Q-40,96 80,76 T400,76;
                          M0,76 Q80,96 160,76 T400,76
                        "
                        dur="9s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-slate-600 font-medium">Analytics Processing...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="w-full border-b">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold sm:text-3xl">Agentic, automated, and context; aware</h2>
              <p className="mt-2 text-muted-foreground">
                SuiLens loads your smart contract data into our analytics database and provides a natural language
                interface to query transaction data, events, and get automated insights.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Bot className="h-5 w-5 text-slate-700" />}
                title="Natural language queries"
                desc="Ask questions as you think. SuiLens plans and executes the right data operations on Sui event streams."
              />
              <FeatureCard
                icon={<Database className="h-5 w-5 text-slate-700" />}
                title="Sui event ingestion"
                desc="Native support for Sui events with package; aware schemas and automatic type discovery."
              />
              <FeatureCard
                icon={<ChartLine className="h-5 w-5 text-slate-700" />}
                title="Auto; charts"
                desc="Best; fit visualizations with sensible defaults, legends, and time windows."
              />
              <FeatureCard
                icon={<Bell className="h-5 w-5 text-slate-700" />}
                title="Monitors #38; alerts"
                desc="Convert any query into a monitor. Get alerted on spikes, anomalies, or thresholds."
              />
              <FeatureCard
                icon={<Cpu className="h-5 w-5 text-slate-700" />}
                title="Agentic workflows"
                desc="Chains of thought that refine queries, validate results, and suggest next steps."
              />
              <FeatureCard
                icon={<PlugZap className="h-5 w-5 text-slate-700" />}
                title="Composability"
                desc="Bring your own storage, sinks, and destinations. Export data or embed charts."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="w-full bg-muted/40 border-b">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold sm:text-3xl mb-4">How it works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From package address to insights in three simple steps with real-time analytics visualization.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <HowItWorksStep
                index={1}
                title="Add package address"
                desc="Enter your Sui package address. Suilens loads all transaction data and events into our analytics database."
                chartType="loading"
              />
              <HowItWorksStep
                index={2}
                title="Query with natural language"
                desc="Ask questions about your contract data using natural language. Get instant analytics and insights."
                chartType="query"
              />
              <HowItWorksStep
                index={3}
                title="Get automated insights"
                desc="Receive automated analytics, charts, and insights about your smart contract performance and usage."
                chartType="insights"
              />
            </div>
          </div>
        </section>

        {/* Waitlist */}
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-8 py-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/metrix-logo-glyph.png" alt="Metrix" width={24} height={24} />
                <span className="font-semibold text-lg">SuiLens</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                Agentic analytics platform for Sui blockchain. Get insights from any smart contract using natural
                language queries.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Image src="/sui-logo-simple.png" alt="Sui" width={12} height={12} />
                  Built for Sui
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-foreground">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-foreground">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-foreground">
                    Login
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2024 SuiLens. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function HowItWorksStep({
  index,
  title,
  desc,
  chartType,
}: {
  index: number
  title: string
  desc: string
  chartType: "loading" | "query" | "insights"
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="text-xs text-muted-foreground">Step {index}</div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[240px] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          {chartType === "loading" && <LoadingChart />}
          {chartType === "query" && <QueryChart />}
          {chartType === "insights" && <InsightsChart />}
        </div>
      </CardContent>
    </Card>
  )
}
