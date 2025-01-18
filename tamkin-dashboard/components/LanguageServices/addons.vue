<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

import { useCollapseStore } from "@/stores/collapse.js";
import { useSignLangStore } from "@/stores/signlang";
const signLangStore = useSignLangStore();
import draggable from "vuedraggable";

const collapseStore = useCollapseStore();
const { collapseMenu, collapseCard } = collapseStore;
const { menus } = storeToRefs(collapseStore);

const getImagePath = (icon) => {
  return new URL(
    `/public/assets/imgs/signlanguageservices/${icon}`,
    import.meta.url
  ).href;
};
const runtim = useRuntimeConfig()
const customizeStore = useCustomizeStore();
</script>

<template>
  <div
    class="mt-[44px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] xs:px-0 px-[15px] pb-[24px] shadow-md -shadow-y-[1px] relative"
  >
    <div class="flex items-center justify-start pt-[24px] xs:px-[15px]">
      <div>
        <h1
          class="text-[14px] xs:text-[12px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
        >
          {{
            $t(
              signLangStore.addonsPlugin.title
                ? signLangStore.addonsPlugin.title
                : ""
            )
          }}
        </h1>

        <h2
          class="text-left text-[12px] lg:text-[14px] font-[400] leading-[28.5px] text-darkGrey lg:w-auto ipad-max:max-w-full w-[290px] dark:text-whiteTamkin/90"
        >
          <span v-if="!collapseStore.collapses.includes('webPlugins')">
            {{ $t('Complete control over the features of the sign language player for easy management of your widgets') }}
            <!-- {{
              $t(
                signLangStore.addonsPlugin.description_on_show
                  ? signLangStore.addonsPlugin.description_on_show
                  : ""
              )
            }} -->
          </span>
          <span v-else>
            {{ $t('Enjoy full and seamless control over all the features of the sign language player, ensuring effortless and efficient management of your wedgit with maximum flexibility and customization options.') }}
            <!-- {{
              $t(
                signLangStore.addonsPlugin.description_on_hide
                  ? signLangStore.addonsPlugin.description_on_hide
                  : ""
              )
            }} -->
          </span>
        </h2>
      </div>

      <div
        @click.stop="collapseMenu('webPlugins')"
        v-on-click-outside="() => collapseStore.removeMenu('webPlugins')"
        :class="[
          menus.includes('webPlugins')
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
            menus.includes('webPlugins')
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
          v-if="menus.includes('webPlugins')"
          class="mini_SizeMenu shadow divide-y"
        >
          <!-- <div class="mini_wrap">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5.5L5.5 9.9256V12.9824L12 8.55677L18.5 12.9824V9.9256L12 5.5ZM12 9.17966L7.75108 12.1087V14.7032L12 11.7742L16.2489 14.7032V12.1087L12 9.17966ZM12 12.3983L9.55195 14.0859V16.0286L12 14.3618L14.4481 16.0286V14.0859L12 12.3983ZM12 14.9834L9.55195 16.6502V18.5L12 16.8332L14.4481 18.5V16.6502L12 14.9834Z"
                  class="fill-[#585B5B] dark:fill-whiteTamkin"
                />
              </svg>
            </div>
            <div class="text_mini">{{ $t("Switch To Annual") }}</div>
          </div> -->
          <div
            class="mini_wrap"
            @click="collapseStore.collapseCard('webPlugins')"
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
                !collapseStore.collapses.includes("webPlugins")
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
                class="fill-white dark:!fill-tamkinDarkPrimary"
                filter="url(#shadow-sm)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative flex flex-col items-start justify-center mt-[18px] pb-[16px]"
      v-if="!collapseStore.collapses.includes('webPlugins')"
      :class="{
        'pb-[179px]': !customizeStore.managePlayerPackages.find(
          (t) => t.feature === 'tamkin_deaf_dumb_deaf_manage_web_plugins_addons'
        ),
      }"
    >
      <MessagesLockedFeature
        v-if="
          !customizeStore.managePlayerPackages.find(
            (t) =>
              t.feature === 'tamkin_deaf_dumb_deaf_manage_web_plugins_addons'
          )
        "
      />
      <!-- {{ signLangStore.WebpluginsCards }} -->
      <draggable
        v-model="signLangStore.WebpluginsCards"
        @change="
          signLangStore.onDragChange('WebpluginsCards', 'initialCardsOrder')
        "
        @start="signLangStore.onDragStart('initialCardsOrder')"
        @end="signLangStore.onDragEnd('WebpluginsCards', 'initialCardsOrder')"
        item-key="name"
        class="w-full divide-y divide-lightGrey dark:divide-darkborder"
        handle=".handle"
      >
        <template #item="{ element }">
          <div
            v-if="element.active == 1"
            class="h-[55px] bg-[#FAFCFE] p-[6px] flex items-center justify-start w-full mt-[4px] dark:bg-darkTamkin"
          >
            <div
              class="flex items-center justify-start gap-4 rtl:space-x-reverse xs:space-x-[4px] w-full"
            >
              <div
                class="rounded-full dark:bg-darkSecondary flex items-center justify-center p-4"
              >
                <img
                  :src="runtim.public.baseImagerUrl + element.icon"
                  class="w-[24px]"
                  :class="[
                    !signLangStore.isChecked(element.checkboxId)
                      ? 'opacity-60'
                      : '',
                  ]"
                />
              </div>
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[
                  !signLangStore.isChecked(element.checkboxId)
                    ? 'opacity-60'
                    : '',
                ]"
              >
                <div
                  class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[12px] lg:text-[14px] leading-[8px] lg:leading-[16.39px]"
                >
                  <span>{{ $t(element.label) }}</span>
                </div>
                <div
                  class="text-[#585B5B] truncate md:overflow-visible md:text-ellipsis lg:overflow-visible lg:whitespace-normal lg:text-ellipsis w-20 lg:w-full dark:text-whiteTamkin/80 font-[500] text-[10px] lg:text-[12px] leading-[8px] lg:leading-[13.66px] mt-[8px]"
                >
                  <span>
                    {{ $t(element.description) }}
                  </span>
                </div>
              </div>
              <div class="ml-auto">
             
                <label :for="element.checkboxId" class="toggle_wrap">
                  <input
                    type="checkbox"
                    :id="element.checkboxId"
                    class="sr-only"
                    :checked="signLangStore.isChecked(element.checkboxId)"
                    @click="signLangStore.toggleCheckbox(element.checkboxId)"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      signLangStore.isChecked(element.checkboxId)
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{
                        active: signLangStore.isChecked(element.checkboxId),
                      }"
                    >
                      <img
                        v-if="signLangStore.isChecked(element.checkboxId)"
                        src="/assets/imgs/translatevideo/sign_active.svg"
                        class="w-[28px] h-[28px]"
                      />
                      <img
                        v-else
                        src="/assets/imgs/translatevideo/sign_inactive.svg"
                        class="w-[28px] h-[28px]"
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>

    <!-- <div
      v-else
      class="text-[14px] leading-[24px] font-[400] text-[#585B5B] pt-[6px] dark:text-whiteTamkin"
    >
      Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est
      veritatis dolore. Exercitationem et omnis ea quidem
    </div> -->
  </div>
</template>
