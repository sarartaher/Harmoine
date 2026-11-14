import Link from "next/link"
import { HeartHandshake } from "lucide-react"
import { SubscribeForm } from "@/components/shared/subscribe-form"

// lucide no longer ships brand logos, so each social link shows a short text
// badge instead of a hand-written SVG.
const socials = [
  { label: "Instagram", href: "#", short: "IG" },
  { label: "Facebook", href: "#", short: "FB" },
  { label: "Twitter", href: "#", short: "X" },
  { label: "LinkedIn", href: "#", short: "in" },
]

const discoverLinks = [
  { href: "/", label: "Homepage" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/events", label: "Our Community" },
]

const organizerLinks = [
  { href: "/account/events/new", label: "Create Events" },
  { href: "/account/events", label: "Manage Events" },
  { href: "/account/joined", label: "Joined Events" },
]

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <nav aria-label={title}>
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-violet-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#141026] via-[#171231] to-[#1c1542] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-500/25">
                <HeartHandshake className="size-5" />
              </span>
              <span className="text-lg font-bold text-white">Hermone</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Connect. Discover. Belong.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ label, href, short }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-slate-300 transition hover:bg-violet-500 hover:text-white"
                >
                  <span aria-hidden>{short}</span>
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Discover" links={discoverLinks} />
          <FooterColumn title="For Organizers" links={organizerLinks} />

          {/* Stay Connected */}
          <div>
            <h3 className="font-semibold text-white">Stay Connected</h3>
            <p className="mt-4 text-sm text-slate-400">
              Get the latest news and updates events delivered to your inbox.
            </p>
            <div className="mt-4">
              <SubscribeForm variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 Hermone. All rights reserved.</p>
          <p className="flex gap-3">
            <Link href="#" className="transition-colors hover:text-violet-300">
              Privacy Policy
            </Link>
            <span aria-hidden>|</span>
            <Link href="#" className="transition-colors hover:text-violet-300">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
