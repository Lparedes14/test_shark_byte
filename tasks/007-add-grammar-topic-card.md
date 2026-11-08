# Task 007: Add Grammar topic card to home page

_Part of VocabDaily (issue #9). Depends on: none. Stories: US-1._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Extend the existing home page to display a new "Grammar" topic card alongside the 8 vocabulary topics and wire navigation to the /grammar route.

## Files to touch
- `app/page.tsx`

## Steps
1. Locate the TopicList or topics array in app/page.tsx
2. Add a new topic object for Grammar: { id: 'grammar', name: 'Grammar', isGrammar: true }
3. Ensure the TopicCard component renders it with the same styling as other cards (no new styles needed)
4. Update the onClick handler so clicking Grammar navigates to '/grammar' using Next.js Link or router
5. Do not create the /grammar page in this task

## Acceptance criteria
- [ ] A list of at least 6 predefined topics (Food, Travel, Business, etc.) is shown on the home screen
- [ ] A new "Grammar" topic card appears alongside the existing 8 vocabulary topics

## Done when

The home page shows the Grammar card and clicking it attempts to navigate to /grammar (404 is expected until Task 2).

## Out of scope
- Creating the /grammar page, implementing flashcards, handling practice completion, or any Supabase changes

## Pull request

Title: `[task-007] Add Grammar topic card to home page`. The description says `Part of issue #9`. Run the app and the tests before you open the PR.
