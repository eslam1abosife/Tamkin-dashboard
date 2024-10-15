import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    // const customizeStore = useCustomizeStore();


    const getMainMenu  = async () => {
        try {
            const res = await api.post('/Widget/GetAccessibility/default');

            // billingStore.cards = res.data.data;

            return res.data.data;
        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getMainMenu,
        loading
    }
}
