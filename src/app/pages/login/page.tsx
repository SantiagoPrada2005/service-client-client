'use client';
import { useState, FormEvent, ChangeEvent, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { APP_NAME } from '../../utils/constants';

interface FormData {
  username: string;
  password: string;
}

// Componente que utiliza useSearchParams
function LoginForm() {
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

    
    <div className="w-1/2 bg-[#000000] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-transparent"></div>
      <div className="w-[400px] py-8 relative">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h2>
          <p className="text-slate-400">Accede a tu cuenta de {APP_NAME}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-fade-in">
            <p className="text-emerald-400 text-sm">{success}</p>
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
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
              placeholder="Tu contraseña"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="group relative w-full animate-fade-in"
            disabled={loading}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative w-full px-6 py-3 bg-[#030712] rounded-lg border border-slate-800 text-white font-medium group-hover:border-slate-700 transition duration-500">
              {loading ? 'Procesando...' : 'Iniciar Sesión'}
            </div>
          </button>

          <div className="text-center text-slate-400 animate-fade-in">
            ¿No tienes una cuenta? {' '}
            <Link 
              href="/pages/signup" 
              className="text-white hover:text-indigo-400 transition-colors duration-300"
            >
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componente principal que envuelve el formulario en un Suspense
export default function LoginPage() {
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
                Accede a <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{APP_NAME}</span>
              </h1>
              <p className="text-xl text-white/80 animate-fade-in">
                Conecta con nuestra plataforma inteligente y potencia tu experiencia digital.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Link href="/pages/pricing" className="group relative inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-md overflow-hidden">
          <button className="ml-auto text-gray-500 hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Link>
        <Suspense fallback={<div className="w-1/2 flex items-center justify-center"><div className="text-white">Cargando...</div></div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
