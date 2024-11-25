import { defineStore, acceptHMRUpdate } from 'pinia';
import {useGetCryptoList,useGetRate} from '@/composables/useCrypto'




export const useCryptoStore = defineStore('crypto', {
    state: () => ({
        list:[],
        rates:[],
        
      
    }),


      actions: {
       async setCryptoList(){
            const {getCryptoList } = useGetCryptoList()

            const l_ = await getCryptoList()
            this.list = l_
        },
        async getRates(){
            const {getRatesCrypto } = useGetRate()

            const l_ = await getRatesCrypto()
            this.rates = l_
        }
      }


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot));
}
