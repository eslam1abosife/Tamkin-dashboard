// export default defineI18nLocale(async (locale) => {
//     const response = await $fetch(`https://api.tamkin.app/v1/api/Translation/Get/${locale}`, { 
//       method: 'POST',
//       body: {}
//     });
//     const translations = response.data.reduce((acc, item) => {
//       acc[item.source_text] = item.translated_text;
//       return acc;
//     }, {});
//     return translations;
//   });
export default {};