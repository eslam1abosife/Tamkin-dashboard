import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const updatedCards = ref([]);
    const billingStore = useBillingStore();

    const updateCard = async (data) => {
        try {
            const res = await api.post('/Billing/Stripe/UpdateCard',{
                data
            });

            billingStore.cards = res.data.data; // Update state with the fetched data

            if (res && res.data) {
                updatedCards.value = res.data.data; // Update updatedCards with the fetched data
            }

        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        updateCard,
        updatedCards,
        loading
    }
}
