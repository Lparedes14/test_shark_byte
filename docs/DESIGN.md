# Design: VocabDaily

_Written by the Design swarm (Swarms `GroupChat`: Architect, UX/UI Designer, Security Reviewer and MVP Cutter) for issue #4, from the approved PRD._

A language learning app that builds daily flashcard practice with streaks and heatmaps. It uses Next.js frontend with direct Supabase queries under RLS for anonymous but persistent user progress across devices.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js (App Router, TS) + Tailwind | Modern React framework with file-based routing and great DX |
| Hosting | Vercel | Seamless deployment for Next.js apps |
| Database | Supabase (Postgres) | Provides Postgres, auth, and RLS for secure anonymous usage |

## Pages

| Route | Purpose | Components | Stories |
|---|---|---|---|
| `/` | Shows topic list, streak, 7-day heatmap and today's completions; links to topics | TopicList, StreakDisplay, Heatmap | US-1 |
| `/[topic]` | Displays flashcards: flip, next/prev, after 10 cards shows Mark as Done Today button | Flashcard, ProgressCounter, DoneButton | US-2 |

## Data model

### `topics`

Stores the 8 default learning topics

- `id uuid primary key`
- `name text unique`

### `words`

Stores vocabulary items linked to topics

- `id uuid primary key`
- `topic_id uuid references topics`
- `english text`
- `translation text`
- `optional_example text`

### `practice_sessions`

Records user completion of daily practice

- `id uuid primary key`
- `user_id uuid`
- `topic_id uuid`
- `date timestamp`
- `completed boolean`

## API routes
- none – direct Supabase queries with RLS

## Security rules
- RLS policies that enforce user_id = auth.uid() on all writes and user-scoped SELECTs for practice_sessions
- topics/words tables are SELECT-only with public seed data
- no service_role key reaches browser—only anon key is used
- input validation on client writes (date/topic from allowed set)
- streak/heatmap computed from server-timestamped rows only

## Environment variables (names only)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Decisions

| Topic | Decision | Why |
|---|---|---|
| words per topic | exactly 10 | matches US-2 AC literally and reduces load while staying in PRD 10-20 range |
| include example sentence | yes on card back | adds context without extra complexity |
| number of default topics | exactly 8 | covers core domains (Food, Travel, Business, Health, Technology, Environment, Sports, Education) |
| flashcard implementation | dedicated route /[topic] | ensures all ACs are browser-checkable without modals |
| backend from day 1 | use Supabase + anonymous sign-in + RLS | satisfies founder rules for persistence across devices |

## Scope: in
- topic selection from 8 seeded topics
- flashcard practice with flip/next/prev
- 10-card daily session tracking
- streak and 7-day heatmap on home and dashboard
- anonymous sign-in with persistent progress via RLS

## Scope: out
- user accounts or login UI
- progress sharing between users
- custom topic creation
- spaced repetition algorithm
- detailed dashboard beyond last-7-days

## Risks
- Cross-user data leakage via anon keys; reduced by strict RLS policies using auth.uid()
- Seed data inconsistency; reduced by running migration only once in Supabase project

## Steps only a human can do
- create Supabase project
- enable anon sign-ins
- run migration to seed topics/words and set RLS policies
- add env vars to Vercel project

## Open questions
- None
