<script lang="ts" setup>
const pricingType = inject("pricingType");
const packagesStore = usePackgesStore();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData,
  setData
} = useModalManager();
const openModalCustom = (pk)=>{
  packagesStore.bundleSelectedPackage = pk

  if(packagesStore.bundleSelectedPackage && packagesStore.bundleSelectedPackage.name){
    openModal('custom_package') 
    setData({
      package:packagesStore.bundleSelectedPackage.title
    })
  }
}
</script>

<template>

    <div class="flex items-center flex-col justify-center  w-full">
        <div
          class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center px-[20px]
           lg:justify-evenly h-full w-full lg:rtl:space-x-reverse lg:space-x-[36px] mt-[32px]"
        >
        <!-- {{ packagesStore.getPackageByTypeAndCategory('Package') }} -->
          
        <div class="w-full h-auto mx-auto  bg-white rounded-xl custom-border relative  p-6"  
             v-for="pak in packagesStore.getPackageByTypeAndCategory('Package').sort((a, b) => a.sort - b.sort)" 
        >
   
            <div class="flex justify-center items-center mb-[14px] rtl:space-x-reverse space-x-[12px]">
              <div>
                <img :src="`https://tamkin.app/${pak.icon}`" alt="Pro Widget" class="w-[55px] h-[55px]">
              </div>
              <div>
                <h3 class="text-xl font-semibold text-center text-gray-800">{{$t(pak.title)}}</h3>

              </div>
            </div>
           
            <p class="text-[13px] leading-[19px] font-[400] text-darkGrey text-center">
             {{$t(pak.sub_title)}}
            </p>
<!--           
            <p class="text-black text-[16px] font-[500] leading-[24px]  text-center mt-[44px] mb-4" v-if="pak.package_price_role[0].cost_before_yearly > 0">{{$t(pak.description)}}</p>
            <p class="text-center text-[24px] font-[700] leading-[29px] mb-4" v-if=" pak.package_price_role[0].cost_before_yearly > 0">  $
              {{
                pak.package_price_role[0].cost_before_yearly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
              
            
                <span class="text-[16px] font-[500] text-[#021328]" v-if=" pak.package_price_role[0].cost_before_yearly > 0">/{{$t('year')}}</span></p> -->
                <h3 class="text-2xl font-semibold text-center text-gray-800 my-[14px]">Bundle</h3>

                   
              <div class="w-full">
                <button @click="openModalCustom(pak)"
                :disabled="pak.cost_month !== 0 && pak.cost_yearly !== 0 && !pak.is_contact_us && pak.trial_days === 0"
                class="btn-dashboard   m  hover_tamkin max-w-[200px] !rounded-[19px] mx-auto"
              >
                <!-- Contact Us Case -->
                <span v-if="pak.is_contact_us">
                  {{ $t('Contact us') }}
                </span>
                
                <!-- Trial or Buy Now Case -->
                <span v-else-if="pak.trial_days > 0 || (pak.trial_days === 0 && pak.cost_month !== 0 && pak.cost_yearly !== 0)">
                  {{ pak.trial_days > 0 
                      ? `${$t('Free Trial')}` 
                      : "" 
                  }}
                </span>
                
                <!-- Free Package Case -->
                <span v-else-if="pak.cost_month === 0 && pak.cost_yearly === 0">
                  {{ $t('Free Package') }}
                </span>
                <span v-else>{{$t('Get Started')}}</span>
              </button>
              </div>
          </div>
       
       
        </div>
      </div>

</template>