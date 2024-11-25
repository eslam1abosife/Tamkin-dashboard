

export async function fetchTranslations(locale: string) {
    const response = await fetch(`https://api.tamkin.app/v1/api/Translation/Get/${locale}`);
    const data = await response.json();
    
    // Assuming the API response is structured as mentioned
    const translations = {};
    data.forEach((item) => {
        translations[item.source_text] = item.translated_text;
    });
    
    return translations;
}
