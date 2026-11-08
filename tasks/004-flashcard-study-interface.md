# Task 004: Flashcard study interface (US-2)

_Part of VocabDaily (issue #4). Depends on: task 003. Stories: US-2._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Build the interactive flashcard experience on /[topic]. Show 10 cards with flip, next/prev, and “Finish Session” button after the 10th card.

## Files to touch
- `src/components/Flashcard.tsx`
- `src/app/[topic]/page.tsx`
- `lib/supabase.ts`

## Steps
1. Extend lib/supabase.ts with fetchWordsByTopic(topicId) that returns exactly 10 words
2. Create src/components/Flashcard.tsx as a client component with click-to-flip using state, showing english on front and translation + example on back
3. Update src/app/[topic]/page.tsx (client component) to fetch words, maintain current card index, next/prev buttons, and show 'Finish Session' button after the 10th card is viewed
4. Add smooth CSS transitions for card flip
5. Display a progress indicator (e.g. 3 of 10)
6. Ensure the page still shows the topic name at the top

## Acceptance criteria
- [ ] Each flashcard shows the English word on the front and the translation/definition + example sentence on the back
- [ ] I can flip the card by clicking it
- [ ] I can navigate to the next or previous card using simple buttons
- [ ] After viewing 10 cards, a 'Finish Session' button appears

## Done when

Learners can study 10 flashcards per topic with flip and navigation.

## Out of scope
- Marking as done, streak, heatmap, progress persistence.

## Pull request

Title: `[task-004] Flashcard study interface (US-2)`. The description says `Part of issue #4`. Run the app and the tests before you open the PR.
