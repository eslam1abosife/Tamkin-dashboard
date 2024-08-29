<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useModalManager } from "@/composables/useModalManager";
import { useInviteMember, useGetAllMembers,useCheckUserTeam } from "@/composables/useTeam";
import { useIncludeWord } from "@/composables/useSharedFunctions";

const { isIncludeWord } = useIncludeWord();
const {checkuserInTeam} = useCheckUserTeam()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  setData,
  getData,
} = useModalManager();
const state = reactive({
  email: "",
  firstName: "",
  lastName: "",
});
const rules = {
  email: { required, email },
  firstName: { required },
  lastName: { required },
};

const v$ = useVuelidate(rules, state);
const modalStore = useModalStore();

const { inviteMember, memberData, loading: submitLoading } = useInviteMember();
const { getAllTeamMember } = useGetAllMembers();
const emit = defineEmits(["onSuccess"]);

const errorMsg = ref(null);
const loadinginvite = ref(false);
const memberAlreadyInTeamError = ref(false)
const userInTeam = ref('')
const submitInviteMember = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    loadinginvite.value = true;
 userInTeam.value = await checkuserInTeam(state.email)
if(userInTeam.value.length === 0){
  setData({ ...state });
    // await inviteMember({ ...state, currTeamId: user.agency });
    // getAllTeamMember(user.agency);
    // emit('onSuccess', 'User added successfully!');
    navigateTo("invitemember", "team", "invitememberupdate", {
      ...state,
      currTeamId: user.agency,
    });
    
}else {
  memberAlreadyInTeamError.value = true
}
   
    loadinginvite.value = false;
  } catch (err) {
    errorMsg.value = err;
  }
};

onMounted(() => {
  // console.log('mounted');
  const message = getData();
  if (message?.error) {
    errorMsg.value = message?.error;
  }
});

const clearFieldError = (condition) => {
  if (condition) {
    errorMsg.value = null;
  }
};
</script>

<template>
  <div
    v-if="isOpen('invitemember')"
    class="fixed z-[9999] top-[100px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[640px] lg:h-[446px] w-10/12"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeModal('invitemember'), setData(null)"
    >
      <svg
        class="w-[12px] h-[12px]"
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="flex items-center justify-start h-full flex-col w-full mx-auto max-h-[100%]">
      <h1
        class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]"
      >
        {{ $t('Invite Member') }}
      </h1>

      <div class="space-y-[44px] w-full ">
        <h6
          v-if="isIncludeWord(errorMsg, ['something wrong'])"
          class="text-[red] font-light text-[14px] mt-[10px] !mb-[30px]"
        >
          {{ errorMsg }}
        </h6>

        <div class="w-full relative !mt-[20px]">
          <input
            type="text"
            placeholder=""
            id="firstName"
            class="input_floating_label peer"
            v-model="v$.firstName.$model"
            :class="{
              input_error: v$.firstName.$error && v$.firstName.required.$invalid,
              input_success: !v$.firstName.$error && !v$.firstName.$invalid,
            }"
          />
          <label
            for="firstName"
            class="floating_label"
            :class="[
              v$.firstName.$error && v$.firstName.required.$invalid ? '!text-error' : '',
            ]"
          >
            {{ $t("First Name*") }}
          </label>
          <div
            class="w-full lg:w-4/6 "
            v-if="v$.firstName.$error && v$.firstName.required.$invalid"
          >
            <p class="error_message">
              <span v-if="v$.firstName.$error && v$.firstName.required.$invalid">{{
                $t("First Name is required")
              }}</span>
            </p>
          </div>
        </div>

        <div class="w-full relative">
          <input
            type="text"
            placeholder="{{$t('lastName')}}"
            id="lastName"
            class="input_floating_label peer"
            v-model="v$.lastName.$model"
            :class="{
              input_error: v$.lastName.$error && v$.lastName.required.$invalid,
              input_success: !v$.lastName.$error && !v$.lastName.$invalid,
            }"
          />
          <label
            for="lastName"
            class="floating_label"
            :class="[
              v$.lastName.$error && v$.lastName.required.$invalid ? '!text-error' : '',
            ]"
          >
            {{ $t("Last Name*") }}
          </label>
          <div
            class="w-full lg:w-4/6 "
            v-if="v$.lastName.$error && v$.lastName.required.$invalid"
          >
            <p class="error_message">
              <span v-if="v$.lastName.$error && v$.lastName.required.$invalid">{{
                $t("Last Name is required")
              }}</span>
            </p>
          </div>
        </div>
        <div class="w-full relative">
          <input
            @input="()=>{clearFieldError(isIncludeWord(errorMsg, ['member', 'agency']))
            memberAlreadyInTeamError = false
            userInTeam = ''
          }"
            type="email"
            placeholder="{{$t('email')}}"
            id="email"
            class="input_floating_label peer"
            v-model="v$.email.$model"

            :class="{
              input_error:
                (v$.email.$error && v$.email.required.$invalid) ||
                (v$.email.$error && v$.email.email.$invalid) ||
                isIncludeWord(errorMsg, ['member', 'agency']) ||
                (memberAlreadyInTeamError && userInTeam.length > 0),
              input_success:
                !v$.email.$error &&
                !v$.email.$invalid &&
                !isIncludeWord(errorMsg, ['member', 'agency']) &&
                (!memberAlreadyInTeamError && (!userInTeam || userInTeam.length === 0)),
            }"
            
          />
          <label
            for="email"
            class="floating_label"
            :class="[
              (v$.email.$error && v$.email.required.$invalid) ||
              (v$.email.$error && v$.email.email.$invalid) ||
              isIncludeWord(errorMsg, ['member', 'agency']) || 
              memberAlreadyInTeamError
                ? '!text-error'
                : '',
            ]"
          >
            {{ $t("Email*") }}
          </label>
          <div
            class="w-full lg:w-4/6 "
            v-if="
              (v$.email.$error && v$.email.required.$invalid) ||
              (v$.email.$error && v$.email.email.$invalid) ||
              isIncludeWord(errorMsg, ['member', 'agency']) || 
              memberAlreadyInTeamError
            "
          >
            <p class="error_message">
              <span v-if="v$.email.$error && v$.email.required.$invalid">{{
                $t("The email address is required")
              }}</span>
              <span
                v-else-if="
                  v$.email.required.$invalid ||
                  (v$.email.$error && v$.email.email.$invalid)
                "
                >{{ $t("Please enter a valid email") }}</span
              >

              <span v-else-if="isIncludeWord(errorMsg, ['member', 'agency'])">{{
                errorMsg
              }}</span>

              <span v-if="memberAlreadyInTeamError">{{
                $t("The Member is already assigned to a team")
              }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="mt-[82px] w-2/6 mx-auto">
        <button
          :disabled="
            v$.email.$invalid ||
            v$.firstName.$invalid ||
            v$.lastName.$invalid ||
            loadinginvite || (memberAlreadyInTeamError && userInTeam.length > 0)
          "
          @click="submitInviteMember"
          class="btn-dashboard hover_tamkin text-center mx-auto"
        >
          <!-- modalStore.controlInviteMemberUpdateModal -->
          <div class="flex items-center justify-center">
            <div :class="loadinginvite ? 'rtl:ml-2 ltr:mr-2' : ''">{{$t('Invite Member')}}</div>

            <svg
              v-if="loadinginvite"
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
