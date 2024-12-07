<script lang="ts" setup>
const { isOpen, openModal } = useModalManager();
const localePath = useLocalePath();
const props = defineProps({
  isTranslatePackage: Boolean,
  default: false,
});

const openModalFromLocked = () => {
  openModal("upgrade_no_package");
};
</script>

<template>
  <div
    class="absolute z-[50] h-full w-full inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center rounded-[10px]"
  >
    <!-- Modal -->
    <div class="bg-white px-6 rounded-lg drop-shadow-2xl text-center h-[200px]">
      <div class="mt-[12px]">
        <img
          src="/assets/imgs/customize/locked.svg"
          class="mx-auto w-[64px] h-[64px]"
        />
      </div>
      <h2 class="text-md font-semibold my-2">{{ $t("Purchase a Package") }}</h2>
      <p class="text-gray-600 text-sm mb-[12px]">
        {{ $t("Buy a package now to unlock these features.") }}
      </p>
      <nuxt-link
        v-if="isTranslatePackage"
        :to="{ path: localePath('/addons'), query: { package: 'live' } }"
        class="btn-dashboard hover_tamkin w-[150px] mx-auto"
        >{{ $t("Buy Now") }}</nuxt-link
      >
      <button
        v-else
        @click="openModalFromLocked"
        type="button"
        class="btn-dashboard hover_tamkin w-[150px] mx-auto"
      >
        {{ $t("Buy Now") }}
      </button>
      <!-- <nuxt-link v-else :to="localePath('/packages/accessibility')" class="btn-dashboard hover_tamkin w-[150px] mx-auto">{{$t('Buy Now')}}</nuxt-link> -->
    </div>
  </div>
</template>
