<script lang="ts" setup>
import banner from "assets/imgs/gradient_embded.png";
import { useModalStore } from "@/stores/modal";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
definePageMeta({
  layout: "dashboard",
});
const state = reactive({
  teamName: "",
});
const rules = {
  teamName: { required },
};

const v$ = useVuelidate(rules, state);
const modalStore = useModalStore();

const editTeamNameMode = ref(false);

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
</script>

<template>
  <div class="mt-[23px]">
    <div class="space-y-[10px]">
      <h1 class="text-left text-[24px] leading-[36px] font-[600]">
        Team Management
      </h1>

      <h2
        class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey"
      >
        Manage your team and their account permissions here
      </h2>
    </div>

    <div
      class="mt-[44px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col justify-center lg:justify-start lg:space-x-[16px]"
    >
      <div
        class="flex items-center justify-between flex-row space-x-[24px] px-[16px] py-[23px] w-full bg-white h-[108px] rounded-[10px] border-[1px] border-lightGrey"
      >
      <div class="flex items-center justify-center space-x-[20px]">
        <div      v-if="!modalStore.editDonePicture">
          <div
          class="w-[65px] h-[65px] bg-tamkin rounded-full flex items-center justify-center cursor-pointer"
     
          @click="modalStore.controlTeamEditPictureModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[36px] h-[32px] text-white"
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
         <div   v-else>
          <div
        
          class="w-[63px] h-[62px] bg-tamkin rounded-full flex items-center justify-center cursor-pointer"
        >
          <div class="relative ">
            <img src="/assets/imgs/avatar.png" alt="" />
            <div
              @click="modalStore.controlTeamEditPictureModal"
              class="cursor-pointer absolute bottom-0 right-0 w-[20px] h-[20px] bg-white rounded-full border-[1px] border-[#2CA9A0] flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[10px] h-[10px] text-[#021328]"
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
         
          <div v-if="!editTeamNameMode" class="">
            <h1 class="font-[500] text-[13px] leading-[19.5px] text-darkGrey">
              Your team name <br />
              <span class="font-bold">Tamkin</span>
            </h1>
          </div>
          <div v-else>
            <div class=" relative 2xl:w-[274px]">
              <input
                type="text"
                placeholder="{{$t('Your team name')}}"
                id="teamName"
                class="input_floating_label peer w-full"
                v-model="v$.teamName.$model"
                :class="{
                  input_error:
                    v$.teamName.$error && v$.teamName.required.$invalid,
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
                class="w-full lg:w-4/6 "
                v-if="v$.teamName.$error && v$.teamName.required.$invalid"
              >
                <div class="error_message ">
                  <span
                    v-if="v$.teamName.$error && v$.teamName.required.$invalid"
                    >{{ $t("teamName_is_required") }}</span
                  >
                </div>
              </div>
            </div>
          </div>
      </div>
       

        <div class="flex items-center justify-center">
          <div v-if="!editTeamNameMode">
            <button
              @click="editTeamNameMode = !editTeamNameMode"
              class="btn_bordered_dashboard font-[500] text-[15px] leading-[22.5px]"
            >
              Edit Team
            </button>
          </div>
          <div v-else>
            <button
              @click="editTeamNameMode = !editTeamNameMode"
              class="btn_bordered_dashboard font-[500] text-[15px] leading-[22.5px]"
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
        class="b 2xl:w-full w-full flex items-center justify-between space-x-[30px] px-[16px] py-[23px] bg-white h-[108px] rounded-[10px] border-[1px] border-lightGrey"
      >
        <div>
          <img src="/assets/imgs/icons/team_members.svg" alt="" />
        </div>
        <div class="flex flex-col items-center justify-center text-darkGrey">
          <div class="">
            <h1 class="font-[600] text-[15px] lg:leading-[22.5px] text-center">
              Total Member
            </h1>
          </div>
          <div class="">
            <h1 class="font-[500] text-[15px] leading-[22.5px]">4</h1>
          </div>
        </div>
        <div
          class="bg-white w-[63px] h-[48px] border-[0.5px] border-[#48D916] rounded-[9px] p-[10px] text-[#48D916] flex flex-col items-center justify-center"
        >
          <div>
            <h1 class="text-[11px] font-[500] leading-[16px]">Active</h1>
          </div>
          <div>
            <h1 class="text-[16px] font-[500] leading-[18px]">2</h1>
          </div>
        </div>
        <div
          class="bg-white w-[63px] h-[48px] border-[0.5px] border-[#EA4335] rounded-[9px] p-[10px] text-[#EA4335] flex flex-col items-center justify-center"
        >
          <div>
            <h1 class="text-[11px] font-[500] leading-[16px]">Pending</h1>
          </div>
          <div>
            <h1 class="text-[16px] font-[500] leading-[18px]">2</h1>
          </div>
        </div>
      </div>
    </div>

    <section class="w-full mx-auto mt-[24px]">
      <div
        class="flex flex-col items-start justify-center rounded-[10px] pb-[42px] bg-white"
        style="box-shadow: 0px 4px 24px 8px #51459f1a"
      >
        <div
          class="w-full flex items-center justify-center lg:justify-start lg:flex-row flex-col"
        >
          <div class="w-full">
            <div
              class="text-[20px] font-[600] p-[16px] text-[#021328]"
              style="line-height: 30px"
            >
              All Members
            </div>
          </div>

          <div
            class="flex items-center justify-between space-x-[66px] lg:p-[16px] w-full"
          >
          <div class="py-[17px] search_input w-[460px]">
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
              class="absolute top-[12px] lg:top-[16px] right-[0] p-[16px] cursor-pointer"
            >
              <img src="/assets/imgs/icons/clear_search.svg" alt="" />
            </div>
          
        </div>
            <div class="">
              <button
                class="btn-dashboard hover_light w-[141px]"
                @click="modalStore.controlInviteMemberModal"
              >
                Invite Member
              </button>
            </div>
          </div>
        </div>
        <table class="min-w-full lg:w-full divide-y last-border-b overflow-x-auto divide-gray-200">
          <thead class="w-full">
            <tr class="">
              <th
                class="py-3.5 text-left text-[14px] font-[600] pl-[16px] text-darkGrey"
              >
                Name
              </th>
              <th class="py-3.5 text-left text-[14px] font-[600] text-darkGrey">
                Email
              </th>
              <th class="py-3.5 text-left text-[14px] font-[600] text-darkGrey">
                Permissions
              </th>
              <th
                class="py-3.5 text-center text-[14px] font-[600] text-darkGrey lg:w-[20%] 2xl:w-[16%]"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 w-full">
            <tr class="">
              <td class="pl-[16px] text-[14px] font-[400] text-darkGrey">
                <div class="flex items-center justify-start space-x-[16px]">
                  <div class="inline">
                    <img
                      src="/assets/imgs/icons/avatar_table.svg"
                      alt=""
                      class="lg:h-full h-[30px] mt-3"
                    />
                  </div>
                  <div class="lg:order-1 order-2 lg:py-0">Ali Ahmed</div>
                  <div
                    class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] w-[47px] h-[23px] rounded-[17px] p-[10px]"
                    style="
                      background: linear-gradient(
                        180deg,
                        #2dada3 0%,
                        #71dad2 100%
                      );
                    "
                  >
                    Owner
                  </div>
                </div>
              </td>
              <td class="py-4 text-left text-[14px] font-[400] text-darkGrey">
                <p>Ali Ahmed@gmail.com</p>
              </td>
              <td class="py-4 text-center text-[14px] font-[400] text-darkGrey">
                <div class="flex items-center justify-start">
                  <button
                    @click="modalStore.controlEditPermissionsModal"
                    class="flex items-center space-x-[10px] bg-transparent underline focus:outline-none"
                  >
                    <div>Permissions</div>
                    <img src="/assets/imgs/icons/arow_down.svg" alt="" />
                  </button>
                </div>
              </td>

              <td class="text-right text-[14px] font-[400] text-darkGrey">
                <div
                  class="flex items-center justify-end space-x-[16px] pr-[16px]"
                >
                  <div>
                     <svg
                      width="22"
                      height="20"
                      class="text-[#8C8C8C] hover:text-[#4285F4] cursor-pointer"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 0.5C0.89 0.5 0 1.39 0 2.5V14.5C0 15.0304 0.210714 15.5391 0.585786 15.9142C0.960859 16.2893 1.46957 16.5 2 16.5H12.5C12.1699 15.7078 12 14.8582 12 14C12 12.2761 12.6848 10.6228 13.9038 9.40381C15.1228 8.18482 16.7761 7.5 18.5 7.5C19.0053 7.50149 19.5087 7.5619 20 7.68V2.5C20 1.96957 19.7893 1.46086 19.4142 1.08579C19.0391 0.710714 18.5304 0.5 18 0.5H2ZM2 2.5L10 7.5L18 2.5V4.5L10 9.5L2 4.5V2.5ZM18 8.5L15.75 10.75L18 13V11.5C18.663 11.5 19.2989 11.7634 19.7678 12.2322C20.2366 12.7011 20.5 13.337 20.5 14C20.5 14.4 20.41 14.78 20.24 15.12L21.33 16.21C21.75 15.58 22 14.82 22 14C22 11.79 20.21 10 18 10V8.5ZM14.67 11.79C14.25 12.42 14 13.18 14 14C14 16.21 15.79 18 18 18V19.5L20.25 17.25L18 15V16.5C17.337 16.5 16.7011 16.2366 16.2322 15.7678C15.7634 15.2989 15.5 14.663 15.5 14C15.5 13.6 15.59 13.22 15.76 12.88L14.67 11.79Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      class="text-[#8C8C8C] hover:text-[#2DADA3] cursor-pointer"
                      @click="modalStore.controlEditUserModal"
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
                  <div>
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
            <tr class="">
              <td class="pl-[16px] text-[14px] font-[400] text-darkGrey">
                <div class="flex items-center justify-start space-x-[16px]">
                  <div class="inline">
                    <img
                      src="/assets/imgs/icons/avatar_table.svg"
                      alt=""
                      class="lg:h-full h-[30px] mt-3"
                    />
                  </div>
                  <div class="lg:order-1 order-2 lg:py-0">Ali Ahmed</div>
                  <div
                    class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] w-[47px] h-[23px] rounded-[17px] p-[10px]"
                    style="
                      background: linear-gradient(
                        180deg,
                        #2dada3 0%,
                        #71dad2 100%
                      );
                    "
                  >
                    Owner
                  </div>
                </div>
              </td>
              <td class="py-4 text-left text-[14px] font-[400] text-darkGrey">
                <p>Ali Ahmed@gmail.com</p>
              </td>
              <td class="py-4 text-center text-[14px] font-[400] text-darkGrey">
                <div class="flex items-center justify-start">
                  <button
                    class="flex items-center space-x-[10px] bg-transparent underline focus:outline-none"
                  >
                    <div>Permissions</div>
                    <img
                      src="/assets/imgs/icons/arow_down.svg"
                      @click="modalStore.controlEditPermissionsModal"
                      alt=""
                    />
                  </button>
                </div>
              </td>

              <td class="text-right text-[14px] font-[400] text-darkGrey">
                <div
                  class="flex items-center justify-end space-x-[16px] pr-[16px]"
                >
                  <div>
                     <svg
                      width="22"
                      height="20"
                      class="text-[#8C8C8C] hover:text-[#4285F4] cursor-pointer"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 0.5C0.89 0.5 0 1.39 0 2.5V14.5C0 15.0304 0.210714 15.5391 0.585786 15.9142C0.960859 16.2893 1.46957 16.5 2 16.5H12.5C12.1699 15.7078 12 14.8582 12 14C12 12.2761 12.6848 10.6228 13.9038 9.40381C15.1228 8.18482 16.7761 7.5 18.5 7.5C19.0053 7.50149 19.5087 7.5619 20 7.68V2.5C20 1.96957 19.7893 1.46086 19.4142 1.08579C19.0391 0.710714 18.5304 0.5 18 0.5H2ZM2 2.5L10 7.5L18 2.5V4.5L10 9.5L2 4.5V2.5ZM18 8.5L15.75 10.75L18 13V11.5C18.663 11.5 19.2989 11.7634 19.7678 12.2322C20.2366 12.7011 20.5 13.337 20.5 14C20.5 14.4 20.41 14.78 20.24 15.12L21.33 16.21C21.75 15.58 22 14.82 22 14C22 11.79 20.21 10 18 10V8.5ZM14.67 11.79C14.25 12.42 14 13.18 14 14C14 16.21 15.79 18 18 18V19.5L20.25 17.25L18 15V16.5C17.337 16.5 16.7011 16.2366 16.2322 15.7678C15.7634 15.2989 15.5 14.663 15.5 14C15.5 13.6 15.59 13.22 15.76 12.88L14.67 11.79Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      class="text-[#8C8C8C] hover:text-[#2DADA3] cursor-pointer"
                      @click="modalStore.controlEditUserModal"
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
                  <div>
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
            <tr class="">
              <td class="pl-[16px] text-[14px] font-[400] text-darkGrey">
                <div class="flex items-center justify-start space-x-[16px]">
                  <div class="inline">
                    <img
                      src="/assets/imgs/icons/avatar_table.svg"
                      alt=""
                      class="lg:h-full h-[30px] mt-3"
                    />
                  </div>
                  <div class="lg:order-1 order-2 lg:py-0">Ali Ahmed</div>
                  <div
                    class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] w-[47px] h-[23px] rounded-[17px] p-[10px]"
                    style="
                      background: linear-gradient(
                        180deg,
                        #2dada3 0%,
                        #71dad2 100%
                      );
                    "
                  >
                    Owner
                  </div>
                </div>
              </td>
              <td class="py-4 text-left text-[14px] font-[400] text-darkGrey">
                <p>Ali Ahmed@gmail.com</p>
              </td>
              <td class="py-4 text-center text-[14px] font-[400] text-darkGrey">
                <div class="flex items-center justify-start">
                  <button
                    class="flex items-center space-x-[10px] bg-transparent underline focus:outline-none"
                  >
                    <div>Permissions</div>
                    <img
                      src="/assets/imgs/icons/arow_down.svg"
                      @click="modalStore.controlEditPermissionsModal"
                      alt=""
                    />
                  </button>
                </div>
              </td>

              <td class="text-right text-[14px] font-[400] text-darkGrey">
                <div
                  class="flex items-center justify-end space-x-[16px] pr-[16px]"
                >
                  <div>
                     <svg
                      width="22"
                      height="20"
                      class="text-[#8C8C8C] hover:text-[#4285F4] cursor-pointer"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 0.5C0.89 0.5 0 1.39 0 2.5V14.5C0 15.0304 0.210714 15.5391 0.585786 15.9142C0.960859 16.2893 1.46957 16.5 2 16.5H12.5C12.1699 15.7078 12 14.8582 12 14C12 12.2761 12.6848 10.6228 13.9038 9.40381C15.1228 8.18482 16.7761 7.5 18.5 7.5C19.0053 7.50149 19.5087 7.5619 20 7.68V2.5C20 1.96957 19.7893 1.46086 19.4142 1.08579C19.0391 0.710714 18.5304 0.5 18 0.5H2ZM2 2.5L10 7.5L18 2.5V4.5L10 9.5L2 4.5V2.5ZM18 8.5L15.75 10.75L18 13V11.5C18.663 11.5 19.2989 11.7634 19.7678 12.2322C20.2366 12.7011 20.5 13.337 20.5 14C20.5 14.4 20.41 14.78 20.24 15.12L21.33 16.21C21.75 15.58 22 14.82 22 14C22 11.79 20.21 10 18 10V8.5ZM14.67 11.79C14.25 12.42 14 13.18 14 14C14 16.21 15.79 18 18 18V19.5L20.25 17.25L18 15V16.5C17.337 16.5 16.7011 16.2366 16.2322 15.7678C15.7634 15.2989 15.5 14.663 15.5 14C15.5 13.6 15.59 13.22 15.76 12.88L14.67 11.79Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      class="text-[#8C8C8C] hover:text-[#2DADA3] cursor-pointer"
                      @click="modalStore.controlEditUserModal"
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
                  <div>
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
            <tr class="">
              <td class="pl-[16px] text-[14px] font-[400] text-darkGrey">
                <div class="flex items-center justify-start space-x-[16px]">
                  <div class="inline">
                    <img
                      src="/assets/imgs/icons/avatar_table.svg"
                      alt=""
                      class="lg:h-full h-[30px] mt-3"
                    />
                  </div>
                  <div class="lg:order-1 order-2 lg:py-0">Ali Ahmed</div>
                  <div
                    class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] w-[47px] h-[23px] rounded-[17px] p-[10px]"
                    style="
                      background: linear-gradient(
                        180deg,
                        #2dada3 0%,
                        #71dad2 100%
                      );
                    "
                  >
                    Owner
                  </div>
                </div>
              </td>
              <td class="py-4 text-left text-[14px] font-[400] text-darkGrey">
                <p>Ali Ahmed@gmail.com</p>
              </td>
              <td class="py-4 text-center text-[14px] font-[400] text-darkGrey">
                <div class="flex items-center justify-start">
                  <button
                    class="flex items-center space-x-[10px] bg-transparent underline focus:outline-none"
                  >
                    <div>Permissions</div>
                    <img
                      src="/assets/imgs/icons/arow_down.svg"
                      @click="modalStore.controlEditPermissionsModal"
                      alt=""
                    />
                  </button>
                </div>
              </td>

              <td class="text-right text-[14px] font-[400] text-darkGrey">
                <div
                  class="flex items-center justify-end space-x-[16px] pr-[16px]"
                >
                  <div>
                     <svg
                      width="22"
                      height="20"
                      class="text-[#8C8C8C] hover:text-[#4285F4] cursor-pointer"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 0.5C0.89 0.5 0 1.39 0 2.5V14.5C0 15.0304 0.210714 15.5391 0.585786 15.9142C0.960859 16.2893 1.46957 16.5 2 16.5H12.5C12.1699 15.7078 12 14.8582 12 14C12 12.2761 12.6848 10.6228 13.9038 9.40381C15.1228 8.18482 16.7761 7.5 18.5 7.5C19.0053 7.50149 19.5087 7.5619 20 7.68V2.5C20 1.96957 19.7893 1.46086 19.4142 1.08579C19.0391 0.710714 18.5304 0.5 18 0.5H2ZM2 2.5L10 7.5L18 2.5V4.5L10 9.5L2 4.5V2.5ZM18 8.5L15.75 10.75L18 13V11.5C18.663 11.5 19.2989 11.7634 19.7678 12.2322C20.2366 12.7011 20.5 13.337 20.5 14C20.5 14.4 20.41 14.78 20.24 15.12L21.33 16.21C21.75 15.58 22 14.82 22 14C22 11.79 20.21 10 18 10V8.5ZM14.67 11.79C14.25 12.42 14 13.18 14 14C14 16.21 15.79 18 18 18V19.5L20.25 17.25L18 15V16.5C17.337 16.5 16.7011 16.2366 16.2322 15.7678C15.7634 15.2989 15.5 14.663 15.5 14C15.5 13.6 15.59 13.22 15.76 12.88L14.67 11.79Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      class="text-[#8C8C8C] hover:text-[#2DADA3] cursor-pointer"
                      @click="modalStore.controlEditUserModal"
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
                  <div>
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

      <div class="flex justify-between items-center py-[16px]">
        <div class="flex items-center space-x-2">
          <span class="text-darkGrey text-[14px] leading-[21px] font-[400]"
            >Per Page</span
          >
          <button
            style="
              background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
            "
            class="px-3 py-1 rounded-md text-white focus:outline-none"
          >
            10
          </button>
          <button
            class="px-3 py-1 rounded-md  bg-[#A7A7A7] hover:bg-lightGrey
             text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            20
          </button>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-darkGrey text-[14px] leading-[21px] font-[400]"
            >Page</span
          >
          <button
            class="p-[4px] rounded-md bg-transparent text-darkGrey hover:bg-light-grey"
          >
            <img src="/assets/imgs/arrow-left.svg" alt="" />
          </button>
          <button
            class="px-3 py-1 rounded-md bg-transparent text-darkGrey hover:bg-light-grey focus:outline-none"
          >
            1
          </button>
          <button
            style="
              background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
            "
            class="px-3 py-1 rounded-md hover:bg-[#A7A7A7] text-white focus:outline-none"
          >
            2
          </button>
          <button
            class="p-[4px] rounded-md bg-transparent text-darkGrey hover:bg-light-grey"
          >
            <img src="/assets/imgs/arrow-right-pagination.svg" alt="" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
