<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, toRefs, computed, onMounted, watch, inject } from "vue";
import { useGetSocialPlatforms } from "@/composables/useProfile";
import { useProfileStore } from "@/stores/profile";

const { getSocialPlatforms, socialPlatforms } = useGetSocialPlatforms();
const profileStore = useProfileStore();
const getPlatformIconUrl = (type: string) => {
  const platform = socialPlatforms.value.find(
    (handler: any) => handler.name === type
  );
  return platform ? `https://tamkin.app/${platform.icon}` : '';
};
// Reactive state
const state = reactive({
  handlers: [] as Array<{ name: string; icon: string; handler: string }> 
});

// Vuelidate rules
const rules = {
  handlers: {
    $each: {
      handler: { required, minLength: minLength(3) },
    },
  },
};

// Vuelidate instance
const v$ = useVuelidate(rules, state);

// Sync `handlers` with `profileStore.member.social_accounts`
watch(
  () => profileStore.member.social_accounts,
  (newAccounts) => {
    state.handlers = newAccounts.map(account => ({
      name: account.social_platform,
      icon: getPlatformIconUrl(account.social_platform),
      handler: account.link
    }));
  },
  { immediate: true }
);

const props = defineProps(['currentTab']);
const emit = defineEmits(["cancelupdate"]);
const currentMode = inject('currentMode');

// Methods
const cancelUpdate = () => {
  emit("cancelupdate");
};

const updateSocial = (event: object, handler: any) => {
  // Handle update logic here
  // For example, update profileStore or make an API call

  v$.value.$validate()
};



onMounted(async () => {
  await getSocialPlatforms();
});

const { handlers } = toRefs(state);
</script>
<template>
  <div class="bg-white/60 shadow-sm rounded-[10px] backdrop-blur-md h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full">
    <div class="flex items-center justify-between w-full">
      <div class="text-[16px] leading-[24px] font-[600]">Portfolio</div>
      <div
        class="flex items-center justify-evenly space-x-[16px] ipad-max:flex-wrap"
        v-if="currentMode === 'normal'"
      >
        <a
          v-for="(platform, index) in (profileStore.member.social_accounts.length > 0 ? profileStore.member.social_accounts : profileStore.social_platforms)"
          :key="index"
          :href="platform.link.startsWith('http') ? platform.link : `https://${platform.link}`"
          target="_blank"
          class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center"
        >
          <img :src="getPlatformIconUrl(profileStore.member.social_accounts.length > 0 ? platform.social_platform : platform.title)" class="w-[25px] h-[25px]" alt="" />
        </a>
      </div>
    </div>

    <div class="flex flex-col items-start justify-start w-full" v-if="currentMode === 'editing'">
      <div class="w-full" v-if="profileStore.member.social_accounts.length === 0">
        <div class="flex items-center justify-start space-x-[16px] w-full my-[10px]" 
          v-for="(handler, index) in handlers" :key="index">
          <div class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center">
            <img :src="handler.icon" class="w-[25px] h-[25px]" alt="" />
          </div>
          <div class="w-full relative">
            <input
              type="text"
              :id="`handler-${index}`"
              v-model="handler.handler"
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
              {{handler.name}}*
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
      <div v-else class="w-full">
        <div class="flex items-center justify-start space-x-[16px] my-[10px] w-full" 
          v-for="(handler, index) in profileStore.member.social_accounts" :key="index">
          <div class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center">
            <img :src="getPlatformIconUrl(handler.social_platform)" class="w-[25px] h-[25px]" alt="" />
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
              {{handler.social_platform}}*
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
  </div>
</template>

