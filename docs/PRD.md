# PRD: VocabDaily

_Written by the Deep Dive swarm (Swarms `HierarchicalSwarm`: Product Owner, Product Manager and UX Researcher, coordinated by a director) for issue #4._

## Problem

English learners struggle to build and retain topic-specific vocabulary because they lack a simple, consistent daily practice tool that combines focused flashcards with visible daily progress tracking.

## Users
- Adult intermediate English learner who wants to improve vocabulary on specific topics like travel, business, or food

## Goals
- Enable learners to practice 10-20 topic-specific words per day via flashcards
- Provide simple daily streak and progress visibility
- Make it easy to select a topic and mark daily completion

## User stories

### US-1

**As a** learner, **I want** to browse and select a vocabulary topic, **so that** I can focus my daily practice on a subject I need.

Acceptance criteria:
- [ ] A list of at least 6 predefined topics (Food, Travel, Business, etc.) is shown on the home screen
- [ ] Clicking a topic card loads the flashcard screen for that topic
- [ ] The selected topic name is displayed at the top of the flashcard view

### US-2

**As a** learner, **I want** to study flashcards with the selected topic's vocabulary, **so that** I can learn the words and their meanings.

Acceptance criteria:
- [ ] Each flashcard shows the English word on the front and the translation/definition on the back
- [ ] I can flip the card by clicking it
- [ ] I can navigate to the next or previous card using simple buttons
- [ ] After viewing 10 cards, a 'Finish Session' button appears

### US-3

**As a** learner, **I want** to mark a topic as practiced for today, **so that** my daily progress is recorded.

Acceptance criteria:
- [ ] After finishing a session, I can click 'Mark as Done Today'
- [ ] The topic shows a visual indicator (checkmark or green badge) that it was completed today
- [ ] The home screen displays a daily streak counter that increases when a topic is marked done

### US-4

**As a** learner, **I want** to see my recent daily progress, **so that** I can stay motivated.

Acceptance criteria:
- [ ] A progress dashboard shows the last 7 days with colored squares indicating which days I practiced
- [ ] The dashboard displays the current streak number
- [ ] Completed topics for the current day are listed with their names

## Out of scope
- User accounts and login
- Spaced repetition algorithm
- Adding custom words or topics
- Audio pronunciation
- Mobile app version (web only for MVP)

## Success metrics
- At least 60% of daily active users complete at least one topic session per day
- Average of 4+ days of streak within first two weeks for new users
- 70% of users return to the app on at least 3 different days in their first week

## Open questions
- How many words should be included per topic in the MVP?
- Should we include example sentences on the back of each card?
- What is the exact list of default topics we should start with?
- Should progress be stored only locally or do we need a simple backend from day one?
