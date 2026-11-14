import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { SignUpIllustration } from "@/components/auth/sign-up-illustration"

export const metadata: Metadata = {
  title: "Sign Up — Hermone",
  description: "Create your Hermone account and join the community.",
}

export default function SignUpPage() {
  return (
    // Wider form column than sign-in: the fields sit in two columns.
    <AuthShell
      illustration={<SignUpIllustration />}
      className="lg:grid-cols-[1.6fr_1fr]"
    >
      <SignUpForm />
    </AuthShell>
  )
}
