import PasswordGenerator from "@/components/Tools/PasswordGenerator";

export default function PasswordPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
        🔑 Password Generator
      </h1>
      <p className="text-slate-600 mb-6 text-center">
        Instantly generate strong, secure passwords of any length.
      </p>
      <PasswordGenerator />
    </div>
  );
}
