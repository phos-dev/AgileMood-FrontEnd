'use client';

import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-50">
      {/* Ícone estilizado para dar um toque visual profissional */}
      <div className="mb-6 p-4 bg-blue-100 rounded-full text-blue-700">
        <FileQuestion size={64} />
      </div>

      <h1 className="text-6xl font-extrabold text-blue-700 mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Página não encontrada</h2>
      
      <p className="mb-8 text-gray-600 max-w-md">
        Parece que você tentou acessar um caminho que não existe ou foi movido. 
        Verifique a URL ou retorne ao início.
      </p>

      <Link
        href="/home"
        className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}