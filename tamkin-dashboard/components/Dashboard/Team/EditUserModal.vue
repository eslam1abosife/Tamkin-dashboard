<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useGetAppInvites, useGetTeamMemberInviteApps, useInviteApp } from "@/composables/useTeam";
const {t} = useI18n()
const { apps, getInviteApps, loading: getAppsLoading } = useGetAppInvites();
const { inviteApp, loading: submitInviteLoading } = useInviteApp();
const { inviteAppsForMember, getMemberInviteApps } = useGetTeamMemberInviteApps();
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

const { getAvatarLetters } = useGetAvatarLetters();

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


const permissions = ref([]);

onMounted(async () => {
  await nextTick();
  const state = getData();

  await getInviteApps({
    agency: state.currTeamId
  });

  permissions.value = apps.value;

  if (state.from_edit) {
    await getMemberInviteApps({ agency: state.currTeamId, email: state.member_email })
    console.log('inviteAppsForMember', inviteAppsForMember.value);
    inviteAppsForMember.value.forEach(ele => {
      checked.value.push(ele.app)
    })
  }

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

const filteredPermissions = computed(() => {
  if (!search.value.trim()) return permissions.value;
  return permissions.value.filter((permission) => {
    const translatedTitle = t(permission.title); 
    return translatedTitle.toLowerCase().includes(search.value.toLowerCase());
  });
});

const errMsg = ref(null);

const submitInviteApp = async () => {
  try {
    const state = getData();

    await inviteApp({
      email: state.email,
      app_name: checked.value,
      agency: state.currTeamId
    });
    emit('onSuccess', 'User Apps Updated Successfully!');
    navigateTo('editusermodal', 'team', null);
  } catch (err) {
    errMsg.value = err;
    console.error(err);
  }
}

</script>

<template>
  <div v-if="isOpen('editusermodal')"
    class="fixed z-[9999] top-[50px]  bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[640px] 
    ipad-max:h-auto lg:h-auto w-10/12  "
    style="left: 50%; transform: translate(-50%, 0)">
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('editusermodal')">
      <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor" />
      </svg>
    </div>
    <div class="container mx-auto ">
      <h1 class="ltr:text-left rtl:text-right font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]">
        {{$t('Invite Member')}}
      </h1>
    
      <div class="flex items-center dark:border-darkborder rtl:space-x-reverse space-x-[12px] justify-start ipad-max:mt-0 mt-[32px] border-[1px] border-t border-b-0 border-l-0 border-r-0 pt-[16px]">
       
       
        <div>
          <div v-if="getAppsLoading" class="w-[56px] h-[56px] bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div
          class="avatar_img w-[56px] h-[56px] rounded-full bg-[#2dada3] text-white grid place-content-center select-none"
          v-if="!getAppsLoading && !getData().user_image">
          <span>
            {{ getAvatarLetters(getData().firstName + ' ' + getData().lastName) }}
          </span>
        </div>

       <div  v-if="!getAppsLoading && getData().user_image"> 
        <img
        v-if="getData().user_image"
        :src="`https://tamkin.app/${getData().user_image}`"
        class="w-[56px] h-[56px] rounded-full"
      />
       </div>
        </div>
        <div class="flex flex-col items-start justify-center">
          <div>
            <h2 v-if="getAppsLoading" class="w-[150px] h-[16px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></h2>
            <h2 v-else class="ltr:text-left rtl:text-right font-[500] text-darkGrey dark:text-whiteTamkin text-[14px] ">
              {{ getData().firstName + ' ' + getData().lastName }}
            </h2>
          </div>
          <div>
            <h2 v-if="getAppsLoading" class="w-[100px] h-[14px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-[8px]"></h2>
            <h2 v-else class="ltr:text-left rtl:text-right font-[400] text-[#878787] dark:text-whiteTamkin/80 text-[13px] leading-[27px]">
              {{ getData().email }}
            </h2>
          </div>
        </div>
      </div>
    
      <p  class="mt-[16px] ltr:text-left rtl:text-right font-[500] text-[#A7A7A7] dark:text-whiteTamkin text-[14px] leading-[24px]">
        {{ $t('Select Website that') }} <span class="font-[700] text-darkGrey dark:text-whiteTamkin/60"> {{ getData().firstName + ' ' + getData().lastName }} </span> {{ $t('can access') }}
      </p>
    
      <div v-if="!getAppsLoading" class="w-full">
        <div class="py-[17px] search_input w-full">
          <input type="text" class="input_dashboard_search w-full" v-model="search" :placeholder="`${$t('Search')} ...`" />
          <div class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]">
            <img src="/assets/imgs/icons/search.svg" />
          </div>
          <div v-if="isSearchfilled" @click="clearInput" class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer">
            <img src="/assets/imgs/icons/clear_search.svg" />
          </div>
        </div>
      </div>
    
      <div v-loading="getAppsLoading" class="max-h-[200px] overflow-y-scroll">
        <div v-if="getAppsLoading">
          <!-- Placeholder for table rows -->
          <div v-for="n in 4" :key="n" class="flex items-center justify-between py-4 animate-pulse">
            <div class="flex items-center rtl:space-x-reverse space-x-4">
              <div class="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="w-[150px] h-[14px] bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div class="w-[18px] h-[18px] bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        
        <table v-else-if="filteredPermissions.length > 0" class="min-w-full divide-y divide-gray-200 dark:divide-light">
          <!-- Existing table structure -->
          <thead>
            <tr>
              <th class="py-3 ltr:text-left rtl:text-right leading-[24px] text-[14px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin tracking-wider">
                {{$t('Website')}}
              </th>
              <th class="py-3 text-right text-[14px] leading-[22.5px] font-[500] text-darkGrey dark:text-whiteTamkin flex items-center justify-end rtl:space-x-reverse space-x-[10px]">
                <div>{{$t('Select All')}}</div>
                <div>
                  <input type="checkbox" id="checkbox" class="peer sr-only m-auto" v-model="checkAll" />
                  <label for="checkbox" class="relative block border-[1px] w-[18px] h-[18px] border-tamkin bg-whiteTamkin dark:bg-tamkinDarkPrimary rounded-[4px] peer-checked:bg-gradient-checked">
                    <svg class="peer-checked:block absolute inset-0 m-auto w-4 h-4 text-white dark:text-darkTamkin dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </label>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-darkborder">
            <tr v-for="permission in filteredPermissions" :key="permission.name">
              
              <td class="py-4 flex items-center rtl:space-x-reverse space-x-4">
                <img v-if="permission.favicon" :src="permission.favicon" alt="Logo" class="w-[40px] h-[40px] rounded-full">
             
                <div v-else-if="!permission.favicon && permission.title !== 'Internal Service'" 
                class="w-[40px] h-[40px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"> 

                  {{ getAvatarLetters(permission?.title) }}
                </div>
                <img
                src="/assets/imgs/icons/mysite_select.svg"
                class="w-[40px] h-[40px]"
                v-if="
                permission?.title === 'Internal Service' &&
                  !getAppsLoading
                "
              />

          
                <span class="text-[14px] leading-[21px] font-[400] text-gray-900 dark:text-whiteTamkin">
                  {{ $t(permission.title) }}
                </span>
              </td>
              <td class="py-4 text-right">
                <div>
                  <input type="checkbox" v-model="checked" :id="`checkbox_` + permission.name" :value="permission.name" class="peer sr-only rtl:mr-auto ltr:ml-auto" number />
                  <label :for="`checkbox_` + permission.name" class="relative block border-[1px] rtl:mr-auto ltr:ml-auto w-[18px] h-[18px] bg-whiteTamkin dark:bg-tamkinDarkPrimary rounded-[4px] peer-checked:bg-gradient-checked">
                    <svg class="peer-checked:block absolute inset-0 m-auto w-4 h-4 text-white dark:text-darkTamkin dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <NoData class="!my-0 !py-0" v-else />
      </div>
    
      <h6 v-if="errMsg" class="text-center text-[red] font-light text-[14px] mt-[5px] !mb-[5px]"> {{ $t(errMsg) }} </h6>
    
      <div class="flex items-center justify-center rtl:space-x-reverse space-x-[30px] mx-auto ipad-max:mt-[10px] " 
      :class="[filteredPermissions.length === 0 ? 'mt-[30px] ':'mt-[30px]']">
        <button class="btn_bordered_dashboard normal_hover text-center w-1/4" @click="closeModal('editusermodal')">
          {{$t('Cancel')}}
        </button>
        <button :disabled="checked.length === 0 || submitInviteLoading" class="btn-dashboard hover_tamkin text-center w-1/4" @click="submitInviteApp()">
          <div class="flex items-center justify-center">
            <div :class="submitInviteLoading ? 'rtl:ml-2 ltr:mr-2':''">
              {{$t('Save')}}
            </div>
            <svg v-if="submitInviteLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
