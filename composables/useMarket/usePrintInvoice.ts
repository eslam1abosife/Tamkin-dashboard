import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const PrintInvoice = async (id) => {
        try {
            const res = await api.post('/Market/InvoicePDF', {
                data: {
                    name: id,
                }
            });
            return{
                data:res
            }
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        PrintInvoice,
        loading,
    }
}