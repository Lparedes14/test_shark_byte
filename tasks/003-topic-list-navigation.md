# Task 003: Topic list and navigation (US-1)

_Part of VocabDaily (issue #4). Depends on: task 001, task 002. Stories: US-1._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Implement the home page (/) with a list of 8 topic cards. Clicking a card navigates to /[topic]. The flashcard page stub shows the selected topic name at the top.

## Files to touch
- `src/app/page.tsx`
- `src/components/TopicCard.tsx`
- `src/app/[topic]/page.tsx`
- `lib/types.ts`
- `lib/supabase.ts`

## Steps
1. Extend lib/supabase.ts with a fetchTopics() function that queries the topics table
2. Create lib/types.ts with TypeScript interfaces for Topic and Word
3. Build src/components/TopicCard.tsx as a clickable card showing topic name
4. Update src/app/page.tsx to fetch topics on server and render a responsive grid of TopicCard components
5. Create src/app/[topic]/page.tsx that receives the topic slug, displays its name at the top, and has a stub message
6. Use Next.js Link for navigation between home and topic pages
7. Style everything with Tailwind to look clean and modern

## Acceptance criteria
- [ ] A list of at least 6 predefined topics (Food, Travel, Business, etc.) is shown on the home screen
- [ ] Clicking a topic card loads the flashcard screen for that topic
- [ ] The selected topic name is displayed at the top of the flashcard view

## Done when

Users can browse topics on the home page and click into a topic page that shows the correct name.

## Out of scope
- Flashcard UI, streak, heatmap, practice tracking, any auth logic.

## Pull request

Title: `[task-003] Topic list and navigation (US-1)`. The description says `Part of issue #4`. Run the app and the tests before you open the PR.
