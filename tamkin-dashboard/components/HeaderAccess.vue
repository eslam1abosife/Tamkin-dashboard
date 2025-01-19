<script lang="ts" setup>
import { useGetAppInvites, useUpdateDefaultApp } from "@/composables/useTeam";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

const { getAvatarLetters } = useGetAvatarLetters();

const {
  getInviteApps,
  defaultApp,
  apps,
  loading: getSitesLoading,
} = useGetAppInvites();
const settingsStore = useSettingsStore();
const props = defineProps({
  sectionTitle: {
    type: String,
    required: true,
  },
  sectionSubTitle: {
    type: String,
    required: true,
  },
  // websiteLink: {
  //   type: String,
  //   required: true,
  // },
  // websiteImgName: {
  //   type: String,
  //   required: true,
  // },
});

const getImageUrl = computed(() => {
  // Directly reference the public directory path
  return `/assets/imgs/icons/mysite.svg`;
});

const formatToUrl = (domain: any) => {
  // Check if the domain starts with "http://" or "https://"
  if (!/^https?:\/\//i.test(domain)) {
    // If not, prepend "https://"
    domain = "https://" + domain;
  }
  return domain;
};

const navStore = useNavbarStore();

const app = ref({});
const loadApp = ref(false);
const getApps = async () => {
  loadApp.value = true;
  navStore.loadingdefaultappobj = true;
  settingsStore.loadingdefaultappobj = true;
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    await getInviteApps({ agency: user.agency });
    settingsStore.apps = apps.value;
    settingsStore.appHeader = defaultApp.value;
    settingsStore.defaultapp = settingsStore.appHeader;
    settingsStore.defaultappobj = defaultApp.value;
    navStore.defaultappobj = defaultApp.value;
    loadApp.value = false;
    navStore.loadingdefaultappobj = false;
    settingsStore.loadingdefaultappobj = false;
  } catch (error) {
    loadApp.value = false;
    navStore.loadingdefaultappobj = false;
    settingsStore.loadingdefaultappobj = false;
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

onMounted(() => {
  getApps();
});
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
</script>

<template>
  <div class="space-y-[10px] relative !z-[50]">
    <h1
      v-if="!loadApp"
      class="rtl:text-right ltr:text-left text-[20px] leading-[36px] font-[600] dark:text-whiteTamkin"
    >
      {{ sectionTitle }}
    </h1>
    <div
      v-else
      class="h-[20px] bg-gray-200 w-[150px] dark:bg-p"
      :class="
        loadApp &&
        (isLinkActive('/sign-language/overview') ||
          isLinkActive('/sign-language/statistics') ||
          isLinkActive('/sign-language/customize') ||
          isLinkActive('/sign-language/addons') ||
          isLinkActive('/sign-language/settings'))
          ? 'mt-[0px]'
          : 'mt-[20px]'
      "
    ></div>

    <h2
      v-if="!loadApp"
      class="text-right ltr:text-left text-[13px] font-[400] leading-[22.5px] text-darkGrey dark:text-whiteTamkin/90"
    >
      {{ sectionSubTitle }}
    </h2>
    <div v-else class="h-[20px] bg-gray-200 w-[300px] dark:bg-p"></div>
  </div>

  <div
    v-if="!loadApp"
    class="relative mt-[-10px] z-[50] lg:mt-[5px] pb-[50px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col w-full justify-center lg:justify-start"
  >
    <div
      class="flex items-center lg:flex-row flex-col justify-start py-[16px] w-full rounded-[10px]"
    >
      <div class="w-full space-y-[16px]">
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between"
        >
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
          >
            <div
              class="flex items-center justify-center w-[50px] h-[50px] rounded-full"
            >
              <span v-if="settingsStore.appHeader">
                <img
                  v-if="
                    settingsStore.appHeader && settingsStore.appHeader?.favicon
                  "
                  :src="settingsStore.appHeader.favicon"
                  alt="Logo"
                  class="w-[40px] h-[40px] rounded-full"
                />
                <div
                  v-else-if="!settingsStore.appHeader?.favicon"
                  class="w-[40px] h-[40px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
                >
                  {{ getAvatarLetters(settingsStore.appHeader?.title) }}
                </div>
              </span>
              <img
                src="/assets/imgs/icons/mysite_select.svg"
                class="w-[40px] h-[40px]"
                v-else
              />
            </div>

            <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
              <div>
                <h2
                  class="font-[600] text-[14px] leading-[24px] text-darkGrey dark:text-whiteTamkin/90"
                >
                  <span v-if="settingsStore.appHeader">
                    {{ $t(settingsStore.appHeader.title) }}
                  </span>
                  <span v-else>
                    {{ $t("No Site Selected!") }}
                  </span>
                </h2>
              </div>
              <div v-if="settingsStore.appHeader">
                <a
                  :href="
                    settingsStore.appHeader
                      ? formatToUrl(settingsStore.appHeader.app_domain)
                      : '#'
                  "
                  :target="!settingsStore.appHeader ? '' : '_blank'"
                  class="text-tamkin font-[500] text-[14px] leading-[24px] flex"
                >
                  {{ $t("Visit Site") }}
                  <svg
                    data-slot="icon"
                    class="size-6 ltr:ml-[14px] rtl:mr-[14px]"
                    fill="none"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex items-center gap-2 pb-[65px] mt-[-20px] lg:space-y-0 space-y-[16px]"
    :class="
      loadApp &&
      (isLinkActive('/sign-language/overview') ||
        isLinkActive('/sign-language/statistics') ||
        isLinkActive('/sign-language/customize') ||
        isLinkActive('/sign-language/addons') ||
        isLinkActive('/sign-language/settings'))
        ? 'lg:mt-[35px]'
        : 'lg:mt-[15px]'
    "
  >
    <div class="h-[55px] w-[55px] bg-gray-200 rounded-full"></div>
    <div class="h-[20px] bg-gray-200 w-[250px]"></div>
  </div>
</template>
