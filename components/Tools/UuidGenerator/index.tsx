"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState(uuidv4());
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    setUuid(uuidv4());
    setCopied(false);
  };

  const copyUUID = () => {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-8 border border-slate-100">
        <div className="space-y-3">
          <label className="block text-left text-slate-700 font-medium">
            🆔 Generated UUID
          </label>
          <textarea
            className="w-full p-3 border border-emerald-300 bg-emerald-50 rounded-lg resize-none text-lg font-mono text-emerald-800"
            rows={2}
            readOnly
            value={uuid}
          />
        </div>

        <div className="flex gap-2 justify-start">
          <button
            onClick={generateUUID}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            🔁 Generate
          </button>
          <button
            onClick={copyUUID}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>
      </div>
    </main>
  );
}
