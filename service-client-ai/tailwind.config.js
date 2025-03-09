/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Agrega plugins si es necesario, por ejemplo:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
  // Opcional: Configuración adicional para optimización
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Asegúrate de que PurgeCSS esté configurado correctamente
}
