import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const savedCards = ref([]);
    const billingStore = useBillingStore();


    const getCards = async () => {
        try {
            const res = await api.post('/Billing/GetCards');

            billingStore.cards = res.data.data;
            // if (res && res.data) {
            //     // savedCards.value = res.data.data; // Update savedCards with the fetched data
            //     billingStore.cards = res.data.data; // Update savedCards with the fetched data
            // }
            console.log('savedCards.value', savedCards.value); // Corrected logging
        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getCards,
        savedCards,
        loading
    }
}
