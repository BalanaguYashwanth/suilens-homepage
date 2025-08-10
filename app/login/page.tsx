"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // TODO: Wire up real auth
    await new Promise((r) => setTimeout(r, 600))
    setLoading(false)
    alert("Logged in (demo). Hook this up to your auth provider.")
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Log in to SuiLens to access your Sui analytics.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" disabled={loading} className="bg-slate-900 hover:bg-slate-800">
              {loading ? "Logging in..." : "Log in"}
            </Button>
            <p className="text-xs text-muted-foreground">
              By continuing you agree to our{" "}
              <Link href="#" className="underline underline-offset-2">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-2">
                Privacy
              </Link>
              .
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
