import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const addNewCard = async (data) => {
        try {
            const res = await api.post('/Billing/AddNewCard',{
                data :data
            });
            console.log('addNewCard',res.data);

        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        addNewCard,
        loading
    }
}
