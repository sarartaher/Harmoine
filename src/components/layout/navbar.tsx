"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  HeartHandshake,
  LogOut,
  Menu,
  Settings,
  Ticket,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/sign-in", label: "Login" },
];

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-500/25">
        <HeartHandshake className="size-5" />
      </span>
      <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
        Hermone
      </span>
    </Link>
  );
}

function NavLink({
  href,
  label,
  active,
  layout = "horizontal",
}: {
  href: string;
  label: string;
  active: boolean;
  layout?: "horizontal" | "vertical";
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
        layout === "horizontal" &&
          "relative hover:text-violet-600 dark:hover:text-violet-300",
        layout === "vertical" && "block px-4 py-3 text-base",
        active &&
          layout === "horizontal" &&
          "text-violet-600 after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-violet-600 dark:text-violet-300 dark:after:bg-violet-300",
        active &&
          layout === "vertical" &&
          "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300",
        !active && "text-slate-700 dark:text-slate-300",
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/80 backdrop-blur-md dark:border-violet-900/40 dark:bg-slate-950/80 container mx-auto ">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 ">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main" >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              active={pathname === link.href}
            />
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Account menu"
              className="flex items-center gap-1 rounded-full p-0.5 outline-none hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:hover:bg-violet-500/10"
            >
              <Avatar size="sm">
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 font-semibold text-white">
                  H
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="size-3.5 text-slate-500 dark:text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Hermone</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/account/events" />}>
                <CalendarDays /> My Events
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/account/joined" />}>
                <Ticket /> Joined Events
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-8 items-center justify-center rounded-md text-slate-700 outline-none hover:bg-violet-50 focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:text-slate-300 dark:hover:bg-violet-500/10 md:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 p-0 sm:max-w-xs">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                    <HeartHandshake className="size-4" />
                  </span>
                  Hermone
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation
                </SheetDescription>
              </SheetHeader>
              <nav
                className="flex flex-1 flex-col gap-1 px-4 py-2"
                aria-label="Mobile"
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    {...link}
                    active={pathname === link.href}
                    layout="vertical"
                  />
                ))}
              </nav>
              <div className="mt-auto flex items-center justify-between border-t border-border px-4 py-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
