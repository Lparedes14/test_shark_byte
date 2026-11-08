# Task 008: Build the /grammar flashcard page

_Part of VocabDaily (issue #9). Depends on: task 007. Stories: US-2._

Read `.cursor/rules/project.mdc`, `docs/PRD.md` and `docs/DESIGN.md` first. Implement only this task.

## Goal

Create the /grammar route that reuses the existing flashcard UI exactly, but with a hardcoded list of 10 grammar patterns and the topic name "Grammar" at the top.

## Files to touch
- `app/grammar/page.tsx`

## Steps
1. Create app/grammar/page.tsx following the exact pattern of existing /[topic]/page.tsx
2. Hardcode an array of 10 grammar items inside the page (each with front: pattern e.g. "Present Perfect", back: explanation + example sentence)
3. Import and reuse the existing Flashcard component, ProgressCounter, navigation buttons, and flip behavior without modification
4. Display "Grammar" as the topic name at the top of the page
5. Show exactly 10 cards; after the 10th card, display the 'Finish Session' button (do not wire the mark-as-done logic yet)
6. Use the same Tailwind styling, card flip animation, next/prev buttons, and session counter as vocabulary pages

## Acceptance criteria
- [ ] Clicking the Grammar topic card navigates to `/grammar` and displays the topic name "Grammar" at the top
- [ ] The `/grammar` page shows 10 grammar-focused flashcards using the exact same flip, next/prev, and "Finish Session" behavior as existing topic pages, with front showing the grammar pattern (e.g. "Present Perfect") and back showing explanation plus example sentence

## Done when

Visiting /grammar displays 10 grammar flashcards that can be flipped and navigated exactly like vocabulary topics, with Finish Session appearing after card 10.

## Out of scope
- Marking as done, updating streak/heatmap, database writes, or any new backend tables

## Pull request

Title: `[task-008] Build the /grammar flashcard page`. The description says `Part of issue #9`. Run the app and the tests before you open the PR.
