// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    devtools: {
        enabled: true
    },
    typescript: {
        typeCheck: false
    },
    modules: [
        '@pinia/nuxt',
    ],
    components: [
        {
            path: 'modules',
            extensions: ['.vue'],
            prefix: 'Modules',
        },
        {
            path: 'components',
            extensions: ['.vue'],
            prefix: 'Components',
        },
        {
            path: 'ui',
            extensions: ['.vue'],
            prefix: 'UI',
        },
    ],
    runtimeConfig: {
        public: {
            host: process.env.baseAPIPath
        }
    },
})
