# Tasks: VocabDaily

_Written by the Plan swarm (Swarms `SequentialWorkflow`: Tech Lead, then Cursor Prompt Writer) for issue #4. Cursor builds one task at a time, in this order._

| # | Task | Depends on | Stories | File |
|---|---|---|---|---|
| 001 | Scaffold Next.js app with Supabase client and home page stub | - | - | `tasks/001-scaffold-nextjs-supabase.md` |
| 002 | Database migration – seed topics, words, and RLS policies | 001 | US-1, US-2, US-3, US-4 | `tasks/002-supabase-migration-seed.md` |
| 003 | Topic list and navigation (US-1) | 001, 002 | US-1 | `tasks/003-topic-list-navigation.md` |
| 004 | Flashcard study interface (US-2) | 003 | US-2 | `tasks/004-flashcard-study-interface.md` |
| 005 | Anonymous auth, practice sessions & Mark as Done (US-3) | 002, 004 | US-3 | `tasks/005-anonymous-auth-practice-sessions.md` |
| 006 | Streak, heatmap & progress dashboard (US-4) | 005 | US-4 | `tasks/006-streak-heatmap-progress.md` |
