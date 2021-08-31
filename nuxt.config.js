export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'alternate', hreflang: 'x' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css'
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/iconfont/font/style.scss', '@/assets/css/index.sass'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    middleware: ['auth']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/redirect-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/svg',
    'cookie-universal-nuxt',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ru',
            iso: 'ru-RU',
            file: 'ru.js'
          },
          {
            code: 'en',
            iso: 'en-US',
            file: 'en.js',
            isCatchallLocale: true
          }
        ],
        detectBrowserLanguage: false,
        defaultLocale: 'ru',
        strategy: 'no_prefix',
        lazy: true,
        langDir: 'i18n/'
      }
    ]
  ],

  generate: {
    // choose to suit your project
    interval: 2000
  },

  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/dotenv',
    '@nuxtjs/composition-api/module',

    [
      '@nuxtjs/vuetify',
      {
        customVariables: ['~/assets/variables.sass'],
        theme: {
          options: {
            customProperties: true
          },
          dark: false,
          themes: {
            light: {
              //basic-color
              basic_primary: '#ffffff',
              basic_secondary: '#081529',
              basic_secondary_hue_1: '#334060',
              basic_accent_1: '#6B59CC',
              basic_accent_1_hue_1: '#7B19CB',
              basic_warning: '#FBD101',
              basic_warning_hue_1: '#DFB302',
              basic_info: '#00AF31',
              basic_info_hue_1: '#2EA716',
              basic_error: '#F21414',
              basic_error_dark_1: '#D80027',

              //scrollBar
              scrollBar_trackPiece: '#EDF0F4',
              scrollBar_thumb: '#4460EF'
            }
          }
        },
        defaultAssets: {
          icons: 'mdi'
        }
      }
    ]
  ],

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          type: 'Bearer',
          maxAge: 3600
        },
        user: {
          property: false,
          autoFetch: false
        },
        endpoints: {
          login: { url: 'sing-in', method: 'post' },
          logout: false,
          user: false
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    plugins: ['~/plugins/auth-redirect.js']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://obscur.space/mkomov-test/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  },

  server: {
    port: process.env.RUN_PORT || 3000,
    host: process.env.RUN_HOST || '0.0.0.0'
  }
};
