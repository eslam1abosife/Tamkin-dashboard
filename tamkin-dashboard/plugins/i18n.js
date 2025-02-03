export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  // Fetch languages dynamically from your API
  // const data = await $fetch(`${config.public.baseURL}Language/Get`, {
  //   method: 'POST',
  //   body: {
  //     where: {
  //       enabled: 1
  //     }
  //   }
  // });

  // Map the response to the format expected by nuxt-i18n
  // const languages = ref(data.data.map(lang => ({
  //   code: lang.name,
  //   name: lang.language_name,
  //   file: `${lang.name}.ts`,
  //   iso: lang.name === 'en' ? 'en-US' : 'ar-SA',
  //   dir: lang.name === 'ar' ? "rtl" : "ltr"
  // })));
  const languages = ref([
    {
      code: 'en',
      name: 'English - EN',
      file: 'en.ts',
      iso: 'en-US',
      dir: 'ltr'
    },
    {
      code: 'ar',
      name: 'العربية - AR',
      file: 'ar.ts',
      iso: 'ar-SA',
      dir: 'rtl'
    }
  ]);

  // Set the dynamic locales
  nuxtApp.$i18n.locales = languages;
  nuxtApp.$i18n.defaultLocale = ref('en');
  nuxtApp.$i18n.langDir = ref('./locales/');
  nuxtApp.$i18n.lazy = ref(true);

  // Define a global loading state for the language switch
  const isLanguageLoading = ref(false);

  // Hook into the language switch event

  const updateChatwootOnLanguageChange = () => {
    // Ensure the widget is closed and hidden
    // if (window.$chatwoot) {
    //   window.$chatwoot.toggle("close");
    //   window.$chatwoot.toggleBubbleVisibility("hide");
    // }
  
    const userLanguage = nuxtApp.$i18n.locale.value;
  

    nuxtApp.$reinitializeChatwoot();
    // alert('reinstialized')
    if (window.$chatwoot) {
      window.$chatwoot.setLocale(userLanguage);
    }
  
  
  };
  nuxtApp.$i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
    console.log("Before switching:", oldLocale, "->", newLocale);
    isLanguageLoading.value = true; // Show loader
    console.log("isLanguageLoading (before):", isLanguageLoading.value);
  };
  
  nuxtApp.$i18n.onLanguageSwitched = async (oldLocale, newLocale) => {
    isLanguageLoading.value = false; 

    // console.log("Switched from:", oldLocale, "to:", newLocale);
    // await updateChatwootOnLanguageChange();
    // alert('flag updated ')
    // console.log("isLanguageLoading (after):", isLanguageLoading.value);
  };
  
  nuxtApp.provide('langloader', isLanguageLoading);


});
