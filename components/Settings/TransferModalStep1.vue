<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";
import { useModalManager } from "@/composables/useModalManager";
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();

const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();

const props = defineProps({
  showModal: Boolean,
});
const checked = ref(null);

const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};
const getImageUrl = computed(() => {
  return `/assets/imgs/icons/mysite.svg`;
});
</script>

<template>
  <div
    v-if="isOpen('transferstep1')"
    class="fixed z-[9999] top-[50px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[640px] w-10/12 max-h-[80vh]"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeModal('transferstep1')"
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
    <div class="container mx-auto">
      <h1
        class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]"
      >
        {{ $t("Transfer License") }}
      </h1>

      <p
        class="mt-[16px] rtl:text-right ltr:text-left font-[500] text-darkGrey dark:text-whiteTamkin text-[14px] leading-[24px]"
      >
        {{ $t("Are you sure you want to transfer your license from") }}
        <span class="font-bold text-[#2dada3]">Tamkin.App</span>

        {{
          $t(
            "to another site? Please select the destination site from the list below to proceed with the license transfer."
          )
        }}
      </p>

      <div class="w-full">
        <div class="py-[17px] search_input">
          <input
            type="text"
            class="input_dashboard_search w-full"
            v-model="search"
            :placeholder="`${$t('Search')} ...`"
          />
          <div
            class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
          >
            <img src="/assets/imgs/icons/search.svg" />
          </div>
          <div
            v-if="isSearchfilled"
            @click="clearInput"
            class="absolute top-[12px] lg:top-[16px] right-0 p-[16px] cursor-pointer"
          >
            <img src="/assets/imgs/icons/clear_search.svg" />
          </div>
        </div>
      </div>

      <table class="min-w-full divide-y divide-gray-200 dark:divide-light">
        <thead>
          <tr>
            <th
              class="py-3 rtl:text-right ltr:text-left leading-[24px] text-[14px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin tracking-wider"
            >
              {{ $t("Website") }}
            </th>
            <th
              class="py-3 rtl:text-left ltr:text-right leading-[24px] text-[14px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin tracking-wider"
            >
              {{ $t("Select") }}
            </th>
          </tr>
        </thead>
        <tbody
          v-if="settingsStore.apps.length > 0"
          class="divide-y divide-gray-200"
        >
          <tr v-for="app in settingsStore.apps" :key="app.name">
            <td class="py-4 flex items-center rtl:space-x-reverse space-x-4">
              <img
                :src="
                  app.type !== 'Internal Services' && app.favicon
                    ? app.favicon
                    : getImageUrl
                "
                class="w-6 h-6"
              />
              <span
                class="text-[13px] leading-[21px] font-[400] text-gray-900 dark:text-whiteTamkin"
              >
                {{ app.title }}
              </span>
            </td>
            <td class="py-4 rtl:text-left ltr:text-right">
              <div>
                <input
                  type="checkbox"
                  @click="settingsStore.selectedApp = app"
                  :checked="checked === `checkbox_` + app.name"
                  :id="`checkbox_` + app.name"
                  :value="app.name"
                  class="peer sr-only rtl:mr-auto ltr:ml-auto"
                  number
                />
                <label
                  :for="`checkbox_` + app.name"
                  class="cursor-pointer relative block border-[1px] rtl:mr-auto ltr:ml-auto w-[18px] h-[18px] border-lightGrey peer-checked:border-0 bg-whiteTamkin dark:bg-transparent rounded-[4px] peer-checked:bg-gradient-checked"
                >
                  <svg
                    class="peer-checked:block absolute inset-0 m-auto w-4 h-4 text-white dark:text-darkTamkin"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex items-center justify-center rtl:space-x-reverse space-x-[30px] mx-auto mt-[40px]"
      >
        <button
          class="btn_bordered_dashboard normal_hover text-center w-1/6"
          @click="closeModal('transferstep1')"
        >
          {{ $t("Cancel") }}
        </button>
        <button
          :disabled="!settingsStore.selectedApp"
          class="btn-dashboard hover_tamkin text-center w-1/6"
          @click="navigateTo('transferstep1', 'settings', 'transferstep2')"
        >
          {{ $t("Continue") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
