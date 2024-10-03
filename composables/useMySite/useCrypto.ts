import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const mysiteStore = useMySiteStore()
    const messageData = ref('')
const codeStatus = ref(0)
    const paywithCrypto = async (hash, price,code) => {
        try {
            const res = await api.post('/Apps/post/AppsInvouceCrypto', {
          
             

                "urls":  mysiteStore.packagePayload.urls.filter((website: any) => website.url !== null).map((website: any) => website.url) ,
                "apps": mysiteStore.packagePayload.apps,
                  "coupon_code": mysiteStore.promo || null,
                  "packageName": mysiteStore.packagePayload.package,
                  "payDateType": mysiteStore.packagePayload.payDateType,//1,3.12
                  "cryptoinput": {
                    "code": code,
                    "hash": hash,
                    "crypto": mysiteStore.selectedCrypto.name,
                    "network": mysiteStore.selectedCrypto.network,
                    "date": new Date(),
                    "amount": price,
                  },
                  "upgrade":mysiteStore.updatePayment
             
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