"use client";

import { useState } from "react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () =>
    setText(
      text.replace(
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
    );
  const toCamelCase = () =>
    setText(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    );
  const toSnakeCase = () =>
    setText(text.trim().toLowerCase().replace(/\s+/g, "_"));

  const reset = () => {
    setText("");
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-6 border border-slate-100">
        <textarea
          className="w-full p-4 border border-slate-300 rounded-lg resize-none h-40 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button onClick={toUpperCase} className="btn-case">
            UPPERCASE
          </button>
          <button onClick={toLowerCase} className="btn-case">
            lowercase
          </button>
          <button onClick={toTitleCase} className="btn-case">
            Title Case
          </button>
          <button onClick={toCamelCase} className="btn-case">
            camelCase
          </button>
          <button onClick={toSnakeCase} className="btn-case">
            snake_case
          </button>
          <button
            onClick={reset}
            className="btn-case bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            🔄 Reset
          </button>
        </div>

        <div className="text-right">
          <button
            onClick={copyToClipboard}
            disabled={!text}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>
      </div>
    </main>
  );
}
