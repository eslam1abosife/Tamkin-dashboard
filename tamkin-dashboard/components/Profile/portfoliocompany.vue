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
  return platform ? `https://tamkin.app/${platform.icon}` : "";
};

// Reactive state
const state = reactive({
  handlerscompany: [] as Array<{ name: string; icon: string; handler: string }>,
});

// Vuelidate rules
const rules = {
  handlerscompany: {
    $each: {
      handler: { required, minLength: minLength(3) },
    },
  },
};

// Vuelidate instance
const v$ = useVuelidate(rules, state);

// Sync `handlers` with `profileStore.company.social_accounts`
watch(
  () => profileStore.company.social_accounts,
  (newAccounts) => {
    state.handlerscompany = newAccounts.map((account) => ({
      name: account.social_platform,
      icon: getPlatformIconUrl(account.social_platform),
      handler: account.link,
    }));
  },
  { immediate: true }
);

const props = defineProps(["currentTab"]);
const emit = defineEmits(["cancelupdate"]);
const currentMode = inject("currentMode");

// Methods
const cancelUpdate = () => {
  emit("cancelupdate");
};

const updateSocial = (event: object, handler: any) => {
  // Handle update logic here
  // For example, update profileStore or make an API call
  // v$.value.$validate()
};

const normalizeUrl = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "").toLowerCase();
  } catch (error) {
    // Handle invalid URLs gracefully
    return "";
  }
};

onMounted(async () => {
  await getSocialPlatforms();
});

const regex = ref(
  /^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:?#[@!$&'()*+,;=]*)?$/
);
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const openLink = (link: string) => {
  if (!link.startsWith("http")) {
    link = `https://${link}`;
  }

  if (isValidUrl(link)) {
    window.open(link, "_blank");
  }
};
</script>

<template>
  <div
    class="bg-white/60 dark:bg-p shadow-sm rounded-[10px] backdrop-blur-md h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full"
  >
    <div class="flex items-center justify-between w-full">
      <div class="text-[16px] dark:text-whiteTamkin leading-[24px] font-[600]">
        {{ $t("Portfolio") }}
      </div>
      <div
        class="flex items-center justify-evenly rtl:space-x-reverse space-x-[16px] ipad-max:flex-wrap"
        v-if="currentMode === 'normal' || !profileStore.isOwner"
      >
        <button
          :disabled="!isValidUrl(platform.link)"
          v-for="(platform, index) in profileStore.company.social_accounts
            .length > 0
            ? profileStore.company.social_accounts
            : profileStore.social_platforms"
          :key="index"
          @click="openLink(platform.link)"
          class="bg-[#F6F6F6] dark:bg-p w-[33px] h-[33px] rounded-[4px] flex items-center justify-center"
        >
          <img
            :src="
              getPlatformIconUrl(
                profileStore.company.social_accounts.length > 0
                  ? platform.social_platform
                  : platform.title === 'LinkedIn'
                  ? platform.title.toLowerCase()
                  : platform.title
              )
            "
            class="w-[25px] h-[25px]"
            alt=""
          />
        </button>
      </div>
    </div>

    <div
      class="flex flex-col items-start justify-start w-full"
      v-if="currentMode === 'editing' && profileStore.isOwner"
    >
      <div
        class="w-full"
        v-if="
          profileStore.company &&
          profileStore.company.social_accounts.length === 0
        "
      >
        <div
          class="flex items-center justify-start rtl:space-x-reverse space-x-[16px] w-full my-[10px]"
          v-for="(handler, index) in profileStore.social_platforms"
          :key="index"
        >
          <div
            class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center"
          >
            <img
              :src="
                getPlatformIconUrl(
                  profileStore.company.social_accounts.length > 0
                    ? handler.social_platform
                    : handler.title === 'LinkedIn'
                    ? handler.title.toLowerCase()
                    : handler.title
                )
              "
              class="w-[25px] h-[25px]"
              alt=""
            />
          </div>
          <div class="w-full relative">
            <input
              type="text"
              :id="`handler-${index}`"
              v-model="handler.link"
              placeholder=""
              class="input_floating_label peer w-full"
              :class="{
                input_error:
                  v$.handlerscompany?.$each?.[index]?.name?.$error &&
                  v$.handlerscompany?.$each?.[index]?.name?.required.$invalid,
                input_success:
                  !v$.handlerscompany?.$each?.[index]?.name?.$error &&
                  !v$.handlerscompany?.$each?.[index]?.name?.$invalid,
              }"
              @input="updateSocial($event, handler)"
            />
            <label
              :for="`handler-${index}`"
              class="floating_label"
              :class="[
                v$.handlerscompany?.$each?.[index]?.name?.$error &&
                v$.handlerscompany?.$each?.[index]?.name?.required.$invalid
                  ? '!text-error'
                  : '',
              ]"
            >
              {{ $t(`${handler.title}*`) }}
            </label>
            <div
              class="w-full lg:w-4/6"
              v-if="
                v$.handlerscompany?.$each?.[index]?.name?.$error &&
                v$.handlerscompany?.$each?.[index]?.name?.required.$invalid
              "
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
        <div
          class="flex items-center justify-start space-x-[16px] my-[10px] w-full"
          v-for="(handler, index) in profileStore.company.social_accounts"
          :key="index"
        >
          <div
            class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center"
          >
            <img
              :src="getPlatformIconUrl(handler.social_platform)"
              class="w-[25px] h-[25px]"
              alt=""
            />
          </div>
          <div class="w-full relative">
            <input
              type="text"
              :id="`handler-${index}`"
              v-model="handler.link"
              placeholder=""
              class="input_floating_label peer w-full"
              :class="{
                input_error:
                  v$.handlers?.$each?.[index]?.name?.$error &&
                  v$.handlers?.$each?.[index]?.name?.required.$invalid,
                input_success:
                  !v$.handlers?.$each?.[index]?.name?.$error &&
                  !v$.handlers?.$each?.[index]?.name?.$invalid,
              }"
              @input="updateSocial($event, handler)"
            />
            <label
              :for="`handler-${index}`"
              class="floating_label"
              :class="[
                v$.handlers?.$each?.[index]?.name?.$error &&
                v$.handlers?.$each?.[index]?.name?.required.$invalid
                  ? '!text-error'
                  : '',
              ]"
            >
              {{ $t(`${handler.social_platform}*`) }}
            </label>
            <div
              class="w-full lg:w-4/6"
              v-if="
                v$.handlers?.$each?.[index]?.name?.$error &&
                v$.handlers?.$each?.[index]?.name?.required.$invalid
              "
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
