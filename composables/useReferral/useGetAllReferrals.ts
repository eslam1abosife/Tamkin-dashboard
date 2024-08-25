import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();
const userStore = useUserStore()

  const getAllReferrals = async (agency) => {
    try {
      const res = await api.post('/Sales Invoice/Get',{
        "where":{
          sales_partner:userStore.user.user_id,

             status: "Paid"
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
    getAllReferrals,
    loading
  }
}