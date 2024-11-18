import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const statsStore = useStatsStore()


    const getoverviewstats  = async () => {
        try {
            const res = await api.post('/Statistic/GetStatisticAccessabilityOverViewWebsite');

            statsStore.overviewStats = {
                liveTranslation:res.data.data.avg_translate,
                total:res.data.data.live_transaction.totla,
                usage: res.data.data.live_transaction.usage,
page: res.data.data.live_transaction.page,
user: res.data.data.live_transaction.user,
details:res.data.data.accessibility_detailis,
used:res.data.data.most_used
            }
            return res.data.data;
        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getoverviewstats,
        loading
    }
}
