import { Mail } from "lucide-react"
import { SubscribeForm } from "@/components/shared/subscribe-form"

export function Newsletter() {
  return (
    <section className="bg-white py-16 dark:bg-slate-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-8 shadow-sm sm:p-10 dark:border-violet-900/50 dark:from-violet-950/40 dark:via-slate-900 dark:to-indigo-950/40">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="flex items-center gap-4 text-center md:text-left">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/30">
                <Mail className="size-7" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Never Miss an Event
                </h2>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  Get the latest events and updates straight to your inbox.
                </p>
              </div>
            </div>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  )
}
