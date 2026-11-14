import type { Metadata } from "next"
import { AuthShell } from "@/components/auth/auth-shell"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SignInIllustration } from "@/components/auth/sign-in-illustration"

export const metadata: Metadata = {
  title: "Sign In — Hermone",
  description: "Sign in to your Hermone account.",
}

export default function SignInPage() {
  return (
    <AuthShell illustration={<SignInIllustration />}>
      <SignInForm />
    </AuthShell>
  )
}
