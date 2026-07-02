# My Bookshelfs — CLAUDE.md

## Project Overview

Full-stack monorepo for managing personal book collections. Users authenticate, search books via Open Library API, and track reading status (wishlist / reading / done). Backend is Express + TypeScript, frontend is Next.js 15 + React 18 + TypeScript.

## Repository Structure

```
my-bookshelfs/
├── backend/          Express API + Supabase integration
├── frontend/         Next.js web app
├── assets/           Project icons
├── docker-compose.dev.yml
└── docker-compose.prd.yml
```

## Running the Project

### With Docker (recommended)

```bash
# Development (hot reload, ports 3000 + 3001)
docker compose -f docker-compose.dev.yml up --build

# Production
docker compose -f docker-compose.prd.yml up --build
```

**Note:** `docker-compose.dev.yml` requires `.env` files in both `backend/` and `frontend/` directories before running.

### Without Docker

```bash
# Backend
cd backend
npm install
npm run dev      # Port 3001

# Frontend (separate terminal)
cd frontend
npm install
npm run dev      # Port 3000
```

## Environment Variables

**Backend** (`backend/.env`):
```
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_KEY=<service_role_key>
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Commands

### Backend (`cd backend`)

| Command            | Description                        |
|--------------------|------------------------------------|
| `npm run dev`      | Start with hot reload (nodemon)    |
| `npm run build`    | Compile TypeScript                 |
| `npm run test:unit`| Run Jest unit tests                |
| `npm run lint`     | Check ESLint                       |
| `npm run lint:fix` | Auto-fix ESLint issues             |
| `npm run format`   | Run Prettier formatter             |

### Frontend (`cd frontend`)

| Command                 | Description                 |
|-------------------------|-----------------------------|
| `npm run dev`           | Next.js dev server (port 3000) |
| `npm run build`         | Production build            |
| `npm run test:unit`     | Run Jest unit tests         |
| `npm run test:unit:watch` | Jest in watch mode        |
| `npm run lint`          | Check ESLint                |
| `npm run format`        | Run Prettier formatter      |

## Architecture

### Backend Layers

```
routes/ → controllers/ → services/ → database (Supabase)
```

- **routes/**: Express router definitions only
- **controllers/**: Request/response handling, input validation
- **services/**: Business logic and Supabase queries
- **middleware/**: auth (JWT via Supabase), request logger, rate limit
- **config/**: Supabase client and env validation

### Frontend Layers

```
pages (app/) → hooks/ → services/ → backend API or Supabase
```

- **app/**: Next.js App Router pages and layouts
- **components/**: Shadcn/ui-based reusable UI components
- **hooks/**: Data fetching hooks (React Query), auth state
- **services/**: Typed API call functions (Axios)
- **utils/**: Axios HTTP client instance with base config

### Authentication Flow

1. User signs in → backend calls Supabase Auth → JWT stored in httpOnly cookie
2. Subsequent requests include cookie → `auth-middleware.ts` verifies with `supabase.auth.getUser()`
3. Frontend uses Supabase SSR client to read session on server components

### Book Data Flow

- Search: `GET /book?search=` → backend proxies to Open Library API
- Save: `POST /book/:bookId/status` → stores user metadata in Supabase `books` table
- The `book_id` is the Open Library identifier; cover, title, author are stored alongside

## API Endpoints

### Auth (`/auth`)
- `POST /auth/signup` — Register
- `POST /auth/signin` — Login (sets httpOnly cookie)
- `POST /auth/signout` — Logout (clears cookie)
- `POST /auth/forgot-password` — Send reset email
- `POST /auth/reset-password` — Apply new password

### Books (`/book` — requires auth)
- `GET /book?search=&page=&limit=` — Search via Open Library
- `GET /book/:bookId` — Get book details
- `POST /book/:bookId/status` — Add/update book in user's collection
- `DELETE /book/:bookId` — Remove book from collection

### User (`/me` — requires auth)
- `GET /me/books` — User's books grouped by status
- `GET /me/books/count` — Count per status

## Security

- **Rate limiting**: 100 req/15 min per IP
- **CORS**: Allowlist of frontend origins only
- **Helmet**: CSP, XSS protection, frameguard, referrer policy
- **HPP**: HTTP Parameter Pollution protection
- **Payload limit**: 10KB

## CI/CD (GitHub Actions)

| Workflow               | Trigger            | Action                              |
|------------------------|--------------------|-------------------------------------|
| `backend-checks.yml`   | PR touching backend | Lint + format + unit tests         |
| `frontend-checks.yml`  | PR touching frontend | Lint + format + unit tests         |
| `backend-deploy.yml`   | Push to main / PR to staging | Deploy to Vercel           |
| `frontend-deploy.yml`  | Push to main / PR to staging | Deploy to Vercel           |
| `validate-pr.yml`      | Any PR             | Title prefix, assignee, label check |

**PR title must start with**: `feat:`, `fix:`, `chore:`, `docs:`, or `test:`

## Code Conventions

- TypeScript strict mode everywhere
- ESLint + Prettier enforced in CI (format check fails if not run before pushing)
- Run `npm run format` before committing to avoid CI failures
- Tests live next to source files; mocks in `__mocks__/` directories
- Backend test files: `*.test.ts`; coverage excludes `index.ts`, `app.ts`

## Deployment

- **Frontend**: Vercel — `https://my-bookshelfs.vercel.app`
- **Backend**: Vercel (serverless via `vercel.json`) — separate deployment
- Staging deploys are triggered by PRs targeting the `staging` branch
