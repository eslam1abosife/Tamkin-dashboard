// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules:
[
  '@nuxtjs/tailwindcss',
  '@nuxtjs/google-fonts'

],
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