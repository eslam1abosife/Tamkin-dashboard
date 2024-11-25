<script setup>
import { useMarketStore } from "@/stores/market";
import { usePlayerStore } from "@/stores/player";
import { useModalManager } from "@/composables/useModalManager";
import {
  useGetCategoriesWithSkinItems,
  useCart,
  useEditCustomerCharacter,
} from "@/composables/useMarket";
import { useGetAppInvites, useUpdateDefaultApp } from "@/composables/useTeam";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

const { getAvatarLetters } = useGetAvatarLetters();
const { getInviteApps, defaultApp, apps, loading: getSitesLoading } = useGetAppInvites();

const getApps = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  await getInviteApps({ agency: user.agency });
};
const { locale } = useI18n();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
  requiredPermission: "sign-language-market",
  // keepalive: true,
});
const router = useRouter();
// Function to check query parameters
const checkPaymentStatus = async () => {
  if (route.query && route.query.paid && route.query.locale) {
    if (route.query.locale === "ar") {
      await router.push(`/ar/market?paid=${route.query.paid}&locale=ar`);

      await nextTick();
      openModal("successPayment_market");
    } else {
      openModal("successPayment_market");
    }
  }
};


const localePath = useLocalePath();
const route = useRoute();
const loadingSaveChanges = ref(false);
const loadingSaveToAllChanges = ref(false);
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
const expandedHeader = ref(false);
const expandedHeaderStep = ref(0); // Step counter
const loadingCats = ref(true);
const toggleExpandHeader = () => {
  expandedHeaderStep.value = (expandedHeaderStep.value + 1) % 3;
  expandedHeader.value = expandedHeaderStep.value !== 2;
};

const { GetCustomCharacterCost } = useEditCustomerCharacter();
const { getCartItems } = useCart();
const {
  getFullDataFormated,
  categoriesWithSkinItems,
  characters,
  loading: getInstallationLoading,
} = useGetCategoriesWithSkinItems();
const playerStore = usePlayerStore();
const stripeKey = ref(
  "pk_test_51PsNOm2M5zlGZwf5AZsxAxBBW65wE8IWHIHQMXGYfV3XbXAgGv1Ca3HMooFq2O9zcEfpQsk9baxN1ki6vnIca0ag00QCvJdwBM"
);
// const { data, status, error, refresh, clear } = await useFetch(
//   'fulldataformattedmarket',
//   () =>

// )
watch(locale, (newVal, oldVal) => {
  loadingCats.value = true;
});
const scriptSources = [
  "https://cdn.tamkin.app/app.js",
  
  "https://cdn.tamkin.app/runtime.js",
];

const injectedScripts = ref([]);
async function addScripts(sources) {
  for (const src of sources) {
    try {
      const script = document.createElement("script");
      script.src = `${src}?t=${new Date().getTime()}`; // Cache busting
      script.async = false; // Ensure sequential loading
      await new Promise((resolve, reject) => {
        script.onload = () => {
          injectedScripts.value.push(script); // Store reference to the injected script
          resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
      console.log(`Loaded script: ${src}`);
    } catch (error) {
      console.error(error);
    }
  }
}

function removeScripts() {
  injectedScripts.value.forEach((script) => {
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
  });
  injectedScripts.length = 0;
}
onMounted(async ()=>{
  await checkPaymentStatus();
  await getApps();
})
onMounted(async () => {

  loadingCats.value = true;

 

  await getFullDataFormated();
  GetCustomCharacterCost();
  getCartItems();
  await addScripts(scriptSources)
  // await window.mountAll()
  playerStore.characters = characters.value;
  let activeChar = playerStore.backendActiveChar;
  playerStore.changeCharacter(activeChar, false);
  if (
    marketStore.categoriesWithSkinItems &&
    marketStore.categoriesWithSkinItems.length > 0
  ) {
    const skins = marketStore.categoriesWithSkinItems
      .map((item) => item.skin_items_list)
      .flat();
    const backgrounds = skins.filter(
      (item) => item.category === "Background" && item.is_weared === 1
    );
    // console.log(backgrounds);
    if (backgrounds.length > 0 && backgrounds[0].background_color === null) {
      playerStore.currentBackground.isImage = true;
      playerStore.currentBackground.colorOrUrl =
        "https://tamkin.app" + backgrounds[0].background_image;
    } else if (backgrounds.length > 0 && backgrounds[0].background_image === null) {
      playerStore.currentBackground.isImage = false;
      playerStore.currentBackground.colorOrUrl = backgrounds[0].background_color;
    }
}
loadingCats.value = false;

});

onBeforeUnmount(()=>{
  removeScripts()
})
const categoriesWithSkinItemsFiltered = computed(() => {
  if (!playerStore.activeCharacter?.allowed_skins_list && loadingCats.value) return [];
  else if (!loadingCats.value ) {
    return marketStore.categoriesWithSkinItems.map((category) => {
      return {
        ...category,
        skin_items_list: category.skin_items_list.filter(function (item) {
          return playerStore.activeCharacter.allowed_skins_list
            .map((allowed) => allowed.skin_item)
            .includes(item.name);
        }),
      };
    });
  }
});
const shouldShowFooter = computed(() => {
  const isMarketChanges = isLinkActive("/market") && marketStore.showSaveFooter;

  return isMarketChanges;
});
const currentCategoryWithSkinItems = computed(() => {
  return categoriesWithSkinItemsFiltered.value
    ? categoriesWithSkinItemsFiltered.value.find(
        (category) => category.name == marketStore.currentTab
      )
    : [];
});
const handleSave = (AppName) => {
  if (isLinkActive(localePath("/market"))) {
    playerStore.saveCharacterOptions(AppName);
  }
};
const cancelAc = () => {
  const isMarketChanges = isLinkActive("/market") && marketStore.showSaveFooter;

  if (isMarketChanges) {
    marketStore.resetAll();
    playerStore.resetActiveCharacterAndWearSavedClothes();
  }
};
const marketStore = useMarketStore();

const cartItemCount = computed(() => marketStore.cartItems.length);
const showBadge = ref(false);
const { resetModal } = storeToRefs(marketStore);

function beforeEnter(el) {
  el.style.transform = "scale(0)";
  el.style.opacity = "0";
}

function enter(el, done) {
  el.offsetWidth; // Force reflow
  el.style.transition = "all 0.5s ease";
  el.style.transform = "scale(1)";
  el.style.opacity = "1";

  // Add a transitionend listener to call done()
  el.addEventListener("transitionend", function handler() {
    el.removeEventListener("transitionend", handler);
    done();
  });
}

function leave(el, done) {
  el.style.transition = "all 0.5s ease";
  el.style.transform = "scale(0)";
  el.style.opacity = "0";

  // Add a transitionend listener to call done()
  el.addEventListener("transitionend", function handler() {
    el.removeEventListener("transitionend", handler);
    done();
  });
}

// Cart Animation Functions
function beforeEnterCart(el) {
  const translateX = locale.value === "ar" ? "-100%" : "100%";
  el.style.transform = `translateX(${translateX})`;
  el.style.opacity = "0";
}

function enterCart(el, done) {
  // Ensure styles are applied in the next frame
  el.offsetWidth; // Force reflow

  // Apply transition styles
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  el.style.transform = "translateX(0)";
  el.style.opacity = "1";

  // Add a transitionend listener to call done()
  el.addEventListener("transitionend", function handler() {
    el.removeEventListener("transitionend", handler);
    done();
  });
}

function leaveCart(el, done) {
  const translateX = locale.value === "ar" ? "-100%" : "100%";

  // Apply transition styles
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  el.style.transform = `translateX(${translateX})`;
  el.style.opacity = "0";

  // Add a transitionend listener to call done()
  el.addEventListener("transitionend", function handler() {
    el.removeEventListener("transitionend", handler);
    done();
  });
}

///

function beforeEnterNotification(el) {
  el.style.transform = "translateX(100%)";
  el.style.opacity = "0";
}

function enterNotification(el, done) {
  // Initial styles
  el.style.transform = "translateX(50px)";
  el.style.opacity = "0";

  // Trigger a reflow to ensure initial styles are applied
  el.offsetHeight; // Force reflow

  // Transition styles
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";

  // Apply final styles to start transition
  requestAnimationFrame(() => {
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
  });

  // Call done when the transition ends
  el.addEventListener("transitionend", done, { once: true });
}

/**
 * Handles the animation for leaving a notification element.
 * Sets the transition styles to animate the element out of view.
 * Applies styles for leaving: translateX(50px) and opacity 0.
 * Calls done when the transition ends.
 * @param {HTMLElement} el - The notification element to animate.
 * @param {Function} done - The callback to call when the transition ends.
 */
function leaveNotification(el, done) {
  // Set transition styles
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";

  // Apply styles for leaving
  el.style.transform = "translateX(50px)";
  el.style.opacity = "0";

  // Call done when the transition ends
  el.addEventListener("transitionend", done, { once: true });
}

/**
 * todo
 *  list skin categories
 *  list characters and skin items
 *  add to cart
 *  remove from cart
 * add custom character to cart ui
 * list cart items to cart ui on market page load
 * edit custom character from cart item
 * select for preview
 * save clothes on characters
 *! confirm order
 * take on, take off characters
 * window.changeBackgroundColor('#222222') if skin category is Background:color
 * window.changeBackgroundImage('https://sss.png') if skin category is Background:image
 * set default character on init == char.is_used
 *? default mode button on character: resets character skins to all skins having is_default=1
 *? add description to skin item and character
 */
 const handleScriptLoad = async () => {

 
};

//  useHead({
//   script: [
//     {
//           src: `https://cdn.tamkin.app/app.js`, 
//           defer: false,
     
//         },
//         {
//           src: `https://cdn.tamkin.app/runtime.js`,
//           defer: false
//         },
        
//       ]
// })
</script>

<template>
  <div class="relative">
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalCart v-if="isOpen('mycart')" key="cart_mycart" />
    </transition>
    <transition
      @before-enter="beforeEnterNotification"
      @enter="enterNotification"
      @leave="leaveNotification"
    >
      <MarketModalCartNotification v-if="marketStore.firstItemNotificationShown" />
    </transition>

    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalRequest v-if="isOpen('requestmodal')" key="request_modal_popup" />
    </transition>
    <MarketModalReset v-if="resetModal" />

    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalPaymentPaymentmethods />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalPaymentCryptoStep1 v-if="isOpen('crypto_market_step1')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalPaymentCryptoStep2 v-if="isOpen('crypto_market_step2')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalPaymentCryptoSuccess v-if="isOpen('crypto_market_success')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalPaymentCard v-if="isOpen('cardModal_market')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <ProfileBillingModalsAddnewCard v-if="isOpen('add_new_card_billing')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalPaymentPaypal />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MarketModalPaymentSuccessPay />
    </transition>
    <!-- <MarketModalPaymentCard2 v-if="true"/> -->

    <div class="w-full h-full relative">
      <div class="flex items-center justify-between w-full">
        <h1
          class="rtl:text-right ltr:text-left text-[20px] leading-[36px] font-[600] mb-[10px] dark:text-whiteTamkin"
        >
          {{ $t("Market") }}
        </h1>
        <div
          v-if="defaultApp"
          class="mb-[10px] space-x-[8px] h-[41px] flex items-center justify-start rtl:space-x-reverse rounded-[5px] -shadow-y-1"
        >
          <div>
            <img
              src="/assets/imgs/icons/mysite_select.svg"
              class="w-[20px] h-[20px]"
              v-if="defaultApp?.title === 'Internal Service'"
            />

            <div
              v-if="!defaultApp?.favicon && defaultApp?.title !== 'Internal Service'"
              class="w-[20px] h-[20px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
            >
              {{ defaultApp?.title ? getAvatarLetters(defaultApp?.title) : "" }}
            </div>
            <div v-if="defaultApp?.favicon && defaultApp?.title !== 'Internal Service'">
              <img
                v-if="defaultApp.favicon"
                :src="defaultApp.favicon"
                class="w-[20px] h-[20px] rounded-full ipad-max:hidden lg:block hidden"
              />
            </div>
          </div>
          <div class="text-[12px] font-[500] text-darkGrey">
            {{
              defaultApp.title === "Internal Service"
                ? $t("Internal Service")
                : defaultApp.app_domain
            }}
          </div>
        </div>

        <div
          v-if="!defaultApp"
          class="mb-[10px] h-[41px] w-[174px] bg-gray-300 animate-pulse rounded-[5px]"
        ></div>
      </div>

      <div
        class="rounded-[10px] w-full flex items-end justify-center relative"
        :style="{
          background: playerStore.currentBackground.isImage
            ? `url(${playerStore.currentBackground.colorOrUrl})`
            : playerStore.currentBackground.colorOrUrl,
        }"
        :class="{
          'h-[250px]': expandedHeaderStep === 0,
          'h-[350px]': expandedHeaderStep === 1,
          'h-[550px]': expandedHeaderStep === 2,
          'bg-[#EEF1F3] dark:bg-tamkinDarkPrimary/60 ':
            !playerStore.currentBackground.isImage &&
            !playerStore.currentBackground.colorOrUrl,
        }"
      >
        <img
          v-if="playerStore.currentBackground.isImage"
          class="absolute inset-0 rounded-[10px]"
          :src="playerStore.currentBackground.colorOrUrl"
          alt=""
        />
        <div
          @click.prevent="openModal('mycart', 'market')"
          class="cursor-pointer w-[35px] dark:border-[#333333] dark:border-[1px] h-[35px] rounded-lg flex items-center justify-center absolute top-[16px] right-[16px] bg-transparent transition-colors duration-500 ease-in-out"
          :class="[
            marketStore.firstItemNotificationShown
              ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd z-[200]'
              : 'bg-white dark:bg-tamkinDarkPrimary',
          ]"
        >
          <transition
            name="grow"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <div
              v-if="cartItemCount"
              key="cart-badge"
              class="absolute -top-2 -right-1 bg-[#EA4335] w-[16px] h-[16px] rounded-full flex items-center justify-center dark:text-darkTamkin text-white font-[600] text-[10px]"
            >
              {{ cartItemCount }}
            </div>
          </transition>

          <svg
            :class="[
              marketStore.firstItemNotificationShown ? 'text-white ' : 'text-tamkin',
            ]"
            class="group-hover:text-white animate_cart"
            width="25"
            height="25"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.08 12.2849H7.22568L5.65425 4.42773H21.3685C21.4835 4.42816 21.5969 4.45378 21.7008 4.5028C21.8048 4.55182 21.8967 4.62304 21.9701 4.71145C22.0435 4.79985 22.0967 4.90329 22.1258 5.01446C22.1549 5.12563 22.1592 5.24184 22.1385 5.35488L20.85 11.6406C20.8199 11.8223 20.7257 11.9873 20.5844 12.1055C20.4431 12.2237 20.2642 12.2873 20.08 12.2849Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.6543 4.42801L4.9943 1.91373C4.95807 1.73626 4.86164 1.57675 4.72132 1.46221C4.58101 1.34767 4.40543 1.28512 4.2243 1.28516H1.72573"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.22656 12.2852L7.88656 15.5852C7.92279 15.7626 8.01922 15.9221 8.15954 16.0367C8.29985 16.1512 8.47543 16.2138 8.65656 16.2137H18.2266"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.4408 21.714C17.0069 21.714 16.6551 21.3622 16.6551 20.9283C16.6551 20.4944 17.0069 20.1426 17.4408 20.1426C17.8748 20.1426 18.2266 20.4944 18.2266 20.9283C18.2266 21.3622 17.8748 21.714 17.4408 21.714Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.58343 21.714C9.14949 21.714 8.79771 21.3622 8.79771 20.9283C8.79771 20.4944 9.14949 20.1426 9.58343 20.1426C10.0174 20.1426 10.3691 20.4944 10.3691 20.9283C10.3691 21.3622 10.0174 21.714 9.58343 21.714Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div
          class="flex items-center justify-evenly absolute bottom-[16px] right-[16px] rtl:space-x-reverse space-x-[16px]"
        >
          <div
            class="cursor-pointer w-[35px] h-[35px] bg-white dark:bg-tamkinDarkPrimary dark:border-[#333333] dark:border-[1px] rounded-lg flex items-center justify-center"
            @click="marketStore.openResetModal"
          >
            <div class="group">
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-[21px] h-[21px] text-darkGrey dark:!text-whiteTamkin"
              >
                <path
                  d="M13.6062 19.6175C13.3175 19.6175 13.0462 19.425 12.9675 19.1275C12.8713 18.7775 13.0812 18.4188 13.44 18.3225C16.9925 17.3862 19.4688 14.1662 19.4688 10.4913C19.4688 6.02875 15.8375 2.3975 11.375 2.3975C7.58625 2.3975 5.10125 4.61125 3.9375 5.95H6.51C6.86875 5.95 7.16625 6.2475 7.16625 6.60625C7.16625 6.965 6.8775 7.27125 6.51 7.27125H2.63375C2.59 7.27125 2.51125 7.2625 2.45 7.245C2.37125 7.21875 2.30125 7.18375 2.24 7.14C2.16125 7.0875 2.1 7.0175 2.05625 6.93875C2.0125 6.86 1.9775 6.76375 1.96875 6.6675C1.96875 6.64125 1.96875 6.62375 1.96875 6.5975V2.625C1.96875 2.26625 2.26625 1.96875 2.625 1.96875C2.98375 1.96875 3.28125 2.26625 3.28125 2.625V4.71625C4.7075 3.185 7.39375 1.09375 11.375 1.09375C16.5638 1.09375 20.7812 5.31125 20.7812 10.5C20.7812 14.77 17.9025 18.515 13.7725 19.6C13.72 19.6087 13.6588 19.6175 13.6062 19.6175Z"
                  class="fill-current group-hover:gradient-fill dark:fill-whiteTamkin"
                />
                <path
                  d="M10.7537 19.8888C10.7362 19.8888 10.7188 19.88 10.71 19.88C9.765 19.8188 8.8375 19.6088 7.9625 19.2675C7.70875 19.1713 7.53375 18.9175 7.5425 18.6462C7.5425 18.5675 7.56 18.4887 7.58625 18.4187C7.7175 18.0863 8.11125 17.92 8.435 18.0425C9.19625 18.34 9.9925 18.515 10.7975 18.5763C11.1388 18.5938 11.41 18.8913 11.41 19.2413L11.4012 19.2763C11.3837 19.6175 11.095 19.8888 10.7537 19.8888ZM5.9325 18.0075C5.78375 18.0075 5.64375 17.955 5.52125 17.8675C4.78625 17.2725 4.13875 16.5813 3.61375 15.8113C3.535 15.6975 3.49125 15.575 3.49125 15.4437C3.49125 15.225 3.59625 15.0238 3.78 14.9013C4.06875 14.7 4.48875 14.7787 4.69 15.0587C4.69 15.0675 4.69 15.0675 4.69 15.0675C4.69875 15.0762 4.7075 15.0938 4.71625 15.1025C5.17125 15.7588 5.7225 16.345 6.34375 16.835C6.4925 16.9575 6.58875 17.1413 6.58875 17.3425C6.58875 17.4913 6.545 17.64 6.44875 17.7625C6.3175 17.92 6.13375 18.0075 5.9325 18.0075ZM3.01 13.7375C2.72125 13.7375 2.4675 13.5538 2.38875 13.2825C2.10875 12.3813 1.96875 11.445 1.96875 10.5V10.4912C1.9775 10.1325 2.26625 9.84375 2.625 9.84375C2.98375 9.84375 3.28125 10.1413 3.28125 10.5C3.28125 11.3225 3.40375 12.1275 3.64 12.8887C3.6575 12.9587 3.66625 13.02 3.66625 13.09C3.66625 13.37 3.4825 13.6238 3.2025 13.7113C3.14125 13.7288 3.08 13.7375 3.01 13.7375Z"
                  class="fill-current group-hover:gradient-fill dark:fill-whiteTamkin"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6084_64126"
                    x1="11.375"
                    y1="1.09375"
                    x2="11.375"
                    y2="19.6175"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6084_64126"
                    x1="6.68937"
                    y1="9.84375"
                    x2="6.68937"
                    y2="19.8888"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <!-- <img src="/assets/pngs/market/reset.png"  alt="" /> -->
          </div>
          <div
            @click="toggleExpandHeader"
            class="cursor-pointer w-[35px] h-[35px] bg-white dark:bg-tamkinDarkPrimary dark:border-[#333333] dark:border-[1px] rounded-lg group flex items-center justify-center"
          >
            <template v-if="expandedHeaderStep === 1 || expandedHeaderStep === 0">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="text-darkGrey dark:text-whiteTamkin"
              >
                <path
                  d="M10.25 6.875L16.5 0.625"
                  class="stroke-current group-hover:stroke-gradient-0 dark:stroke-whiteTamkin"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.5 0.625H16.5V5.625"
                  class="stroke-current group-hover:stroke-gradient-1 dark:stroke-whiteTamkin"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.875 10.25L0.625 16.5"
                  class="stroke-current group-hover:stroke-gradient-2 dark:stroke-whiteTamkin"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.625 16.5H0.625V11.5"
                  class="stroke-current group-hover:stroke-gradient-3 dark:stroke-whiteTamkin"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="13.375"
                    y1="0.625"
                    x2="13.375"
                    y2="6.875"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear"
                    x1="14"
                    y1="0.625"
                    x2="14"
                    y2="5.625"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear"
                    x1="3.75"
                    y1="10.25"
                    x2="3.75"
                    y2="16.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear"
                    x1="3.125"
                    y1="11.5"
                    x2="3.125"
                    y2="16.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                </defs>
              </svg>
            </template>
            <template v-else>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="text-darkGrey"
              >
                <path
                  d="M1.375 17.625L7.625 11.375"
                  class="stroke-current group-hover:stroke-gradient-0 dark:stroke-whiteTamkin"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.625 11.375H7.625V16.375"
                  class="stroke-current group-hover:stroke-gradient-1 dark:stroke-whiteTamkin"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.625 1.375L11.375 7.625"
                  class="stroke-current group-hover:stroke-gradient-2 dark:stroke-whiteTamkin"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.375 7.625H11.375V2.625"
                  class="stroke-current group-hover:stroke-gradient-3 dark:stroke-whiteTamkin"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="4.5"
                    y1="11.375"
                    x2="4.5"
                    y2="17.625"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear"
                    x1="5.125"
                    y1="11.375"
                    x2="5.125"
                    y2="16.375"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear"
                    x1="14.5"
                    y1="1.375"
                    x2="14.5"
                    y2="7.625"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear"
                    x1="13.875"
                    y1="2.625"
                    x2="13.875"
                    y2="7.625"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                </defs>
              </svg>
            </template>
          </div>
        </div>
<ClientOnly>
  <MarketPlayer />

</ClientOnly>
      </div>
      <transition name="slide-up">
        <DashboardAddonsSaveFooter
          :show-footer="shouldShowFooter"
          @cancel_action="cancelAc"
          :disable-loading-save="playerStore.loadingChanges"
          :disable-loading-to-all="playerStore.savetoallloading"
          @save="handleSave('default')"
          @save-to-all-sites="handleSave('all')"
        />
      </transition>
      <MarketNavbar
        :loading="loadingCats"
        :categoriesWithSkinItems="categoriesWithSkinItemsFiltered"
      />

      <MarketCharacter v-if="marketStore.currentTab === 'character'" />
      <MarketSkinItemsListing
        v-if="currentCategoryWithSkinItems?.skin_items_list?.length"
        :currentCategoryWithSkinItems="currentCategoryWithSkinItems"
      />
    </div>
  </div>
</template>

<style>
.market_card_char {
  @apply cursor-pointer  2xl:col-span-1 lg:col-span-1 p-1 h-[250px]  border-[1px]
     border-[#E6E8EC] dark:border-[#333333] flex flex-col items-center justify-start rounded-[10px];
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.animate-bounce {
  animation: bounce 1s;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.animate-scale {
  animation: scale 0.5s;
}
</style>
