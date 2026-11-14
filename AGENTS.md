<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hermone-frontend

Single-app Next.js 16 (App Router) + React 19 + Tailwind 4 + shadcn/ui. Not a monorepo. No CI, pre-commit hooks, or test framework — don't look for one.

## Commands (all verified)

- `npm run dev` — dev server (Turbopack). **Re-writes the block above**; commit it with your changes to keep the tree clean.
- `npx tsc --noEmit` — typecheck (no npm script for it). `next build` also typechecks and fails on type errors.
- `npm run lint` — repo-wide ESLint with flat config (`eslint.config.mjs`). **Baseline is already failing**: exactly 2 pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Don't assume lint is green, and don't "fix" those two in passing — just add no new errors.
- `npm run build` — production build; verified passing. `/events/[slug]`, `/account/events`, and `/account/joined` are Partial Prerender (◐); other routes are static.
- Use npm (`package-lock.json`). The README's yarn/pnpm/bun commands are boilerplate — ignore them.

Suggested order: `npx tsc --noEmit` → `npm run lint` → `npm run build`.

## Architecture

- Routes: `/`, `/events`, `/sign-in`, `/sign-up`, `/account/events`, `/account/joined`, plus dynamic `/events/[slug]`. Old spellings `/signin` and `/signup` redirect via `next.config.ts`; redirects match case-insensitively, so `/signIn` etc. hit the same rules. Never redirect between paths that differ only by case — it self-loops.
- App Router in `src/app/`; path alias `@/*` → `./src/*` (tsconfig `paths`). `src/app/layout.tsx` wraps every page with navbar/footer and an inline pre-paint script that puts `.dark` on `<html>` from `localStorage`/OS preference. `theme-toggle.tsx` only toggles that class — no React state, no `next-themes`.
- Components are folderized by page: `layout/`, `home/`, `events/`, `account/`, `auth/` (sign-in + sign-up), `shared/` (`subscribe-form`, used by home and footer); shadcn primitives stay in `ui/`. Content is static in `src/lib/data.ts` (`events`, `eventListings`, `eventCategories`, `galleryImages`); swap image paths there, with assets under `public/events/` and `public/gallery/`.
- Placeholder images use plain `<img>` with an `eslint-disable-next-line @next/next/no-img-element` comment — replace with `next/image` when swapping in real photos.
- Dates: list cards use `dateBadge()` (no `Date`, avoids timezone day shifts); `/events/[slug]` uses `formatEventDate()` / `formatEventTimeRange()` from `src/lib/format-event-date.ts` on ISO date-times.
- `/events` search/filter/pagination is entirely client-side in `event-browser.tsx` (6 per page); the "Other" pill catches categories without their own pill. Event cards link to `/events/${event.id}`.
- **Events backend**: `src/lib/events-api.ts` calls `GET {API_BASE_URL}/events/{slug}` (server-only env var; copy `.env.example` to `.env.local`). The `EventDetail` type there is the response contract. Missing event → `notFound()`; other non-OK responses throw.
- `/events/[slug]/page.tsx` follows the Cache Components dynamic-params pattern: the page stays sync and wraps a child that awaits `params` + fetches in `<Suspense>` (fallback in `event-details-skeleton.tsx`). `generateMetadata` fetches the same URL (fetch is memoized per request). Keep this shape — awaiting `params` at the page top breaks with `cacheComponents`.
- The details page exports `instant = false`: the root-layout navbar calls `usePathname()`, which cannot be prerendered for an unknown slug. Removing it makes `next build` fail with `CLIENT_HOOK_DYNAMIC`.
- **Account pages**: `/account/events` (`managed-events.tsx`) and `/account/joined` (`joined-events.tsx`) are client-side search/filter views fed by server components. Data comes from `src/lib/account-api.ts`: `GET {API_BASE_URL}/account/events` → `ManagedEvent[]` and `GET {API_BASE_URL}/account/joined` → `JoinedEvent[]`. Both pages follow the same sync-page + `<Suspense>` + async-child shape as the details page; skeletons are in `src/components/account/`. `getList()` calls `await connection()` first, so the build does not try to fetch these per-user lists (without it `npm run build` fails when `API_BASE_URL` is unset).
- Mutations on `/account/events` are server actions in `src/app/account/events/actions.ts`: `PATCH {API_BASE_URL}/account/events/{slug}` with `{ "status": "published" | "draft" }`, and `DELETE {API_BASE_URL}/account/events/{slug}`. Both call `revalidatePath("/account/events")`. Forms pass `slug`/`status` as hidden inputs (no `.bind` in client code).
- The profile dropdown in `layout/navbar.tsx` links to My Events and Joined Events. It is always visible because there is no auth yet.
- **No auth, no API routes, no DB**: account pages have **no auth guard**, and backend calls carry no session token. Sign-in/sign-up and subscribe forms are client-side demos with fake success states — don't wire real auth without asking.

## Code style

- Prefer **simple, beginner-readable logic** over clever or complex code: small named functions, plain `if`/loops where clear, and direct calculations over extra state, indirection, or premature abstractions. Optimize for readability, not concision. Keep existing straightforward patterns instead of refactoring them.

## Toolchain quirks

- **shadcn here is Base UI, not Radix**: `components.json` uses style `base-nova`, and the primitives in `src/components/ui/` import from `@base-ui/react/*`. Don't add `@radix-ui` packages or Radix-specific props; add/regenerate primitives with `npx shadcn add <component>` using the aliases in `components.json` instead of hand-writing them.
- `src/lib/utils.ts` is only `export { cn } from "cn"` — the `cn` npm package (compiled clsx + tailwind-merge). Don't replace it with a local clsx/tailwind-merge helper. Later class names win.
- **Tailwind 4, CSS-first**: no `tailwind.config` / PostCSS config. Tailwind loads via the `*.css` Turbopack loader rule in `next.config.ts`; theme and styles live in `src/app/globals.css`. Don't add a Tailwind config file or PostCSS plugin.
- **React Compiler is enabled** (`reactCompiler: true`, `babel-plugin-react-compiler`) — follow React Compiler rules (no mutating props, etc.).
- **`cacheComponents: true` + `partialPrefetching: true`** — caching and data-fetching semantics differ from stable Next.js. Consult `node_modules/next/dist/docs/` (not your training data) before relying on route caching, `revalidate`, or dynamic APIs.
- `experimental.agentFeedback: true` is set intentionally — leave it alone.
- `README.md` is untouched create-next-app boilerplate with wrong paths (says `app/page.tsx`; the real file is `src/app/page.tsx`). Trust the code over the README.
