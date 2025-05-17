"use client";

import Link from "next/link";

const tools = [
  {
    name: "Emoji Picker",
    href: "/emoji",
    icon: "😊",
    description: "Browse and copy emojis.",
  },
  {
    name: "Lorem Ipsum Generator",
    href: "/lorem",
    icon: "📄",
    description: "Generate placeholder text.",
  },
  {
    name: "Name Generator",
    href: "/name",
    icon: "🧠",
    description: "Generate creative and random names.",
  },
  {
    name: "OTP Generator",
    href: "/otp",
    icon: "🔐",
    description: "Convert secret key to OTP code.",
  },
  {
    name: "Password Generator",
    href: "/password",
    icon: "🔑",
    description: "Generate strong passwords.",
  },
  {
    name: "Text Case Converter",
    href: "/case",
    icon: "🔤",
    description: "Convert text to uppercase, camelCase, etc.",
  },
  {
    name: "UUID Generator",
    href: "/uuid",
    icon: "🆔",
    description: "Generate unique UUIDs.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-sky-50 via-white to-pink-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-700">
            🚀 Dev Tools Hub
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            A collection of tools to make development faster, simpler, and
            cleaner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all hover:border-indigo-400"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{tool.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600">
                    {tool.name}
                  </h2>
                  <p className="text-sm text-slate-500">{tool.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
