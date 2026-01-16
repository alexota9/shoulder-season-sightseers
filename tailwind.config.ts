import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Darker brand colors for Shoulder Season Sightseers
        teal: {
          DEFAULT: '#4a8585',
          50: '#e6f2f2',
          100: '#b3d9d9',
          200: '#80c0c0',
          300: '#5aa3a3',
          400: '#4a8585',
          500: '#396767',
          600: '#2d5252',
          700: '#1f3838',
          800: '#152626',
          900: '#0a1313',
        },
        coral: {
          DEFAULT: '#a85c5c',
          50: '#fae8e8',
          100: '#f3cccc',
          200: '#e79999',
          300: '#d67373',
          400: '#a85c5c',
          500: '#874a4a',
          600: '#6d3a3a',
          700: '#522b2b',
          800: '#3d1f1f',
          900: '#1f0f0f',
        },
        purple: {
          DEFAULT: '#6b5ca3',
          50: '#eeebf7',
          100: '#d7d1eb',
          200: '#afa3d7',
          300: '#8c7bc4',
          400: '#6b5ca3',
          500: '#564a85',
          600: '#453b6b',
          700: '#332c50',
          800: '#231f38',
          900: '#12101c',
        },
        gold: {
          DEFAULT: '#a3865c',
          50: '#f7f3eb',
          100: '#ebe0ca',
          200: '#d3bf83',
          300: '#bda867',
          400: '#a3865c',
          500: '#856d4a',
          600: '#6a5839',
          700: '#4f4229',
          800: '#382f1d',
          900: '#1c1710',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
