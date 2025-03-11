'use client';
import { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get('registered') === 'true';
  
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(
    justRegistered ? 'Cuenta creada exitosamente. Inicia sesión para continuar.' : null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    try {
      const response = await fetch('/api/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setSuccess('Inicio de sesión exitoso. Redirigiendo...');
      
      setTimeout(() => {
        router.push('/pages/home');
      }, 1000);
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error instanceof Error ? error.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }, [formData, router]);

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
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
              
              <button 
                type="submit" 
                className={`bg-[#1a1f24] hover:bg-[#24292f] text-white py-[10px] px-4 border-none rounded-md text-[14px] font-medium cursor-pointer transition-colors duration-200 mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Iniciar Sesión'}
              </button>
              
              <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100 text-[14px] text-gray-600">
                <p>¿No tienes cuenta?</p>
                <Link href='/pages/signup' className="ml-1 text-blue-600 hover:underline">Registrarse</Link>
              </div>
            </form>
          </div>
          <p className="text-center text-gray-500 text-[12px] mt-4"> 2025 . Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
