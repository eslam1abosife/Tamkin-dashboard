import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();
const userStore = useUserStore()
const withdrawStore = useWithdrawStore()
  const getcustomerCount = async (agency) => {
    try {
      const res = await api.post('/Referral/GetCustomerCount');
      withdrawStore.refsCount = res.data.data

    return{
        data: res.data.data
  
    }
    }catch (error) {
      throw error;
    }
  }

  return {
    getcustomerCount,
    loading
  }
}