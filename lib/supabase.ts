import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Topic, Word } from "./types";

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

const WORDS_PER_SESSION: number = 10;

type SeedWord = readonly [english: string, translation: string, example: string];

// Same ten words per topic as supabase/migrations. Used when Supabase is
// not configured, or when the words query cannot return a full session.
const SEEDED_WORDS: Readonly<Record<string, readonly SeedWord[]>> = {
  food: [
    ["appetite", "apetito", "She lost her appetite after the long flight."],
    ["cuisine", "cocina", "Italian cuisine is famous around the world."],
    ["ingredient", "ingrediente", "Flour is the main ingredient in this recipe."],
    ["recipe", "receta", "Follow the recipe carefully for the best result."],
    ["portion", "porción", "The restaurant serves a generous portion of pasta."],
    ["beverage", "bebida", "Water is the healthiest beverage at lunch."],
    ["flavor", "sabor", "The soup has a rich, smoky flavor."],
    ["nutritious", "nutritivo", "A salad is a nutritious way to start the day."],
    ["garnish", "adorno", "The chef added a lemon garnish to the dish."],
    ["leftovers", "sobras", "We saved the leftovers for tomorrow's lunch."],
  ],
  travel: [
    ["itinerary", "itinerario", "Our itinerary includes three cities in one week."],
    ["boarding pass", "pase de abordar", "Please show your boarding pass at the gate."],
    ["customs", "aduana", "We waited in line at customs for an hour."],
    ["destination", "destino", "Paris is a popular destination in the spring."],
    ["accommodation", "alojamiento", "We booked affordable accommodation near the station."],
    ["departure", "salida", "The departure time is printed on your ticket."],
    ["layover", "escala", "There is a two-hour layover in Madrid."],
    ["souvenir", "recuerdo", "She bought a souvenir for her sister."],
    ["currency", "moneda", "Check the local currency before you travel."],
    ["landmark", "punto de referencia", "The tower is the city's most famous landmark."],
  ],
  business: [
    ["deadline", "fecha límite", "The report is due before Friday's deadline."],
    ["negotiate", "negociar", "They will negotiate the contract tomorrow."],
    ["revenue", "ingresos", "The company's revenue grew last quarter."],
    ["stakeholder", "parte interesada", "Every stakeholder received the meeting notes."],
    ["proposal", "propuesta", "She presented a clear proposal to the client."],
    ["invoice", "factura", "Please pay the invoice within thirty days."],
    ["colleague", "colega", "My colleague reviewed the presentation."],
    ["agenda", "agenda", "The agenda lists three topics for the meeting."],
    ["budget", "presupuesto", "We stayed within the project budget."],
    ["feedback", "comentarios", "The manager gave helpful feedback."],
  ],
  health: [
    ["symptom", "síntoma", "A sore throat can be an early symptom of a cold."],
    ["prescription", "receta médica", "The doctor wrote a prescription for the medicine."],
    ["appointment", "cita", "She made an appointment with her doctor."],
    ["treatment", "tratamiento", "Rest is an important part of the treatment."],
    ["nutrition", "nutrición", "Good nutrition supports a strong immune system."],
    ["recovery", "recuperación", "His recovery took about two weeks."],
    ["prevention", "prevención", "Exercise is important for disease prevention."],
    ["diagnosis", "diagnóstico", "The diagnosis confirmed a mild infection."],
    ["dosage", "dosis", "Read the label for the correct dosage."],
    ["checkup", "chequeo", "I schedule a yearly checkup with my doctor."],
  ],
  technology: [
    ["software", "software", "The team installed new software on every laptop."],
    ["password", "contraseña", "Choose a password that is hard to guess."],
    ["update", "actualización", "Install the latest update to stay secure."],
    ["bandwidth", "ancho de banda", "Video calls need a lot of bandwidth."],
    ["encryption", "cifrado", "Encryption protects messages while they travel online."],
    ["browser", "navegador", "Open the link in your web browser."],
    ["backup", "copia de seguridad", "Make a backup before you delete the files."],
    ["interface", "interfaz", "The new interface is easier to use."],
    ["device", "dispositivo", "Charge your device before the trip."],
    ["network", "red", "The office network was slow this morning."],
  ],
  environment: [
    ["climate", "clima", "Scientists study changes in the climate."],
    ["pollution", "contaminación", "Air pollution is worse in the city center."],
    ["renewable", "renovable", "Solar power is a renewable source of energy."],
    ["conservation", "conservación", "Conservation protects forests and wildlife."],
    ["emissions", "emisiones", "Cars produce emissions that warm the planet."],
    ["habitat", "hábitat", "The wetland is a habitat for many birds."],
    ["sustainable", "sostenible", "The city wants more sustainable transport."],
    ["recycle", "reciclar", "Please recycle paper and glass."],
    ["drought", "sequía", "The drought left the river very low."],
    ["biodiversity", "biodiversidad", "National parks protect biodiversity."],
  ],
  sports: [
    ["tournament", "torneo", "The tennis tournament starts on Monday."],
    ["opponent", "oponente", "She respected her opponent after the match."],
    ["referee", "árbitro", "The referee stopped the game."],
    ["endurance", "resistencia", "Long-distance runners need endurance."],
    ["victory", "victoria", "The team's victory surprised everyone."],
    ["coach", "entrenador", "The coach changed the practice plan."],
    ["stadium", "estadio", "Thousands of fans filled the stadium."],
    ["score", "marcador", "The score was tied at the end of the first half."],
    ["athlete", "atleta", "Every athlete warmed up before the race."],
    ["championship", "campeonato", "They won the championship last year."],
  ],
  education: [
    ["assignment", "tarea", "The assignment is due on Thursday."],
    ["lecture", "clase magistral", "The lecture covered the history of the language."],
    ["scholarship", "beca", "She received a scholarship to study abroad."],
    ["curriculum", "plan de estudios", "The curriculum includes science and writing."],
    ["research", "investigación", "His research focuses on memory and learning."],
    ["semester", "semestre", "The semester ends in December."],
    ["thesis", "tesis", "She is writing her thesis this year."],
    ["classmate", "compañero de clase", "A classmate shared her notes."],
    ["degree", "título", "He earned a degree in education."],
    ["tuition", "matrícula", "Tuition is higher at private universities."],
  ],
};

type WordRow = {
  id: string;
  topic_id: string;
  english: string;
  translation: string;
  optional_example: string | null;
};

function isSeededTopicId(topicId: string): boolean {
  return Object.prototype.hasOwnProperty.call(SEEDED_WORDS, topicId);
}

function seededWords(topicId: string): Word[] {
  const seed: readonly SeedWord[] | undefined = SEEDED_WORDS[topicId];
  if (!seed) {
    return [];
  }
  return seed.slice(0, WORDS_PER_SESSION).map((word, index) => ({
    id: `${topicId}-${index + 1}`,
    topic_id: topicId,
    english: word[0],
    translation: word[1],
    optional_example: word[2],
  }));
}

function isWordRow(value: unknown): value is WordRow {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const row: {
    id?: unknown;
    topic_id?: unknown;
    english?: unknown;
    translation?: unknown;
    optional_example?: unknown;
  } = value as {
    id?: unknown;
    topic_id?: unknown;
    english?: unknown;
    translation?: unknown;
    optional_example?: unknown;
  };
  const exampleIsValid: boolean =
    row.optional_example === null || typeof row.optional_example === "string";
  return (
    typeof row.id === "string" &&
    row.id.length > 0 &&
    typeof row.topic_id === "string" &&
    row.topic_id.length > 0 &&
    typeof row.english === "string" &&
    row.english.trim().length > 0 &&
    typeof row.translation === "string" &&
    row.translation.trim().length > 0 &&
    exampleIsValid
  );
}

function toWord(row: WordRow): Word {
  const example: string | null =
    row.optional_example === null ? null : row.optional_example.trim();
  return {
    id: row.id,
    topic_id: row.topic_id,
    english: row.english.trim(),
    translation: row.translation.trim(),
    optional_example: example && example.length > 0 ? example : null,
  };
}

async function queryWordsByTopic(topicId: string): Promise<Word[] | null> {
  try {
    const { data, error } = await supabase
      .from("words")
      .select("id, topic_id, english, translation, optional_example")
      .eq("topic_id", topicId)
      .order("english", { ascending: true })
      .limit(WORDS_PER_SESSION)
      .abortSignal(AbortSignal.timeout(8000));

    if (error) {
      console.error("fetchWordsByTopic failed:", error.message);
      return null;
    }

    const payload: unknown = data;
    if (!Array.isArray(payload)) {
      return [];
    }
    return payload.filter(isWordRow).map(toWord);
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : "Unknown error";
    console.error("fetchWordsByTopic failed:", message);
    return null;
  }
}

async function resolveSeededTopicId(
  topicId: string,
): Promise<string | undefined> {
  if (isSeededTopicId(topicId)) {
    return topicId;
  }

  const topics: Topic[] = await fetchTopics();
  const topic: Topic | undefined = topics.find((item) => item.id === topicId);
  if (!topic) {
    return undefined;
  }

  const match: Topic | undefined = SEEDED_TOPICS.find(
    (item) => item.name.toLowerCase() === topic.name.toLowerCase(),
  );
  return match?.id;
}

export async function fetchWordsByTopic(topicId: string): Promise<Word[]> {
  const trimmedId: string = topicId.trim();
  if (trimmedId.length === 0) {
    return [];
  }

  if (hasSupabaseConfig() && !isSeededTopicId(trimmedId)) {
    const fromDatabase: Word[] | null = await queryWordsByTopic(trimmedId);
    if (fromDatabase && fromDatabase.length >= WORDS_PER_SESSION) {
      return fromDatabase.slice(0, WORDS_PER_SESSION);
    }
  }

  const seededId: string | undefined = await resolveSeededTopicId(trimmedId);
  if (!seededId) {
    return [];
  }
  return seededWords(seededId);
}
