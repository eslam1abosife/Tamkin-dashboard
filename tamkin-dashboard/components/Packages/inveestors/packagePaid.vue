<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

definePageMeta({
  layout: "dashboard",
});
const moreDetails = ref(false);
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();
const openHashMenu = ref(false);

const currentHash = ref("");
const toggleHashMenu = () => {
  openHashMenu.value = !openHashMenu.value;
};
</script>

<template>
  <div
    v-if="packagesStore.investorUser"
    class="bg-gradient-to-t dark:bg-p from-white to-[#8EE6DF] h-[249px] w-full flex items-start space-x-[80px] justify-start rtl:space-x-reverse rounded-lg p-6 mx-auto"
    style="box-shadow: 1px 1px 26.4px 0px #71dad269"
  >
    <div
      class="flex flex-col items-start justify-center w-full md:w-4/6 space-y-[16px]"
    >
      <div class="flex items-center justify-between w-full">
        <div
          class="text-[15px] dark:text-whiteTamkin font-[600] leading-[19px]"
        >
          {{ $t("Investor Package") }}
        </div>
        <div>
          <img
            :src="`https://tamkin.app/${packagesStore.investorUser.icon}`"
            class="w-[33px] h-[33px]"
            alt=""
          />
        </div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div
          class="text-[15px] dark:text-whiteTamkin font-[500] leading-[19px] text-darkGrey"
        >
          {{ $t("Wallet Address") }}
        </div>
        <div
          class="text-[15px] dark:text-whiteTamkin font-[600] leading-[19px] text-darkGrey"
        >
          {{ packagesStore.investorUser.wallet_address }}
        </div>
      </div>

      <div class="flex items-center justify-between w-full relative">
        <div
          class="text-[15px] font-[500] leading-[19px] dark:text-whiteTamkin text-darkGrey"
        >
          {{ $t("Hash") }}
        </div>
        <div
          class="text-[15px] font-[600] leading-[19px] text-[#2DB9B0] cursor-pointer"
          v-on-click-outside="() => (openHashMenu = false)"
          @click="toggleHashMenu"
        >
          <span class="truncate w-44">{{
            packagesStore.investorUser.transaction_hashes.split("\n")[0]
          }}</span>
        </div>
        <div
          v-if="openHashMenu"
          class="w-auto h-auto dark:text-whiteTamkin bg-white rounded-[10px] absolute rtl:left-0 ltr:right-0 top-6 flex flex-col divide-y items-start justify-start"
        >
          <div
            @click="currentHash = hash"
            v-for="(
              hash, i
            ) in packagesStore.investorUser.transaction_hashes.split('\n')"
            :key="hash"
            class="text-[14px] dark:text-whiteTamkin cursor-pointer w-full p-[10px] text-left font-[500] leading-[21px]"
          >
            {{ $t("Hash") }} {{ i + 1 }}
            <span class="truncate w-44">{{ hash }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between w-full">
        <div
          class="text-[15px] font-[500] dark:text-whiteTamkin leading-[19px] text-darkGrey"
        >
          {{ $t("Amount") }}
        </div>
        <div
          class="text-[15px] font-[600] leading-[19px] dark:text-whiteTamkin text-darkGrey"
        >
          {{ packagesStore.investorUser.amount }}
          {{ packagesStore.investorUser.title }}
        </div>
      </div>

      <div class="flex items-center justify-between w-full">
        <div
          class="text-[15px] font-[500] leading-[19px] dark:text-whiteTamkin text-darkGrey"
        >
          {{ $t("Status") }}
        </div>
        <div
          v-if="
            packagesStore.investorUser.status === 'In Review' ||
            packagesStore.investorUser.status === 'Reject'
          "
          class="w-[70px] h-[30px] rounded-[5px] bg-[#FFCECE]/[64%] flex items-center justify-center"
        >
          <div
            class="text-[12px] leading-[19px] font-[600] dark:text-whiteTamkin text-darkGrey"
          >
            {{
              packagesStore.investorUser.status === "Reject"
                ? $t("Rejected")
                : $t("In Review")
            }}
          </div>
        </div>
        <div
          v-if="packagesStore.investorUser.status === 'Active'"
          class="w-[67px] h-[30px] rounded-[5px] bg-gradient-to-b from-tamkinStart to-tamkinEnd flex items-center justify-center"
        >
          <div class="text-[12px] leading-[19px] font-[600] text-white">
            {{ $t("Active") }}
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:block">
      <img
        src="/imgs/investor_package_hero.png"
        class="w-[227px] h-[175px]"
        alt=""
      />
    </div>
  </div>
</template>
