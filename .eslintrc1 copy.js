module.exports = {

  env: {
    browser: true,
    es2021: true,
    node: trues
  },
  
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },

  plugins: ['vue', 'prettier'],

  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        arrowParens: 'avoid',
        tabWidth: 2,
        useTabs: false
      }
    ],

    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix'
    ]
  },

  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue']
      }
    }
  }
};

