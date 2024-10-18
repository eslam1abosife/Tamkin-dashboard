<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import SuccessAnimation from "/assets/animation/forget_password_success.json";
import { useModalManager } from "@/composables/useModalManager";
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
import { useApi } from "@/composables/useApi";
const { useApiInstance } = useApi();
const { api, loading } = useApiInstance();

const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const props = defineProps({
  showModal: Boolean,
});

const SuccessStep2Transfer = ref(false);
const loadingTransfer = ref(false);
const confirmTransfer = async () => {
  loadingTransfer.value = true;
  try {
    const res = await api.post("/Apps/TransferLicense", {
      fromApp: settingsStore.defaultappobj.name,
      toApp: settingsStore.selectedApp.name,
    });
    if (res) {
      SuccessStep2Transfer.value = true;
    }
    loadingTransfer.value = false;
  } catch (error) {
    loadingTransfer.value = false;
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};
const getImageUrl = computed(() => {
  return `/assets/imgs/icons/mysite.svg`;
});
const { locale } = useI18n();
const manageSites = () => {
  closeModal("transferstep2");
  const router = useRouter();
  // Import the router instance
  router.push({
    path: `/${locale.value}/my-site`,
  });
};
</script>

<template>
  <div
    v-if="isOpen('transferstep2')"
    class="fixed z-[9999] top-[50px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[640px] w-10/12 max-h-[80vh]"
    style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeModal('transferstep2')"
    >
      <svg
        class="w-[12px] h-[12px]"
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="container mx-auto" v-if="!SuccessStep2Transfer">
      <h1
        class="font-[600] dark:text-whiteTamkin text-darkGrey text-[18px] leading-[36px]"
      >
        {{ $t("Transfer License to another site") }}
      </h1>

      <p
        class="mt-[4px] font-[400] text-[#A7A7A7] dark:text-whiteTamkin text-[14px] leading-[24px]"
      >
        {{
          $t("This action will move all widgets and features to the new site.")
        }}
      </p>

      <div
        class="flex flex-col items-center justify-center custom-border-tamkin padding-override-1 rounded-22-tamkin p-4 w-full mx-auto my-4 mt-5"
      >
        <div class="flex items-center justify-center mb-2">
          <div class="text-gray-700 dark:text-whiteTamkin w-[60px]">
            {{ $t("From") }}
          </div>
          <div
            class="flex items-center justify-center gap-2 bg-white dark:bg-tamkinDarkPrimary border-[1px] w-[230px] rounded-[10px] px-2 py-1 h-[41px]"
          >
            <img
              :src="
                settingsStore.defaultappobj.type !== 'Internal Services' &&
                settingsStore.defaultappobj.favicon
                  ? settingsStore.defaultappobj.favicon
                  : getImageUrl
              "
              class="w-6 h-6 object-contain"
            />
            <span class="text-gray-700 dark:text-whiteTamkin">
              {{ settingsStore.defaultappobj.title }}
            </span>
          </div>
        </div>
        <div class="mb-2 rtl:mr-[10%] ltr:ml-[10%]">
          <img src="/assets/imgs/settings/arrow-down.svg" />
        </div>
        <div class="flex items-center justify-start">
          <div class="text-gray-700 w-[60px] dark:text-whiteTamkin">
            {{ $t("To") }}
          </div>
          <div
            class="flex items-center justify-center gap-2 bg-white dark:bg-tamkinDarkPrimary custom-border-tamkin w-[230px] padding-override-1 rounded-[10px] px-2 py-1 h-[41px]"
          >
            <img
              :src="
                settingsStore.selectedApp.type !== 'Internal Services' &&
                settingsStore.selectedApp.favicon
                  ? settingsStore.selectedApp.favicon
                  : getImageUrl
              "
              class="w-6 h-6 object-contain"
            />
            <span class="text-turquoise-500 dark:text-whiteTamkin">
              {{ settingsStore.selectedApp.title }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-2 mt-[40px]">
        <button
          class="btn_bordered_dashboard normal_hover text-center w-1/4"
          @click="closeModal('transferstep2')"
        >
          {{ $t("Cancel") }}
        </button>
        <button
          class="btn-dashboard text-center p-[0]"
          :class="loadingTransfer ? 'w-1/3' : 'w-1/4'"
          @click="confirmTransfer"
        >
          <span class="mx-2">{{ $t("Confirm Transfer") }}</span>
          <svg
            v-if="loadingTransfer"
            class="animate-spin h-5 w-5 text-[#fff]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="container mx-auto" v-else>
      <h1
        class="text-center font-[600] text-darkGrey dark:text-whiteTamkin text-[24px] leading-[36px]"
      >
        {{ $t("Successfully Transferred") }}
      </h1>

      <Vue3Lottie
        :animationData="SuccessAnimation"
        :height="150"
        :width="150"
        class="  "
      />
      <p
        class="mt-[16px] text-center font-[400] text-[#A7A7A7] dark:text-whiteTamkin text-[12px] leading-[24px]"
      >
        {{
          $t(
            "The license has been successfully transferred to the new site. You can now utilize the license at the new location."
          )
        }}
      </p>

      <button
        class="btn-dashboard hover_tamkin text-center w-3/4 p-[0] mx-auto mt-[30px]"
        @click="manageSites"
      >
        {{ $t("Manage Your Site") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss"></style>
