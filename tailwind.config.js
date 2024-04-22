/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",

    "!./src/**/*.{js,jsx,ts,tsx}?(\\?.*)?$",
  ],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}