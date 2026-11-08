import type { ReactElement } from "react";
import TopicCard from "../components/TopicCard";
import { fetchTopics } from "../../lib/supabase";
import type { Topic } from "../../lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage(): Promise<ReactElement> {
  const topics: Topic[] = await fetchTopics();

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <header className="flex max-w-2xl flex-col items-center justify-center text-center">
          <h1 className="text-center text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            VocabDaily
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Choose a topic and practice the words you need today.
          </p>
        </header>
        <section
          id="topics"
          aria-label="Vocabulary topics"
          className="mt-10 w-full"
        >
          {topics.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-600">
              Topics will appear here.
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topics.map((topic) => (
                <li key={topic.id} className="h-full">
                  <TopicCard topic={topic} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
