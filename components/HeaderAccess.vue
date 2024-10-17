<script lang="ts" setup>
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

import { useApi } from "@/composables/useApi";
const { useApiInstance } = useApi();
const { api, loading } = useApiInstance();
import { useNavbarStore } from "@/stores/navbar";

const navStore = useNavbarStore();

const app = ref({});
const loadApp = ref(false);

const getApps = async () => {
  loadApp.value = true;
  try {
    const res = await api.post("/Apps/GetApps");
    settingsStore.apps = res.data.data.filter((el: any) => el.isdefault != 1);

    app.value = res.data.data.find((el: any) => el.isdefault == 1);
    settingsStore.defaultapp = app.value.name;
    settingsStore.defaultappobj = app.value;
    navStore.defaultappobj = app.value;
    loadApp.value = false;
  } catch (error) {
    loadApp.value = false;
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

onBeforeMount(() => {
  getApps();
});
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
</script>

<template>
  <div class="space-y-[10px]">
    <h1
      class="rtl:text-right ltr:text-left text-[20px] leading-[36px] font-[600] dark:text-whiteTamkin"
    >
      {{ sectionTitle }}
    </h1>

    <h2
      class="text-right ltr:text-left text-[13px] font-[400] leading-[22.5px] text-darkGrey dark:text-whiteTamkin/90"
    >
      {{ sectionSubTitle }}
    </h2>
  </div>

  <div
    v-if="Object.keys(app).length > 0"
    class="relative mt-[-10px] lg:mt-[5px] pb-[40px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col w-full justify-center lg:justify-start"
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
              class="flex items-center justify-center bg-white dark:bg-tamkinDarkPrimary w-[50px] h-[50px] custom-border-tamkin custom-border-tamkin-rounded rounded-full"
              style="box-shadow: 0px 4px 24px 8px rgba(81, 69, 159, 0.1)"
            >
              <img
                :src="
                  app.type !== 'Internal Services' && app.favicon
                    ? app.favicon
                    : getImageUrl
                "
                class="h-[30px] w-[30px]"
              />
            </div>
            <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
              <!-- <h2 class="font-[600] text-[16px] leading-[24px] text-[#C5C5C5]">Select Site</h2> -->
              <div>
                <h2
                  class="font-[600] text-[14px] leading-[24px] text-darkGrey dark:text-whiteTamkin/90"
                >
                  {{ app.title }}
                </h2>
              </div>
              <div v-if="app && app.type !== 'Internal Services'">
                <a
                  :class="[
                    app?.title === 'Internal Service'
                      ? '!text-darkGrey/40 cursor-not-allowed'
                      : '',
                  ]"
                  :href="
                    app?.title === 'Internal Service'
                      ? '#'
                      : app
                      ? formatToUrl(app.app_domain)
                      : ''
                  "
                  :target="app?.title === 'Internal Service' ? '' : '_blank'"
                  class="text-tamkin font-[500] text-[14px] leading-[24px] flex"
                >
                  {{ $t("Visit Site") }}
                  <svg
                    data-slot="icon"
                    class="size-6 ltr:ml-[14px] rtl:mr-[14px]"
                    fill="none"
                    stroke-width="1.5"
                    :class="[
                      app?.title === 'Internal Service'
                        ? '!text-darkGrey/40 cursor-not-allowed'
                        : '!text-tamkinStart',
                    ]"
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

                <!-- <a
                  :href="app.app_domain"
                  target="_blank"
                  class="text-tamkin font-[600] text-[14px] leading-[24px] flex ]"
                >
                  Visit Site
                  <img
                    src="/assets/imgs/icons/external_link.svg"
                    class="rtl:mr-[14px] ltr:ml-[14px]"
                  />
                </a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex items-center gap-2"
    :class="
      loadApp &&
      (isLinkActive('/overview') ||
        isLinkActive('/sign-language/overview') ||
        isLinkActive('/statistics') ||
        isLinkActive('/sign-language/statistics'))
        ? 'pb-[94px]'
        : ''
    "
  >
    <div class="h-[55px] w-[55px] bg-gray-200 rounded-full"></div>
    <div class="h-[20px] bg-gray-200 w-[250px]"></div>
  </div>
</template>
