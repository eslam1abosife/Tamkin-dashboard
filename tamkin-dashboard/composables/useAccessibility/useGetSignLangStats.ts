import { useApi } from "@/composables/useApi";
import { useNuxtApp } from "#app";

export default function () {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  const { $toast } = useNuxtApp();
  const statsStore = useStatsStore();

  const getStatsSignLanguage = async () => {
    try {
      const res = await api.post("/Statistic/GetSignLangugaeStatistic");

      statsStore.chartsData = res.data.data.loadsandopen;
      statsStore.translation_quality = res.data.data.translation_quality;
      statsStore.signLangFunctions = res.data.data.function;
      statsStore.sign_languageStats = res.data.data.sign_language;
      statsStore.languages = res.data.data.languages;
      statsStore.pagesTranslated = res.data.data.pages;

      // profileStats
      return res.data.data;
    } catch (error) {
      console.error(error); // Better error handling
      throw typeof error === "string" ? error : "There is something wrong";
    }
  };

  return {
    getStatsSignLanguage,
    loading,
  };
}
