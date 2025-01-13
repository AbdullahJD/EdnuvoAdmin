

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3001, // تغيير المنفذ إلى 3001
    host: '0.0.0.0', // التأكد من السماح بالوصول من أي عنوان IP
  },

  router: {
    base: '/admin', // تأكد من أن التطبيق يتوقع العمل في المسار /admin
    middleware: ['auth'], // إذا كنت تستخدم middleware للتحقق من الدخول
  },

  head: {
    titleTemplate: '%s - ednuvoadmin',
    title: 'ednuvoadmin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify', '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://www.ednuvo.com/', // Used as fallback if no runtime config is provided
    credentials: true,
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/',
    },
  },

  auth: {
    strategies: {
      local: {
        url: 'https://www.ednuvo.com/',
        token: {
          property: 'token',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: '',
        },
        endpoints: {
          login: { url: '/api/admin/token' },
          logout: { url: '/api/admin/logout' },
          user: { url: '/api/user', method: 'get', property: false },
        },
      },
    },
  },

  googleFonts: {
    families: {
      Cairo: true,
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,

    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#FD8F06',
          background: '#ECEEF1',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['defu'],
  },
}
