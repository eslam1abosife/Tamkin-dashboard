<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import mysiteAnimation from "~/assets/animation/mysite.json";
import { useModalStore } from "@/stores/modal";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
definePageMeta({
  layout: "dashboard",
});
const state = reactive({
  teamName: "",
});
const rules = {
  teamName: { required },
};

const v$ = useVuelidate(rules, state);
const modalStore = useModalStore();
const dataAvailable = ref(true);
const editTeamNameMode = ref(false);

const currentTab = ref("saved");

const switchTab = (tab: any) => {
  currentTab.value = tab;
};

const checked = ref([]);
const deletedSites = ref([
  { id: "1", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "2", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "3", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "4", name: "Tamkin", image: "https://via.placeholder.com/24" },
]);

const checkAll = computed({
  get() {
    return (
      deletedSites.value && checked.value.length === deletedSites.value.length
    );
  },
  set(value) {
    checked.value = value ? deletedSites.value.map((lang) => lang.id) : [];
  },
});
const localePath = useLocalePath();

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
</script>

<template>
  <div class="w-full h-full">
    <div
      class="absolute left-0 right-0 w-full h-[400px] top-[-25%]"
      style="
        box-shadow: 0px 4px 24px 8px #51459f1a;
        background: linear-gradient(
          180deg,
          #fefefe 0%,
          #eef5ff 47.07%,
          #f6f3fc 72.04%,
          #fef5f6 100%
        );
      "
    ></div>
    <div class="mt-[23px] w-full h-full relative">
      <div class="space-y-[10px]">
        <h1 class="text-left text-[24px] leading-[36px] font-[600]">Addons</h1>

        <h2
          class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey"
        >
          Enable the Accessibility Services Addons to improve usability and
          enhance your experience.
        </h2>
      </div>

      <div
        class="ipad-max:-mx-6 mt-[5px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col w-full justify-center lg:justify-start"
      >
        <div
          class="flex items-center lg:flex-row flex-col justify-start py-[23px] w-full rounded-[10px]"
        >
          <div class="w-full space-y-[16px]">
            <div class="flex flex-col lg:flex-row items-center justify-between">
              <div class="flex items-center justify-start space-x-[8px]">
                <div
                  class="flex items-center justify-center bg-white w-[60px] h-[60px] custom-border-tamkin custom-border-tamkin-rounded rounded-full"
                  style="box-shadow: 0px 4px 24px 8px #51459f1a"
                >
                  <img src="/assets/imgs/tamkin_hand.svg" alt="" />
                </div>
                <div class="flex items-center space-x-[16px]">
                  <!-- <h2 class="font-[600] text-[16px] leading-[24px] text-[#C5C5C5]">Select Site</h2> -->
                  <div>
                    <h2
                      class="font-[600] text-[16px] leading-[24px] text-darkGrey"
                    >
                      Tamkin.App
                    </h2>
                  </div>
                  <div>
                    <a
                      href=""
                      class="text-tamkin font-[600] text-[16px] leading-[24px] flex ]"
                      >Visit Site
                      <img
                        src="/assets/imgs/icons/external_link.svg"
                        class="ml-[14px]"
                        alt=""
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-full mx-auto h-[43px] rounded-[22px] bg-white flex items-center px-[10px] justify-center"
      >
        <div
          class="text-center cursor-pointer text-[#A7A7A7] text-[15px] leading-[22.5px] font-[600] mr-[72px] flex-1"
        >
          Overview
        </div>
        <div
          style="
            background: linear-gradient(
              180deg,
              #fefefe 0%,
              #eef5ff 47.07%,
              #f6f3fc 72.04%,
              #fef5f6 100%
            );
          "
          class="w-[96px] h-[31px] cursor-pointer rounded-[22px] border-[1px] border-black flex items-center justify-center text-darkGrey text-[15px] leading-[22.5px] font-[500] text-center mr-[72px] flex-1"
        >
          Addons
        </div>
        <div
          class="text-[#A7A7A7] text-[15px] leading-[22.5px] font-[600] text-left mr-[72px] flex-1"
        >
          Statistics
        </div>
        <div
          class="text-[#A7A7A7] text-[15px] leading-[22.5px] font-[600] text-center flex-1"
        >
          Customize
        </div>
        <div
          class="text-[#A7A7A7] text-[15px] leading-[22.5px] font-[600] text-center ml-[72px] flex-1"
        >
          Settings
        </div>
      </div>
      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="ml-[15px] pt-[35px]">
            <h1 class="text-[20px] font-[500] leading-[30px]">Adjust the Main Menu
            </h1>
        </div>

        <div class="flex flex-col items-center justify-center">
            <div class="h-[65px] bg-lightGrey p-[10px] ">

            </div>
        </div>
      </div>
    </div>
  </div>
</template>
