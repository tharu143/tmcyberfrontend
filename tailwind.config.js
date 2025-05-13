/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#22c55e', // Green primary color
          600: '#16a34a', // Darker green for hover
          100: '#f0fdf4', // Light green for backgrounds
        },
      },
    },
  },
  plugins: [],
};
