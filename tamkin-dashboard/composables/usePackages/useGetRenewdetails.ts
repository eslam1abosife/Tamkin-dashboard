import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const subsStore = useSubsStore()
    const messageData = ref('')
const codeStatus = ref(0)
const detailsRenew = async () => {
    try {
   
  
      const res = await api.post('/Packages/GetTotalMonyRenewAgencyPackages', {});
  
      messageData.value = res.data.message ? res.data.message : 'Please try again later or contact support';
      codeStatus.value = res.data.statusCode;
  
      return res.data.data;
    } catch (error) {
      throw typeof error === 'string' ? error : 'There is something wrong';
    }
  };
  

    


    return {
        loading,
        detailsRenew,
        messageData,
        codeStatus
    }
}