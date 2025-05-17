import EmojiPicker from "@/components/Tools/EmojiPicker.tsx";

export default function EmojiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
        😊 Emoji Picker
      </h1>
      <p className="text-slate-600 mb-6 text-center">
        Browse, search, and click to copy emojis instantly.
      </p>
      <EmojiPicker />
    </div>
  );
}
