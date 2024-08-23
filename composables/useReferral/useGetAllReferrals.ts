import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();


  const getAllReferrals = async (agency) => {
    try {
      const res = await api.post('/Tamkin Withdraw Requests/Get',{
        "where":{
          "agency":agency
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