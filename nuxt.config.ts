// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules:
[
  '@nuxtjs/tailwindcss',
  '@nuxtjs/google-fonts'
  ,    '@pinia/nuxt',
  '@nuxtjs/i18n'


],
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
  families: {
    Poppins: [100,200,300,400,500,600,700],
  }
  },
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