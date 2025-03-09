/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['carbon-media.accelerator.net'],
    },
    // Opcional: Configuración adicional para optimización
    // swcMinify: true, // Habilita la minimización de SWC (opcional si ya está habilitada por defecto)
  }
  
  export default nextConfig;
  