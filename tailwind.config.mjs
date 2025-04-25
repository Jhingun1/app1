/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#FF006E',
          blue: '#3A86FF',
          purple: '#8338EC',
          yellow: '#FFBE0B',
          cyan: '#00F5FF',
        },
        cyber: {
          dark: '#0D0D0D',
          darker: '#070707',
          light: '#1A1A1A',
          accent: '#2A2A2A',
        },
      },
      fontFamily: {
        cyber: ['BlenderPro', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-5px, 2px)' },
          '66%': { transform: 'translate(5px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}; 