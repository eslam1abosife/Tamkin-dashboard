import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const noCodeFound = ref(false)
    const ApplyCoupon = async (code = null) => {
        try {
            const res = await api.post('/Market/CouponCodeIsValid', {
              data:{
                "name":code
              }
             
            });
            // if(!res.data.succeeded) throw(res.data.message);
         
           
            
            return {
                discount: (typeof res.data.data === 'object' && res.data.data !== null && Object.keys(res.data.data).length > 0) || typeof res.data.data === 'string' ? res.data.data : false,
                isValid: (typeof res.data.data === 'object' && res.data.data !== null && Object.keys(res.data.data).length > 0) || typeof res.data.data === 'string'
            };
            
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    


    return {
        noCodeFound,
        loading,
        ApplyCoupon
    }
}