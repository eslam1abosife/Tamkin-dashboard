<script lang="ts" setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
const runtimec = useRuntimeConfig();
const { locale, t } = useI18n();
const navStore = useNavbarStore();
const packagesStore = usePackgesStore();
const livePackages = computed(() => {
    return packagesStore.getPackagesByTypeTitle("Package", "Live Translation");
});

const emit = defineEmits(["package-selected"]);
const handleClick =async (pack, app) => {
    try {
      console.log(1 + pack);
      console.log(1 + app);
      await emit("package-selected", app, pack);
   } catch (error) {
      console.error('Error emitting event:', error);
   }
};

const props = defineProps(["annual_prices", "loadingBlock"]);
console.log('annual_prices:' + props.annual_prices)
</script>
<template>
    <Splide v-if="navStore.defaultappobj" :options="{
        rewind: true,
        arrows: false,
        direction: `${locale === 'ar' ? 'rtl' : 'ltr'}`,
        gap: 36,
        perPage: 3,
        breakpoints: {
            768: {
                perPage: 1,
            },
            877: {
                perPage: 2,
            },
        },
        width: '100%',
    }" class="w-full">
        <SplideSlide v-for="pak in livePackages" :key="pak.name" class="!mt-[34px]">
            <div :class="[
                navStore.defaultappobj?.package?.find(
                    (t) => t.type === 'Live Translation'
                )?.name === pak.name
                    ? 'bg-selected'
                    : '',
            ]"
                class="w-full flex flex-col items-center justify-start h-[267px] relative custom-border rounded-big rounded-[19px] hover:bg-selected dark:hover:bg-p">
                <div class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin mt-[48px]">
                    ${{
                        props.annual_prices
                            ? pak.package_price_role[0].cost_before_yearly
                            : pak.package_price_role[0].cost_before_month
                    }}
                    <span class="text-[13px]">/{{ props.annual_prices ? $t("year") : $t("mo") }}</span>
                </div>
                <div class="text-[14px] font-[500] text-[#021328] dark:text-whiteTamkin mt-[12px]">
                    {{ $t(pak.title) }}
                </div>
                <div class="text-[13px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin mt-[12px]">
                    {{ $t(pak.sub_title) }}
                </div>
                <div class="w-full custom-border padding-override-1 mt-[4px]"></div>
                <div class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]">
                    <div>
                        <img :src="runtimec.public.baseImagerUrl + pak.icon" class="w-[23px] h-[23px]" />
                    </div>
                    <div class="text-[12px] leading-[14.16px] font-[500] text-black dark:text-whiteTamkin">
                        {{ $t(pak.type) }}
                    </div>
                </div>
                <button @click="
                    handleClick(navStore.defaultappobj, pak)
                    " :disabled="props.loadingBlock.find((a) => a === pak.name)" :class="[
                        navStore.defaultappobj?.package?.find(
                            (t) => t.type === 'Live Translation'
                        )?.name === pak.name
                            ? 'btn-dashboard w-auto hover_tamkin'
                            : 'btn_bordered_dashboard dark:!text-whiteTamkin hover:!text-white',
                    ]" class="mt-[24px]">
                    {{
                        navStore.defaultappobj?.package?.find(
                            (t) => t.type === "Live Translation"
                        )?.name === pak.name
                            ? $t("Current Package")
                            : $t("Get Started")
                    }}

                    <svg v-if="props.loadingBlock.find((a) => a === pak.name)"
                        class="animate-spin h-5 w-5 mx-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </button>
                <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
                    <img :src="runtimec.public.baseImagerUrl + pak.icon" />
                </div>
            </div>
        </SplideSlide>
    </Splide>
</template>
