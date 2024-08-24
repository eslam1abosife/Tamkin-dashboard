import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const invoicesStore = useInvoicesStore();


    const getInvoices = async () => {
        try {
            const res = await api.post('/Billing/GetInvoices');
            console.log(res.data.data);
            invoicesStore.invoices = res.data.data;

        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getInvoices,
        loading
    }
}
