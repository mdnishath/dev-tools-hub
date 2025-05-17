"use client";

import { useState } from "react";
import { authenticator } from "otplib";

export default function OtpGenaretor() {
  const [secret, setSecret] = useState("");
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSecretChange = (value: string) => {
    const cleaned = value.replace(/\s+/g, "").trim(); // 🧼 remove all spaces
    setSecret(value);
    try {
      const token = authenticator.generate(cleaned);
      setOtp(token);
    } catch {
      setOtp("Invalid Secret Key");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(otp).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleReset = () => {
    setSecret("");
    setOtp("");
    setCopied(false);
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-8 border border-slate-100">
        <div className="space-y-3">
          <label className="block text-left text-slate-700 font-medium">
            🔐 Secret Key
          </label>
          <textarea
            className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-900"
            rows={3}
            placeholder="Paste your secret key here"
            value={secret}
            onChange={(e) => handleSecretChange(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <label className="block text-left text-slate-700 font-medium">
            🧾 OTP Code
          </label>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <textarea
              className="w-full sm:flex-1 p-3 border border-emerald-300 bg-emerald-50 rounded-lg resize-none text-lg font-mono text-emerald-800"
              rows={2}
              readOnly
              value={otp || "Your OTP will appear here"}
            />
            <div className="flex gap-2">
              {otp && (
                <button
                  onClick={copyToClipboard}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              )}
              {(secret || otp) && (
                <button
                  onClick={handleReset}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
                >
                  🔄 Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
