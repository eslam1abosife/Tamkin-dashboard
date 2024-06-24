<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
import { useModalStore } from "@/stores/modal";
const { isMobile, isMobileOrTablet } = useDevice();
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
const modalStore = useModalStore();
const { showShareModal,editPictureTeamModal,editPermissionsModal,inviteMemberModal ,selectSiteModal,editUserModal} = storeToRefs(modalStore);

const { width, height } = useWindowSize();
const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
});
const htmlAttrs = computed(() => head.value.htmlAttrs!);

const isSearchfilled = ref(false);
const search = ref("");
const sideBarOpen = ref(true);
const sideBarOpenMobile = ref(false);

function toggleSidebar() {
  sideBarOpen.value = !sideBarOpen.value;
}
function toggleSidebarMobile() {
  sideBarOpenMobile.value = !sideBarOpenMobile.value;
}
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});

watchEffect(() => {
  if (width.value < 1000) {
    sideBarOpen.value = true;
  }
});

const clearInput = () => {
  search.value = "";
};
</script>

<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <div
      class="bg_dashboard relative  min-h-screen"
      :class="[
        !sideBarOpen
          ? 'lg:grid lg:grid-cols-[100px_1fr]'
          : 'lg:grid lg:grid-cols-[3fr_9fr]',
      ]"
    >
    <!--  -->
    
      <div
     v-if="showShareModal || editPictureTeamModal || editPermissionsModal || inviteMemberModal || selectSiteModal || editUserModal"
        class="absolute z-[999] bg-black bg-opacity-70 h-full w-full overflow-hidden">
    </div>
      <DashboardTeamEditUserModal :showModal="editUserModal"/>

      <DashboardEmbedShareModal :showModal="showShareModal" />
<DashboardTeamEditTeamPictureModal :showModal="editPictureTeamModal"/>
<DashboardTeamInviteMember :showModal="inviteMemberModal"/>
<DashboardMySiteSelectSiteModal :showModal="selectSiteModal"/>

  <DashboardTeamEditUserPermissionsModal :showModal="editPermissionsModal"/>

  <!-- <DashboardMySiteUpgradeModal/> -->
      <div
      
        class="flex-1 lg:relative flex items-center justify-start flex-col bg-[#FFFEFE] z-[100]  border-r border-[1px] border-lightGrey"
        :class="[
          sideBarOpenMobile
            ? 'fixed inset-0 z-[9999] w-full h-screen '
            : 'hidden lg:flex',
        ]"
      >
        <div
          @click="toggleSidebar"
          :class="[
            !sideBarOpen
              ? 'left-[80px] rotate-180 lg:!top-[140px] 2xl:!top-[130px]'
              : 'lg:!top-[170px] 2xl:!top-[160px]',
          ]"
          class="close_sidebar_btn group z-[300] lg:flex hidden"
        >
          <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            class="fill-tamkin group-hover:stroke-white group-hover:fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
            />
          </svg>
        </div>
        <div class="overflow-y-auto no-scrollbar " >
          <DashboardNavbar
            :sideBarOpen="sideBarOpen"
            :mobileSidebar="sideBarOpenMobile"
            @toggleSidebarMobile="toggleSidebarMobile"
            @toggleSidebar="toggleSidebar"
          />
        </div>
      </div>

      <div
        class="flex items-start lg:flex-row flex-col justify-center lg:justify-between relative w-full"
      >
        <!-- upper nav and content -->
        <div class="relative top-0 w-full">
          <nav
          style="box-shadow: 0px 4px 24px 8px #51459F14;

"
            class="absolute  top-0 flex  z-[10] flex-shrink-0 items-center justify-around lg:justify-between w-full
             bg-[#FFFEFE]  pl-[26px] space-x-[16px]"
          >
            <div
              class="flex items-center justify-between space-x-[10px] lg:hidden"
              @click="toggleSidebarMobile"
            >
              <svg
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
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </div>
            <div class="w-full lg:w-3/6">
              <div class="py-[17px] search_input">
                <input
                  type="text"
                  class="input_dashboard_search w-full"
                  v-model="search"
                  placeholder="Search ..."
                />
                <div
                  class="absolute top-[40%] lg:left-0 left-[10px] lg:top-[16px] lg:p-[16px]"
                >
                  <img src="/assets/imgs/icons/search.svg" alt="" />
                </div>
                <div
                  v-if="isSearchfilled"
                  @click="clearInput"
                  class="absolute top-[12px] lg:top-[16px] right-0 p-[16px] cursor-pointer"
                >
                  <img src="/assets/imgs/icons/clear_search.svg" alt="" />
                </div>
              </div>
            </div>
            <div class="flex items-center lg:justify-end  justify-center lg:ml-auto space-x-[24px] lg:space-x-[43px] ">
              <div
                class="flex items-center justify-center border-[1px] border-[#EAEAEA] active_notification rounded-[8px] bg-[#FFFEFE]  w-[48px] h-[48px]"
              >
                <div class="relative stroke-current text-darkGrey">
                  <div
                    class="absolute bottom-[10px] ltr:left-[5px] rtl:right-[5px] bg-[#FB726D] w-[24px] h-[24px] rounded-full flex items-center justify-center"
                  >
                    <span
                      class="text-[12px] font-[700] text-white"
                      style="line-height: 68px"
                      >5</span
                    >
                  </div>
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    class="active_bell"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.7295 20C11.5537 20.3031 11.3014 20.5547 10.9978 20.7295C10.6941 20.9044 10.3499 20.9965 9.99953 20.9965C9.64915 20.9965 9.30492 20.9044 9.0013 20.7295C8.69769 20.5547 8.44534 20.3031 8.26953 20"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex items-center justify-center lg:space-x-[18px] lg:pr-[37px] ">
                <div class="lg:block hidden">
                  <img
                    src="/assets//imgs/avatar.png"
                    class="w-[50px] h-[50px]"
                    alt=""
                  />
                </div>
                <div class="lg:block hidden">
                  <h2
                    class="font-[400] text-[12px]"
                    style="line-height: 14.4px"
                  >
                    Ali Ahmed
                  </h2>
                </div>
                <div class="lg:block hidden">
                  <img src="/assets/imgs/arrow.svg" alt="" />
                </div>
              </div>
            </div>
          </nav>
          <div class="pt-[90px] w-full px-[10px] lg:px-[40px] lg:flex-grow-0">
            <NuxtPage />
          </div>
        </div>
        <!-- end of upper nav and content -->
      </div>
    </div>
  </Html>
</template>
