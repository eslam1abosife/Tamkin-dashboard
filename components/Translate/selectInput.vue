<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

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
  currentListValue: String,
});

const currentMode = inject("currentMode");

const emit = defineEmits(["getCurrentSelectedItem"]);
const isListOpen = ref(false);
const search = ref("");
const selectedOption = ref(null);

const selectedListObj = computed(() => {
  return props.list.find((item) => item[props.nameKey] === props.currentListValue);
});

const getSelectedItem = (item) => {
  emit("getCurrentSelectedItem", item);
};
const toggleDropdown = () => {
  if (!props.disabled) {
    isListOpen.value = !isListOpen.value;
  }
};

const closeOnOutSideClick = () => {
  isListOpen.value = false;
};
const selectList = (Item) => {
  if (!props.disabled) {
    selectedOption.value = Item;
    isListOpen.value = false;
    getSelectedItem(Item);
  }
};

const filteredList = computed(() => {
  return props.list.filter((listItem) =>
    listItem[props.nameKey].toLowerCase().includes(search.value.toString().toLowerCase())
  );
});

onMounted(() => {
  selectedOption.value = selectedListObj.value;
});

watch(selectedListObj, (newValue) => {
  selectedOption.value = newValue;
});
</script>


<template>
  <div class="relative w-full" v-on-click-outside="closeOnOutSideClick">
    <button
      @click.prevent="toggleDropdown"
      class="input_search_country !rounded-[10px] peer w-full ltr:text-left rtl:text-right"
      :class="[
        isListOpen ? 'rounded-b-none' : '',
        disabled
          ? 'bg-gray-200 bg-opacity-50 cursor-not-allowed focus:!outline-none focus:!ring-0'
          : '',
        errorField ? 'input_error' : '',
        successField ? 'input_success' : '',
      ]"
    >
      <div
        class="floating_country px-[6px] text-[#585B5B] ipad-max:!font-[400] !font-[400] lg:!font-[600] ipad-max:text-[10px] text-[13px]"
        :class="[selectedOption && selectedOption.name ? '!text-black' : 'text-light']"
      >
        <div class="flex items-center justify-start">
          <img
            v-if="selectedOption && iconKey"
            :src="selectedOption[iconKey]"
            class="w-[25px] h-[25px] rtl:ml-2 ltr:mr-2"
          />

          <div :class="[errorField ? '!text-error' : '']">
            {{ selectedOption ? $t(selectedOption.name ): $t(placeholderinput) }}
          </div>
        </div>
        {{}}
      </div>

      <img
        src="/assets/imgs/payment_methods/country_arrow.svg"
        :class="[isListOpen ? 'rotate-90 ' : 'rtl:rotate-180']"
        class="rtl:ml-[0px] ltr:mr-[20px] mb-[0px] rtl:float-left ltr:float-right w-[14px] h-[8px]"
      />
    </button>
    <div
      v-if="isListOpen"
      class="absolute z-[10] top-[52px] w-full rounded-[10px] bg-white border border-[#D9D9D9]"
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
        class="overflow-y-auto"
        :class="[filteredList.length > 0 ? 'h-[100px]' : 'h-auto']"
      >
        <li
          v-for="(listItem, i) in filteredList"
          :key="listItem.id"
          @click="selectList(listItem)"
          :class="[
            i === 0 && !enableSearch ? 'rounded-t-[10px]' : '',
            i === filteredList.length - 1 ? 'rounded-b-[10px]' : '',
            selectedOption && selectedOption[idField] === listItem[idField]
              ? '!bg-tamkinLight'
              : '',
          ]"
          class="last:rounded-b-[10px] flex items-center px-[16px] py-2 text-[12px] hover:bg-tamkinLight group cursor-pointer"
        >
          <img
            :src="listItem[iconKey]"
            v-if="iconKey"
            class="w-[25px] h-[25px] rtl:ml-2 ltr:mr-2"
          />
          <div
            class="group-hover:text-tamkin"
            :class="[
              selectedOption && selectedOption[idField] === listItem[idField]
                ? '!text-tamkin'
                : '',
            ]"
          >
            {{ $t(listItem[nameKey]) }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating_country {
  @apply cursor-text rounded-[10px] absolute rtl:right-[0] ltr:left-[15px] lg:rtl:!right-[24px] lg:ltr:left-[10px] top-[8px] lg:top-[8px] h-[40px] duration-100 ease-linear;
}
</style>
