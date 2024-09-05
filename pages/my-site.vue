<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import mysiteAnimation from "/assets/animation/mysite.json";
import { useModalManager } from '@/composables/useModalManager';
import { useVuelidate } from "@vuelidate/core";
import {useGetAppInvites} from '@/composables/useTeam';
import { useDeleteApp, useRestoreApp } from "@/composables/useMySite";
const { getInviteApps, defaultApp, apps, loading: getSitesLoading } = useGetAppInvites();

const getApps = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  await getInviteApps({agency: user.agency});
}
onMounted( () => {
  getApps();
});

import { required, email, sameAs } from "@vuelidate/validators";
import {watch, computed, ref} from "vue";

definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],

});
const state = reactive({
  teamName: "",
});
const rules = {
  teamName: { required },
};

const v$ = useVuelidate(rules, state);

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  lastEventCall,
  eventCounter,
  setData
} = useModalManager();
const dataAvailable = ref(true);
const editTeamNameMode = ref(false);

const currentTab = ref("saved");

const switchTab = (tab: any) => {
  currentTab.value = tab;
  currentPage.value = 1;
};

const checked = ref([]);
const deletedSites = ref([
  { id: "1", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "2", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "3", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "4", name: "Tamkin", image: "https://via.placeholder.com/24" },
]);

const checkAll = computed({
  get() {
    return deletedSites.value && checked.value.length === deletedSites.value.length;
  },
  set(value) {
    checked.value = value ? deletedSites.value.map((lang) => lang.id) : [];
  },
});
const localePath = useLocalePath();

const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  currentPage.value = 1;
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};

const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5; // Adjust this number for more or fewer visible pages
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});



const perPageOptions = ref([5, 10, 20]); // Modify perPageOptions to include 5 items per page
const perPage = ref(perPageOptions.value[0]);
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(appList.value.length / perPage.value));

const changePerPage = (option: number) => {
  perPage.value = option;
  currentPage.value = 1; // Reset to the first page when changing items per page
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};


const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
}

const currAppName = ref(null);
const openDeleteMember = (appName) => {
  navigateTo(null, 'mysite', 'deleteApp');
  currAppName.value = appName;
};


const openRestoreApp = (appName) => {
  navigateTo(null, 'mysite', 'restoreApp');
  currAppName.value = appName;
}

const toastAppear = ref(false);
const toastMsg = ref(null);

watch(eventCounter, async () => {
  toastAppear.value = false;
  toastMsg.value = null;
  if (lastEventCall.value === 'deleteApp') {
    const { deleteApp } = useDeleteApp();
    await deleteApp(currAppName.value);
    closeModal('deleteApp');
    currentTab.value = 'deleted';
    toastMsg.value = 'deleted successfully!';
  }
  else if(lastEventCall.value === 'restoreApp') {
    const { restoreApp } = useRestoreApp();
    await restoreApp(currAppName.value);
    closeModal('restoreApp');
    currentTab.value = 'saved';
    toastMsg.value = 'restored successfully!';
  }
  currentPage.value = 1
  toastAppear.value = true;
  getApps();
});


const deletedAppListLength = computed(() => {
  return apps.value
      .filter((ele) => ele.status === 'deleted')
      .filter((ele) => ele.title.toLowerCase().includes(search.value.toString().toLowerCase().trim()))
      .length;
})

const notDeletedAppListLength = computed(() => {
  return apps.value
      .filter((ele) => ele.status != 'deleted')
      .filter((ele) => ele.title.toLowerCase().includes(search.value.toString().toLowerCase().trim()))
      .length;
})

const appList = computed(() => {
  return apps.value
      .filter((ele) => {
        if(currentTab.value == 'deleted') {
          return ele.status === 'deleted';
        } else {
          return ele.status !== 'deleted'
        }
      })
      .filter((ele) => ele.title.toLowerCase().includes(search.value.toString().toLowerCase().trim()));
})

const paginatedFilteredAppList = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = startIndex + perPage.value;
  return appList.value.slice(startIndex, endIndex);
});


</script>

<template>
  <DashboardToastSuccess v-if="toastAppear" :hideIn="2000" :message="toastMsg"   />

  <div class=" w-full ">
    <div class="space-y-[10px] ">
      <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
        {{ $t('My Site') }}
      </h1>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
        {{ $t('Add your website domain to access Tamkin services, unlocking enhanced features and better online integration') }}
      </h2>
    </div>

    <div
      class="mt-[18px] flex items-center justify-start rtl:space-x-reverse space-x-[36px] "
    >
      <div>
        <button
          class="btn-dashboard-normal normal_hover text-[14px] leading-[24px] font-[500]"
          @click="$router.push(localePath('/add-site'))"
        >
          {{$t('Add New Site')}}
        </button>
      </div>
      <div>
        <button
          class="btn_bordered_dashboard normal_hover bg-white text-[14px] leading-[24px] font-[500]"
        >
          {{ $t('Upgrade Plans') }}
        </button>
      </div>
    </div>

    <div v-if="!getSitesLoading"
      class=" ipad-max:mt-[24px] mt-[44px] flex lg:space-y-0 space-y-[16px] 
      items-center lg:flex-row flex-col justify-center lg:justify-start"
    >
      <div
        class="flex items-center lg:flex-row flex-col justify-start px-[16px] py-[23px] w-full
         bg-white dark:bg-tamkinDarkPrimary lg:w-[73%] 2xl:w-[75%] md:h-[170px] h-[150px] lg:h-[129px] rounded-[10px]"
        style="box-shadow: 0px 4px 24px 8px #51459f1a"
      >
        <div class="w-full space-y-[16px]">
          <div>
            <h1
              class="font-[500] text-[16px] leading-[20px] text-darkGrey dark:text-whiteTamkin/90"
            >
             {{$t('Select your default site')}}
            </h1>
          </div>

          <div class="flex flex-col lg:flex-row items-start lg:space-y-0 space-y-[10px] lg:items-center justify-between">
            <div
              class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
            >
              <img src="/assets/imgs/icons/mysite_select.svg" class="w-[40px] h-[40px]" />
              <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
                <!-- <h2 class="font-[600] text-[16px] leading-[24px] text-[#C5C5C5]">Select Site</h2> -->
                <div>
                  <h2
                    class="font-[500] text-[14px] leading-[14px] dark:text-whiteTamkin text-darkGrey underline"
                  >
                    {{ defaultApp?.title }}
                  </h2>
                </div>
                <div>
                  <a
                    href=""
                    target="_blank"
                    class="text-tamkin font-[500] text-[14px] leading-[24px] flex"
                    >{{ $t('Visit Site') }}
                    <img
                      src="/assets/imgs/icons/external_link.svg"
                      class="ltr:ml-[14px] rtl:mr-[14px]"
                  /></a>
                </div>
              </div>
            </div>
            <div>
              <button
                @click="openModal('selectSite','my-site')"
                class="btn_bordered_dashboard text-[14px] leading-[22.5px] font-[500]"
              >
                {{$t('Select Site')}}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="getSitesLoading"  class="rtl:mr-auto ltr:ml-auto absolute rtl:left-0 rtl:transform rtl:scale-x-[-1]
      ltr:right-0 top-[100px] md:top-[60px] lg:top-[80px] ipad-max:w-1/4">
 
    
       <div class="w-[300px] h-[200px] lg:h-[200px]  md:h-[150px] lg:block hidden md:block animate-pulse bg-gray-200 rounded-md">
        

       </div>
       
     </div>
      <div v-else
        class="rtl:mr-auto ltr:ml-auto absolute rtl:left-0 rtl:transform rtl:scale-x-[-1]
        ltr:right-0  top-[119px] md:top-[60px] lg:top-[50px] ipad-max:w-1/4 "
      >
        <Vue3Lottie
          :animationData="mysiteAnimation"
          class="absolute left-[25%] top-[125px] lg:top-[125px] lg:left-[25%] md:top-[55px] md:left-[20%]"
          :height="32"
          :width="39"
        />
        <img src="/assets/imgs/man_mysite.svg " class="h-[300px] lg:h-[300px] md:h-[150px] lg:block hidden md:block" />
      </div>
   
      
    </div>
    <div v-else class="ipad-max:mt-[24px] mt-[44px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col
     justify-center lg:justify-start">
  
      <!-- Placeholder Container -->
      <div class="flex items-center lg:flex-row flex-col justify-start px-[16px] py-[23px] w-full bg-white dark:bg-gray-700 lg:w-[73%] 2xl:w-[75%] md:h-[170px] h-[150px] lg:h-[129px] rounded-[10px]" style="box-shadow: 0px 4px 24px 8px #51459f1a">
        
        <!-- Placeholder Content -->
        <div class="w-full space-y-[16px]">
          
          <!-- Header Placeholder -->
          <div class="bg-gray-300 h-[20px] rounded-md">
            <!-- Placeholder for Title -->
          </div>
          
          <!-- Body Content Placeholder -->
          <div class="flex flex-col lg:flex-row items-start lg:space-y-0 space-y-[10px] lg:items-center justify-between">
            
            <!-- Placeholder for Image and Text -->
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
              <div class="w-[40px] h-[20px] bg-gray-300 rounded-md"></div>
              <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
                <div class="w-[100px] h-[14px] bg-gray-300 rounded-md"></div>
                <div class="w-[120px] h-[14px] bg-gray-300 rounded-md"></div>
              </div>
            </div>
            
            <!-- Placeholder for Button -->
            <div>
              <div class="w-[100px] h-[30px] bg-gray-300 rounded-md"></div>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
      <!-- Placeholder for Animation and Image -->
      <div class="rtl:mr-auto ltr:ml-auto absolute rtl:left-0 rtl:transform rtl:scale-x-[-1] ltr:right-0 top-[119px] md:top-[60px] lg:top-[50px] ipad-max:w-1/4">
        <div class="absolute left-[25%] top-[125px] lg:top-[125px] lg:left-[25%] md:top-[55px] md:left-[20%] w-[39px] h-[32px] bg-gray-300 rounded-md">
          <!-- Placeholder for Animation -->
        </div>
        <div class="h-[300px] lg:h-[300px] md:h-[150px] lg:block hidden md:block bg-gray-300 rounded-md">
          <!-- Placeholder for Image -->
        </div>
      </div>
      
    </div>
    
    <section class="w-full mx-auto mt-[24px] ">
      <div class="flex flex-col" v-if="dataAvailable && !getSitesLoading"  >
        <div class="overflow-x-auto ">
          <div class="inline-block min-w-full align-middle ">
            <div
              class="flex flex-col justify-start rounded-[10px] pt-[12px] pb-[16px] mb-[16px] bg-white dark:bg-tamkinDarkPrimary "
              style="box-shadow: 0px 4px 24px 8px #51459f1a"
            >
              <div class="flex items-start justify-start lg:justify-between flex-row">
                <div
                  class="flex items-start rtl:space-x-reverse space-x-[16px] ltr:pl-[16px] rtl:pr-[16px] lg:w-auto w-full"
                >
                  <div
                    class="hover:bg-tamkinLight dark:hover:bg-tamkinEnd/60 px-[1px] p cursor-pointer"
                  >
                    <div
                      @click="switchTab('saved')"
                      :class="[
                        currentTab === 'saved'
                          ? 'border-b-[3px] border-tamkin  font-[600] '
                          : 'border-b-[3px] border-[#C5C5C5] dark:border-darkborder',
                      ]"
                      class="text-[14px] px-[4px] pb-[20px] pt-[16px] dark:text-whiteTamkin text-[#021328]"
                      style="line-height: 21px"
                    >
                      {{$t('My Sites')}} ( {{ notDeletedAppListLength }} )
                    </div>
                  </div>
                  <div
                    class="hover:bg-tamkinLight dark:hover:bg-tamkinEnd/60 px-[1px]  cursor-pointer"
                    @click="switchTab('deleted')"
                  >
                    <div
                      :class="[
                        currentTab === 'deleted'
                          ? 'border-b-[3px] border-tamkin  font-[600]'
                          : 'border-b-[3px] border-[#C5C5C5] dark:border-darkborder',
                      ]"
                      class="text-[14px] px-[4px] font-[400] pb-[20px] pt-[16px] dark:text-white text-[#021328]"
                      style="line-height: 21px"
                    >
                      {{$t('Deleted Sites')}} ( {{ deletedAppListLength }} )
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between lg:w-auto w-full">
                  <div class="py-[17px] search_input w-full lg:ltr:mr-[16px] lg:rtl:ml-[16px]">
                    <input
                      type="text"
                      class="input_dashboard_search w-full lg:w-[289px]"
                      v-model="search"
                      :placeholder="`${$t('Search')} ...`" 
                    />
                    <div
                      class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
                    >
                      <img src="/assets/imgs/icons/search.svg" />
                    </div>
                    <div
                      v-if="isSearchfilled"
                      @click="clearInput"
                      class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
                    >
                      <img src="/assets/imgs/icons/clear_search.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <table
                  v-loading="getSitesLoading"
                class="table-auto  divide-y divide-gray-200 dark:divide-darkborder"
                v-if="currentTab === 'saved' && paginatedFilteredAppList.length > 0"
              >
                <thead>
                  <tr class="h-[50px]">
                    <th
                      class="ltr:pl-[16px] rtl:pr-[16px] h-[50px] 
                      ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{$t('Sites URL')}}
                    </th>
                    <th
                      class="ltr:text-left lg:px-0 px-[100px] rtl:text-right   lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{$t('Billing')}}
                    </th>
                    <th
                      class="ltr:text-left lg:px-0 px-[100px] rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t('Package') }}
                    </th>
                    <th>
                      <div
                        class=" lg:px-0 px-[100px] w-full flex items-center justify-start rtl:space-x-reverse 
                        space-x-[6px] ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px]
                         text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                      >
                        <div>{{$t('Status')}}</div>
                        <div>
                          <span
                            class="tooltip left"
                            id="saveButton"
                            :title="$t('The status shows the code is installed, embedded, and services are now visible and operational')"
                          >
                            <span id="saveButton_label" class="">
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
                    </th>

                    <th
                      class=" ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{$t('Date')}}
                    </th>

                    <th>
                      <div
                        class="flex items-center lg:px-0 px-[100px] justify-center   rtl:space-x-reverse space-x-[6px] lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                      >
                        <div>{{$t('Traffic')}}</div>
                        <div>
                          <span
                            class="tooltip right"
                            id="saveButton"
                            :title="$t('Monthly page views: The value indicates either the peak month or annual average')"
                          >
                            <span id="saveButton_label" class="">
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
                    </th>
                    <th
                      class="lg:px-0 px-[100px] text-center lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ $t('Action') }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200">
                  <tr v-for="(app, index) in paginatedFilteredAppList" :key="index" class="h-[50px]">
                    <td class="w-[25%] ">
                      <div
                        class="h-[50px] flex items-center justify-start rtl:space-x-reverse space-x-[4px]
                         ipad-max:space-x-[10px] lg:space-x-[16px]
                        ipad-max:ltr:pl-[0px] ltr:pl-[18px] lg:ltr:pl-[18px] rtl:pr-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey
                          dark:text-whiteTamkin"
                      >
                        <a href="#" class="gap-3 h-[50px] flex items-center justify-start">
                          <img
                              src="/assets/imgs/icons/avatar_table.svg"
                              class="w-[20px] h-[20px] ipad-max:hidden lg:block hidden"
                          />
                          <div class="order-1"> {{ app.title }} </div>
                        </a>
                        <div
                            v-if="defaultApp.name === app.name"
                          class="order-1 flex items-center justify-center
                           text-white text-[10px] font-[500] leading-[15px] lg:w-[47px] h-[23px] rounded-[17px] p-[10px]"
                          style="
                            background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
                          "
                        >
                          {{ $t('Default') }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="capitalize lg:px-0 px-[100px]   text-[12px] lg:text-[14px] ltr:text-left rtl:text-right leading-[12px] lg:leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ $t(app.billing_duration) }}
                    </td>
                    <td
                      class="text-left text-[12px] lg:px-0 px-[100px] lg:text-[14px]
                       font-[400] text-darkGrey dark:text-whiteTamkin"
                    >
                    <div class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]">
                      <div class="w-[20px] h-[20px]">
                        <img
                          src="/assets/imgs/overview/prem_plan.svg"
                          class="w-[20px] h-[20px]"
                          alt=""
                        />
                      </div>
                      <div>{{$t('Premium')}}</div>
                    </div>
                    </td>

                    <td

                      class="  lg:px-0 px-[100px] mx-auto text-center text-darkGrey dark:text-whiteTamkin"
                    >
                      <div
                          v-if="app.status === 'active'"
                        style="
                          background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
                        "
                        class="rounded-[17px] border-[1px] flex items-center justify-center
                         border-[#71DAD2] h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                      >
                        {{ $t('Active') }}
                      </div>
                      <div
                          v-if="app.status === 'draft'"
                          style="
                          background: linear-gradient(#ffda10 0%, #FF5722 100%);
                        "
                          class="rounded-[17px] border-[1px] flex items-center justify-center
                         border-[#ffda10] h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                      >
                        {{ $t('Draft') }}
                      </div>
                    </td>

                    <td
                      class="  ltr:text-left 
                      rtl:text-right text-[12px] lg:text-[14px] leading-[24px] whitespace-nowrap lg:leading-[21px] font-[400] text-darkGrey
                       dark:text-whiteTamkin"
                    >
                      {{ new Date(app.creation).toDateString() }}
                    </td>

                    <td
                      class=" text-center rtl:pl-[36px] ltr:pr-[36px] text-[14px] leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ formatNumber(app.traffic) }}
                    </td>

                    <td
                      class="text-[14px] font-[400] text-darkGrey rtl:pr-[38px] mr-[0%]"
                    >
                      <div
                        class="flex items-center justify-center rtl:space-x-reverse space-x-[16px] ml-auto"
                      >
<!--                        <div class="hover:opacity-50">-->
<!--                          <img src="/assets/imgs/installed.svg" />-->
<!--                        </div>-->
                        <button @click="openDeleteMember(app.name)">
                          <svg
                            width="18"
                            height="17"
                            rviewBox="0 0 18 17"
                            class="dark:text-whiteTamkin text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- <tr class="bg-[#FAEBEB] h-[50px]">
                    <td class="w-[25%]">
                      <div
                        class="flex h-[50px] items-center justify-start rtl:space-x-reverse space-x-[4px] lg:space-x-[16px]
                         lg:ltr:pl-[18px] rtl:pr-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey
                          "
                      >
                        <img
                          src="/assets/imgs/icons/avatar_table.svg"
                          class="w-[20px] h-[20px] lg:block hidden"
                        />
                        <div class="order-1">Tamkin.App</div>
                        <div
                          class="order-1 flex items-center justify-center
                           text-white text-[10px] font-[500] leading-[15px] lg:w-[47px] h-[23px] rounded-[17px] p-[10px]"
                          style="
                            background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
                          "
                        >
                          Default
                        </div>
                      </div>
                    </td>
                    <td class="text-[14px] leading-[21px] font-[400] text-darkGrey lg:px-0 px-[100px] ">_</td>
                    <td class="text-left text-[14px] font-[400] text-darkGrey lg:px-0 px-[100px] ">
                      <div class="flex items-center justify-start space-x-[10px]">
                        <div class="w-[20px] h-[20px]">
                          <img
                            src="/assets/imgs/overview/prem_plan.svg"
                            class="w-[20px] h-[20px]"
                            alt=""
                          />
                        </div>
                        <div>Premium</div>
                      </div>
                    </td>

                    <td class="text-darkGrey ltr:text-left rtl:text-right lg:px-0 px-[100px] ">
                      <div class="text-[14px] font-[500] leading-[21px] text-[#DE4134] whitespace-nowrap">
                        Not installed
                      </div>
                    </td>

                    <td class="text-[14px] leading-[21px] font-[400] text-darkGrey whitespace-nowrap">
                      May 11 ,2024
                    </td>

                    <td
                      class="  w-full text-center pr-[36px] text-[14px] leading-[21px] font-[400] text-darkGrey"
                    >
                      8.35K
                    </td>

                    <td class="text-[14px] font-[400] text-darkGrey">
                      <div
                        class="flex items-center justify-center rtl:space-x-reverse space-x-[10px]"
                      >
                        <div class="hover:opacity-50">
                          <img src="/assets/imgs/install.svg" />
                        </div>
                        <div>
                          <svg
                            width="18"
                            height="17"
                            viewBox="0 0 18 17"
                            class="text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr> -->
                </tbody>
              </table>

              <table
                  v-loading="getSitesLoading"
                class="min-w-full divide-y divide-gray-200 dark:divide-darkborder"
                v-else-if="currentTab === 'deleted' && paginatedFilteredAppList.length > 0"
              >
                <thead>
                  <tr class="h-[50px]">
                    <th
                      class="px-4 h-[50px] ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t('Sites URL') }}
                    </th>

                    <!-- <th
                                            class="h-[50px] pr-[18px] text-right text-[15px] leading-[22.5px] font-[600] text-darkGrey flex items-center justify-end rtl:space-x-reverse space-x-[10px]">
                                            <div class="">Restore All</div>
                                            <div>
                                                <input type="checkbox" id="checkbox" class="peer sr-only m-auto"
                                                    v-model="checkAll" />
                                                <label for="checkbox"
                                                    class="relative block border-[1px] w-[18px] h-[18px]
                                                     border-lightGrey bg-whiteTamkin rounded-[4px] peer-checked:border-0 peer-checked:bg-gradient-checked">
                                                    <svg class="peer-checked:block absolute inset-0 m-auto w-4 h-4 text-white"
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </label>
                                            </div>
                                        </th> -->
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200 dark:divide-darkborder">
                  <tr  v-for="(app, index) in paginatedFilteredAppList" :key="index" class="h-[50px]">
                    <td
                      class="flex h-[50px] items-center justify-start rtl:space-x-reverse space-x-[10px] ltr:pl-[18px] 
                      rtl:pr-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                    >
                      <img src="/assets/imgs/app.svg" class="h-[20px] w-[20px]" />
                      <div class="order-1">
                        {{ app.title }}
                      </div>
                    </td>

                    <td
                      class="text-[14px] ltr:pr-[16px] rtl:pl-[16px] font-[400] dark:text-whiteTamkin text-darkGrey"
                    >
                      <button
                          @click="openRestoreApp(app.name)"
                        class="rtl:mr-auto ltr:ml-auto btn_bordered_dashboard normal_hover w-[108px] h-[31px] flex items-center justify-center"
                      >
                        {{ $t('Restore') }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <noresult class="!my-[30px]" v-loading="getSitesLoading" v-if="currentTab === 'saved' &&
               paginatedFilteredAppList.length=== 0 && appList.length !== 0 ||
                currentTab === 'deleted' && search && paginatedFilteredAppList.length === 0 &&  appList.length !== 0" />

              <NoData class="!mt-[30px] !mb-[-30px]"
               v-loading="getSitesLoading" v-if="currentTab === 'deleted' && paginatedFilteredAppList.length === 0 && 
               !search" 
              imgUrl="/assets/imgs/my-sites-no-data.svg" :text="$t('No sites have been deleted')" >
                <template #button>
                </template>
              </NoData>

              <NoData v-loading="getSitesLoading" 
              v-if="currentTab === 'saved' && paginatedFilteredAppList.length=== 0 && !search && appList.length === 0 "
              
              imgUrl="/assets/imgs/my-sites-no-data.svg" text="You don't have any sites now" >
                <template #button>
                  <NuxtLink to="/add-site" class="btn-dashboard-normal normal_hover text-[14px] leading-[24px] font-[500]">
                    {{$t('Add New Site')}}</NuxtLink>
                </template>
              </NoData>

            </div>
          </div>
        </div>
      </div>
      <div
      class="flex flex-col justify-start rounded-[10px] pt-[12px] pb-[16px] mb-[16px] bg-white dark:bg-tamkinDarkPrimary "
      style="box-shadow: 0px 4px 24px 8px #51459f1a" v-if="getSitesLoading"
    >
      <div class="relative overflow-x-auto w-full" >
        <table class="table-auto divide-y last:border-b dark:last:border-b-darkborder w-full divide-gray-200 dark:divide-darkborder">
          <thead>
            <tr>
              <th class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin rtl:pr-[8px] ltr:pl-[8px] rtl:lg:pr-[16px] ltr:lg:pl-[16px]">
                <div class="w-[100px] h-[20px] bg-gray-300 rounded animate-pulse"></div>
              </th>
              <th class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin">
                <div class="w-[200px] h-[20px] bg-gray-300 rounded animate-pulse"></div>
              </th>
              <th class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin">
                <div class="w-[150px] h-[20px] bg-gray-300 rounded animate-pulse"></div>
              </th>
              <th class="py-3.5 pr-[8px] text-center text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin">
                <div class="w-3/4 h-[20px] bg-gray-300 rounded animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200 dark:divide-darkborder w-full">
            <tr v-for="index in 2" :key="index">
              <td                   class="lg:pr-0 pr-[100px] rtl:lg:pr-[16px] ltr:lg:pl-[16px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
              >
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]">
                  <div class="w-[30px] h-[30px] bg-gray-300 rounded-full animate-pulse" ></div>
                  <div class="w-[150px] h-[20px] bg-gray-300 rounded animate-pulse"></div>
                </div>
              </td>
              <td class="py-4 ltr:text-left rtl:text-right text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin">
                <div class="w-[200px] h-[20px] bg-gray-300 rounded animate-pulse "></div>
              </td>
              <td class="py-4 text-center text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin">
                <div class="w-[150px] h-[20px] bg-gray-300 rounded animate-pulse"></div>
              </td>
              <td class="py-4 text-center text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin">
                <div class="w-[90px] h-[20px] bg-gray-300 rounded animate-pulse"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div class="flex flex-col " v-if="!dataAvailable && !getSitesLoading">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full align-middle md:px-6 lg:px-8">
            <div
              class="flex flex-col items-between justify-center rounded-[10px] pb-[42px] mb-[16px] dark:bg-tamkinDarkPrimary bg-white"
              style="box-shadow: 0px 4px 24px 8px #51459f1a"
            >
              <div class="flex items-center justify-center lg:justify-between flex-row">
                <div
                  class="flex items-center rtl:space-x-reverse space-x-[16px] ltr:pl-[16px] rtl:pr-[16px]"
                >
                  <div class="hover:bg-tamkinLight px-[1px] cursor-pointer">
                    <div
                      @click="switchTab('saved')"
                      class="text-[14px] border-b-[3px] border-tamkin px-[4px] font-[600] pb-[16px] text-[#021328]"
                      style="line-height: 21px"
                    >
                      {{ $t('My Sites') }}
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between ltr:pr-[16px] rtl:pl-[16px] w-2/4"
                >
                  <div class="py-[17px] search_input w-full ltr:mr-[16px] rtl:ml-[16px]">
                    <input
                      type="text"
                      class="input_dashboard_search w-full"
                      v-model="search"
                      :placeholder="`${$t('Search')} ...`" 
                    />
                    <div
                      class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
                    >
                      <img src="/assets/imgs/icons/search.svg" />
                    </div>
                    <div
                      v-if="isSearchfilled"
                      @click="clearInput"
                      class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
                    >
                      <img src="/assets/imgs/icons/clear_search.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <table class="min-w-full divide-y divide-gray-200">
                <div class="flex items-center justify-center h-[188px] mt-[74px]">
                  <div class="flex flex-col items-center justify-center space-y-[12px]">
                    <div>
                      <img src="/assets/imgs/no_sites.svg" />
                    </div>
                    <div class="mx-auto">
                      <h2 class="text-[15px] leading-[22.5px] font-[400] text-darkGrey">
                        {{ $t(`You don't have any sites now`) }}
                      </h2>
                      <div class="w-[140px] mt-[40px] mx-auto">
                        <button
                          @click="modalStore.controlSelectSiteModal"
                          class="btn-dashboard hover_tamkin text-[16px] mx-auto leading-[24px] font-[500]"
                        >
                          {{ $t('Add New Site') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    
      
      
     
      <div class="flex flex-col lg:flex-row md:flex-row justify-between items-center pb-[16px]" v-if="paginatedFilteredAppList.length > 0">
        <div class="flex items-center rtl:space-x-reverse space-x-2 mb-4 lg:mb-0">
          <span class="dark:text-whiteTamkin text-darkGrey text-[13px] leading-[21px] font-[400]">
           {{ $t('Per Page') }}
          </span>
          <div class="flex space-x-2 rtl:space-x-reverse">
            <button
              v-for="option in perPageOptions"
              :key="option"
              :style="perPage === option ? 'background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);' : ''"
              :class="[
                'px-3 py-1 rounded-md text-white focus:outline-none !text-[13px]',
                perPage === option ? '' : 'bg-[#A7A7A7] hover:bg-lightGrey',
              ]"
              @click="changePerPage(option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div class="flex items-center rtl:space-x-reverse space-x-2">
          <span class="text-darkGrey dark:text-whiteTamkin text-[13px] leading-[21px] font-[400]">
            {{$t('Page')}}
          </span>
          <button
            @click="prevPage"
            class="p-[4px] rounded-md bg-transparent !text-[13px] dark:text-whiteTamkin text-darkGrey hover:bg-light-grey"
            :disabled="currentPage === 1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              class="rtl:rotate-180"

              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.9254 4.55806C13.1915 4.80214 13.1915 5.19786 12.9254 5.44194L8.4375 9.55806C8.17138 9.80214 8.17138 10.1979 8.4375 10.4419L12.9254 14.5581C13.1915 14.8021 13.1915 15.1979 12.9254 15.4419C12.6593 15.686 12.2278 15.686 11.9617 15.4419L7.47378 11.3258C6.67541 10.5936 6.67541 9.40641 7.47378 8.67418L11.9617 4.55806C12.2278 4.31398 12.6593 4.31398 12.9254 4.55806Z"
                class="fill-[#585B5B] dark:fill-whiteTamkin"
              />
            </svg>
          </button>
          <div class="flex space-x-2 rtl:space-x-reverse">
            <button
              v-for="page in visiblePages"
              :key="page"
              :style="currentPage === page ? 'background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);' : ''"
              :class="[
                'px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin focus:outline-none flex items-center justify-center',
                currentPage === page ? 'text-white' : 'hover:bg-light-grey',
              ]"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button
            @click="nextPage"
            class="p-[4px] rounded-md bg-transparent text-darkGrey dark:text-whiteTamkin hover:bg-light-grey"
            :disabled="currentPage === totalPages"
          >
            <svg
              width="20"
              height="20"
              class="rtl:rotate-180"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.07459 15.4419C6.80847 15.1979 6.80847 14.8021 7.07459 14.5581L11.5625 10.4419C11.8286 10.1979 11.8286 9.80214 11.5625 9.55806L7.07459 5.44194C6.80847 5.19786 6.80847 4.80214 7.07459 4.55806C7.34072 4.31398 7.77219 4.31398 8.03831 4.55806L12.5262 8.67418C13.3246 9.40641 13.3246 10.5936 12.5262 11.3258L8.03831 15.4419C7.77219 15.686 7.34072 15.686 7.07459 15.4419Z"
                class="fill-[#585B5B] dark:fill-whiteTamkin"
              />
            </svg>
          </button>
        </div>
      </div>
      
    </section>
  </div>
</template>
