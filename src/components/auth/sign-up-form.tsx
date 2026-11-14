"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Field({
  id,
  label,
  optional = false,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200"
      >
        {label}{" "}
        {optional ? (
          <span className="font-normal text-slate-500 dark:text-slate-400">
            (Optional)
          </span>
        ) : (
          <span className="text-red-500">*</span>
        )}
      </label>
      {children}
    </div>
  )
}

export function SignUpForm() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [photoUrl, setPhotoUrl] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  const inputClass = "h-11 rounded-lg bg-white dark:bg-slate-900"

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim()) {
      setError("Enter your full name.")
      return
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email address.")
      return
    }
    if (photoUrl && !/^https?:\/\/\S+$/i.test(photoUrl)) {
      setError("Photo URL must start with http:// or https://")
      return
    }
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setError(
        "Password must contain at least 6 characters, with uppercase and lowercase letters."
      )
      return
    }
    setError(null)
    setSubmitted(true) // demo only — no backend yet
  }

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Create Your Account
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Join Hermone and be part of our community
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-x-8 gap-y-5 md:grid-cols-2">
        {/* left column */}
        <div className="space-y-5">
          <Field id="signup-name" label="Full Name">
            <Input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
            />
          </Field>

          <Field id="signup-email" label="Email Address">
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </Field>

          <Button
            type="submit"
            className="h-11 gap-2 rounded-lg bg-[#312e81] px-7 text-base shadow-md hover:bg-[#3d3a99]"
          >
            Register <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* right column */}
        <div className="space-y-5">
          <Field id="signup-photo" label="Photo URL" optional>
            <Input
              id="signup-photo"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              className={inputClass}
            />
          </Field>

          <Field id="signup-password" label="Password">
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </Field>

          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Password must contain at least 6 characters, with uppercase and
            lowercase letters.
          </p>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-500 md:col-span-2">
            {error}
          </p>
        )}
        {submitted && (
          <p role="status" className="text-sm font-medium text-emerald-600 md:col-span-2">
            Account created! (demo — no backend connected yet)
          </p>
        )}
      </form>

      <p className="mt-8 text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-violet-600 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:text-violet-300"
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}
