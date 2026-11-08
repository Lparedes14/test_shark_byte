# Feature: Grammar practice

_Written by the Feature swarm (Swarms `SequentialWorkflow`: Product Owner, then MVP Cutter) for issue #9._

## Story

**As a** learner, **I want** to practice grammar structures using the same flashcard format, **so that** I can reinforce grammar alongside vocabulary in my daily sessions.

## Acceptance criteria
- [ ] On the home page (`/`), a new "Grammar" topic card appears alongside the existing 8 vocabulary topics
- [ ] Clicking the Grammar topic card navigates to `/grammar` and displays the topic name "Grammar" at the top
- [ ] The `/grammar` page shows 10 grammar-focused flashcards using the exact same flip, next/prev, and "Finish Session" behavior as existing topic pages, with front showing the grammar pattern (e.g. "Present Perfect") and back showing explanation plus example sentence
- [ ] After completing the 10-card session on `/grammar`, the "Mark as Done Today" button works and correctly updates the streak, heatmap, and today's completions list on the home page

## Out of scope
- New data tables, spaced-repetition logic, or custom grammar rule entry
- Extending the seed data in Supabase (use a client-side array for the 10 grammar items instead)

## Notes for the planner

Reuse existing flashcard component, routing pattern, Supabase RLS, and practice_sessions table by treating "Grammar" as a special hardcoded topic (no new DB row needed).
