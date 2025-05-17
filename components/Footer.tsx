export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-12 border-t">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} DevTools Hub. All rights reserved.
      </p>
    </footer>
  );
}
