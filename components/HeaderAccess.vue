<script lang="ts" setup>
const props = defineProps({
    websiteTitle:{
        type:String,
        required:true
    },
    sectionTitle:{
        type:String,
        required:true
    },
    sectionSubTitle:{
        type:String,
        required:true
    },
    websiteLink:{
        type:String,
        required:true
    },
    websiteImgName:{
        type:String,
        required:true
    }
})

const getImageUrl = computed(() => {
  // Directly reference the public directory path
  return `/imgs/${props.websiteImgName}`;
});
</script>


<template>
    <div class="space-y-[10px]">
        <h1 class="rtl:text-right ltr:text-left text-[20px] leading-[36px] font-[600]">{{sectionTitle}}</h1>

        <h2 class="text-right ltr:text-left text-[13px] font-[400] leading-[22.5px] text-darkGrey">

{{sectionSubTitle}}
        </h2>
      </div>

      <div
        class="relative mt-[5px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col w-full justify-center lg:justify-start"
      >
        <div
          class="flex items-center lg:flex-row flex-col justify-start py-[16px] w-full rounded-[10px]"
        >
          <div class="w-full space-y-[16px]">
            <div class="flex flex-col lg:flex-row items-center justify-between">
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
                <div
                  class="flex items-center justify-center bg-white w-[50px] h-[50px] 
                  custom-border-tamkin custom-border-tamkin-rounded rounded-full"
                  style="box-shadow: 0px 4px 24px 8px rgba(81, 69, 159, 0.1);
"
                >
                  <img :src="getImageUrl" alt="" class="h-[30px] w-[30px]" />
                </div>
                <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
                  <!-- <h2 class="font-[600] text-[16px] leading-[24px] text-[#C5C5C5]">Select Site</h2> -->
                  <div>
                    <h2 class="font-[600] text-[14px] leading-[24px] text-darkGrey">
                      {{ websiteTitle }}
                    </h2>
                  </div>
                  <div>
                    <a
                      :href="websiteLink"
                      target="_blank"
                      class="text-tamkin font-[600] text-[14px] leading-[24px] flex ]"
                      >Visit Site
                      <img
                        src="/assets/imgs/icons/external_link.svg"
                        class="rtl:mr-[14px] ltr:ml-[14px]"
                        alt=""
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </template>