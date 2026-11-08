-- VocabDaily initial schema.
-- Creates the catalog (topics, words) and per-user practice_sessions,
-- seeds the eight default topics, and locks writes down with RLS.
--
-- Anonymous learners sign in with Supabase anonymous auth. That session
-- uses the authenticated role and auth.uid(), not a shared anon identity.
-- The anon role can only read the public catalog.

-- topics: the eight default learning topics.
create table public.topics (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- words: vocabulary items linked to a topic.
-- optional_example holds the English sentence shown on the card back.
create table public.words (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics (id) on delete cascade,
  english text not null,
  translation text not null,
  optional_example text
);

-- practice_sessions: one learner's completion of a topic.
-- user_id defaults to the signed-in user so client inserts stay inside RLS.
-- date is the server timestamp used later for streaks and the heatmap.
create table public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  topic_id uuid not null references public.topics (id) on delete cascade,
  date timestamp with time zone not null default now(),
  -- Mark as Done is the only write, so a new row counts as completed.
  completed boolean not null default true
);

create index words_topic_id_idx on public.words (topic_id);
create index practice_sessions_user_id_date_idx on public.practice_sessions (user_id, date);
create index practice_sessions_topic_id_idx on public.practice_sessions (topic_id);

alter table public.topics enable row level security;
alter table public.words enable row level security;
alter table public.practice_sessions enable row level security;

-- Catalog tables are public and read-only.
-- There is no insert, update, or delete policy, so anon and authenticated
-- clients cannot change topics or words. Seed data is written by this
-- migration, which runs as the table owner and bypasses RLS.
create policy "topics are publicly readable"
  on public.topics
  for select
  to anon, authenticated
  using (true);

create policy "words are publicly readable"
  on public.words
  for select
  to anon, authenticated
  using (true);

-- Practice rows belong to the signed-in user, including anonymous auth.
-- auth.uid() is null for the anon role, so those policies never match it.
-- WITH CHECK stops a user from inserting or moving a row onto someone else.
create policy "users can read their own practice sessions"
  on public.practice_sessions
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "users can insert their own practice sessions"
  on public.practice_sessions
  for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "users can update their own practice sessions"
  on public.practice_sessions
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "users can delete their own practice sessions"
  on public.practice_sessions
  for delete
  to authenticated
  using (user_id = auth.uid());

-- Privileges match the policies. Default grants in Supabase are broad,
-- so revoke first and then allow only the intended commands.
revoke all on table public.topics from anon, authenticated;
revoke all on table public.words from anon, authenticated;
revoke all on table public.practice_sessions from anon, authenticated;

grant select on table public.topics to anon, authenticated;
grant select on table public.words to anon, authenticated;
grant select, insert, update, delete on table public.practice_sessions to authenticated;

-- Spanish translations for intermediate English learners.
-- Every topic has exactly ten words, and every word has an example sentence.
insert into public.topics (name)
values
  ('Food'),
  ('Travel'),
  ('Business'),
  ('Health'),
  ('Technology'),
  ('Environment'),
  ('Sports'),
  ('Education');

insert into public.words (topic_id, english, translation, optional_example)
select topics.id, seed.english, seed.translation, seed.optional_example
from public.topics
join (
  values
    ('Food', 'appetite', 'apetito', 'She lost her appetite after the long flight.'),
    ('Food', 'cuisine', 'cocina', 'Italian cuisine is famous around the world.'),
    ('Food', 'ingredient', 'ingrediente', 'Flour is the main ingredient in this recipe.'),
    ('Food', 'recipe', 'receta', 'Follow the recipe carefully for the best result.'),
    ('Food', 'portion', 'porción', 'The restaurant serves a generous portion of pasta.'),
    ('Food', 'beverage', 'bebida', 'Water is the healthiest beverage at lunch.'),
    ('Food', 'flavor', 'sabor', 'The soup has a rich, smoky flavor.'),
    ('Food', 'nutritious', 'nutritivo', 'A salad is a nutritious way to start the day.'),
    ('Food', 'garnish', 'adorno', 'The chef added a lemon garnish to the dish.'),
    ('Food', 'leftovers', 'sobras', 'We saved the leftovers for tomorrow''s lunch.'),

    ('Travel', 'itinerary', 'itinerario', 'Our itinerary includes three cities in one week.'),
    ('Travel', 'boarding pass', 'pase de abordar', 'Please show your boarding pass at the gate.'),
    ('Travel', 'customs', 'aduana', 'We waited in line at customs for an hour.'),
    ('Travel', 'destination', 'destino', 'Paris is a popular destination in the spring.'),
    ('Travel', 'accommodation', 'alojamiento', 'We booked affordable accommodation near the station.'),
    ('Travel', 'departure', 'salida', 'The departure time is printed on your ticket.'),
    ('Travel', 'layover', 'escala', 'There is a two-hour layover in Madrid.'),
    ('Travel', 'souvenir', 'recuerdo', 'She bought a souvenir for her sister.'),
    ('Travel', 'currency', 'moneda', 'Check the local currency before you travel.'),
    ('Travel', 'landmark', 'punto de referencia', 'The tower is the city''s most famous landmark.'),

    ('Business', 'deadline', 'fecha límite', 'The report is due before Friday''s deadline.'),
    ('Business', 'negotiate', 'negociar', 'They will negotiate the contract tomorrow.'),
    ('Business', 'revenue', 'ingresos', 'The company''s revenue grew last quarter.'),
    ('Business', 'stakeholder', 'parte interesada', 'Every stakeholder received the meeting notes.'),
    ('Business', 'proposal', 'propuesta', 'She presented a clear proposal to the client.'),
    ('Business', 'invoice', 'factura', 'Please pay the invoice within thirty days.'),
    ('Business', 'colleague', 'colega', 'My colleague reviewed the presentation.'),
    ('Business', 'agenda', 'agenda', 'The agenda lists three topics for the meeting.'),
    ('Business', 'budget', 'presupuesto', 'We stayed within the project budget.'),
    ('Business', 'feedback', 'comentarios', 'The manager gave helpful feedback.'),

    ('Health', 'symptom', 'síntoma', 'A sore throat can be an early symptom of a cold.'),
    ('Health', 'prescription', 'receta médica', 'The doctor wrote a prescription for the medicine.'),
    ('Health', 'appointment', 'cita', 'She made an appointment with her doctor.'),
    ('Health', 'treatment', 'tratamiento', 'Rest is an important part of the treatment.'),
    ('Health', 'nutrition', 'nutrición', 'Good nutrition supports a strong immune system.'),
    ('Health', 'recovery', 'recuperación', 'His recovery took about two weeks.'),
    ('Health', 'prevention', 'prevención', 'Exercise is important for disease prevention.'),
    ('Health', 'diagnosis', 'diagnóstico', 'The diagnosis confirmed a mild infection.'),
    ('Health', 'dosage', 'dosis', 'Read the label for the correct dosage.'),
    ('Health', 'checkup', 'chequeo', 'I schedule a yearly checkup with my doctor.'),

    ('Technology', 'software', 'software', 'The team installed new software on every laptop.'),
    ('Technology', 'password', 'contraseña', 'Choose a password that is hard to guess.'),
    ('Technology', 'update', 'actualización', 'Install the latest update to stay secure.'),
    ('Technology', 'bandwidth', 'ancho de banda', 'Video calls need a lot of bandwidth.'),
    ('Technology', 'encryption', 'cifrado', 'Encryption protects messages while they travel online.'),
    ('Technology', 'browser', 'navegador', 'Open the link in your web browser.'),
    ('Technology', 'backup', 'copia de seguridad', 'Make a backup before you delete the files.'),
    ('Technology', 'interface', 'interfaz', 'The new interface is easier to use.'),
    ('Technology', 'device', 'dispositivo', 'Charge your device before the trip.'),
    ('Technology', 'network', 'red', 'The office network was slow this morning.'),

    ('Environment', 'climate', 'clima', 'Scientists study changes in the climate.'),
    ('Environment', 'pollution', 'contaminación', 'Air pollution is worse in the city center.'),
    ('Environment', 'renewable', 'renovable', 'Solar power is a renewable source of energy.'),
    ('Environment', 'conservation', 'conservación', 'Conservation protects forests and wildlife.'),
    ('Environment', 'emissions', 'emisiones', 'Cars produce emissions that warm the planet.'),
    ('Environment', 'habitat', 'hábitat', 'The wetland is a habitat for many birds.'),
    ('Environment', 'sustainable', 'sostenible', 'The city wants more sustainable transport.'),
    ('Environment', 'recycle', 'reciclar', 'Please recycle paper and glass.'),
    ('Environment', 'drought', 'sequía', 'The drought left the river very low.'),
    ('Environment', 'biodiversity', 'biodiversidad', 'National parks protect biodiversity.'),

    ('Sports', 'tournament', 'torneo', 'The tennis tournament starts on Monday.'),
    ('Sports', 'opponent', 'oponente', 'She respected her opponent after the match.'),
    ('Sports', 'referee', 'árbitro', 'The referee stopped the game.'),
    ('Sports', 'endurance', 'resistencia', 'Long-distance runners need endurance.'),
    ('Sports', 'victory', 'victoria', 'The team''s victory surprised everyone.'),
    ('Sports', 'coach', 'entrenador', 'The coach changed the practice plan.'),
    ('Sports', 'stadium', 'estadio', 'Thousands of fans filled the stadium.'),
    ('Sports', 'score', 'marcador', 'The score was tied at the end of the first half.'),
    ('Sports', 'athlete', 'atleta', 'Every athlete warmed up before the race.'),
    ('Sports', 'championship', 'campeonato', 'They won the championship last year.'),

    ('Education', 'assignment', 'tarea', 'The assignment is due on Thursday.'),
    ('Education', 'lecture', 'clase magistral', 'The lecture covered the history of the language.'),
    ('Education', 'scholarship', 'beca', 'She received a scholarship to study abroad.'),
    ('Education', 'curriculum', 'plan de estudios', 'The curriculum includes science and writing.'),
    ('Education', 'research', 'investigación', 'His research focuses on memory and learning.'),
    ('Education', 'semester', 'semestre', 'The semester ends in December.'),
    ('Education', 'thesis', 'tesis', 'She is writing her thesis this year.'),
    ('Education', 'classmate', 'compañero de clase', 'A classmate shared her notes.'),
    ('Education', 'degree', 'título', 'He earned a degree in education.'),
    ('Education', 'tuition', 'matrícula', 'Tuition is higher at private universities.')
) as seed (topic_name, english, translation, optional_example)
  on topics.name = seed.topic_name;
