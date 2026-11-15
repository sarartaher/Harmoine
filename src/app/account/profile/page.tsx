import type { Metadata } from "next"
import { Suspense } from "react"
import { UserRound } from "lucide-react"
import { AccountHeader } from "@/components/account/account-header"
import { ProfileForm } from "@/components/account/profile-form"
import { EmptyState } from "@/components/shared/empty-state"
import { getProfile } from "@/lib/account-api"

export const metadata: Metadata = {
  title: "Profile — Hermone",
  description: "View and update your Hermone account details.",
}

async function ProfileContent() {
  const profile = await getProfile()

  if (!profile) {
    return <EmptyState />
  }

  return <ProfileForm profile={profile} />
}

export default function AccountProfilePage() {
  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <AccountHeader
        title="Profile"
        description="View and update your Hermone account details."
        icon={<UserRound className="size-6" />}
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Suspense fallback={<EmptyState />}>
          <ProfileContent />
        </Suspense>
      </div>
    </main>
  )
}