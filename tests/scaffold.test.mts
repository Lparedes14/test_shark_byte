import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const pageSource: string = readFileSync(
  new URL("../src/app/page.tsx", import.meta.url),
  "utf8",
);
const supabaseSource: string = readFileSync(
  new URL("../lib/supabase.ts", import.meta.url),
  "utf8",
);
const envExample: string = readFileSync(
  new URL("../.env.example", import.meta.url),
  "utf8",
);

test("home page centers a VocabDaily heading and a topics placeholder", () => {
  assert.match(pageSource, /<h1[^>]*>\s*VocabDaily\s*<\/h1>/);
  assert.match(pageSource, /Topics will appear here\./);
  assert.match(pageSource, /items-center/);
  assert.match(pageSource, /justify-center/);
  assert.match(pageSource, /id="topics"/);
});

test("supabase client is created from the public env var names", async () => {
  assert.match(supabaseSource, /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(supabaseSource, /NEXT_PUBLIC_SUPABASE_ANON_KEY/);
  assert.match(supabaseSource, /createClient/);
  assert.match(envExample, /^NEXT_PUBLIC_SUPABASE_URL=$/m);
  assert.match(envExample, /^NEXT_PUBLIC_SUPABASE_ANON_KEY=$/m);
  assert.doesNotMatch(envExample, /https?:\/\//);
  assert.doesNotMatch(envExample, /eyJ/);

  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "public-anon-key";

  const clientModule: { supabase: { from: (table: string) => unknown } } =
    await import("../lib/supabase.ts");

  assert.equal(typeof clientModule.supabase.from, "function");
});
