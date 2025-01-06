import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const response = ref();
    const billingStore = useBillingStore();


    const addNewCard = async (data) => {
        try {
            console.log('New Card data to store',data);

            const res = await api.post('/Billing/AddNewCard',{
                data :data
            });

            console.log('add New Card',res.data);
            response.value = res.data
            billingStore.addCardRes = res.data; 


        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };
    const addNewCardToStripe = async (id,primary) => {
        try {

            const res = await api.post('/Billing/Stripe/AddCard',{
                data :{
                    "token_id":id,
                    "is_primary":primary ? primary:false
                }
            });

            response.value = res
            // billingStore.addCardRes = res.data; // Update state with the fetched data


        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };
    return {
        addNewCard,
        response,
        loading,
        addNewCardToStripe
    }
}
