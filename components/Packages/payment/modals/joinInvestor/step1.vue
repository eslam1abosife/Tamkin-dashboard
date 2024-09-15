<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required,helpers ,minLength} from "@vuelidate/validators";
import { useModalManager } from "@/composables/useModalManager";
import { useShareEmbedCode } from "@/composables/useEmbedCode";
import {useJoinInvestor} from '@/composables/usePackages'
import {useGetAppInvites} from '@/composables/useTeam';

const { getInviteApps, defaultApp, apps, loading: getSitesLoading } = useGetAppInvites();
const {joinInvestor,codeStatus} = useJoinInvestor()
const isCryptoMenuOpen = ref(false);
const selectedCrypto = ref("");
const search = ref("");
const cryptoStore = useCryptoStore()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData,
} = useModalManager();
const currentWebSite = ref('')
const selectWebsite = (v)=>{
  currentWebSite.value = v
}
const loadingReq = ref(false)
const state = reactive({
  walletAddress: "",
  hashAddresses: [],
  amount: ''
});
const isNonEmpty = (value) => value.trim().length > 0;
const hashAddressRules = {
  hash: { required, minLength: minLength(1) } // Requires at least 1 character
};
const rules = {
  walletAddress: { required },
  amount: { required },
  hashAddresses: {
    $each: hashAddressRules,
    required
  },
};

const removeHashAddress = (index) => {
  state.hashAddresses.splice(index, 1);
};
const packagesStore = usePackgesStore()
const v$ = useVuelidate(rules, state);

const props = defineProps({
  showModal: Boolean,
});

const profileStore = useProfileStore()
 const pcks = ref([])
 const selectedpcks = ref('')
 const selectPackage = (pck)=>{
  selectedpcks.value = pck.name
 }
 const data = getData();
const appId = ref('')
onMounted(async () => {
  await packagesStore.getPacks()

  await nextTick();
  await cryptoStore.setCryptoList();
  await cryptoStore.getRates();
  const filteredPackages = packagesStore.packages
  .filter(pkg => 
    Array.isArray(pkg.package_price_role) &&
    pkg.package_price_role.length > 0 &&
    pkg.package_price_role.some(role => role.cost_investor > 0) &&
    pkg.package_type === 'Package'
  )
await getInviteApps({agency: profileStore.company.name})
  pcks.value = filteredPackages
});

const { shareEmbedCode, loading } = useShareEmbedCode();
const emit = defineEmits(["onSuccess"]);

const errMsg = ref(null);

const withdrawStore = useWithdrawStore();

const addHashAddress = () => {
  state.hashAddresses.push({ hash: "" });
  // v$.value.$touch(); // Trigger validation
  v$.value.hashAddresses.$each.forEach(validation => validation.$touch()); // Touch each hash validation
};
const {$toast} = useNuxtApp()
const submitForm = async ()=>{
  v$.value.$touch();
  if(v$.value.$error) return
  loadingReq.value = true
  const dataObj  = {
    wallet: state.walletAddress,
    amount: state.amount,
    hashes: state.hashAddresses.map(hs=>hs.hash),
    package: selectedpcks.value,
    app:currentWebSite.value.name,
    currency:filteredCryptoMethods.value.name
  }

const res = await joinInvestor(dataObj)
if(codeStatus.value=== 200){

  closeModal('join_to_investor')
  $toast('Request Sent Successfully',{hideIn:3000})
  loadingReq.value = false

}else {
  $toast('Error Sending Request, please try again',{hideIn:3000,type:'error',positionX:'30%'})
  loadingReq.value = false

  
}
// alert()
  

}
const filteredCryptoMethods = computed(() => {
  return cryptoStore.list.find((method) =>
  method.title === 'TSLT'
  );
});



const toggleDropdown = () => {
  isCryptoMenuOpen.value = !isCryptoMenuOpen.value;
};

const selectCryptoMethod = (method) => {
  selectedCrypto.value = method;
  isCryptoMenuOpen.value = false;
};

</script>


<template>
  <div v-if="isOpen('join_to_investor')" 
    class="fixed z-[9999] top-[16px] bg-white  dark:bg-tamkinDarkPrimary rounded-[10px] 
    p-[30px] lg:w-[640px] h-auto w-10/12"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeModal('join_to_investor')"
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
    <h1
      class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]"
    >
      {{ $t("Join To Investor") }}
    </h1>

    <div
      class="h-[142px] mt-[20px] w-full rounded-[10px] flex flex-col items-center justify-center bg-gradient-to-r relative from-[#E1FFFD] via-[#E6E3FF] to-[#FFD6E7]"
    >
      <div class="absolute right-2 top-2 rotate-45 blur-[1.5px]">
        <img src="/imgs/investor_coins.png" class="w-[87px] h-[87px]" alt="" />
      </div>
      <div class="absolute left-2 top-4 rotate-45 blur-[1.5px]">
        <img src="/imgs/invest_coin.png" class="w-[32px] h-[40px]" alt="" />
      </div>
      <div class="flex items-center justify-center space-x-[18px]">
        <div>
          <img src="/imgs/investor/A1.svg" class="w-[36px] h-[36px]" alt="" />
        </div>
        <div>
          <img src="/imgs/investor/AA.svg" class="w-[36px] h-[36px]" alt="" />
        </div>
        <div>
          <img src="/imgs/investor/C.svg" class="w-[36px] h-[36px]" alt="" />
        </div>
      </div>

      <div
        class="text-[13px] leading-[19px] font-[500] text-darkGrey px-[45px] text-center mt-[14px]"
      >
       {{ $t('Based on the detailed information you’ve provided, a personalized package will be carefully determined to meet your specific needs and preferences') }}
      </div>
    </div>


    <div class="w-full">
      <div class="w-full mt-[20px]">
        <TranslateSelectInput
        @getCurrentSelectedItem="selectWebsite"
        :enableSearch="false"
        placeholderinput="Add site"
        :list="apps"
        nameKey="title"
        idField="name"
        class=""
       
      />
       </div>
      <div class="w-full mt-[20px]">
        <TranslateSelectInput
        @getCurrentSelectedItem="selectPackage"
        :enableSearch="false"
        placeholderinput="Package"
        :list="pcks"
        nameKey="title"
        idField="name"
        class=""
       
      />
       </div>

      <div class="w-full relative mt-[20px]">
        <input
          type="text"
          placeholder=""
          id="email"
          class="input_floating_label peer text-darkGrey dark:text-whiteTamkin"
          v-model="v$.walletAddress.$model"
          :class="{
            input_error: v$.walletAddress.$error && v$.walletAddress.required.$invalid,
            error_text: v$.walletAddress.$error && v$.walletAddress.required.$invalid,
            input_success: !v$.walletAddress.$error && !v$.walletAddress.$invalid,
          }"
        />
        <label
          for="email"
          class="floating_label"
          :class="[
            v$.walletAddress.$error && v$.walletAddress.required.$invalid
              ? '!text-error'
              : '',
          ]"
        >
          {{ $t("Wallet Address*") }}
        </label>
        <div
          class="w-full lg:w-4/6 mt-2"
          v-if="v$.walletAddress.$error && v$.walletAddress.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.walletAddress.$error && v$.walletAddress.required.$invalid">{{
              $t("Wallet Address is required")
            }}</span>
          </p>
        </div>
      </div>
      <div class="w-full relative mt-[20px]">
        <input
          type="number"
          placeholder=""
          id="email"
          class="input_floating_label peer text-darkGrey dark:text-whiteTamkin"
          v-model="v$.amount.$model"
          :class="{
            input_error: v$.amount.$error && v$.amount.required.$invalid,
            error_text: v$.amount.$error && v$.amount.required.$invalid,
            input_success: !v$.amount.$error && !v$.amount.$invalid,
          }"
        />
        <label
          for="email"
          class="floating_label"
          :class="[
            v$.amount.$error && v$.amount.required.$invalid
              ? '!text-error'
              : '',
          ]"
        >
          {{ $t("Amount*") }}
        </label>
        <div
          class="w-full lg:w-4/6 mt-2"
          v-if="v$.amount.$error && v$.amount.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.amount.$error && v$.amount.required.$invalid">{{
              $t("Amount is required")
            }}</span>
          </p>
        </div>
      </div>

  
      <div class="flex items-center justify-between w-full mt-[20px]">
        <div class="text-darkGrey font-[600] text-[14px] leading-[24x]">Add Hash</div>
  
        <div @click="addHashAddress"
          class="bg-gradient-to-br from-tamkinStart cursor-pointer hover:from-[#DAF3F1] hover:to-[#DAF3F1] group to-tamkinEnd h-[26px] w-[26px] rounded-[10px] flex items-center justify-center"
        >
          <svg
            width="13"
            height="14"
            class="w-[11px] h-[11px]"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 7C0 6.74105 0.102867 6.49271 0.285971 6.3096C0.469075 6.1265 0.717418 6.02363 0.976367 6.02363H5.52363V1.47637C5.52363 1.21742 5.6265 0.969075 5.8096 0.785971C5.99271 0.602867 6.24105 0.5 6.5 0.5C6.75895 0.5 7.00729 0.602867 7.1904 0.785971C7.3735 0.969075 7.47637 1.21742 7.47637 1.47637V6.02363H12.0236C12.2826 6.02363 12.5309 6.1265 12.714 6.3096C12.8971 6.49271 13 6.74105 13 7C13 7.25895 12.8971 7.50729 12.714 7.6904C12.5309 7.8735 12.2826 7.97637 12.0236 7.97637H7.47637V12.5236C7.47637 12.7826 7.3735 13.0309 7.1904 13.214C7.00729 13.3971 6.75895 13.5 6.5 13.5C6.24105 13.5 5.99271 13.3971 5.8096 13.214C5.6265 13.0309 5.52363 12.7826 5.52363 12.5236V7.97637H0.976367C0.717418 7.97637 0.469075 7.8735 0.285971 7.6904C0.102867 7.50729 0 7.25895 0 7Z"
              class="fill-[#FFFEFE] group-hover:fill-tamkin"
            />
          </svg>
        </div>
      </div>
    <div class="flex flex-col w-full overflow-auto overflow-x-hidden max-h-[100px]   ">
           
      <div v-for="(hashAddress, index) in state.hashAddresses" :key="index" class="w-full relative mt-[20px]">
        <button 
        
        @click="removeHashAddress(index)" 
  
        
        class="text-red-500 hover:bg-[#FFF3F2]  absolute rtl:left-[16px] ltr:right-[16px] top-[3.5px]
          w-[33px] h-[33px]  rounded-[5px] flex items-center justify-center">
          <img src="/assets/imgs/icons/bin.svg" alt="">
          </button>
          <input
            type="text"
            placeholder=""
            id="email"

            class="input_floating_label peer  text-darkGrey dark:text-whiteTamkin"
            v-model="hashAddress.hash"
            :class="{
              input_error:v$.hashAddresses.$model[index].hash.$error ,
              error_text: v$.hashAddresses.$model[index].hash.$error,
              '!w-[99%]' : state.hashAddresses.length > 1
            }"
          />
          <label
            for="email"
            class="floating_label"
            :class="[
              v$.hashAddresses.$model[index].hash.$error ? '!text-error' : '',
            ]"
          >
            {{ $t("Hash Address*") }} {{ index + 1 }}
          </label>
          <div
            class="w-full lg:w-4/6 mt-2"
            v-if="v$.hashAddresses.$model[index].hash.$error"
          >
            <p class="error_message">
              {{
                $t("Hash Address is required") + ' / ' + 'Hash ' + ' ' + (index + 1)
              }}
            </p>
          </div>
        </div>
   
        
       
          <div class="form-group mt-4" :class="{ 'form-group--error': v$.hashAddresses.$error }"></div>
          <div class="error" v-if="!v$.hashAddresses.required">
            {{ $t('You must add at least one hash address') }}
          </div>
          <div class="error" v-else-if="v$.hashAddresses.$error">
            {{ $t('Hash addresses list is invalid') }}
          </div>
    </div>
    
        
  
      <div class="">
   
  
      
        <button
          :disabled=" v$.$invalid || loadingReq  "
         
          @click="submitForm"
          class="btn-dashboard hover_tamkin w-full mx-auto"
        >
  
        <div class="flex items-center justify-center">
          <div :class="loadingReq ? 'rtl:ml-2 ltr:mr-2' : ''">
            {{ $t("Confirm") }}
          </div>

          <svg v-if="loadingReq" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
