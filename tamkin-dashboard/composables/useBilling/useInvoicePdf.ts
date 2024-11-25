import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const invoicesStore = useInvoicesStore();


    const invoicePdf = async (data) => {
        try {
            console.log('data',data)
            const res = await api.post('/Billing/InvoicePDF',{
            data :{name:data}
            });
            console.log('res',res)

            invoicesStore.pdfLink = res.data.data;
        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        invoicePdf,
        loading
    }
}
