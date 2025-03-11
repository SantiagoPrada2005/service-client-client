'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Definición de la interfaz para los datos del formulario
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Preparar los datos para enviar a la API
      const apiData = {
        usuario: formData.username,
        email: formData.email,
        password: formData.password
      };
      
      // Llamada a la API
      const response = await fetch('/api/users/createUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      const data = await response.json();
      
      // Manejar respuestas de error
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear usuario');
      }
      
      // Éxito - registro completado
      console.log('Usuario registrado correctamente:', data);
      
      // Redirigir al usuario a la página de inicio de sesión
      router.push('/pages/home');
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError(error instanceof Error ? error.message : 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      <div className="w-full flex flex-row">
        <div className="w-1/2 bg-cover bg-center bg-no-repeat h-screen" style={{backgroundImage: "url('https://carbon-media.accelerator.net/0000000kLxE/fc0a7MfuXrmg0ImC79Hewo;1920x2400.png?auto=webp')"}}>
          <div className="p-10 text-white">
            <h1 className="text-3xl font-bold mb-2">CREA TU CUENTA</h1>
            <p className="text-xl">Explora todas las funciones disponibles para ti.</p>
          </div>
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center">
          <div className="w-[350px] py-6">
            <div className="mb-3.5 text-left">
              <h1 className="text-[24px] font-semibold text-[#24292f]">Regístrate</h1>
            </div>
            
            <div className="bg-white">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="mb-0">
                  <label htmlFor="username" className="block text-[14px] font-medium text-[#24292f] mb-1">Nombre de usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="p-[5px_12px] h-[32px] border border-[#d0d7de] rounded-[6px] text-[14px] bg-white text-[#24292f] w-full focus:outline-none focus:border-[#0969da]"
                    placeholder="Usuario"
                    disabled={loading}
                  />
                </div>
                
                <div className="mb-0">
                  <label htmlFor="email" className="block text-[14px] font-medium text-[#24292f] mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-[5px_12px] h-[32px] border border-[#d0d7de] rounded-[6px] text-[14px] bg-white text-[#24292f] w-full focus:outline-none focus:border-[#0969da]"
                    placeholder="Correo electronico"
                    disabled={loading}
                  />
                </div>
                
                <div className="mb-0">
                  <label htmlFor="password" className="block text-[14px] font-medium text-[#24292f] mb-1">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="p-[5px_12px] h-[32px] border border-[#d0d7de] rounded-[6px] text-[14px] bg-white text-[#24292f] w-full focus:outline-none focus:border-[#0969da]"
                    placeholder="Contraseña"
                    disabled={loading}
                  />
                  <p className="text-[12px] text-[#57606a] mt-1">Utiliza al menos 8 caracteres.</p>
                </div>
                
                <button 
                  type="submit" 
                  className={`w-full bg-[#1a1f24] hover:bg-[#24292f] text-white py-[6px] px-4 border-none rounded-[6px] text-[14px] font-medium cursor-pointer transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Continuar'}
                </button>
              </form>
            </div>
            
            <div className="mt-4 text-center text-[14px] text-[#57606a]">
              <p>¿Ya tienes una cuenta? <Link href='/pages/login' className="text-[#0969da] hover:underline">Inicia sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}