import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    // const customizeStore = useCustomizeStore();


    const setOptions  = async (data) => {

        console.log('data to be set ',data)
        try {
            const res = await api.post('/Custom/SetOptions',{
                AppName:"default",
                Options:data,
                 });

            // billingStore.cards = res.data.data;

            console.log('GetAccessibility', res.data.data);

            return res.data.data;
        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        setOptions,
        loading
    }
}
