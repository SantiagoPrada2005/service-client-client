'use client';
import { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import Link from 'next/link';

// Definición de interfaces para los datos del formulario
interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      if (!formData.username || !formData.password) {
        throw new Error('Por favor, completa todos los campos.');
      }
      console.log('Datos del formulario:', formData);
      // Aquí iría tu lógica de autenticación
    } catch (error) {
      setError((error as Error).message);
      console.error('Error al iniciar sesión:', error);
    }
  }, [formData]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-auto flex flex-col justify-center p-4 text-black">
          <div className="w-[350px] mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <h1 className="mb-3.5 text-[24px] font-semibold text-[#24292f]">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="mb-0 flex flex-col gap-2">
                <label htmlFor="username" className="text-[14px] font-medium text-[#24292f] mb-1">Nombre de usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  aria-label="Nombre de usuario"
                  className="p-[10px] border border-gray-300 rounded-md text-[14px] bg-white text-gray-900 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Ingresa tu nombre de usuario"
                />
              </div>
              <div className="mb-0 flex flex-col gap-2">
                <label htmlFor="password" className="text-[14px] font-medium text-[#24292f] mb-1">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-label="Contraseña"
                  className="p-[10px] border border-gray-300 rounded-md text-[14px] bg-white text-gray-900 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
              <button type="submit" className="bg-[#1a1f24] hover:bg-[#24292f] text-white py-[10px] px-4 border-none rounded-md text-[14px] font-medium cursor-pointer transition-colors duration-200 mt-2">
                Iniciar Sesión
              </button>
              <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100 text-[14px] text-gray-600">
                <p>¿No tienes cuenta?</p>
                <Link href='/signup' className="ml-1 text-blue-600 hover:underline">Registrarse</Link>
              </div>
            </form>
          </div>
          <p className="text-center text-gray-500 text-[12px] mt-4">© 2025 Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
