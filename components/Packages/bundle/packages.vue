<script lang="ts" setup>
const pricingType = inject("pricingType");
const packagesStore = usePackgesStore();

</script>

<template>

    <div class="flex items-center flex-col justify-center  w-full">
        <div
          class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full lg:rtl:space-x-reverse lg:space-x-[36px] mt-[32px]"
        >
        <!-- {{ packagesStore.getPackageByTypeAndCategory('Package') }} -->
        <div class="w-full h-[400px] mx-auto p-6 bg-white rounded-xl custom-border"  
             v-for="pak in packagesStore.getPackageByTypeAndCategory('Package').sort((a, b) => a.sort - b.sort)" 
        >
            <div class="flex justify-center items-center mb-4 space-x-[12px]">
              <div>
                <img :src="`https://tamkin.app/${pak.icon}`" alt="Pro Widget" class="w-[55px] h-[55px]">
              </div>
              <div>
                <h3 class="text-xl font-semibold text-center text-gray-800">{{pak.title}}</h3>

              </div>
            </div>
           
            <p class="text-[13px] leading-[19px] font-[400] text-darkGrey text-center">
             {{pak.sub_title}}
            </p>
            
            <p class="text-black text-[16px] font-[500] leading-[24px]  text-center mt-[44px] mb-4">{{pak.description}}</p>
            <p class="text-center text-[24px] font-[700] leading-[29px] mb-4">  $
              {{
                packagesStore.discountType === "month" ? pak.cost_month : pak.cost_yearly
              }}

            
                <span class="text-[16px] font-[500] text-[#021328]">/{{ packagesStore.discountType }}</span></p>
            <button    class="btn-dashboard hover_tamkin max-w-[200px] mx-auto mt-14">
              <span v-if="pak.is_contact_us"> Contact us </span>
              <span
                v-else-if="
                  pak.trial_days > 0 ||
                  (pak.trial_days === 0 && pak.cost_month !== 0 && pak.cost_yearly !== 0)
                "
              >
                {{
                  pak.trial_days > 0
                    ? `Try now for ${pak.trial_days} ${getDayLabel(pak.trial_days)}`
                    : "Buy now"
                }}
              </span>
              <span v-if="pak.cost_month === 0 && pak.cost_yearly === 0">
                FREE Package
              </span>
            </button>
          </div>
       
       
        </div>
      </div>

</template>