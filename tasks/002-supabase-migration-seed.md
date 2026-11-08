# Task 002: Database migration – seed topics, words, and RLS policies

_Part of VocabDaily (issue #4). Depends on: task 001. Stories: US-1, US-2, US-3, US-4._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Provide the Supabase migration that creates the three tables (topics, words, practice_sessions), seeds 8 topics with exactly 10 words each (including optional_example), and sets up the required RLS policies for anonymous usage.

## Files to touch
- `supabase/migrations/20241001000000_initial_schema.sql`

## Steps
1. Create the supabase/migrations directory
2. Write 20241001000000_initial_schema.sql that creates topics, words, and practice_sessions tables exactly matching the design
3. Seed exactly 8 topics: Food, Travel, Business, Health, Technology, Environment, Sports, Education
4. For each topic add exactly 10 words with english, translation, and optional_example fields
5. Add RLS policies: public read on topics/words, user-scoped write and read on practice_sessions using auth.uid()
6. Include comments explaining the policies

## Acceptance criteria
- [ ] The SQL file creates all three tables with correct schema
- [ ] It seeds 8 topics with 10 words each including example sentences
- [ ] RLS policies are defined for anonymous but secure usage

## Done when

A single migration file exists that the human can run in their Supabase project.

## Out of scope
- Any frontend code that uses the data. The human will run this migration later.

## Pull request

Title: `[task-002] Database migration – seed topics, words, and RLS policies`. The description says `Part of issue #4`. Run the app and the tests before you open the PR.
