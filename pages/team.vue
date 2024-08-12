<script lang="ts" setup>
import { useModalManager } from "@/composables/useModalManager";

import banner from "/assets/imgs/gradient_embded.png";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import {
  useGetAllMembers,
  useGetCurrentTeam,
  useGetTeamCountMembers,
  useResendInvite,
} from "@/composables/useTeam";

const { currTeam, getCurrentTeam } = useGetCurrentTeam();
const { teamMembers, getAllTeamMember } = useGetAllMembers();
const { getTeamCountMembers, countMembers } = useGetTeamCountMembers();

onMounted(async () => {
  if (!currTeam.value) {
    await getCurrentTeam();
  }
  getAllTeamMember(currTeam.value.agency, currentPage.value, perPage.value);
  getTeamCountMembers(currTeam.value.agency);
});

const state = reactive({
  teamName: "",
});
const rules = {
  teamName: { required },
};
const v$ = useVuelidate(state, rules);
definePageMeta({
  layout: "dashboard",
});

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

const editTeamNameMode = ref(false);

const isSearchFilled = ref(false);
const search = ref('');
watch(search, (newValue) => {
  isSearchFilled.value = newValue.length > 0;
  currentPage.value = 1;
});
const clearInput = () => {
  search.value = '';
};

const reInvite = ref(false);
const reinviteUser = (email) => {
  const { resendInvite } = useResendInvite(email);
  resendInvite(() => {
    reInvite.value = true;
  });
};

watch(reInvite, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      reInvite.value = false;
    }, 2000);
  }
});

const dataAvailable = ref(true);

const perPageOptions = ref([5, 10, 20]); // Modify perPageOptions to include 5 items per page
const perPage = ref(perPageOptions.value[0]);
const currentPage = ref(1);

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

const editDonePicture = ref(false);
</script>

<template>
  <div class="relative">
    <DashboardToastSuccess
      v-if="reInvite"
      :hideIn="2000"
      :message="'Re-sent successfully'"
      class="!top-[70px]"
    />

    <div class="space-y-[10px]">
      <h1
        class="ltr:text-left rtl:text-right text-[18px] leading-[36px] font-[600] dark:text-whiteTamkin"
      >
        Team Management
      </h1>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] leading-[22.5px] text-darkGrey dark:text-whiteTamkin/90"
      >
        Manage your team and their account permissions here
      </h2>
    </div>

    <div
      class="mt-[44px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row md:flex-row md:space-y-0 flex-col justify-center lg:justify-start lg:rtl:space-x-reverse space-x-[16px]"
    >
      <div
        class="flex items-center justify-between flex-row rtl:space-x-reverse space-x-[24px] px-[16px] py-[23px] w-full dark:bg-tamkinDarkPrimary bg-white h-[108px] rounded-[10px] border-[1px] border-lightGrey dark:border-darkborder"
      >
        <div
          class="flex items-center justify-start rtl:space-x-reverse space-x-[20px] w-full"
        >
          <div v-if="!editDonePicture">
            <div
              class="w-[30px] h-[30px] ipad-max:w-[30px] ipad-max:h-[30px] lg:w-[65px] lg:h-[65px] bg-tamkin rounded-full flex items-center justify-center cursor-pointer"
              @click="openModal('editteampic', 'team')"
            >
              <svg
                width="27"
                height="24"
                viewBox="0 0 27 24"
                class="lg:w-[32px] lg:h-[32px] w-[15px] h-[15px] ipad-max:w-[15px] ipad-max:h-[15px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5 3.5H20.035L18.3312 0.945C18.24 0.80819 18.1164 0.696004 17.9714 0.618382C17.8264 0.54076 17.6645 0.500099 17.5 0.5H9.5C9.33554 0.500099 9.17363 0.54076 9.02864 0.618382C8.88364 0.696004 8.76003 0.80819 8.66875 0.945L6.96375 3.5H3.5C2.70435 3.5 1.94129 3.81607 1.37868 4.37868C0.816071 4.94129 0.5 5.70435 0.5 6.5V20.5C0.5 21.2956 0.816071 22.0587 1.37868 22.6213C1.94129 23.1839 2.70435 23.5 3.5 23.5H23.5C24.2956 23.5 25.0587 23.1839 25.6213 22.6213C26.1839 22.0587 26.5 21.2956 26.5 20.5V6.5C26.5 5.70435 26.1839 4.94129 25.6213 4.37868C25.0587 3.81607 24.2956 3.5 23.5 3.5ZM24.5 20.5C24.5 20.7652 24.3946 21.0196 24.2071 21.2071C24.0196 21.3946 23.7652 21.5 23.5 21.5H3.5C3.23478 21.5 2.98043 21.3946 2.79289 21.2071C2.60536 21.0196 2.5 20.7652 2.5 20.5V6.5C2.5 6.23478 2.60536 5.98043 2.79289 5.79289C2.98043 5.60536 3.23478 5.5 3.5 5.5H7.5C7.66468 5.50011 7.82683 5.45954 7.97206 5.38191C8.11729 5.30428 8.2411 5.19199 8.3325 5.055L10.035 2.5H16.9638L18.6675 5.055C18.7589 5.19199 18.8827 5.30428 19.0279 5.38191C19.1732 5.45954 19.3353 5.50011 19.5 5.5H23.5C23.7652 5.5 24.0196 5.60536 24.2071 5.79289C24.3946 5.98043 24.5 6.23478 24.5 6.5V20.5ZM13.5 7.5C12.4122 7.5 11.3488 7.82257 10.4444 8.42692C9.53989 9.03127 8.83494 9.89025 8.41866 10.8952C8.00238 11.9002 7.89346 13.0061 8.10568 14.073C8.3179 15.1399 8.84172 16.1199 9.61091 16.8891C10.3801 17.6583 11.3601 18.1821 12.427 18.3943C13.4939 18.6065 14.5998 18.4976 15.6048 18.0813C16.6098 17.6651 17.4687 16.9601 18.0731 16.0556C18.6774 15.1512 19 14.0878 19 13C18.9983 11.5418 18.4184 10.1438 17.3873 9.11274C16.3562 8.08165 14.9582 7.50165 13.5 7.5ZM13.5 16.5C12.8078 16.5 12.1311 16.2947 11.5555 15.9101C10.9799 15.5256 10.5313 14.9789 10.2664 14.3394C10.0015 13.6999 9.9322 12.9961 10.0673 12.3172C10.2023 11.6383 10.5356 11.0146 11.0251 10.5251C11.5146 10.0356 12.1383 9.7023 12.8172 9.56725C13.4961 9.4322 14.1999 9.50151 14.8394 9.76642C15.4789 10.0313 16.0256 10.4799 16.4101 11.0555C16.7947 11.6311 17 12.3078 17 13C17 13.9283 16.6313 14.8185 15.9749 15.4749C15.3185 16.1313 14.4283 16.5 13.5 16.5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div class="" v-else>
            <div
              class="w-[55px] h-[55px] bg-tamkin rounded-full flex items-center justify-center cursor-pointer"
            >
              <div class="relative">
                <img src="/assets/imgs/avatar.png" />
                <div
                  @click="openModal('editteampic', 'team')"
                  class="cursor-pointer absolute bottom-0 right-0 w-[20px] h-[20px] bg-white dark:bg-tamkinDarkPrimary rounded-full border-[1px] border-[#2CA9A0] flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-[10px] h-[10px] text-[#021328] dark:text-whiteTamkin"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!editTeamNameMode" class="w-full">
            <h1
              class="font-[500] text-[13px] leading-[19.5px] text-darkGrey dark:text-whiteTamkin"
            >
              Your team name <br />
              <span class="font-bold" v-if="currTeam"> {{ currTeam.team_name }} </span>
            </h1>
          </div>
          <div v-else class="flex-grow w-full">
            <div class="relative">
              <input
                type="text"
                placeholder="{{$t('Your team name')}}"
                id="teamName"
                class="input_floating_label peer w-full"
                v-model="v$.teamName.$model"
                :class="{
                  input_error: v$.teamName.$error && v$.teamName.required.$invalid,
                  input_success: !v$.teamName.$error && !v$.teamName.$invalid,
                }"
              />
              <label
                for="teamName"
                class="floating_label"
                :class="[
                  v$.teamName.$error && v$.teamName.required.$invalid
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("Your team name") }}*
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="v$.teamName.$error && v$.teamName.required.$invalid"
              >
                <div class="error_message">
                  <span v-if="v$.teamName.$error && v$.teamName.required.$invalid">{{
                    $t("teamName_is_required")
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center flex-shrink-0">
          <div v-if="!editTeamNameMode">
            <button
              @click="() => (editTeamNameMode = !editTeamNameMode)"
              class="btn_bordered_dashboard font-[500] text-[13px] leading-[22.5px]"
            >
              Edit Team
            </button>
          </div>
          <div v-else class="lg:w-1/4 rtl:ml-[29px] ltr:mr-[29px]">
            <button
              @click="editTeamNameMode = !editTeamNameMode"
              class="btn_bordered_dashboard"
            >
              save
            </button>
          </div>
        </div>
      </div>

      <div
        :style="{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${banner})`,
        }"
        style="
          box-shadow: 0px 4px 24px 8px #51459f14;
          padding: 30px, 16px, 30px, 16px;
          background-size: cover;
        "
        class="w-full flex items-center justify-between rtl:space-x-reverse space-x-[30px] px-[16px] py-[23px] dark:bg-tamkinDarkPrimary bg-white h-[108px] rounded-[10px] border-[1px] border-lightGrey dark:border-darkborder"
      >
        <div>
          <img src="/assets/imgs/icons/team_members.svg" />
        </div>
        <div class="flex flex-col items-center justify-center text-darkGrey">
          <div class="">
            <h1 class="font-[600] text-[15px] lg:leading-[22.5px] text-center">
              Total Member
            </h1>
          </div>
          <div class="">
            <h1 class="font-[500] text-[15px] leading-[22.5px]">{{ countMembers }}</h1>
          </div>
        </div>
        <div
          class="bg-white dark:bg-tamkinDarkPrimary w-[63px] h-[48px] border-[0.5px] border-[#48D916] rounded-[9px] p-[10px] text-[#48D916] flex flex-col items-center justify-center"
        >
          <div>
            <h1 class="text-[11px] font-[500] leading-[16px]">Active</h1>
          </div>
          <div>
            <h1 class="text-[16px] font-[500] leading-[18px]" v-if="teamMembers && teamMembers.length > 0"> {{ teamMembers.filter(ele => ele.is_active).length }} </h1>
          </div>
        </div>
        <div
          class="bg-white dark:bg-tamkinDarkPrimary w-[63px] h-[48px] border-[0.5px] border-[#EA4335] rounded-[9px] p-[10px] text-[#EA4335] flex flex-col items-center justify-center"
        >
          <div>
            <h1 class="text-[11px] font-[500] leading-[16px]">Pending</h1>
          </div>
          <div>
            <h1 class="text-[16px] font-[500] leading-[18px]" v-if="teamMembers && teamMembers.length > 0">{{ teamMembers.filter(ele => !ele.is_active).length }}</h1>
          </div>
        </div>
      </div>
    </div>

    <section class="mx-auto mt-[24px]">
      <div
        class="flex flex-col items-start justify-center rounded-[10px] pb-[42px] bg-white dark:bg-tamkinDarkPrimary overflow-auto"
        style="box-shadow: 0px 4px 24px 8px #51459f1a"
      >
        <div class="flex items-center justify-between lg:flex-nowrap flex-wrap w-full">
          <div class="p-[16px]">
            <div
              class="text-[16px] font-[600] py-[24px] text-[#021328] dark:text-whiteTamkin"
              style="line-height: 30px"
            >
              All Members
            </div>
          </div>

          <div
            class="flex items-center justify-between lg:justify-evenly px-[16px] space-x-[10px]"
          >
            <div class="py-[17px] search_input">
              <input
                type="text"
                class="input_dashboard_search w-full"
                v-model="search"
                placeholder="Search ..."
              />
              <div
                class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
              >
                <img src="/assets/imgs/icons/search.svg" />
              </div>
              <div
                v-if="isSearchfilled"
                @click="clearInput"
                class="absolute top-[12px] lg:top-[16px] right-0 p-[16px] cursor-pointer"
              >
                <img src="/assets/imgs/icons/clear_search.svg" />
              </div>
            </div>
            <div class="lg:w-[250px] w-2/4">
              <button
                class="btn-dashboard hover_tamkin !h-[45px]"
                @click="openModal('invitemember')"
              >
                Invite Member
              </button>
            </div>
          </div>
        </div>
        <table
          class="table-auto divide-y last:border-b dark:last:border-b-darkborder w-full divide-gray-200 dark:divide-darkborder"
        >
          <thead class="w-full">
            <tr class="">
              <th
                class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] rtl:pr-[8px] ltr:pl-[8px] rtl:lg:pr-[16px] dark:text-whiteTamkin ltr:lg:pl-[16px] text-darkGrey"
              >
                Name
              </th>
              <th
                class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
              >
                Email
              </th>
              <th
                class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
              >
                Permissions
              </th>
              <th
                class="py-3.5 pr-[8px] text-center text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200 dark:divide-darkborder w-full"
          >
            <tr class="" v-for="(member, index) in teamMembers" :key="index">
              <td
                class="lg:pr-0 pr-[100px] rtl:lg:pr-[16px] ltr:lg:pl-[16px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
              >
                <div
                  class="flex items-center justify-start space-x-[10px] lg:space-x-[16px] rtl:space-x-reverse"
                >
                  <div class="inline">
                    <img
                      src="/assets/imgs/icons/avatar_table.svg"
                      class="lg:h-full h-[30px] mt-3 hidden lg:block md:hidden"
                    />
                  </div>
                  <div
                    class="lg:order-1 order-2 lg:py-0 whitespace-nowrap cursor-pointer"
                    @click="openModal('editname', 'team')"
                  >
                    Ali Ahmed
                  </div>
                  <div
                    class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] h-[23px] rounded-[17px] p-[10px]"
                    style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
                  >
                    {{ member.owner }}
                  </div>
                </div>
              </td>
              <td
                class="py-4 ltr:text-left lg:pr-0 pr-[100px] whitespace-nowrap rtl:text-right text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
              >
                <p>{{ member.member_email }}</p>
              </td>
              <td
                class="py-4 text-center text-[14px] lg:pr-0 pr-[100px] whitespace-nowrap font-[400] text-darkGrey dark:text-whiteTamkin"
              >
                <div class="flex items-center justify-start">
                  <button
                    @click="openModal('userpermissions', 'team')"
                    class="flex items-center rtl:space-x-reverse space-x-[10px] bg-transparent underline focus:outline-none"
                  >
                    <div>Permissions</div>
                    <img src="/assets/imgs/icons/arow_down.svg" />
                  </button>
                </div>
              </td>

              <td class="text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin">
                <div
                  class="flex items-center justify-center rtl:space-x-reverse space-x-[16px] rtl:pr-[32px] lt:pl-[32px]"
                >
                  <div @click="reinviteUser(member.member_email)">
                    <svg
                      width="22"
                      height="20"
                      class="text-[#8C8C8C]  cursor-pointer"
                      :class="!member.is_active ? `hover:text-tamkin` : null"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 0.5C0.89 0.5 0 1.39 0 2.5V14.5C0 15.0304 0.210714 15.5391 0.585786 15.9142C0.960859 16.2893 1.46957 16.5 2 16.5H12.5C12.1699 15.7078 12 14.8582 12 14C12 12.2761 12.6848 10.6228 13.9038 9.40381C15.1228 8.18482 16.7761 7.5 18.5 7.5C19.0053 7.50149 19.5087 7.5619 20 7.68V2.5C20 1.96957 19.7893 1.46086 19.4142 1.08579C19.0391 0.710714 18.5304 0.5 18 0.5H2ZM2 2.5L10 7.5L18 2.5V4.5L10 9.5L2 4.5V2.5ZM18 8.5L15.75 10.75L18 13V11.5C18.663 11.5 19.2989 11.7634 19.7678 12.2322C20.2366 12.7011 20.5 13.337 20.5 14C20.5 14.4 20.41 14.78 20.24 15.12L21.33 16.21C21.75 15.58 22 14.82 22 14C22 11.79 20.21 10 18 10V8.5ZM14.67 11.79C14.25 12.42 14 13.18 14 14C14 16.21 15.79 18 18 18V19.5L20.25 17.25L18 15V16.5C17.337 16.5 16.7011 16.2366 16.2322 15.7678C15.7634 15.2989 15.5 14.663 15.5 14C15.5 13.6 15.59 13.22 15.76 12.88L14.67 11.79Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <div>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      class="text-[#8C8C8C] hover:text-[#2DADA3] cursor-pointer"
                      @click="openModal('editusermodal', 'team')"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 18H15C15.2652 18 15.5196 18.1054 15.7071 18.2929C15.8946 18.4804 16 18.7348 16 19C16 19.2652 15.8946 19.5196 15.7071 19.7071C15.5196 19.8946 15.2652 20 15 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19C0 18.7348 0.105357 18.4804 0.292893 18.2929C0.48043 18.1054 0.734784 18 1 18ZM0 13L10 3L13 6L3 16H0V13ZM11 2L13 0L16 3L13.999 5.001L11 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div @click="openDeleteMember(member.member_email)">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.52941 4.70588C3.52941 3.4578 4.02521 2.26085 4.90773 1.37832C5.79026 0.495797 6.98722 0 8.23529 0C9.48337 0 10.6803 0.495797 11.5629 1.37832C12.4454 2.26085 12.9412 3.4578 12.9412 4.70588C12.9412 5.95396 12.4454 7.15092 11.5629 8.03344C10.6803 8.91597 9.48337 9.41177 8.23529 9.41177C6.98722 9.41177 5.79026 8.91597 4.90773 8.03344C4.02521 7.15092 3.52941 5.95396 3.52941 4.70588ZM0 12.9412C0 11.6318 1.06235 10.5882 2.36353 10.5882H9.71412C8.75628 11.7465 8.2332 13.2029 8.23529 14.7059C8.23529 16.2388 8.76824 17.6471 9.65882 18.7565C9.19373 18.8012 8.71922 18.8235 8.23529 18.8235C6.05294 18.8235 4.02 18.3694 2.51177 17.4082C0.98 16.4318 0 14.9294 0 12.9412ZM20 14.7059C20 16.11 19.4422 17.4565 18.4494 18.4494C17.4565 19.4422 16.11 20 14.7059 20C13.3018 20 11.9552 19.4422 10.9624 18.4494C9.96954 17.4565 9.41177 16.11 9.41177 14.7059C9.41177 13.3018 9.96954 11.9552 10.9624 10.9624C11.9552 9.96954 13.3018 9.41177 14.7059 9.41177C16.11 9.41177 17.4565 9.96954 18.4494 10.9624C19.4422 11.9552 20 13.3018 20 14.7059ZM16.8871 13.3576C16.9975 13.2472 17.0596 13.0974 17.0596 12.9412C17.0596 12.785 16.9975 12.6352 16.8871 12.5247C16.7766 12.4143 16.6268 12.3522 16.4706 12.3522C16.3144 12.3522 16.1646 12.4143 16.0541 12.5247L14.7059 13.8741L13.3576 12.5247C13.2472 12.4143 13.0974 12.3522 12.9412 12.3522C12.785 12.3522 12.6352 12.4143 12.5247 12.5247C12.4143 12.6352 12.3522 12.785 12.3522 12.9412C12.3522 13.0974 12.4143 13.2472 12.5247 13.3576L13.8741 14.7059L12.5247 16.0541C12.47 16.1088 12.4266 16.1737 12.397 16.2452C12.3674 16.3167 12.3522 16.3932 12.3522 16.4706C12.3522 16.5479 12.3674 16.6245 12.397 16.696C12.4266 16.7674 12.47 16.8324 12.5247 16.8871C12.5794 16.9418 12.6443 16.9851 12.7158 17.0147C12.7872 17.0443 12.8638 17.0596 12.9412 17.0596C13.0185 17.0596 13.0951 17.0443 13.1666 17.0147C13.238 16.9851 13.303 16.9418 13.3576 16.8871L14.7059 15.5376L16.0541 16.8871C16.1088 16.9418 16.1737 16.9851 16.2452 17.0147C16.3167 17.0443 16.3932 17.0596 16.4706 17.0596C16.5479 17.0596 16.6245 17.0443 16.696 17.0147C16.7674 16.9851 16.8324 16.9418 16.8871 16.8871C16.9418 16.8324 16.9851 16.7674 17.0147 16.696C17.0443 16.6245 17.0596 16.5479 17.0596 16.4706C17.0596 16.3932 17.0443 16.3167 17.0147 16.2452C16.9851 16.1737 16.9418 16.1088 16.8871 16.0541L15.5376 14.7059L16.8871 13.3576Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="py-[4px]" v-if="!dataAvailable"></div>
      <div
        class="flex flex-col lg:flex-row md:flex-row justify-between items-center py-[16px]"
        v-if="dataAvailable"
      >
        <div class="flex items-center rtl:space-x-reverse space-x-2 mb-4 lg:mb-0">
          <span
            class="dark:text-whiteTamkin text-darkGrey text-[13px] leading-[21px] font-[400]"
          >
            Per Page
          </span>
          <div class="flex space-x-2 rtl:space-x-reverse">
            <button
              v-for="option in perPageOptions"
              :key="option"
              :style="
                perPage === option
                  ? 'background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);'
                  : ''
              "
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
          <span
            class="text-darkGrey dark:text-whiteTamkin text-[13px] leading-[21px] font-[400]"
          >
            Page
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
          <div v-if="teamMembers" class="flex space-x-2 rtl:space-x-reverse">
            <button
              v-for="page in visiblePages"
              :key="page"
              :style="
                currentPage === page
                  ? 'background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);'
                  : ''
              "
              :class="[
                'px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin focus:outline-none flex items-center justify-center',
                currentPage === i ? 'text-white' : 'hover:bg-light-grey',
              ]"
              @click="goToPage(i)"
            >
              {{ i }}
            </button>
          </div>
          <button
            @click="nextPage"
            class="p-[4px] rounded-md bg-transparent text-darkGrey dark:text-whiteTamkin hover:bg-light-grey"
            :disabled="currentPage === teamMembers.length / perPage"
          >
            <svg
              width="20"
              height="20"
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
