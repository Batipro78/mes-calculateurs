"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_CALCULATORS, type Calculator } from "../lib/calculators-list";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const NORMALIZED = ALL_CALCULATORS.map((c) => ({
  calc: c,
  haystack: normalize(c.title + " " + c.slug),
}));

function search(query: string, max = 8): Calculator[] {
  const q = normalize(query);
  if (!q) return [];
  const tokens = q.split(" ").filter(Boolean);

  const scored: { calc: Calculator; score: number }[] = [];
  for (const { calc, haystack } of NORMALIZED) {
    let score = 0;
    let allMatch = true;
    for (const t of tokens) {
      const idx = haystack.indexOf(t);
      if (idx === -1) {
        allMatch = false;
        break;
      }
      score += idx === 0 ? 10 : 5;
      if (haystack.includes(" " + t)) score += 3;
    }
    if (allMatch) scored.push({ calc, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, max).map((s) => s.calc);
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    window.location.href = href;
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[activeIndex];
      if (pick) go(pick.slug);
    }
  }

  const showDropdown = open && query.length > 0;
  const hasResults = results.length > 0;

  return (
    <div ref={containerRef} className="relative w-full sm:max-w-xs">
      <div className="relative">
        <svg
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="search-results-list"
          placeholder="Rechercher un calculateur..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>

      {showDropdown && (
        <div
          id="search-results-list"
          role="listbox"
          className="absolute left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto"
        >
          {hasResults ? (
            results.map((calc, i) => (
              <a
                key={calc.slug}
                href={calc.slug}
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={(e) => {
                  e.preventDefault();
                  go(calc.slug);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  i === activeIndex ? "bg-blue-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <span
                  className={`w-8 h-8 bg-gradient-to-br ${calc.color} rounded-lg flex items-center justify-center text-base shadow-sm shrink-0`}
                >
                  {calc.emoji}
                </span>
                <span className="font-medium text-slate-700 truncate">
                  {calc.title}
                </span>
              </a>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-sm text-slate-500">
              Aucun calculateur trouve pour &laquo;&nbsp;{query}&nbsp;&raquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
