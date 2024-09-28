<script lang="ts" setup>
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const pricingType = inject("pricingType");
const packagesStore = usePackgesStore();
const mySiteStore = useMySiteStore();

function getDayLabel(number) {
  return number === 1 ? "day" : "days";
}
const openBuyModal = (pck)=>{
  packagesStore.currentPackage = pck
  packagesStore.currentWebsite = ''
  packagesStore.openedCurrentSite = false

  openModal('add_package_modal_packages')

}
const route = useRoute()
const getCurrentPackageToUpgrade = computed(()=>{

return mySiteStore.currentWebsite.package.find(pck => pck.name === route.query.package)
})
const openModalToUpgrade = async (pack)=>{


      await mySiteStore.setCurrentPackage(pack);

      // mysiteStore.currentPackage = app.package ? :null
    //   mySiteStore.currentWebsite = app
    //   mySiteStore.openedCurrentSite = true

      navigateTo(null, "upgrade_mysite", "add_package_modal_mysite");
    //   loadingPackage.value.splice({app:app,pack:pack})
}



</script>

<template>
   
  <div class="flex flex-col items-center justify-center w-full mt-[42px] px-[20px] pb-[24px]">
 
    <div
    class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full lg:rtl:space-x-reverse lg:space-x-[36px] mt-[32px]"

    >
<!-- {{  }} -->

    <!-- {{ packagesStore.getPackagesByTypeTitle('Package',getCurrentPackageToUpgrade.type,getCurrentPackageToUpgrade.category) }} -->
      <div
        v-for="pak in packagesStore.getPackagesByTypeTitle('Package',getCurrentPackageToUpgrade.type,(getCurrentPackageToUpgrade.title === 'Free' ? getCurrentPackageToUpgrade.category1 :getCurrentPackageToUpgrade.category ))"
        :key="pak.name"
        class="flex items-center flex-col custom-border mx-auto justify-start 
        !rounded-t-[10px] relative  !rounded-b-none mt-[35px] group
         bg-white hover:bg-selected dark:hover:bg-p dark:hover:bg-p w-full"
      :class="[getCurrentPackageToUpgrade.name === pak.name ? 'bg-selected':'']"
      >
        <div
          v-if="pak.type_deal !== 'None'"
          :class="[pak.type_deal === 'Best Value' ? ' bg-[#C16487] ':pak.type_deal === 'Best Deal' ?
           'bg-gradient-to-br from-[#2dada3] to-[#71dad2]':'bg-[#5E4352]']"
           class="absolute flex items-center justify-center text-[13px] leading-[17.76px]
            font-[500] w-[83px] h-[28px] rounded-[10px] text-white dark:text-darkTamkin 
            top-[-15px]   rtl:lg:right-[250px] ltr:lg:left-[250px]"
        >
          <div class=" ">{{$t(pak.type_deal)}}</div>
        </div>
        <div class="absolute top-[-30px] rtl:right-[15px] ltr:left-[15px]">
          <img :src="`http://tamkin.app/${pak.icon}`" class="w-[50px] h-[50px]" />
        </div>

        <div class="flex items-center justify-center w-full px-[15px] mt-[48px]">
          <div class="order-2 w-full">
            <h1
              class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin dark:text-whiteTamkin"
            >
              {{ $t(pak.title) }}
            </h1>
            <h2
              class="font-[400] text-[14px] leading-[15px] text-[#536174] dark:text-whiteTamkin dark:text-whiteTamkin"
            >
              {{ $t(pak.sub_title) }}
            </h2>

            <h3
              class="mt-[16px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]"
            >
              $
              {{
                packagesStore.discountType === "month"
                  ? pak.package_price_role[0].cost_month.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : pak.package_price_role[0].cost_yearly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}

              <span class="!font-[500] !text-darkGrey dark:!text-whiteTamkin !text-[18px]"
                >/{{ $t(packagesStore.discountType) }}</span
              >
            </h3>
            <div
              v-if="
                pak.package_price_role[0].cost_before_month !== 0 ||
                pak.package_price_role[0].cost_before_yearly !== 0
              "
              class="text-[#EA4335] text-[16px] font-[500] line-through px-[2px]"
            >
              <span
                v-if="
                  packagesStore.discountType === 'month' &&
                  pak.package_price_role[0].cost_before_month !== 0
                "
              >
                $ {{ pak.package_price_role[0].cost_before_month.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
           
              </span>
              <span
                v-if="
                  packagesStore.discountType === 'year' &&
                  pak.package_price_role[0].cost_before_yearly !== 0
                "
              >
                $ {{ pak.package_price_role[0].cost_before_yearly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            
              </span>
            </div>
            <div v-if="packagesStore.discountType === 'month' &&
                  pak.package_price_role[0].cost_before_month === 0 || packagesStore.discountType === 'year' &&
                  pak.package_price_role[0].cost_before_yearly === 0" class="my-[24px]">
              <!-- Content here will be displayed if either cost_before_month or cost_before_yearly is zero -->
            </div>
                       
            <p
              class="font-[700] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin dark:text-whiteTamkin"
            >
              {{ $t(pak.description )}}
            </p>
          </div>
        </div>
        <div
          class="flex group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin
           flex-col items-start justify-center w-full space-y-[10px] h-auto custom-border-collapse rounded-t-none rounded-[10px] p-4"
        >
          <div
            v-for="item in pak.package_items
              .filter((k) => k.section === 'Package')
              .sort((a, b) => a.idx - b.idx)"
            :key="item.name"
            class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
          >
            <div>
              <img
                :src="
                  item.is_available
                    ? '/assets/imgs/checked_list_active.svg'
                    : '/assets/imgs/checked_list_inactive.svg'
                "
              />
            </div>
            <div>
              <h3 class="text-[14px] font-[400] leading-[20px]">
                {{ $t(item.title)}}
              </h3>
            </div>
          </div>

          <div class="flex items-center justify-center mx-auto w-full">
            <button
            @click="openModalToUpgrade(pak)"
              :disabled="
              (pak.cost_month !== 0 && pak.cost_yearly !== 0) || pak.title === 'Free'

              "
              class="btn-dashboard hover_tamkin w-full !rounded-[19px] mx-auto"
            >
              <!-- Contact Us Case -->
              <span v-if="pak.is_contact_us"> {{ $t('Contact us') }} </span>
              <span v-if="getCurrentPackageToUpgrade.name === pak.name &&
               (getCurrentPackageToUpgrade.status !== 'Rejected' && getCurrentPackageToUpgrade.status !== 'Cancelled' &&  pak.title !== 'Free')"> {{ $t('Renew') }} </span>
              <span v-if="getCurrentPackageToUpgrade.name === pak.name &&
               (getCurrentPackageToUpgrade.status === 'Rejected' || getCurrentPackageToUpgrade.status === 'Cancelled') "> {{ $t('Try Again') }} </span>
              <!-- Trial or Buy Now Case -->
              <span
                v-else-if="
                  pak.trial_days > 0 ||
                  (pak.trial_days === 0 && pak.cost_month !== 0 && pak.cost_yearly !== 0)
                "
              >
                {{
                  pak.trial_days > 0
                    ? `Try now for ${pak.trial_days} ${getDayLabel(pak.trial_days)}`
                    : ""
                }}
              </span>

              <!-- Free Package Case -->
              <span v-else-if="(pak.cost_month === 0 && pak.cost_yearly === 0) || pak.title === 'Free'">
                {{$t('Free Package')}}
              </span>
              <span v-else>{{$t('Get Started')}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
