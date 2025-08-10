"use client"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribe } from "@/app/actions/subscribe"

type FormState = { ok: boolean; message: string } | null

export default function WaitlistForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(subscribe, null)

  return (
    <form action={formAction} className="mx-auto grid w-full max-w-md gap-3">
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="grid gap-2">
        <label htmlFor="package" className="text-sm font-medium">
          Primary Sui package
        </label>
        <Input id="package" name="pkg" placeholder="0x..." />
      </div>
      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={pending}>
        {pending ? "Joining..." : "Join waitlist"}
      </Button>
      {state && <div className={`text-sm ${state.ok ? "text-emerald-600" : "text-destructive"}`}>{state.message}</div>}
    </form>
  )
}
