export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  // Fetch languages dynamically from your API
  const data = await $fetch(`${config.public.baseURL}Language/Get`, {
    method: 'POST',
    body: {
      where: {
        enabled: 1
      }
    }
  });

  // Map the response to the format expected by nuxt-i18n
  const languages = ref(data.data.map(lang => ({
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

  // Define a global loading state for the language switch
  const isLanguageLoading = ref(false);

  // Hook into the language switch event
  nuxtApp.$i18n.onBeforeLanguageSwitch = () => {
    isLanguageLoading.value = true; // Show the loader
  };

  nuxtApp.$i18n.onLanguageSwitched = () => {
    isLanguageLoading.value = false; // Hide the loader after switching
  };

  // Provide the loading state so it can be used globally
  nuxtApp.provide('langloader', isLanguageLoading);


});
