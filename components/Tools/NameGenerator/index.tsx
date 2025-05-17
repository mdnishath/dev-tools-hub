"use client";

import names from "@/app/_data/names.json";
import { useState } from "react";

// 👇 Define specific union types
type Country = "USA" | "UK" | "France";
type Gender = "Male" | "Female";

// ✅ Optional: declare type for a single name entry
type NameEntry = { first: string; last: string };

export default function NameGenerator() {
  const [country, setCountry] = useState<Country>("USA");
  const [gender, setGender] = useState<Gender>("Male");
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const generateName = () => {
    const list = names[country][gender] as NameEntry[];
    const { first, last } = list[Math.floor(Math.random() * list.length)];
    const fullName = `${first} ${last}`;
    setName(fullName);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-6 border border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              🌍 Country
            </label>
            <select
              className="w-full border border-slate-300 rounded-lg p-2"
              value={country}
              onChange={(e) => setCountry(e.target.value as Country)}
            >
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="France">France</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              🚻 Gender
            </label>
            <select
              className="w-full border border-slate-300 rounded-lg p-2"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-left text-slate-700 font-medium">
            🧾 Generated Name
          </label>
          <textarea
            className="w-full p-3 border border-emerald-300 bg-emerald-50 rounded-lg resize-none text-lg font-mono text-emerald-800"
            rows={2}
            readOnly
            value={name || "Your random name will appear here"}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={generateName}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            🎲 Generate
          </button>
          {name && (
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
