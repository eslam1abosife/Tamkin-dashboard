import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();


  const getOrderInvoice = async () => {
    try {
      const res = await api.post('/Market/GetOrderInvoice');

    return{
        data: res.data.data
  
    }
    }catch (error) {
      throw error;
    }
  }

  return {
    getOrderInvoice,
    loading
  }
}