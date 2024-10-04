<script lang="ts" setup>
const props = defineProps({
  sectionTitle: {
    type: String,
    required: true,
  },
  sectionSubTitle: {
    type: String,
    required: true,
  },
  // websiteLink: {
  //   type: String,
  //   required: true,
  // },
  // websiteImgName: {
  //   type: String,
  //   required: true,
  // },
});

const getImageUrl = computed(() => {
  // Directly reference the public directory path
  return `/assets/imgs/icons/mysite.svg`;
});

import { useApi } from "@/composables/useApi";
const { useApiInstance } = useApi();
const { api, loading } = useApiInstance();

const app = ref({});

const getApps = async () => {
  try {
    const res = await api.post("/Apps/GetApps");
    app.value = res.data.data.find((el) => el.isdefault == 1);
  } catch (error) {
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

onBeforeMount(() => {
  getApps();
});
</script>

<template>
  <div class="space-y-[10px]" v-if="Object.keys(app).length">
    <h1
      class="rtl:text-right ltr:text-left text-[20px] leading-[36px] font-[600] dark:text-whiteTamkin"
    >
      {{ sectionTitle }}
    </h1>
  
    <h2
      class="text-right ltr:text-left text-[13px] font-[400] leading-[22.5px] text-darkGrey dark:text-whiteTamkin/90"
    >
      {{$t(sectionSubTitle)}}
    </h2>
  
    <div
      class="relative mt-[-10px] lg:mt-[5px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col w-full justify-center lg:justify-start"
    >
      <div
        class="flex flex-col lg:flex-row items-start lg:items-center justify-between"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
          <!-- Icon Container -->
          <div
            class="flex items-center justify-center bg-white dark:bg-tamkinDarkPrimary w-[50px] h-[50px] custom-border-tamkin custom-border-tamkin-rounded rounded-full"
            style="box-shadow: 0px 4px 24px 8px rgba(81, 69, 159, 0.1)"
          >
            <img :src="getImageUrl" class="h-[30px] w-[30px]" />
          </div>
  
          <div class="flex flex-col space-y-[8px] rtl:space-x-reverse space-x-[16px]">
            <!-- Website Title and Link -->
            <h2 class="font-[600] text-[14px] leading-[24px] text-darkGrey dark:text-whiteTamkin/90">
              {{ websiteTitle }}
            </h2>
  
            <div>
              <a
                :href="websiteLink"
                target="_blank"
                class="text-tamkin font-[600] text-[14px] leading-[24px] flex items-center"
              >
                {{ $t('Visit Site') }}
                <img 
                  src="/assets/imgs/icons/external_link.svg"
                  class="rtl:mr-[14px] ltr:ml-[14px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
