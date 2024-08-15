<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import mysiteAnimation from "/assets/animation/mysite.json";
import { useModalManager } from '@/composables/useModalManager';
import { useVuelidate } from "@vuelidate/core";
import {useGetAppInvites} from '@/composables/useTeam';
import { useDeleteApp, useRestoreApp } from "@/composables/useMySite";
const { getInviteApps, defaultApp, apps } = useGetAppInvites();

const getApps = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  await getInviteApps({agency: user.agency});
}
onMounted( () => {
  getApps();
});

import { required, email, sameAs } from "@vuelidate/validators";
import {watch, computed, ref} from "vue";

definePageMeta({
  layout: "dashboard",
});
const state = reactive({
  teamName: "",
});
const rules = {
  teamName: { required },
};

const v$ = useVuelidate(rules, state);

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  lastEventCall,
  eventCounter,
  setData
} = useModalManager();





const checkAll = computed({
  get() {
    return deletedSites.value && checked.value.length === deletedSites.value.length;
  },
  set(value) {
    checked.value = value ? deletedSites.value.map((lang) => lang.id) : [];
  },
});
const localePath = useLocalePath();

const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  currentPage.value = 1;
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};


const projectNameArr = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Pending' },
  { id: 3, name: 'Expired' },
  { id: 6, name: 'Canceled' },

];
const handleSelectedItemProjectName = (item: any) => {
  console.log(item)
};




</script>

<template>
  <div class=" w-full mx-auto">
    <div class="space-y-[10px] ">
      <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
      Subscriptions
      </h1>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      Subscriptions manage and renew your services plans for continuous access to premium features
      </h2>
    </div>


  

<div class="grid grid-cols-12 mt-[16px] gap-4 ">
  <div class="flex flex-col items-start justify-center ipad-max:col-span-12 col-span-8 ">
    <div class="flex items-center justify-center  space-x-[16px] w-full ">
      <div class="bg-white rounded-[10px] p-[10px] w-full shadow-sm shadow-y-[-0.2px]">
        <div class="flex items-center justify-start space-x-2 mb-4">
          <img src="/imgs/prem_plan.png" alt="Premium Icon" class="w-[43px] h-[43px]" />
          <h3 class="text-[14px]  font-[600] leading-[21px] text-black ">Premium Plan</h3>
        </div>
      
        <div class="space-y-2  ">
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Status:</span> 
            <span class="text-[#2DADA3] font-[600] text-[13px] leading-[19px]">Active</span>
          </p>
      
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Start Date:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">May 11 ,2024</span>
          </p>
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Next Billing Date:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">May 11 ,2024</span>
          </p>
    
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Payment Method:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">Credit Card (**** 1234)</span>
          </p>
        </div>
      
        <div class="mt-4 flex space-x-4">
          <button class="btn-dashboard hover_tamkin !text-[10px] font-[500] leading-[15px] whitespace-nowrap w-2/4  !h-[30px] ">
            Upgrade Now
          </button>
          <button class="btn_bordered_dashboard !text-[10px] font-[500]   whitespace-nowrap w-2/4 !h-[30px] ">
            Cancel Subscription
          </button>
        </div>
      </div>
      
      <div class="bg-white rounded-[10px] p-[10px] w-full shadow-sm shadow-y-[-0.2px]">
        <div class="flex items-center justify-start space-x-2 mb-4">
          <img src="/imgs/basic_plan.png" alt="Premium Icon" class="w-[43px] h-[43px]" />
          <h3 class="text-[14px]  font-[600] leading-[21px] text-black ">Basic Plan</h3>
        </div>
      
        <div class="space-y-2  ">
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Status:</span> 
            <span class="text-[#F94334] font-[600] text-[13px] leading-[19px]">Expired</span>
          </p>
      
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Start Date:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">May 11 ,2024</span>
          </p>
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Next Billing Date:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">May 11 ,2024</span>
          </p>
    
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Payment Method:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">Credit Card (**** 1234)</span>
          </p>
        </div>
      
        <div class="mt-4 flex space-x-4">
          <button class="btn-dashboard hover_tamkin !text-[10px] font-[500] leading-[15px] whitespace-nowrap w-2/4  !h-[30px] ">
            Renew Subscription
          </button>
       
        </div>
      </div>
    
    </div>
    <div class="flex items-center justify-center mt-[16px] space-x-[16px] w-full ">
    
   
      <div class="flex items-center justify-center  flex-wrap w-full space-y-[16px]">
        <div class="bg-white shadow-sm shadow-y-[-0.2px]  rounded-[10px] p-[10px] w-full relative">
          <div class="absolute right-[50px] bottom-[25px]">
            <img src="/imgs/calender.png" class="w-[178px] h-[178px]" alt="">
          </div>
          <div class="absolute right-[50px] top-[25px] w-[188px] h-[38px] space-x-[4px] bg-[#F8FAFE]  rounded-[7px] flex items-center justify-center 
          text-[14px] font-[500] leading-[40px] ">
            <div class="text-tamkin"> Active </div> 
            <div>
              until Dec 09, 2021
            </div>
          </div>
          <div class="flex items-center justify-start space-x-2 mb-4">
            <img src="/imgs/prem_plan.png" alt="Premium Icon" class="w-[43px] h-[43px]" />
            <h3 class="text-[14px]  font-[600] leading-[21px] text-black ">Premium Plan</h3>
          </div>
        
          <div class="space-y-2  ">
            <p class="space-x-1">
              <span class="font-[500] text-[13px] leading-[19px] text-black">Status:</span> 
              <span class="text-[#2DADA3] font-[600] text-[13px] leading-[19px]">Active</span>
            </p>
        
            <p class="space-x-1">
              <span class="font-[500] text-[13px] leading-[19px] text-black">Start Date:</span> 
              <span class="text-black font-[600] text-[13px] leading-[19px]">May 11 ,2024</span>
            </p>
            <p class="space-x-1">
              <span class="font-[500] text-[13px] leading-[19px] text-black">Next Billing Date:</span> 
              <span class="text-black font-[600] text-[13px] leading-[19px]">May 11 ,2024</span>
            </p>
      
            <p class="space-x-1">
              <span class="font-[500] text-[13px] leading-[19px] text-black">Payment Method:</span> 
              <span class="text-black font-[600] text-[13px] leading-[19px]">Credit Card (**** 1234)</span>
            </p>
          </div>
        
          <div class="mt-4 flex space-x-4">
            <button class="btn-dashboard hover_tamkin !text-[10px] font-[500] leading-[15px] whitespace-nowrap w-1/6  !h-[30px] ">
              Upgrade Now
            </button>
            <button class="btn_bordered_dashboard !text-[10px] font-[500]   whitespace-nowrap w-1/6 !h-[30px] ">
              Cancel Subscription
            </button>
          </div>
        </div>
        
    
      
      
      </div>
    </div>
  </div>

  <div class="h-[520px]  flex flex-col pt-[12px] space-y-[16px] items-center justify-start bg-gradient-to-t
   from-[#EAFDFC] via-[#FFF7ED] to-[#E1E9FF] col-span-4 ipad-max:col-span-12 rounded-[10px] shadow-md shadow-y-[-0.2px]">
<div class="text-[16px] font-[500] leading-[32px] text-black">
  Unlock More Features
</div>
<div>
  <img src="/imgs/features_hero.png"  class="w-[73px] h-[52px]" alt="">
</div>
<div class="text-[16px] font-[500] leading-[32px] text-black">
  Premium
</div>

<div class="text-[10px] font-[400] leading-[20px] text-black ipad-max:pl-[15px] 2xl:pl-[36px] lg:pl-[15px]">
  Upgrade to unlock exclusive features and enhanced support
</div>

<div class="text-[16px] font-[500] leading-[32px] text-black">
  Let’s talk
</div>


<div class="ipad-max:pl-[15px] lg:pl-[15px] 2xl:pl-[36px] self-start  text-[16px] font-[500] leading-[32px] text-black">

  Includes
</div>

<div class="flex flex-col items-start justify-center self-start ipad-max:pl-[15px] 2xl:pl-[36px] lg:pl-[15px] space-y-2">
<div class="flex items-center justify-center space-x-[4px]">
  <div>
    <img src="/imgs/shield.png" class="w-[17px] h-[17px]" alt="">
  </div>
  <div class="text-[11px] font-[500] leading-[20px] text-black">
    Aut molestiae dolor et ut nam dicta.
  </div>
</div>
<div class="flex items-center justify-center space-x-[4px]">
  <div>
    <img src="/imgs/shield.png" class="w-[17px] h-[17px]" alt="">
  </div>
  <div class="text-[11px] font-[500] leading-[20px] text-black">
    Aut molestiae dolor et ut nam dicta.
  </div>
</div>
<div class="flex items-center justify-center space-x-[4px]">
  <div>
    <img src="/imgs/shield.png" class="w-[17px] h-[17px]" alt="">
  </div>
  <div class="text-[11px] font-[500] leading-[20px] text-black">
    Aut molestiae dolor et ut nam dicta.
  </div>
</div>
<div class="flex items-center justify-center space-x-[4px]">
  <div>
    <img src="/imgs/shield.png" class="w-[17px] h-[17px]" alt="">
  </div>
  <div class="text-[11px] font-[500] leading-[20px] text-black">
    Aut molestiae dolor et ut nam dicta.
  </div>
</div>
<div class="flex items-center justify-center space-x-[4px]">
  <div>
    <img src="/imgs/shield.png" class="w-[17px] h-[17px]" alt="">
  </div>
  <div class="text-[11px] font-[500] leading-[20px] text-black">
    Aut molestiae dolor et ut nam dicta.
  </div>
</div>
</div>


<button class="btn-dashboard hover_tamin w-[110px] !text-[12px] font-[500]">Contact Us</button>
  </div>
</div>








    <div class="bg-white w-full h-full mt-[32px] rounded-[10px]  p-[32px]">


        <div class="text-[18px] font-[500] text-black">
            Subscriptions
        </div>


        <div class="flex flex-col items-center justify-center mt-[65px] space-y-[10px]">
            <img src="/imgs/no_subs.png" class="w-[71px] h-[71px]" alt="">
            <div class="text-[14px] leading-[28px] font-[400] text-darkGrey w-1/4 text-center">
                You don't have any subscriptions in this list at the moment
            </div>

            <button class="btn-dashboard hover_tamkin w-[158px]">Subscribe Now</button>
        </div>

     
    </div>

    
 

 
  </div>
</template>
