<script lang="ts" setup>
import { useOverviewStore } from "@/stores/overview";

const overviewStore = useOverviewStore()

const props = defineProps({
    planType: {
        type: String,
        required: true
    },
    isInstalled: {
        type: Boolean,
        required: true
    },
    mediaType: String

})
const pricingType = ref("monthly");
const switchBetweenMonthlyAndAnnual = (v: any) => {
    pricingType.value = v;
};

const currentIndex = ref(0);

const back = ref(false);

const next = () => {
    back.value = false;
    currentIndex.value++;
};
const prev = () => {
    back.value = true;
    if (currentIndex.value == 1) {
        currentIndex.value--;
    }
};

const emit = defineEmits(["changePlan"]);

const currentPlan = ref(props.planType);

const changePlan = (data: string) => {
    currentPlan.value = data;
    emit("changePlan", data);
};

</script>


<template>


    <div class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]">
        <div class="w-full  rounded-[10px] 

  flex flex-col items-start justify-between h-full p-[15px] relative"
            :class="[mediaType === 'media' ? 'bg-gradient-to-r from-[#778096] via-[#AA98A2] to-[#ECC1BF]' : mediaType === 'docs' ? 'bg-[#DEE4F9]' : 'bg-gradient-to-r from-[#D6D4F4] via-[#EBE2EA] to-[#FFEFE0]']">
            <div class="flex flex-col items-start justify-between h-[180px] w-full">
                <div class="flex items-center space-x-[10px]">
                    <img class="w-[40px] h-[40px]" src="/assets/imgs/signlanguageservices/freetrial.png" alt="" />
                    <div class="text-[16px] lg:text-[18px] font-[600] leading-[30px]"
                        :class="[mediaType === 'docs' || mediaType === 'photos' ? 'text-darkGrey' : 'text-white']">
                        Free Trial
                    </div>
                </div>

                <div class="text-[14px] lg:text-[18px] ipad-max:text-[14px]  ipad-max:w-2/4 
  lg:leading-[33px] leading-[20px] w-full lg:w-2/4"
                    :class="[mediaType === 'docs' ? 'text-darkGrey font-[500] ' : mediaType === 'media' ? 'text-white font-[600]' : 'text-darkGrey font-[500]' ]">
                    Enjoy a 14-day free trial, where you can translate up to 50 words and 50 minutes
                </div>



                <button @click="changePlan('pro')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
                    Try it Now
                </button>
            </div>

            <div class="lg:flex hidden absolute right-[100px] inset-y-[0] h-full " v-if="mediaType === 'media'">


                <div class="relative h-full z-[10]">

                    <img src="/assets/imgs/signlanguageservices/hero.png" class="w-[222px] h-[163px]" alt="" />

                </div>
                <div class="absolute lg:right-[350px] ipad-max:right-[250px] bottom-[3px] w-full">
                    <img src="/assets/imgs/signlanguageservices/vector.png" class="w-[202px]  h-[202px] opacity-15"
                        alt="" />

                </div>
                <div class="absolute lg:right-[0] ipad-max:right-[0] bottom-[14px] w-[287px]">

                    <img src="/assets/imgs/signlanguageservices/translate_audiobanner.png" class="w-[287px]  h-[47px] "
                        alt="" />
                </div>
            </div>

            <div class="lg:flex hidden absolute right-[150px] inset-y-auto h-full " v-if="mediaType === 'docs'">


                <div class="relative h-full z-[10]">

                    <img src="/assets/imgs/signlanguageservices/word_hero.png" class="w-[351px] h-[163px]" alt="" />

                </div>
                <div class="absolute right-[-300px] top-[20px] w-full space-y-[50px]">
                    <div
                        class="rotate-6 w-[156px] h-[36px] flex items-center justify-center bg-white rounded-[5px] text-[16px] leading-[19px] font-[400] text-[#49545F]">
                        Translate Word
                    </div>

                    <div
                        class="-rotate-6 w-[156px] h-[36px] flex items-center justify-center bg-white rounded-[5px] text-[16px] leading-[19px] font-[400] text-[#49545F]">
                        Translate PDF
                    </div>
                </div>

            </div>
            <div class="lg:flex hidden absolute right-[0] inset-y-auto h-full " v-if="mediaType === 'photos'">


                <div class="relative h-full z-[10]">

                    <img src="/assets/imgs/signlanguageservices/hero_photos.png" class="w-[273px] h-[182px]" alt="" />

                </div>
                <div class="absolute right-[400px] top-[-15px] w-full space-y-[50px]">
                    <img src="/assets/imgs/signlanguageservices/vector_photos.png" alt="">
                </div>

            </div>
        </div>

        <div class="flex items-center flex-col justify-center px-[15px]">
            <div
                class="flex items-center lg:flex-row flex-col justify-center lg:justify-between lg:space-y-0 space-y-3 w-full mt-[32px]">
                <div class="text-[15px] leading-[22.5px] font-[500] dark:text-whiteTamkin">
                    Accessibility Widget Pricing
                </div>

                <div
                    class="inline-flex items-center rounded-full bg-tamkinLight  dark:bg-transparent  dark:border-darkborder p-1 border border-gray-300">
                    <button @click="switchBetweenMonthlyAndAnnual('monthly')"
                        :class="[pricingType === 'monthly' ? 'bg-white dark:bg-darkTamkin rounded-full' : '']"
                        class="py-2 px-4 transition-all ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[14px] leading-[22.5px]">
                        Monthly
                    </button>
                    <button :class="[pricingType === 'annual' ? 'bg-white dark:bg-darkTamkin rounded-full' : '']"
                        @click="switchBetweenMonthlyAndAnnual('annual')" class="py-2 px-2 transition-all ease-in-out text-darkGrey  dark:text-whiteTamkin 
            font-[500] text-[14px] leading-[22.5px] mr-[4px]">
                        Annual
                        <span class="!text-black dark:!text-whiteTamkin/80 text-[11px] leading-[18px] font-[600]">SAVE
                            12%</span>
                    </button>
                </div>
            </div>
            <transition-group mode="in-out" tag="div" class="w-full overflow-x-hidden" name="slide-fade">
                <div v-if="currentIndex === 0" key="1"
                    class="flex items-center lg:flex-row md:flex-row md:space-x-[10px] flex-col justify-center lg:justify-between
         ipad-max:space-x-[4px] ipad-max:rtl:space-x-reverse  h-full w-full lg:rtl:space-x-reverse lg:space-x-[36px]  mt-[32px]">
                    <div class="flex items-center flex-col custom-border justify-start !rounded-t-[10px]
             !rounded-b-none mt-[35px] group hover:bg-selected dark:hover:bg-p dark:hover:bg-p w-full"
                        style="padding: 16px, 10px, 16px, 10px">
                        <div class="absolute top-[-30px] left-[15px]">
                            <img src="/assets/imgs/freeplan.svg" class="w-[50px] h-[50px]" />
                        </div>

                        <div class="flex items-center justify-center relative w-full px-[15px] mt-[48px]">
                            <div class="order-2 relative w-full">
                                <h1
                                    class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin dark:text-whiteTamkin">
                                    Free Widget</h1>
                                <h2
                                    class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin dark:text-whiteTamkin">
                                    For Individuals and Small Teams
                                </h2>
                                <div
                                    class="absolute top-[41px] left-[-8px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]">
                                    <div
                                        class="absolute  left-[10px] text-[#EA4335] text-[12px] leading-[18.17px] font-[400] crossed-out">
                                        <span>$18,000</span>
                                    </div>
                                </div>
                                <h3
                                    class="mt-[10px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]">
                                    $ 00
                                    <span
                                        class="!font-[500] !text-darkGrey dark:!text-whiteTamkin !text-[18px]">/month</span>
                                </h3>

                                <p
                                    class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin dark:text-whiteTamkin">
                                    <span class="!font-[700]">UP to 100K </span>Page views/mo
                                </p>
                            </div>
                        </div>

                        <div class="flex group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin  flex-col items-start justify-center w-full 
              space-y-[10px] h-[305px] custom-border-collapse rounded-t-none rounded-[10px] p-4">
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_inactive.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-center mx-auto w-full">
                                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center flex-col custom-border-tamkin padding-override-1  group hover:bg-selected dark:hover:bg-p dark:hover:bg-p
             justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-full" style="padding: 16px, 10px, 16px, 10px">
                        <div class="absolute   flex items-center justify-center text-[13px] leading-[17.76px]  font-[500] w-[83px]
          h-[28px] rounded-[10px] text-white dark:text-darkTamkin top-[-15px] rtl:right-[200px] 
          ltr:left-[100px] rtl:lg:right-[250px] ltr:lg:left-2/4" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
">
                            <div class=" ">
                                Best Deal
                            </div>
                        </div>
                        <div class="absolute top-[-30px] left-[15px]">
                            <img src="/assets/imgs/proplan.svg" class="w-[50px] h-[50px]" />
                        </div>

                        <div class="flex items-center justify-center relative w-full px-[15px] mt-[48px]">

                            <div class="order-2 relative w-full">

                                <h1
                                    class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin dark:text-whiteTamkin">
                                    Pro- Widget</h1>
                                <h2
                                    class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin dark:text-whiteTamkin">
                                    For Individuals and Small Teams
                                </h2>
                                <div
                                    class="absolute top-[41px] left-[-8px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]">
                                    <div
                                        class="absolute  left-[10px] text-[#EA4335] text-[12px] leading-[18.17px] font-[400] crossed-out">
                                        <span>$18,000</span>
                                    </div>
                                </div>
                                <h3
                                    class="mt-[10px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]">
                                    $ {{ pricingType === "annual" ? "1000" : "150" }}
                                    <span class="!font-[500] !text-darkGrey dark:!text-whiteTamkin !text-[18px]">/{{
                                        pricingType === "annual" ? "year" : "month" }}</span>
                                </h3>

                                <p
                                    class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin dark:text-whiteTamkin">
                                    <span class="!font-[700]">UP to 1M </span>Page views/mo
                                </p>
                            </div>
                        </div>

                        <div class="flex custom-border-collapse-tamkin
               group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin dark:group-hover:bg-p dark:text-whiteTamkin
              flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4">
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_inactive.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-center mx-auto w-full">
                                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center flex-col custom-border-tamkin 
             group hover:bg-selected dark:hover:bg-p
            padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-full"
                        style="padding: 16px, 10px, 16px, 10px">
                        <div class="absolute top-[-30px] left-[15px]">
                            <img src="/assets/imgs/overview/prem_plan.svg" class="w-[50px] h-[50px]" />
                        </div>

                        <div class="flex items-center justify-center relative w-full px-[15px] mt-[48px]">
                            <div class="order-2 relative w-full">
                                <h1 class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin">Premium</h1>
                                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin">
                                    For Individuals and Small Teams
                                </h2>

                                <h3
                                    class="mt-[10px] text-black font-[600] text-[24px] leading-[29px]  dark:text-whiteTamkin">
                                    $ {{ pricingType === "annual" ? "1500" : "300" }}
                                    <span class="!font-[500] !text-darkGrey !text-[18px] dark:!text-whiteTamkin">/{{
                                        pricingType === "annual" ? "year" : "month" }}</span>
                                </h3>

                                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin">
                                    <span class="!font-[700]">UP to 2M </span>Page views/mo
                                </p>
                            </div>
                        </div>

                        <div class="flex custom-border-collapse-tamkin 
               group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin
              flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4">
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_inactive.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-center mx-auto w-full">
                                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="currentIndex === 1" key="2"
                    class="flex items-center lg:flex-row md:flex-row md:space-x-[10px] flex-col justify-center lg:justify-between
         ipad-max:space-x-[4px] ipad-max:rtl:space-x-reverse  h-full w-full lg:rtl:space-x-reverse lg:space-x-[36px]  mt-[32px]">
                    <div class="flex items-center flex-col custom-border-tamkin 
             group hover:bg-selected dark:hover:bg-p
            padding-override-1 justify-start !rounded-t-[10px] mt-[35px] w-full"
                        style="padding: 16px, 10px, 16px, 10px">
                        <div class="absolute top-[-30px] left-[15px]">
                            <img src="/assets/imgs/overview/advanced_plan.svg" class="w-[50px] h-[50px]" />
                        </div>

                        <div class="flex items-center justify-center relative w-full px-[15px] mt-[48px]">
                            <div class="order-2 relative w-full">
                                <h1 class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin">Advanced</h1>
                                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin">
                                    For Individuals and Small Teams
                                </h2>

                                <h3
                                    class="mt-[10px] text-black font-[600] text-[24px] leading-[29px]  dark:text-whiteTamkin">
                                    $ {{ pricingType === "annual" ? "4000" : "400" }}
                                    <span class="!font-[500] !text-darkGrey !text-[18px] dark:!text-whiteTamkin">/{{
                                        pricingType === "annual" ? "year" : "month" }}</span>
                                </h3>

                                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin">
                                    <span class="!font-[700]">UP to 3M </span>Page views/mo
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-col items-start justify-center
               group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin
              w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4">
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_inactive.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-center mx-auto w-full">
                                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center flex-col custom-border-tamkin padding-override-1 justify-start !rounded-t-[10px] 
             group hover:bg-selected dark:hover:bg-p
            !rounded-b-none mt-[35px] w-full" style="padding: 16px, 10px, 16px, 10px">
                        <div class="absolute top-[-30px] left-[15px]">
                            <img src="/assets/imgs/plat_plan.svg" class="w-[50px] h-[50px]" />
                        </div>

                        <div class="flex items-center justify-center relative w-full px-[15px] mt-[48px]">
                            <div class="order-2 relative w-full">
                                <h1 class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin">Platinum</h1>
                                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin">
                                    For Individuals and Small Teams
                                </h2>

                                <h3
                                    class="mt-[10px] text-black font-[600] text-[24px] leading-[29px]  dark:text-whiteTamkin">
                                    $ {{ pricingType === "annual" ? "5000" : "500" }}
                                    <span class="!font-[500] !text-darkGrey !text-[18px] dark:!text-whiteTamkin">/{{
                                        pricingType === "annual" ? "year" : "month" }}</span>
                                </h3>

                                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin">
                                    <span class="!font-[700]">UP to 4M </span>Page views/mo
                                </p>
                            </div>
                        </div>

                        <div class="flex custom-border-collapse-tamkin
               group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin
              flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4">
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_inactive.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-center mx-auto w-full">
                                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center flex-col custom-border-tamkin 
             group hover:bg-selected dark:hover:bg-p
            padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-full"
                        style="padding: 16px, 10px, 16px, 10px">
                        <div class="absolute top-[-30px] left-[15px]">
                            <img src="/assets/imgs/overview/enterprise_plan.svg" class="w-[50px] h-[50px]" />
                        </div>

                        <div class="flex items-center justify-center relative w-full px-[15px] mt-[48px]">
                            <div class="order-2 relative w-full">
                                <h1 class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin">Enterprise</h1>
                                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin">
                                    For Individuals and Small Teams
                                </h2>

                                <h3
                                    class="mt-[10px] text-black font-[600] text-[24px] leading-[29px]  dark:text-whiteTamkin">
                                    $ {{ pricingType === "annual" ? "5500" : "600" }}
                                    <span
                                        class="!font-[500] !text-darkGrey !text-[18px] dark:!text-whiteTamkin">/month</span>
                                </h3>

                                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin">
                                    <span class="!font-[700]">UP to 5M </span>Page views/mo
                                </p>
                            </div>
                        </div>

                        <div class="flex custom-border-collapse-tamkin flex-col 
               group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin
              items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4">
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_inactive.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                                <div>
                                    <img src="/assets/imgs/checked_list_active.svg" />
                                </div>
                                <div>
                                    <h3 class="text-[14px] font-[400] leading-[20px]">
                                        All analytics features
                                    </h3>
                                </div>
                            </div>
                            <div class="flex items-center justify-center mx-auto w-full">
                                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
            <div class="flex items-center justify-center mx-auto rtl:space-x-reverse space-x-[8px] my-[32px]">
                <div :class="[currentIndex === 0 ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
                    class="w-[15px] h-[15px] rounded-full cursor-pointer" @click="prev"></div>
                <div :class="[currentIndex === 1 ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
                    class="w-[15px] h-[15px] rounded-full cursor-pointer" @click="next"></div>
            </div>
        </div>

    </div>
</template>