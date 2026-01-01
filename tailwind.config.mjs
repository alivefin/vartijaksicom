/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#136dec',
        'primary-hover': '#0f5bbd',
        'background-light': '#f6f7f8',
        'background-dark': '#111418',
        'surface-dark': '#1c2027',
        'surface-dark-lighter': '#282f39',
        'text-dim': '#9da8b9',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
