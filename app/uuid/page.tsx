import UuidGenerator from "@/components/Tools/UuidGenerator";

export default function UUIDPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
        🆔 UUID Generator
      </h1>
      <p className="text-slate-600 mb-6 text-center">
        Generate universally unique identifiers (UUID v4).
      </p>
      <UuidGenerator />
    </div>
  );
}
