import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();
const withdrawstore = useWithdrawStore()
const userStore = useUserStore()
  const searchWebsite = async (domain) => {
    try {
      const res = await api.post('/Apps/Search',{

        
            "where":{
                "agency":userStore.user.agency,
                "type":"website",
                "app_domain":domain
        
            }
         ,"PgSize":5000
      
      });
    return  res.data.data
      
  
    
    }catch (error) {
      throw error;
    }
  }

  return {
    searchWebsite,
    loading
  }
}