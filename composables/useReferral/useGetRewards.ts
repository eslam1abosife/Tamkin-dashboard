import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();

const profileStore = useProfileStore()
  const getAllRewards = async () => {
    try {
        const res = await api.post('/Sales Invoice/Get',{
            "where":{
                "sales_partner":profileStore.member.email_address
            },
          "PgSize":3000
          });
    return{
        data: res.data.data
  
    }
    }catch (error) {
      throw error;
    }
  }

  return {
    getAllRewards,
    loading
  }
}