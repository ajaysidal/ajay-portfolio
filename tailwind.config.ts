/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0C10",
        champagne: "#D4AF37",
        emerald: "#00A86B",
        midnight: "#1F2833",
        fog: "#F8F9FA",
        mist: "#AAB3BD",
      },
    },
  },
  plugins: [],
}