import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getTotalAmountPackages = async () => {
        try {
            const res = await api.post('/Packages/GetTotalRenew',{
               
              
              
            });
         
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getTotalAmountPackages,
        loading
    }
}