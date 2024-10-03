<script lang="ts" setup>
const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()
const {isOpen, currentView, openModal, closeModal, goBack, navigateTo} = useModalManager();
const payStore = usePaymentStore()
const packagesStore = usePackgesStore()
const mysiteStore = useMySiteStore()
const addSiteStore = useAddSiteStore()
import { useGetAppInvites,useUpdateDefaultApp } from "@/composables/useTeam";

const { getInviteApps, defaultApp, apps, loading: getSitesLoading } = useGetAppInvites();
const getApps = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  await getInviteApps({ agency: user.agency });
};
const setDefaultQuery = async (tryagain) => {
  if (tryagain) {
    // Update the route with new query parameters
    router.push({
      path: route.path,
      query: {
        paid: undefined,
        status: undefined,
        package: route.query.package
      }
    });

    // // Reset mysiteStore when the current view is 'mysite'
    // if (currentView('success_pay_package') === 'mysite') {
    //   mysiteStore.currentPackage = '';
    //   mysiteStore.packagePayload = '';
    //   mysiteStore.tags = [];
    //   mysiteStore.validatedSites = [];
    //   mysiteStore.loadingBlock = [];

    //   await getApps(); // Fetch apps asynchronously
    //   return navigateTo('success_pay_mysite', 'mysite', 'payment_methods_mysite'); // Navigate after fetching apps
    // } else {
      closeModal('success_pay_mysite'); // Close modal if not 'mysite'
    // }

  } else {
    
     router.push(localePath('/my-site'));
     closeModal('success_pay_mysite');

    addSiteStore.currentPackage = '';
    addSiteStore.packagePayload = '';
    addSiteStore.tags = [];
    addSiteStore.validatedSites = [];
    addSiteStore.loadingBlock = [];
    // Close modal if not trying again

    // // Navigate to '/my-site'
    await getApps(); // Fetch apps asynchronously

  }
};



</script>

<template>
  <div

  class="bg-selected dark:bg-p fixed z-[9999] top-[0] rtl:lg:left-0  ltr:right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full
   h-full lg:h-screen lg:overflow-x-hidden"
>
  <div
    style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
    class="close_btn_payment !cursor-pointer z-[999] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[10px]"
    @click="setDefaultQuery(false)"
  >
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
  <div class="w-full h-full">
    <div v-if="$route.query && $route.query.paid === 'True' || payStore.stateOfPayment === 'paid'"
    class="flex flex-col items-center justify-center bg-white dark:bg-tamkinDarkPrimary 
     w-full h-full rounded-[10px] mt-[55px] pt-[55px] mb-[87px]"
    style="box-shadow: 0px 4px 24px 8px #51459f14"
  >

  <div>
      <img  src="/assets/imgs/payment_methods/success.svg" class="w-[74px] h-[85px]" />
  </div>
  

 <div class="flex flex-col items-center justify-center mx-auto  px-[70px]  w-full">

<div class="w-full mt-[16px]">
  <h1 class="text-center text-tamkin text-[18px] leading-[40px] font-[500]">
      {{ $t('Congratulations') }}
  </h1>
</div>
<div class="w-full ">
<p class="text-[14px] text-center leading-[40px] font-[500] mt-[16px] text-[#1E1E1E] dark:text-whiteTamkin">
  
  {{$t('Your payment has been successfully processed. Thank you for your purchase!')}}</p>
</div>




 </div>
 <div class="mt-[16px]  mx-auto mb-[260px] px-[20px]">
  <button class="btn-dashboard  hover_tamkin  lg:w-[400px] w-full " @click.stop="setDefaultQuery(false)" >
      {{$t('Done')}}   </button>

</div>

  </div>
  <div v-if="$route.query && $route.query.paid === 'False' || $route.query && $route.query.paid === 'false' || payStore.stateOfPayment === 'failed'"
  class="flex flex-col items-center justify-center bg-white  w-full h-full rounded-[10px] mt-[55px] pt-[55px] mb-[40px]"
  style="box-shadow: 0px 4px 24px 8px #51459f14"
>

<div>
    <img  src="/assets/imgs/payment_methods/declined.svg" class="w-[50px] h-[50px]" />
</div>


<div class="flex flex-col items-center justify-center mx-auto  px-[70px]  w-full">

<div class="w-full mt-[16px]">
<h1 class="text-center text-[#D43139] text-[24px] leading-[40px] font-[500]">
    {{$t('Declined Transaction')}}
</h1>
</div>
<div class="w-full ">
<p class="text-[16px] text-center leading-[40px] font-[500] mt-[16px] text-[#1E1E1E]">

{{ $t('Your payment was declined. Please check details or contact your bank') }}
</p>
</div>




</div>
<div class="flex flex-col items-center justify-center space-y-[24px] w-full mt-[24px]  px-[20px] mx-auto mb-[260px]">
  <button class="btn-dashboard hover_tamkin mx-auto   lg:w-[400px] w-full "
  @click="setDefaultQuery(true)">
    {{$t('Try again')}}
   </button>
<button class="btn_bordered_dashboard hover_tamkin mx-auto  lg:w-[400px] w-full "
 @click="setDefaultQuery(false)">
   {{$t('Back')}}
  </button>
</div>
<!-- <div class="mt-[129px]  mx-auto mb-[34px]">
<button class="processing_payment   lg:w-[535px] w-full " disabled>
  Payment Processing...
</button>
</div> -->
</div>
  
  </div>
</div>
</template>
