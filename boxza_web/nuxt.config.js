const colors = require('vuetify/es5/util/colors').default
const pkg = require('./package')

module.exports = {
  mode: 'universal',
  srcDir: 'src/',
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'BOXZA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#efc14e' },
  /*
  ** Global CSS
  */
  css: [
    './node_modules/bootstrap/scss/bootstrap.scss',
      './src/assets/style/font.css',
    './node_modules/vuetify/dist/vuetify.min.css',
    // './src/assets/style/standard-class.scss',
    './node_modules/font-awesome/css/font-awesome.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
    'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/checkLogin.js', ssr: false },
    { src: '~/plugins/firebase.plugin.js', ssr: false },
    { src: '~/plugins/paypal.js', ssr: false },
    { src: '~/plugins/vue-carousel.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/bulma',
    'bootstrap-vue/nuxt'
  ],
  /*
  ** router module configuration
  */
  router: {
    middleware: 'redirect',
    extendRoutes(routes, resolve) {
      // Automatically map all route params to component props:
      for (const route of routes) {
        route.props = /:/.test(route.path)
      }
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: '/api',
    credentials: true,
    proxy: false,
    debug: false,
    // debug: process.env.NODE_ENV !== 'production',
    requestInterceptor: (config, { store }) => {
      config.headers.common['Authorization'] = ''
      config.headers.common['Content-Type'] = 'application/json'
      return config
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
    }
  },
  serverMiddleware: [
    // API middleware
    '~/services/api'
  ]
}
