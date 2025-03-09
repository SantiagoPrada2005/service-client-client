'use client';
import { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importamos next/image para optimizar imágenes

// Definición de la interfaz para los datos del formulario
interface FormData {
  username: string;
  email: string;
  password: string;
}

// Memorizamos el componente para evitar renderizados innecesarios
const SignupPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      // Validación básica
      if (!formData.username || !formData.email || !formData.password) {
        throw new Error('Por favor, completa todos los campos.');
      }
      if (formData.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres.');
      }
      console.log('Datos del formulario de registro:', formData);
    } catch (error) {
      setError((error as Error).message);
      console.error('Error al registrar usuario:', error);
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
    <div className="min-h-screen flex bg-white overflow-hidden">
      <div className="w-full flex flex-row">
        <div className="w-1/2 relative bg-cover bg-center bg-no-repeat h-screen">
          {/* Uso de next/image para optimizar la imagen */}
          <Image
            src="https://carbon-media.accelerator.net/0000000kLxE/fc0a7MfuXrmg0ImC79Hewo;1920x2400.png?auto=webp"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={75}
          />
          <div className="absolute p-10 text-white">
            <h1 className="text-3xl font-serif mb-2">CREA TU CUENTA</h1>
            <p className="text-xl font-serif">Explora todas las funciones disponibles para ti.</p>
          </div>
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center">
          <div className="w-[350px] py-6">
            <div className="mb-3.5 text-left">
              <h1 className="text-[24px] font-semibold text-[#24292f]">Regístrate</h1>
            </div>

            <div className="bg-white">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="mb-0">
                  <label htmlFor="username" className="block text-[14px] font-medium text-[#24292f] mb-1">Nombre de usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    aria-label="Nombre de usuario"
                    className="p-[5px_12px] h-[32px] border border-[#d0d7de] rounded-[6px] text-[14px] bg-white text-[#24292f] w-full focus:outline-none focus:border-[#0969da]"
                    placeholder="Usuario"
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
                    aria-label="Correo electrónico"
                    className="p-[5px_12px] h-[32px] border border-[#d0d7de] rounded-[6px] text-[14px] bg-white text-[#24292f] w-full focus:outline-none focus:border-[#0969da]"
                    placeholder="Correo electrónico"
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
                    aria-label="Contraseña"
                    className="p-[5px_12px] h-[32px] border border-[#d0d7de] rounded-[6px] text-[14px] bg-white text-[#24292f] w-full focus:outline-none focus:border-[#0969da]"
                    placeholder="Contraseña"
                  />
                  <p className="text-[12px] text-[#57606a] mt-1">Utiliza al menos 8 caracteres.</p>
                </div>

                <button type="submit" className="w-full bg-[#1a1f24] hover:bg-[#24292f] text-white py-[6px] px-4 border-none rounded-[6px] text-[14px] font-medium cursor-pointer transition-colors">
                  Continuar
                </button>
              </form>
            </div>

            <div className="mt-4 text-center text-[14px] text-[#57606a]">
              <p>¿Ya tienes una cuenta? <Link href='/login' className="text-[#0969da] hover:underline">Inicia sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
