<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

import draggable from "vuedraggable";
const checkboxStore = useAddonStore();

const collapseStore = useCollapseStore();
const { collapseMenu, collapseCard } = collapseStore;
const { menus } = storeToRefs(collapseStore);

const isChecked = (name: string) => {
  const checkbox = checkboxStore.checkboxes.find(
    (checkbox) => checkbox.name === name
  );
  return checkbox ? checkbox.value : false;
};

const toggleCheckbox = (name: string) => {
  checkboxStore.toggleCheckbox(name);
};
const getImagePath = (icon) => {
  return new URL(`/public/assets/imgs/addons/${icon}`, import.meta.url).href;
};
onMounted(() => {});
const navStore = useNavbarStore();
const settingsStore = useSettingsStore();
</script>

<template>
  <div
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] xs:px-0 px-[15px] pb-[24px] shadow-md -shadow-y-[1px] relative"
  >
    <div class="flex items-center justify-start pt-[24px]">
      <div>
        <h1
          class="xs:text-[12px] text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
        >
          {{
            $t(
              checkboxStore.getAccAttributes(
                "acc-addons-accessibility-profiles"
              )?.title
            )
          }}
        </h1>
        <h2
          class="text-[12px] lg:text-[14px] font-[400] leading-[28.5px] text-darkGrey dark:text-whiteTamkin"
        >
          <span v-if="!collapseStore.collapses.includes('ManageCard')">
            {{
              $t(
                checkboxStore.getAccAttributes(
                  "acc-addons-accessibility-profiles"
                )?.description_on_show
                  ? checkboxStore.getAccAttributes(
                      "acc-addons-accessibility-profiles"
                    )?.description_on_show
                  : ""
              )
            }}
          </span>
          <span v-else>
            {{
              $t(
                checkboxStore.getAccAttributes(
                  "acc-addons-accessibility-profiles"
                )?.description_on_hide
                  ? checkboxStore.getAccAttributes(
                      "acc-addons-accessibility-profiles"
                    )?.description_on_hide
                  : ""
              )
            }}
          </span>
        </h2>
      </div>
      <div
        @click.stop="collapseStore.collapseMenu('ManageMenu')"
        v-on-click-outside="() => collapseStore.removeMenu('ManageMenu')"
        :class="[
          menus.includes('ManageMenu')
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
            menus.includes('ManageMenu')
              ? 'stroke-current !text-white !fill-white'
              : 'dark:text-white',
          ]"
        >
          <path
            d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
            fill="currentColor"
          />
        </svg>

        <div v-if="menus.includes('ManageMenu')" class="mini_SizeMenu divide-y">
          <div
            class="mini_wrap"
            @click="collapseStore.collapseCard('ManageCard')"
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
                !collapseStore.collapses.includes("ManageCard")
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
      class="relative flex flex-col items-start justify-center pb-[16px] mt-[18px] divide-y"
      v-if="!collapseStore.collapses.includes('ManageCard')"
    >
      <MessagesLockedFeature
        v-if="
          navStore.defaultappobj?.package?.filter(
            (p) => p.type === 'Accessibility'
          ).length === 0 ||
          !settingsStore.manageAccessibility.find(
            (t) =>
              t.feature ===
              'tamkin_accessibility_acc_manage_your_accessibility_profiles'
          )
        "
      />
      <draggable
        v-model="checkboxStore.manageProfileCards"
        @change="
          checkboxStore.onDragChange(
            'manageProfileCards',
            'initialManageProfileCards'
          )
        "
        @start="checkboxStore.onDragStart('initialManageProfileCards')"
        @end="
          checkboxStore.onDragEnd(
            'manageProfileCards',
            'initialManageProfileCards'
          )
        "
        item-key="name"
        class="w-full"
        handle=".handle"
      >
        <template #item="{ element }">
          <div
            class="h-[55px] bg-[#FAFCFE] p-[6px] flex items-center justify-start w-full mt-[4px] dark:bg-darkTamkin"
          >
            <div
              class="flex items-center justify-start rtl:space-x-reverse xs:space-x-[4px] space-x-[13px] w-full"
            >
              <img
                src="/assets/imgs/addons/left_item.svg"
                :class="[
                  !isChecked(element.checkboxId) || !element.is_enabled
                    ? 'opacity-60'
                    : '',
                ]"
                class="cursor-pointer handle w-[8px] h-[20px] lg:w-[11px] lg:h-[25px]"
              />

              <img
                :src="getImagePath(element.icon)"
                class="lg:w-[45px] lg:h-[46px] w-[30px] h-[30px]"
                :class="[
                  !isChecked(element.checkboxId) || !element.is_enabled
                    ? 'opacity-60'
                    : '',
                ]"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[
                  !isChecked(element.checkboxId) || !element.is_enabled
                    ? 'opacity-60'
                    : '',
                ]"
              >
                <div
                  class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[12px] lg:text-[14px] leading-[8px] lg:leading-[16.39px]"
                >
                  <span>{{ $t(element.name) }}</span>
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
                    class="sr-only group"
                    :checked="
                      checkboxStore.isChecked(element.checkboxId) &&
                      element.is_enabled
                    "
                    :disabled="!element.is_enabled"
                    @change="
                      () => {
                        if (element.is_enabled) {
                          checkboxStore.toggleCheckbox(element.checkboxId);
                        } else {
                          $toast(
                            $t(
                              'The Feature you are trying to use is not in your package'
                            ),
                            { type: 'warning', hideIn: 3000 }
                          );
                        }
                      }
                    "
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      checkboxStore.isChecked(element.checkboxId) &&
                      element.is_enabled
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{
                        active:
                          isChecked(element.checkboxId) && element.is_enabled,
                      }"
                    >
                      <img
                        v-if="
                          isChecked(element.checkboxId) && element.is_enabled
                        "
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
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
  </div>
</template>
