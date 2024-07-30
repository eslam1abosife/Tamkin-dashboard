<script lang="ts" setup>
import { useModalManager } from "@/composables/useModalManager";
import Vue3TagsInput from "vue3-tags-input";
import "vue3-carousel/dist/carousel.css";
import {
  Carousel,
  Slide,
  Pagination,
  Navigation,
} from "vue3-carousel/dist/carousel.es.js";
definePageMeta({
  layout: "dashboard",
});
const tags = ref([]);
const  breakpoints =  {
      // 700px and up
      300: {
        itemsToShow:1.3,
        snapAlign: 'left',
      },
      700: {
        itemsToShow:1.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 2.6,
        snapAlign: 'start',
      }
    }
const plans = [
  {
    value: "free",
    name: "Free Widget",
    description: "For Individuals and Small Teams",
    image: '/assets/imgs/freeplan.svg',
    features: [
      { name: "All analytics features", active: true },
      { name: "All analytics features", active: true },
    ],
  },
  {
    value: "pro",
    name: "Pro-Accessibility Widget",
    description: "For Individuals and Small Teams",
    image: "/assets/imgs/proplan.svg",
    deal:true,
    features: [
      { name: "All analytics features", active: true },
      { name: "All analytics features", active: true },
    ],
  },
  {
    value: "premium",
    name: "Premium",
    description: "For Individuals and Small Teams",
    image: "/assets/imgs/platplan.svg",
    features: [
      { name: "All analytics features", active: true },
      { name: "All analytics features", active: true },
    ],
  },
  {
    value: "platinum",
    name: "Platinum",
    description: "For Individuals and Small Teams",
    image: "/assets/imgs/plat_plan.svg",
    features: [
      { name: "All analytics features", active: true },
      { name: "All analytics features", active: true },
    ],
  },
];
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const back = ref(false);
const currentIndex = ref(0);
const currentTab = ref("1stpackages");
const collapsed = ref(false);
const customValidate = (value) => {
  const regex = new RegExp(
    "\\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}\\b"
  );
  return regex.test(value);
};
const handleChangeTag = (tags: any) => {
  tags.value = tags;
};
const selectedPlan = ref("");
const selectPlan = (plan: any) => {
  selectedPlan.value = plan;
};

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
</script>

<template>
  <div class="overflow-x-hidden">
    <div class="space-y-[10px]">
      <h1 class="text-left text-[18px] leading-[36px] font-[600] dark:text-whiteTamkin">
        Add Site
      </h1>

      <h2
        class="text-left text-[14px] font-[400] leading-[22.5px] text-darkGrey dark:text-whiteTamkin"
      >
        Enhance your site to improve accessibility and meet compliance standards
      </h2>
    </div>

    <div class="mt-[18px] flex items-center justify-between mt-[32px]">
      <div>
        <h2
          class="text-[14px] lg:text-[16px] font-[600] leading-[30px] text-[#151515] dark:text-whiteTamkin"
        >
          Select Your package
        </h2>
      </div>
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <div>
          <h2
            class="underline text-[14px] font-[400] leading-[24px] text-[#151515] dark:text-whiteTamkin"
          >
            What’s included?
          </h2>
        </div>
        <div class="cursor-pointer" @click="collapsed = !collapsed">
          <img
            src="/assets/imgs/arrow-right.svg"
            class="w-[12px] h-[10px] rtl:rotate-180"
            :class="[collapsed ? '!rotate-90 ' : 'rotate-0']"
          />
        </div>
      </div>
    </div>
    <ClientOnly>
      <carousel  :wrap-around="false" :breakpoints="breakpoints">
        <Slide v-for="plan in plans" :key="plan" >
          <div
            class="carousel__item flex items-center custom-border  justify-start rtl:space-x-reverse 
            space-x-[16px] relative w-full py-[62px] px-[10px] h-[149px] !rounded-[10px] mt-[35px]"
            style="padding: 16px, 10px, 16px, 10px"
            :class="[
              selectedPlan && selectedPlan === plan.value
                ? 'bg-selected dark:bg-p '
                : 'bg-whiteTamkin dark:bg-tamkinDarkPrimary',
            ]"
          >
            <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
              <img :src="plan.image" class="w-[50px] h-[50px]" />
            </div>

            <div class="flex items-center justify-start relative w-full">
              <div class="order-2 mt-[22px] relative w-full">
                <h1
                  class="font-[500] text-[18px] text-left leading-[30px] dark:text-whiteTamkin ipad-max:text-[14px] ipad-max:leading-[16px]"
                >
                  {{plan.name}}
                </h1>
                <h2
                  class="font-[400] text-left text-[14px] leading-[21.86px] text-[#536174] dark:text-whiteTamkin/80 ipad-max:text-[12px] ipad-max:leading-[16px]"
                >
                {{plan.description}}
                </h2>
              </div>
              <div class="order-1 mx-[15px] ipad-max:mx-2">
                <input
                  id="radio558t6666"
                  type="radio"
                  name="plans_radio"
                  class="hidden"
                  @click.stop="selectPlan(plan.value)"
                  :value="plan.value"
                />
                <label for="radio558t6666" class="flex items-center cursor-pointer">
                  <span class="radio-tamkin"></span>
                </label>
              </div>
            </div>

            <div
              v-if="collapsed"
              class="flex flex-col pl-[42px] items-start justify-center space-y-[16px] left-[-16px] top-[90%] fixed z-[200] h-[350px] w-full custom-border-collapse rounded-t-none rounded-[10px] mt-2 p-4"
              :class="[
                selectedPlan && selectedPlan === plan.value
                ? 'bg-selected dark:bg-p '
                  : 'bg-whiteTamkin dark:bg-tamkinDarkPrimary',
              ]"
            >
              <div v-for="pf in plan.features" :key="pf.name"
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" v-if="pf.active"/>
                  <img src="/assets/imgs/checked_list_inactive.svg" v-else/>
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                   {{pf.name}}
                  </h3>
                </div>
              </div>
            
            </div>
          </div>
        </Slide>

        <template #addons >
          <Pagination  :class="[collapsed ? '!mt-[350px]' : 'mt-64']"/>
          <!-- <Navigation /> -->
        </template>
      </carousel>
    </ClientOnly>

    

    <div
      class="flex items-center justify-center lg:justify-start w-full"
      :class="[collapsed ? '' : 'lg:mt-[28px] mt-[36px]']"
    >
      <h1 class="font-[500] text-[16px] leading-[30px] dark:text-whiteTamkin">
        Enter Website URLS
      </h1>
    </div>
    <Client-only>
      <vue3-tags-input
        :tags="tags"
        class="mt-[16px] w-full h-[164px] border-[1px] !rounded-[10px] border-[#C5C5C5] dark:border-darkborder dark:bg-tamkinDarkPrimary bg-white focus:outline-none focus:ring-1 dark:text-whiteTamkin focus:ring-[#C5C5C5]"
        :validate="customValidate"
        placeholder="Add new website"
        @on-tags-changed="handleChangeTag"
      >
        <template #item="{ name, index }">
          <div
            class="flex items-center justify-center p-[6px] rtl:space-x-reverse space-x-[13px]"
          >
            <div>
              {{ name }}
            </div>
            <img src="/assets/imgs/tick.svg" v-if="name !== 'alaa.com'" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              v-else
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 text-tamkingErrorInput"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </template>
      </vue3-tags-input>
    </Client-only>
    <!-- 
 <div class="mt-[16px] w-full h-[164px]  bg-transparent focus:outline-none focus:ring-0 
    focus:ring-transparent" v-if="collapsed"></div> -->

    <button
      class="btn-dashboard-normal normal_hover my-[16px] mx-auto lg:mx-0 lg:ml-auto"
      @click="openModal('upgrade', 'add-site'), openModal('billing', 'add-site')"
    >
      Add Sites and Continue
    </button>
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(60px);
}
.carousel__track{
  @apply   relative space-x-[10px];
}
.carousel__viewport {
  @apply  !overflow-visible relative space-x-[10px];
}

.slide-fade-leave-active {
  display: none;
}

.carousel__pagination-button::after{
  @apply w-[15px] h-[15px] rounded-full cursor-pointer bg-[#D9D9D9]; 

}

.carousel__pagination-button--active::after{
 @apply  bg-tamkin; 
}

.carousel__pagination-button--active::after:hover{
  @apply  !bg-tamkin; 
 }
 .carousel__pagination-button::after:hover{
  @apply  !bg-[#D9D9D9]; 
 }
.carousel__pagination-button:hover::after{
  @apply bg-current;
}

</style>
