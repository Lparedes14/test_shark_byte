import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { fetchTopics } from "../../../lib/supabase";
import { findTopicBySlug, type Topic } from "../../../lib/types";

export const dynamic = "force-dynamic";

type TopicPageProps = {
  params: {
    topic: string;
  };
};

async function loadTopic(slug: string): Promise<Topic | undefined> {
  const topics: Topic[] = await fetchTopics();
  return findTopicBySlug(topics, slug);
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const topic: Topic | undefined = await loadTopic(params.topic);
  if (!topic) {
    return { title: "Topic not found · VocabDaily" };
  }
  return {
    title: `${topic.name} · VocabDaily`,
    description: `Daily vocabulary practice for ${topic.name}.`,
  };
}

export default async function TopicPage({
  params,
}: TopicPageProps): Promise<ReactElement> {
  const topic: Topic | undefined = await loadTopic(params.topic);
  if (!topic) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <Link
          href="/"
          className="w-fit rounded-md text-sm font-medium text-teal-700 hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          ← All topics
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-teal-700">
          Flashcards
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {topic.name}
        </h1>
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-600 shadow-sm">
          Flashcards for {topic.name} will appear here.
        </div>
      </div>
    </main>
  );
}
