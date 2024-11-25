<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useModalManager } from '@/composables/useModalManager';
import { useEditMember, useGetAllMembers } from "@/composables/useTeam";
import { useUserStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile"; // Import your profile store
const userStore = useUserStore();
const profileStore = useProfileStore(); // Initialize profile store
const { editMember, loading } = useEditMember();
const { getAllTeamMember } = useGetAllMembers();
const {t} = useI18n()
const {
  isOpen,
  closeModal,
  getData
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
const errorMsg = ref('');
const {$toast} = useNuxtApp();

onMounted(() => {
  const memberData = getData();

  state.email = memberData.member_email;
  state.firstName = memberData.first_name;
  state.lastName = memberData.last_name;
});

const doEditMember = async () => {
  v$.value.$validate(); // Trigger validation

  if (v$.value.$invalid) {
    // If the form is invalid, do not proceed
    return;
  }

  try {
    await editMember({
      member_email: state.email,
      first_name: state.firstName,
      last_name: state.lastName,
    });

    // Update the profileStore with the new information
    profileStore.updateUserProfile({
      email: state.email,
      firstName: state.firstName,
      lastName: state.lastName,
    });

    const user = JSON.parse(localStorage.getItem('user'));
    user.full_name = user.displayName = `${state.firstName} ${state.lastName}`;
    localStorage.setItem('user', JSON.stringify(user));
    userStore.setUser(user);

    closeModal('editname');

    await getAllTeamMember(user.agency);
    $toast(t('Member Name Updated Successfully'), { hideIn: 3000 });

  } catch (err) {
    errorMsg.value = err;
  }
}
</script>

<template>

   
    <div v-if="isOpen('editname')"
    class="fixed z-[9999] top-[100px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[640px] lg:h-[350px] w-10/12 "
    style="left: 50%; transform: translate(-50%, 0)">
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('editname')">
      <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor" />
      </svg>
    </div>
    <div class="container mx-auto">
      <h1 class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]">
       {{ $t('Edit Name') }}
      </h1>





      <div class="space-y-[44px] mb-[40px]">
        <h6 v-if="errorMsg" class="text-[red] font-light text-[14px] text-center"> {{ errorMsg }} </h6>

        <div class="w-full relative !mt-[30px]">
          <input type="text" placeholder="{{$t('firstName')}}" id="firstName" class="input_floating_label peer"
            v-model="v$.firstName.$model" :class="{
    input_error:
      (v$.firstName.$error && v$.firstName.required.$invalid),
    input_success: !v$.firstName.$error && !v$.firstName.$invalid,
  }" />
          <label for="firstName" class="floating_label" :class="[
    (v$.firstName.$error && v$.firstName.required.$invalid)
      ? '!text-error'
      : '',
  ]">
            {{ $t("First Name*") }}
          </label>
          <div class="w-full lg:w-4/6 mt-2" v-if="(v$.firstName.$error && v$.firstName.required.$invalid)">
            <p class="error_message">
              <span v-if="v$.firstName.$error && v$.firstName.required.$invalid">{{ $t("First Name is required")
                }}</span>

            </p>
          </div>
        </div>

        <div class="w-full relative">
          <input type="text" placeholder="{{$t('lastName')}}" id="lastName" class="input_floating_label peer"
            v-model="v$.lastName.$model" :class="{
    input_error:
      (v$.lastName.$error && v$.lastName.required.$invalid),
    input_success: !v$.lastName.$error && !v$.lastName.$invalid,
  }" />
          <label for="lastName" class="floating_label" :class="[
    (v$.lastName.$error && v$.lastName.required.$invalid)
      ? '!text-error'
      : '',
  ]">
            {{ $t("Last Name*") }}
          </label>
          <div class="w-full lg:w-4/6 mt-2" v-if="(v$.lastName.$error && v$.lastName.required.$invalid)">
            <p class="error_message">
              <span v-if="v$.lastName.$error && v$.lastName.required.$invalid">{{ $t("Last Name is required")
                }}</span>
            </p>
          </div>
        </div>

      </div>


      <div class="mt-[50px] w-2/6 mx-auto">

        <button 
          :disabled="v$.firstName.$invalid || v$.lastName.$invalid || loading"
          class=" btn-dashboard hover_tamkin text-center mx-auto" @click="doEditMember">

          <div class="flex items-center justify-center">
            <div :class="loading ? 'rtl:ml-2 ltr:mr-2':''">
              {{ $t('Save') }}
            </div>
       
             <svg  v-if="loading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
