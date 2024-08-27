<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';

import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const state = reactive({
  bankName: "",
  acc_holder: "",
  account_number: "",
  iban: "",
  bic: "",
  account_curreny: "",
});
const rules = {
    bankName: { required },
    acc_holder: { required },
    account_number: { required },
    iban: { required },
    bic: { required },
    account_curreny: { required },
};

const v$ = useVuelidate(rules, state);




const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData
} = useModalManager();

const dataModal=ref({})
watchEffect(() => {
  if (isOpen('tracking_custom_order')) {
     dataModal.value = getData();
     console.log(dataModal.value);
    if (dataModal.value?.trakin[0]?.date) {
      const [date,time]=dataModal.value.trakin[0].date.split(' ')
    }
  }
});


const traknames=[
  'Order Review',
  'Confirmed Order',
  'processing Order',
  'Receiving Order',
  'Order Completed'
]
const DateSplit = (dateString) => {
  try {
    // Create a Date object directly from the ISO string
    const date = new Date(dateString);

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    // Format the date
    const formattedDate = new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);

    // Format the time
    const formattedTime = new Intl.DateTimeFormat('en-US', { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    }).format(date);

    // Return formatted date and time with <br> line break
    return `${formattedDate} <br> ${formattedTime}`;
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Date information not available';
  }
};

// // Example usage
// const dateStr = '2024-08-26T18:44:28.782791';
// // console.log(DateSplit(dateStr)); // Outputs: Aug 26, 2024 <br> 6:44 PM

</script>

<template>
  <div  v-if="isOpen('tracking_custom_order') && dataModal"
    class="fixed z-[9999]  ipad-max:top-[20px] top-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px]  h-auto 
    w-[680px] "
    style="left: 50%; transform: translate(-50%, 0)"
  >
  <!-- isOpen('withdraw_paymentmethods') -->
  <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('tracking_custom_order')">
    <svg
      class="w-[12px] h-[12px]"
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
        fill="currentColor"
      />
    </svg>
  </div>
<div class=" mx-auto max-h-[100%] w-full">
  <h1 class="rtl:text-right ltr:text-left font-[700] text-darkGrey  dark:text-whiteTamkin text-[18px] leading-[36px]">
    Order Tracking
</h1>


<div class="flex items-center justify-between w-full  mt-[10px]">
    <div >
       <span class="text-[16px] font-[600] leading-[24px] text-darkGrey"> Order ID :</span> <span class="text-[16px] font-[500] leading-[24px] text-[#80889C]">{{  dataModal.id || '' }}</span>
    </div>

    <div class="flex flex-col items-start justify-start space-y-[8px]" >
      <div class="text-[13px] font-[500] leading-[19px] " :class="[!dataModal.trakin.some(item => item.level !== 'Reject') ? 'text-darkGrey' :'text-darkGrey/60']">
         Expected Receive Date
      </div>

   
        <div class="flex items-center space-x-[8px]"  v-if="dataModal.trakin.every(item => item.level !== 'Reject')">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 1V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V1H11C11 1 11.4142 1 11.7071 1.29289C11.7071 1.29289 12 1.58579 12 2V12C12 12 12 12.4142 11.7071 12.7071C11.7071 12.7071 11.4142 13 11 13H1C1 13 0.585785 13 0.292893 12.7071C0.292893 12.7071 0 12.4142 0 12V2C0 2 0 1.58579 0.292893 1.29289C0.292893 1.29289 0.585786 1 1 1H2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V1H8.5ZM1 5V12H11V5H1ZM11 4H1V2H2.5V2.5C2.5 2.77614 2.72386 3 3 3C3.27614 3 3.5 2.77614 3.5 2.5V2H8.5V2.5C8.5 2.77614 8.72386 3 9 3C9.27614 3 9.5 2.77614 9.5 2.5V2H11V4Z" fill="black" fill-opacity="0.4"/>
                </svg>
            <span class="text-[12px] leading-[18px] font-[500] ">
              {{ !dataModal.delivary_date ?  'Date to be determined.' :  dataModal.delivary_date }} 
            
            </span>
        </div>
    </div>
</div>


<div class="w-full mt-[32px]">
    <!-- Timeline container -->
     
    <div class="relative w-full" >
      <!-- Vertical line -->
      <div class="absolute top-0 inset-x-[98px] h-full w-[12px] rounded-t-full  rounded-b-full bg-teal-500" :class="[dataModal.status === 'Reject' ? '!bg-[#DADADA]' :'']"></div>
  <template v-for="index in 5">
    <div class="relative flex items-start mb-8"  >
        <div class="w-[90px] text-center" v-if="dataModal.trakin[index-1]">
          <p class="text-[12px] font-[500] text-[#1C1C1C] leading-[18px] whitespace-nowrap" 
           v-html="DateSplit(dataModal.trakin[index-1].date) ||''" :class="[dataModal.status === 'Reject' ? '!text-[#F02F1F]' :'']">
  
       
          </p>
        </div>
        <div class="flex-shrink-0 pl-[10px]" v-if="dataModal.trakin[index-1]">
          <div   :class="[dataModal.status === 'Reject' ? '!border-[#DADADA]' :'']" class="w-8 h-8 bg-white border-[1px] border-[#71DAD2] text-white rounded-full flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle 
                :class="[dataModal.status === 'Reject' ? 'fill-[#DADADA]' :'fill-[url(#paint0_linear_8989_149244)]']"
                cx="11" cy="11" r="11" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7594 7.00028L6.48047 15.125L7.72068 16.694L17.9996 8.56931L16.7594 7.00028ZM5.56904 10.7461L4 11.9863L6.48042 15.1244L8.04946 13.8842L5.56904 10.7461Z" fill="#FFFEFE"/>
                <defs>
                <linearGradient id="paint0_linear_8989_149244" x1="11" y1="0" x2="11" y2="22" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2DADA3"/>
                <stop offset="1" stop-color="#71DAD2"/>
                </linearGradient>
                </defs>
                </svg>
                
          </div>
         
        
              
        </div> 
        <div v-else class="flex-shrink-0 pl-[88px]">
          <div class="w-8 h-8 bg-white border-[1px] border-[#F2F2F2] text-white rounded-full flex items-center justify-center">
          
            <div class="w-[22px] h-[22px] rounded-full bg-[#DAF3F1]" :class="[dataModal.status === 'Reject' ? '!bg-[#DADADA]' :'']">

            </div>
                
          </div>
          </div>
        
        <div class="ml-6">
          <h4 class="text-[16px] leading-[27px] font-[600] text-darkGrey " :class="[dataModal.status === 'Reject' ? '!text-[#F02F1F]' :'']">{{ traknames[index-1] }}</h4>
          <p class="text-[13px] text-[#80889C] leading-[19px] font-[500]" v-if="dataModal.trakin[index-1]" :class="[dataModal.status === 'Reject' ? '!text-[#F49E97]' :'']">
            {{ dataModal.trakin[index-1].description||'' }}</p>
        </div>
      </div>
  </template>



    </div>

    
  <div class="h-[60px] w-full rounded-[10px] bg-[#FFE9E9] flex items-center px-[20px]  space-x-[12px] justify-start" v-if="dataModal.status === 'Reject'">
   <div class="self-start mt-[12px]">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.49984 15C11.5957 15 15 11.6029 15 7.5C15 3.40427 11.5881 0 7.49231 0C3.3896 0 0 3.40427 0 7.5C0 11.6029 3.39681 15 7.49984 15ZM7.50016 13.7501C4.02899 13.7501 1.25651 10.9705 1.25651 7.5C1.25651 4.03643 4.02146 1.2499 7.49231 1.2499C10.9556 1.2499 13.7422 4.03675 13.7498 7.5C13.757 10.9708 10.9629 13.7501 7.49953 13.7501M7.49231 8.83084C7.84495 8.83084 8.04355 8.63225 8.05076 8.25013L8.1612 4.36773C8.16873 3.99251 7.87444 3.71329 7.48478 3.71329C7.0876 3.71329 6.80837 3.9853 6.81559 4.3602L6.91128 8.25013C6.91849 8.62503 7.12462 8.83084 7.49231 8.83084ZM7.49231 11.2205C7.91115 11.2205 8.28607 10.8823 8.28607 10.456C8.28607 10.0221 7.91868 9.69108 7.49231 9.69108C7.05842 9.69108 6.69794 10.0293 6.69794 10.456C6.69794 10.8751 7.06563 11.2205 7.49231 11.2205Z" fill="#585B5B"/>
      </svg>
   </div>
      <div class="text-[13px] font-[500] leading-[19.5px] text-[#585B5B]">
{{
  dataModal.trakin.find(item => item.level === "Reject").description
}}








      </div>
  </div>
  </div>
  

     
</div>
  </div>
</template>

<style lang="scss">

</style>
