// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <p>© {new Date().getFullYear()} Nova Cam App</p>
    </footer>
  );
}