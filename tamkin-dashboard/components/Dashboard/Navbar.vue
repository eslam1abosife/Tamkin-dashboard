<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import { useElementHover } from "@vueuse/core";
import { useGetCurrentTeam, useGetAllMembers } from "~/composables/useTeam";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

// import banner from 'assets/imgs/gradient_embded.png'

const accessMenuHover = ref();
const submenuHover = ref();
const services = ref();
const control = ref();
const signLanguageHover = ref();
const isHovered = useElementHover(accessMenuHover);
const isSubmenuHovered = useElementHover(submenuHover);
const isSignLanguageHoverd = useElementHover(signLanguageHover);
const servicesHover = useElementHover(services);
const loadingTeamCard = ref(true);

const { getAvatarLetters } = useGetAvatarLetters();

const controlHover = useElementHover(control);
const props = defineProps({
  sideBarOpen: Boolean,
  mobileSidebar: Boolean,
});

const { currTeam, getCurrentTeam } = useGetCurrentTeam();
const { teamMembers, getAllTeamMember } = useGetAllMembers();

onMounted(async () => {
  await getCurrentTeam();
  const user = JSON.parse(localStorage.getItem("user"));
  await getAllTeamMember(user.agency);
  loadingTeamCard.value = false;
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
const showChildMenu = ref(new Array(3).fill(false));
const openChildMenus = (id) => {
  clearTimeout(closeTimeoutChild); // Clear any previous timeout

  // Toggle the clicked child menu
  const isCurrentlyOpen = showChildMenu.value[id];
  showChildMenu.value = showChildMenu.value.map((_, index) =>
    index === id ? !isCurrentlyOpen : false
  );
  showOnClickChild.value = !isCurrentlyOpen; // Ensure the state reflects the clicked action

  console.log(`child menu ${id} visibility:`, showChildMenu.value[id]);
};

const openMenuSub = (id) => {
  clearTimeout(closeTimeout); // Clear any previous timeout

  // Toggle the clicked submenu
  const isCurrentlyOpen = showSubMenu.value[id];
  showSubMenu.value = showSubMenu.value.map((_, index) =>
    index === id ? !isCurrentlyOpen : false
  );
  showOnClick.value = !isCurrentlyOpen; // Ensure the state reflects the clicked action

  // Reset child menu state to close any open child menus
  if (!isCurrentlyOpen) {
    showChildMenu.value = showChildMenu.value.map(() => false);
    showOnClickChild.value = false;
  }

  // console.log(`Submenu ${id} visibility:`, showSubMenu.value[id]);
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
  return isLinkActive("/market");
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
    if (!servicesHover.value && !showOnClickChild.value) {
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
      showChildMenu.value[2] = false;
    } else if (!showOnClickChild.value) {
      closeChildmenuWithDelay(1);
      // closeChildmenuWithDelay(2);
    }
  }
});
watch(controlHover, (isHovered) => {
  clearTimeout(closeTimeoutChild); // Clear any previous timeout
  clearTimeout(closeTimeout); // Clear any previous timeout

  if (!props.sideBarOpen) {
    // Only handle hover if sidebar is closed
    if (isHovered) {
      showChildMenu.value[2] = true;
      showChildMenu.value[1] = false;
    } else if (!showOnClickChild.value) {
      closeChildmenuWithDelay(2);
      // closeChildmenuWithDelay(1);
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
    showChildMenu.value[1] = false;
    showChildMenu.value[2] = false;
  }
);


</script>

<template>
  <div
    class="flex-col dark:bg-tamkinDarkPrimary dark:border-[#3333337a] dark:text-whiteTamkin items-start justify-start lg:flex mx-auto fixed rtl:lg:right-auto rtl:right-0 ltr:left-0 px-6 h-screen z-[140] transition-all duration-75 ease-in-out transform-gpu bg-white border-l-0 border-t-0 border-b-0 rtl:border-l ltr:border-r border-[1px] border-lightGrey"
    :class="[
      sideBarOpen ? ' w-[280px] overflow-y-auto no-scrollbar' : 'w-[75px]',
      mobileSidebar ? 'block' : 'hidden',
    ]"
    style="box-sizing: border-box !important"
  >
    <div
      class="flex dark:bg-tamkinDarkPrimary dark:border-darkborder dark:text-whiteTamkin flex-col items-start justify-start w-full transition-all duration-100 ease-in-out"
    >
      <nuxt-link
        class="self-start w-full cursor-pointer"
        :class="[sideBarOpen ? '' : 'mx-auto']"
        v-if="sideBarOpen"
        :to="localePath('/team')"
      >
        <img
          src="/assets/imgs/logo.png"
          class="min-h-[50px] w-[100px] rtl:mr-[4px] ltr:ml-[-4px]"
        />
      </nuxt-link>
      <nuxt-link
        class="mb-[10px] w-[55px] h-[55px] mt-[24px] cursor-pointer"
        :to="localePath('/team')"
        v-else
      >
        <img
          src="/assets/imgs/icons/tamkin_small.svg"
          class="w-[28px] h-[28px]"
        />
      </nuxt-link>
      <div
        class="w-[28px] h-[28px] cursor-pointer rounded-full overflow-hidden"
        v-if="!sideBarOpen"
        @click="$router.push(localePath('/team'))"
      >
        <img
          v-if="currTeam?.team_image"
          :src="`https://tamkin.app/${currTeam?.team_image}`"
        />
        <div
          v-else
          class="avatar_img rounded-full bg-[#2dada3] text-[#fff] grid place-content-center select-none w-[28px] h-[28px]"
        >
          <span> {{ getAvatarLetters(currTeam?.team_name || "") }} </span>
        </div>
      </div>
      <div class="w-[100%]">
        <Searchbar class="block md:hidden" />
      </div>
      <nuxt-link
        class="tamkin_team_card dark:bg-tamkinDarkPrimary dark:border-[1px]"
        @click="
          () => {
            if (!loadingTeamCard) {
              $router.push(localePath('/team'));
            }
          }
        "
        :class="[
          !sideBarOpen ? 'border-none bg-transparent hidden' : '',
          isLinkActive('/team') ? 'bg-tamkinLight' : '',
          loadingTeamCard
            ? 'bg-gray-50 cursor-not-allowed dark:bg-tamkinDarkPrimary dark:border-[1px] dark:border-darkborder border-[1px] border-gray-200'
            : '',
        ]"
      >
        <div class="relative flex items-center justify-center w-1/4">
          <img
            v-if="!loadingTeamCard && currTeam?.team_image"
            :src="`https://tamkin.app/${currTeam?.team_image}`"
            class="rounded-full object-cover transition-all"
            :class="[sideBarOpen ? 'h-[35px] w-[35px]' : 'h-[24px] w-[24px]']"
          />

          <!-- Skeleton Loader -->
          <div
            v-if="loadingTeamCard"
            class="h-[35px] dark:bg-p w-[35px] bg-gray-300 animate-pulse rounded-full"
          ></div>

          <!-- Placeholder Avatar -->
          <div
            v-if="!loadingTeamCard && !currTeam?.team_image"
            :class="[
              sideBarOpen
                ? 'h-[35px] w-[35px] leading-[35px]'
                : 'h-[24px] w-[24px] leading-[24px]',
            ]"
            class="avatar_img bg-[#2dada3] text-[#fff] grid place-content-center select-none rounded-full"
          >
            <span> {{ getAvatarLetters(currTeam?.team_name || "") }} </span>
          </div>
        </div>

        <div class="flex items-center rtl:space-x-reverse w-full">
          <div
            class="order-2 ltr:ml-[12px] rtl:mr-[12px] w-full"
            :class="[!sideBarOpen ? 'hidden' : 'block']"
          >
            <div
              class="h-[14px] w-3/4 dark:bg-p rounded-[5px] bg-gray-200 animate-pulse"
              v-if="loadingTeamCard"
            ></div>
            <h2 class="font-[400] text-[14px]" style="line-height: 20px" v-else>
              {{ currTeam?.team_name }}
            </h2>

            <div
              class="h-[14px] mt-[8px] dark:bg-p w-3/4 rounded-[5px] bg-gray-200 animate-pulse"
              v-if="loadingTeamCard"
            ></div>
            <h3 class="font-[400] text-[12px]" style="line-height: 20px" v-else>
              {{ teamMembers.length }} {{ $t("Team Members") }}
            </h3>
          </div>

          <div
            class="h-[14px] w-[12px] dark:bg-p rounded-[5px] bg-gray-200 animate-pulse order-3"
            v-if="loadingTeamCard"
          ></div>
          <div
            v-else
            class="order-3 rtl:rotate-180"
            :class="[!sideBarOpen ? 'hidden' : 'block']"
          >
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
      </nuxt-link>

      <hr
        class="block w-full mx-auto h-[1px] border-lightGrey dark:border-darkborder my-[28px]"
      />
      <button
        @click="$router.push(localePath('/add-site'))"
        class="btn-dashboard hover_tamkin relative w-full transition-all duration-75 ease-in-out"
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
        <div class="order-2">{{ $t("Add Site") }}</div>
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

    <div
      class="flex flex-col items-center justify-center w-full transform-gpu transition-all ease-in-out"
    >
    
      <TamkinSideBarLink
        class="dashboard-nav-link mt-[10px]"
        :to="goToLink('/embed-code')"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div>
          <svg
            width="24"
            height="23"
            class="w-[23px] h-auto dark:[filter:invert(1)_brightness(10)]"
            viewBox="0 0 24 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect
              x="0.5"
              width="23"
              height="23"
              fill="
              url(#pattern0_13550_132316)
              "
            />
            <defs>
              <pattern
                id="pattern0_13550_132316"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image0_13550_132316"
                  transform="translate(-0.0454545 -0.0454545) scale(0.0109091)"
                />
              </pattern>
              <image
                id="image0_13550_132316"
                width="100"
                height="100"
                xlink:href="data:image/png;base64,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"
              />
            </defs>
          </svg>

          <!-- <svg
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
          </svg> -->
        </div>
        <span v-if="sideBarOpen">{{ $t("Embed Code") }}</span>
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
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="w-[23px] h-full dark:[filter:invert(1)_brightness(10)]"
          >
            <g clip-path="url(#clip0_13550_129824)">
              <rect
                x="0.5"
                width="24"
                height="24"
                fill="url(#pattern0_13550_129824)"
              />
            </g>
            <defs>
              <pattern
                id="pattern0_13550_129824"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image0_13550_129824"
                  transform="scale(0.01)"
                />
              </pattern>
              <clipPath id="clip0_13550_129824">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              <image
                id="image0_13550_129824"
                width="100"
                height="100"
                xlink:href="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </div>
        <span v-if="sideBarOpen">{{ $t("My Site") }}</span>
      </TamkinSideBarLink>

      <nuxt-link
        class="relative rounded-[10px]"
        @click.stop="openMenuSub(4)"
        :class="[!sideBarOpen ? '  ' : 'w-full ']"
      >
        <div
          class="dashboard-nav-link"
          :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
          ref="signLanguageHover"
        >
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 25 25"
              fill="white"
              class="w-[23px] h-auto dark:[filter:invert(1)_brightness(10)]"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="1.5"
                y="0.5"
                width="21"
                height="24"
                fill="url(#pattern0_13550_36926)"
              />
              <defs>
                <pattern
                  id="pattern0_13550_36926"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_13550_36926"
                    transform="matrix(0.0141176 0 0 0.01 -0.235294 0)"
                  />
                </pattern>
                <image
                  id="image0_13550_36926"
                  width="100"
                  height="100"
                  xlink:href="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>

          <div
            class="flex items-center justify-start ltr:justify-center"
            :class="[!sideBarOpen ? 'hidden' : '']"
          >
            <div
              v-if="sideBarOpen"
              :class="[
                showSubMenu[4]
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                  : '',
              ]"
            >
              {{ $t("Sign language") }}
            </div>
            <div v-if="sideBarOpen" class="absolute rtl:left-1 ltr:right-1">
              <svg
                width="7"
                height="12"
                :class="[
                  showSubMenu[4] ? 'rotate-90 ' : 'rotate-0  rtl:rotate-180 ',
                ]"
                viewBox="0 0 7 12"
                class="w-full h-full pr-[4px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="grad_ni"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                    <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                  </linearGradient>
                </defs>
                <path
                  :class="[
                    showSubMenu[4]
                      ? 'fill_access'
                      : 'fill-[#585B5B] dark:fill-white',
                  ]"
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
          v-show="showSubMenu[4]"
          :class="[
            !sideBarOpen && showSubMenu[4]
              ? 'absolute top-0 rtl:right-[65px] ltr:left-[65px] bg-white p-3 py-[10px]  dark:bg-tamkinDarkPrimary !z-[140] w-[270px] drop-shadow-2xl'
              : ' w-full',
          ]"
          v-on-click-outside="() => closeSubMenuOnClickOutside(4)"
        >
          <div class="flex flex-col items-start justify-center w-full">
            <div class="flex items-center justify-between w-full">
              <div
                v-if="!sideBarOpen"
                class="bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent"
              >
                {{ $t("Sign language") }}
              </div>
              <div v-if="!sideBarOpen">
                <svg
                  width="7"
                  height="12"
                  :class="[
                    showSubMenu[4] ? 'rotate-90 p-[8px]' : 'rotate-0 p-[8px]',
                  ]"
                  viewBox="0 0 7 12"
                  class="w-full h-full pr-[8px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="grad_s"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                      <stop
                        offset="100%"
                        stop-color="#71DAD2"
                        stop-opacity="1"
                      />
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
            <div class="dark:bg-tamkinDarkPrimary w-full" @click.stop>
              <nuxt-link
                @click.stop="$router.push({ path: localePath('/market') })"
                class="dashboard-nav-link flex items-center"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-show="sideBarOpen"
                    :class="[
                      isLinkActive('/market')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  class="ltr:pl-[1px]"
                  :class="[
                    isLinkActive('/market')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                >
                  {{ $t("Market") }}
                </span>
              </nuxt-link>
              <nuxt-link
                @click.stop="
                  $router.push({ path: localePath('/sign-language/overview') })
                "
                class="dashboard-nav-link flex items-center"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
                :to="localePath('/sign-language/overview')"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-show="sideBarOpen"
                    :class="[
                      isLinkActive('/sign-language/overview')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>

                <div
                  class="ltr:pl-[1px]"
                  :class="[
                    isLinkActive('/sign-language/overview')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                >
                  {{ $t("Overview") }}
                </div>
              </nuxt-link>
              <nuxt-link
                @click.stop="
                  $router.push({ path: localePath('/sign-language/addons') })
                "
                class="dashboard-nav-link flex items-center"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
                :to="localePath('/sign-language/addons')"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-show="sideBarOpen"
                    :class="[
                      isLinkActive('/sign-language/addons')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>

                <div
                  class="ltr:pl-[1px]"
                  :class="[
                    isLinkActive('/sign-language/addons')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                >
                  {{ $t("Addons") }}
                </div>
              </nuxt-link>
              <nuxt-link
                @click.stop="
                  $router.push({
                    path: localePath('/sign-language/statistics'),
                  })
                "
                class="dashboard-nav-link flex items-center"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
                :to="localePath('/sign-language/statistics')"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-show="sideBarOpen"
                    :class="[
                      isLinkActive('/sign-language/statistics')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>

                <div
                  class="ltr:pl-[1px]"
                  :class="[
                    isLinkActive('/sign-language/statistics')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                >
                  {{ $t("Statistics") }}
                </div>
              </nuxt-link>
              <nuxt-link
                @click.stop="
                  $router.push({ path: localePath('/sign-language/customize') })
                "
                class="dashboard-nav-link flex items-center"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
                :to="localePath('/sign-language/customize')"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-show="sideBarOpen"
                    :class="[
                      isLinkActive('/sign-language/customize')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>

                <div
                  class="ltr:pl-[1px]"
                  :class="[
                    isLinkActive('/sign-language/customize')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                >
                  {{ $t("Customize") }}
                </div>
              </nuxt-link>
              <nuxt-link
                @click.stop="
                  $router.push({ path: localePath('/sign-language/settings') })
                "
                class="dashboard-nav-link flex items-center"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
                :to="localePath('/sign-language/settings')"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-show="sideBarOpen"
                    :class="[
                      isLinkActive('/sign-language/settings')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>

                <div
                  class="ltr:pl-[1px]"
                  :class="[
                    isLinkActive('/sign-language/settings')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                >
                  {{ $t("Settings") }}
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </nuxt-link>

      <nuxt-link
        class="relative rounded-[10px]"
        @click.stop="openMenuSub(3)"
        :class="[!sideBarOpen ? '  ' : 'w-full ']"
      >
        <div
          class="dashboard-nav-link"
          :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
          ref="accessMenuHover"
        >
          <div>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              class="w-[23px] h-auto dark:[filter:invert(1)_brightness(10)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_13550_132338)">
                <path
                  d="M1.46094 12.5C1.46094 13.9501 1.74655 15.3859 2.30146 16.7256C2.85637 18.0653 3.66972 19.2825 4.69506 20.3079C5.72041 21.3332 6.93767 22.1466 8.27735 22.7015C9.61702 23.2564 11.0529 23.542 12.5029 23.542C13.953 23.542 15.3888 23.2564 16.7285 22.7015C18.0682 22.1466 19.2855 21.3332 20.3108 20.3079C21.3362 19.2825 22.1495 18.0653 22.7044 16.7256C23.2593 15.3859 23.5449 13.9501 23.5449 12.5C23.5449 11.05 23.2593 9.61409 22.7044 8.27442C22.1495 6.93474 21.3362 5.71748 20.3108 4.69213C19.2855 3.66679 18.0682 2.85344 16.7285 2.29853C15.3888 1.74362 13.953 1.45801 12.5029 1.45801C11.0529 1.45801 9.61702 1.74362 8.27735 2.29853C6.93767 2.85344 5.72041 3.66679 4.69506 4.69213C3.66972 5.71748 2.85637 6.93474 2.30146 8.27442C1.74655 9.61409 1.46094 11.05 1.46094 12.5Z"
                  stroke="#585757"
                />
                <path
                  d="M10.6797 6.09686C10.6797 6.57955 10.8714 7.04247 11.2128 7.38379C11.5541 7.72511 12.017 7.91686 12.4997 7.91686C12.9824 7.91686 13.4453 7.72511 13.7866 7.38379C14.1279 7.04247 14.3197 6.57955 14.3197 6.09686C14.3197 5.61416 14.1279 5.15124 13.7866 4.80992C13.4453 4.46861 12.9824 4.27686 12.4997 4.27686C12.017 4.27686 11.5541 4.46861 11.2128 4.80992C10.8714 5.15124 10.6797 5.61416 10.6797 6.09686Z"
                  stroke="#585757"
                />
                <path
                  d="M15.0411 15.2975V12.4565C16.1823 12.3927 17.4064 12.3448 18.554 12.0997C19.1945 11.9629 19.5063 11.2755 19.2764 10.6623C19.0464 10.049 18.3616 9.7423 17.7206 9.87624C16.0356 10.2282 14.1155 10.1541 12.5001 10.1541C10.8847 10.1541 8.96456 10.2283 7.27962 9.87627C6.63854 9.74234 5.95378 10.0491 5.72382 10.6623C5.49386 11.2756 5.80567 11.963 6.44616 12.0997C7.59371 12.3448 8.81767 12.3927 9.95887 12.4565V15.2975C9.95887 15.3759 9.96553 15.4528 9.97832 15.5275L9.16713 19.3222C9.01302 20.0431 9.56265 20.7227 10.2999 20.7227C10.8468 20.7227 11.3191 20.3401 11.4329 19.8052L12.103 16.6527H12.8971L13.5672 19.8052C13.6809 20.3401 14.1533 20.7227 14.7002 20.7227C15.4374 20.7227 15.987 20.0431 15.8329 19.3222L15.0217 15.5273C15.0344 15.4526 15.0411 15.3758 15.0411 15.2975Z"
                  stroke="#585757"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_13550_132338">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div
            class="flex items-center justify-start ltr:justify-center"
            :class="[!sideBarOpen ? 'hidden' : '']"
          >
            <div
              v-if="sideBarOpen"
              :class="[
                showSubMenu[3]
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                  : '',
              ]"
            >
              {{ $t("Accessibility") }}
            </div>
            <div v-if="sideBarOpen" class="absolute rtl:left-1 ltr:right-1">
              <svg
                width="7"
                height="12"
                :class="[
                  showSubMenu[3] ? 'rotate-90 ' : 'rotate-0  rtl:rotate-180 ',
                ]"
                viewBox="0 0 7 12"
                class="w-full h-full pr-[4px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="grad_ni"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                    <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                  </linearGradient>
                </defs>
                <path
                  :class="[
                    showSubMenu[3]
                      ? 'fill_access'
                      : 'fill-[#585B5B] dark:fill-white',
                  ]"
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
          v-show="showSubMenu[3]"
          :class="[
            !sideBarOpen && showSubMenu[3]
              ? 'absolute top-0 rtl:right-[65px] ltr:left-[65px] bg-white p-3 py-[10px]  dark:bg-tamkinDarkPrimary !z-[140] w-[270px] drop-shadow-2xl'
              : ' w-full',
          ]"
          v-on-click-outside="() => closeSubMenuOnClickOutside(3)"
        >
          <div class="flex flex-col items-start justify-center w-full">
            <div class="flex items-center justify-between w-full">
              <div
                v-if="!sideBarOpen"
                class="bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent"
              >
                {{ $t("Accessibility") }}
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
                    <linearGradient
                      id="grad13"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                      <stop
                        offset="100%"
                        stop-color="#71DAD2"
                        stop-opacity="1"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#grad13)"
                    d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
                  />
                </svg>
              </div>
            </div>
            <div class="dark:bg-tamkinDarkPrimary w-full" @click.stop>
              <nuxt-link
                :to="localePath('/overview')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/overview')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/overview')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Overview") }}</span
                >
              </nuxt-link>

              <nuxt-link
                :to="localePath('/addons')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/addons')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/addons')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Addons") }}</span
                >
              </nuxt-link>
              <nuxt-link
                :to="localePath('/statistics')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/statistics')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/statistics')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Statistics") }}</span
                >
              </nuxt-link>

              <nuxt-link
                :to="localePath('/customize')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/customize')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/customize')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Customize") }}</span
                >
              </nuxt-link>

              <nuxt-link
                :to="localePath('/settings')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/settings')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/settings')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Settings") }}</span
                >
              </nuxt-link>
            </div>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link
        class="relative rounded-[10px]"
        @click.stop="openMenuSub(5)"
        :class="[!sideBarOpen ? '  ' : 'w-full ']"
      >
        <div
          class="dashboard-nav-link"
          :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
          ref="accessMenuHover"
        >
          <div>
            <svg
              width="27"
              class="w-[23px] h-auto dark:[filter:invert(1)_brightness(10)]"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7857 1H15.2143C20.063 1 22.4873 1 23.9937 2.50631C25.5 4.01262 25.5 6.43703 25.5 11.2857C25.5 16.1344 25.5 18.5587 23.9937 20.0651C22.4873 21.5714 20.063 21.5714 15.2143 21.5714H13.5C13.5 21.5714 12.6429 25 6.64286 25C6.64286 25 8.35714 23.2708 8.35714 21.5418C5.69409 21.4615 4.10568 21.1645 3.00631 20.0651C1.5 18.5587 1.5 16.1344 1.5 11.2857C1.5 6.43703 1.5 4.01262 3.00631 2.50631C4.51262 1 6.93698 1 11.7857 1Z"
                stroke="url(#paint0_linear_14360_133328)"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
              <path
                d="M8.35938 7.85693V9.57122M18.6451 7.85693V9.57122"
                stroke="url(#paint1_linear_14360_133328)"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0703 15.5703C10.0703 15.5703 11.2132 16.4275 13.4989 16.4275C15.7845 16.4275 16.9275 15.5703 16.9275 15.5703"
                stroke="url(#paint2_linear_14360_133328)"
                stroke-width="1.2"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_14360_133328"
                  x1="13.5"
                  y1="1"
                  x2="13.5"
                  y2="25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_14360_133328"
                  x1="13.5022"
                  y1="7.85693"
                  x2="13.5022"
                  y2="9.57122"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_14360_133328"
                  x1="13.4989"
                  y1="15.5703"
                  x2="13.4989"
                  y2="16.4275"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div
            class="flex items-center justify-start ltr:justify-center"
            :class="[!sideBarOpen ? 'hidden' : '']"
          >
            <div
              v-if="sideBarOpen"
              :class="[
                showSubMenu[5]
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
                  : '',
              ]"
            >
              {{ $t("Chatbot") }}
            </div>
            <div v-if="sideBarOpen" class="absolute rtl:left-1 ltr:right-1">
              <svg
                width="7"
                height="12"
                :class="[
                  showSubMenu[5] ? 'rotate-90 ' : 'rotate-0  rtl:rotate-180 ',
                ]"
                viewBox="0 0 7 12"
                class="w-full h-full pr-[4px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="grad_ni"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                    <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                  </linearGradient>
                </defs>
                <path
                  :class="[
                    showSubMenu[5]
                      ? 'fill_access'
                      : 'fill-[#585B5B] dark:fill-white',
                  ]"
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
          v-show="showSubMenu[5]"
          :class="[
            !sideBarOpen && showSubMenu[5]
              ? 'absolute top-0 rtl:right-[65px] ltr:left-[65px] bg-white p-3 py-[10px]  dark:bg-tamkinDarkPrimary !z-[140] w-[270px] drop-shadow-2xl'
              : ' w-full',
          ]"
          v-on-click-outside="() => closeSubMenuOnClickOutside(5)"
        >
          <div class="flex flex-col items-start justify-center w-full">
            <div class="flex items-center justify-between w-full">
              <div
                v-if="!sideBarOpen"
                class="bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent"
              >
                {{ $t("chat-bot") }}
              </div>
              <div v-if="!sideBarOpen">
                <svg
                  width="7"
                  height="12"
                  :class="[showSubMenu[5] ? 'rotate-90 ' : 'rotate-0 ']"
                  viewBox="0 0 7 12"
                  class="w-full h-full pr-[8px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="grad13"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                      <stop
                        offset="100%"
                        stop-color="#71DAD2"
                        stop-opacity="1"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#grad13)"
                    d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
                  />
                </svg>
              </div>
            </div>
            <div class="dark:bg-tamkinDarkPrimary w-full" @click.stop>
              <nuxt-link
                :to="localePath('/overview')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/overview')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/overview')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("General") }}</span
                >
              </nuxt-link>

              <nuxt-link
                :to="localePath('/chat-bot/customize')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/chat-bot/customize')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/chat-bot/customize')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Customize") }}</span
                >
              </nuxt-link>
              <nuxt-link
                :to="localePath('/statistics')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/statistics')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/statistics')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Chatbot") }}</span
                >
              </nuxt-link>

              <nuxt-link
                :to="localePath('/customize')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/customize')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/customize')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Articles") }}</span
                >
              </nuxt-link>

              <nuxt-link
                :to="localePath('/settings')"
                class="dashboard-nav-link w-11/12"
                :class="[sideBarOpen ? 'mx-[20px] ' : ' !mx-[11px]']"
              >
                <div>
                  <div
                    class="w-[8px] h-[2px] rounded-[10px]"
                    v-if="sideBarOpen"
                    :class="[
                      isLinkActive('/settings')
                        ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd '
                        : 'bg-darkGrey dark:bg-whiteTamkin',
                    ]"
                  ></div>
                </div>
                <span
                  :class="[
                    isLinkActive('/settings')
                      ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
                      : '',
                  ]"
                  >{{ $t("Settings") }}</span
                >
              </nuxt-link>
            </div>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link
        :to="localePath('/packages')"
        class="dashboard-nav-link"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-[23px] h-auto dark:[filter:invert(1)_brightness(10)]"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <g clip-path="url(#clip0_13596_49230)">
              <rect
                x="0.5"
                width="24"
                height="24"
                fill="url(#pattern0_13596_49230)"
              />
            </g>
            <defs>
              <pattern
                id="pattern0_13596_49230"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlink:href="#image0_13596_49230" transform="scale(0.01)" />
              </pattern>
              <clipPath id="clip0_13596_49230">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              <image
                id="image0_13596_49230"
                width="100"
                height="100"
                xlink:href="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </div>
        <span
          v-if="sideBarOpen"
          :class="[
            isLinkActive('/packages')
              ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd  text-transparent bg-clip-text'
              : '',
          ]"
          >{{ $t("Packages") }}</span
        >
      </nuxt-link>

      <div
        v-if="!sideBarOpen"
        class="cursor-pointer mt-[14px]"
        @click="$router.push({ path: localePath('/contact') })"
        :class="[!sideBarOpen ? 'closed_sidebar' : 'w-full ']"
      >
        <div class="w-[34px] h-[34px]">
          <img src="/public/assets/pngs/support_h.png" />
        </div>
      </div>
      <div
        v-if="sideBarOpen"
        :class="[
          showSubMenu.some((t) => t !== false) ||
          showChildMenu.some((t) => t !== false)
            ? 'top-[80vh]'
            : ' lg:top-[50vh] 2xl:top-[46vh] 3xl:top-[64vh] 4xl:top-[64vh] ',
        ]"
        class="mt-2 lg:mt-0 relative lg:absolute dark:bg-p overflow-hidden w-[260px] h-[135px] z-[9900] bg-cover bg-center rounded-[18px] dark:shadow-[0_0_1px_0_#3333337a] bg-gradient-to-br from-[#E0F8F8] via-[#F9E8FF] to-[#FFE9EE]"
      >
        <div class="left-0 top-0 absolute z-[-1] hidden dark:block">
          <img
            src="/public/assets/pngs/Rectangle 6165.png"
            alt="Sales Team"
            class="w-[100%] h-[100%] opacity-50"
          />
        </div>
        <div
          class="flex flex-col space-y-[5px] dark:border-p py-[10px] items-center justify-center rounded-lg"
        >
          <div>
            <img
              src="/assets/pngs/support_h.png"
              alt="Sales Team"
              class="w-[35px] h-[35px]"
            />
          </div>
          <div>
            <h2
              class="text-[13px] font-[600] dark:text-whiteTamkin text-[#0D5C56] dark:text-[#239F8E]"
            >
              {{ $t("Need Help?") }}
            </h2>
          </div>
          <div>
            <h2
              class="text-[10px] font-[400] dark:text-whiteTamkin text-[#64938f] dark:text-[#75B1A9]"
            >
              {{ $t("Contact Our Sales Team") }}
            </h2>
          </div>
          <div class="w-full mx-auto">
            <nuxt-link
              class="btn-dashboard hover_tamkin !h-[14px] !p-[13px] w-2/4 !text-[12px] mx-auto"
              :to="localePath('/contact')"
            >
              {{ $t("Contact Sales") }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
