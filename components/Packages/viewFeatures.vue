<script lang="ts" setup>
const moreDetails = ref(false);
const packagesStore = usePackgesStore();
const openMoreDetails = () => {
  moreDetails.value = !moreDetails.value;
};

const boxShadowStyle = computed(() => {
  return moreDetails.value ? { boxShadow: "0px 0px 5.6px 0px #C8FEF9" } : {};
});

const mergePackages = (sections) => {
  const mergedItems = {};

  sections.forEach(section => {
    section.package_items.forEach(item => {
      if (!mergedItems[item.title]) {
        mergedItems[item.title] = { ...item, details: [] };
      }
      mergedItems[item.title].details.push({
        is_available: item.is_available,
        description: item.description,
        note: item.note
      });
    });
  });
// console.log('merginhere', Object.values(mergedItems))
  return Object.values(mergedItems);
};

</script>
<template>
  <div
    @click.prevent="openMoreDetails"
    :style="boxShadowStyle"
    :class="[moreDetails ? '!bg-[#35C0B4] !text-white ' : ' ']"
    class="hover:bg-[#35C0B4] hover:text-white group w-full px-[64px] my-[10px] h-[37px] bg-white rounded-b-[10px] rtl:space-x-reverse space-x-[20px] cursor-pointer flex items-center justify-center"
  >
    <div
      class="text-[14px] font-[500] leading-[21px] group-hover:text-white"
      :class="[moreDetails ? 'text-white ' : 'text-black']"
    >
      View the full feature list
    </div>
    <div>
      <svg
        :class="[moreDetails ? 'rotate-90 rtl:rotate-90' : '']"
        width="9"
        class="rtl:rotate-180"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.72769 7.25391L-2.14577e-06 1.80922L1.63615 0.253906L9 7.25391L1.63615 14.2539L-2.14577e-06 12.6986L5.72769 7.25391Z"
          :class="[moreDetails ? 'fill-white ' : 'fill-[#021328]']"
          class="group-hover:fill-white"
        />
      </svg>
    </div>
  </div>

  <div class="w-full rounded-[8px] mb-[32px] relative overflow-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-[#ECECF0] h-[50px] sticky top-0 z-50">
        <tr>
          <th
            class="px-6 py-3 rtl:text-right ltr:text-left text-[18px] font-[600] leading-[18px] text-[#18181B]"
          >
            Features
          </th>
          <th
            class="pr-[300px] py-3 rtl:text-right ltr:text-left text-[14px] font-[500] leading-[17px] text-[#71717A]"
          >
            {{
              packagesStore.getPackageByTypeAndCategory("Package").length &&
              packagesStore.getPackageByTypeAndCategory("Package")[0]
                ? packagesStore.getPackageByTypeAndCategory("Package")[0].title
                : ""
            }}
          </th>
          <th
            class="pr-[300px] py-3 rtl:text-right ltr:text-left text-[14px] font-[500] leading-[17px] text-[#71717A]"
          >
            {{
              packagesStore.getPackageByTypeAndCategory("Package").length &&
              packagesStore.getPackageByTypeAndCategory("Package")[1]
                ? packagesStore.getPackageByTypeAndCategory("Package")[1].title
                : ""
            }}
          </th>
          <th
            class="px-6 py-3 rtl:text-right ltr:text-left text-[14px] font-[500] leading-[17px] text-[#71717A]"
          >
            {{
              packagesStore.getPackageByTypeAndCategory("Package").length &&
              packagesStore.getPackageByTypeAndCategory("Package")[2]
                ? packagesStore.getPackageByTypeAndCategory("Package")[2].title
                : ""
            }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="sticky top-0 z-50">
          <th
            colspan="4"
            class="bg-[#ECECF0] h-[50px] !rounded-b-[8px] px-6 py-3 rtl:text-right ltr:text-left text-[18px] font-[600] leading-[18px] text-[#18181B]"
          >
            Addons
          </th>
        </tr>
        <tr
          v-for="pckitem in mergePackages(
            packagesStore.getPackageByTypeAndCategory('Package')
          )"
          :key="pckitem.name"
        >
          <td
            class="px-6 py-4 text-sm font-medium text-gray-900 rtl:text-right ltr:text-left"
          >
            <div
              class="flex items-center rtl:space-x-reverse space-x-[10px] justify-start text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
            >
       

              <div>{{ pckitem.title }}</div>
              <div
                class="relative"
          
              >
              <!-- :title="
              $t(
                pckitem.details[0].note
                  ? pckitem.details[0].note
                  : pckitem.details[1].note
                  ? pckitem.details[1].note
                  : pckitem.details[2].note ? pckitem.details[2].note : ''
              )
            " -->
                <span
                  class="tooltip packages"
                  id="saveButton"
                 
                >
                  <span id="saveButton_label">
                    <svg
                      width="16"
                      class="mx-[3px]"
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
                </span>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-left">
            <img
              v-if="
                (!pckitem.details[0].description &&
                  pckitem.details[0].is_available === 0) ||
                (!pckitem.details[0].description && pckitem.details[0].is_available === 1)
              "
              :src="
                pckitem.details[0].is_available
                  ? '/assets/imgs/checked_list_active.svg'
                  : '/assets/imgs/checked_list_inactive.svg'
              "
            />
            <div
              v-if="
                pckitem.details[0].description || pckitem.details[0].is_available === 1
              "
              class="text-[14px] text-darkGrey"
            >
              {{ pckitem.details[0].description }}
            </div>
          </td>
          <td class="px-6 py-4 text-center">
            <img
              v-if="pckitem.details[1] && !pckitem.details[1].description"
              :src="
                pckitem.details[1].is_available
                  ? '/assets/imgs/checked_list_active.svg'
                  : '/assets/imgs/checked_list_inactive.svg'
              "
            />
            <div v-if="pckitem.details[1] && pckitem.details[1].description" class="text-[14px] text-darkGrey">
              {{ pckitem.details[1].description }}
            </div>
          </td>
          <td class="px-6 py-4 text-center">
            <img
              v-if="pckitem.details[2] && !pckitem.details[2].description"
              :src="
              pckitem.details[2] && pckitem.details[2].is_available
                  ? '/assets/imgs/checked_list_active.svg'
                  : '/assets/imgs/checked_list_inactive.svg'
              "
            />
            <div v-if="pckitem.details[2] && pckitem.details[2].description" class="text-[14px] text-darkGrey">
              {{ pckitem.details[2].description }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
