// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      meta: [
        // Remove or comment out the existing viewport meta tag if present
        // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'viewport', content: 'width=device-width, user-scalable=no' }
      ]
    }
  },
  modules:
[
  '@nuxtjs/tailwindcss',
  '@nuxtjs/google-fonts',
  '@pinia/nuxt',
  '@nuxtjs/i18n',
  '@vueuse/nuxt',
  '@nuxtjs/device',
  '@vueuse/motion/nuxt',
  // "@nuxt/image",
  // "nuxt-svgo"
],
// image: {
//   // inject: true,
//   formats: {
//     webp: {
//       quality: 20
//     }
//   },

// },

modern: 'client',
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

  prerender: {
    crawlLinks: true,
    failOnError: false, 
  },
},
watchers: {
  webpack: {
    aggregateTimeout: 300,
    poll: 1000
  }
},
vite: {
  server: {
    hmr: {
      protocol: 'ws',
      host: '0.0.0.0',  
    }
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
  lazy:false,
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.json',
      dir: "ltr"
    },
    {
      code: 'ar',
      iso: 'ar-SA',
      name: 'Arabic',
      file: 'ar.json',
      dir: "rtl"
    }
  ],
  // custom path example
},
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
    Mali:true
  }
  },
  css: [
    // '/assets/scss/fontawesome.css'
  ],
  plugins: [
    { src: '@/plugins/fontawsome.ts' },
  ],
tailwindcss: {
  cssPath: ['~/assets/scss/main.scss', { injectPosition: "first" }],
  configPath: 'tailwind.config',
  exposeConfig: {
    level: 2
  },
  config: {},
  viewer: false,
}

})