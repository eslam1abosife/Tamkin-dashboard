<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import { useCollapseStore } from "@/stores/collapse.js";
import { vOnClickOutside } from "@vueuse/components";
import { useModalManager } from "@/composables/useModalManager";
const {locale} = useI18n()

const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const collapseStore = useCollapseStore();

const code = ref(true);
const advancedCode = ref(false);
const currentCode = ref(``);
const copyDone = ref(false);
const showAdancedCode = () => {
  if (!advancedCode.value) {
    code.value = false;
    advancedCode.value = true;

    currentCode.value = `const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
`;
  } else {
    code.value = true;
    advancedCode.value = false;

    currentCode.value = `const foo = 'bar';`;
  }
};

onBeforeMount(() => {
  currentCode.value = `const foo = 'bar';`;
  code.value = true;
});
const copyCode = () => {
  copyDone.value = true;
};

watch(copyDone, (newValue) => {
  if (newValue) {
    // Reset copyDone after the hideIn duration
    setTimeout(() => {
      copyDone.value = false;
    }, 2000);
  }
});
const route = useRoute();
// const isLinkActive = (path) => {
//   return localePath(route.path) === localePath(path);
// };

const localePath = useLocalePath();
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  
  let pattern = path.startsWith(`/${locale.value}`) ? path : localePath(path);

  if (!pattern.startsWith('/')) {
    pattern = '/' + pattern;
  }

  if (!pattern.includes('*')) {
    return currentPath === pattern;
  }

  const regexPattern = '^' + pattern.replace(/\*/g, '.*') + '$';
  const regex = new RegExp(regexPattern);

  return regex.test(currentPath);
};
</script>

<template>
  <div>
    <div
      :class="
        isLinkActive('/overview') || isLinkActive('/sign-language/overview')
          ? 'mt-[44px]'
          : ''
      "
      class="bg-white dark:bg-tamkinDarkPrimary rounded-[10px] shadow-md -shadow-y-[1px]"
 
    >
         <!-- v-if="
        isLinkActive('/overview') ||
        isLinkActive('/sign-language/overview') ||
        isLinkActive('/my-site')
      " -->
      <div :class="[ !isLinkActive('/sign-language/') ? 'mt-[-6px]':'']"
        class=" flex flex-col items-start justify-center lg:ltr:ml-[15px] lg:rtl:mr-[15px] divide-y"
      >
        <div
          :class="[
            isLinkActive('/my-site') ? 'px-[14px]' : '',
            isOpen('upgrade_no_package') ? 'space-x-[30px]' : 'space-x-[30px] ',
          ]"
          class="gap-x-4 bg-white dark:bg-tamkinDarkPrimary h-full lg:h-[87px] lg:py-0 max-md:px-4 py-4 lg:space-y-0 space-y-4 w-full rounded-[10px] flex items-center justify-start rtl:space-x-reverse lg:flex-row flex-col"
        >
          <div class="">
            <img
              src="/assets/imgs/overview/warning_overview.svg"
              class="lg:w-[43px] lg:h-[36px] w-full h-full"
            />
          </div>
          <div
            :class="[isOpen('upgrade_no_package') ? 'w-auto' : 'w-[94%] ']"
            class="font-[400] text-[12px] lg:text-[14px] lg:leading-[28px] text-darkGrey dark:text-whiteTamkin rtl:mr-auto ltr:ml-auto max-md:!mx-auto"
          >
            {{
              $t(
                `Integrate Tamkin's embed code on your platform to activate Tamkin's tools and fully enhance digital accessibility with ADA standards.`
              )
            }}
          </div>
        </div>
      </div>
    </div>
    <div
    :class="[isLinkActive('/subscriptions') || isLinkActive('/my-site') || isLinkActive('/sign-language/*') ? '!mt-[24px]' : 'mt-[30px]']"
      class=" bg-white dark:bg-tamkinDarkPrimary rounded-[10px] w-full px-[15px] relative shadow-md -shadow-y-[2px]"
    >
      <DashboardToastSuccess
        v-if="copyDone"
        :hideIn="2000"
        :message="'Copied to clipboard'"
      />

      <div class="flex items-start justify-between w-full pt-[24px] px-[15px]">
        <div>
          <h1
            class="text-[14px] lg:text-[18px] font-[500] max-md:mb-3 lg:leading-[30px] dark:text-whiteTamkin"
          >
            {{ $t("Widget Embed Code") }}
          </h1>
          <h2
            class="rtl:text-right ltr:text-left text-[12px] lg:text-[14px] font-[400] leading-[28.5px] text-darkGrey dark:text-whiteTamkin/90"
          >
            {{
              $t(
                `Widget Embed Code allows you to easily integrate accessibility features into your website by adding a simple script to your site's HTML`
              )
            }}
          </h2>
        </div>
        <div
          v-if="!isLinkActive('/my-site') &&  !isLinkActive('/subscriptions')  && !isLinkActive('/sign-language/*')"
          @click.stop="collapseStore.collapseMenu('widget_embded_code')"
          v-on-click-outside="
            () => collapseStore.removeMenu('widget_embded_code')
          "
          :class="[
            collapseStore.menus.includes('widget_embded_code')
              ? 'active_notification !text-darkGrey'
              : '',
          ]"
          class="menu_button_control"
        >
          <svg
            width="18"
            height="5"
            viewBox="0 0 18 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              collapseStore.menus.includes('widget_embded_code')
                ? 'stroke-current !text-white !fill-white'
                : 'dark:text-white',
            ]"
          >
            <path
              d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
              fill="currentColor"
            />
          </svg>

          <div
            v-if="collapseStore.menus.includes('widget_embded_code')"
            style="box-shadow: 0px 2px 6px 0px #00000040 !important"
            class="mini_SizeMenu"
          >
            <div
              class="mini_wrap"
              @click="collapseStore.collapseCard('widget_embded_code_card')"
            >
              <div>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7754 10.937L18.4995 7"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.7207 7H18.5V10.1496"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.2241 13.063L6.5 17"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.2793 17.0002H6.5V13.8506"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="text_mini">
                {{
                  !collapseStore.collapses.includes("widget_embded_code_card")
                    ? $t("Minisize")
                    : $t("Maxsize")
                }}
              </div>
            </div>

            <div class="arrow">
              <svg
                width="16"
                class=""
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter
                    id="shadow-sm"
                    x="0"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feDropShadow
                      dx="1"
                      dy="1"
                      stdDeviation="1"
                      flood-color="rgba(0, 0, 0, 0.3)"
                    />
                  </filter>
                </defs>
                <path
                  d="M15.2266 7.80851C15.2266 10.0216 0.841317 15.4755 0.841317 15.4755V0.142578C0.841317 0.142578 15.2266 5.5954 15.2266 7.80851Z"
                  class="fill-white dark:!fill-darkSecondary"
                  filter="url(#shadow-sm)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col items-start justify-center divide-y"
        v-if="!collapseStore.collapses.includes('widget_embded_code_card')"
      >
        <AdvancedCodeBlock />
      </div>
    </div>
  </div>
</template>
