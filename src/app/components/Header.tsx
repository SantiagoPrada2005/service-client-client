'use client';
import Link from 'next/link';
import { APP_NAME } from '../utils/constants';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header({ isTransparent = true }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detectar scroll para cambiar el estilo del header cuando es transparente
  useEffect(() => {
    if (isTransparent) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isTransparent]);
  
  return (
    <header className={`fixed w-full top-0 z-50 ${isTransparent 
      ? `transition-all duration-300 ${isScrolled ? 'bg-[#030712]/30 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-7'}` 
      : 'bg-[#030712]/80 backdrop-blur-sm border-b border-slate-800 py-3'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-7 md:gap-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-bold">SC</span>
            {APP_NAME}
          </h1>
          <nav className="hidden md:flex items-center gap-6">
            {/* Usamos usePathname para determinar en qué página estamos */}
            <Link href="/." className={`text-sm ${pathname === '/' ? 'text-white font-medium' : 'text-slate-300'} hover:text-white transition-all duration-300 ease-out hover:translate-y-[-2px]`}>
              Inicio
            </Link>
            <Link href="/pages/pricing" className={`text-sm ${pathname === '/pages/pricing' ? 'text-white font-medium' : 'text-slate-300'} hover:text-white transition-all duration-300 ease-out hover:translate-y-[-2px]`}>
              Precios
            </Link>
            <Link href="/pages/pricing" className={`text-sm ${pathname === '/pages/pricing' ? 'text-white font-medium' : 'text-slate-300'} hover:text-white transition-all duration-300 ease-out hover:translate-y-[-2px]`}>
              Características
            </Link>
            <Link href="/pages/pricing" className={`text-sm ${pathname === '/pages/pricing' ? 'text-white font-medium' : 'text-slate-300'} hover:text-white transition-all duration-300 ease-out hover:translate-y-[-2px]`}>
              Testimonios
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/pages/login" 
            className="bg-slate-800/50 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-md font-medium transition-all duration-300 ease-out hover:bg-slate-700/80 border border-slate-700/50 hover:border-slate-600 hover:translate-y-[-2px]">
            Iniciar sesión
          </Link>

          <Link href="/pages/signup" 
            className="group relative inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute inset-[-2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-70 group-hover:scale-105"></div>
            <span className="relative text-white font-medium z-10">Registrarse</span>
          </Link>
        </div>
      </div>
    </header>
  );
}