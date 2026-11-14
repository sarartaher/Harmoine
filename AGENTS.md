<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hermone-frontend

Single-app Next.js 16 (App Router) + React 19 + Tailwind 4 + shadcn/ui. Not a monorepo. No CI, no pre-commit hooks, no test framework — don't look for one.

## Commands (all verified)

- `npm run dev` — dev server (Turbopack). **Re-writes the block above**; commit it with your changes to keep the tree clean.
- `npx tsc --noEmit` — typecheck (there is no npm script for it). `next build` also typechecks and fails on type errors.
- `npm run lint` — `eslint` with flat config (`eslint.config.mjs`). **Baseline is already failing**: 2 pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Don't assume lint is green, and don't "fix" those two in passing — just make sure you don't add new errors.
- `npm run build` — production build; verified passing.
- Use npm (`package-lock.json`). The README's yarn/pnpm/bun commands are boilerplate — ignore them.

Suggested order: `npx tsc --noEmit` → `npm run lint` → `npm run build`.

## Architecture

- App Router lives in `src/app/` (`layout.tsx`, `page.tsx`, `globals.css`). Path alias `@/*` → `./src/*` (tsconfig `paths`).
- shadcn/ui components in `src/components/ui/`, configured by `components.json` (style `base-nova`, `rsc: true`, neutral, lucide icons). Add/regenerate with `npx shadcn add <component>` instead of hand-writing primitives; `components.json` defines the aliases `shadcn` writes into.
- Hooks in `src/hooks/`, shared utils in `src/lib/utils.ts` (`cn`), code highlighting in `src/lib/highlighter.tsx`.
- Components are folderized by page in `src/components/`: `layout/` (navbar, footer, theme-toggle — rendered by `src/app/layout.tsx` around every page), `home/`, `events/`, `auth/` (sign-in + sign-up), `shared/` (`subscribe-form`, used by both home and footer). shadcn primitives stay in `src/components/ui/`. `cn` is tailwind-merge-aware — later className entries win.
- Routes: `/`, `/events`, `/sign-in`, `/sign-up` — kebab-case so the URL matches the component file names (`sign-in-form.tsx` ↔ `/sign-in`). Old spellings (`/signin`, `/signIn`, `/signup`, `/signUp`) redirect there via `next.config.ts` (Next redirects match case-insensitively, so never redirect between paths that differ only by case — it self-loops). Home/events content is data-driven from `src/lib/data.ts`; placeholder images live in `public/events/` and `public/gallery/` — swap image paths there.

## Toolchain quirks

- **Tailwind 4, CSS-first**: no `tailwind.config` / PostCSS config. Tailwind loads via the `*.css` Turbopack loader rule in `next.config.ts`; styles are defined in `src/app/globals.css`. Don't add a Tailwind config file or PostCSS plugin.
- **React Compiler is enabled** (`reactCompiler: true`, `babel-plugin-react-compiler`) — components must follow React Compiler rules (no mutating props, etc.).
- **`cacheComponents: true` + `partialPrefetching: true`** — caching and data-fetching semantics differ from stable Next.js. Consult `node_modules/next/dist/docs/` (not your training data) before relying on route caching, `revalidate`, or dynamic APIs.
- `experimental.agentFeedback: true` is set intentionally — leave it alone.
- README.md is untouched create-next-app boilerplate with wrong paths (says `app/page.tsx`; the real file is `src/app/page.tsx`). Trust the code over the README.
