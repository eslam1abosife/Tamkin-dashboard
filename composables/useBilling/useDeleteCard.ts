import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const billingStore = useBillingStore();


    const deleteCard = async (name) => {
        try {
            name = billingStore.card.name
            const res = await api.post('/Billing/DeleteCard',{
                data : {name:name}
            });

            console.log('deleteCard--->',res.data);

        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        deleteCard,
        loading
    }
}
