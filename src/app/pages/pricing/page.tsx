'use client';
import Link from 'next/link';
import { APP_NAME } from '../../utils/constants';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#000000]">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-[#030712]/80 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-7">
            <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
            <Link href="/" className="text-sm text-slate-300 hover:text-white transition-all duration-500 ease-out">
              Inicio
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-300 hover:text-white transition-all duration-500 ease-out">
              Inicio
            </Link>
            <Link href="/pages/login" className="text-slate-300 hover:text-white transition-all duration-500 ease-out">
              Log in
            </Link>
            <Link href="/pages/signup" 
              className="group relative inline-flex items-center gap-2 px-4 py-2">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md transition-all duration-500 ease-out group-hover:scale-105"></div>
              <span className="relative text-white font-medium">Sign up</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto py-16">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl"></div>
            <h2 className="text-5xl font-bold text-white mb-6 relative">
              Planes y <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Precios</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 relative">
              Elige el plan que mejor se adapte a tus necesidades y comienza a potenciar tu experiencia con {APP_NAME}.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto py-8 relative">
            {/* Free Plan */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden transition-all duration-500 ease-out hover:border-indigo-500 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10 group">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                    <p className="text-slate-400">Para uso personal</p>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">🚀</div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">$0</span>
                    <span className="text-slate-400 mb-1">/mes</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">Sin costo, para siempre</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Acceso básico a la plataforma
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> 5 proyectos personales
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Colaboración limitada
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Soporte comunitario
                  </li>
                </ul>

                <Link href="/pages/signup" 
                  className="block w-full py-3 px-4 bg-slate-700/50 text-white text-center rounded-lg font-medium transition-all duration-500 ease-out hover:bg-slate-600/50 border border-slate-600 hover:border-slate-500">
                  Comenzar gratis
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/50 overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent"></div>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center text-sm font-medium py-1">
                Más popular
              </div>
              <div className="p-8 relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                    <p className="text-slate-400">Para profesionales</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">⚡</div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">$29</span>
                    <span className="text-slate-400 mb-1">/mes</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">Facturación anual o $39/mes</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Todo lo del plan Free
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Proyectos ilimitados
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Colaboración avanzada
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Análisis de rendimiento
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Soporte prioritario 24/7
                  </li>
                </ul>

                <Link href="/pages/signup" 
                  className="group relative inline-flex items-center justify-center w-full px-4 py-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md transition-all duration-500 ease-out group-hover:scale-105"></div>
                  <span className="relative text-white font-medium">Comenzar prueba de 14 días</span>
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden transition-all duration-500 ease-out hover:border-pink-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/10 group">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                    <p className="text-slate-400">Para equipos y empresas</p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">🏢</div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">$99</span>
                    <span className="text-slate-400 mb-1">/mes</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">Por usuario, facturación anual</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Todo lo del plan Pro
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Administración de equipos
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Seguridad avanzada
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> API personalizada
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="mr-2 text-emerald-500">✓</span> Soporte dedicado
                  </li>
                </ul>

                <Link href="/pages/signup" 
                  className="block w-full py-3 px-4 bg-slate-700/50 text-white text-center rounded-lg font-medium transition-all duration-500 ease-out hover:bg-slate-600/50 border border-slate-600 hover:border-slate-500">
                  Contactar ventas
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto py-20">
            <h3 className="text-3xl font-bold text-white mb-10 text-center">
              Preguntas <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Frecuentes</span>
            </h3>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h4 className="text-xl font-bold text-white mb-3">¿Qué métodos de pago acepta?</h4>
                <p className="text-slate-300">Aceptamos pagos a través de Nequi y PSE para mayor comodidad.</p>
              </div>
            </div>
          </div>
          
          {/* Transition Text */}
          <div className="text-center max-w-3xl mx-auto py-8">
            <p className="text-xl text-slate-300 italic">
              ¿Tienes más dudas? No te preocupes, mientras tanto...
            </p>
          </div>
          
          {/* CTA Section */}
          <div className="max-w-4xl mx-auto py-16 text-center">
            <div className="bg-slate-800/50 p-10 rounded-2xl border border-slate-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="relative">
                <h3 className="text-3xl font-bold text-white mb-4">
                  ¿Listo para potenciar tu experiencia con <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{APP_NAME}</span>?
                </h3>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                  Únete a miles de profesionales que ya están aprovechando el poder de nuestra plataforma.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/pages/signup" 
                    className="group relative inline-flex items-center gap-2 px-8 py-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-110"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md transition-all duration-500 ease-out group-hover:scale-105"></div>
                    <span className="relative text-white font-medium">Comenzar ahora</span>
                  </Link>
                  <Link href="#" 
                    className="bg-slate-700/50 text-white px-8 py-3 rounded-md font-medium transition-all duration-500 ease-out hover:bg-slate-600/50 border border-slate-600 hover:border-slate-500">
                    Contactar ventas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#030712]/80 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">{APP_NAME}</h3>
              <p className="text-slate-400 mb-4">Potenciando tu experiencia digital con inteligencia artificial adaptativa.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Características</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Precios</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Casos de uso</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Testimonios</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Documentación</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Guías</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">API</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Sobre nosotros</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Empleos</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Prensa</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-400 text-sm text-center">&copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}