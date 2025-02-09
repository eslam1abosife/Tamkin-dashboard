<script lang="ts" setup>
const { isOpen, openModal } = useModalManager();
const localePath = useLocalePath();
const props = defineProps({
  isTranslatePackage: {
    type: Boolean,
    default: false,
  },
  typeModal: {
    type: String,
    default: 'package',
  },
  package: {
    type: Object,
  },
});

const mySiteStore = useMySiteStore();

const openModalFromLocked = () => {
  openModal("upgrade_no_package");
};
const openModalAddon = (pck) => {
  mySiteStore.setCurrentPackage(pck);
  openModal("add_package_modal_mysite");
};

onMounted(() => {});
</script>

<template>
  <div
    class=" absolute z-[50] h-full w-full inset-0 bg-white dark:bg-tamkinDarkPrimary !bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center rounded-[10px]"
  >
    <!-- Modal -->
    <div
      class="bg-white dark:bg-tamkinDarkPrimary px-6 rounded-lg drop-shadow-2xl text-center h-[200px]"
    >
      <div class="mt-[12px]">
        <img
          src="/assets/imgs/customize/locked.svg"
          class="mx-auto w-[34px] h-[34px] md:w-[64px] md:h-[64px]"
        />
      </div>
      <h2 class="text-md font-semibold dark:text-white my-2">
        {{ $t("Purchase a Package") }}
      </h2>
      <p class="text-gray-600 dark:text-whiteTamkin/90 text-sm mb-[12px]">
        {{ $t("Buy a package now to unlock these features.") }}
      </p>
      <nuxt-link
        v-if="props.isTranslatePackage"
        :to="{ path: localePath('/addons'), query: { package: 'live' } }"
        class="btn-dashboard hover_tamkin w-[150px] mx-auto"
        >{{ $t("Buy Now") }}</nuxt-link
      >
      <button
        v-else-if="props.typeModal === 'addon'"
        @click="openModalAddon(props.package)"
        type="button"
        class="btn-dashboard hover_tamkin w-[150px] mx-auto"
      >
        {{ $t("Buy Now") }}
      </button>
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
