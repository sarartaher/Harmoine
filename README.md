# Hermone — Frontend

Social development events platform built with Next.js (App Router) + React + Tailwind CSS.
Create, discover, join, and manage community events (cleanup drives, plantations, donations, and more).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000]

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | What it does |
|----------|--------------|
| `NEXT_PUBLIC_API_BASE_URL` | URL of the backend API (e.g. `http://localhost:8800`) |
| `BETTER_AUTH_URL` | URL of this frontend (used by Better Auth) |
| `BETTER_AUTH_SECRET` | Secret key for signing auth sessions |
| `MONGO_URI` | MongoDB connection string |
| `DB_NAME` | MongoDB database name |

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Check code quality |
| `npx tsc --noEmit` | Typecheck |

## Routes

| Path | What it shows |
|------|---------------|
| `/` | Home page with upcoming events and gallery |
| `/events` | All upcoming events with search, filter, pagination |
| `/events/[slug]` | Single event details with "Join" button |
| `/sign-in`, `/sign-up` | Authentication pages |
| `/account/events` | Manage your events (search, category filter, publish, delete) |
| `/account/events/new` | Create a new event |
| `/account/events/[slug]/edit` | Edit an event (including changing its picture) |
| `/account/joined` | Events you have joined |
| `/account/profile` | View and update your profile |

## Features

- **Authentication** — Better Auth with email + password. Login / signup / logout / protected account routes.
- **Create events** — title, description, category, date, location, optional thumbnail image (uploaded as a file).
- **Discover events** — search by title or location, filter by category, 6 per page.
- **Join events** — logged-in users can join; the button is disabled for guests.
- **Manage events** — see all your events, change status (published / draft), edit details, or delete.
- **Joined events** — see everything you signed up for.
- **Profile** — update your name; email is read-only.
- **Gallery** — placeholder photos until a real gallery endpoint is added.
- **Toasts** — success and error messages use `react-toastify`.

## Project structure

```
src/
  app/            # routes (pages + server actions)
  components/     # UI grouped by page (home/, events/, account/, layout/, shared/)
  lib/            # helpers (api.ts, endpoints.ts, auth.ts, account-api.ts)
  interfaces/     # all TypeScript types
```

All backend paths live in `src/lib/endpoints.ts`.
All request URLs are built from `NEXT_PUBLIC_API_BASE_URL` in `src/lib/api.ts`.

## Backend

The frontend needs the Express + MongoDB backend from `../server`. Start it first:

```bash
cd ../server
npm install
npm run dev
```

## Deployment

1. Set `NEXT_PUBLIC_API_BASE_URL` to your deployed backend URL.
2. Set `BETTER_AUTH_URL` to your deployed frontend URL.
3. Build and run:

```bash
npm run build
npm run start
```

On the backend, set `BACKEND_URL` (its own public URL) and `FRONTEND_URL` (this frontend's origin) so images and CORS work.
