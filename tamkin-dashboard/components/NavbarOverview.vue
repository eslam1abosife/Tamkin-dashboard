<script setup>
import { ref, onMounted, nextTick, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useWindowSize } from "@vueuse/core";
import { useNavbarStore } from "@/stores/navbar";
const { width } = useWindowSize();
const navStore = useNavbarStore();
const route = useRoute();
const currentRoute = ref(route.path);
const navContainer = ref(null);
const slider = ref(null);

const localePath = useLocalePath();

// Function to move slider to the active link
const moveSlider = async (path) => {
  await nextTick();

  const newActiveIndex = getNavLinkIndex(path);

  if (newActiveIndex !== -1 && navContainer.value) {
    const navLinks = navContainer.value.querySelectorAll("a");
    const targetLink = navLinks[newActiveIndex];

    if (targetLink && slider.value) {
      const sliderWidth = targetLink.offsetWidth;
      const sliderLeft = targetLink.offsetLeft;

      // Update slider dimensions and position
      slider.value.style.width = `${sliderWidth}px`;
      slider.value.style.transform = `translateX(${sliderLeft}px)`;
    }
  }
};

// Get the index of the active link
const getNavLinkIndex = (path) => {
  const navLinks = navContainer.value?.querySelectorAll("a");
  return navLinks
    ? Array.from(navLinks).findIndex(
        (link) => link.getAttribute("href") === localePath(path)
      )
    : -1;
};

// Watch route changes and update slider position
watchEffect(() => {
  currentRoute.value = route.path;
  nextTick(() => {
    // Ensure layout is fully rendered before moving the slider
    moveSlider(currentRoute.value);
  });
});

onMounted(() => {
  slider.value.style.transition = "none"; // Disable transition on mount
  setTimeout(() => {

  nextTick(() => {
  moveSlider(currentRoute.value);

    slider.value.style.transition = "transform 0.1s ease-in-out, width 0.1s ease-in-out"; // Enable transition after layout
  });
}, 0); // Add a slight delay to ensure the layout is fully calculated


});

watch([() => route.path, () => width.value], () => {
  moveSlider(currentRoute.value);
});

</script>

<template>
  <div
    ref="navContainer"
    class="shadow-sm absolute z-[80] top-[160px] left-0 w-full h-[43px] rounded-[22px] bg-white dark:bg-tamkinDarkPrimary flex items-center justify-between px-[4px]"
  >
    <!-- Slider -->
    <div
      ref="slider"
      class="absolute border-[1px] border-black top-[6px] left-0 bg-accessNavbarbg dark:bg-tamkin-accessibility-navbar w-0 h-[31px] rounded-[22px] transition-all ease-in-out"
    ></div>

    <!-- Links -->
    <nuxt-link
      class="relative z-[20] w-[96px] h-[31px] flex items-center justify-center dark:text-whiteTamkin"
      :to="localePath('/overview')"
    >
      {{ $t("Overview") }}
    </nuxt-link>
    <nuxt-link
      class="relative z-[20] w-[96px] h-[31px] flex items-center justify-center dark:text-whiteTamkin"
      :to="localePath('/addons')"
    >
      {{ $t("Addons") }}
    </nuxt-link>
    <nuxt-link
      class="relative z-[20] w-[96px] h-[31px] flex items-center justify-center dark:text-whiteTamkin"
      :to="localePath('/statistics')"
    >
      {{ $t("Statistics") }}
    </nuxt-link>
    <nuxt-link
      class="relative z-[20] w-[96px] h-[31px] flex items-center justify-center dark:text-whiteTamkin"
      :to="localePath('/customize')"
    >
      {{ $t("Customize") }}
    </nuxt-link>
    <nuxt-link
      class="relative z-[20] w-[96px] h-[31px] flex items-center justify-center dark:text-whiteTamkin"
      :to="localePath('/settings')"
    >
      {{ $t("Settings") }}
    </nuxt-link>
  </div>
</template>

<style scoped>
/*
.router-link-active.router-link-exact-active {
  @apply bg-accessNavbarbg dark:bg-tamkin-accessibility-navbar transition-all dark:border-0  ease-in w-full lg:w-[96px] h-[31px] cursor-pointer rounded-[22px] 
  border-[1px] border-black flex items-center justify-center text-darkGrey  text-[11px] font-[500] text-center;
}
*/

a {
  @apply !text-[13px] font-[500] text-center;
}
.sub_menu_item {
  @apply text-[#A7A7A7] text-[13px] w-full lg:w-[96px] h-[31px] bg-transparent rounded-[22px] border-[1px]
   border-transparent flex items-center justify-center leading-[22.5px] font-[600] text-center cursor-pointer;
}
/* Slider Transition */
.slider {
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
}

/* Add hover effect */
a:hover {
  text-decoration: none;
}
</style>
