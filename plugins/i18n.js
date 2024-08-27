export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
  
    // Fetch languages dynamically from your API
    const data = await $fetch(`${config.public.baseURL}Language/Get`, {
      method: 'POST',
      body: {
        "where": {
          "enabled": 1
        }
      }
    });
  
    // Map the response to the format expected by nuxt-i18n
    const languages =ref(data.data.map(lang => ({
        code: lang.name,
        name: lang.language_name,
        file: `${lang.name}.ts`,
        iso: lang.name === 'en' ? 'en-US' : 'ar-SA',
        dir: lang.name === 'ar' ? "rtl" : "ltr"
      })));
  
    // Set the dynamic locales
    nuxtApp.$i18n.locales = languages;
    nuxtApp.$i18n.defaultLocale = ref('en');
    nuxtApp.$i18n.langDir = ref('./locales/');
    nuxtApp.$i18n.lazy = ref(true);
  });