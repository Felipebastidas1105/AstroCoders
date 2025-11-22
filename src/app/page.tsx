"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="w-full py-5 px-8 flex justify-between items-center bg-gray-900 shadow-lg">
        <h2 className="text-xl font-semibold tracking-wide">AstroCoders</h2>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold mb-4"> LegalIA </h1>

        <p className="text-gray-300 max-w-2xl leading-relaxed mb-10">
          Bienvenido a tu asistente legal. Responde preguntas basándose en
          documentos legales y te los explica de forma natural. Una herramienta
          creada para el Hackathon Caldas 2025.
        </p>

        <button
          onClick={() => router.push("/chat")}
          className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-lg font-semibold transition shadow-lg"
        >
          Hablar con LegalIA
        </button>
      </main>

      <footer className="text-center text-gray-500 py-4 text-sm">
        Hackathon Caldas 2025 • Equipo AstroCoders
      </footer>
    </div>
  );
}
