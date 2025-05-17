import CaseConverter from "@/components/Tools/CaseConverter";

export default function CasePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
        🔤 Text Case Converter
      </h1>
      <p className="text-slate-600 mb-6 text-center">
        Convert your text into various formats like UPPERCASE, camelCase,
        snake_case and more.
      </p>
      <CaseConverter />
    </div>
  );
}
