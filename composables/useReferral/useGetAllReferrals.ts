import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
//   const { $toast } = useNuxtApp();
const userStore = useUserStore()
const withdrawStore = useWithdrawStore()
const profileStore = useProfileStore()
  const getAllReferrals = async (agency) => {
    try {
      const res = await api.post('/Sales Invoice/Get',{
        "where":{
          sales_partner:profileStore.company.ref_sales_partner,

             status: "Paid"
      },
      "PgSize":3000
      });
      withdrawStore.Allrefs = res.data.data

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