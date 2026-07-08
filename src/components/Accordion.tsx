"use client";

import { useState } from "react";

export default function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className="text-sm font-semibold text-navy">{item.question}</span>
              <span className={`shrink-0 text-lg text-cyan transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
