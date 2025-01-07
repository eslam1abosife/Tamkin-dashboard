// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  // sourcemap: false,
  runtimeConfig: {
    public: {
      //baseURL: process.env.BASE_URL || 'https://api.tamkin.app/v1/api/',
      baseURL: "https://api.tamkin.app/v1/api/",
      // baseURL:  'https://localhost:7096/v1/api/',
      baseImagerUrl: "https://api.tamkin.app/",
    },
  },

  optimizeDeps: {
    // include: ["@/ck-vue"],
  },
  build: {
    // commonjsOptions: {
    //   include: ["@/ck-vue"],
    // },
    // transpile: ['@tiptap/vue-3', '@tiptap/starter-kit', '@tiptap/extension-*'],
  },

  // vite: {
  //   server: {
  //     cors: true,
  //     watch: {
  //       usePolling: true,
  //     },
  //     hmr: {
  //       protocol: 'ws',
  //       host: 'localhost',
  //       port: 24679,
  //     },
  //   },
  // },
  routeRules: {
    // Set prerender to true to configure it to be prerendered
    // "/packages/*": { prerender: false },
    // "/ar/packages/*": { prerender: false },
  },
  vite: {
    // build: {
    //   rollupOptions: {
    //     external: ['@tiptap/pm/state'],
    //   },
    // },

    // server: {
    //   proxy: {
    //     "/api": {
    //       target: "https://chat.tamkin.app",
    //       changeOrigin: true,
    //       secure: false,
    //       rewrite: (path) => path.replace(/^\/api/, ""),
    //       configure: (proxy, options) => {
    //         proxy.on("proxyRes", (proxyRes, req, res) => {
    //           proxyRes.headers["Access-Control-Allow-Origin"] =
    //             "http://localhost:3000";
    //           proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
    //         });
    //       },
    //     },
    //   },
    // },
  },

  app: {
    head: {
      meta: [
        // Define your meta tags here
      ],
      link: [
        {
          rel: "stylesheet",
          href: `https://cdn.tamkin.app/app.css?v=${new Date().getTime()}`, // Use a timestamp to bypass caching
        },
      ],
      script: [
        // {
        //   src: 'https://cdn.tamkin.app/widget.js',
        //   defer: true,
        //   'data-tamkin-account': '8bo30ucpue',
        // }
      ],
      //   script: [
      //     {
      //       src: "https://cdn.tamkin.app/runtime.js",
      //       // async: true,
      //       defer: true
      //     },
      //     {
      //       src: `https://cdn.tamkin.app/app.js?v=${new Date().getTime()}`, // Use a timestamp to bypass caching
      //       // async: true,
      //       defer: true
      //     }
      //   ]
    },
  },

  modules: [
    // "nuxt-security",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/device",
    "@vueuse/motion/nuxt",
    "@nuxtjs/color-mode",

    // '@productdevbook/chatwoot'

    // '@element-plus/nuxt'
    // "@nuxt/image",
    // "nuxt-svgo"
  ],

  // chatwoot: {

  //   init: {
  //     websiteToken: 'qM3zrPHquyCKhrRs5Nj6XYVR',
  //     baseUrl:'https://chat.tamkin.app'
  //   },
  //   settings: {
  //     hideMessageBubble: false,

  //     locale: 'en',
  //     position: 'right',
  //     type: "expanded_bubble",
  //     launcherTitle: "Chat with us",
  //     showPopoutButton: true,

  //     // ... and more settings
  //   },
  //   // If this is loaded you can make it true, https://github.com/nuxt-modules/partytown
  //   partytown: false,
  // },
  // security: {
  //   // options
  //   corsHandler: {

  //   credentials:true

  // },
  // },
  // elementPlus: {
  //   icon: 'ElIcon',
  //   importStyle: 'scss',
  //   components: ['ElLoading']
  // },
  colorMode: {
    preference: "light", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found

    classSuffix: "",

    storageKey: "tamkin-color-mode",
  },
  // image: {
  //   // inject: true,
  //   formats: {
  //     webp: {
  //       quality: 20
  //     }
  //   },

  // },

  // modern: 'client',
  // components: {
  //   dirs: [
  //     {
  //       path: '@/components',
  //       extensions: ['vue'],
  //       prefix: 'Lazy',
  //       chunkNamePrefix: 'components/'
  //     }
  //   ]
  // },
  nitro: {
    compressPublicAssets: true,

    // prerender: {
    //   crawlLinks: true,
    //   failOnError: false,
    // },
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },

  // render: {
  //   static: {
  //     maxAge: '1y', // Cache static files for one year
  //     setHeaders(res) {
  //       res.setHeader('Cache-Control', 'public, max-age=31536000')
  //     }
  //   }
  // },
  device: {
    refreshOnResize: true,
  },

  // webpack:{
  //   extractCSS: true
  // },
  // build: {

  //     splitChunks: {
  //       layouts: true,
  //       pages: true,
  //       commons: true

  //   }
  // },

  i18n: {
    fallbackWarn: false,
    missingWarn: false,
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
    strategy: "prefix_and_default",
    detectBrowserLanguage: false,
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.ts",
        dir: "ltr",
      },
      {
        code: "ar",
        iso: "ar-SA",
        name: "Arabic",
        file: "ar.ts",
        dir: "rtl",
      },
    ],
    fallbackLocale: "en", // Ensure no fallback
  },

  plugins: ["~/plugins/i18n.js"],

  googleFonts: {
    preload: true,
    families: {
      Poppins: {
        wght: [100, 200, 300, 400, 500, 600, 700],
        ital: [100, 200, 300, 400, 500, 600, 700],
      },
      Inter: ["100", "200", "300", "400", "500", "600", "700"],
      Lato: [100, 200, 300, 400, 500, 600, 700],
      Manrope: [100, 200, 300, 400, 500, 600, 700],
      Mali: true,
      Almarai: [100, 200, 300, 400, 500, 600, 700, 800],
    },
  },

  css: [
    // '/assets/scss/fontawesome.css'
  ],

  // plugins: [
  //   { src: '@/plugins/fontawsome.ts' },
  // ],
  plugins: [
    { src: "~/plugins/ckeditor.ts", mode: "client" },
    { src: "~/plugins/vue-tel-input.ts", mode: "client" },
  ],

  tailwindcss: {
    cssPath: ["~/assets/scss/main.scss", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: false,
  },

  compatibilityDate: "2024-07-17",
});
