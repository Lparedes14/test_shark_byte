# Task 005: Anonymous auth, practice sessions & Mark as Done (US-3)

_Part of VocabDaily (issue #4). Depends on: task 002, task 004. Stories: US-3._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Add anonymous sign-in on app load, record practice_sessions when user clicks “Mark as Done Today”, and show visual completion indicators on the home page.

## Files to touch
- `lib/supabase.ts`
- `src/app/[topic]/page.tsx`
- `src/components/DoneButton.tsx`
- `src/app/page.tsx`

## Steps
1. Add initializeAuth() in lib/supabase.ts that calls supabase.auth.signInAnonymously() on app load
2. Implement recordPracticeSession(topicId) that inserts into practice_sessions with current date
3. Create src/components/DoneButton.tsx that appears after Finish Session, calls the record function, and shows success state
4. Update src/app/[topic]/page.tsx to integrate the DoneButton after the 10 cards
5. Modify src/app/page.tsx to query today's completed topics and show a green badge or checkmark on completed TopicCards
6. Add a simple streak counter display on home (stub value for now)
7. Ensure all writes respect RLS via the anon user

## Acceptance criteria
- [ ] After finishing a session, I can click 'Mark as Done Today'
- [ ] The topic shows a visual indicator (checkmark or green badge) that it was completed today
- [ ] The home screen displays a daily streak counter that increases when a topic is marked done

## Done when

Users can mark a topic done for the day and see it reflected on the home page with a streak counter.

## Out of scope
- Heatmap, 7-day progress dashboard.

## Pull request

Title: `[task-005] Anonymous auth, practice sessions & Mark as Done (US-3)`. The description says `Part of issue #4`. Run the app and the tests before you open the PR.
