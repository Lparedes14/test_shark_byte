"use client";

import { useState, type KeyboardEvent, type ReactElement } from "react";
import type { Word } from "../../lib/types";

type FlashcardProps = {
  word: Word;
};

export default function Flashcard({ word }: FlashcardProps): ReactElement {
  const [flipped, setFlipped] = useState<boolean>(false);
  const example: string = word.optional_example?.trim() ?? "";

  function toggle(): void {
    setFlipped((current) => !current);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  }

  return (
    <div className="[perspective:1200px]">
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={onKeyDown}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Show the English word ${word.english}`
            : `Flip card to see the translation of ${word.english}`
        }
        data-card-face={flipped ? "back" : "front"}
        className="w-full cursor-pointer rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
      >
        <div
          className="relative h-80 w-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d] motion-reduce:transition-none sm:h-96"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div
            aria-hidden={flipped}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm [backface-visibility:hidden]"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              English
            </p>
            <p className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {word.english}
            </p>
            <p className="mt-8 text-sm text-slate-500">Click the card to flip</p>
          </div>
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-teal-800 bg-teal-800 px-8 py-10 text-center text-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-100">
              Translation
            </p>
            <p className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {word.translation}
            </p>
            {example.length > 0 ? (
              <div className="mt-8 max-w-md">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-100">
                  Example
                </p>
                <p className="mt-2 text-base leading-relaxed text-teal-50">
                  {example}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
