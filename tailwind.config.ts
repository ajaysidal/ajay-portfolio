import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B0C10',
          secondary: '#1F2833',
          tertiary: 'rgba(248, 249, 250, 0.06)',
        },
        text: {
          primary: '#F8F9FA',
          secondary: '#AAB3BD',
          muted: '#AAB3BD',
        },
        gold: '#D4AF37',
        emerald: '#00A86B',
        champagne: '#D4AF37',
        obsidian: '#0B0C10',
        midnight: '#1F2833',
        fog: '#F8F9FA',
        mist: '#AAB3BD',
        card: 'rgba(248, 249, 250, 0.06)',
        line: 'rgba(248, 249, 250, 0.14)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};

export default config;