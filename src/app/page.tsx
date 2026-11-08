import type { ReactElement } from "react";

export default function HomePage(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <h1 className="text-center text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        VocabDaily
      </h1>
      <div
        id="topics"
        className="mt-8 w-full max-w-2xl rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-600"
      >
        Topics will appear here.
      </div>
    </main>
  );
}
