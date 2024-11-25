import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const statsStore = useStatsStore()


    const getStatsAccessibility  = async () => {
        try {
            const res = await api.post('/Statistic/GetAccessabilityStatistic');

            statsStore.chartsData = res.data.data.loadsandopen
            statsStore.liveTranslationStats= {
                pages:res.data.data.pages,
                translate_langs : res.data.data.translated_languages,
                header:res.data.data.live_translation,
                // total:res.data.data.totla

            }
            statsStore.functionStats = res.data.data.function.function
            statsStore.profileStats = res.data.data.function.profiles
// profileStats
            return res.data.data;
        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getStatsAccessibility,
        loading
    }
}
