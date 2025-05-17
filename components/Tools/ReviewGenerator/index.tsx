"use client";

import { useState } from "react";

export default function ReviewGenerator() {
  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("Plumber");
  const [name, setName] = useState("");
  const [wordCount, setWordCount] = useState(50);
  const [review, setReview] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const languageMap: Record<string, string> = {
    en: "English",
    fr: "French",
    es: "Spanish",
    de: "German",
    hi: "Hindi",
    Bangla: "Bangla",
  };

  const categories = [
    "Plumber",
    "Electrician",
    "Roofer",
    "Locksmith",
    "Garage Door Repair",
    "Cleaning Service",
    "Hair Salon",
    "HVAC",
    "Painter",
    "Appliance Repair",
  ];

  const generateReview = async () => {
    if (!name.trim()) {
      alert("Please enter a name.");
      return;
    }

    const langName = languageMap[language] || "English";
    const prompt = `Write a ${wordCount} words professional customer review for a ${category.toLowerCase()} service provided by ${name}. The review should sound natural and convincing. Respond in ${langName}.`;

    setLoading(true);
    setReview("");

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setReview(data.text);
      setCopied(false);
    } catch (err) {
      console.error("Error generating review:", err);
      alert("Failed to generate review.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(review).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <main className="flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-6 border border-slate-100">
        <h1 className="text-2xl font-bold text-indigo-600 text-center mb-4">
          ⚡ Fast AI Review Generator
        </h1>

        {/* Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Language */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              🌍 Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2"
            >
              {Object.entries(languageMap).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              👤 Business/Person Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ACME Services"
              className="w-full border border-slate-300 rounded-lg p-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              🏷️ Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Word Count */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              🔢 Word Count
            </label>
            <input
              type="number"
              min={10}
              max={300}
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-2"
            />
          </div>
        </div>

        {/* Output */}
        <div>
          <label className="block text-slate-700 font-medium mb-1 mt-4">
            ✍️ Review
          </label>
          <textarea
            className="w-full p-3 border border-emerald-300 bg-emerald-50 rounded-lg resize-none text-base text-emerald-800"
            rows={6}
            readOnly
            value={
              loading
                ? "Generating review..."
                : review || "Your AI-generated review will appear here."
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={generateReview}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            ⚡ {loading ? "Generating..." : "Generate Review"}
          </button>
          {review && (
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
