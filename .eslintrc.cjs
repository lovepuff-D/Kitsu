module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: [
        '@nuxt/eslint-config',
        'plugin:vue/vue3-essential',
        //'plugin:vue/vue3-recommended', - uses in @nuxt/eslint-config
        'plugin:vue/vue3-strongly-recommended',
    ],
    plugins: [],
    rules: {
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/html-indent': [
            'error',
            4,
            {
                'attribute': 1,
                'baseIndent': 1,
                'closeBracket': 0,
                'alignAttributesVertically': true,
                'ignores': []
            }
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                'singleline': 2,
                'multiline': {
                    'max': 1
                }
            }
        ],
    },
}
