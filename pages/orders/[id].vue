<script lang="ts" setup>
import { useGetOrderInvoiceDetails,usePrintInvoice } from '~/composables/useMarket';
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const baseImageURL = config.public.baseImagerUrl
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
const marketStore = useMarketStore();
const trakingStatus = ref([])
const orderDetails = ref({})
const loadingBlock=ref(true)
const loadingInvoiceId = ref(null)
import { useRoute } from 'vue-router'
const route = useRoute()
const getOrderDetails=async()=>{
  const { getOrderInvoiceDetails } = useGetOrderInvoiceDetails();

  const result = await getOrderInvoiceDetails(route.params.id);

  orderDetails.value = result.data;
}
onMounted(async () => {
  if(process.client){
    await getOrderDetails()
  }
  loadingBlock.value = false;
});

definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],
requiredPermission: 'orders',

});

const openModalAndHideChat = () => {
  if (process.client && !isOpen('requestmodal_update')) {
    // window.$chatwoot.toggleBubbleVisibility('hide')
    openModal('requestmodal_update', 'order-id')


  }
}


const paymentImages = [
"/assets/imgs/payment_methods/crypto.svg"  ,
   "/assets/imgs/payment_methods/cc.svg" ,
   "/assets/imgs/payment_methods/paypal.svg"
];

const statusImages = [
   "/imgs/limited.png" ,
   "/imgs/under_review.png" ,
   "/imgs/success.png" 
];
const getStatusImage=(status:string)=> {
      switch (status) {
        case 'Pending':
          return statusImages[1];
        case 'Successful':
          return statusImages[2];
          case 'Paid':
          return statusImages[2];
          case 'Cancelled':
          return statusImages[0];
          default:
          return statusImages[1];
      }
    };

    const getPaymentImage=(method:string)=> {
      switch (method) {
        case 'Crypto':
          return paymentImages[0];
        case 'Credit':
          return paymentImages[1];
        case 'PayPal':
          return paymentImages[2];
        default:
          return paymentImages[1];
      }
    };




function printAndDownloadPDF(base64String, fileName = "document.pdf") {
    // Convert Base64 to binary data
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Open the Blob URL in a new window for printing
    const printWindow = window.open(blobUrl);
    if (printWindow) {
        printWindow.focus();
        printWindow.print();
    }

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(blobUrl);
}

const GetBase64AndPrint=async(id)=>{
  loadingInvoiceId.value = id
  const { PrintInvoice } = usePrintInvoice();
  const res = await PrintInvoice(id);
  printAndDownloadPDF(res.data.data.data)
  loadingInvoiceId.value = null

}
const handleData = async() => {
  loadingBlock.value = true;
  await getOrderDetails()
  loadingBlock.value = false;
};

function beforeEnterCart(el) {
  const isRTL = document.documentElement.dir === 'rtl';
  el.style.transform = isRTL ? "translateX(-100%)" : "translateX(100%)";
  el.style.opacity = "0";
}

function enterCart(el, done) {
  setTimeout(() => {
    el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
    done();
  }, 0);
}
const localePath = useLocalePath()
function leaveCart(el, done) {
  const isRTL = document.documentElement.dir === 'rtl';
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  el.style.transform = isRTL ? "translateX(-100%)" : "translateX(100%)";
  el.style.opacity = "0";
  setTimeout(() => {
    done();
  }, 500);
}

</script>

<template>
  <div class="w-full relative">
    <LazyProfileBillingModalsEditcard />
    <ProfileBillingModalsAddnewCard />


    <ProfileOrdersTracking />
    <transition @before-enter="beforeEnterCart" @enter="enterCart" @leave="leaveCart">
      <ProfileOrdersViewdetails />
    </transition>

    <transition @before-enter="beforeEnterCart" @enter="enterCart" @leave="leaveCart">
    <ProfileOrdersRequest  @updateData="handleData()"/>
  </transition>

    <div class="space-y-[5px]">
      <h1 class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin">
        {{ $t('Order Details') }}
      </h1>

      <h2 @click="$router.push({path:localePath('/orders')})"
        class="cursor-pointer ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey">
        {{ $t('Orders') }}
      </h2>
    </div>



    <div v-if="loadingBlock" class="w-full flex flex-col items-evenly justify-evenly px-[20px] h-full bg-white mt-[20px] rounded-[10px] animate-pulse">
      <div class="flex items-center justify-between w-full mt-[26px] pb-[24px] rtl:space-x-reverse space-x-[24px] border-b-[1px] border-[#D9D9D9]">
        <div class="h-[16px] bg-gray-300 rounded w-1/4"></div>
        <div class="h-[24px] w-[1px] bg-[#D9D9D9]"></div>
        <div class="h-[16px] bg-gray-300 rounded w-1/4"></div>
        <div class="h-[24px] w-[1px] bg-[#D9D9D9]"></div>
        <div class="h-[16px] bg-gray-300 rounded w-1/4"></div>
        <div class="h-[24px] w-[1px] bg-[#D9D9D9]"></div>
        <div class="h-[16px] bg-gray-300 rounded w-1/4"></div>
      </div>
    
      <div class="h-[20px] bg-gray-300 rounded w-1/6 mt-[41px]"></div>
    
      <div class="space-y-4 mt-[10px]">
        <template v-for="index in 3" :key="index">
          <div class="flex items-center border-b justify-between pb-4">
            <div class="flex items-center rtl:space-x-reverse space-x-4">
              <div class="rounded-lg bg-[#F8F8F8] w-[97px] h-[101px] flex items-center justify-center border">
                <div class="w-[63px] h-[67px] bg-gray-300 rounded"></div>
              </div>
              <div class="space-y-2">
                <div class="h-[20px] bg-gray-300 rounded w-[60px]"></div>
                <div class="h-[16px] bg-gray-300 rounded w-[100px]"></div>
                <div class="h-[16px] bg-gray-300 rounded w-[80px]"></div>
              </div>
            </div>
            <div class="h-[20px] bg-gray-300 rounded w-[50px]"></div>
          </div>
        </template>
      </div>
    
      <div class="pb-[10px]">
        <table class="min-w-full">
          <tbody>
            <tr class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
              <td class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full dark:text-whiteTamkin" colspan="4">
                <div class="h-[16px] bg-gray-300 rounded w-[80px] ml-auto"></div>
              </td>
              <td class="py-2 border-b dark:border-light text-right w-full font-[500] dark:text-whiteTamkin" colspan="4">
                <div class="h-[16px] bg-gray-300 rounded w-[50px] ml-auto"></div>
              </td>
            </tr>
            <tr class="text-[14px] leading-[24px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
              <td class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full dark:text-whiteTamkin" colspan="4">
                <div class="h-[16px] bg-gray-300 rounded w-[80px] ml-auto"></div>
              </td>
              <td class="py-2 border-b dark:border-light text-right w-full font-[500] dark:text-whiteTamkin" colspan="4">
                <div class="h-[16px] bg-gray-300 rounded w-[50px] ml-auto"></div>
              </td>
            </tr>
            <tr class="text-[14px] leading-[24px] bg-[#FAFCFE] dark:bg-p">
              <td class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full dark:text-whiteTamkin" colspan="4">
                <div class="h-[16px] bg-gray-300 rounded w-[80px] ml-auto"></div>
              </td>
              <td class="py-2 border-b dark:border-light text-right w-full font-[500] dark:text-whiteTamkin" colspan="4">
                <div class="h-[16px] bg-gray-300 rounded w-[50px] ml-auto"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="w-full flex flex-col items-evenly justify-evenly px-[20px] h-full bg-white mt-[20px] rounded-[10px]" v-else>
      <div class="flex items-center  justify-between  w-full mt-[26px] pb-[24px] border-b-[1px] border-[#D9D9D9]">
     
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
          <div class="ipad-max:text-[10px] text-[13px] font-[500] leading-[10px] text-[#23262F] cursor-pointer">
            {{ $t('Order ID') }} :
          </div>
          <button    @click="GetBase64AndPrint(orderDetails.order_id)" :disabled="loadingInvoiceId === orderDetails.order_id"
          class=" text-[14px] font-[500] leading-[19px] " :class="loadingInvoiceId === orderDetails.order_id ? 'cursor-not-allowed text-light ' :'text-tamkin underline  cursor-pointer'">
         
          <div class="flex items-start justify-center ipad-max:text-[10px]">
            <div :class="loadingInvoiceId === orderDetails.order_id ? 'rtl:ml-2 ltr:mr-2':''">
              {{ orderDetails.order_id }}            </div>

            <svg  v-if="loadingInvoiceId === orderDetails.order_id" class="animate-spin  h-4 w-4 text-tamkin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
       </button>
  
        </div>
     

        <div class="h-[24px] w-[1px] bg-[#D9D9D9]">

        </div>
        <div class="ipad-max:text-[10px] text-[13px] font-[500] rtl:space-x-reverse space-x-[10px] text-[#23262F] flex items-center justify-center">
          <div>{{ $t('Order Date') }} :</div>
          <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.5 1V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V1H11C11 1 11.4142 1 11.7071 1.29289C11.7071 1.29289 12 1.58579 12 2V12C12 12 12 12.4142 11.7071 12.7071C11.7071 12.7071 11.4142 13 11 13H1C1 13 0.585785 13 0.292893 12.7071C0.292893 12.7071 0 12.4142 0 12V2C0 2 0 1.58579 0.292893 1.29289C0.292893 1.29289 0.585786 1 1 1H2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V1H8.5ZM1 5V12H11V5H1ZM11 4H1V2H2.5V2.5C2.5 2.77614 2.72386 3 3 3C3.27614 3 3.5 2.77614 3.5 2.5V2H8.5V2.5C8.5 2.77614 8.72386 3 9 3C9.27614 3 9.5 2.77614 9.5 2.5V2H11V4Z"
                fill="#021328" fill-opacity="1" />
            </svg>

            <div>
              {{ orderDetails.order_date }}
            </div>
          </div>
        </div>

        <div class="h-[24px] w-[1px] bg-[#D9D9D9]">

        </div>
        <div class="ipad-max:text-[10px] text-[13px] font-[500] rtl:space-x-reverse space-x-[10px] text-[#23262F] flex items-center justify-center">

          <img v-if='orderDetails' :src="getPaymentImage(orderDetails['Payment Method'])"
          
          class="w-[32px] h-[32px] ipad-max:w-[16px] ipad-max:h-[16px]" alt="">
          <div>{{$t('Via')}}  {{ $t(orderDetails['Payment Method'] )}} : {{ orderDetails.Account }}</div>

        </div>
        <div class="h-[24px] w-[1px] bg-[#D9D9D9]">

        </div>
        <div class="ipad-max:text-[10px] text-[13px] font-[500] rtl:space-x-reverse space-x-[10px] text-[#23262F] flex items-center justify-center">

          <img 
          
                  :class="orderDetails.status === 'Rejected' || orderDetails.status === 'Cancelled' ? 
                            '!w-[24px] !h-[24px]' : ''"
          :src="getStatusImage(orderDetails.status)" class="w-[32px] h-[32px] ipad-max:w-[16px] ipad-max:h-[16px]" alt="">
          <div>{{ $t(orderDetails.status )}}</div>

        </div>
      </div>

      <div class="text-[14px] font-[500] leading-[20px] text-[#23262F] mt-[41px]">
        {{ $t('Order Items') }}
      </div>
      <div class="space-y-4 mt-[10px]">



        <template v-for=" item in orderDetails.items" :key="item.name">
          <div class="flex items-center border-b justify-between pb-4 ">
            <div class="flex items-center rtl:space-x-reverse space-x-4">
              <div class="rounded-lg bg-[#F8F8F8]  w-[97px] h-[101px] flex items-center justify-center border">
                <img :src="item.type !== 'Custom Character' ? (baseImageURL + item.image) : '/assets/pngs/market/special_character.png'" :alt="item.type !== 'Custom Character' ? item.name : 'special_character'"
                  class="w-[63px] h-[67px] ">
              </div>
              <div>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[10px] ">
                  <div>
                    <img :src="`https://tamkin.app/${ item.category_image }`" alt="Top" class="w-[26px] h-[26px] ">
                  </div>
                  <div class="py-2">
                    <h3 class="font-[500] text-[#878787] capitalize dark:text-whiteTamkin">{{ $t(item.type) }}</h3>
                  </div>
                </div>
                <p class="text-darkGrey text-sm font-[500] text-left mt-[6px] capitalize dark:text-whiteTamkin">{{
                  $t(item.name) }}</p>

                <div v-if="item.type == 'Custom Character'"
                  class="flex items-center justify-start rtl:space-x-reverse space-x-[26px] mt-[12px] ">
                  <button v-if="item.edit == true" class="text-tamkin underline font-[500] ipad-max:text-[10px] text-[13px] "
                    @click="openModalAndHideChat(), setData({...item,currency:orderDetails.Currency })">{{$t('Edit request')}}</button>
                  <button v-if="!item.edit" class="text-tamkin underline font-[500] ipad-max:text-[10px] text-[13px] "
                    @click="openModal('requestmodal_details', 'order-id'), setData({...item,currency:orderDetails.Currency})">{{$t('View Details')}}</button>
                    <button  class="text-tamkin underline font-[500] ipad-max:text-[10px] text-[13px] " 
                      @click="openModal('tracking_custom_order', 'order-id'), setData(item)">{{$t('Track')}}</button>
                </div>
              </div>
            </div>
            <div class="flex items-end flex-col justify-start mt-[16px] mr-[1px] ">


              <p class="text-[#021328] text-[16px] font-[500] dark:text-whiteTamkin uppercase">
                <span class="px-1">{{ item.Cost }} {{ $t(orderDetails.Currency ? orderDetails.Currency : 'USD')}}</span>
              </p>
            </div>
          </div>
        </template>

      </div>

      <div class="pb-[10px]">
        <table class="min-w-full ">

          <tbody>



            <tr class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
              <td class="py-2 px-5 border-b  dark:border-light rtl:text-left ltr:text-right font-[500] w-full  dark:text-whiteTamkin"
                colspan="4">
                {{ $t('Subtotal') }}
              </td>
              <td class="py-2   border-b dark:border-light rtl:text-left ltr:text-right w-full font-[500] uppercase  dark:text-whiteTamkin"
                colspan="4">
                {{ orderDetails.subtotal }} {{ $t(orderDetails.Currency ? orderDetails.Currency : 'USD') }}
              </td>
            </tr>
            <tr class="text-[14px] leading-[24px]  bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
              <td class="py-2 px-5 border-b dark:border-light rtl:text-left ltr:text-right t font-[500] w-full  dark:text-whiteTamkin"
                colspan="4">
                {{ $t('Discount') }}

              </td>
              <td class="py-2   border-b dark:border-light rtl:text-left ltr:text-right   min-w-[100px] font-[500] uppercase  dark:text-whiteTamkin"
                colspan="4">
                {{ orderDetails.discount }} {{  $t(orderDetails.Currency ? orderDetails.Currency : 'USD') }}
              </td>
            </tr>
            <tr class="text-[14px] leading-[24px]  bg-[#FAFCFE] dark:bg-p">
              <td class="py-2 px-5 border-b dark:border-light rtl:text-left ltr:text-right  font-[500] w-full dark:text-whiteTamkin"
                colspan="4">
                {{$t('Total')}}

              </td>
              <td
                class="py-2 border-b dark:border-light rtl:text-left ltr:text-right uppercase w-full min-w-[100px] font-[500] dark:text-whiteTamkin"
                colspan="4">
                {{ orderDetails.total }}  {{  $t(orderDetails.Currency ? orderDetails.Currency : 'USD') }}
              </td>
            </tr>
          </tbody>
        </table>



      </div>
    </div>


  </div>
  <div></div>
</template>
