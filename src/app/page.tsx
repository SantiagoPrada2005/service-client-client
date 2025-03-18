'use client';
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from './utils/constants';

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#000000]">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-[#030712]/80 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-7">
            <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
            <Link href="/pages/pricing" className="text-sm text-slate-300 hover:text-white transition-all duration-500 ease-out">
              Pricing
            </Link>
          </div>
          
          <div className="flex items-center gap-4">

            <Link href="/pages/login" 
            className="bg-slate-800/50 text-white px-4 py-2 rounded-md font-medium transition-all duration-500 ease-out hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 hover:scale-105">
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
          <div className="text-center max-w-4xl mx-auto py-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl"></div>
            <h2 className="text-7xl font-bold text-white mb-6 relative">
              Ship Faster with <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{APP_NAME}</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 relative">
            {APP_NAME} es una plataforma adaptativa que transforma tu forma de trabajar,
              colaborando contigo para que seas más rápido y eficiente.
            </p>
            <div className="flex justify-center gap-4 relative">
              <Link href="/pages/signup" 
                className="group relative inline-flex items-center gap-2 px-8 py-3">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md transition-all duration-500 ease-out group-hover:scale-105"></div>
                <div className="relative flex items-center gap-2 text-white font-medium">
                  <span className="transition-transform duration-500 ease-out group-hover:scale-125">⚡</span> 
                  <span>Comenzar ahora</span>
                </div>
              </Link>
              <a href="https://github.com/WDHAN4NR" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800/50 text-white px-8 py-3 rounded-md font-medium transition-all duration-500 ease-out hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 hover:scale-105">
                Ver documentación
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto py-16 relative">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 transition-all duration-500 ease-out hover:border-indigo-500 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10 group">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white text-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">🤖</div>
              <h3 className="text-xl font-bold text-white mb-3">Inteligencia Artificial</h3>
              <p className="text-slate-300">Optimiza tu flujo de trabajo con nuestra IA adaptativa que aprende de tus patrones.</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 transition-all duration-500 ease-out hover:border-purple-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white text-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">👥</div>
              <h3 className="text-xl font-bold text-white mb-3">Colaboración en Tiempo Real</h3>
              <p className="text-slate-300">Trabaja con tu equipo en tiempo real con funciones avanzadas de colaboración.</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 transition-all duration-500 ease-out hover:border-pink-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/10 group">
              <div className="bg-gradient-to-r from-pink-500 to-indigo-500 w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white text-xl transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6">📊</div>
              <h3 className="text-xl font-bold text-white mb-3">Análisis Avanzado</h3>
              <p className="text-slate-300">Obtén insights detallados sobre tu rendimiento y el de tu equipo.</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-20 border-y border-slate-800">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-2">98%</div>
                  <p className="text-slate-400">Satisfacción del usuario</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">24/7</div>
                  <p className="text-slate-400">Soporte disponible</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-2">50K+</div>
                  <p className="text-slate-400">Usuarios activos</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-indigo-500 bg-clip-text text-transparent mb-2">100+</div>
                  <p className="text-slate-400">Proyectos exitosos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-4">
                  <span className="text-white">Aliados </span>
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Estratégicos
                  </span>
                </h2>
                <p className="text-lg text-slate-400">Orgullosamente apoyados por instituciones que impulsan la excelencia académica</p>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-20">
                {/* Tradicional Coffee */}
                <div className="group">
                  <div className="relative">
                    <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl"></div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <Image
                        src="/logos/SPONSOR1.png"
                        alt="Tradicional Coffee Logo"
                        width={150}
                        height={60}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="mt-4">
                        <p className="text-sm text-slate-500">Innovation Partner</p>
                        <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          Tradicional Coffee
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INTEP */}
                <div className="group">
                  <div className="relative">
                    <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl"></div>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <Image
                        src="/logos/SPONSOR2.png"
                        alt="INTEP Logo"
                        width={150}
                        height={60}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="mt-4">
                        <p className="text-sm text-slate-500">Enterprise Partner</p>
                        <h3 className="text-2xl font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          INTEP
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="py-20">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="text-white">Lo que dicen </span>
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  nuestros usuarios
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                  <p className="text-slate-300 mb-4">{APP_NAME} ha revolucionado nuestra forma de trabajar. La eficiencia ha aumentado significativamente.</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">JD</div>
                    <div className="ml-3">
                      <div className="text-white font-medium">Juan David</div>
                      <div className="text-slate-400 text-sm">Director de Tecnología</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                  <p className="text-slate-300 mb-4">La integración con IA es impresionante. Ha mejorado nuestra productividad en un 200%.</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">MC</div>
                    <div className="ml-3">
                      <div className="text-white font-medium">María Camila</div>
                      <div className="text-slate-400 text-sm">Líder de Proyecto</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                  <p className="text-slate-300 mb-4">El soporte es excepcional. Siempre están disponibles para ayudar con cualquier consulta.</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold">AS</div>
                    <div className="ml-3">
                      <div className="text-white font-medium">Andrés Santiago</div>
                      <div className="text-slate-400 text-sm">Desarrollador Senior</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-4xl font-bold text-white mb-6">¿Listo para transformar tu forma de trabajar?</h2>
              <p className="text-xl text-slate-300 mb-8">Únete a miles de profesionales que ya están aprovechando el poder de {APP_NAME}</p>
              <Link href="/pages/signup" 
                className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md transition-all duration-500 ease-out group-hover:scale-105"></div>
                <div className="relative flex items-center gap-2 text-white font-medium">
                  <span>Comienza gratis</span>
                  <span className="text-xl">→</span>
                </div>
              </Link>
            </div>
          

          {/* Multimodal Features Section */}
          <div className="max-w-6xl mx-auto py-16 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block mb-4 px-4 py-1 bg-red-500/10 text-red-400 text-sm font-medium rounded-full"># Multimodalidad</div>
                <h2 className="text-4xl font-bold text-white mb-6">Sube imágenes para clarificar requerimientos</h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Con capacidades multimodales avanzadas, {APP_NAME} entiende tus subidas de imágenes con precisión, 
                  agilizando la colaboración y aumentando la eficiencia.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl blur-lg"></div>
                <div className="relative bg-[#1a1f24] border border-slate-800/60 rounded-xl overflow-hidden">
                  <Image
                    src="/demo-multimodal.png"
                    alt="Demo de características multimodales"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
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
                <a href="https://github.com/WDHAN4NR" className="text-slate-400 hover:text-white transition-colors duration-300">
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