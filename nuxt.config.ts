// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  sourcemap: false,

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://api.tamkin.app/v1/api/',
    //  baseURL:  'https://localhost:7096/v1/api/',
      baseImagerUrl: 'https://tamkin.app/'
    }
  },

  optimizeDeps: {
    include: ['@/ck-vue'],
  },
  build: {
    commonjsOptions: {
      include: ['@/ck-vue'],
    },
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
    build: {
      rollupOptions: {
        external: ['@tiptap/pm/state'],
      },
    },

    server: {
      proxy: {
        '/api': {
          target: 'https://chat.tamkin.app',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyRes', (proxyRes, req, res) => {
              proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
              proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
            });
          },
        },
      },
    },
  },

  app: {
    head: {
      meta: [
        // Remove or comment out the existing viewport meta tag if present
        // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        
      ],
// script: [
//         {
//           children: `
//             (function(d,t) {
//               var BASE_URL="https://chat.tamkin.app";
//               var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
//               g.src=BASE_URL+"/packs/js/sdk.js";
//               g.defer = true;
//               g.async = true;
//               s.parentNode.insertBefore(g,s);
//               g.onload=function(){
//                 window.chatwootSDK.run({
//                   websiteToken: 'qM3zrPHquyCKhrRs5Nj6XYVR',
//                   baseUrl: BASE_URL
//                 })
//               }
//             })(document,"script");
//           `,
//           defer: true,
//         async: true,
//         body: true
//         }
//       ]
    }
  },

  modules:
[

  // "nuxt-security",
  '@nuxtjs/tailwindcss',
  '@nuxtjs/google-fonts',
  '@pinia/nuxt',
'@pinia-plugin-persistedstate/nuxt',
  '@nuxtjs/i18n',
  '@vueuse/nuxt',
  '@nuxtjs/device',
  '@vueuse/motion/nuxt',
  '@nuxtjs/color-mode',

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
  preference: 'light', // default value of $colorMode.preference
  fallback: 'light', // fallback value if not system preference found

  classSuffix: '',

  storageKey: 'tamkin-color-mode'
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
    compressPublicAssets:true,

    // prerender: {
    //   crawlLinks: true,
    //   failOnError: false, 
    // },
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
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
    refreshOnResize: true
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
    defaultLocale: 'en',
    // Specify the directory where the language files are stored
    langDir: './locales/',
    // Define the available locales
    lazy:true,
    strategy: 'prefix_and_default',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.ts',
        dir: "ltr"
      },
      {
        code: 'ar',
        iso: 'ar-SA',
        name: 'Arabic',
        file: 'ar.ts',
        dir: "rtl"
      }
    ],
    // custom path example
    
  },
  plugins: ['~/plugins/i18n.js'],

  googleFonts: {
    preload:true,
    families: {
      Poppins: {
        wght: [100,200,300,400,500,600,700],
          ital: [100,200,300,400,500,600,700],
      },
      Inter:['100','200','300','400','500','600','700'],
      Lato:[100,200,300,400,500,600,700],
      Manrope:[100,200,300,400,500,600,700],
      Mali:true,
      Almarai:[100,200,300,400,500,600,700,800]
    }
    },

  css: [
    // '/assets/scss/fontawesome.css'
  ],

  // plugins: [
  //   { src: '@/plugins/fontawsome.ts' },
  // ],
  plugins: [{ src: '~/plugins/ckeditor.ts', mode: 'client' }, { src: '~/plugins/vue-tel-input.ts', mode: 'client' }],

  tailwindcss: {
    cssPath: ['~/assets/scss/main.scss', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: false,
  },

  compatibilityDate: '2024-07-17'
})
