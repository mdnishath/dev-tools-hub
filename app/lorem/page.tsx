import LoremIpsumGenerator from "@/components/Tools/LoremIpsumGenerator";

export default function LoremPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
        📄 Lorem Ipsum Generator
      </h1>
      <p className="text-slate-600 mb-6 text-center">
        Generate placeholder text for your designs, templates, or mockups.
      </p>
      <LoremIpsumGenerator />
    </div>
  );
}
