<script lang="ts" setup>
import { useModalManager } from "@/composables/useModalManager";
import { useVuelidate } from "@vuelidate/core";
import visaIcon from "/assets/imgs/payment_methods/visa.svg";
import masterIcon from "/assets/imgs/payment_methods/master.svg";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const getApps = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  await getInviteApps({ agency: user.agency });
};
onMounted(() => {
  getApps();
});
const dateF = ref();
const langStore = useLangSwitch();

const dateOpen = ref(false);

const alertFn = () => {
  if (dateOpen.value) {
    dateOpen.value = false;
  } else {
    dateOpen.value = true;
  }
};
const colorMode = useColorMode();
const savedCards = ref([
  { id: 1, number: "Tamkin  ****3536", type: "visa" },
  { id: 2, number: "Tamkin  ****6792", type: "master" },
]);
import { required, email, sameAs } from "@vuelidate/validators";
import { watch, computed, ref } from "vue";

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

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  lastEventCall,
  eventCounter,
  setData,
} = useModalManager();

const format = (date) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };

  const formatDate = (d) => d.toLocaleDateString("en-US", options);

  if (Array.isArray(date)) {
    const start = formatDate(date[0]);
    const end = formatDate(date[1]);
    return ` ${start} - ${end}`;
  } else {
    return `Selected date is ${formatDate(date)}`;
  }
};

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
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};

const projectNameArr = [
  { id: 1, name: "Active" },
  { id: 2, name: "Pending" },
  { id: 3, name: "Expired" },
  { id: 6, name: "Canceled" },
];
const handleSelectedItemProjectName = (item: any) => {
  console.log(item);
};

const currentMenu = ref("");

const openMenu = (menu: any) => {
  currentMenu.value = currentMenu.value === menu ? "" : menu;
};
</script>

<template>
  <div class="w-full relative">
    <LazyProfileBillingModalsEditcard />
    <div class="space-y-[10px]">
      <h1 class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin">
        Billing & Invoices
      </h1>

      <h2 class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey">
        Billing & Invoices offer a detailed record of your payments and charges for easy
        financial tracking
      </h2>
    </div>

    <div class="bg-white w-full h-full mt-[32px] rounded-[10px] p-[32px]">
      <div class="flex items-center justify-between w-full">
        <div class="text-[18px] font-[500] text-black">Payment Methods</div>
        <button class="btn-dashboard hover_tamkin  w-[159px]">
          <div>
            <img src="/imgs/add.png" class="w-[20px] h-[20px]" alt="" />
          </div>
          <div class="!text-[12px] !leading-[21px] !font-[600]">Add New Card</div>
        </button>
      </div>

      <div class="flex flex-col items-center justify-center mt-[24px] space-y-[10px] w-full">
        <div class="flex flex-col items-center justify-center w-full" v-for="savedCard in savedCards"
          :key="savedCard.id">
          <div @click="changeCurrentCard(savedCard)" :class="[
            currentCard === savedCard.id ? 'custom-border-tamkin' : 'border-[1px] ',
          ]"
            class="w-full h-[87px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between rounded-[10px] border-lightGrey pl-[16px]">
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
              <div><img :src="savedCard.type === 'visa' ? visaIcon : masterIcon" /></div>
              <div class="flex flex-col items-start justify-start relative">
                <div
                  class="absolute top-[10px] left-44 w-[47px] h-[23px]  rounded-[17px] bg-gradient-to-br flex items-center 
                  justify-center  from-tamkinStart to-tamkinEnd"
                  v-if="savedCard.id === 1">
                  <div class="text-[10px] font-[500] text-white">
                    Default
                  </div>
                </div>
                <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin">
                  {{ savedCard.number }}
                </div>
                <div class="text-darkGrey text-[13px] font-[400] leading-[10px]">
                  Expires on 12/2026
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center space-x-[12px] px-[15px]">

              <button @click="openModal('edit_card_billing_profile', 'billing')" class="text-darkGrey hover:border-tamkin border-[#EAEAEA] w-[32px] h-[32px] border rounded-lg 
                flex items-center justify-center group">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M17.391 3.24601C17.4759 3.3749 17.5137 3.52914 17.4981 3.68269C17.4825 3.83624 17.4143 3.97969 17.3052 4.08882L9.08896 12.3042C9.00491 12.3882 8.90003 12.4483 8.78508 12.4784L5.36292 13.3722C5.24979 13.4017 5.13092 13.4011 5.0181 13.3705C4.90528 13.3398 4.80243 13.2802 4.71977 13.1976C4.6371 13.1149 4.57749 13.0121 4.54686 12.8992C4.51623 12.7864 4.51563 12.6675 4.54513 12.5544L5.43888 9.13314C5.46561 9.03068 5.51476 8.93544 5.58278 8.85429L13.8294 0.613027C13.9551 0.4875 14.1255 0.416992 14.3031 0.416992C14.4807 0.416992 14.6511 0.4875 14.7768 0.613027L17.3052 3.14055C17.3364 3.17348 17.3651 3.20873 17.391 3.24601ZM15.8832 3.61424L14.3031 2.03498L6.69013 9.64794L6.13154 11.7867L8.27028 11.2281L15.8832 3.61424Z"
                  class="group-hover:fill-tamkin fill-[#878787]" />
                  <path
                    d="M15.7674 13.7427C16.0117 11.6549 16.0897 9.55095 16.0007 7.45075C15.9986 7.40125 16.0068 7.35185 16.0248 7.3057C16.0428 7.25954 16.0702 7.21763 16.1052 7.18262L16.9847 6.30317C17.0087 6.27901 17.0392 6.26229 17.0725 6.25504C17.1058 6.24779 17.1405 6.25031 17.1724 6.2623C17.2043 6.27428 17.2321 6.29523 17.2524 6.32262C17.2727 6.35 17.2846 6.38267 17.2868 6.41668C17.4519 8.91136 17.389 11.4159 17.0991 13.8991C16.8882 15.7063 15.4367 17.1229 13.6376 17.324C10.5142 17.6697 7.36228 17.6697 4.23893 17.324C2.44071 17.1229 0.988362 15.7063 0.777437 13.8991C0.407521 10.7311 0.407521 7.53085 0.777437 4.36284C0.988362 2.55568 2.43981 1.13909 4.23893 0.937995C6.60955 0.676169 8.99788 0.612492 11.3791 0.747626C11.4132 0.750073 11.4458 0.762235 11.4732 0.782672C11.5006 0.803108 11.5215 0.830964 11.5336 0.862938C11.5456 0.894913 11.5482 0.929668 11.5411 0.963087C11.534 0.996505 11.5175 1.02719 11.4935 1.0515L10.606 1.9381C10.5713 1.97282 10.5298 2.00002 10.4842 2.01801C10.4385 2.036 10.3896 2.0444 10.3406 2.04267C8.35353 1.97461 6.36419 2.05078 4.38819 2.27058C3.81077 2.33449 3.27176 2.59118 2.85822 2.99921C2.44469 3.40723 2.18078 3.94274 2.10912 4.51925C1.7506 7.5833 1.7506 10.6787 2.10912 13.7427C2.18078 14.3193 2.44469 14.8548 2.85822 15.2628C3.27176 15.6708 3.81077 15.9275 4.38819 15.9914C7.38671 16.3266 10.4898 16.3266 13.4892 15.9914C14.0667 15.9275 14.6057 15.6708 15.0192 15.2628C15.4327 14.8548 15.6957 14.3193 15.7674 13.7427Z"
                    class="group-hover:fill-tamkin fill-[#878787]" />
                </svg>

              </button>
              <!-- <button
                class="text-red-500 hover:bg-[#FFF3F2] border-[1.5px] border-[#EAEAEA] hover:border-[#FACECB] w-[32px] h-[32px] rounded-lg flex items-center justify-center"
              >
                <img src="/assets/imgs/icons/bin.svg" alt="" />
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white w-full mt-[24px] rounded-[10px] p-[24px] ">
      <h1 class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin pb-[16px]">
        Billing & Invoices
      </h1>
 

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <tbody class="text-gray-700">
            <!-- Row 1 -->
            <tr class="border-t border-b border-gray-200">
              <td class="py-4 space-y-[10px] ">
                <a href="#" class="text-tamkin text-[14px] font-[500] leading-[19px] underline">Download Invoice # 1233563</a>
                <div class="  text-[13px] font-[500] leading-[20px] text-darkGrey">May 11, 2024</div>
              </td>
              <td class="py-4  space-y-[10px]  text-left">
                <div class="text-[14px] leading-[19px] text-darkGrey font-[500] ">Credit Card</div>
                <div class="text-[13px] leading-[19px] text-darkGrey font-[500]">********26789</div>
              </td>
         
              <td class="py-4  space-y-[10px]  text-right">
                <div class=" text-darkGrey text-[14px] leading-[19px] font-[700]">50$</div>
                <div class="text-darkGrey text-[13px] leading-[19px] font-[500]">Accessibility Mode</div>
              </td>
            </tr>
      
            <tr class="border-t border-b border-gray-200">
              <td class="py-4 space-y-[10px] ">
                <a href="#" class="text-tamkin text-[14px] font-[500] leading-[19px] underline">Download Invoice # 1233563</a>
                <div class="  text-[13px] font-[500] leading-[20px] text-darkGrey">May 11, 2024</div>
              </td>
              <td class="py-4  space-y-[10px]  text-left">
                <div class="text-[14px] leading-[19px] text-darkGrey font-[500] ">Paypal</div>
                <div class="text-[13px] leading-[19px] text-darkGrey font-[500]">email@gmail.com</div>
              </td>
         
              <td class="py-4  space-y-[10px]  text-right">
                <div class=" text-darkGrey text-[14px] leading-[19px] font-[700]">-50$</div>
                <div class="text-darkGrey text-[13px] leading-[19px] font-[500]">Refund</div>
              </td>
            </tr>
      
    
          </tbody>
        </table>
      </div>
      

      <button class="btn-dashboard hover_tamkin w-[180px] mt-[16px] ml-auto">Show All Invoices</button>
    </div>

    <div class="bg-white w-full h-[300px] mt-[32px] rounded-[10px] p-[32px]">
      <div class="text-[18px] font-[500] text-black">Payment Methods</div>

      <div class="flex flex-col items-center justify-center mt-[24px] space-y-[10px]">
        <img src="/imgs/no_methods.png" class="w-[51px] h-[35px]" alt="" />
        <div class="text-[14px] leading-[28px] font-[400] text-darkGrey  text-center">
          No payment methods have been added yet
        </div>
        <button class="btn-dashboard hover_tamkin w-2/6 ipad-max:w-2/6 lg:w-2/6 2xl:w-auto space-x-[10px]">
     
          <div class="!text-[14px] !leading-[21px] !font-[600]">Add New Payment Methods</div>
        </button>
      </div>
    </div>

    <div class="bg-white w-full h-[300px] mt-[32px] rounded-[10px] p-[32px]">
      <div class="text-[18px] font-[500] text-black">Billing History
      </div>

      <div class="flex flex-col items-center justify-center mt-[24px] space-y-[10px]">
        <img src="/imgs/no_billing.png" class="w-[42px] h-[42px]" alt="" />
        <div class="text-[14px] leading-[28px] font-[400] text-darkGrey  text-center">
          No prior billing transactions
        </div>
    
      </div>
    </div>
  </div>
</template>

