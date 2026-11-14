"use client"

import { Moon, Sun } from "lucide-react"

// The inline script in the root layout puts a `dark` class on <html>.
// We just toggle that class here. The highlighted button follows CSS
// (`dark:` variants), so React needs no state and no effects.
function setTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem("theme", theme)
  } catch {
    // localStorage can be blocked (private browsing) — the class still applies.
  }
}

export function ThemeToggle() {
  return (
    <div
      role="group"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-full p-0.5"
    >
      <button
        type="button"
        aria-label="Switch to light mode"
        onClick={() => setTheme("light")}
        className="flex size-8 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition-colors outline-none hover:bg-violet-200 focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:bg-transparent dark:text-slate-400 dark:hover:bg-violet-500/15 dark:hover:text-violet-300"
      >
        <Sun className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Switch to dark mode"
        onClick={() => setTheme("dark")}
        className="flex size-8 items-center justify-center rounded-full text-slate-500 transition-colors outline-none hover:bg-violet-100 hover:text-violet-600 focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:bg-violet-500/20 dark:text-violet-300 dark:hover:bg-violet-500/30"
      >
        <Moon className="size-4" />
      </button>
    </div>
  )
}
