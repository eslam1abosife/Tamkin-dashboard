import { defineStore, acceptHMRUpdate } from 'pinia';

import {useGetPackages} from '@/composables/useAddSite'
import {useCouponCode} from "@/composables/useMarket";



export const useMySiteStore = defineStore('mysite', {
    state: () => ({
        packages:[],
        currentPackage:'',
        urls:[],
        packagePayload:'',
        selectedPaymentMethod:'',
        promo : '',
        currentDiscount:0,
        validPromo : false,
        noDiscount:false,
        loadingPromo:false,
        levelsTraffic:'',
        currentLevel:'',
        selectedCrypto:'',
        tags:[],
        validatedSites:[],
        loadingBlock:[],
        currentWebsite:'',
openedCurrentSite:false,
updatePayment:false,
currentInvoice:'',
currentType:''
       
    }),


      actions: {
        
    async addPromoCode(){
      this.loadingPromo = true
      const {ApplyCoupon,noCodeFound} = useCouponCode()
      const res = await ApplyCoupon(this.promo)
      if(res){
    
       if(res.isValid){
        this.validPromo = res.isValid
        this.currentDiscount = Number(res.discount)
        this.noDiscount = false
        this.loadingPromo = false

       }else {
        this.noDiscount = !res.isValid
        this.loadingPromo = false

       }
      }

    },
    
     removePromoCode (){
       if(this.promo){
        this.validPromo = false
        this.promo =""
        this.noDiscount =false
        this.currentDiscount = 0

       }
    },
        setCurrentPackage(pack){
          this.currentPackage = pack
        },
async getPackages(){

  const { getPakcagesAddSite } = useGetPackages()
  const packsdata = await getPakcagesAddSite();
  this.packages = packsdata.packages

}
      },
      getters:{
       
      }
,
persist: {
  storage: sessionStorage,
  paths:['currentPackage','packagePayload']
},

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMySiteStore, import.meta.hot));
}
