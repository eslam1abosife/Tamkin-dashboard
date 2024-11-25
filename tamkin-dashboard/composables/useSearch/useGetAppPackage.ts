import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();
const withdrawstore = useWithdrawStore()
const userStore = useUserStore()
  const getPackwebsite = async (domain) => {
    try {
      const res = await api.post(`/mySite/GetAgencyApps/${domain}`,{


      
      });
    return  res.data.data
      
  
    
    }catch (error) {
      throw error;
    }
  }

  return {
    getPackwebsite,
    loading
  }
}