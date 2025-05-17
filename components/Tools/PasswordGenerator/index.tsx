"use client";

import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 border border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <label className="text-slate-700 font-medium">Length:</label>
          <input
            type="number"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-center focus:ring-indigo-400 focus:outline-none"
          />
          <button onClick={generate} className="btn-case">
            🔐 Generate
          </button>
        </div>

        <textarea
          readOnly
          value={password}
          rows={3}
          className="w-full p-4 border border-slate-300 rounded-lg resize-none text-slate-700 font-mono text-lg"
          placeholder="Your password will appear here..."
        />

        <div className="text-right">
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>
      </div>
    </main>
  );
}
