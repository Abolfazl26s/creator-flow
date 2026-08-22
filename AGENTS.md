# CreatorFlow — Instructions for AI Coding Agents

## Read first

Before proposing or changing code, read these files in order:

1. `AGENTS.md`
2. `docs/PROJECT_CONTEXT.md`
3. Latest files in `supabase/migrations/`, if they exist
4. Relevant source files in `src/`

Do not assume this is a blank Next.js starter project.

## Project purpose

CreatorFlow is a multi-tenant creative-workspace SaaS.

Users can manage creative projects, tasks, production workflows and progress.
The current product focus is individual creators, but the database supports team workspaces and member roles.

## Technology stack

- Next.js 16 with App Router and Turbopack
- React and TypeScript
- Tailwind CSS
- Supabase Auth, PostgreSQL and Row Level Security
- `@supabase/ssr` for cookie-based SSR authentication
- Zod for server-side validation
- Lucide React for icons
- GitHub Actions and Vercel are planned for later stages

## Commands

Run these checks after code changes:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Run development mode:

```bash
npm run dev
```

## Security rules

- Never read, print, modify, commit or expose `.env`, `.env.local` or secret values.
- Never put a Supabase service-role key in browser code.
- Never trust client-provided `user_id`, `workspace_id`, role or ownership fields.
- Derive user identity on the server with Supabase Auth.
- Keep Row Level Security enabled on exposed database tables.
- Do not weaken or remove RLS policies without explicitly explaining the security impact.
- All database schema changes must be captured in `supabase/migrations/`.

## Architecture rules

- The project uses the `src/` directory.
- The authentication boundary lives in `src/proxy.ts`.
- Use `supabase.auth.getUser()` for server-side identity checks.
- Default to Server Components.
- Add `"use client"` only for browser interactivity, hooks, form state or browser APIs.
- Files containing module-level `"use server"` may export only async Server Action functions.
- Put shared state objects, types, schemas and constants outside `"use server"` files.
- Use Server Actions for secure mutations unless a Route Handler is specifically needed.
- Validate all mutation input using Zod on the server.
- Revalidate affected paths after successful mutations.

## Current route structure

```text
/                     Public landing page
/login                Authentication page
/signup               Account creation page
/dashboard            Authenticated overview
/dashboard/projects   Authenticated project management
/dashboard/tasks      Authenticated task management
/dashboard/settings   Authenticated settings
```

## Responsive navigation contract

Do not change this product decision unless explicitly asked:

```text
< sm      → Bottom navigation only
sm to lg  → Bottom navigation plus optional drawer menu
>= lg     → Desktop sidebar plus sidebar collapse/expand control
```

The mobile drawer trigger intentionally uses:

```tsx
hidden sm:flex ... lg:hidden
```

Do not replace it with `lg:hidden` unless the product owner explicitly requests that behavior.

## Data model

Core tables:

```text
profiles
workspaces
workspace_members
projects
tasks
```

Roles:

```text
owner
admin
member
```

Projects belong to a workspace.
Tasks belong to a workspace and can optionally belong to a project.
All data access must respect workspace membership.

## Workspace bootstrap

The PostgreSQL RPC function below is the canonical workspace bootstrap flow:

```text
public.create_personal_workspace()
```

It must:

1. Require an authenticated user.
2. Reuse the user's existing workspace when one exists.
3. Create a profile if needed.
4. Create a personal workspace when none exists.
5. Add the current user as `owner`.
6. Return the workspace.

The app accesses it through:

```text
src/lib/workspace/get-current-workspace.ts
```

## Git rules

- Never commit `.next/`.
- Never commit `tsconfig.tsbuildinfo`.
- Never commit `.env*` files.
- Prefer explicit `git add` paths instead of `git add .`.
- Do not force-push without an explicit request.
- Use descriptive conventional-style commits such as:
  - `feat: add project creation flow`
  - `fix: prevent cross-workspace access`
  - `docs: update project context`

## Documentation rule

After any meaningful architectural, database, routing, authentication or UI-flow change:

1. Update `docs/PROJECT_CONTEXT.md`.
2. Update this file if the rule or workflow changed.
3. Add or update a migration for database changes.
4. Mention the verification commands that were run.