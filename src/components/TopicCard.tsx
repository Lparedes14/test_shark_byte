import Link from "next/link";
import type { ReactElement } from "react";
import { topicHref, type Topic } from "../../lib/types";

type TopicCardProps = {
  topic: Topic;
};

const TOPIC_ACCENTS: Readonly<Record<string, string>> = {
  Food: "bg-amber-100 text-amber-800",
  Travel: "bg-sky-100 text-sky-800",
  Business: "bg-indigo-100 text-indigo-800",
  Health: "bg-rose-100 text-rose-800",
  Technology: "bg-violet-100 text-violet-800",
  Environment: "bg-emerald-100 text-emerald-800",
  Sports: "bg-orange-100 text-orange-800",
  Education: "bg-cyan-100 text-cyan-800",
};

export default function TopicCard({ topic }: TopicCardProps): ReactElement {
  const accent: string =
    TOPIC_ACCENTS[topic.name] ?? "bg-slate-100 text-slate-800";
  const initial: string = topic.name.trim().charAt(0).toUpperCase();

  return (
    <Link
      href={topicHref(topic)}
      aria-label={`Study ${topic.name}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-semibold ${accent}`}
      >
        {initial}
      </span>
      <span className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {topic.name}
      </span>
      <span className="mt-6 text-sm font-medium text-slate-500 group-hover:text-teal-700">
        Study this topic
      </span>
    </Link>
  );
}
