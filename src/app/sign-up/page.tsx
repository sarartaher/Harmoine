import type { Metadata } from "next"
import { Users } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up — Hermone",
  description: "Create your Hermone account and join the community.",
}

export default function SignUpPage() {
  return (
    // Wider form column than sign-in: the fields sit in two columns.
    <AuthShell
      icon={<Users className="size-10" />}
      title="Join the community"
      description="Create your account and start connecting with people around you."
      className="lg:grid-cols-[1.6fr_1fr]"
    >
      <SignUpForm />
    </AuthShell>
  )
}
