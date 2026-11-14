"use client"

import * as React from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

/**
 * Email capture form with a fake success state (no backend yet).
 * - "panel": pill input + full Subscribe button (newsletter section)
 * - "footer": compact dark input + icon button (footer)
 */
export function SubscribeForm({ variant = "panel" }: { variant?: "panel" | "footer" }) {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail("")
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex w-full max-w-xs gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className="h-11 rounded-lg border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-slate-400 focus-visible:border-violet-400 focus-visible:ring-violet-400/40"
        />
        <Button
          type="submit"
          size="icon"
          aria-label={subscribed ? "Subscribed" : "Subscribe"}
          className="size-11 shrink-0 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md hover:from-violet-400 hover:to-indigo-500"
        >
          {subscribed ? <Check /> : <ArrowRight />}
        </Button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email address..."
        aria-label="Email address"
        className="h-12 flex-1 rounded-full border-violet-200 bg-white px-5 dark:border-violet-800 dark:bg-slate-900 dark:text-white"
      />
      <Button
        type="submit"
        className="h-12 shrink-0 gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-base text-white shadow-lg shadow-violet-600/25 hover:from-violet-500 hover:to-indigo-500"
      >
        {subscribed ? (
          <>
            <Check /> Subscribed
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  )
}
