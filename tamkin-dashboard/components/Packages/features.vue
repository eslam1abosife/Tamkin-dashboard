<script lang="ts" setup>
import { useFullUrl } from "@/composables/useSharedFunctions";
const { fullUrl } = useFullUrl();
const packagesStore = usePackgesStore();
const openedTabs = ref(["addons"]);
const props = defineProps({
  currentPage: String,
});
const toggleTab = (tab) => {
  const index = openedTabs.value.indexOf(tab);
  if (index === -1) {
    openedTabs.value.push(tab);
  } else {
    openedTabs.value.splice(index, 1);
  }
};
function getDayLabel(number) {
  return number === 1 ? "day" : "days";
}
const filteredPackagesAccess = computed(() => {
  return packagesStore.packages
    .filter(
      (pkg) =>
        pkg.type === packagesStore.currentType.name &&
        pkg.package_type === "Package" &&
        pkg.package_price_role.some(
          (item) => item.title === packagesStore.traffic_level
        )
    )
    .map((pkg) => {
      const priceRole = pkg.package_price_role.find(
        (item) => item.title === packagesStore.traffic_level
      );

      return {
        ...pkg,
        // Add fields from the matched price role
        cost_before_month: priceRole.cost_before_month,
        cost_year: priceRole.cost_year,
        cost_month: priceRole.cost_month,
        cost_3_month: priceRole.cost_3_month,
        cost_investor: priceRole.cost_investor,
        is_contact_us: priceRole.is_contact_us,
        data_cost_month: priceRole.data_cost_month,
        cost_yearly: priceRole.cost_yearly,
        discount_month: priceRole.discount_month,
        discount_3_month: priceRole.discount_3_month,
        discount_yearly: priceRole.discount_yearly,
        cost_before_yearly: priceRole.cost_before_yearly,
      };
    });
});

const uniqueValues = (items) => {
  const seen = new Set();

  const uniqueItems = items.filter((item) => {
    if (seen.has(item.title)) {
      return false;
    }
    seen.add(item.title);
    return true;
  });

  return uniqueItems.sort((a, b) => a.idx - b.idx);
};
/**
 * Return a string with the first letter uppercased.
 * @param {string} str the string to upper case the first letter of
 * @returns {string} the modified string
 */

const uppercasefirst = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
const filteredItem = (sectionName, index, title) => {
  const currentPackage =
    props.currentPage === "sign"
      ? packagesStore.getPackageByTypeAndCategory("Package")[index]?.name
      : packagesStore.getPackagesByPricingAndViews(
          "Package",
          packagesStore.traffic_level
        )[index]?.name;
  return packagesStore.sections[sectionName]?.filter(
    (x) => x.title === title && x.parent === currentPackage
  )[0];
};

const filteredSections = computed(() => {
  const sections = packagesStore.sections;

  return Object.keys(sections)
    .filter((sectionName) => sectionName !== "none" && sectionName !== "xx")
    .reduce((filtered, sectionName) => {
      filtered[sectionName] = sections[sectionName];
      return filtered;
    }, {});
});
const getFeaturesForSection = (sectionName) => {
  const featuresObject = packagesStore.sections.find((obj) => obj[sectionName]);
  return featuresObject ? featuresObject[sectionName] : {};
};
const accessNames = filteredPackagesAccess.value.map((item) => item.name);
const normalpackeges = packagesStore
  .getPackageByTypeAndCategory("Package")
  .map((item) => item.name);

const showAllFeatures = ref(false);

watch(showAllFeatures, () => {
  if (!showAllFeatures.value) {
    openedTabs.value.push("addons");
  }
});
const addonsSection = filteredSections.value["addons"];
const compareg = computed(() => {
  const hasNormalPackages =
    addonsSection.filter((v) => normalpackeges.includes(v.parent)).length > 0;
  const hasAccessNames =
    addonsSection.filter((v) => accessNames.includes(v.parent)).length > 0;

  return hasNormalPackages || hasAccessNames;
});
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const openBuyModal = (pck, contact) => {
  packagesStore.currentPackage = pck;
  openModal("add_package_modal_packages");
};
</script>

<template>
  <!-- uniqueValues(
  filteredSections['addons'].filter((v) =>
    normalpackeges.includes(v.parent)
  )
).length > 0 ||  uniqueValues(
  filteredSections['addons'].filter((v) => accessNames.includes(v.parent))
).length > 0 -->
  <div class="w-full relative" v-if="compareg">
    <div
      v-if="!showAllFeatures"
      class="bg-gradient-to-t absolute inset-auto h-full w-full z-[40]"
      :class="[
        currentPage === 'sign'
          ? 'from-[#EEF5FF] via-[#EEF5FF]/30 '
          : 'from-white via-white/30 ',
      ]"
    ></div>
    <button
      class="btn-dashboard scale-[0.9] absolute left-[40%] hover_tamkin z-[40] w-1/6 bottom-4 mx-auto"
      v-if="!showAllFeatures"
      @click="showAllFeatures = true"
    >
      {{ $t("Compare features") }}
    </button>

    <div
      class="flex items-center dark:bg-tamkinDarkPrimary dark:text-whiteTamkin justify-center flex-col w-full relative"
    >
      <div
        class="flex items-center justify-between ipad-max:flex-col dark:bg-tamkinDarkPrimary border-[1px] dark:border-darkborder dark:text-whiteTamkin ipadmax:justify-center mt-[32px] w-full top-[70px] z-[20]"
        :class="[
          packagesStore.currentType.title === 'Sign language'
            ? 'bg-[#F4F8FF]'
            : 'bg-white',
          showAllFeatures ? 'sticky' : '',
        ]"
      >
        <div class="rtl:text-right ltr:text-left mb-8 w-2/4 ipad-max:w-full">
          <h2 class="text-lg font-semibold text-black dark:text-whiteTamkin">
            {{ $t("Compare features") }}
          </h2>
        </div>

        <div
          class="flex justify-end divide-x-2 rtl:divide-x-reverse divide-white w-full"
        >
          <!-- Free -->
          <div
            class="bg-tamkinEnd/30 rtl:rounded-r-xl ltr:rounded-l-xl p-6 w-1/4 ipad-max:w-full text-center"
          >
            <div
              class="flex items-center justify-center space-x-2 rtl:space-x-reverse w-full"
            >
              <h3
                class="lg:text-[12px] xl:text-[14px] text-center dark:text-whiteTamkin font-semibold text-black"
              >
                {{
                  packagesStore.getPackageByTypeAndCategory("Package").length &&
                  packagesStore.getPackageByTypeAndCategory("Package")[0]
                    ? $t(
                        packagesStore.getPackageByTypeAndCategory("Package")[0]
                          .title
                      )
                    : ""
                }}
              </h3>
              <div
                class="flex justify-center mb-2"
                v-if="
                  packagesStore.getPackageByTypeAndCategory('Package').length &&
                  packagesStore.getPackageByTypeAndCategory('Package')[0]
                "
              >
                <img
                  :src="`https://tamkin.app/${
                    packagesStore.getPackageByTypeAndCategory('Package')[0].icon
                  }`"
                  alt="Pro"
                  class="w-4 h-4 2xl:w-8 2xl:h-8 lg:w-5 lg:h-5"
                />
              </div>
            </div>

            <button
              v-if="packagesStore.getPackageByTypeAndCategory('Package')[0]"
              @click="
                openBuyModal(
                  packagesStore.getPackageByTypeAndCategory('Package')[0],
                  packagesStore.getPackageByTypeAndCategory('Package')[0]
                    .is_contact_us
                )
              "
              class="mt-6 btn_bordered_dashboard !text-[14px] !p-1 w-full hover_tamkin"
            >
              <span
                v-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[0]
                    .is_contact_us
                "
              >
                {{ $t("Contact us") }}
              </span>
              <span
                v-else-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[0]
                    .package_price_role[0].trial_days > 0
                "
              >
                {{ $t("Try now for") }}
                {{
                  packagesStore.getPackageByTypeAndCategory("Package")[0]
                    .package_price_role[0].trial_days
                }}
                {{
                  $t(
                    getDayLabel(
                      packagesStore.getPackageByTypeAndCategory("Package")[0]
                        .package_price_role[0].trial_days
                    )
                  )
                }}
              </span>
              <span
                v-else-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[0]
                    .package_price_role[0].cost_month === 0 &&
                  packagesStore.getPackageByTypeAndCategory('Package')[0]
                    .package_price_role[0].cost_yearly === 0
                "
              >
                {{ $t("Free Package") }}
              </span>
              <span v-else> {{ $t("Get Started") }} </span>
            </button>
          </div>
          <!-- Pro -->
          <div class="bg-tamkinEnd/30 p-6 w-1/4 ipad-max:w-full text-center">
            <div
              class="flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <h3
                class="lg:text-[12px] xl:text-[14px] text-center dark:text-whiteTamkin font-semibold text-black"
              >
                {{
                  packagesStore.getPackageByTypeAndCategory("Package").length &&
                  packagesStore.getPackageByTypeAndCategory("Package")[1]
                    ? $t(
                        packagesStore.getPackageByTypeAndCategory("Package")[1]
                          .title
                      )
                    : ""
                }}
              </h3>
              <div
                class="flex justify-center mb-2"
                v-if="
                  packagesStore.getPackageByTypeAndCategory('Package').length &&
                  packagesStore.getPackageByTypeAndCategory('Package')[1]
                "
              >
                <img
                  :src="`https://tamkin.app/${
                    packagesStore.getPackageByTypeAndCategory('Package')[1].icon
                  }`"
                  alt="Pro"
                  class="w-4 h-4 2xl:w-8 2xl:h-8 lg:w-5 lg:h-5"
                />
              </div>
            </div>
            <button
              v-if="packagesStore.getPackageByTypeAndCategory('Package')[1]"
              @click="
                openBuyModal(
                  packagesStore.getPackageByTypeAndCategory('Package')[1],
                  packagesStore.getPackageByTypeAndCategory('Package')[1]
                    .is_contact_us
                )
              "
              class="mt-6 btn_bordered_dashboard !text-[14px] !p-1 w-full hover_tamkin"
            >
              <span
                v-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[1]
                    .is_contact_us
                "
              >
                {{ $t("Contact us") }}
              </span>
              <span
                v-else-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[1]
                    .package_price_role[0].trial_days > 0
                "
              >
                {{ $t(" Try now for") }}
                {{
                  packagesStore.getPackageByTypeAndCategory("Package")[1]
                    .package_price_role[0].trial_days
                }}
                {{
                  getDayLabel(
                    packagesStore.getPackageByTypeAndCategory("Package")[1]
                      .package_price_role[0].trial_days
                  )
                }}
              </span>
              <span
                v-else-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[1]
                    .package_price_role[0].cost_month === 0 &&
                  packagesStore.getPackageByTypeAndCategory('Package')[1]
                    .package_price_role[0].cost_yearly === 0
                "
              >
                {{ $t("Free Package") }}
              </span>
              <span v-else> {{ $t("Get Started") }} </span>
            </button>
          </div>
          <!-- Teams -->
          <div
            class="bg-tamkinEnd/30 rtl:rounded-l-xl ltr:rounded-r-xl p-6 w-1/4 ipad-max:w-full text-center"
          >
            <div
              class="flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <h3
                class="lg:text-[12px] xl:text-[14px] dark:text-whiteTamkin text-center font-semibold text-black"
              >
                {{
                  packagesStore.getPackageByTypeAndCategory("Package").length &&
                  packagesStore.getPackageByTypeAndCategory("Package")[2]
                    ? $t(
                        packagesStore.getPackageByTypeAndCategory("Package")[2]
                          .title
                      )
                    : ""
                }}
              </h3>
              <div
                class="flex justify-center mb-2"
                v-if="
                  packagesStore.getPackageByTypeAndCategory('Package').length &&
                  packagesStore.getPackageByTypeAndCategory('Package')[2]
                "
              >
                <img
                  :src="`https://tamkin.app/${
                    packagesStore.getPackageByTypeAndCategory('Package')[2].icon
                  }`"
                  alt="Pro"
                  class="w-4 h-4 2xl:w-8 2xl:h-8 lg:w-5 lg:h-5"
                />
              </div>
            </div>
            <button
              v-if="packagesStore.getPackageByTypeAndCategory('Package')[2]"
              @click="
                openBuyModal(
                  packagesStore.getPackageByTypeAndCategory('Package')[2],
                  packagesStore.getPackageByTypeAndCategory('Package')[2]
                    .is_contact_us
                )
              "
              class="mt-6 btn_bordered_dashboard !text-[14px] !p-1 w-full hover_tamkin"
            >
              <span
                v-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[2]
                    .is_contact_us
                "
              >
                {{ $t("Contact us") }}
              </span>
              <span
                v-else-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[2]
                    .package_price_role[0].trial_days > 0 ||
                  (packagesStore.getPackageByTypeAndCategory('Package')[2]
                    .package_price_role[0].trial_days === 0 &&
                    packagesStore.getPackageByTypeAndCategory('Package')[2]
                      .package_price_role[0].cost_month !== 0 &&
                    packagesStore.getPackageByTypeAndCategory('Package')[2]
                      .package_price_role[0].cost_yearly !== 0)
                "
              >
                {{
                  packagesStore.getPackageByTypeAndCategory("Package")[2]
                    .package_price_role[0].trial_days > 0
                    ? `${$t("Try now for")} ${
                        packagesStore.getPackageByTypeAndCategory("Package")[2]
                          .package_price_role[0].trial_days
                      } ${$t(
                        getDayLabel(
                          packagesStore.getPackageByTypeAndCategory(
                            "Package"
                          )[2].trial_days
                        )
                      )}`
                    : ""
                }}
              </span>
              <span
                v-if="
                  packagesStore.getPackageByTypeAndCategory('Package')[2]
                    .package_price_role[0].cost_month === 0 &&
                  packagesStore.getPackageByTypeAndCategory('Package')[2]
                    .package_price_role[0].cost_yearly === 0
                "
              >
                {{ $t("Free Package") }}
              </span>

              <span v-else>{{ $t("Get Started") }}</span>
            </button>
          </div>
        </div>
      </div>

      <div
        v-for="(section, name, index) in filteredSections"
        :key="index"
        class="w-full"
      >
        <div v-if="!showAllFeatures && name === 'addons'">
          <div
            @click="toggleTab(name)"
            class="bg-[#ECECF0] dark:bg-tamkinDarkPrimary border-[1px] dark:border-darkborder dark:text-whiteTamkin cursor-pointer w-full h-[60px] mt-[16px] flex items-center justify-between px-[20px]"
            :class="[
              openedTabs.includes(name) ? 'rounded-t-[10px]' : 'rounded-[10px]',
            ]"
          >
            <div
              class="flex dark:bg-tamkinDarkPrimary dark:text-whiteTamkin items-center justify-center gap-4"
            >
              <svg
                v-if="name === 'addons'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
                />
              </svg>

              <svg
                v-if="name === 'support'"
                class="size-6"
                data-slot="icon"
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
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                ></path>
              </svg>

              <svg
                v-if="name === 'management'"
                class="size-6"
                data-slot="icon"
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
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                ></path>
              </svg>
              <div
                class="text-[17px] !font-[700] text-[#18181B] leading-[20px]"
              >
                {{ $t(name.toUpperCase()) }}
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              :class="[!openedTabs.includes(name) ? 'rotate-180' : '']"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div
            class="w-full h-full dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
            v-if="openedTabs.includes(name)"
          >
            <table
              class="min-w-full min-h-full dark:bg-tamkinDarkPrimary dark:text-whiteTamkin overflow-visible table-fixed border-collapse border bg-white border-gray-200 relative"
            >
              <tbody class="dark:bg-tamkinDarkPrimary dark:text-whiteTamkin">
                <!-- First Row -->

                <tr
                  class="dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
                  v-for="(value, key, i) in currentPage === 'sign' &&
                  showAllFeatures
                    ? uniqueValues(
                        filteredSections[name].filter((v) =>
                          normalpackeges.includes(v.parent)
                        )
                      )
                    : currentPage === 'sign' && !showAllFeatures
                    ? uniqueValues(
                        filteredSections[name].filter((v) =>
                          normalpackeges.includes(v.parent)
                        )
                      ).slice(0, 3)
                    : currentPage !== 'sign' && showAllFeatures
                    ? uniqueValues(
                        filteredSections[name].filter((v) =>
                          accessNames.includes(v.parent)
                        )
                      )
                    : uniqueValues(
                        filteredSections[name].filter((v) =>
                          accessNames.includes(v.parent)
                        )
                      ).slice(0, 3)"
                  :key="key"
                >
                  <td
                    class="px-6 w-2/4 py-4 text-sm text-gray-700 border border-gray-200"
                  >
                    <div
                      class="flex items-center justify-between text-[14px] leading-[12px] text-[#18181B] font-[500] whitespace-nowrap"
                    >
                      <div class="whitespace-nowrap">{{ $t(value.title) }}</div>
                      <span
                        v-if="value && value.note"
                        class="tooltip packages"
                        :data-tamkin="$t(value.note)"
                      >
                        <svg
                          width="16"
                          class="ml-auto"
                          height="15"
                          viewBox="0 0 16 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                            fill="#71DAD2"
                          />
                        </svg>
                      </span>
                    </div>
                  </td>
                  <td
                    class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200"
                    v-if="filteredItem(name, 0, value.title)"
                  >
                    <div
                      class="flex justify-center items-center h-full"
                      v-if="
                        filteredItem(name, 0, value.title).is_available &&
                        !filteredItem(name, 0, value.title).description
                      "
                    >
                      <img
                        :src="
                          filteredItem(name, 0, value.title).is_available
                            ? '/assets/imgs/checked_list_active.svg'
                            : '/assets/imgs/checked_list_inactive.svg'
                        "
                      />
                    </div>
                    <div
                      v-else-if="filteredItem(name, 0, value.title).description"
                      class="text-[14px]"
                      style="color: rgb(53, 215, 215)"
                    >
                      {{ $t(filteredItem(name, 0, value.title).description) }}
                    </div>
                    <div v-else class="flex justify-center items-center h-full">
                      <img src="/assets/imgs/checked_list_inactive.svg" />
                    </div>
                  </td>

                  <td
                    class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200"
                    v-if="filteredItem(name, 1, value.title)"
                  >
                    <div
                      class="flex justify-center items-center h-full"
                      v-if="
                        filteredItem(name, 1, value.title).is_available &&
                        !filteredItem(name, 1, value.title).description
                      "
                    >
                      <img
                        :src="
                          filteredItem(name, 1, value.title).is_available
                            ? '/assets/imgs/checked_list_active.svg'
                            : '/assets/imgs/checked_list_inactive.svg'
                        "
                      />
                    </div>
                    <div
                      v-else-if="filteredItem(name, 1, value.title).description"
                      class="text-[14px]"
                      style="color: rgb(53, 215, 215)"
                    >
                      {{ $t(filteredItem(name, 1, value.title).description) }}
                    </div>
                    <div v-else class="flex justify-center items-center h-full">
                      <img src="/assets/imgs/checked_list_inactive.svg" />
                    </div>
                  </td>
                  <td
                    class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200"
                    v-if="filteredItem(name, 2, value.title)"
                  >
                    <div
                      class="flex justify-center items-center h-full"
                      v-if="
                        filteredItem(name, 2, value.title).is_available &&
                        !filteredItem(name, 2, value.title).description
                      "
                    >
                      <img
                        :src="
                          filteredItem(name, 2, value.title).is_available
                            ? '/assets/imgs/checked_list_active.svg'
                            : '/assets/imgs/checked_list_inactive.svg'
                        "
                      />
                    </div>
                    <div
                      v-else-if="filteredItem(name, 2, value.title).description"
                      class="text-[14px]"
                      style="color: rgb(53, 215, 215)"
                    >
                      {{ $t(filteredItem(name, 2, value.title).description) }}
                    </div>
                    <div v-else class="flex justify-center items-center h-full">
                      <img src="/assets/imgs/checked_list_inactive.svg" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          v-if="showAllFeatures"
          @click="toggleTab(name)"
          class="bg-[#ECECF0] dark:bg-tamkinDarkPrimary border-[1px] dark:border-darkborder dark:text-whiteTamkin cursor-pointer w-full h-[60px] mt-[16px] flex items-center justify-between px-[20px]"
          :class="[
            openedTabs.includes(name) ? 'rounded-t-[10px]' : 'rounded-[10px]',
          ]"
        >
          <div class="flex items-center justify-center gap-4">
            <svg
              v-if="name === 'addons'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
              />
            </svg>

            <svg
              v-if="name === 'support'"
              class="size-6"
              data-slot="icon"
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
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              ></path>
            </svg>

            <svg
              v-if="name === 'management'"
              class="size-6"
              data-slot="icon"
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
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              ></path>
            </svg>
            <div
              class="text-[17px] dark:text-whiteTamkin !font-[700] text-[#18181B] leading-[20px]"
            >
              {{ $t(name.toUpperCase()) }}
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            :class="[!openedTabs.includes(name) ? 'rotate-180' : '']"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div
          class="w-full h-full dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
          v-if="openedTabs.includes(name) && showAllFeatures"
        >
          <table
            class="min-w-full dark:bg-tamkinDarkPrimary dark:text-whiteTamkin min-h-full overflow-visible table-fixed border-collapse border bg-white border-gray-200 relative"
          >
            <tbody>
              <!-- First Row -->

              <tr
                class="dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
                v-for="(value, key, i) in currentPage === 'sign' &&
                showAllFeatures
                  ? uniqueValues(
                      filteredSections[name].filter((v) =>
                        normalpackeges.includes(v.parent)
                      )
                    )
                  : currentPage === 'sign' && !showAllFeatures
                  ? uniqueValues(
                      filteredSections[name].filter((v) =>
                        normalpackeges.includes(v.parent)
                      )
                    ).slice(0, 3)
                  : currentPage !== 'sign' && showAllFeatures
                  ? uniqueValues(
                      filteredSections[name].filter((v) =>
                        accessNames.includes(v.parent)
                      )
                    )
                  : uniqueValues(
                      filteredSections[name].filter((v) =>
                        accessNames.includes(v.parent)
                      )
                    ).slice(0, 3)"
                :key="key"
              >
                <td
                  class="px-6 w-2/4 py-4 text-sm dark:bg-tamkinDarkPrimary dark:text-whiteTamkin text-gray-700 border border-gray-200"
                >
                  <div
                    class="flex items-center dark:bg-tamkinDarkPrimary dark:text-whiteTamkin justify-between text-[14px] leading-[12px] text-[#18181B] font-[500] whitespace-nowrap"
                  >
                    <div class="whitespace-nowrap">{{ $t(value.title) }}</div>
                    <span
                      v-if="value && value.note"
                      class="tooltip packages"
                      :data-tamkin="$t(value.note)"
                    >
                      <svg
                        width="16"
                        class="ml-auto"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                          fill="#71DAD2"
                        />
                      </svg>
                    </span>
                  </div>
                </td>
                <td
                  class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200"
                  v-if="filteredItem(name, 0, value.title)"
                >
                  <div
                    class="flex justify-center items-center h-full"
                    v-if="
                      filteredItem(name, 0, value.title).is_available &&
                      !filteredItem(name, 0, value.title).description
                    "
                  >
                    <img
                      :src="
                        filteredItem(name, 0, value.title).is_available
                          ? '/assets/imgs/checked_list_active.svg'
                          : '/assets/imgs/checked_list_inactive.svg'
                      "
                    />
                  </div>
                  <div
                    v-else-if="filteredItem(name, 0, value.title).description"
                    class="text-[14px]"
                    style="color: rgb(53, 215, 215)"
                  >
                    {{ $t(filteredItem(name, 0, value.title).description) }}
                  </div>
                  <div v-else class="flex justify-center items-center h-full">
                    <img src="/assets/imgs/checked_list_inactive.svg" />
                  </div>
                </td>

                <td
                  class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200"
                  v-if="filteredItem(name, 1, value.title)"
                >
                  <div
                    class="flex justify-center items-center h-full"
                    v-if="
                      filteredItem(name, 1, value.title).is_available &&
                      !filteredItem(name, 1, value.title).description
                    "
                  >
                    <img
                      :src="
                        filteredItem(name, 1, value.title).is_available
                          ? '/assets/imgs/checked_list_active.svg'
                          : '/assets/imgs/checked_list_inactive.svg'
                      "
                    />
                  </div>
                  <div
                    v-else-if="filteredItem(name, 1, value.title).description"
                    class="text-[14px]"
                    style="color: rgb(53, 215, 215)"
                  >
                    {{ $t(filteredItem(name, 1, value.title).description) }}
                  </div>
                  <div v-else class="flex justify-center items-center h-full">
                    <img src="/assets/imgs/checked_list_inactive.svg" />
                  </div>
                </td>
                <td
                  class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200"
                  v-if="filteredItem(name, 2, value.title)"
                >
                  <div
                    class="flex justify-center items-center h-full"
                    v-if="
                      filteredItem(name, 2, value.title).is_available &&
                      !filteredItem(name, 2, value.title).description
                    "
                  >
                    <img
                      :src="
                        filteredItem(name, 2, value.title).is_available
                          ? '/assets/imgs/checked_list_active.svg'
                          : '/assets/imgs/checked_list_inactive.svg'
                      "
                    />
                  </div>
                  <div
                    v-else-if="filteredItem(name, 2, value.title).description"
                    class="text-[14px] text-darkGrey"
                    style="color: rgb(53, 215, 215)"
                  >
                    {{ $t(filteredItem(name, 2, value.title).description) }}
                  </div>
                  <div v-else class="flex justify-center items-center h-full">
                    <img src="/assets/imgs/checked_list_inactive.svg" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <button
      class="btn-dashboard left-[40%] hover_tamkin mt-[16px] z-[40] w-1/6 bottom-4 mx-auto scale-[0.9]"
      v-if="showAllFeatures"
      @click="showAllFeatures = false"
    >
      {{ $t("Close features") }}
    </button>
  </div>
</template>
