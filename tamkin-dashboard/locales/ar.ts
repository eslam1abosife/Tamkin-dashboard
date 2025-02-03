// export default defineI18nLocale(async (locale) => {
//   const config = useRuntimeConfig()
//     const response = await $fetch(`${config.public.baseURL}Translation/Get/${locale}`, { 
//       method: 'POST',
//       body: {}
//     });

//     const translations = response.data.reduce((acc, item) => {
//       acc[item.source_text] = item.translated_text;
//       return acc;
//     }, {});
//     return translations;
//   });
{}