"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { authenticator } from "otplib";

export default function OtpGenaretor() {
  const [secret, setSecret] = useState("");
  const [otp, setOtp] = useState("");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [pendingCopy, setPendingCopy] = useState("");
  const [hasCopiedInitial, setHasCopiedInitial] = useState(false);
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
            // fallback failed
          }
        }
        setPendingCopy(token);
      });
  };

  // Generates OTP without copy
  const generateOtp = useCallback(() => {
    try {
      const token = authenticator.generate(cleanSecret);
      setOtp(token);
    } catch {
      setOtp("Invalid Secret Key");
    }
  }, [cleanSecret]);

  // Manual generate and copy
  const generateAndCopyOtp = useCallback(() => {
    try {
      const token = authenticator.generate(cleanSecret);
      setOtp(token);
      tryCopy(token);
    } catch {
      setOtp("Invalid Secret Key");
    }
  }, [cleanSecret]);

  // Retry copy on focus
  useEffect(() => {
    const handleFocus = () => {
      if (pendingCopy) tryCopy(pendingCopy);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [pendingCopy]);

  // Timer for auto-refresh and first-time copy
  useEffect(() => {
    if (!cleanSecret || cleanSecret.length < 16) {
      setOtp("");
      setTimeLeft(30);
      setHasCopiedInitial(false);
      return;
    }

    // First-time generation
    try {
      const token = authenticator.generate(cleanSecret);
      setOtp(token);
      if (!hasCopiedInitial) {
        tryCopy(token);
        setHasCopiedInitial(true);
      }
    } catch {
      setOtp("Invalid Secret Key");
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          generateOtp(); // refresh only (no copy)
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cleanSecret, generateOtp, hasCopiedInitial]);

  const handleSecretChange = (value: string) => {
    setSecret(value);
    setCopied(false);
    setPendingCopy("");
    setHasCopiedInitial(false); // reset for new secret
  };

  const handleReset = () => {
    setSecret("");
    setOtp("");
    setCopied(false);
    setPendingCopy("");
    setTimeLeft(30);
    setHasCopiedInitial(false);
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 space-y-8 border border-slate-100">
        <textarea
          ref={hiddenRef}
          readOnly
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        />

        {/* Secret Key Input */}
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
              onClick={generateAndCopyOtp}
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
