'use client';
import { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { APP_NAME } from '../../utils/constants';

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const apiData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
      
      const response = await fetch('/api/users/createUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear usuario');
      }
      
      console.log('Usuario registrado correctamente:', data);
      
      router.push('/pages/login');
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError(error instanceof Error ? error.message : 'Error al registrar usuario');
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
    <div className="min-h-screen flex bg-[#000000] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-transparent"></div>
      <div className="w-full flex flex-row">
        {/* Left Side - Image */}
        <div className="w-1/2 relative rounded-xl overflow-hidden m-4">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm"></div>
          <Image
            src="https://carbon-media.accelerator.net/0000000kLxE/fc0a7MfuXrmg0ImC79Hewo;1920x2400.png?auto=webp"
            alt="Background"
            fill
            className="object-cover animate-fade-in"
            quality={100}
          />

          {/* Content Overlay */}
          <div className="absolute bg-[#030712]/80 backdrop-blur-sm border-b border-slate-800">
            <div className="absolute p-10 text-white z-10">
              <h1 className="text-5xl font-bold mb-4 animate-fade-in">
                Únete a <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{APP_NAME}</span>
              </h1>
              <p className="text-xl text-white/80 animate-fade-in">
                Descubre el poder de la IA adaptativa y la colaboración en tiempo real.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 bg-[#000000] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-transparent"></div>
          <div className="w-[400px] py-8 relative">
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-white mb-2">Crea tu cuenta</h2>
              <p className="text-slate-400">Comienza tu viaje con {APP_NAME}</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                  placeholder="Tu nombre de usuario"
                  disabled={loading}
                />
              </div>

              <div className="animate-fade-in">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                  placeholder="tu@email.com"
                  disabled={loading}
                />
              </div>

              <div className="animate-fade-in">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                  placeholder="Mínimo 8 caracteres"
                  disabled={loading}
                />
                <p className="mt-2 text-sm text-slate-400">La contraseña debe tener al menos 8 caracteres.</p>
              </div>
              
              <button 
                type="submit" 
                className="group relative w-full animate-fade-in"
                disabled={loading}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-full px-6 py-3 bg-[#030712] rounded-lg border border-slate-800 text-white font-medium group-hover:border-slate-700 transition duration-500">
                  {loading ? 'Procesando...' : 'Crear cuenta'}
                </div>
              </button>

              <div className="text-center text-slate-400 animate-fade-in">
                ¿Ya tienes una cuenta? {' '}
                <Link 
                  href="/pages/login" 
                  className="text-white hover:text-indigo-400 transition-colors duration-300"
                >
                  Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
