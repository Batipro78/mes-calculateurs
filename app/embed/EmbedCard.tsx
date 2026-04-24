"use client";

import { useState } from "react";
import type { EmbedDef } from "./embeds";

const BASE_URL = "https://mes-calculateurs.vercel.app";

export default function EmbedCard({ embed }: { embed: EmbedDef }) {
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState(embed.defaultHeight);

  const snippet = `<iframe src="${BASE_URL}/embed/${embed.slug}" width="${width}" height="${height}" frameborder="0" style="border:0;max-width:100%;" loading="lazy" title="${embed.title}"></iframe>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback pour HTTP ou navigateurs anciens
      const el = document.createElement("textarea");
      el.value = snippet;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header color */}
      <div className={`bg-gradient-to-br ${embed.color} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-4xl mb-2">{embed.emoji}</div>
            <h3 className="text-xl font-bold">{embed.title}</h3>
            <p className="text-white/80 text-sm mt-1">{embed.description}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-5 border-b border-slate-100">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Largeur</label>
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Hauteur (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || embed.defaultHeight)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-slate-400"
            />
          </div>
        </div>

        <div className="relative">
          <pre className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 overflow-x-auto">
            <code>{snippet}</code>
          </pre>
          <button
            onClick={copy}
            className={`absolute top-2 right-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {copied ? "Copie !" : "Copier"}
          </button>
        </div>
      </div>

      {/* Preview link */}
      <div className="p-4 bg-slate-50 flex items-center justify-between text-sm">
        <a
          href={`/embed/${embed.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-slate-900 font-medium"
        >
          Apercu en pleine page &rarr;
        </a>
        <a
          href={embed.sourcePath}
          className="text-slate-500 hover:text-slate-700 text-xs"
        >
          Voir le calculateur complet
        </a>
      </div>
    </div>
  );
}
