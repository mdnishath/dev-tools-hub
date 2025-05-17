import NameGenerator from "@/components/Tools/NameGenerator";

export default function NamePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
        🧍 Name Generator
      </h1>
      <p className="text-slate-600 mb-6 text-center">
        Generate random names based on country and gender.
      </p>
      <NameGenerator />
    </div>
  );
}
