"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState, type ReactElement } from "react";
import Flashcard from "../../components/Flashcard";
import { fetchTopics, fetchWordsByTopic } from "../../../lib/supabase";
import { findTopicBySlug, type Topic, type Word } from "../../../lib/types";

const TENTH_CARD_INDEX: number = 9;

type TopicPageProps = {
  params: {
    topic: string;
  };
};

type LoadState =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "empty"; topic: Topic }
  | { status: "ready"; topic: Topic; words: Word[] };

function titleFromSlug(slug: string): string {
  let decoded: string = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }
  const parts: string[] = decoded
    .trim()
    .split("-")
    .filter((part) => part.length > 0);
  if (parts.length === 0) {
    return "Topic";
  }
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default function TopicPage({ params }: TopicPageProps): ReactElement {
  const [index, setIndex] = useState<number>(0);
  const [viewedTenth, setViewedTenth] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled: boolean = false;
    setLoadState({ status: "loading" });
    setIndex(0);
    setViewedTenth(false);
    setFinished(false);

    async function load(): Promise<void> {
      const topics: Topic[] = await fetchTopics();
      const topic: Topic | undefined = findTopicBySlug(topics, params.topic);
      if (!topic) {
        if (!cancelled) {
          setLoadState({ status: "missing" });
        }
        return;
      }

      const words: Word[] = await fetchWordsByTopic(topic.id);
      if (cancelled) {
        return;
      }
      if (words.length === 0) {
        setLoadState({ status: "empty", topic });
        return;
      }
      setLoadState({ status: "ready", topic, words });
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [params.topic]);

  useEffect(() => {
    if (loadState.status === "ready" || loadState.status === "empty") {
      document.title = `${loadState.topic.name} · VocabDaily`;
    }
  }, [loadState]);

  if (loadState.status === "missing") {
    notFound();
  }

  const topicName: string =
    loadState.status === "ready" || loadState.status === "empty"
      ? loadState.topic.name
      : titleFromSlug(params.topic);

  function showCard(nextIndex: number): void {
    if (loadState.status !== "ready") {
      return;
    }
    const lastIndex: number = loadState.words.length - 1;
    const bounded: number = Math.min(Math.max(nextIndex, 0), lastIndex);
    setIndex(bounded);
    if (bounded >= TENTH_CARD_INDEX) {
      setViewedTenth(true);
    }
  }

  const words: Word[] = loadState.status === "ready" ? loadState.words : [];
  const currentWord: Word | undefined = words[index];
  const cardNumber: number = words.length === 0 ? 0 : index + 1;
  const showFinish: boolean = viewedTenth && words.length > TENTH_CARD_INDEX;
  const atFirst: boolean = index <= 0;
  const atLast: boolean = words.length === 0 || index >= words.length - 1;

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
          {topicName}
        </h1>

        {loadState.status === "empty" ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-600 shadow-sm">
            No vocabulary is available for {topicName} yet.
          </div>
        ) : null}

        {loadState.status === "loading" ? (
          <div className="mt-8 h-80 animate-pulse rounded-2xl bg-slate-200 sm:h-96" />
        ) : null}

        {loadState.status === "ready" && currentWord ? (
          <div className="mt-8">
            <p
              className="text-sm font-medium text-slate-600"
              aria-live="polite"
            >
              <span className="sr-only">Card </span>
              {cardNumber} of {words.length}
            </p>
            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-label="Study progress"
              aria-valuemin={1}
              aria-valuemax={words.length}
              aria-valuenow={cardNumber}
            >
              <div
                className="h-full rounded-full bg-teal-600 transition-all duration-300"
                style={{ width: `${(cardNumber / words.length) * 100}%` }}
              />
            </div>

            <div className="mt-6">
              <Flashcard key={currentWord.id} word={currentWord} />
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => showCard(index - 1)}
                disabled={atFirst}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-teal-600 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-800"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => showCard(index + 1)}
                disabled={atLast}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-teal-600 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-800"
              >
                Next
              </button>
            </div>

            {showFinish ? (
              <div className="mt-6 flex flex-col items-stretch gap-3">
                <button
                  type="button"
                  onClick={() => setFinished(true)}
                  aria-pressed={finished}
                  className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                  Finish Session
                </button>
                {finished ? (
                  <p role="status" className="text-center text-sm text-slate-600">
                    You finished this session.
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </main>
  );
}
