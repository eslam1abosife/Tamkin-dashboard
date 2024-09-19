<script lang="ts" setup>
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData
} = useModalManager();
definePageMeta({
  layout: "dashboard",
});
const moreDetails = ref(false);
const packagesStore = usePackgesStore()
const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};


const openMoreDetails = () => {
  moreDetails.value = !moreDetails.value;
};

const boxShadowStyle = computed(() => {
  return moreDetails.value ? { boxShadow: "0px 0px 5.6px 0px #C8FEF9" } : {};
});

onMounted(async ()=>{

  packagesStore.currentTab = "";
  packagesStore.currentTabTitle = "Plugins";
})
onUpdated(()=>{
packagesStore.setFaq()
    
})
</script>

<template>
  <div class="w-full relative px-[40px] flex items-center justify-center flex-col" v-if="packagesStore.currentType.title === 'Bundle'"> 
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <div class="text-[18px] font-[700] leading-[35px] text-black  w-full flex items-center justify-center" >
        
       
          <div v-html="`${$t(packagesStore.getPackageDetails().color_title)}`" ></div>
          <!-- <div class="w-full flex flex-col items-center justify-center text-center">
            <div class="flex rtl:order-1">
              <div class="inline-block  mb-2">باقات متكاملة</div>
              <div class="inline-block bg-gradient-to-br from-[#2DADA3] to-[#3A4D8F] text-transparent bg-clip-text px-1 mb-2">
                تقدم حلولًا شاملة ومريحة
              </div>
            </div>
                <div class="inline-block rtl:order-2">
                  تلبي جميع احتياجاتك بسهولة وفعالية
               
                </div>
              </div> -->
        
          <!-- <div class="w-full flex flex-col items-center justify-center text-center">
        <div class="flex">
          <div class="inline-block rtl:order-3 mb-2">Comprehensive</div>
          <div class="inline-block bg-gradient-to-br from-[#2DADA3] to-[#3A4D8F] text-transparent bg-clip-text px-1 mb-2">
            All-in-One Bundle Package
          </div>
        </div>
            <div class="inline-block rtl:order-1">
              for Complete and Convenient Solutions<br>
              Pro Widget
            </div>
          </div> -->
          
         <!-- <div class="w-full lg:w-3/4 text-center">
          <span class="inline-block rtl:order-2">Comprehensive</span>
          <span class="inline-block bg-gradient-to-br rtl:order-1 from-[#2DADA3] to-[#3A4D8F] text-transparent bg-clip-text px-1">
            All-in-One Bundle Package
          </span>
          <span class="inline-block rtl:order-3">
            for Complete and Convenient Solutions<br />
            Pro Widget
          </span>
   
        </div> -->
        
      </div>

    
    </div>
 

    <div class="flex flex-col items-center justify-center bg-white rounded-[10px] mt-[74px] ">

     <PackagesModalsCustomPackage/>
      
        <PackagesBundlePackages/>
 



    <!-- FAQ START-->

    <PackagesFaq/>


    <!-- FAQ END-->

    <PackagesContact/>

</div>
    <!-- END SHOW MORE DETAILS-->




  </div>
</template>

<style></style>
