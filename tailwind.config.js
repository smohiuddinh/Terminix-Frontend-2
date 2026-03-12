/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // all your React files
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-gradient': 'linear-gradient(to bottom right, #1a3d26, #29623A, #0f2419)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
