/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './modules/**/*.{js,vue,ts}',
        './ui/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
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
