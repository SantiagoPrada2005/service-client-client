/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // Agrega plugins si es necesario, por ejemplo:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
  // Opcional: Configuración adicional para optimización
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Asegúrate de que PurgeCSS esté configurado correctamente
}
