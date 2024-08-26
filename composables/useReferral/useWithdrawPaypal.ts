import { useApi } from "@/composables/useApi";
import { useNuxtApp } from "#app";

export default function () {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  //   const { $toast } = useNuxtApp();
  const withdrawStore = useWithdrawStore();

  const profileStore = useProfileStore();
  const withdrawPaypal = async () => {
    try {
      
      const res = await api.post("/Tamkin Withdraw Requests/Add", {
       
          email_address:withdrawStore.paypal.paypalEmail,
          payment_type: withdrawStore.paymentMethodName,
          agency: profileStore.company.name,
          doctype:"Tamkin Withdraw Requests",
        amount:withdrawStore.withdrawAmount
     
      });


        withdrawStore.transactionDetails = res.data.data
        withdrawStore.paypal.paypalEmail = ""

      return {
        data: res.data.data,
      };
    } catch (error) {
      throw error;
    }
  };

  return {
    withdrawPaypal,
    loading,
  };
}
