import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();


  const getPaymentTypes = async () => {
    try {
      const res = await api.post('/Tamkin Withdraw Payment Type/Get',{});

    return{
        data: res.data.data
  
    }
    }catch (error) {
      throw error;
    }
  }

  return {
    getPaymentTypes,
    loading
  }
}