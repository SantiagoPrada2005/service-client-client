'use client';

export default function TestTailwind() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Test de Tailwind CSS</h1>
      <p className="text-gray-600 mb-2">Si este texto es gris, Tailwind está funcionando.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Si este botón es azul, Tailwind está funcionando
      </button>
    </div>
  );
}
