import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getPriceByTraffic = async (urls, packageName,apps) => {
        try {
            const res = await api.post('/Apps/GetPriceList',{
                "urls":urls,
                  "packageName": packageName,
                  "Apps":apps
            });
            if(!res.data.succeeded) throw(res.data.message);
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getPriceByTraffic,
        loading
    }
}