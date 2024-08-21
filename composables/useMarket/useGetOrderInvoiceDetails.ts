import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();



const getOrderInvoiceDetails = async (name:string) => {
    try {
      const res = await api.post('/Market/GetInvoiceDetails',{
        data:{
            name:name
        }
      });

    return{
        data: res.data.data
    }
    }catch (error) {
       throw error;
    }
  }

  return {
    getOrderInvoiceDetails,
    
    loading
  }
}