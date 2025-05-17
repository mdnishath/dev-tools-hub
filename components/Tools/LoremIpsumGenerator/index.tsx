"use client";

import { useState } from "react";

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(2);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

  const generate = () => {
    const result = Array.from({ length: paragraphs }, () => lorem).join("\n\n");
    setOutput(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-6 border border-slate-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <label className="text-slate-700 font-medium">Paragraphs:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={paragraphs}
            onChange={(e) => setParagraphs(Number(e.target.value))}
            className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-center focus:ring-indigo-400 focus:outline-none"
          />
          <button onClick={generate} className="btn-case">
            🌀 Generate
          </button>
        </div>

        <textarea
          readOnly
          value={output}
          rows={10}
          className="w-full p-4 border border-slate-300 rounded-lg resize-none text-slate-700"
          placeholder="Your lorem ipsum text will appear here..."
        />

        <div className="text-right">
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>
      </div>
    </main>
  );
}
