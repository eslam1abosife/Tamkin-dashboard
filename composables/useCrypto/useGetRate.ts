import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const cryptostore = useCryptoStore()
    const getRatesCrypto = async () => {
        try {
            const res = await api.post('/Crypto/GetRates', {
             
            });
            if(!res.data.succeeded) throw(res.data.message);
            cryptostore.rates = res.data.data;
            return res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getRatesCrypto,
        loading
    }
}