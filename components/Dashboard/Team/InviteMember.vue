<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import {useModalStore} from '@/stores/modal'

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
const modalStore = useModalStore()

const props = defineProps({
  showModal:Boolean
})

</script>

<template>
  <div  
  v-if="modalStore.inviteMemberModal"
    class="fixed z-[9999] top-[100px] bg-white rounded-[10px] p-[30px] lg:w-[640px] lg:h-[446px] w-10/12 "
    style="left: 50%; transform: translate(-50%, 0)"
  >
  <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="modalStore.controlInviteMemberModal">
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
<div class="container mx-auto">
  <h1 class="text-left font-[600] text-darkGrey text-[24px] leading-[36px]">
    Invite Member
</h1>





<div class="space-y-[44px]">
    <div class="w-full relative mt-[40px]">
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
          {{ $t("firstName") }}*
        </label>
        <div class="w-full lg:w-4/6 mt-2" v-if="(v$.firstName.$error && v$.firstName.required.$invalid)">
          <p class="error_message">
            <span v-if="v$.firstName.$error && v$.firstName.required.$invalid">{{ $t("first_name_required")
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
          {{ $t("lastName") }}*
        </label>
        <div class="w-full lg:w-4/6 mt-2" v-if="(v$.lastName.$error && v$.lastName.required.$invalid)">
          <p class="error_message">
            <span v-if="v$.lastName.$error && v$.lastName.required.$invalid">{{ $t("last_name_required")
              }}</span>
    
          </p>
        </div>
      </div>
      <div class="w-full relative">
        <input type="email" placeholder="{{$t('email')}}" id="email" class="input_floating_label peer"
          v-model="v$.email.$model" :class="{
      input_error:
        (v$.email.$error && v$.email.required.$invalid) ||
        (v$.email.$error && v$.email.email.$invalid),
      input_success: !v$.email.$error && !v$.email.$invalid,
    }" />
        <label for="email" class="floating_label" :class="[
      (v$.email.$error && v$.email.required.$invalid) ||
        (v$.email.$error && v$.email.email.$invalid)
        ? '!text-error'
        : '',
    ]">
          {{ $t("email") }}*
        </label>
        <div class="w-full lg:w-4/6 mt-2" v-if="(v$.email.$error && v$.email.required.$invalid) ||
      (v$.email.$error && v$.email.email.$invalid)">
          <p class="error_message">
            <span v-if="v$.email.$error && v$.email.required.$invalid">{{ $t("email_address_is_required")
              }}</span>
            <span v-else-if="v$.email.required.$invalid ||
      (v$.email.$error && v$.email.email.$invalid)">{{ $t("please_enter_valid_email_address")
              }}</span>
          </p>
        </div>
      </div>
</div>


<div class="mt-[32px] w-1/4 mx-auto">
    <button class=" btn-dashboard text-center mx-auto  " >
        Invite Member
      </button>
</div>


</div>
  </div>
</template>

<style lang="scss">
.close_btn {
  @apply absolute top-[-16px] right-[-14px] bg-white rounded-full flex justify-center items-center w-[24px] h-[24px];
  &:hover {
    @apply text-white;
    background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  }
}
</style>
