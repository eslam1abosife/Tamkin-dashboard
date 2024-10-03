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

const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
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


  
<div class="w-full h-[125px] rounded-[10px] bg-gradient-to-r from-[#C0CAFF]/[79%] to-white/[79%] px-[16px] my-[30px] relative flex items-center justify-between">
<div class="absolute left-[40%]">
<img src="/imgs/subscription_hero.png" class="w-[233px] h-[121px]" alt="">
</div>
<div class="absolute left-[0%]">
  <img src="/imgs/subscription_hero.png" class="w-[150px] h-[80px]" alt="">
  </div>
  <div class="absolute right-[0%]">
    <img src="/imgs/subscription_hero.png" class="w-[150px] h-[80px]" alt="">
    </div>
<div class="flex flex-col items-start justify-start">
<div class="text-[18px] leading-[27px] font-[500] text-[#3D3D3D]">
  $86,342
</div>
<div class="text-[13px] font-[500] leading-[19px] text-darkGrey">
  Total value of renewals
</div>
</div>

<button class="btn-dashboard hover_tamkin static z-[40] w-[150px]">
Renew All
</button>

</div>




<div class="bg-white rounded-[10px] w-full h-full px-[16px] py-[28px]">
<div class="flex items-center justify-between w-full gap-[24px]">
  <div class="w-full ">
    <div class="py-[17px] search_input">
      <input type="text" class="input_dashboard_search w-full" v-model="search"
        :placeholder="`${$t('Search')} ...`" />
      <div
        class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px]
         ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]">
        <img src="/assets/imgs/icons/search.svg" />
      </div>
      <div v-if="isSearchfilled" @click="clearInput"
        class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer">
        <img src="/assets/imgs/icons/clear_search.svg" />
      </div>
    </div>
  </div>
  <div class="flex items-center  space-x-[8px] justify-center">
    <div class="border-[1px] w-[82px] h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center  text-[13px] font-[500] leading-[19.5px]">
      All
      </div>
      <div class="border-[1px] w-[82px] h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center  text-[13px] font-[500] leading-[19.5px]">
        Monthly
        </div>
        <div class="border-[1px] w-[82px] h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center  text-[13px] font-[500] leading-[19.5px]">
          3 Months
          </div>
          <div class="border-[1px] w-[82px] h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center  text-[13px] font-[500] leading-[19.5px]">
            Yearly
            </div>
            <div class="border-[1px] w-[82px] h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center  text-[13px] font-[500] leading-[19.5px]">
              Investor 
              </div>
    </div>
</div>

<div class="flex flex-col">
  <div class="overflow-x-auto">
    <div class="p-2 inline-block min-w-full align-middle">
      <div class="overflow-hidden border border-gray-200 bg-[#F5F9FF] rounded-lg">
        <table class="min-w-full table-fixed divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="text-xs font-medium text-gray-700 py-3 text-left w-1/6">Products</th>
              <th scope="col" class="text-xs font-medium text-gray-700 py-3 text-left w-1/6">Status</th>
              <th scope="col" class="text-xs font-medium text-gray-700 py-3 text-center w-1/6">Start Date</th>
              <th scope="col" class="text-xs font-medium text-gray-700 py-3 text-center w-1/6">Next Billing Date</th>
              <th scope="col" class="text-xs font-medium text-gray-700 py-3 text-left w-1/6">Payment Method</th>
              <th scope="col" class="text-xs font-medium text-gray-700 py-3 text-center w-1/6">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="py-4 whitespace-nowrap text-sm font-semibold text-gray-900 flex items-center space-x-3">
                <img src="/imgs/prem_plan.png" class="w-5 h-5" alt="Premium plan icon">
                <span>Premium</span>
              </td>
              <td class="py-4 whitespace-nowrap text-sm font-semibold text-tamkin">Active</td>
              <td class="py-4 whitespace-nowrap text-sm font-semibold text-center">May 11, 2024</td>
              <td class="py-4 whitespace-nowrap text-sm font-semibold text-center">May 11, 2024</td>
              <td class="py-4 whitespace-nowrap text-sm font-semibold">Card (4242)</td>
              <td class="py-4 whitespace-nowrap text-sm flex justify-center items-center space-x-2">
                <button class="text-white bg-green-500 rounded-full p-1 hover:bg-green-600">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="18" height="18" rx="9" fill="#61BDAD"/>
                    <path d="M9 3L3 7.08517V9.9068L9 5.82163L15 9.9068V7.08517L9 3ZM9 6.39661L5.07792 9.10035V11.4953L9 8.79152L12.9221 11.4953V9.10035L9 6.39661ZM9 9.36764L6.74026 10.9254V12.7187L9 11.1801L11.2597 12.7187V10.9254L9 9.36764ZM9 11.7539L6.74026 13.2925V15L9 13.4614L11.2597 15V13.2925L9 11.7539Z" fill="white"/>
                  </svg>
                </button>
                <button class="text-white bg-red-500 rounded-full p-1 hover:bg-red-600">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Your second SVG here -->
                  </svg>
                </button>
              </td>
            </tr>
            <!-- Additional rows here -->
          </tbody>
        </table>
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
