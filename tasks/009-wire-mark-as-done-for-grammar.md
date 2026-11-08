# Task 009: Wire up Mark as Done Today for Grammar

_Part of VocabDaily (issue #9). Depends on: task 008. Stories: US-3, US-4._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Implement the Finish Session / Mark as Done Today flow on /grammar using the existing practice_sessions table (treating Grammar as a special topic with id 'grammar'), and ensure home page reflects updates to streak, heatmap and today's list.

## Files to touch
- `app/grammar/page.tsx`
- `app/page.tsx`

## Steps
1. In app/grammar/page.tsx, reuse the existing hook or service that records a practice session (pass topicId: 'grammar' when calling the Supabase insert)
2. On clicking 'Mark as Done Today', insert into practice_sessions with completed: true and current date, using the existing anonymous auth setup and RLS
3. After successful write, redirect back to home page ('/')
4. Update any home page logic (StreakDisplay, Heatmap, or today's completions) to recognize and display the 'Grammar' topic by name when topic_id is 'grammar'
5. Ensure the 7-day heatmap, streak counter, and today's completed topics list update correctly after marking Grammar as done

## Acceptance criteria
- [ ] On the home page (`/`), a new "Grammar" topic card appears alongside the existing 8 vocabulary topics
- [ ] Clicking the Grammar topic card navigates to `/grammar` and displays the topic name "Grammar" at the top
- [ ] The `/grammar` page shows 10 grammar-focused flashcards using the exact same flip, next/prev, and "Finish Session" behavior as existing topic pages, with front showing the grammar pattern (e.g. "Present Perfect") and back showing explanation plus example sentence
- [ ] After completing the 10-card session on `/grammar`, the "Mark as Done Today" button works and correctly updates the streak, heatmap, and today's completions list on the home page

## Done when

A tester can visit `/`, click Grammar, practice 10 cards, mark as done, and see the home page update its streak, heatmap, and today’s list. All acceptance criteria are visibly met in the browser.

## Out of scope
- New database tables, seed data changes, spaced repetition, user accounts, or mobile implementation

## Pull request

Title: `[task-009] Wire up Mark as Done Today for Grammar`. The description says `Part of issue #9`. Run the app and the tests before you open the PR.
