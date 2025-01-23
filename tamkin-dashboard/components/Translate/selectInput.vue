<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import { ref, computed, watch, onMounted, defineProps, defineEmits } from "vue";
import { useDebounce } from "@vueuse/core";

const { t } = useI18n();
const props = defineProps({
  list: Array,
  placeholderinput: String,
  enableSearch: Boolean,
  iconKey: String,
  nameKey: String,
  idField: String,
  disabled: Boolean,
  errorField: Boolean,
  successField: Boolean,
  classFloating: String,
  currentListValue: [String, Number], // Allow currentListValue to be either name or id
});

const emit = defineEmits(["getCurrentSelectedItem"]);
const isListOpen = ref(false);
const search = ref("");
const selectedOption = ref(null);

// Watch for changes in the currentListValue and update selectedOption accordingly
watch(
  () => props.currentListValue,
  (newValue) => {
    if (newValue) {
      selectedOption.value =
        props.list.find(
          (item) =>
            item[props.nameKey] === newValue || item[props.idField] === newValue
        ) || null;
    } else {
      selectedOption.value = null;
    }
  },
  { immediate: true }
);

// Emit the selected item when it's chosen
const getSelectedItem = (item) => {
  emit("getCurrentSelectedItem", item);
};

// Toggle the dropdown visibility
const toggleDropdown = () => {
  if (!props.disabled) {
    isListOpen.value = !isListOpen.value;
  }
};

// Close dropdown when clicking outside
const closeOnOutSideClick = () => {
  isListOpen.value = false;
};

// Select an item from the list
const selectList = (item) => {
  if (!props.disabled) {
    // Update the selected item in the state
    selectedOption.value = item;

    // Emit the selected item
    getSelectedItem(item);

    // Close the dropdown after selecting an item
    isListOpen.value = false;
  }
};
const debouncedSearch = useDebounce(search, 300); // 300 ms debounce

const filteredList = computed(() => {
  if (!debouncedSearch.value) {
    return props.list;
  }

  const lowerSearchValue = t(debouncedSearch.value).toLowerCase();

  const matches = props.list
    .filter((listItem) => {
      const translatedName = listItem[props.nameKey].toLowerCase();
      return translatedName.includes(lowerSearchValue);
    })
    .sort((a, b) => {
      const translatedA = a[props.nameKey].toLowerCase();
      const translatedB = b[props.nameKey].toLowerCase();

      if (translatedA === lowerSearchValue) return -1;
      if (translatedB === lowerSearchValue) return 1;

      if (
        translatedA.startsWith(lowerSearchValue) &&
        !translatedB.startsWith(lowerSearchValue)
      )
        return -1;
      if (
        !translatedA.startsWith(lowerSearchValue) &&
        translatedB.startsWith(lowerSearchValue)
      )
        return 1;

      return 0;
    });

  return matches.length > 0 ? matches : [];
});

onMounted(() => {
  if (props.currentListValue) {
    selectedOption.value =
      props.list.find(
        (item) =>
          item[props.nameKey] === props.currentListValue ||
          item[props.idField] === props.currentListValue
      ) || null;
  }
});
</script>
<template>
  <div class="relative" v-on-click-outside="closeOnOutSideClick">
    <button
      @click.prevent="toggleDropdown"
      class="border-[1px] border-lightGrey dark:border-darkborder rounded-[10px] flex items-center justify-between h-[40px] px-4 peer w-full ltr:text-left rtl:text-right focus:border-tamkin"
      :class="[
        isListOpen ? 'border-tamkin' : '',
        disabled
          ? 'bg-gray-200 bg-opacity-50 cursor-not-allowed focus:!outline-none focus:!ring-0'
          : '',
        errorField ? 'input_error' : '',
        successField ? 'input_success' : '',
      ]"
    >
      <div
        class="floating_country px-[6px] dark:text-whiteTamkin ipad-max:text-[10px] lg:text-[14px] 2xl:text-[14px]"
        :class="[
          selectedOption && (selectedOption[nameKey] || selectedOption[idField])
            ? '!text-[#585B5B] font-[400] '
            : 'text-light',
          classFloating,
        ]"
      >
        <div class="flex items-center justify-start">
          <img
            v-if="selectedOption && iconKey"
            :src="selectedOption[iconKey]"
            class="w-[25px] h-[25px] rtl:ml-2 ltr:mr-2"
          />
          <div
            :class="[
              errorField ? '!text-error' : '',
              selectedOption ? 'text-black dark:text-white' : '',
              selectedOption &&
              selectedOption[nameKey] &&
              selectedOption[nameKey].length >= 20
                ? 'w-64 truncate text-[11px] sm:text-[14px]'
                : 'w-auto',
            ]"
            class="text-[12px]"
          >
            {{
              selectedOption
                ? $t(selectedOption[nameKey])
                : $t(placeholderinput)
            }}
          </div>
        </div>
      </div>
      <img
        src="/assets/imgs/payment_methods/country_arrow.svg"
        :class="[isListOpen ? 'rotate-90 ' : 'rtl:rotate-180']"
        class="rtl:mr-auto ltr:ml-auto w-[14px] h-[8px]"
      />
    </button>
    <div
      v-if="isListOpen"
      class="absolute z-[10] top-[0] w-full rounded-[10px] bg-white border-[#D9D9D9]"
    >
      <div class="search_input w-full rounded-t-[10px]" v-if="enableSearch">
        <input
          type="text"
          class="input_dashboard_search rtl:!pr-[48px] ltr:!pl-[48px] !w-full !rounded-b-none !text-[12px] !placeholder:text-[12px]"
          v-model="search"
          :placeholder="$t('Search') + '...'"
        />
        <div class="absolute top-[14px] rtl:right-[20px] ltr:left-[20px]">
          <img src="/assets/imgs/icons/search.svg" />
        </div>
        <div
          v-if="search"
          @click="search = ''"
          class="absolute top-[14px] cursor-pointer rtl:left-[20px] ltr:right-[20px]"
        >
          <img src="/assets/imgs/icons/clear_search.svg" />
        </div>
      </div>
      <ul
        v-if="isListOpen && filteredList.length > 0"
        class="max-h-[150px] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin overflow-y-scroll absolute z-[10] top-[52px] w-full rounded-[10px] bg-white border border-[#D9D9D9]"
      >
        <li
          v-for="(listItem, i) in filteredList"
          :key="listItem[idField]"
          @click="selectList(listItem)"
          :class="[
            selectedOption && selectedOption[idField] === listItem[idField]
              ? '!bg-tamkinLight dark:text-tamkinDarkPrimary'
              : '',
          ]"
          class="flex items-center px-[16px] py-2 text-[12px] hover:dark:text-whiteTamkin hover:bg-tamkinLight dark:hover:bg-p cursor-pointer"
        >
          <img
            :src="listItem[iconKey]"
            v-if="iconKey"
            class="w-[25px] h-[25px] rtl:ml-2 ltr:mr-2"
          />
          <div>{{ t(listItem[nameKey]) }}</div>
        </li>
      </ul>

      <!-- Show a message when no records are found -->
      <div
        v-if="isListOpen && filteredList.length === 0"
        class="absolute z-[10] top-[52px] w-full rounded-[10px] bg-white border border-[#D9D9D9] text-center py-2 dark:bg-darkTamkin dark:border-darkborder dark:text-white"
      >
        {{ $t("No countries found.") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating_country {
  @apply cursor-text rounded-[10px] absolute rtl:right-[0] ltr:left-[15px] lg:rtl:!right-[24px] lg:ltr:left-[10px] top-[8px] lg:top-[8px] h-[40px] duration-100 ease-linear;
}
</style>
