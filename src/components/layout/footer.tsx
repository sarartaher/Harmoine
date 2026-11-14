import Link from "next/link"
import { HeartHandshake } from "lucide-react"
import { SubscribeForm } from "@/components/shared/subscribe-form"

// Brand icons were removed from lucide, so socials are inline feather-style SVGs.
// Each icon only ever needs a className (sizing), so that's all it takes.
type SocialProps = { className?: string }

function InstagramIcon({ className }: SocialProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: SocialProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TwitterIcon({ className }: SocialProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  )
}

function LinkedinIcon({ className }: SocialProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const socials = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
]

const discoverLinks = [
  { href: "/", label: "Homepage" },
  { href: "/events", label: "Upcoming Events" },
  { href: "#", label: "Our Community" },
]

const organizerLinks = [
  { href: "#", label: "Create Events" },
  { href: "#", label: "Manage Events" },
  { href: "#", label: "Join the Community" },
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
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-violet-500 hover:text-white"
                >
                  <Icon className="size-4" />
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
