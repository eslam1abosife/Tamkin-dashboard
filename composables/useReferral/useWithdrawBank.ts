import { useApi } from "@/composables/useApi";
import { useNuxtApp } from "#app";

export default function () {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  //   const { $toast } = useNuxtApp();
  const withdrawStore = useWithdrawStore();

  const profileStore = useProfileStore();
  const withdraWithBank = async () => {
    try {
      console.log(profileStore.company.name , 'here company man')
      const res = await api.post("/Tamkin Withdraw Requests/Add", {
       
          ...withdrawStore.bankDetails,
          payment_type: withdrawStore.paymentMethodName,
          agency: profileStore.company.name,
          amount :Number(withdrawStore.withdrawAmount),
          crypto_currency:null,
          crypto_address:null,
          email_address:null,
          doctype:"Tamkin Withdraw Requests",

     
      });


        withdrawStore.transactionDetails = res.data.data
        withdrawStore.setBankDetails({
          bank_name: '',
          account_holder: '',
          account_number: '',
          iban: '',
          bic: '',
          account_currency: '',
        });

      return {
        data: res.data.data,
      };
    } catch (error) {
      throw error;
    }
  };

  return {
    withdraWithBank,
    loading,
  };
}
