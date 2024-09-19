import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const marketStore = useMarketStore()
    const messageData = ref('')
const codeStatus = ref(0)
    const paywithCrypto = async (hash, price) => {
        try {
            const res = await api.post('/Market/BuyWithCrypto', {
                "code": marketStore.validPromo ? marketStore.promo : null,
                "hash": hash,
                "crypto": marketStore.selectedCrypto.name,
                "network": marketStore.selectedCrypto.network,
                "date":new Date(),
                "amount":price
             
            });
            messageData.value = res.data.message ? res.data.message : 'Please try again later or contact support'
            codeStatus.value = res.data.statusCode
         return res.data.data
            
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    


    return {
        loading,
        paywithCrypto,
        messageData,
        codeStatus
    }
}