# Task 006: Streak, heatmap & progress dashboard (US-4)

_Part of VocabDaily (issue #4). Depends on: task 005. Stories: US-4._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Implement the streak counter, 7-day heatmap, and today’s completed topics list on the home page using queries against practice_sessions.

## Files to touch
- `src/components/StreakDisplay.tsx`
- `src/components/Heatmap.tsx`
- `src/app/page.tsx`
- `lib/supabase.ts`

## Steps
1. Add getStreak(), getHeatmapData(), and getTodaysCompletions() functions to lib/supabase.ts using proper date handling and RLS
2. Create src/components/StreakDisplay.tsx that shows the current streak with a flame icon
3. Build src/components/Heatmap.tsx that renders the last 7 days as colored squares (green if practiced)
4. Update src/app/page.tsx to fetch and display StreakDisplay, Heatmap, the list of completed topics today, and integrate with existing topic list
5. Use server components where possible and proper caching
6. Polish the entire home page layout with Tailwind

## Acceptance criteria
- [ ] A progress dashboard shows the last 7 days with colored squares indicating which days I practiced
- [ ] The dashboard displays the current streak number
- [ ] Completed topics for the current day are listed with their names

## Done when

The home page fully implements the progress dashboard, streak, and heatmap as specified in US-4.

## Out of scope
- Anything beyond the last 7 days, user accounts, custom topics.

## Pull request

Title: `[task-006] Streak, heatmap & progress dashboard (US-4)`. The description says `Part of issue #4`. Run the app and the tests before you open the PR.
