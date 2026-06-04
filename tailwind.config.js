/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,html}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0A2E5E',
        'primary':      '#1565C0',
        'accent':       '#42A5F5',
        'secondary': '#0053BD',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
