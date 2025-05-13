/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#22c55e', // Green primary color
          600: '#16a34a', // Darker green for hover
          100: '#f0fdf4', // Light green for backgrounds
        },
        dark: {
          900: '#1a202c', // Dark background
          800: '#2d3748', // Darker gray for cards
          700: '#4a5568', // Dark text
        },
        accent: {
          400: '#f59e0b', // Amber for highlights
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Headings
        inter: ['Inter', 'sans-serif'], // Body text
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(255,255,255,1) 100%)',
        'dark-gradient': 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(26,32,44,1) 100%)',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(34, 197, 94, 0.5), 0 0 20px rgba(34, 197, 94, 0.3)',
      },
    },
  },
  plugins: [],
};