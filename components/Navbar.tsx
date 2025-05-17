"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const toolItems = [
  { name: "Emoji Picker", href: "/emoji" },
  { name: "Lorem Ipsum Generator", href: "/lorem" },
  { name: "Name Generator", href: "/name" },
  { name: "OTP Generator", href: "/otp" },
  { name: "Password Generator", href: "/password" },
  { name: "Text Case Converter", href: "/case" },
  { name: "UUID Generator", href: "/uuid" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          🛠️ DevTools
        </Link>
        <ul className="flex gap-6 items-center">
          <li className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
            >
              Tools ▾
            </button>
            {open && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-lg z-50 overflow-hidden"
              >
                {toolItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-indigo-50 transition ${
                        pathname === item.href
                          ? "text-indigo-700 font-medium"
                          : "text-slate-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
