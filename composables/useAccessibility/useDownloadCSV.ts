import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    // const customizeStore = useCustomizeStore();


    const downloadChartCsv  = async () => {
        try {
            const res = await api.post('/Statistic/DownloadAccessabilitySheet');

            // billingStore.cards = res.data.data;

            return res.data.data;
        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        downloadChartCsv,
        loading
    }
}
