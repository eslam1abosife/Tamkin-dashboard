import { useApi } from "@/composables/useApi";
import { useNuxtApp } from "#app";

export default function () {
    const { useApiInstance } = useApi();
    const { api, loading } = useApiInstance();
    //   const { $toast } = useNuxtApp();
    const withdrawStore = useWithdrawStore();

    const profileStore = useProfileStore();
    const withDrawcrypto = async () => {
        try {
            
            const res = await api.post("/Tamkin Withdraw Requests/Add", {


            
                    agency: profileStore.company.name,
                    payment_type: withdrawStore.paymentMethodName,
                    crypto_currency: withdrawStore.selectedCrypto.name,
                    crypto_address: withdrawStore.cryptoDetails.wallet,
                    amount: Number(withdrawStore.withdrawAmount),
                    doctype: "Tamkin Withdraw Requests",
                    // name:withdrawStore.selectedCrypto.name
             



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
        withDrawcrypto,
        loading,
    };
}
