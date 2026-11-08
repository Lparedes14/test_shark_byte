# Task 001: Scaffold Next.js app with Supabase client and home page stub

_Part of VocabDaily (issue #4). Depends on: none. Stories: none listed._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Create a working Next.js + TypeScript + Tailwind app that builds and deploys to Vercel, shows a basic home page, and initializes the Supabase client from environment variables.

## Files to touch
- `package.json`
- `next.config.js`
- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `lib/supabase.ts`
- `.env.example`

## Steps
1. Run create-next-app with TypeScript, Tailwind, App Router and ESLint
2. Install @supabase/supabase-js
3. Create lib/supabase.ts that exports a Supabase client using NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Update src/app/globals.css with Tailwind directives and basic app styling
5. Create a clean src/app/layout.tsx with metadata for VocabDaily
6. Replace src/app/page.tsx with a centered 'VocabDaily' heading and a placeholder div for topics
7. Add .env.example with the two required variable names (no real values)
8. Ensure the app builds and runs with 'npm run build' and 'npm run dev'

## Acceptance criteria
- [ ] The app loads at localhost:3000 with a centered “VocabDaily” heading and placeholder text
- [ ] No errors in browser console or during build

## Done when

A bare Next.js app with Supabase client is ready and builds cleanly.

## Out of scope
- Any database, topics, flashcards, or progress logic. No real UI components beyond a centered “VocabDaily” heading and placeholder for topics.

## Pull request

Title: `[task-001] Scaffold Next.js app with Supabase client and home page stub`. The description says `Part of issue #4`. Run the app and the tests before you open the PR.
