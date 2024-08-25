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
});

const openModalAndHideChat = () => {
  if (process.client && !isOpen('requestmodal_update')) {
    window.$chatwoot.toggleBubbleVisibility('hide')
    openModal('requestmodal_update', 'order-id')


  }
}


const paymentImages = [
"/assets/imgs/payment_methods/crypto.svg"  ,
   "/assets/imgs/payment_methods/cc.svg" ,
   "/assets/imgs/payment_methods/paypal.svg"
];

const statusImages = [
   "/imgs/limited.svg" ,
   "/imgs/under_review.png" ,
   "/imgs/success.png" 
];
const getStatusImage=(status:string)=> {
      switch (status) {
        case 'Pending':
          return statusImages[1];
        case 'Successful':
          return statusImages[2];
        default:
          return statusImages[0];
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




//print invoice


// Function to convert Base64 string to Blob and open it
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
  const { PrintInvoice } = usePrintInvoice();
  const res = await PrintInvoice(id);
  printAndDownloadPDF(res.data.data.data)
}
const handleData = async() => {
  loadingBlock.value = true;
  await getOrderDetails()
  loadingBlock.value = false;
};
</script>

<template>
  <div class="w-full relative">
    <LazyProfileBillingModalsEditcard />
    <ProfileBillingModalsAddnewCard />
    <ProfileOrdersTracking />
    <ProfileOrdersRequest  @updateData="handleData()"/>
    <ProfileOrdersViewdetails />

    <div class="space-y-[5px]">
      <h1 class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin">
        Order details
      </h1>

      <h2 @click="$router.push('/orders')"
        class="cursor-pointer ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey">
        Orders
      </h2>
    </div>






    <div v-if="loadingBlock" >

<svg   class="absolute top-[150px] left-[50%] z-[999] mx-auto animate-spin  h-5 w-5 text-tamkin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
    </div>

    <div class="w-full flex flex-col items-evenly justify-evenly px-[20px] h-full bg-white mt-[20px] rounded-[10px]" v-else>
      <div class="flex items-center  justify-between  w-full mt-[26px] pb-[24px] border-b-[1px] border-[#D9D9D9]">
        <div class="text-[13px] font-[500] leading-[10px] text-[#23262F] cursor-pointer" @click="GetBase64AndPrint(orderDetails.order_id);">
          Order ID :
          <span class="!font-[600] text-tamkin">{{ orderDetails.order_id }}</span>
          
        </div>

        <div class="h-[24px] w-[1px] bg-[#D9D9D9]">

        </div>
        <div class="text-[13px] font-[500] space-x-[10px] text-[#23262F] flex items-center justify-center">
          <div>Order Date :</div>
          <div class="flex items-center justify-start space-x-[8px]">
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
        <div class="text-[13px] font-[500] space-x-[10px] text-[#23262F] flex items-center justify-center">

          <img v-if='orderDetails' :src="getPaymentImage(orderDetails['Payment Method'])" class="w-[32px] h-[32px]" alt="">
          <div>Via  {{ orderDetails['Payment Method'] }} : {{ orderDetails.Account }}</div>

        </div>
        <div class="h-[24px] w-[1px] bg-[#D9D9D9]">

        </div>
        <div class="text-[13px] font-[500] space-x-[10px] text-[#23262F] flex items-center justify-center">

          <img  :src="getStatusImage(orderDetails['order status'])" class="w-[32px] h-[32px]" alt="">
          <div>{{ orderDetails.status }} purchase</div>

        </div>
      </div>

      <div class="text-[14px] font-[500] leading-[20px] text-[#23262F] mt-[41px]">
        Order Items
      </div>
      <div class="space-y-4 mt-[10px]">



        <template v-for=" item in orderDetails.items" :key="item.name">
          <div class="flex items-center border-b justify-between pb-4 ">
            <div class="flex items-center space-x-4">
              <div class="rounded-lg bg-[#F8F8F8]  w-[97px] h-[101px] flex items-center justify-center border">
                <img :src="item.type !== 'Custom Character' ? (baseImageURL + item.image) : '/assets/pngs/market/special_character.png'" :alt="item.type !== 'Custom Character' ? item.name : 'special_character'"
                  class="w-[63px] h-[67px] ">
              </div>
              <div>
                <div class="flex items-center justify-start space-x-[10px] ">
                  <div>
                    <img src="/assets/pngs/market/top_inactive.svg" alt="Top" class="w-[26px] h-[26px] ">
                  </div>
                  <div class="py-2">
                    <h3 class="font-[500] text-[#878787] capitalize dark:text-whiteTamkin">{{ item.type }}</h3>
                  </div>
                </div>
                <p class="text-darkGrey text-sm font-[500] text-left mt-[6px] capitalize dark:text-whiteTamkin">{{
                  item.name }}</p>

                <div v-if="item.type == 'Custom Character'"
                  class="flex items-center justify-start space-x-[26px] mt-[12px] ">
                  <button v-if="item.edit == true" class="text-tamkin underline font-[500] text-[13px] "
                    @click="openModalAndHideChat(), setData(item)">Edit request</button>
                  <button v-if="!item.edit" class="text-tamkin underline font-[500] text-[13px] "
                    @click="openModal('requestmodal_details', 'order-id'), setData(item)">View Details</button>
                    <button  class="text-tamkin underline font-[500] text-[13px] " 
                      @click="openModal('tracking_custom_order', 'order-id'), setData(item)">Track</button>
                </div>
              </div>
            </div>
            <div class="flex items-end flex-col justify-start mt-[16px] mr-[1px] ">


              <p class="text-[#021328] text-[16px] font-[500] dark:text-whiteTamkin">
                <span class="px-1">{{ item.Cost }} AED</span>
              </p>
            </div>
          </div>
        </template>

      </div>

      <div class="pb-[10px]">
        <table class="min-w-full ">

          <tbody>



            <tr class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
              <td class="py-2 px-5 border-b  dark:border-light text-right font-[500] w-full  dark:text-whiteTamkin"
                colspan="4">
                Subtotal
              </td>
              <td class="py-2   border-b dark:border-light text-right w-full font-[500]  dark:text-whiteTamkin"
                colspan="4">
                {{ orderDetails.subtotal }} AED
              </td>
            </tr>
            <tr class="text-[14px] leading-[24px]  bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
              <td class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full  dark:text-whiteTamkin"
                colspan="4">
                Discount

              </td>
              <td class="py-2   border-b dark:border-light text-right  min-w-[100px] font-[500]  dark:text-whiteTamkin"
                colspan="4">
                {{ orderDetails.discount }} AED
              </td>
            </tr>
            <tr class="text-[14px] leading-[24px]  bg-[#FAFCFE] dark:bg-p">
              <td class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full dark:text-whiteTamkin"
                colspan="4">
                Total

              </td>
              <td
                class="py-2 border-b dark:border-light text-right w-full min-w-[100px] font-[500] dark:text-whiteTamkin"
                colspan="4">
                {{ orderDetails.total }} AED
              </td>
            </tr>
          </tbody>
        </table>



      </div>
    </div>


  </div>
  <div></div>
</template>
