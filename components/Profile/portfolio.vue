<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, toRefs, computed, onMounted, watch, inject } from "vue";
import { useGetSocialPlatforms } from "@/composables/useProfile";

const { getSocialPlatforms, socialPlatforms } = useGetSocialPlatforms();
const profileStore = useProfileStore();
// Reactive state
const state = reactive({
  handlers: [
    {
      name: "",
      icon: "test",
      handler: "",
    },
  ],
});

// Vuelidate rules
const rules = {
  handlers: {
    $each: {
      name: { required, minLength: minLength(3) },
    },
  },
};


const profileSocialAccounts = computed(() => {
  const socialAccounts = socialPlatforms.value

  if (!socialAccounts || !Array.isArray(socialAccounts)) {
    return []; 
  }

  return socialAccounts.map((account: any) => {
    const platform = socialPlatforms.value.find(
      (handler: any) => handler.name === account.social_platform
    );
    
    return {
      ...account,
      icon: platform ? platform.icon : '', 
    };
  });
});





// Vuelidate instance
const v$ = useVuelidate(rules, state);

const props = defineProps(['currentTab']);
const emit = defineEmits(["cancelupdate"]);
const currentMode = inject('currentMode');

// Methods
const cancelUpdate = () => {
  emit("cancelupdate");
};

const updateSocial = (event: object, handler: object) => {
  // console.log('social event ==> ', event);
  // console.log('social handler ==> ', handler);
};



  onMounted(async () => {
  await getSocialPlatforms();
// console.log(profileSocialAccounts.value)

  // await profileStore.setMemberPlatforms(profileStore.member.social_accounts)

})
const getPlatformIconUrl = (type: string) => {
  const platform = socialPlatforms.value.find(
    (handler: any) => handler.name === type
  );
  return platform ? `https://tamkin.app/${platform.icon}` : '';
};

watch(profileSocialAccounts,async (newValue) => {
  const socialPayload = newValue.map((item: any) => {
      return {
        link: item.link,
        type: item.social_platform
      }
    })
    await  profileStore.setMemberPlatforms(socialPayload)

}, { deep: true })


const { handlers } = toRefs(state);
</script>

<template>
  <div
    class="bg-white/60 shadow-sm rounded-[10px] backdrop-blur-md h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full"
  >

 
    <div class="flex items-center justify-between w-full">
      <div class="text-[16px] leading-[24px] font-[600]">Portfolio</div>

<<<<<<< HEAD
      <div
        class="flex items-center justify-evenly space-x-[16px] ipad-max:flex-wrap"
        v-if="currentMode === 'normal'"
      >
      
        <template v-if="profileSocialAccounts">
          <a
            v-for="(platform, index) in profileStore.member.social_accounts"
            :key="index"
            :href="platform.link.startsWith('http') ? platform.link : `https://${platform.link}`"
            target="_blank"
            class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center"
          >
            <img :src="getPlatformIconUrl(platform.social_platform)" class="w-[25px] h-[25px]" alt="" />
          </a>
        </template>
      </div>
=======
    <div
      class="flex items-center justify-evenly space-x-[16px]   ipad-max:flex-wrap"
      v-if="currentMode === 'normal'"
    >
    <a
        v-for="(platform, index) in profileStore.getPortfolioView"
       
        :key="index"
        :href="platform.link"
        target="_blank"
        class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center"
      >
        <img   :src="`https://tamkin.app/${platform.icon}`" class="w-[25px] h-[25px]" alt="" />
      </a>
>>>>>>> 2bc613d33a961d74ecb0f21ce2a9c684f8f3e36c
    </div>

    <div class="flex flex-col items-start justify-start w-full" v-if="currentMode === 'editing'">
      <div class="flex items-center justify-start space-x-[16px] w-full my-[10px]" v-for="(handler, index) in profileStore.member.social_accounts" :key="index">
        <div class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center">
          <img :src="getPlatformIconUrl(handler.icon)" class="w-[25px] h-[25px]" alt="" />
        </div>

        <div class="w-full relative">
          <input
            type="text"
            :id="`handler-${index}`"
            v-model="handler.link"
            placeholder=""
            class="input_floating_label peer w-full"
            :class="{
              input_error: v$.handlers?.$each?.[index]?.name?.$error && v$.handlers?.$each?.[index]?.name?.required.$invalid,
              input_success: !v$.handlers?.$each?.[index]?.name?.$error && !v$.handlers?.$each?.[index]?.name?.$invalid,
            }"
            @input="updateSocial($event, handler)"
          />
          <label
            :for="`handler-${index}`"
            class="floating_label"
            :class="[
              v$.handlers?.$each?.[index]?.name?.$error && v$.handlers?.$each?.[index]?.name?.required.$invalid ? '!text-error' : '',
            ]"
          >
            {{ handler.social_platform }}*
          </label>
          <div
            class="w-full lg:w-4/6"
            v-if="v$.handlers?.$each?.[index]?.name?.$error && v$.handlers?.$each?.[index]?.name?.required.$invalid"
          >
            <p class="error_message">
              <span>
                {{ $t("Please enter The handler") }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
