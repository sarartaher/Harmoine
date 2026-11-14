import type { Metadata } from "next"
import { HeartHandshake } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In — Hermone",
  description: "Sign in to your Hermone account.",
}

export default function SignInPage() {
  return (
    <AuthShell
      icon={<HeartHandshake className="size-10" />}
      title="Welcome back"
      description="Sign in to pick up where you left off and keep discovering events."
    >
      <SignInForm />
    </AuthShell>
  )
}
