import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();
const withdrawstore = useWithdrawStore()

  const getCryptoTypes = async () => {
    try {
      const res = await api.post('/Tamkin Withdraw Crypto/Get',{});
    return{
        data: res.data.data
  
    }
    }catch (error) {
      throw error;
    }
  }

  return {
    getCryptoTypes,
    loading
  }
}