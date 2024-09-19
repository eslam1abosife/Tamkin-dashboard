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
const loadingchange = ref(false);
const filteredPackages = computed(() => {
  return packagesStore.packages
    .filter(
      (pkg) =>
        pkg.type === packagesStore.currentType.name &&
        pkg.package_type === "Package" &&
        pkg.package_price_role.some(
          (item) => item.title === packagesStore.traffic_level
        )
    ).sort((a, b) => a.sort - b.sort)
    .map((pkg) => {
      const priceRole = pkg.package_price_role.find(
        (item) => item.title === packagesStore.traffic_level
      );

      return {
        ...pkg,
        // Add fields from the matched price role
        cost_before_month: priceRole.cost_before_month,
        cost_year: priceRole.cost_year,
        cost_month: priceRole.cost_month,
        cost_3_month: priceRole.cost_3_month,
        cost_investor: priceRole.cost_investor,
        is_contact_us: priceRole.is_contact_us,
        data_cost_month: priceRole.data_cost_month,
        cost_yearly: priceRole.cost_yearly,
        discount_month: priceRole.discount_month,
        discount_3_month: priceRole.discount_3_month,
        discount_yearly: priceRole.discount_yearly,
        cost_before_yearly: priceRole.cost_before_yearly,
      };
    });
});
const dosomething = (p,contact)=>{
  packagesStore.bundleSelectedPackage = p

  if(contact && packagesStore.bundleSelectedPackage && packagesStore.bundleSelectedPackage.title){
    openModal('custom_package') 
    setData({
      pcktitle:packagesStore.bundleSelectedPackage.title
    })
  }else {
    packagesStore.currentPackage = p
    openModal('add_package_modal_packages')
  }
}
watch(packagesStore.traffic_level, () => {
  loadingchange.value = true;
  setTimeout(() => {
    loadingchange.value = false;

  }, 1000);
})

</script>

<template>
  <div class="flex flex-col items-center justify-center w-full" v-if="filteredPackages.length > 0">
    <div
      v-if="!loadingchange"

      class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full lg:rtl:space-x-reverse lg:space-x-[36px] mt-[32px]"
    
    >
   
      <div
        v-for="pak in filteredPackages"
        :key="pak"
        class="flex items-center flex-col custom-border mx-auto justify-start !rounded-t-[10px] relative  !rounded-b-none mt-[35px] group bg-white hover:bg-selected dark:hover:bg-p dark:hover:bg-p w-full"
        style="padding: 16px, 10px, 16px, 10px"
      >
     
        <div
          v-if="pak.type_deal !== 'None'"
          class="absolute flex items-center justify-center text-[13px] leading-[17.76px]
          font-[500] w-[83px] h-[28px] rounded-[10px] text-white dark:text-darkTamkin 
          top-[-15px]   rtl:lg:right-[250px] ltr:lg:left-[250px]"
        style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
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
            <h3  v-if="packagesStore.traffic_level  === 'Over 1M page views/mo'" 
            class="mt-[17px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]">
              {{ $t('Custom') }}
            </h3>
            <h3 v-if="packagesStore.traffic_level  !== 'Over 1M page views/mo'"
              class="mt-[10px] text-black dark:text-whiteTamkin font-[600] text-[24px] "
            >
              $
              {{
                packagesStore.discountType === "month" ? pak.cost_month : pak.cost_yearly
              }}

              <span class="!font-[500] !text-darkGrey dark:!text-whiteTamkin !text-[18px]"
                >/{{ $t(packagesStore.discountType) }}</span
              >
            </h3>
            <div v-if="packagesStore.traffic_level  === 'Over 1M page views/mo'" class="my-[24px] 
          "> 

            </div>
            <div
            v-if="packagesStore.traffic_level  !== 'Over 1M page views/mo' && 
            (pak.package_price_role[0].cost_before_month !== 0 ||
            pak.package_price_role[0].cost_before_yearly !== 0)
          "
              class="text-[#EA4335] text-[16px]  font-[500] line-through px-[2px]"
            >
              <span v-if="packagesStore.discountType === 'month' &&  pak.package_price_role[0].cost_before_month !== 0 ">
                $ {{ pak.cost_before_month }}
             
              </span>
              <span v-if="packagesStore.discountType === 'year' &&  pak.package_price_role[0].cost_before_yearly !== 0">
                $ {{ pak.cost_before_yearly }}
              
              </span>
            </div>

            <div v-if="packagesStore.discountType === 'month' &&
            pak.package_price_role[0].cost_before_month === 0 || packagesStore.discountType === 'year' &&
            pak.package_price_role[0].cost_before_yearly === 0" class="my-[24px]">
        <!-- Content here will be displayed if either cost_before_month or cost_before_yearly is zero -->
      </div>
            <p
              class="font-[700] text-[12px] leading-[32px] text-darkGrey dark:text-whiteTamkin dark:text-whiteTamkin"
            >
           {{ $t(packagesStore.traffic_level )}}
            </p>
          </div>
        </div>

        <div
          class="flex group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin flex-col items-start justify-center w-full space-y-[10px] h-[260px] custom-border-collapse rounded-t-none rounded-[10px] p-4"
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
                {{ $t(item.title) }}
              </h3>
            </div>
          </div>

          <div class="flex items-center justify-center mx-auto w-full">
            <button
            @click="dosomething(pak,pak.is_contact_us)"
              :disabled="pak.cost_month === 0 || pak.cost_yearly === 0"
              class="btn-dashboard hover_tamkin w-full !rounded-[19px] mx-auto"
            >
              <span v-if="pak.is_contact_us"> {{ $t('Contact us') }} </span>
              <span
                v-else-if="
                  pak.trial_days > 0 ||
                  (pak.trial_days === 0 && pak.cost_month !== 0 && pak.cost_yearly !== 0)
                "
              >
                {{
                  pak.trial_days > 0
                    ? `${$t('Free Trial')}`
                    : $t("Get Started")
                }}
              </span>
              <span v-if="pak.cost_month === 0 || pak.cost_yearly === 0">
                {{ $t('Free Package') }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <PackagesFeatures v-if="!packagesStore.loadingAccessibility" :current-page="'accessibility'"/>
  </div>
</template>
