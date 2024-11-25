import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getjoinPageData = async () => {
        try {
            const res = await api.post('/Page Cards/Details',{
                uid:'package_investor_how_to_join1'
            });
            if(!res.data.succeeded) throw(res.data.message);
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getjoinPageData,
        loading
    }
}