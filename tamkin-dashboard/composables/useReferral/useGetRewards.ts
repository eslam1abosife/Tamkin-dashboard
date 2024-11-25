import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();

const profileStore = useProfileStore()
const user = JSON.parse(localStorage.getItem('user'));

  const getAllRewards = async () => {
    try {
        const res = await api.post('/Referral/WithdrawRequests',{
            "where":{
              "agency":user.agency

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