"use client";

import { useState } from "react";
import EmojiPickerLib from "emoji-picker-react";

export default function EmojiPicker() {
  const [copied, setCopied] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiClick = (emojiData: any) => {
    const emoji = emojiData.emoji;
    navigator.clipboard.writeText(emoji).then(() => {
      setCopied(emoji);
      setTimeout(() => setCopied(""), 1500);
    });
  };

  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-6 border border-slate-100 space-y-4">
        <EmojiPickerLib
          onEmojiClick={handleEmojiClick}
          height={400}
          width="100%"
        />

        {copied && (
          <div className="text-center text-emerald-600 font-medium">
            ✅ Copied {copied} to clipboard!
          </div>
        )}
      </div>
    </main>
  );
}
