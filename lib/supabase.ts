import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Topic } from "./types";

const supabaseUrl: string | undefined = readEnv(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
);
const supabaseAnonKey: string | undefined = readEnv(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Same eight topics seeded in supabase/migrations. Used when the project
// has no Supabase env vars yet, or when the topics query cannot be reached.
const SEEDED_TOPICS: readonly Topic[] = [
  { id: "food", name: "Food" },
  { id: "travel", name: "Travel" },
  { id: "business", name: "Business" },
  { id: "health", name: "Health" },
  { id: "technology", name: "Technology" },
  { id: "environment", name: "Environment" },
  { id: "sports", name: "Sports" },
  { id: "education", name: "Education" },
];

function readEnv(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  const trimmed: string = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function createSupabaseClient(): SupabaseClient {
  return createClient(
    supabaseUrl ?? "https://placeholder.supabase.co",
    supabaseAnonKey ?? "public-anon-key",
  );
}

export const supabase: SupabaseClient = createSupabaseClient();

type TopicRow = {
  id: string;
  name: string;
};

function hasSupabaseConfig(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function seededTopics(): Topic[] {
  return SEEDED_TOPICS.map((topic) => ({
    id: topic.id,
    name: topic.name,
  }));
}

function isTopicRow(value: unknown): value is TopicRow {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const row: { id?: unknown; name?: unknown } = value as {
    id?: unknown;
    name?: unknown;
  };
  return (
    typeof row.id === "string" &&
    row.id.length > 0 &&
    typeof row.name === "string" &&
    row.name.trim().length > 0
  );
}

function sortTopics(topics: readonly Topic[]): Topic[] {
  const order: ReadonlyMap<string, number> = new Map(
    SEEDED_TOPICS.map((topic, index) => [topic.name, index]),
  );
  return [...topics].sort((left, right) => {
    const leftRank: number = order.get(left.name) ?? SEEDED_TOPICS.length;
    const rightRank: number = order.get(right.name) ?? SEEDED_TOPICS.length;
    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    return left.name.localeCompare(right.name);
  });
}

export async function fetchTopics(): Promise<Topic[]> {
  if (!hasSupabaseConfig()) {
    return seededTopics();
  }

  try {
    const { data, error } = await supabase
      .from("topics")
      .select("id, name")
      .order("name", { ascending: true })
      .abortSignal(AbortSignal.timeout(8000));

    if (error) {
      console.error("fetchTopics failed, using seeded topics:", error.message);
      return seededTopics();
    }

    const payload: unknown = data;
    const rows: TopicRow[] = Array.isArray(payload)
      ? payload.filter(isTopicRow)
      : [];
    return sortTopics(
      rows.map((row) => ({
        id: row.id,
        name: row.name.trim(),
      })),
    );
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : "Unknown error";
    console.error("fetchTopics failed, using seeded topics:", message);
    return seededTopics();
  }
}
