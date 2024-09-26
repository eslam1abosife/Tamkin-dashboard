<script lang="ts" setup>
import {useGetSubscriptions} from '@/composables/usePackages'
const { getSubs} = useGetSubscriptions()
const loadingSubs = ref(false)
const localePath = useLocalePath()
definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],

  requiredPermission: 'subscriptions',

});
const subs  = ref([])
onMounted(async ()=>{
  loadingSubs.value = true
  const res = await getSubs()

  subs.value = res
  loadingSubs.value = false

})

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



const configrun = useRuntimeConfig()




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


  

<div class="grid grid-cols-1 mt-[16px] gap-4 ">
  <div class="flex flex-col items-start justify-center ">
    <div class="flex flex-col items-center justify-center space-y-[16px] w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full" v-if="loadingSubs">
        <div
          v-for="n in 2" 
          :key="n" 
          class="bg-white rounded-[10px] p-[10px] w-full shadow-sm animate-pulse"
        >
          <!-- Header loader -->
          <div class="flex items-center justify-between w-full mb-4">
            <div class="flex items-center justify-start space-x-2">
              <!-- Image placeholder -->
              <div class="bg-gray-300 w-[43px] h-[43px] rounded-full"></div>
              <!-- Title placeholder -->
              <div class="bg-gray-300 w-[120px] h-[21px] rounded"></div>
            </div>
            <!-- Domain placeholder -->
            <div class="bg-gray-300 w-[80px] h-[21px] rounded"></div>
          </div>
    
          <!-- Body content loader -->
          <div class="space-y-2">
            <div class="flex space-x-1">
              <span class="bg-gray-300 w-[70px] h-[19px] rounded"></span>
              <span class="bg-gray-300 w-[60px] h-[19px] rounded"></span>
            </div>
            <div class="flex space-x-1">
              <span class="bg-gray-300 w-[90px] h-[19px] rounded"></span>
              <span class="bg-gray-300 w-[80px] h-[19px] rounded"></span>
            </div>
            <div class="flex space-x-1">
              <span class="bg-gray-300 w-[120px] h-[19px] rounded"></span>
              <span class="bg-gray-300 w-[90px] h-[19px] rounded"></span>
            </div>
            <div class="flex space-x-1">
              <span class="bg-gray-300 w-[130px] h-[19px] rounded"></span>
              <span class="bg-gray-300 w-[90px] h-[19px] rounded"></span>
            </div>
          </div>
    
          <!-- Buttons loader -->
          <div class="mt-4 flex space-x-4">
            <div class="bg-gray-300 w-1/2 h-[30px] rounded"></div>
            <div class="bg-gray-300 w-1/2 h-[30px] rounded"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full" v-else-if="subs.slice(1).length">
        <div 
          class="bg-white rounded-[10px] p-[10px] w-full shadow-sm shadow-y-[-0.2px]" 
          v-for="sub in subs.slice(1)" :key="sub.name"
        >
       <div class="flex items-center justify-between w-full mb-4">
        <div class="flex items-center justify-start space-x-2 ">
          <img :src="configrun.public.baseImagerUrl+sub.package_icon" :alt="sub.package_title+ 'Icon'" class="w-[43px] h-[43px]" />
          <h3 class="text-[14px] font-[600] leading-[21px] text-black">{{sub.package_title}}</h3>
        </div>
        <div>
          <h3 class="text-[14px] font-[600] leading-[21px] text-black">{{sub.app ? sub.app.app_domain : null}}</h3>

        </div>
       </div>
          
          <div class="space-y-2">
            <p class="space-x-1">
              <span class="font-[500] text-[13px] leading-[19px] text-black">{{ $t('Status') }}:</span> 
              <span class=" font-[600] text-[13px] leading-[19px] capitalize" 
              :class="[sub.status === 'active' ? 'text-[#2DADA3]' : sub.status === 'expire' ? 'text-[#D9534F]' : 'text-[#2DADA3]']">{{$t(sub.status)}}</span>
            </p>
    
            <p class="space-x-1">
              <span class="font-[500] text-[13px] leading-[19px] text-black">{{ $t('Start Date') }}:</span> 
              <span class="text-black font-[600] text-[13px] leading-[19px]">{{new Date(sub.from_date).toLocaleDateString()}}</span>
            </p>
            <p class="space-x-1">
              <span class="font-[500] text-[13px] leading-[19px] text-black">{{ $t('Next Billing Date') }}:</span> 
              <span class="text-black font-[600] text-[13px] leading-[19px]">{{new Date(sub.to_date).toLocaleDateString()}}</span>
            </p>
    
            <p class="space-x-1">
              <span class="font-[500] text-[13px] leading-[19px] text-black">{{ $t('Payment Method') }}:</span> 
              <span class="text-black font-[600] text-[13px] leading-[19px]">{{sub.remarks}}</span>
            </p>
          </div>
    
          <div class="mt-4 flex space-x-4">
            <button class="btn-dashboard hover_tamkin !text-[10px] font-[500] leading-[15px] whitespace-nowrap w-1/2 !h-[30px]">
              Upgrade Now
            </button>
            <button class="btn_bordered_dashboard !text-[10px] font-[500] whitespace-nowrap w-1/2 !h-[30px]">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
      <div class="relative w-full bg-white shadow-sm shadow-y-[-0.2px] rounded-[10px] p-[10px] mt-[16px] animate-pulse" v-if="loadingSubs"> 
        <div class="absolute right-[50px] top-[25px] w-[188px] h-[38px] bg-gray-200 rounded-[7px]"></div>
      
        <div class="flex items-center justify-start space-x-2 mb-4">
          <div class="w-[43px] h-[43px] bg-gray-200 rounded-full"></div>
          <div class="w-[100px] h-[21px] bg-gray-200 rounded"></div>
        </div>
      
        <div class="space-y-2">
          <p class="w-[70px] h-[19px] bg-gray-200 rounded"></p>
          <p class="w-[150px] h-[19px] bg-gray-200 rounded"></p>
      
          <p class="w-[70px] h-[19px] bg-gray-200 rounded"></p>
          <p class="w-[150px] h-[19px] bg-gray-200 rounded"></p>
      
          <p class="w-[110px] h-[19px] bg-gray-200 rounded"></p>
          <p class="w-[150px] h-[19px] bg-gray-200 rounded"></p>
        </div>
      
        <div class="mt-4 flex space-x-4">
          <div class="w-1/6 h-[30px] bg-gray-200 rounded"></div>
          <div class="w-1/6 h-[30px] bg-gray-200 rounded"></div>
        </div>
      </div>
      <div class="relative w-full bg-white shadow-sm shadow-y-[-0.2px] rounded-[10px] p-[10px] mt-[16px]" v-else-if="subs[0]">
        <div class="absolute right-[50px] bottom-[25px]">
          <img src="/imgs/calender.png" class="w-[178px] h-[178px]" alt="">
        </div>
        <div class="absolute right-[50px] top-[25px] w-[188px] h-[38px] space-x-[4px] bg-[#F8FAFE] rounded-[7px] 
        flex items-center justify-center text-[14px] font-[500] leading-[40px]">
          <div class="text-tamkin"> Active </div> 
          <div> until {{ new Date(subs[0].to_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) }}          </div>
        </div>
    
        <div class="flex items-center justify-start space-x-2 mb-4">
          <img :src="configrun.public.baseImagerUrl+subs[0].package_icon" :alt="subs[0].package_title+ 'Icon'" class="w-[43px] h-[43px]" />
          <h3 class="text-[14px] font-[600] leading-[21px] text-black">{{subs[0].package_title}}</h3>
        </div>
    
        <div class="space-y-2">
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Status:</span> 
            <span class=" font-[600] text-[13px] leading-[19px] capitalize" 
            :class="[subs[0].status === 'active' ? 'text-[#2DADA3]' : subs[0].status === 'expire' ? 'text-[#D9534F]' : 'text-[#2DADA3]']">{{$t(subs[0].status)}}</span>
          </p>
    
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Start Date:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">{{new Date(subs[0].from_date).toLocaleDateString()}}</span>
          </p>
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Next Billing Date:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">{{new Date(subs[0].to_date).toLocaleDateString()}}</span>
          </p>
    
          <p class="space-x-1">
            <span class="font-[500] text-[13px] leading-[19px] text-black">Payment Method:</span> 
            <span class="text-black font-[600] text-[13px] leading-[19px]">{{subs[0].remarks}}</span>
          </p>
        </div>
    
        <div class="mt-4 flex space-x-4">
          <button class="btn-dashboard hover_tamkin !text-[10px] font-[500] leading-[15px] whitespace-nowrap w-1/6 !h-[30px]">
            Upgrade Now
          </button>
          <button class="btn_bordered_dashboard !text-[10px] font-[500] whitespace-nowrap w-1/6 !h-[30px]">
            Cancel Subscription
          </button>
        </div>
      </div>
 
      
    </div>
</div>    


</div>








    <div class="bg-white w-full h-full mt-[32px] rounded-[10px]  p-[32px]" v-if="subs.length === 0 && !loadingSubs">


        <div class="text-[18px] font-[500] text-black">
            Subscriptions
        </div>


        <div class="flex flex-col items-center justify-center  space-y-[10px]">
            <img src="/imgs/no_subs.png" class="w-[71px] h-[71px]" alt="">
            <div class="text-[14px] leading-[28px] font-[400] text-darkGrey w-1/4 text-center">
                You don't have any subscriptions in this list at the moment
            </div>

            <button  @click="$router.push(localePath('/packages'))" class="btn-dashboard hover_tamkin w-[158px]">Subscribe Now</button>
        </div>

     
    </div>

    
 

 
  </div>
</template>
