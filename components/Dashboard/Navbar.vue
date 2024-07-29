<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import { useElementHover } from "@vueuse/core";
// import banner from 'assets/imgs/gradient_embded.png'

const accessMenuHover = ref();
const submenuHover = ref();
const services = ref();
const signLanguageHover = ref();
const isHovered = useElementHover(accessMenuHover);
const isSubmenuHovered = useElementHover(submenuHover);
const isSignLanguageHoverd = useElementHover(signLanguageHover);
const servicesHover =  useElementHover(services);
const props = defineProps({
  sideBarOpen: Boolean,
  mobileSidebar: Boolean,
});

const emit = defineEmits(["toggleSidebar", "toggleSidebarMobile"]);
let closeTimeout = null;
let closeTimeoutChild = null;

function toggleSidebar() {
  emit("toggleSidebar");
}

function toggleSidebarMobile() {
  emit("toggleSidebarMobile");
}
const showOnClick = ref(false);
const showOnClickChild = ref(false);
const showSubMenu = ref(new Array(6).fill(false)); // initialize an array of booleans to track the visibility of each submenu
const showChildMenu = ref(new Array(2).fill(false));
const openChildMenus = (id) => {
  clearTimeout(closeTimeoutChild); // Clear any previous timeout

  // Toggle the clicked child menu
  const isCurrentlyOpen = showChildMenu.value[id];
  showChildMenu.value = showChildMenu.value.map((_, index) => index === id ? !isCurrentlyOpen : false);
  showOnClickChild.value = !isCurrentlyOpen; // Ensure the state reflects the clicked action

  console.log(`child menu ${id} visibility:`, showChildMenu.value[id]);
};

const openMenuSub = (id) => {
  clearTimeout(closeTimeout); // Clear any previous timeout

  // Toggle the clicked submenu
  const isCurrentlyOpen = showSubMenu.value[id];
  showSubMenu.value = showSubMenu.value.map((_, index) => index === id ? !isCurrentlyOpen : false);
  showOnClick.value = !isCurrentlyOpen; // Ensure the state reflects the clicked action

  // Reset child menu state to close any open child menus
  if (!isCurrentlyOpen) {
    showChildMenu.value = showChildMenu.value.map(() => false);
    showOnClickChild.value = false;
  }

  console.log(`Submenu ${id} visibility:`, showSubMenu.value[id]);
};




const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
const goToLink = (link: string) => {
  return localePath(link);
};

const activeAccessLinks = computed(() => {
  return (
    isLinkActive("/overview") ||
    isLinkActive("/addons") ||
    isLinkActive("/statistics") ||
    isLinkActive("/customize") ||
    isLinkActive("/settings")
  );
});

const activeSignLanguageLinks = computed(() => {
  return  isLinkActive("/market");
});


const closeSubMenuOnClickOutside = (index: any) => {
  if (!props.sideBarOpen && showSubMenu.value[index] === true) {
    showSubMenu.value[index] = false;
  }
};
const closeSubmenuWithDelay = (id) => {
  closeTimeout = setTimeout(() => {
    if (
      !isHovered.value &&
      !isSubmenuHovered.value &&
      !isSignLanguageHoverd.value &&
      !showOnClick.value
    ) {
      showSubMenu.value[id] = false;
    }
  }, 200); // Delay in milliseconds
};
const closeChildmenuWithDelay = (id) => {
  closeTimeoutChild = setTimeout(() => {
    if (
    !servicesHover.value &&
      !showOnClickChild.value
    ) {
      showChildMenu.value[id] = false;
    }
  }, 200); // Delay in milliseconds
};
watch([isHovered, isSubmenuHovered], ([newIsHovered, newIsSubmenuHovered]) => {
  clearTimeout(closeTimeout); // Clear any previous timeout

  if (!props.sideBarOpen) {
    // Only handle hover if sidebar is closed
    if (newIsHovered || newIsSubmenuHovered) {
      showSubMenu.value[3] = true;
      showSubMenu.value[4] = false;
    } else if (!showOnClick.value) {
      closeSubmenuWithDelay(3);
    }
  }
});
watch([isSignLanguageHoverd], (isNewSignLanguageHoverd) => {
  clearTimeout(closeTimeout); // Clear any previous timeout

  if (!props.sideBarOpen) {
    // Only handle hover if sidebar is closed
    if (isNewSignLanguageHoverd) {
      showSubMenu.value[4] = true;
      showSubMenu.value[3] = false;
    } else if (!showOnClick.value) {
      closeSubmenuWithDelay(4);
    }
  }
});
watch(servicesHover, (isHovered) => {
  clearTimeout(closeTimeoutChild); // Clear any previous timeout
  clearTimeout(closeTimeout); // Clear any previous timeout

  if (!props.sideBarOpen) {
    // Only handle hover if sidebar is closed
    if (isHovered) {
      showChildMenu.value[1] = true;
    } else if (!showOnClickChild.value) {
      closeChildmenuWithDelay(1);
    }
  }
});

watch(
  () => route.path, // Watch for changes in the route path
  (to) => {
    if (!props.sideBarOpen) {
      showSubMenu.value[3] = false; // Update the submenu visibility
      showSubMenu.value[4] = false; // Update the submenu visibility
    }
  },
  { flush: "pre", immediate: true, deep: true }
);
watch(
  () => props.sideBarOpen,
  (first, second) => {
    showSubMenu.value[3] = false;
    showSubMenu.value[4] = false;
  }
);

// onMounted(()=>{
//   if(activeSignLanguageLinks.value === true){

// showSubMenu.value[6] = true
// showSubMenu.value[4] = true
//    }

//    if(activeAccessLinks.value === true){
//     showSubMenu.value[5] = true
//     showSubMenu.value[3] = true
//    }
// })
</script>

<template>
  <div
    class="flex-col items-start justify-start lg:flex mx-auto fixed rtl:lg:right-auto 
    rtl:right-0 ltr:left-0 px-6 h-screen z-[140]  transition-all duration-75 ease-in-out transform-gpu"
    :class="[sideBarOpen ? 'w-[280px] overflow-y-auto no-scrollbar' : 'w-[75px]']"
    style="box-sizing: border-box !important"
  >
    <div class="flex flex-col items-start justify-start w-full  transition-all duration-100 ease-in-out">
      <div
        class="self-start w-full"
        :class="[sideBarOpen ? '' : 'mx-auto']"
        v-if="sideBarOpen"
      >
        <img
          src="/assets//imgs/logo.png"
          class="min-h-[50px] w-[100px] rtl:mr-[4px] ltr:ml-[-4px]"
        />
      </div>
      <div class="mb-[10px] w-[55px] h-[55px] mt-[24px] " v-else>
        <img
          src="/assets//imgs/icons/tamkin_small.svg"
          class="w-[28px] h-[28px] "
        />
      </div>
      <div
        class="w-[28px] h-[28px] cursor-pointer"
        v-if="!sideBarOpen"
        @click="$router.push(localePath('/team'))"
      >
        <img src="/assets/imgs/team.png" />
      </div>
      <div
        class="tamkin_team_card"
        @click="$router.push(localePath('/team'))"
        :class="[
          !sideBarOpen ? 'border-none bg-transparent hidden' : '',
          isLinkActive('/team') ? 'active' : '',
        ]"
      >
        <img
          src="/assets/imgs/team.png"
          :class="[sideBarOpen ? 'h-[30px] w-[30px] ' : 'h-[24px] w-[24px]']"
        />

        <div class="flex items-center rtl:space-x-reverse w-full">
          <div
            class="order-2 ltr:ml-[12px] rtl:mr-[12px] w-full"
            :class="[!sideBarOpen ? 'hidden' : 'block']"
          >
            <h2 class="font-[400] text-[14px]" style="line-height: 20px">
              {{ $t("Tamkin") }}
            </h2>
            <h3 class="font-[400] text-[12px]" style="line-height: 20px">
              3 {{ $t("teamcount") }}
            </h3>
          </div>
          <div class="order-3" :class="[!sideBarOpen ? 'hidden' : 'block']">
            <svg
              class="arrow_svg"
              width="7"
              height="12"
              viewBox="0 0 7 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <hr class="block w-full mx-auto h-[1px] border-lightGrey dark:border-darkborder  my-[28px]" />
      <button
        @click="$router.push(localePath('/add-site'))"
        class="btn-dashboard h-[40px] flex items-center justify-center relative w-full transition-all duration-75 ease-in-out"
        v-if="sideBarOpen"
      >
        <div class="absolute rtl:right-0 ltr:left-0 px-[12px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="active_icon"
          >
            <rect
              x="0.5"
              y="0.5"
              width="23"
              height="23"
              rx="11.5"
              stroke="currentColor"
            />
            <path
              d="M7 12C7 11.8008 7.07913 11.6098 7.21998 11.4689C7.36083 11.3281 7.55186 11.2489 7.75105 11.2489H11.2489V7.75105C11.2489 7.55186 11.3281 7.36083 11.4689 7.21998C11.6098 7.07913 11.8008 7 12 7C12.1992 7 12.3902 7.07913 12.5311 7.21998C12.6719 7.36083 12.7511 7.55186 12.7511 7.75105V11.2489H16.2489C16.4481 11.2489 16.6392 11.3281 16.78 11.4689C16.9209 11.6098 17 11.8008 17 12C17 12.1992 16.9209 12.3902 16.78 12.5311C16.6392 12.6719 16.4481 12.7511 16.2489 12.7511H12.7511V16.2489C12.7511 16.4481 12.6719 16.6392 12.5311 16.78C12.3902 16.9209 12.1992 17 12 17C11.8008 17 11.6098 16.9209 11.4689 16.78C11.3281 16.6392 11.2489 16.4481 11.2489 16.2489V12.7511H7.75105C7.55186 12.7511 7.36083 12.6719 7.21998 12.5311C7.07913 12.3902 7 12.1992 7 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="order-2">Add Site</div>
      </button>

      <!-- <i class="fa-regular fa-circle-plus"></i> -->
    </div>
    <button
      class="rounded-full bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] flex items-center justify-start w-[28px] h-[28px]"
      v-if="!sideBarOpen"
      @click="$router.push(localePath('/add-site'))"
    >
      <img src="/assets/imgs/icons/add.svg" class="w-[28px] h-[28px]" />

      <!-- <i class="fa-regular fa-circle-plus"></i> -->
    </button>

    <div class="flex flex-col items-center justify-center mt-[14.5px] w-full transform-gpu transition-all ease-in-out">
      <TamkinSideBarLink
        class="dashboard-nav-link "
        :to="goToLink('/overview')"
        :class="[!sideBarOpen ? 'closed_sidebar !w-[55px]' : 'w-full ']"
      >
        <div>
          <svg
            class="w-full h-full"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99805 10.75H4.99805C2.57805 10.75 1.24805 9.42 1.24805 7V5C1.24805 2.58 2.57805 1.25 4.99805 1.25H6.99805C9.41805 1.25 10.748 2.58 10.748 5V7C10.748 9.42 9.41805 10.75 6.99805 10.75ZM4.99805 2.75C3.41805 2.75 2.74805 3.42 2.74805 5V7C2.74805 8.58 3.41805 9.25 4.99805 9.25H6.99805C8.57805 9.25 9.24805 8.58 9.24805 7V5C9.24805 3.42 8.57805 2.75 6.99805 2.75H4.99805Z"
              :fill="[
                isLinkActive('/overview')
                  ? 'url(#paint0_linear_339_7555)'
                  : 'currentColor',
              ]"
            />
            <path
              d="M19 10.75H17C14.58 10.75 13.25 9.42 13.25 7V5C13.25 2.58 14.58 1.25 17 1.25H19C21.42 1.25 22.75 2.58 22.75 5V7C22.75 9.42 21.42 10.75 19 10.75ZM17 2.75C15.42 2.75 14.75 3.42 14.75 5V7C14.75 8.58 15.42 9.25 17 9.25H19C20.58 9.25 21.25 8.58 21.25 7V5C21.25 3.42 20.58 2.75 19 2.75H17Z"
              :fill="[
                isLinkActive('/overview')
                  ? 'url(#paint1_linear_339_7555)'
                  : 'currentColor',
              ]"
            />
            <path
              d="M19 22.75H17C14.58 22.75 13.25 21.42 13.25 19V17C13.25 14.58 14.58 13.25 17 13.25H19C21.42 13.25 22.75 14.58 22.75 17V19C22.75 21.42 21.42 22.75 19 22.75ZM17 14.75C15.42 14.75 14.75 15.42 14.75 17V19C14.75 20.58 15.42 21.25 17 21.25H19C20.58 21.25 21.25 20.58 21.25 19V17C21.25 15.42 20.58 14.75 19 14.75H17Z"
              :fill="[
                isLinkActive('/overview')
                  ? 'url(#paint2_linear_339_7555)'
                  : 'currentColor',
              ]"
            />
            <path
              d="M6.99805 22.75H4.99805C2.57805 22.75 1.24805 21.42 1.24805 19V17C1.24805 14.58 2.57805 13.25 4.99805 13.25H6.99805C9.41805 13.25 10.748 14.58 10.748 17V19C10.748 21.42 9.41805 22.75 6.99805 22.75ZM4.99805 14.75C3.41805 14.75 2.74805 15.42 2.74805 17V19C2.74805 20.58 3.41805 21.25 4.99805 21.25H6.99805C8.57805 21.25 9.24805 20.58 9.24805 19V17C9.24805 15.42 8.57805 14.75 6.99805 14.75H4.99805Z"
              :fill="[
                isLinkActive('/overview')
                  ? 'url(#paint3_linear_339_7555)'
                  : 'currentColor',
              ]"
            />
            <defs v-if="isLinkActive('/overview')">
              <linearGradient
                id="paint0_linear_339_7555"
                x1="5.99805"
                y1="1.25"
                x2="5.99805"
                y2="10.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_339_7555"
                x1="18"
                y1="1.25"
                x2="18"
                y2="10.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_339_7555"
                x1="18"
                y1="13.25"
                x2="18"
                y2="22.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_339_7555"
                x1="5.99805"
                y1="13.25"
                x2="5.99805"
                y2="22.75"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span v-if="sideBarOpen">Dashboard</span>
      </TamkinSideBarLink>
      <TamkinSideBarLink
        class="dashboard-nav-link"
        :to="goToLink('/embed-code')"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <defs v-if="isLinkActive('/embed-code')">
              <linearGradient
                id="paint0_linear_2978_5493"
                x1="12.5"
                y1="0.5"
                x2="12.5"
                y2="24.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
            </defs>

            <path
              d="M0.5 4.09091C0.5 3.00593 0.931005 1.96539 1.6982 1.1982C2.46539 0.431005 3.50593 0 4.59091 0H20.4091C21.4941 0 22.5346 0.431005 23.3018 1.1982C24.069 1.96539 24.5 3.00593 24.5 4.09091V19.9091C24.5 20.9941 24.069 22.0346 23.3018 22.8018C22.5346 23.569 21.4941 24 20.4091 24H4.59091C3.50593 24 2.46539 23.569 1.6982 22.8018C0.931005 22.0346 0.5 20.9941 0.5 19.9091V4.09091ZM4.59091 1.63636C3.93992 1.63636 3.3156 1.89497 2.85528 2.35528C2.39497 2.8156 2.13636 3.43992 2.13636 4.09091V19.9091C2.13636 20.5601 2.39497 21.1844 2.85528 21.6447C3.3156 22.105 3.93992 22.3636 4.59091 22.3636H20.4091C21.0601 22.3636 21.6844 22.105 22.1447 21.6447C22.605 21.1844 22.8636 20.5601 22.8636 19.9091V4.09091C22.8636 3.43992 22.605 2.8156 22.1447 2.35528C21.6844 1.89497 21.0601 1.63636 20.4091 1.63636H4.59091ZM10.3509 6.78546C10.5041 6.93886 10.5902 7.14682 10.5902 7.36364C10.5902 7.58046 10.5041 7.78841 10.3509 7.94182L6.29273 12L10.3509 16.0582C10.4313 16.1331 10.4958 16.2234 10.5405 16.3238C10.5852 16.4241 10.6093 16.5325 10.6112 16.6423C10.6131 16.7522 10.5929 16.8613 10.5518 16.9632C10.5106 17.0651 10.4494 17.1576 10.3717 17.2353C10.294 17.313 10.2014 17.3743 10.0996 17.4154C9.99768 17.4566 9.88856 17.4768 9.7787 17.4748C9.66885 17.4729 9.5605 17.4488 9.46014 17.4041C9.35978 17.3594 9.26945 17.2949 9.19455 17.2145L4.55818 12.5782C4.40496 12.4248 4.3189 12.2168 4.3189 12C4.3189 11.7832 4.40496 11.5752 4.55818 11.4218L9.19455 6.78546C9.34796 6.63224 9.55591 6.54617 9.77273 6.54617C9.98955 6.54617 10.1975 6.63224 10.3509 6.78546ZM15.8055 6.78546C15.7306 6.70507 15.6402 6.64059 15.5399 6.59588C15.4395 6.55116 15.3312 6.52711 15.2213 6.52517C15.1114 6.52323 15.0023 6.54344 14.9004 6.58459C14.7986 6.62574 14.706 6.68699 14.6283 6.76469C14.5506 6.84238 14.4894 6.93492 14.4482 7.0368C14.4071 7.13868 14.3869 7.2478 14.3888 7.35766C14.3907 7.46752 14.4148 7.57586 14.4595 7.67622C14.5042 7.77659 14.5687 7.86691 14.6491 7.94182L18.7073 12L14.6491 16.0582C14.5687 16.1331 14.5042 16.2234 14.4595 16.3238C14.4148 16.4241 14.3907 16.5325 14.3888 16.6423C14.3869 16.7522 14.4071 16.8613 14.4482 16.9632C14.4894 17.0651 14.5506 17.1576 14.6283 17.2353C14.706 17.313 14.7986 17.3743 14.9004 17.4154C15.0023 17.4566 15.1114 17.4768 15.2213 17.4748C15.3312 17.4729 15.4395 17.4488 15.5399 17.4041C15.6402 17.3594 15.7306 17.2949 15.8055 17.2145L20.4418 12.5782C20.595 12.4248 20.6811 12.2168 20.6811 12C20.6811 11.7832 20.595 11.5752 20.4418 11.4218L15.8055 6.78546Z"
              :fill="[
                isLinkActive('/embed-code')
                  ? 'url(#paint0_linear_2978_5493)'
                  : 'currentColor',
              ]"
            />
          </svg>
        </div>
        <span v-if="sideBarOpen">Embed Code</span>
      </TamkinSideBarLink>
      <TamkinSideBarLink
        class="dashboard-nav-link"
        :to="goToLink('/my-site')"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <g clip-path="url(#clip0_2978_23987)">
              <path
                d="M23.4091 15.2727H21.2273V12C21.2273 11.7107 21.1123 11.4332 20.9078 11.2286C20.7032 11.024 20.4257 10.9091 20.1364 10.9091H13.5909V8.72727H15.7727C16.0621 8.72727 16.3395 8.61234 16.5441 8.40775C16.7487 8.20317 16.8636 7.92569 16.8636 7.63636V1.09091C16.8636 0.801582 16.7487 0.524105 16.5441 0.31952C16.3395 0.114935 16.0621 0 15.7727 0H9.22727C8.93795 0 8.66047 0.114935 8.45588 0.31952C8.2513 0.524105 8.13636 0.801582 8.13636 1.09091V7.63636C8.13636 7.92569 8.2513 8.20317 8.45588 8.40775C8.66047 8.61234 8.93795 8.72727 9.22727 8.72727H11.4091V10.9091H4.86364C4.57431 10.9091 4.29683 11.024 4.09225 11.2286C3.88766 11.4332 3.77273 11.7107 3.77273 12V15.2727H1.59091C1.30158 15.2727 1.0241 15.3877 0.81952 15.5922C0.614935 15.7968 0.5 16.0743 0.5 16.3636V22.9091C0.5 23.1984 0.614935 23.4759 0.81952 23.6805C1.0241 23.8851 1.30158 24 1.59091 24H8.13636C8.42569 24 8.70317 23.8851 8.90775 23.6805C9.11234 23.4759 9.22727 23.1984 9.22727 22.9091V16.3636C9.22727 16.0743 9.11234 15.7968 8.90775 15.5922C8.70317 15.3877 8.42569 15.2727 8.13636 15.2727H5.95455V13.0909H19.0455V15.2727H16.8636C16.5743 15.2727 16.2968 15.3877 16.0922 15.5922C15.8877 15.7968 15.7727 16.0743 15.7727 16.3636V22.9091C15.7727 23.1984 15.8877 23.4759 16.0922 23.6805C16.2968 23.8851 16.5743 24 16.8636 24H23.4091C23.6984 24 23.9759 23.8851 24.1805 23.6805C24.3851 23.4759 24.5 23.1984 24.5 22.9091V16.3636C24.5 16.0743 24.3851 15.7968 24.1805 15.5922C23.9759 15.3877 23.6984 15.2727 23.4091 15.2727ZM7.04545 17.4545V21.8182H2.68182V17.4545H7.04545ZM10.3182 6.54545V2.18182H14.6818V6.54545H10.3182ZM22.3182 21.8182H17.9545V17.4545H22.3182V21.8182Z"
                :fill="[
                  isLinkActive('/my-site')
                    ? 'url(#paint0_linear_2978_23987)'
                    : 'currentColor',
                ]"
              />
            </g>
            <defs v-if="isLinkActive('/my-site')">
              <linearGradient
                id="paint0_linear_2978_23987"
                x1="12.5"
                y1="0"
                x2="12.5"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
              <clipPath id="clip0_2978_23987">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span v-if="sideBarOpen">My Site</span>
      </TamkinSideBarLink>

      <div
        class="relative"
        @click="openMenuSub(4)"
        :class="[!sideBarOpen ? '  ' : 'w-full ']"
      >
        <div
          class="dashboard-nav-link"
          :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
          ref="signLanguageHover"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-[24px] h-[24px]"
          >
            <path

            :class="[ showSubMenu[4] ? 'sign-gradient' : 'fill-[#585B5B] dark:fill-white']"
              d="M13.7514 7.08983L7.23314 2.35596C7.08597 2.24635 6.99943 2.11523 6.97351 1.96259C6.94759 1.80995 6.99107 1.66177 7.10395 1.51806C7.21683 1.37435 7.35563 1.2887 7.52035 1.26109C7.68507 1.23349 7.84185 1.27449 7.99069 1.3841L14.5077 6.12406L13.7514 7.08983ZM8.92885 6.28847L8.54757 6.64166C8.44305 6.72772 8.35191 6.81094 8.27414 6.89132C8.19638 6.97251 8.12364 7.06588 8.05591 7.17143L6.14823 5.79889C6.00023 5.69009 5.91327 5.55491 5.88735 5.39334C5.86226 5.23258 5.90574 5.08034 6.01779 4.93663C6.13067 4.79374 6.26989 4.7097 6.43545 4.68453C6.601 4.65936 6.75778 4.70158 6.90578 4.81119L8.92885 6.28847ZM19.8243 7.26034L11.3056 1.0979C11.1576 0.989101 11.0736 0.857977 11.0535 0.704525C11.0334 0.551073 11.0794 0.402898 11.1915 0.260001C11.3035 0.117104 11.4386 0.0326647 11.5966 0.00668345C11.7538 -0.017674 11.9064 0.0245456 12.0544 0.133342L18.8523 5.04746L19.3038 1.77504C19.3498 1.5071 19.4598 1.27449 19.6337 1.07719C19.8076 0.879898 20.0304 0.764606 20.3022 0.731318L21.1701 0.642413L23.8517 9.44276C24.003 9.91368 24.0385 10.3785 23.9583 10.8372C23.878 11.296 23.6844 11.7198 23.3776 12.1087L21.7007 14.2838C21.6589 14.0467 21.5932 13.821 21.5037 13.6067C21.4151 13.3915 21.3047 13.1824 21.1726 12.9795L22.383 11.3962C22.5728 11.1559 22.694 10.8977 22.7467 10.6217C22.8002 10.3456 22.7818 10.0692 22.6915 9.79229L20.464 2.53377L19.8243 7.26034ZM6.75277 10.4171L6.0968 9.9494C5.9463 9.84629 5.85766 9.71273 5.83091 9.54872C5.80415 9.38471 5.84721 9.23085 5.96009 9.08714C6.07297 8.94344 6.21219 8.86306 6.37775 8.84601C6.54331 8.82896 6.70009 8.87524 6.84809 8.98484L7.48273 9.43546C7.47436 9.59784 7.48189 9.76185 7.5053 9.92748C7.52872 10.0915 7.57052 10.2547 7.63072 10.4171H6.75277ZM0.627114 17.2542C0.449014 17.2542 0.300179 17.1957 0.180609 17.0788C0.060203 16.9619 0 16.817 0 16.644C0 16.4711 0.060203 16.3266 0.180609 16.2105C0.301015 16.0944 0.44985 16.0363 0.627114 16.0363H8.7796V17.2542H0.627114ZM1.88134 20.6265C1.70324 20.6265 1.55441 20.568 1.43484 20.4511C1.31527 20.3342 1.25506 20.1893 1.25423 20.0163C1.25339 19.8434 1.3136 19.6989 1.43484 19.5828C1.55608 19.4667 1.70491 19.4086 1.88134 19.4086H8.7796V20.6265H1.88134ZM4.3898 24C4.2117 24 4.06286 23.9411 3.94329 23.8234C3.82372 23.7057 3.76352 23.5616 3.76269 23.3911C3.76185 23.2206 3.82205 23.076 3.94329 22.9575C4.06454 22.839 4.21337 22.7805 4.3898 22.7821H16.4505C16.9664 22.7821 17.4087 22.6031 17.7774 22.245C18.1462 21.887 18.331 21.4571 18.3318 20.9553V15.7099C18.3318 15.4128 18.2695 15.1363 18.1449 14.8806C18.0212 14.6248 17.8355 14.4125 17.588 14.2436L11.3457 9.70948L13.7489 13.8831H3.13557C2.95747 13.8831 2.80864 13.8247 2.68907 13.7078C2.56866 13.59 2.50846 13.4443 2.50846 13.2705C2.50846 13.0968 2.56866 12.9523 2.68907 12.837C2.80947 12.7217 2.95831 12.6636 3.13557 12.6628H11.6066L9.93725 9.78255C9.79929 9.54385 9.74034 9.29134 9.7604 9.02503C9.78047 8.75873 9.89586 8.5391 10.1066 8.36616L10.7676 7.79376L18.3218 13.2778C18.7223 13.5758 19.0329 13.9314 19.2537 14.3447C19.4752 14.7588 19.586 15.2135 19.586 15.7087V20.9541C19.586 21.8001 19.2808 22.5191 18.6704 23.111C18.0609 23.7037 17.3209 24 16.4505 24H4.3898Z"
           
            />
            <defs >
              <linearGradient
                id="grad_sign_lang"
                x1="12"
                y1="0"
                x2="12"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
            </defs>
          </svg>

          <div
            class="w-full space-x-[50px] flex items-center justify-evenly"
            :class="[!sideBarOpen ? 'hidden' : '']"
          >
            <div
              v-if="sideBarOpen"
              :class="[
                showSubMenu[4]
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                  : '',
              ]"
              class="ml-[-2px] whitespace-nowrap"
            >
              Sign language
            </div>
            <div v-if="sideBarOpen">
              <svg
                width="7"
                height="12"
                :class="[showSubMenu[4] ? 'rotate-90  ' : 'rotate-0 ']"
                viewBox="0 0 7 12"
                class="w-full h-full ]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="grad34311" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                    <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                  </linearGradient>
                </defs>
                <path
                :class="[ showSubMenu[4] ? 'sign-gradient' : 'fill-[#585B5B] dark:fill-[white]']"
                fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="bg-[#FFFEFE] dark:bg-tamkinDarkPrimary rounded-[10px]"
          :class="[
            !sideBarOpen && showSubMenu[4]
              ? 'absolute top-0 left-[65px] bg-white dark:bg-tamkinDarkPrimary !z-[140] w-[270px] shadow-md'
              : ' ',
            showSubMenu[4] ? 'block ' : 'hidden',
          ]"
          v-on-click-outside="() => closeSubMenuOnClickOutside(4)"
        >
          <div class="flex flex-col items-start justify-center mt-[6px] w-full mb-[10px]">
            <div
              class="flex items-center justify-between w-full mt-[10px] px-[15px]"
              @click.stop
            >
              <div
                v-if="!sideBarOpen"
                class=""
                :class="[
                  !sideBarOpen && showSubMenu[4]
                    ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                    : '',
                ]"
              >
                Sign language
              </div>
              <div v-if="!sideBarOpen">
                <svg
                  width="7"
                  height="12"
                  :class="[showSubMenu[4] ? 'rotate-90 p-[8px]' : 'rotate-0 p-[8px]']"
                  viewBox="0 0 7 12"
                  class="w-full h-full pr-[8px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="grad_s" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                      <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#grad_s)"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
                  />
                </svg>
              </div>
            </div>
            <div class="bg-[#FFFEFE]  dark:!bg-transparent relative w-full" @click.stop>
              <ul
                class="space-y-[10px] w-full"
                :class="[!sideBarOpen ? 'mt-[10px]' : '']"
              >
                <li
               
                 ref="services"
                  class="rounded-[10px] relative group w-full"
                  :class="[
                    isLinkActive('/overview') && sideBarOpen ? '' : '',
                    sideBarOpen ? 'w-full ' : '',
                  ]"
                >
                  <nuxt-link
                    @click="openChildMenus(1)"
                    :class="[
                      showChildMenu[1]
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                        : '',
                    ]"
                    class="relative w-full"
                  >
                    <div
                      class="flex items-center justify-center dashboard-nav-link"
                      :class="[
                        sideBarOpen ? 'px-[10px]' : 'px-[14px] w-11/12 mx-auto !space-x-[0] ',
                      ]"
                    >
                      <div
                        :class="[
                          !sideBarOpen
                            ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                            : !sideBarOpen
                            ? 'hover:bg-gradient-to-b hover:from-tamkinStart hover:to-tamkinEnd bg-clip-text hover:text-transparent'
                            : '',
                        ]"
                        class="flex items-center justify-start w-full"
                      >
                        <div
                          class="w-[8px] h-[2px] rounded-[10px] "
                          v-if="sideBarOpen"
                          :class="[
                            showChildMenu[1]
                              ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                              : 'bg-darkGrey dark:bg-whiteTamkin',
                          ]"
                        ></div>
                        <div
                       
                          :class="[
                            showChildMenu[1] || !sideBarOpen 
                              ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent '
                              : 'text-darkGrey dark:text-white',
                            sideBarOpen ? 'pl-[22px]' : '',
                          ]"
                        >
                          Services
                        </div>
                      </div>

                      <div class="">
                        <svg
                          width="7"
                          height="12"
                          :class="[
                            !showChildMenu[1]
                              ? 'rotate-90 '
                              : 'rotate-0 ',
                          ]"
                          viewBox="0 0 7 12"
                          class="w-full h-full"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                              <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                            </linearGradient>
                          </defs>
                          <path
                            :class="
                            showChildMenu[1] || !sideBarOpen
                                ? 'fill_services '
                                : 'dark:fill-white fill-[#585B5B]'
                            "
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </nuxt-link>
                </li>
                <ul
                    @mouseenter="servicesHover = true"
    @mouseleave="servicesHover = false"
                  class=" space-y-[10px] w-full"
                  :class="[!sideBarOpen ? 'mt-[10px] px-[15px] shadow-xl bg-white dark:bg-tamkinDarkPrimary p-3 absolute top-[0] left-[270px]  rounded-[10px] rounded-tl-none ' : 'ml-[20px]']"
                  v-if="showChildMenu[1]"
                >
                  <li
                    class="rounded-[10px] relative dashboard-nav-link_sub_menu group !p-3"
                    :class="[
                      isLinkActive('/market') && sideBarOpen ? '' : '',
                      sideBarOpen ? 'w-3/4 ml-[10px]' : '',
                    ]"
                  >
                    <nuxt-link
                      @click.stop
                      :to="localePath('/market')"
                      :class="[
                        isLinkActive('/market')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                          : '',
                      ]"
                      class="relative flex items-center justify-start space-x-[10px] mr-auto w-full"
                    >
                      <div
                        class="group-hover:bg-darkGrey dark:group-hover:bg-whiteTamkin w-[7px] h-[7px] rounded-[10px]"
                        v-if="sideBarOpen"
                        :class="[
                          isLinkActive('/market')
                            ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                            : 'border-[1px] border-darkGrey dark:border-whiteTamkin',
                        ]"
                      ></div>
                      <div
                        :class="[
                          !sideBarOpen && isLinkActive('/market')
                            ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                            : sideBarOpen
                            ? 'hover:bg-gradient-to-b hover:from-tamkinStart hover:to-tamkinEnd bg-clip-text hover:text-transparent'
                            : '',
                        ]"
                      >
                        Market
                      </div>
                    </nuxt-link>
                  </li>
                  <li
                  class="rounded-[10px] relative dashboard-nav-link_sub_menu group !p-3"
                  :class="[
                    isLinkActive('/market') && sideBarOpen ? '' : '',
                    sideBarOpen ? 'w-3/4 ml-[10px]' : '',
                  ]"
                >
                  <nuxt-link
                    @click.stop
                    :to="localePath('/qr-translate')"
                    :class="[
                      isLinkActive('/qr-translate')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                        : '',
                    ]"
                    class="relative flex items-center justify-start space-x-[10px] mr-auto w-full"
                  >
                    <div
                      class="group-hover:bg-darkGrey  dark:group-hover:bg-whiteTamkin w-[7px] h-[7px] rounded-[10px]"
                      v-if="sideBarOpen"
                      :class="[
                        isLinkActive('/qr-translate')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                          : 'border-[1px] border-darkGrey dark:border-whiteTamkin' ,
                      ]"
                    ></div>
                    <div
                      :class="[
                        !sideBarOpen && isLinkActive('/qr-translate')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                          : sideBarOpen
                          ? 'hover:bg-gradient-to-b hover:from-tamkinStart hover:to-tamkinEnd bg-clip-text hover:text-transparent'
                          : '',
                      ]"
                    >
                    QR Translator
                    </div>
                  </nuxt-link>
                </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative"
        @click="openMenuSub(3)"
        :class="[!sideBarOpen ? '  ' : 'w-full ']"
      >
        <div
          class="dashboard-nav-link"
          :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
          ref="accessMenuHover"
        >
          <div>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full stroke-darkGrey mx-auto"
            >
              <g>
                <path
                  :class="[showSubMenu[3] ? 'stroke_access' : 'stroke-current dark:stroke-white']"
                  d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                  stroke-width="1.5"
                />
                <path
                :class="[showSubMenu[3] ? 'stroke_access' : 'stroke-current dark:stroke-white']"
                d="M15.3996 7.0001C15.3996 7.63662 15.1468 8.24707 14.6967 8.69715C14.2466 9.14724 13.6361 9.4001 12.9996 9.4001C12.3631 9.4001 11.7526 9.14724 11.3026 8.69715C10.8525 8.24707 10.5996 7.63662 10.5996 7.0001C10.5996 6.36358 10.8525 5.75313 11.3026 5.30304C11.7526 4.85295 12.3631 4.6001 12.9996 4.6001C13.6361 4.6001 14.2466 4.85295 14.6967 5.30304C15.1468 5.75313 15.3996 6.36358 15.3996 7.0001Z"
                />
                <path
                  :class="[showSubMenu[3] ? 'stroke_access' : 'stroke-current dark:stroke-white']"
                  d="M20.2008 10.6001C20.2008 10.6001 15.9564 12.4001 13.0008 12.4001C10.0452 12.4001 5.80078 10.6001 5.80078 10.6001M13.0008 13.0001V14.7425M13.0008 14.7425C13.0004 15.433 13.1987 16.1091 13.572 16.6901L16.6008 21.4001M13.0008 14.7425C13.0011 15.433 12.8028 16.1091 12.4296 16.6901L9.40078 21.4001"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_2978_5493"
                  x1="12.5"
                  y1="0.5"
                  x2="12.5"
                  y2="24.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div
            class="w-full space-x-[65px] flex items-center justify-center"
            :class="[!sideBarOpen ? 'hidden' : '']"
          >
            <div
              v-if="sideBarOpen"
              class=""
              :class="[
                showSubMenu[3]
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                  : '',
              ]"
            >
              Accessibility
            </div>
            <div v-if="sideBarOpen">
              <svg
                width="7"
                height="12"
                :class="[showSubMenu[3] ? 'rotate-90 p-[8px]' : 'rotate-0 p-[8px] ']"
                viewBox="0 0 7 12"
                class="w-full h-full pr-[4px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="grad_ni" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                    <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                  </linearGradient>
                </defs>
                <path
                  :class="[showSubMenu[3] ? 'fill_access' : 'fill-[#585B5B] dark:fill-white']"

                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="bg-[#FFFEFE] dark:bg-tamkinDarkPrimary rounded-[10px]"
          ref="submenuHover"
          :class="[
            !sideBarOpen && showSubMenu[3]
              ? 'absolute top-0 left-[65px] bg-white dark:bg-tamkinDarkPrimary !z-[140] w-[270px] shadow-md'
              : ' ',
            showSubMenu[3] ? 'block ' : 'hidden',
          ]"
          v-on-click-outside="() => closeSubMenuOnClickOutside(3)"
        >
          <div
            class="flex flex-col items-start justify-center mt-[6px] w-full mb-[10px] px-[15px]"
          >
            <div class="flex items-center justify-between w-full mt-[10px]">
              <div
                v-if="!sideBarOpen"
                class="bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent"
              >
                Accessibility
              </div>
              <div v-if="!sideBarOpen">
                <svg
                  width="7"
                  height="12"
                  :class="[showSubMenu[3] ? 'rotate-90 ' : 'rotate-0 ']"
                  viewBox="0 0 7 12"
                  class="w-full h-full pr-[8px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="grad13" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                      <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#grad13)"
                    d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
                  />
                </svg>
              </div>
            </div>
            <div class="bg-[#FFFEFE] dark:bg-tamkinDarkPrimary relative w-full" @click.stop>
              <ul
                class="space-y-[10px] w-full"
                :class="[!sideBarOpen ? 'mt-[10px]' : '']"
              >
                <li
                  class="rounded-[10px] relative dashboard-nav-link_sub_menu group !p-3"
                  :class="[
                    isLinkActive('/overview') && sideBarOpen ? '' : '',
                    sideBarOpen ? 'w-3/4 ml-[10px]' : '',
                  ]"
                >
                  <nuxt-link
                    @click.stop
                    :to="localePath('/overview')"
                    :class="[
                      isLinkActive('/overview')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent hover:text-darkGrey'
                        : '',
                    ]"
                    class="relative flex items-center justify-start space-x-[10px] mr-auto w-full"
                  >
                    <div
                      class="group-hover:bg-darkGrey dark:group-hover:bg-whiteTamkin w-[7px] h-[7px] rounded-[10px]"
                      v-if="sideBarOpen"
                      :class="[
                        isLinkActive('/overview')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                          : 'border-[1px] border-darkGrey dark:border-whiteTamkin ',
                      ]"
                    ></div>
                    <div
                      :class="[
                        !sideBarOpen && isLinkActive('/overview')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                          : sideBarOpen
                          ? ''
                          : '',
                      ]"
                    >
                      Overview
                    </div>
                  </nuxt-link>
                </li>
                <li
                  class="rounded-[10px] relative dashboard-nav-link_sub_menu group !p-3"
                  :class="[
                    isLinkActive('/addons') && sideBarOpen ? '' : '',
                    sideBarOpen ? 'w-3/4 ml-[10px]' : '',
                  ]"
                >
                  <nuxt-link
                    :to="localePath('/addons')"
                    :class="[
                      isLinkActive('/addons')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent hover:text-darkGrey'
                        : '',
                    ]"
                    class="relative flex items-center justify-start space-x-[10px] mr-auto w-full"
                  >
                    <div
                      class="group-hover:bg-darkGrey  dark:group-hover:bg-whiteTamkin w-[7px] h-[7px] rounded-[10px]"
                      v-if="sideBarOpen"
                      :class="[
                        isLinkActive('/addons')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                          : 'border-[1px] border-darkGrey dark:border-whiteTamkin',
                      ]"
                    ></div>
                    <div
                      :class="[
                        !sideBarOpen && isLinkActive('/addons')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                          : sideBarOpen
                          ? ''
                          : '',
                      ]"
                    >
                      Addons
                    </div>
                  </nuxt-link>
                </li>
                <li
                  class="rounded-[10px] relative dashboard-nav-link_sub_menu group !p-3"
                  :class="[
                    isLinkActive('/statistics') && sideBarOpen ? ' ' : '',
                    sideBarOpen ? 'w-3/4 ml-[10px]' : '',
                  ]"
                >
                  <nuxt-link
                    @click.stop
                    :to="localePath('/statistics')"
                    :class="[
                      isLinkActive('/statistics')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent hover:text-darkGrey'
                        : '',
                    ]"
                    class="relative flex items-center justify-start space-x-[10px] mr-auto w-full"
                  >
                    <div
                      class="group-hover:bg-darkGrey dark:group-hover:bg-whiteTamkin w-[7px] h-[7px] rounded-[10px]"
                      v-if="sideBarOpen"
                      :class="[
                        isLinkActive('/statistics')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                          : 'border-[1px] border-darkGrey dark:border-whiteTamkin',
                      ]"
                    ></div>
                    <div
                      :class="[
                        !sideBarOpen && isLinkActive('/statistics')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                          : sideBarOpen
                          ? ''
                          : '',
                      ]"
                    >
                      Statistics
                    </div>
                  </nuxt-link>
                </li>
                <li
                  class="rounded-[10px] relative dashboard-nav-link_sub_menu group !p-3"
                  :class="[
                    isLinkActive('/customize') && sideBarOpen ? '' : '',
                    sideBarOpen ? 'w-3/4 ml-[10px]' : '',
                  ]"
                >
                  <nuxt-link
                    @click.stop
                    :to="localePath('/customize')"
                    :class="[
                      isLinkActive('/customize')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent hover:text-darkGrey'
                        : '',
                    ]"
                    class="relative flex items-center justify-start space-x-[10px] mr-auto w-full"
                  >
                    <div
                      class="group-hover:bg-darkGrey dark:group-hover:bg-whiteTamkin w-[7px] h-[7px] rounded-[10px]"
                      v-if="sideBarOpen"
                      :class="[
                        isLinkActive('/customize')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                          : 'border-[1px] border-darkGrey dark:border-whiteTamkin',
                      ]"
                    ></div>
                    <div
                      :class="[
                        !sideBarOpen && isLinkActive('/customize')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                          : sideBarOpen
                          ? ''
                          : '',
                      ]"
                    >
                      Customize
                    </div>
                  </nuxt-link>
                </li>
                <li
                  class="rounded-[10px] relative dashboard-nav-link_sub_menu group !p-3"
                  :class="[
                    isLinkActive('/settings') && sideBarOpen ? '' : '',
                    sideBarOpen ? 'w-3/4 ml-[10px]' : '',
                  ]"
                >
                  <nuxt-link
                    @click.stop
                    :to="localePath('/settings')"
                    :class="[
                      isLinkActive('/settings')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent hover:text-darkGrey'
                        : '',
                    ]"
                    class="relative flex items-center justify-start space-x-[10px] mr-auto w-full"
                  >
                    <div
                      class="group-hover:bg-darkGrey dark:group-hover:bg-whiteTamkin w-[7px] h-[7px] rounded-[10px]"
                      v-if="sideBarOpen"
                      :class="[
                        isLinkActive('/settings')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                          : 'border-[1px] border-darkGrey dark:border-whiteTamkin',
                      ]"
                    ></div>
                    <div
                      :class="[
                        !sideBarOpen && isLinkActive('/settings')
                          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                          : sideBarOpen
                          ? ''
                          : '',
                      ]"
                    >
                      Settings
                    </div>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        class="dashboard-nav-link"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <g clip-path="url(#clip0_2978_5551)">
              <path
                d="M21.0833 2.40462C18.8524 0.832307 15.8818 0 12.5 0C9.11818 0 6.14764 0.832307 3.91673 2.40462C1.74473 3.93538 0.5 6.08769 0.5 8.30769V15.6923C0.5 17.9123 1.74473 20.0646 3.91673 21.5954C6.14764 23.1677 9.11818 24 12.5 24C15.8818 24 18.8524 23.1677 21.0833 21.5954C23.2553 20.0646 24.5 17.9123 24.5 15.6923V8.30769C24.5 6.08769 23.2553 3.93538 21.0833 2.40462ZM4.50145 4.05692C6.52291 2.63077 9.36364 1.84615 12.5 1.84615C15.6364 1.84615 18.4771 2.63077 20.4985 4.05692C22.2091 5.26308 23.1909 6.81231 23.1909 8.30769C23.1909 9.80308 22.2091 11.3523 20.4985 12.5585C18.4771 13.9846 15.6364 14.7692 12.5 14.7692C9.36364 14.7692 6.52291 13.9846 4.50145 12.5585C2.79091 11.3523 1.80909 9.80308 1.80909 8.30769C1.80909 6.81231 2.79091 5.26308 4.50145 4.05692ZM11.8455 16.6046V22.1431C9.74655 22.0692 7.80145 21.6385 6.17273 20.8954V15.4492C7.83855 16.1431 9.75636 16.5369 11.8455 16.6046ZM13.1545 16.6046C15.2436 16.5369 17.1615 16.1431 18.8273 15.4477V20.8938C17.1985 21.6369 15.2535 22.0677 13.1545 22.1415V16.6046ZM1.80909 15.6923V12.1538C2.43186 12.9889 3.1429 13.6823 3.91673 14.2092C4.21927 14.4215 4.53491 14.6205 4.86364 14.8062V20.1908C4.74036 20.1108 4.61927 20.0369 4.50145 19.9477C2.79091 18.7369 1.80909 17.1877 1.80909 15.6923ZM20.4985 19.9431C20.3807 20.0262 20.2596 20.1062 20.1364 20.1862V14.8015C20.4644 14.6159 20.78 14.4169 21.0833 14.2046C21.8569 13.6791 22.5679 12.9872 23.1909 12.1538V15.6923C23.1909 17.1877 22.2091 18.7369 20.4985 19.9431Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_2978_5551">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span v-if="sideBarOpen">Coin Store</span>
      </div>

      <div
        class="dashboard-nav-link"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <g clip-path="url(#clip0_2978_5569)">
              <path
                d="M24.5 3H23V0H8V3H5V4.875L4.1 6H2V8.625L0.5 10.5V24H18.5L24.5 16.5V3ZM3.5 7.5H15.5V10.5H3.5V7.5ZM17 22.5H2V12H17V22.5ZM18.5 10.5H17V6H6.5V4.5H18.5V10.5ZM21.5 6.75L20 8.625V3H9.5V1.5H21.5V6.75Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_2978_5569">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span v-if="sideBarOpen">Records</span>
      </div>
      <div
        class="dashboard-nav-link"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <g clip-path="url(#clip0_2978_5587)">
              <path
                d="M12.5 0C13.9445 0 15.329 0.255549 16.6116 0.722255L15.1779 2.15477C13.0081 1.56477 10.7042 1.70824 8.62443 2.56286C6.54464 3.41748 4.80552 4.93536 3.67749 6.88047C2.54946 8.82558 2.09574 11.0889 2.38689 13.3185C2.67804 15.5481 3.69774 17.619 5.28743 19.2093C6.87712 20.7995 8.9477 21.8199 11.1772 22.1118C13.4067 22.4037 15.6702 21.9507 17.6157 20.8233C19.5612 19.6959 21.0796 17.9573 21.9349 15.8778C22.7903 13.7983 22.9345 11.4945 22.3452 9.32453L23.7777 7.89202C24.2565 9.20867 24.5009 10.599 24.5 12C24.5 18.6275 19.1275 24 12.5 24C5.87252 24 0.5 18.6275 0.5 12C0.5 5.37252 5.87252 0 12.5 0ZM12.5 4.80144C13.1079 4.80103 13.7134 4.87763 14.302 5.02939V6.90942C13.1476 6.50098 11.8885 6.49716 10.7316 6.89858C9.57467 7.29999 8.58857 8.0828 7.93517 9.11851C7.28176 10.1542 6.99988 11.3813 7.13577 12.5983C7.27167 13.8154 7.81728 14.95 8.68304 15.8161C9.5488 16.6822 10.6833 17.2282 11.9003 17.3645C13.1172 17.5009 14.3444 17.2194 15.3804 16.5664C16.4163 15.9134 17.1995 14.9276 17.6013 13.7708C18.0032 12.614 17.9998 11.355 17.5918 10.2004H19.4718C19.8471 11.654 19.7586 13.1886 19.2185 14.5894C18.6785 15.9903 17.714 17.1872 16.46 18.0127C15.206 18.8382 13.7253 19.251 12.2251 19.1932C10.7249 19.1355 9.28026 18.6102 8.0934 17.6908C6.90655 16.7714 6.03685 15.5039 5.60603 14.0657C5.17521 12.6275 5.20482 11.0907 5.69073 9.67016C6.17663 8.24965 7.09451 7.01661 8.31591 6.14361C9.5373 5.2706 11.0011 4.80132 12.5024 4.80144M14.9019 12C14.9018 12.5157 14.7354 13.0177 14.4276 13.4315C14.1198 13.8452 13.6868 14.1488 13.1929 14.2972C12.699 14.4457 12.1704 14.431 11.6855 14.2554C11.2006 14.0798 10.7851 13.7527 10.5007 13.3225C10.2163 12.8922 10.0781 12.3818 10.1065 11.8669C10.135 11.3519 10.3286 10.8599 10.6586 10.4636C10.9887 10.0673 11.4376 9.7879 11.939 9.6668C12.4403 9.5457 12.9672 9.58933 13.4418 9.79124L15.5054 7.72765L15.5018 3.90162C15.502 3.66305 15.5969 3.43433 15.7657 3.26575L18.7651 0.266347C18.891 0.140664 19.0512 0.0550918 19.2257 0.0204375C19.4001 -0.0142168 19.5809 0.00360124 19.7453 0.0716413C19.9096 0.139681 20.0501 0.254891 20.1489 0.40272C20.2478 0.55055 20.3007 0.724367 20.3008 0.902219V4.20156H23.6002C23.778 4.20172 23.9518 4.25457 24.0997 4.35346C24.2475 4.45234 24.3627 4.59282 24.4308 4.75714C24.4988 4.92146 24.5166 5.10226 24.482 5.27671C24.4473 5.45115 24.3617 5.61141 24.2361 5.73725L21.2367 8.73665C21.0681 8.90545 20.8393 9.00039 20.6008 9.0006H16.7735L14.71 11.0642C14.8323 11.3521 14.8995 11.6677 14.8995 12M20.2277 7.20096L21.4274 6.0012H19.3998C19.1612 6.0012 18.9323 5.9064 18.7635 5.73765C18.5948 5.5689 18.5 5.34003 18.5 5.10138V3.07378L17.3014 4.27354V7.13017L17.3722 7.20216L20.2277 7.20096Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_2978_5587">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span v-if="sideBarOpen">Packages</span>
      </div>
      <div
        class="dashboard-nav-link"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
          >
            <g clip-path="url(#clip0_2978_5605)">
              <path
                d="M12.5 0L24.5 6.00054V17.9995L12.5 24L0.5 17.9995V6.00054L12.5 0ZM12.5 2.48498L2.98447 7.24195V16.758L12.5 21.515L22.0155 16.758V7.24195L12.5 2.48498ZM12.5 8.77275C11.5116 8.77275 10.5637 9.11276 9.86482 9.71799C9.16593 10.3232 8.77329 11.1441 8.77329 12C8.77329 12.8559 9.16593 13.6768 9.86482 14.282C10.5637 14.8872 11.5116 15.2273 12.5 15.2273C13.4884 15.2273 14.4363 14.8872 15.1352 14.282C15.8341 13.6768 16.2267 12.8559 16.2267 12C16.2267 11.1441 15.8341 10.3232 15.1352 9.71799C14.4363 9.11276 13.4884 8.77275 12.5 8.77275ZM6.28882 12C6.28882 10.5735 6.94321 9.20536 8.10803 8.19665C9.27285 7.18793 10.8527 6.62125 12.5 6.62125C14.1473 6.62125 15.7271 7.18793 16.892 8.19665C18.0568 9.20536 18.7112 10.5735 18.7112 12C18.7112 13.4265 18.0568 14.7946 16.892 15.8034C15.7271 16.8121 14.1473 17.3788 12.5 17.3788C10.8527 17.3788 9.27285 16.8121 8.10803 15.8034C6.94321 14.7946 6.28882 13.4265 6.28882 12Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_2978_5605">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span v-if="sideBarOpen">Settings</span>
      </div>
      <div
        v-if="!sideBarOpen"
        class="cursor-pointer mt-[14px]"
        @click="$router.push(localePath('/contact'))"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div class="w-[34px] h-[34px]">
          <img src="/public/assets/pngs/support_h.png" />
        </div>
      </div>
      <div
        v-if="sideBarOpen"
        class="w-full mb-[24px] bg-cover bg-center rounded-[18px] mt-[4px] bg-gradient-to-br from-[#E0F8F8] via-[#F9E8FF] to-[#FFE9EE]"
      >
        <div
          class="flex flex-col space-y-[5px] py-[10px] items-center justify-center rounded-lg"
        >
          <div>
            <img
              src="/assets/pngs/support_h.png"
              alt="Sales Team"
              class="w-[35px] h-[35px]"
            />
          </div>
          <div>
            <h2 class="text-[14px] font-[600] text-[#0D5C56]">Need Help?</h2>
          </div>
          <div>
            <h2 class="text-[11px] font-[400] text-[#64938f]">Contact Our Sales Team</h2>
          </div>
          <div class="w-full mx-auto">
            <button
              class="btn-dashboard hover_tamkin !h-[14px] !p-[13px] w-2/4 !text-[12px] mx-auto"
              @click="$router.push(localePath('/contact'))"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
