import { defineStore } from "pinia";

import { usewithdraWithBank ,useGetRewards,useGetCryptoList,useWithdrawcrypto,useWithdrawPaypal} from "@/composables/useReferral";
import { useApi } from "@/composables/useApi";




export const useWithdrawStore = defineStore("withdraw", {
  state: () => ({
    paymentMethodName:'',

    bankDetails:{
        bank_name: '',
        account_holder: '',
        account_number: '',
        iban: '',
        bic: '',
        account_currency: '',
    },
    withdrawAmount:0,
    transactionDetails:{},
    rewards:[],
    selectedPaymentMethod:'',
    cryptoTypes:[],
    selectedCrypto:'',
    cryptoDetails:{
        wallet:''
    },
    currentAmount:0,
    limitofWithdraw:0,
    currentRate:0,
    cyrptoTransactionDetails:'',
    paypal:{
      paypalEmail:''
    }
  }),



  actions: {
    async setCryptoList(){
        const { getCryptoTypes } = useGetCryptoList();
        const d = await getCryptoTypes()

        this.cryptoTypes = d.data
    },
    setBankDetails(details: Record<string, any>) {
        this.bankDetails = details;
      },
      
    async withDrawBank(){
        const { withdraWithBank } = usewithdraWithBank();

        await withdraWithBank()

        this.bankDetails = {}
this.withdrawAmount = 0
this.paymentMethodName = ''
this.getAllrewards()

    },
    async withdrawpaypal(){
      const { withdrawPaypal } = useWithdrawPaypal();

      await withdrawPaypal()

      // this.paypal.paypalEmail = {}
this.withdrawAmount = 0
this.paymentMethodName = ''
this.getAllrewards()

  },
    async withdrawcrypto(){
        const { withDrawcrypto } = useWithdrawcrypto();

        await withDrawcrypto()

        this.selectedCrypto = ''
this.cryptoDetails.wallet = ''
this.getAllrewards()

    },
    async gettotalAmount(){
try{
    const { useApiInstance } = useApi();

    
  const { api, loading } = useApiInstance();

  const res = await api.post("/Referral/GetTotal");
 
       this.currentAmount = res.data.data


    } catch (error) {
        throw error;
      }
    },
    async getcurrentLimit(){
        try{
            const { useApiInstance } = useApi();
        
            
          const { api, loading } = useApiInstance();
        
          const res = await api.post("/Referral/GetLimit");
         
               this.limitofWithdraw = res.data.data
        
        
            } catch (error) {
                throw error;
              }
            },
            async getcurrentRate(){
                try{
                    const { useApiInstance } = useApi();
                
                    
                  const { api, loading } = useApiInstance();
                
                  const res = await api.post("/Referral/GetReferralRate");
                 
                       this.currentRate = res.data.data
                
                
                    } catch (error) {
                        throw error;
                      }
                    },
    async getAllrewards(){
        const {getAllRewards} = useGetRewards();

       const getrewards =  await getAllRewards()

        this.rewards = getrewards.data
    }
    },
 




  getters: {
  }
});
