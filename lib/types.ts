export interface Topic {
  id: string;
  name: string;
}

export interface Word {
  id: string;
  topic_id: string;
  english: string;
  translation: string;
  optional_example: string | null;
}

export function topicHref(topic: Topic): string {
  return `/${toTopicSlug(topic.name)}`;
}

export function toTopicSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findTopicBySlug(
  topics: readonly Topic[],
  slug: string,
): Topic | undefined {
  let normalized: string = slug;
  try {
    normalized = decodeURIComponent(slug);
  } catch {
    normalized = slug;
  }
  const needle: string = normalized.trim().toLowerCase();
  return topics.find((topic) => toTopicSlug(topic.name) === needle);
}
