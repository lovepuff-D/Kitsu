/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontSize: {
        'sm': '12px',
        'base': '14px',
        'md': '16px',
        'lg': '18px',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
    },
  },
  plugins: [],
}