<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const localePath = useLocalePath();
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
//import { UserAvatar } from "@/components/UserAvatar";
const { getAvatarLetters } = useGetAvatarLetters();

const profileStore = useProfileStore();

import { useUserStore } from "@/stores/auth"; // Import the Pinia store
import { useRouter } from "#vue-router";
const router = useRouter();
const isMenuOpen = ref(false);
const loadingmenu = ref(true);
/*
const fullName = computed(() => {
  if(!profileStore.member?.first_name && !profileStore.member?.last_name) {
    return '';
  }
  return `${profileStore.member.first_name} ${profileStore.member.last_name}`
})
*/
const fullName = profileStore.getFullName;

const route = useRoute();
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

const openLangSwitchMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};

const isOwner = () => {
  const userStore = useUserStore();
  const user = userStore.user;
  if (user) {
    return user?.role_profile_name
      ?.toString()
      .toLowerCase()
      .includes("owner of agency");
  }
  return false;
};
const invocieStore = useInvoicesStore();
const billingStore = useBillingStore();
const withdrawStore = useWithdrawStore();
const userImg = computed(() => {
  const userStore = useUserStore();
  const user = userStore.user;
  if (user) {
    if (user.user_image) {
      return `https://tamkin.app/${user.user_image}`;
    } else if (user.photoURL) {
      return user.photoURL;
    }
  }
  return null;
});

const userName = () => {
  const userStore = useUserStore();
  const user = userStore.user;
  if (user) {
    return userStore.user?.full_name || userStore.user?.displayName;
  }
  return "";
};

const logout = () => {
  const userStore = useUserStore();
  const profileStore = useProfileStore();
  const invoiceStore = useInvoicesStore();
  const billingStore = useBillingStore();
  const withdrawStore = useWithdrawStore();
  // Clear authentication state and reset stores

  billingStore.cards = [];
  withdrawStore.$reset();
  userStore.logout("any");
  localStorage.removeItem("user");
  localStorage.removeItem("registerd_email");
  localStorage.removeItem("registerd_user");
  profileStore.$reset();
  invoiceStore.$reset();
  billingStore.$reset();

  router.push({ path: localePath("/auth/login"), query: { logout: "true" } });
  // Clear localStorage
};

const helpWindow = () => {
  if (process.client) {
    window.$chatwoot.toggle();
  }
};

onMounted(async () => {
  if (!isLinkActive("/profile")) {
    await profileStore.fetchMember(true);

    useCookie("permissions").value = JSON.stringify(
      profileStore.member.permission
    );
  }
  loadingmenu.value = false;
});
</script>

<template>
  <div
    style="border-radius: 8px"
    class="dark:bg-tamkinDarkPrimary border-[1px] dark:border-darkborder dark:text-whiteTamkin h-auto w-[220px] rtl:!ml-[40px] ltr:!mr-[40px] flex items-center justify-center relative"
    @click.stop.prevent="openLangSwitchMenu"
    v-on-click-outside="closeMenu"
  >
    <div
      class="cursor-pointer dark:bg-tamkinDarkPrimary dark:border-darkborder relative flex items-center justify-between space-x-[14px] w-full bg-[#EFF1F6] rounded-[10px] h-[50px] p-[10px]"
      v-if="loadingmenu"
    >
      <div
        style="border-radius: 8px"
        class="bg-[#EFF1F6] dark:text-whiteTamkin dark:bg-tamkinDarkPrimary dark:border-darkborder rounded-[10px] h-[50px] w-full p-[6px] animate-pulse"
      >
        <div class="flex items-center justify-start w-full space-x-[14px]">
          <div class="w-2/4">
            <div
              class="ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px] bg-gray-300 rounded-full"
            ></div>
          </div>
          <div class="flex flex-col items-start justify-center w-full !mx-0">
            <div class="h-[10px] bg-gray-300 rounded-full w-24"></div>
            <div class="h-[12px] bg-gray-300 rounded-full mt-1 w-16"></div>
          </div>
          <div class="w-[16px] h-[16px] bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
    <div
      v-else
      style="border-radius: 8px"
      class="cursor-pointer dark:bg-tamkinDarkPrimary dark:border-darkborder relative flex items-center justify-between space-x-[14px] w-full bg-[#EFF1F6] rounded-[10px] h-[50px] p-[10px]"
    >
      <div class="flex items-center justify-start w-full space-x-[14px]">
        <div class="w-2/4">
          <UserAvatar :member="profileStore.member" />
        </div>
        <div class="flex flex-col items-start justify-center w-full !mx-0">
          <h2
            class="font-[400] ipad-max:text-[10px] truncate w-24 text-[12px] dark:text-white whitespace-nowrap leading-[14.4px]"
          >
            {{
              profileStore.member.first_name +
              " " +
              profileStore.member.last_name
            }}
          </h2>
          <p
            class="font-[400] text-[10px] dark:text-white whitespace-nowrap text-darkGrey leading-[14.4px]"
          >
            {{ $t(profileStore.getRole()) }}
          </p>
        </div>
      </div>
      <div>
        <svg
          :class="[isMenuOpen ? 'rotate-90' : 'rtl:rotate-180 ltr:rotate-0']"
          width="6"
          height="9"
          viewBox="0 0 6 9"
          class="dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="dark:fill-white"
            d="M6.00075 4.50016L1.75775 8.74316L0.34375 7.32816L3.17275 4.50016L0.34375 1.67216L1.75775 0.257164L6.00075 4.50016Z"
            fill="#23262F"
          />
        </svg>
      </div>
    </div>

    <div
      v-show="isMenuOpen"
      style="box-shadow: 1px 1px 7.6px 0px #00000040"
      class="p-[10px] w-full absolute dark:bg-tamkinDarkPrimary border-[1px] dark:border-darkborder dark:text-whiteTamkin top-[60px] right-[-0.5px] bg-white rounded-[10px] h-auto w-full rounded-b-[10px] flex flex-col items-start justify-start"
    >
      <nuxt-link
        :to="localePath('/profile')"
        class="cursor-pointer dark:border-darkborder dark:hover:text-darkGrey dark:text-whiteTamkin p-[10px] flex items-center justify-start w-full space-x-[10px] rtl:space-x-reverse dark:hover:bg-darkGrey hover:bg-tamkinLight rounded-[10px]"
      >
        <div>
          <svg
            width="12"
            height="14"
            class="dark:fill-whiteTamkin"
            viewBox="0 0 12 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 13.4999V12.7777C0.5 10.3844 2.34682 8.44434 4.625 8.44434H7.375C9.65317 8.44434 11.5 10.3844 11.5 12.7777V13.4999"
              stroke="#585B5B"
              stroke-linecap="round"
            />
            <path
              d="M6 6.27778C4.48122 6.27778 3.25 4.98438 3.25 3.38889C3.25 1.7934 4.48122 0.5 6 0.5C7.51876 0.5 8.75 1.7934 8.75 3.38889C8.75 4.98438 7.51876 6.27778 6 6.27778Z"
              stroke="#585B5B"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div
          class="text-[12px] leading-[18px] font-[500] text-darkGrey dark:text-whiteTamkin"
        >
          {{ $t("My Account") }}
        </div>
      </nuxt-link>

      <nuxt-link
        :to="localePath('/subscriptions')"
        class="cursor-pointer dark:border-darkborder dark:hover:text-darkGrey dark:text-whiteTamkin p-[10px] flex items-center justify-start w-full space-x-[10px] rtl:space-x-reverse dark:hover:bg-darkGrey hover:bg-tamkinLight rounded-[10px]"
      >
        <div>
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            class="dark:fill-whiteTamkin"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.63175 5.42497C8.70288 5.35007 8.74353 5.24846 8.74495 5.142C8.74636 5.03554 8.70843 4.93275 8.63931 4.85574C8.57019 4.77873 8.47541 4.73366 8.37537 4.73022C8.27532 4.72679 8.17801 4.76526 8.10436 4.83737L5.01306 7.97592L3.90206 6.79389C3.83042 6.71769 3.73326 6.67488 3.63194 6.67488C3.53063 6.67488 3.43347 6.71769 3.36183 6.79389C3.2902 6.87008 3.24995 6.97343 3.24995 7.08119C3.24995 7.18895 3.2902 7.2923 3.36183 7.36849L4.73683 8.83101C4.8835 8.98701 5.12061 8.99026 5.27064 8.83751L8.63175 5.42497ZM6.26431 0.61298C6.1932 0.540478 6.0985 0.5 6 0.5C5.9015 0.5 5.8068 0.540478 5.73569 0.61298C4.89267 1.47196 3.69306 1.93802 2.66883 2.18599C2.16161 2.3082 1.70969 2.3745 1.38489 2.41025C1.21682 2.42859 1.04828 2.44181 0.8795 2.4499H0.872778C0.773077 2.45244 0.678267 2.49637 0.608609 2.57228C0.538951 2.64819 0.499971 2.75007 0.5 2.85615V5.94368C0.5 7.51572 0.879805 9.08256 1.75217 10.4206C2.62636 11.7616 3.97967 12.848 5.88603 13.4815C5.96028 13.5062 6.03972 13.5062 6.11397 13.4815C9.95389 12.2052 11.5 9.11148 11.5 6.02493V2.85615C11.5 2.75007 11.461 2.64819 11.3914 2.57228C11.3217 2.49637 11.2269 2.45244 11.1272 2.4499H11.1205L11.0961 2.44892L10.9958 2.4434C10.8687 2.43526 10.7418 2.42421 10.6151 2.41025C10.1833 2.36251 9.75461 2.28763 9.33117 2.18599C8.30664 1.93802 7.10703 1.47196 6.26431 0.61298ZM1.26389 5.94368V3.23803C1.32419 3.23283 1.39049 3.22633 1.46281 3.21853C1.92525 3.16771 2.38441 3.0874 2.83781 2.97803C3.82169 2.74045 5.04117 2.29487 6 1.44986C6.95853 2.29487 8.17861 2.74012 9.16189 2.97803C9.68041 3.10293 10.2064 3.1898 10.7361 3.23803V6.02493C10.7361 8.75821 9.40878 11.4847 6 12.6673C4.30111 12.0778 3.13083 11.1096 2.37978 9.95747C1.60978 8.77673 1.26389 7.37792 1.26389 5.94368Z"
              fill="#585B5B"
              class="dark:fill-whiteTamkin"
            />
          </svg>
        </div>
        <div
          class="text-[12px] leading-[18px] font-[500] text-darkGrey dark:text-whiteTamkin"
        >
          {{ $t("Subscriptions") }}
        </div>
      </nuxt-link>

      <nuxt-link
        :to="localePath('/billing')"
        class="cursor-pointer dark:hover:bg-darkGrey p-[10px] flex items-center justify-start w-full space-x-[10px] rtl:space-x-reverse hover:bg-tamkinLight rounded-[10px]"
      >
        <div>
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            class="dark:fill-whiteTamkin"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.01887 7.15854C0.936301 7.15854 0.857115 7.10843 0.798731 7.01923C0.740347 6.93004 0.707547 6.80907 0.707547 6.68293C0.707547 6.55679 0.740347 6.43581 0.798731 6.34662C0.857115 6.25743 0.936301 6.20732 1.01887 6.20732H2.4717C2.60931 6.20732 2.74129 6.1238 2.83859 5.97515C2.9359 5.82649 2.99057 5.62487 2.99057 5.41463C2.99057 5.2044 2.9359 5.00278 2.83859 4.85412C2.74129 4.70547 2.60931 4.62195 2.4717 4.62195H1.64151C1.33876 4.62195 1.04841 4.43822 0.83434 4.11117C0.620266 3.78413 0.5 3.34056 0.5 2.87805C0.5 2.41554 0.620266 1.97197 0.83434 1.64492C1.04841 1.31788 1.33876 1.13415 1.64151 1.13415H1.74528V0.97561C1.74528 0.84947 1.77808 0.728497 1.83647 0.639303C1.89485 0.550109 1.97404 0.5 2.0566 0.5C2.13917 0.5 2.21836 0.550109 2.27674 0.639303C2.33512 0.728497 2.36792 0.84947 2.36792 0.97561V1.13415H2.88679C2.96936 1.13415 3.04855 1.18426 3.10693 1.27345C3.16531 1.36264 3.19811 1.48362 3.19811 1.60976C3.19811 1.7359 3.16531 1.85687 3.10693 1.94606C3.04855 2.03526 2.96936 2.08537 2.88679 2.08537H1.64151C1.5039 2.08537 1.37192 2.16888 1.27461 2.31754C1.17731 2.46619 1.12264 2.66782 1.12264 2.87805C1.12264 3.08828 1.17731 3.2899 1.27461 3.43856C1.37192 3.58722 1.5039 3.67073 1.64151 3.67073H2.4717C2.77445 3.67073 3.06479 3.85446 3.27887 4.18151C3.49294 4.50855 3.61321 4.95212 3.61321 5.41463C3.61321 5.87715 3.49294 6.32071 3.27887 6.64776C3.06479 6.9748 2.77445 7.15854 2.4717 7.15854H2.36792V7.31707C2.36792 7.44321 2.33512 7.56419 2.27674 7.65338C2.21836 7.74257 2.13917 7.79268 2.0566 7.79268C1.97404 7.79268 1.89485 7.74257 1.83647 7.65338C1.77808 7.56419 1.74528 7.44321 1.74528 7.31707V7.15854H1.01887ZM11.5 1.60976V12.3902C11.5 12.6846 11.4235 12.9668 11.2872 13.175C11.151 13.3831 10.9662 13.5 10.7736 13.5H1.64151C1.44885 13.5 1.26409 13.3831 1.12786 13.175C0.991627 12.9668 0.915094 12.6846 0.915094 12.3902V9.21951C0.915094 9.09337 0.947894 8.9724 1.00628 8.8832C1.06466 8.79401 1.14385 8.7439 1.22642 8.7439C1.30898 8.7439 1.38817 8.79401 1.44655 8.8832C1.50494 8.9724 1.53774 9.09337 1.53774 9.21951V12.3902C1.53774 12.4323 1.54867 12.4726 1.56813 12.5023C1.58759 12.5321 1.61399 12.5488 1.64151 12.5488H7.9717V9.69512H3.71698C3.63441 9.69512 3.55523 9.64501 3.49684 9.55582C3.43846 9.46663 3.40566 9.34565 3.40566 9.21951C3.40566 9.09337 3.43846 8.9724 3.49684 8.8832C3.55523 8.79401 3.63441 8.7439 3.71698 8.7439H7.9717V5.89024H4.96226C4.8797 5.89024 4.80051 5.84013 4.74213 5.75094C4.68374 5.66175 4.65094 5.54077 4.65094 5.41463C4.65094 5.28849 4.68374 5.16752 4.74213 5.07833C4.80051 4.98913 4.8797 4.93902 4.96226 4.93902H10.8774V2.08537H4.54717C4.4646 2.08537 4.38542 2.03526 4.32703 1.94606C4.26865 1.85687 4.23585 1.7359 4.23585 1.60976C4.23585 1.48362 4.26865 1.36264 4.32703 1.27345C4.38542 1.18426 4.4646 1.13415 4.54717 1.13415H11.1887C11.2712 1.13415 11.3504 1.18426 11.4088 1.27345C11.4672 1.36264 11.5 1.48362 11.5 1.60976ZM8.59434 8.7439H10.8774V5.89024H8.59434V8.7439ZM10.8774 12.3902V9.69512H8.59434V12.5488H10.7736C10.8011 12.5488 10.8275 12.5321 10.847 12.5023C10.8664 12.4726 10.8774 12.4323 10.8774 12.3902Z"
              fill="#585B5B"
              class="dark:fill-whiteTamkin"
            />
          </svg>
        </div>
        <div
          class="text-[12px] leading-[18px] font-[500] text-darkGrey dark:text-whiteTamkin"
        >
          {{ $t("Payments & Invoices") }}
        </div>
      </nuxt-link>
      <nuxt-link
        :to="localePath('/orders')"
        class="cursor-pointer dark:hover:bg-darkGrey p-[10px] flex items-center justify-start w-full space-x-[10px] rtl:space-x-reverse hover:bg-tamkinLight rounded-[10px]"
      >
        <div>
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            class="dark:fill-whiteTamkin"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.90625 0.90625C0.798506 0.90625 0.695175 0.949051 0.618988 1.02524C0.542801 1.10142 0.5 1.20476 0.5 1.3125C0.5 1.42024 0.542801 1.52358 0.618988 1.59976C0.695175 1.67595 0.798506 1.71875 0.90625 1.71875H1.80813L2.13394 3.02444L3.35106 9.51225C3.36849 9.60534 3.4179 9.68942 3.49074 9.74995C3.56358 9.81048 3.65529 9.84366 3.75 9.84375H4.5625C4.13152 9.84375 3.7182 10.015 3.41345 10.3197C3.1087 10.6244 2.9375 11.0378 2.9375 11.4688C2.9375 11.8997 3.1087 12.3131 3.41345 12.6178C3.7182 12.9225 4.13152 13.0938 4.5625 13.0938C4.99348 13.0938 5.4068 12.9225 5.71155 12.6178C6.0163 12.3131 6.1875 11.8997 6.1875 11.4688C6.1875 11.0378 6.0163 10.6244 5.71155 10.3197C5.4068 10.015 4.99348 9.84375 4.5625 9.84375H10.25C9.81902 9.84375 9.4057 10.015 9.10095 10.3197C8.79621 10.6244 8.625 11.0378 8.625 11.4688C8.625 11.8997 8.79621 12.3131 9.10095 12.6178C9.4057 12.9225 9.81902 13.0938 10.25 13.0938C10.681 13.0938 11.0943 12.9225 11.399 12.6178C11.7038 12.3131 11.875 11.8997 11.875 11.4688C11.875 11.0378 11.7038 10.6244 11.399 10.3197C11.0943 10.015 10.681 9.84375 10.25 9.84375H11.0625C11.1572 9.84366 11.2489 9.81048 11.3218 9.74995C11.3946 9.68942 11.444 9.60534 11.4614 9.51225L12.6802 3.01225C12.6912 2.95362 12.6891 2.89329 12.6741 2.83555C12.6592 2.7778 12.6316 2.72407 12.5936 2.67815C12.5555 2.63224 12.5078 2.59527 12.4538 2.56989C12.3998 2.5445 12.3409 2.53131 12.2812 2.53125H2.84812L2.51906 1.21419C2.49713 1.12626 2.44643 1.04819 2.37503 0.992395C2.30363 0.936597 2.21562 0.906275 2.125 0.90625H0.90625ZM4.08719 9.03125L3.02038 3.34375H11.7921L10.7253 9.03125H4.08719ZM5.375 11.4688C5.375 11.6842 5.2894 11.8909 5.13702 12.0433C4.98465 12.1956 4.77799 12.2812 4.5625 12.2812C4.34701 12.2812 4.14035 12.1956 3.98798 12.0433C3.8356 11.8909 3.75 11.6842 3.75 11.4688C3.75 11.2533 3.8356 11.0466 3.98798 10.8942C4.14035 10.7419 4.34701 10.6562 4.5625 10.6562C4.77799 10.6562 4.98465 10.7419 5.13702 10.8942C5.2894 11.0466 5.375 11.2533 5.375 11.4688ZM11.0625 11.4688C11.0625 11.6842 10.9769 11.8909 10.8245 12.0433C10.6722 12.1956 10.4655 12.2812 10.25 12.2812C10.0345 12.2812 9.82785 12.1956 9.67548 12.0433C9.5231 11.8909 9.4375 11.6842 9.4375 11.4688C9.4375 11.2533 9.5231 11.0466 9.67548 10.8942C9.82785 10.7419 10.0345 10.6562 10.25 10.6562C10.4655 10.6562 10.6722 10.7419 10.8245 10.8942C10.9769 11.0466 11.0625 11.2533 11.0625 11.4688Z"
              fill="#585B5B"
              class="dark:fill-whiteTamkin"
            />
          </svg>
        </div>
        <div
          class="text-[12px] leading-[18px] font-[500] text-darkGrey dark:text-whiteTamkin"
        >
          {{ $t("Orders") }}
        </div>
      </nuxt-link>
      <nuxt-link
        :to="localePath('/referral')"
        class="cursor-pointer dark:hover:bg-darkGrey p-[10px] flex items-center justify-start w-full space-x-[10px] rtl:space-x-reverse hover:bg-tamkinLight rounded-[10px]"
      >
        <div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            class="dark:fill-whiteTamkin"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.02778 0.5C2.74046 0.5 2.46491 0.614137 2.26175 0.817301C2.05858 1.02047 1.94444 1.29602 1.94444 1.58333V1.94444H0.5V8.80556H8.44444V1.94444H7V1.58333C7 1.29602 6.88586 1.02047 6.6827 0.817301C6.47953 0.614137 6.20398 0.5 5.91667 0.5H3.02778ZM5.91667 5.55556C6.20398 5.55556 6.47953 5.44142 6.6827 5.23825C6.88586 5.03509 7 4.75954 7 4.47222V4.11111H7.72222V8.08333H5.91667V5.91667H3.02778V8.08333H1.22222V4.11111H1.94444V4.47222C1.94444 4.75954 2.05858 5.03509 2.26175 5.23825C2.46491 5.44142 2.74046 5.55556 3.02778 5.55556H5.91667ZM2.66667 1.58333C2.66667 1.48756 2.70471 1.39571 2.77243 1.32799C2.84016 1.26027 2.93201 1.22222 3.02778 1.22222H5.91667C6.01244 1.22222 6.10429 1.26027 6.17201 1.32799C6.23973 1.39571 6.27778 1.48756 6.27778 1.58333V4.47222C6.27778 4.56799 6.23973 4.65984 6.17201 4.72757C6.10429 4.79529 6.01244 4.83333 5.91667 4.83333H3.02778C2.93201 4.83333 2.84016 4.79529 2.77243 4.72757C2.70471 4.65984 2.66667 4.56799 2.66667 4.47222V1.58333ZM1.22222 2.66667H1.94444V3.38889H1.22222V2.66667ZM7.72222 3.38889H7V2.66667H7.72222V3.38889ZM5.19444 6.63889V8.08333H3.75V6.63889H5.19444ZM9.16667 8.44444C9.16667 8.06135 9.31885 7.69395 9.58974 7.42307C9.86062 7.15218 10.228 7 10.6111 7C10.9942 7 11.3616 7.15218 11.6325 7.42307C11.9034 7.69395 12.0556 8.06135 12.0556 8.44444C12.0556 8.82753 11.9034 9.19493 11.6325 9.46582C11.3616 9.73671 10.9942 9.88889 10.6111 9.88889C10.228 9.88889 9.86062 9.73671 9.58974 9.46582C9.31885 9.19493 9.16667 8.82753 9.16667 8.44444ZM10.6111 7.72222C10.4196 7.72222 10.2359 7.79831 10.1004 7.93376C9.96498 8.0692 9.88889 8.2529 9.88889 8.44444C9.88889 8.63599 9.96498 8.81969 10.1004 8.95513C10.2359 9.09058 10.4196 9.16667 10.6111 9.16667C10.8027 9.16667 10.9864 9.09058 11.1218 8.95513C11.2572 8.81969 11.3333 8.63599 11.3333 8.44444C11.3333 8.2529 11.2572 8.0692 11.1218 7.93376C10.9864 7.79831 10.8027 7.72222 10.6111 7.72222ZM10.6111 10.25C9.64694 10.25 7.72222 10.7779 7.72222 11.8259V12.7778H4.47222C4.20897 12.7778 4.03817 12.6828 3.92947 12.5604C3.815 12.4315 3.75 12.2495 3.75 12.0556V10.7606L4.93914 11.9497L5.44975 11.4391L3.38889 9.37828L1.32803 11.4391L1.83864 11.9497L3.02778 10.7606V12.0556C3.02778 12.4033 3.14333 12.763 3.38997 13.0403C3.64239 13.3241 4.01325 13.5 4.47222 13.5H13.5V11.8259C13.5 10.7779 11.5753 10.25 10.6111 10.25ZM8.55061 11.6464C8.44842 11.7493 8.44444 11.8057 8.44444 11.8259V12.7778H12.7778V11.8259C12.7778 11.8057 12.7742 11.7493 12.6716 11.6464C12.5633 11.537 12.3809 11.4175 12.1278 11.307C11.6179 11.0834 10.9939 10.9722 10.6111 10.9722C10.2283 10.9722 9.60433 11.0842 9.09444 11.3066C8.8413 11.4171 8.65931 11.537 8.55061 11.6464Z"
              fill="#585B5B"
              class="dark:fill-whiteTamkin"
            />
          </svg>
        </div>
        <div
          class="text-[12px] leading-[18px] font-[500] text-darkGrey dark:text-whiteTamkin"
        >
          {{ $t("Referral") }}
        </div>
      </nuxt-link>
      <hr class="bg-[#EAEAEA] w-full !p-0" />
      <div
        @click="helpWindow"
        class="cursor-pointer dark:hover:bg-darkGrey p-[10px] flex items-center justify-start w-full space-x-[10px] rtl:space-x-reverse hover:bg-tamkinLight rounded-[10px]"
      >
        <div>
          <svg
            width="13"
            height="14"
            class="dark:fill-whiteTamkin"
            fill="none"
            viewBox="0 0 13 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 13.5C9.53757 13.5 12 10.5899 12 7C12 3.41015 9.53757 0.5 6.5 0.5C3.46243 0.5 1 3.41015 1 7C1 10.5899 3.46243 13.5 6.5 13.5Z"
              stroke="#585B5B"
            />
            <path
              d="M6.50078 9.60039C7.71581 9.60039 8.70078 8.43633 8.70078 7.00039C8.70078 5.56445 7.71581 4.40039 6.50078 4.40039C5.28575 4.40039 4.30078 5.56445 4.30078 7.00039C4.30078 8.43633 5.28575 9.60039 6.50078 9.60039Z"
              stroke="#585B5B"
            />
            <path
              d="M8.14844 5.0502L10.3484 2.4502M2.64844 11.5502L4.84844 8.9502M4.84844 5.0502L2.64844 2.4502M10.3484 11.5502L8.14844 8.9502"
              stroke="#585B5B"
            />
          </svg>
        </div>
        <div
          class="text-[12px] leading-[18px] font-[500] text-darkGrey dark:text-whiteTamkin"
        >
          {{ $t("Help") }}
        </div>
      </div>

      <div
        @click="logout"
        class="cursor-pointer dark:hover:bg-darkGrey p-[10px] flex items-center justify-start w-full space-x-[10px] rtl:space-x-reverse hover:bg-tamkinLight rounded-[10px]"
      >
        <div>
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            class="dark:fill-whiteTamkin"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.22222 3.75V2.125C7.22222 1.69402 7.09345 1.2807 6.86424 0.975951C6.63503 0.671205 6.32415 0.5 6 0.5H1.72222C1.39807 0.5 1.08719 0.671205 0.857981 0.975951C0.628769 1.2807 0.5 1.69402 0.5 2.125V11.875C0.5 12.306 0.628769 12.7193 0.857981 13.024C1.08719 13.3288 1.39807 13.5 1.72222 13.5H6C6.32415 13.5 6.63503 13.3288 6.86424 13.024C7.09345 12.7193 7.22222 12.306 7.22222 11.875V10.25"
              stroke="#585B5B"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="dark:stroke-whiteTamkin"
            />
            <path
              d="M4.16797 7H11.5013M11.5013 7L9.66797 4.5625M11.5013 7L9.66797 9.4375"
              stroke="#585B5B"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="dark:stroke-whiteTamkin"
            />
          </svg>
        </div>
        <div
          class="text-[12px] leading-[18px] font-[500] text-darkGrey dark:text-whiteTamkin"
        >
          {{ $t("Logout") }}
        </div>
      </div>

      <div class="my-[13px] flex items-center justify-center w-full">
        <div class="text-[10px] leading-[12px] font-[500] text-black underline">
          <a
            href="https://tamkin.app/privacy-policy?_lang=en"
            target="_blank"
            class="text-tamkin underline"
            @click.stop
            >{{ $t("Privacy Policy") }} </a
          >
        </div>
        <div class="text-[10px] leading-[12px] font-[500] text-black">•</div>
        <div class="text-[10px] leading-[12px] font-[500] text-black underline">
          <a
            href="https://tamkin.app/terms?_lang=en"
            target="_blank"
            class="text-tamkin underline"
            @click.stop
            > {{ $t("Terms of Service") }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
