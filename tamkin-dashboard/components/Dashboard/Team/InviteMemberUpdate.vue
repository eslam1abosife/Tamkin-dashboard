<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useGetAppInvites, useInviteApp, useGetTeamMemberInviteApps } from "@/composables/useTeam";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
const {t} = useI18n()
const { getAvatarLetters } = useGetAvatarLetters();

const { apps, getInviteApps, loading: getAppsLoading } = useGetAppInvites();
const { inviteApp } = useInviteApp();
const emit = defineEmits(['onSuccess']);

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData,
  setData
} = useModalManager();

const submitInviteLoading = ref(false)
const permissions = ref([]);

onMounted(async () => {
  await nextTick();
  const state = getData();

  await getInviteApps({
    agency: state.currTeamId
  });
  permissions.value = apps.value;


})

const props = defineProps({
  showModal: Boolean
})
const checked = ref([]);

const checkAll = computed({
  get() {
    return permissions.value && checked.value.length === permissions.value.length;
  },
  set(value) {
    checked.value = value ? permissions.value.map(lang => lang.name) : [];
  }
});
const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};
const errMsg = ref(null);

const activePermissions = computed(() => {
  return permissions.value.filter(permission => permission.status !== 'deleted');
});

const filteredPermissions = computed(() => {
  if (!search.value.trim()) return activePermissions.value;
  return activePermissions.value.filter((permission) => {
    const translatedTitle = t(permission.title); 
    return translatedTitle.toLowerCase().includes(search.value.toLowerCase());
  });
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const updatedState=ref({})
const submitInviteApp = async () => {
  try {
    submitInviteLoading.value = true
    updatedState.value= getData();
    updatedState.value.app_name = checked.value
    
    
    setData({
      ...updatedState.value,
      from_edit:false
    })

    // await inviteApp({
    //   email: state.email,
    //   app_name: checked.value,
    //   agency: state.currTeamId
    // });
    // emit('onSuccess', 'User Apps Updated Successfully!');
    // await delay(2000); // wait for 2 seconds
    navigateTo('invitememberupdate', 'team', 'userpermissions');
    submitInviteLoading.value = false

  } catch (err) {
    errMsg.value = err;
    submitInviteLoading.value = false

    console.error(err);
  }
}

</script>

<template>
  <div v-if="isOpen('invitememberupdate')"
    class="fixed z-[9999] top-[50px]  bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[640px] 
    ipad-max:h-auto  w-10/12 h-auto"
    style="left: 50%; transform: translate(-50%, 0)">
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('invitememberupdate')">
      <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor" />
      </svg>
    </div>
    <div class="container mx-auto max-h-[100%] ">
      <div v-loading="getAppsLoading">
        <h1
          class="ltr:text-left rtl:text-right font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]">
          {{ $t('Invite Member') }}
        </h1>
      
        <div class="flex items-center rtl:space-x-reverse space-x-[12px] justify-start ipad-max:mt-0 mt-[32px] border-[1px] border-t border-b-0 
        border-l-0 border-r-0 pt-[16px]">
          <!-- Avatar Placeholder -->
          <div
            class="avatar_img w-[56px] h-[56px] rounded-full bg-[#2dada3] text-white grid place-content-center select-none"
            v-if="!getAppsLoading">
            <span>
              {{ getAvatarLetters(getData().firstName + ' ' + getData().lastName) }}
            </span>
          </div>
          <div
            class="w-[56px] h-[56px] rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"
            v-else-if="true">
          </div>
      
          <!-- Name and Email Placeholder -->
          <div class="flex flex-col items-start justify-center">
            <div v-if="!getAppsLoading">
              <h2 class="ltr:text-left rtl:text-right font-[500] text-darkGrey dark:text-whiteTamkin text-[14px]">
                {{ getData().firstName + ' ' + getData().lastName }}
              </h2>
            </div>
            <div v-else class="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
      
            <div v-if="!getAppsLoading">
              <h2
                class="ltr:text-left rtl:text-right font-[400] text-[#878787] dark:text-whiteTamkin/80 text-[13px] leading-[27px]">
                {{ getData().email }}
              </h2>
            </div>
            <div v-else class="mt-2 h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>
      
          <div>
            <!-- Placeholder for any additional content -->
          </div>
        </div>
      
        <p v-if="!getAppsLoading"
          class="mt-[16px] ltr:text-left rtl:text-right font-[500] text-[#A7A7A7] whitespa dark:text-whiteTamkin text-[14px] leading-[24px]">
          {{ $t('Select Website that') }} <span class="font-[700] text-darkGrey dark:text-whiteTamkin/60">
            {{ getData().firstName + ' ' + getData().lastName }}
          </span> {{$t('can access')}}
        </p>
        <div class="my-[16px] w-full h-[24px] rounded-[5px] bg-gray-300 dark:bg-gray-600  animate-pulse" v-else>

          </div>
        <!-- Search Input Section -->
        <div class="w-full "  v-if="!getAppsLoading">
          <div class="py-[17px] search_input  w-full relative">
            <input type="text" class="input_dashboard_search w-full" v-model="search" :placeholder="`${$t('Search')} ...`" />
            <div
              class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]">
              <img src="/assets/imgs/icons/search.svg" />
            </div>
            <div v-if="isSearchfilled" @click="clearInput"
              class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer">
              <img src="/assets/imgs/icons/clear_search.svg" />
            </div>
          </div>
        </div>

        <div class="w-full py-[17px] h-[45px] rounded-[5px] bg-gray-300 dark:bg-gray-600  animate-pulse" v-else>
          
        </div>
      </div>
      
      <div v-loading="getAppsLoading" class="overflow-y-auto h-[150px]">
        <table
          v-if="!getAppsLoading && filteredPermissions.length > 0"
          class="min-w-full divide-y max-h-[100px] overflow-y-scroll divide-gray-200 dark:divide-light"
        >
          <thead>
            <tr>
              <th
                class="py-3 ltr:text-left rtl:text-right leading-[24px] text-[14px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin tracking-wider"
              >
                {{ $t('Website') }}
              </th>
              <th
                class="py-3 text-right text-[14px] leading-[22.5px] font-[500] text-darkGrey dark:text-whiteTamkin flex items-center justify-end rtl:space-x-reverse space-x-[10px]"
              >
                <div class="">{{$t('Select All')}}</div>
                <div>
                  <input type="checkbox" id="checkbox" class="peer sr-only m-auto" v-model="checkAll" />
                  <label
                    for="checkbox"
                    class="relative block border-[1px] w-[18px] h-[18px] border-tamkin bg-whiteTamkin dark:bg-tamkinDarkPrimary rounded-[4px] peer-checked:bg-gradient-checked"
                  >
                    <svg
                      class="peer-checked:block absolute inset-0 m-auto w-4 h-4 text-white dark:text-tamkinDarkPrimary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </label>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-darkborder">
            <!-- Actual content -->
            <tr v-for="permission in filteredPermissions" :key="permission.name">
              <td class="py-4 flex items-center rtl:space-x-reverse space-x-4">
                <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
              >
                <img
                  src="/assets/imgs/icons/mysite_select.svg"
                  class="w-[40px] h-[40px]"
                  v-if="permission?.title === 'Internal Service'"
                />
  
                <div
                  v-if="
                    !permission?.favicon &&
                    permission?.title !== 'Internal Service'
                  "
                  class="w-[40px] h-[40px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
                >
                  {{ permission?.title ? getAvatarLetters(permission?.title) : "" }}
                </div>
                <div
                  v-if="
                  permission?.favicon &&
                  permission?.title !== 'Internal Service'
                  "
                >
                  <img
                    v-if="permission.favicon"
                    :src="permission.favicon"
                    class="w-[40px] h-[40px] rounded-full ipad-max:hidden lg:block hidden"
                  />
                </div>
                
              </div>
                <span class="text-[14px] leading-[21px] font-[400] text-gray-900 dark:text-whiteTamkin">
                  {{ $t(permission.title) }}
                </span>
             
              </td>
              <td class="py-4 text-right">
                <div>
                  <input
                    type="checkbox"
                    v-model="checked"
                    :id="`checkbox_` + permission.name"
                    :value="permission.name"
                    class="peer sr-only rtl:mr-auto ltr:ml-auto"
                    number
                  />
                  <label
                    :for="`checkbox_` + permission.name"
                    class="relative block border-[1px] rtl:mr-auto ltr:ml-auto w-[18px] h-[18px] bg-whiteTamkin dark:bg-tamkinDarkPrimary rounded-[4px] peer-checked:bg-gradient-checked"
                  >
                    <svg
                      class="peer-checked:block absolute inset-0 m-auto w-4 h-4 text-white dark:text-tamkinDarkPrimary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    
        <div v-else-if="getAppsLoading" class="min-w-full divide-y  divide-gray-200 dark:divide-light animate-pulse">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-light">
            <thead>
              <tr>
                <th
                  class="py-3 ltr:text-left rtl:text-right leading-[24px] text-[14px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin tracking-wider"
                >
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                </th>
                <th
                  class="py-3 text-right text-[14px] leading-[22.5px] font-[500] text-darkGrey dark:text-whiteTamkin flex items-center justify-end rtl:space-x-reverse space-x-[10px]"
                >
                  <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                  <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-darkborder">
              <tr v-for="n in 1" :key="n">
                <td class="py-4 flex items-center rtl:space-x-reverse space-x-4">
                  <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <span class="block h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></span>
                </td>
                <td class="py-4 text-right">
                  <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded rtl:mr-auto ltr:ml-auto"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    
        <!-- No data state -->
        <NoData v-else />
      </div>
      <h6 v-if="errMsg" class="text-center text-[red] font-light text-[14px] mt-[5px] !mb-[5px]"> {{ errMsg }} </h6>

      <div
        class="flex items-center justify-center  rtl:space-x-reverse space-x-[30px] mx-auto ipad-max:mt-[10px] " :class="[filteredPermissions.length === 0 ? 'mt-0':'mt-[40px]']">
        <button class="btn_bordered_dashboard normal_hover text-center w-1/4" @click="closeModal('invitememberupdate')">
          {{ $t('Cancel') }}
        </button>
        <button :disabled="checked.length === 0 || submitInviteLoading"
          class=" btn-dashboard hover_tamkin text-center w-1/4" @click="submitInviteApp()">
          <div class="flex items-center justify-center">
            <div :class="submitInviteLoading ? 'rtl:ml-2 ltr:mr-2':''">
              {{ $t('Continue') }}
            </div>
       
             <svg  v-if="submitInviteLoading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
           </div>
          
          
          
        </button>

      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
