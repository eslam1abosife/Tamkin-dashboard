import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const marketStore = useMarketStore()
    const paywithCrypto = async (hash) => {
        try {
            const res = await api.post('/Market/BuyWithCrypto', {
                "code": marketStore.promo || null,
                "hash": hash,
                "crypto": marketStore.selectedCrypto.name,
                "network": marketStore.selectedCrypto.network
             
            });
        
         return res.data.data
            
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    


    return {
        loading,
        paywithCrypto
    }
}