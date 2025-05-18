"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { authenticator } from "otplib";

export default function OtpGenaretor() {
  const [secret, setSecret] = useState("");
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [pendingCopy, setPendingCopy] = useState("");
  const hiddenRef = useRef<HTMLTextAreaElement>(null);

  const cleanSecret = secret.replace(/\s+/g, "").trim();

  const tryCopy = (token: string) => {
    navigator.clipboard
      .writeText(token)
      .then(() => {
        setCopied(true);
        setPendingCopy("");
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        // Fallback method
        if (hiddenRef.current) {
          hiddenRef.current.value = token;
          hiddenRef.current.select();
          try {
            const success = document.execCommand("copy");
            if (success) {
              setCopied(true);
              setPendingCopy("");
              setTimeout(() => setCopied(false), 1500);
              return;
            }
          } catch {
            // still failed
          }
        }
        setPendingCopy(token); // 📌 retry on focus
      });
  };

  const generateOtp = useCallback(() => {
    try {
      const token = authenticator.generate(cleanSecret);
      setOtp(token);
      tryCopy(token);
    } catch {
      setOtp("Invalid Secret Key");
    }
  }, [cleanSecret]);

  // ✅ Retry pending copy when tab is focused
  useEffect(() => {
    const handleFocus = () => {
      if (pendingCopy) tryCopy(pendingCopy);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [pendingCopy]);

  // ⏳ OTP auto-refresh timer
  useEffect(() => {
    if (!cleanSecret || cleanSecret.length < 16) {
      setOtp("");
      setTimeLeft(30);
      return;
    }

    generateOtp(); // first call

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          generateOtp(); // refresh
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cleanSecret, generateOtp]);

  const handleSecretChange = (value: string) => {
    setSecret(value);
    setCopied(false);
    setPendingCopy("");
  };

  const handleReset = () => {
    setSecret("");
    setOtp("");
    setCopied(false);
    setPendingCopy("");
    setTimeLeft(30);
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-8 border border-slate-100">
        {/* Hidden Textarea for fallback */}
        <textarea
          ref={hiddenRef}
          readOnly
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        />

        {/* Secret Input */}
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

        {/* OTP Output */}
        <div className="space-y-3">
          <label className="block text-left text-slate-700 font-medium">
            🧾 OTP Code{" "}
            {otp && (
              <span className="text-sm text-green-500 font-semibold">
                ({timeLeft}s remaining)
              </span>
            )}
            <span className="ml-2 text-green-600">
              {copied ? "✅ Copied" : ""}
            </span>
          </label>
          <textarea
            className="w-full p-3 border border-emerald-300 bg-emerald-50 rounded-lg resize-none text-lg font-mono text-emerald-800"
            rows={2}
            readOnly
            value={otp || "Your OTP will appear here"}
          />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={generateOtp}
              disabled={!cleanSecret}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              🔁 Generate OTP
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
