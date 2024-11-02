<script setup>
import { ref, onMounted, nextTick, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useWindowSize } from "@vueuse/core";
import { useNavbarStore } from "@/stores/navbar";

const navStore = useNavbarStore();

const { width, height } = useWindowSize();

const route = useRoute();
const currentRoute = ref(route.path);
const navContainer = ref(null);
const slider = ref(null);
const sliderVisible = ref(false);
const localePath = useLocalePath();
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  const pattern = localePath(path);

  // If the pattern does not contain a wildcard, do an exact match
  if (!pattern.includes("*")) {
    return currentPath === pattern;
  }

  // Convert wildcard pattern to regex
  const regex = new RegExp("^" + pattern.replace(/\/\*/g, ".*") + "$");

  return regex.test(currentPath);
};

// const moveSlider = async (path, animate = true) => {
//   await nextTick();
//   const newActiveIndex = getNavLinkIndex(path);

//   if (newActiveIndex !== -1 && navContainer.value && process.client) {
//     const navLinks = navContainer.value.querySelectorAll("a");

//     // Remove active_subNavb class from all nav links
//     navLinks.forEach((link) => {
//       link.classList.remove("active_subNavb");
//     });

//     const targetLink = navLinks[newActiveIndex];
//     const sliderWidth = targetLink.offsetWidth;
//     const sliderLeft = targetLink.offsetLeft;

//     if (slider.value) {
//       if (animate) {
//         slider.value.classList.add("slider-transition");
//       } else {
//         slider.value.classList.remove("slider-transition");
//       }

//       slider.value.style.width = `${sliderWidth}px`;
//       slider.value.style.transform = `translateX(${sliderLeft}px)`;

//       sliderVisible.value = true;
//     }

//     // Add active_subNavb class to the new active link
//     // targetLink.classList.add('active_subNavb');
//   }
// };

const getNavLinkIndex = (path) => {
  if (process.client) {
    const navLinks = navContainer.value.querySelectorAll("a");
    return Array.from(navLinks).findIndex(
      (link) => link.getAttribute("href") === localePath(path)
    );
  }
};

// // Watch for route changes to update the current route and move the slider
// watchEffect(() => {
//   currentRoute.value = route.path;
//   moveSlider(currentRoute.value, false);
// });

// Watch for window size changes and sidebar state changes to adjust the slider position
// watchEffect(() => {
//   if (navStore.sideBarOpen !== undefined) {
//     moveSlider(currentRoute.value, false);
//   }
// });

// onMounted(() => {
//   moveSlider(currentRoute.value, false);
// });
</script>

<template>
  <div
    ref="navContainer"
    class="shadow-sm absolute top-[160px] lg:overflow-x-hidden overflow-x-auto left-0 w-full lg:mx-auto h-[43px] rounded-[22px] bg-white dark:bg-tamkinDarkPrimary flex items-center lg:space-x-0 space-x-[20px] lg:justify-between px-[4px]"
  >
    <transition name="slider-transition">
      <div
        v-show="sliderVisible"
        ref="slider"
        class="absolute top-[6px] left-0 active_subNavb__div"
      ></div>
    </transition>
    <nuxt-link
      class="relative z-[20] w-full lg:px-0 px-2 !ml-0 lg:w-[96px] h-[31px] flex items-center justify-center"
      :to="localePath('/sign-language/overview')"
    >
      {{ $t("Overview") }}
    </nuxt-link>
    <nuxt-link
      class="relative z-[20] w-full lg:px-0 px-2 lg:w-[96px] h-[31px] flex items-center justify-center"
      :to="localePath('/sign-language/addons')"
    >
      {{ $t("Addons") }}
    </nuxt-link>
    <nuxt-link
      class="relative z-[20] w-full lg:px-0 px-2 lg:w-[96px] h-[31px] flex items-center justify-center"
      :to="localePath('/sign-language/statistics')"
    >
      {{ $t("Statistics") }}
    </nuxt-link>
    <nuxt-link
      class="relative z-[20] w-full lg:px-0 px-2 lg:w-[96px] h-[31px] flex items-center justify-center"
      :to="localePath('/sign-language/customize')"
    >
      {{ $t("Customize") }}
    </nuxt-link>
    <nuxt-link
      class="relative z-[20] w-full lg:px-0 px-2 lg:w-[96px] h-[31px] flex items-center justify-center mr-[5px]"
      :to="localePath('/sign-language/settings')"
    >
      {{ $t("Settings") }}
    </nuxt-link>
  </div>
</template>

<style scoped>
.active_subNavb {
  @apply bg-accessNavbarbg dark:bg-tamkin-accessibility-navbar transition-all dark:border-0  ease-in w-full lg:w-[96px] h-[31px] cursor-pointer rounded-[22px] 
  border-[1px] border-black flex items-center justify-center text-darkGrey  text-[11px] font-[500] text-center;
}

.active_subNavb__div {
  @apply bg-accessNavbarbg dark:bg-tamkin-accessibility-navbar dark:border-0 transition-all ease-out 
  w-full lg:w-[96px] h-[31px] cursor-pointer rounded-[22px]  dark:!bg-darkSecondary
  border-[1px] border-black flex items-center justify-center text-darkGrey dark:!text-white  !text-[13px] font-[500] text-center;
}

.router-link-active.router-link-exact-active {
  @apply bg-accessNavbarbg dark:bg-tamkin-accessibility-navbar transition-all dark:border-0  ease-in w-full lg:w-[96px] h-[31px] cursor-pointer rounded-[22px] 
  border-[1px] border-black flex items-center justify-center text-darkGrey  text-[11px] font-[500] text-center;
}
a {
  @apply !text-[13px] font-[500] text-center;
}
.sub_menu_item {
  @apply text-[#A7A7A7] text-[13px] w-full lg:w-[96px] h-[31px] bg-transparent rounded-[22px] border-[1px]
   border-transparent flex items-center justify-center leading-[22.5px] font-[600] text-center cursor-pointer;
}

.slider-transition-enter-active,
.slider-transition-leave-active {
  transition: transform 0.3s ease-out, width 0.3s ease-out;
}
.slider-transition-enter,
.slider-transition-leave-to {
  transform: translateX(0);
  width: 0;
}

.slider-transition {
  transition: transform 0.3s ease-out, width 0.3s ease-out;
}
</style>
