# Acceptance criteria: VocabDaily

QA Tester checks each item on the preview, like a real user, and reports pass or fail on the PR.

## US-1

**As a** learner, **I want** to browse and select a vocabulary topic, **so that** I can focus my daily practice on a subject I need.

- [ ] A list of at least 6 predefined topics (Food, Travel, Business, etc.) is shown on the home screen
- [ ] Clicking a topic card loads the flashcard screen for that topic
- [ ] The selected topic name is displayed at the top of the flashcard view

## US-2

**As a** learner, **I want** to study flashcards with the selected topic's vocabulary, **so that** I can learn the words and their meanings.

- [ ] Each flashcard shows the English word on the front and the translation/definition on the back
- [ ] I can flip the card by clicking it
- [ ] I can navigate to the next or previous card using simple buttons
- [ ] After viewing 10 cards, a 'Finish Session' button appears

## US-3

**As a** learner, **I want** to mark a topic as practiced for today, **so that** my daily progress is recorded.

- [ ] After finishing a session, I can click 'Mark as Done Today'
- [ ] The topic shows a visual indicator (checkmark or green badge) that it was completed today
- [ ] The home screen displays a daily streak counter that increases when a topic is marked done

## US-4

**As a** learner, **I want** to see my recent daily progress, **so that** I can stay motivated.

- [ ] A progress dashboard shows the last 7 days with colored squares indicating which days I practiced
- [ ] The dashboard displays the current streak number
- [ ] Completed topics for the current day are listed with their names
