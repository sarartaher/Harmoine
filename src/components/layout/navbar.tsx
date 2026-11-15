"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  HeartHandshake,
  LogOut,
  Menu,
  Plus,
  Ticket,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import { authClient } from "@/lib/auth-client";

// Public navigation links
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md">
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
        "rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none",
        layout === "horizontal" &&
          "relative hover:text-violet-600 dark:hover:text-violet-300",
        layout === "vertical" && "block px-4 py-3 text-base",
        active &&
          layout === "horizontal" &&
          "text-violet-600 after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-violet-600 dark:text-violet-300",
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
  const router = useRouter();

  // Current authentication session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const displayName = user?.name || "User";
  const photo = user?.image;

  // User initials for avatar fallback
  const initials = displayName
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Logout handler
  async function handleLogout() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 mx-auto container border-b border-violet-100 bg-white/80 backdrop-blur-md dark:border-violet-900/40 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              active={pathname === link.href}
            />
          ))}

          {!isPending && !session && (
            <NavLink
              href="/sign-in"
              label="Login"
              active={pathname === "/sign-in"}
            />
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Account dropdown: logged-in users only */}
          {!isPending && session && (
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Account menu"
                className="flex items-center gap-1 rounded-full p-0.5 outline-none hover:bg-violet-50 dark:hover:bg-violet-500/10"
              >
                <Avatar size="sm">
                  {photo && <AvatarImage src={photo} alt={displayName} />}

                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 font-semibold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <ChevronDown className="size-3.5 text-slate-500" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={<Link href="/account/profile" />}
                  >
                    <UserRound />
                    My Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    render={<Link href="/account/events/new" />}
                  >
                    <Plus />
                    Create Event
                  </DropdownMenuItem>

                  <DropdownMenuItem render={<Link href="/account/events" />}>
                    <CalendarDays />
                    Manage Events
                  </DropdownMenuItem>

                  <DropdownMenuItem render={<Link href="/account/joined" />}>
                    <Ticket />
                    Joined Events
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="flex size-8 items-center justify-center rounded-md text-slate-700 hover:bg-violet-50 dark:text-slate-300 dark:hover:bg-violet-500/10 md:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="gap-0 p-0 sm:max-w-xs">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <HeartHandshake className="size-5" />
                  Hermone
                </SheetTitle>

                <SheetDescription className="sr-only">
                  Main navigation
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-1 flex-col gap-1 px-4 py-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    {...link}
                    active={pathname === link.href}
                    layout="vertical"
                  />
                ))}

                {!isPending && !session && (
                  <NavLink
                    href="/sign-in"
                    label="Login"
                    active={pathname === "/sign-in"}
                    layout="vertical"
                  />
                )}

                {!isPending && session && (
                  <>
                    <div className="my-2 border-t border-border" />

                    <NavLink
                      href="/account/events/new"
                      label="Create Event"
                      active={pathname === "/account/events/new"}
                      layout="vertical"
                    />
                    <NavLink
                      href="/account/profile"
                      label="My Profile"
                      active={pathname === "/account/profile"}
                      layout="vertical"
                    />

                    <NavLink
                      href="/account/events"
                      label="Manage Events"
                      active={pathname === "/account/events"}
                      layout="vertical"
                    />

                    <NavLink
                      href="/account/joined"
                      label="Joined Events"
                      active={pathname === "/account/joined"}
                      layout="vertical"
                    />

                    <button
                      onClick={handleLogout}
                      className="px-4 py-3 text-left text-base font-medium text-red-500"
                    >
                      Logout
                    </button>
                  </>
                )}
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
