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
    <ProfileBillingModalsAddnewCard/>
    <div class="space-y-[10px]">
      <h1 class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin">
        Orders
      </h1>

      <h2 class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey">
        Effortlessly track all your orders in one place, ensuring you stay updated on their status
      </h2>
    </div>

    <div class="overflow-x-auto mt-[24px]">
        <table class="min-w-full bg-white  last:rounded-b-[10px]">
          <thead class="bg-white  border-b  text-[12px] leading-[18px] text-[#999999] ">
            <tr>
              <th class="py-3 px-6 text-left font-[500]">Order ID</th>
              <th class="py-3 px-6 text-left font-[500]">Order items</th>
              <th class="py-3 px-6 text-left font-[500]">Payment Method</th>
              <th class="py-3 px-6 text-left font-[500]">Price</th>
              <th class="py-3 px-6 text-left font-[500]">Order Status</th>
              <th class="py-3 px-6 text-left font-[500]">Date Order</th>
            </tr>
          </thead>
          <tbody class="text-[#1C1C1C] text-[14px] font-[400] leading-[18px] ">
            <tr class="table-row: border-b border-gray-200 hover:bg-gray-100 cursor-pointer"  @click="$router.push(localePath('/orders/1'))" >
              <td class="py-3 px-6 text-left whitespace-nowrap ">
                <span>#CM9801</span>
              </td>
              <td class="py-3 px-6 text-left " >
                <div class="flex items-center space-x-[8px]">
                 <div class="flex items-center justify-center border-[1px] border-[#E6E8EC] rounded-full w-[24px] h-[24px]">
                    <img src="/imgs/invoice.png" class="h-[16px] w-[16px]" alt="">
                 </div>
                   <span class="truncate w-20">Special Character</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left ">
                <div class="flex items-center">
                  <img src="/assets/imgs/payment_methods/crypto.svg" alt="Placeholder" class="w-[24px] h-[24px] mr-2"/>
                  <span>Crypto</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left ">
                <span>120 AED</span>
              </td>
              <td class="py-3 px-6 text-left ">
                <div class="flex items-center">
                  <img src="/imgs/under_review.png" alt="Placeholder" class="w-[24px] h-[24px] mr-2"/>
                  <span class="ml-[-8px]">Under Review</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left ">
                <div class="flex items-center space-x-[8px]">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 1V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V1H11C11 1 11.4142 1 11.7071 1.29289C11.7071 1.29289 12 1.58579 12 2V12C12 12 12 12.4142 11.7071 12.7071C11.7071 12.7071 11.4142 13 11 13H1C1 13 0.585785 13 0.292893 12.7071C0.292893 12.7071 0 12.4142 0 12V2C0 2 0 1.58579 0.292893 1.29289C0.292893 1.29289 0.585786 1 1 1H2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V1H8.5ZM1 5V12H11V5H1ZM11 4H1V2H2.5V2.5C2.5 2.77614 2.72386 3 3 3C3.27614 3 3.5 2.77614 3.5 2.5V2H8.5V2.5C8.5 2.77614 8.72386 3 9 3C9.27614 3 9.5 2.77614 9.5 2.5V2H11V4Z" fill="black" fill-opacity="0.4"/>
                        </svg>
                                          <span class="">Just now</span>
                </div>
              </td>
            </tr>
            <tr class="border-b border-gray-200 hover:bg-gray-100 cursor-pointer" @click="$router.push(localePath('/orders/1'))">
                <td class="py-3 px-6 text-left whitespace-nowrap ">
                  <span>#CM9801</span>
                </td>
                <td class="py-3 px-6 text-left " >
                  <div class="flex items-center space-x-[8px]">
                   <div class="flex items-center justify-center border-[1px] border-[#E6E8EC] rounded-full w-[24px] h-[24px]">
                      <img src="/imgs/invoice.png" class="h-[16px] w-[16px]" alt="">
                   </div>
                     <span class="truncate w-20">Special Character</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left ">
                  <div class="flex items-center">
                    <img src="/assets/imgs/payment_methods/cc.svg" alt="Placeholder" class="w-[24px] h-[24px] mr-2"/>
                    <span>Credit</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left ">
                  <span>120 AED</span>
                </td>
                <td class="py-3 px-6 text-left ">
                  <div class="flex items-center">
                    <img src="/imgs/success.png" alt="Placeholder" class="w-[24px] h-[24px] mr-2"/>
                    <span class="ml-[-8px]">Successful </span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left ">
                  <div class="flex items-center space-x-[8px]">
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 1V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V1H11C11 1 11.4142 1 11.7071 1.29289C11.7071 1.29289 12 1.58579 12 2V12C12 12 12 12.4142 11.7071 12.7071C11.7071 12.7071 11.4142 13 11 13H1C1 13 0.585785 13 0.292893 12.7071C0.292893 12.7071 0 12.4142 0 12V2C0 2 0 1.58579 0.292893 1.29289C0.292893 1.29289 0.585786 1 1 1H2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V1H8.5ZM1 5V12H11V5H1ZM11 4H1V2H2.5V2.5C2.5 2.77614 2.72386 3 3 3C3.27614 3 3.5 2.77614 3.5 2.5V2H8.5V2.5C8.5 2.77614 8.72386 3 9 3C9.27614 3 9.5 2.77614 9.5 2.5V2H11V4Z" fill="black" fill-opacity="0.4"/>
                          </svg>
                                            <span class="">1 hour ago</span>
                  </div>
                </td>
              </tr>

              <tr class="table-row  hover:bg-gray-100 cursor-pointer" @click="$router.push(localePath('/orders/1'))">
                <td class="py-3 px-6 text-left whitespace-nowrap ">
                  <span>#CM9801</span>
                </td>
                <td class="py-3 px-6 text-left ">
                  <div class="flex items-center space-x-[8px]">
                   <div class="flex items-center justify-center border-[1px] border-[#E6E8EC] rounded-full w-[24px] h-[24px]">
                      <img src="/imgs/invoice.png" class="h-[16px] w-[16px]" alt="">
                   </div>
                    <span class="truncate w-20">Special Character</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left ">
                  <div class="flex items-center">
                    <img src="/assets/imgs/payment_methods/paypal.svg" alt="Placeholder" class="w-[24px] h-[24px] mr-2"/>
                    <span>PayPal</span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left ">
                  <span>120 AED</span>
                </td>
                <td class="py-3 px-6 text-left ">
                  <div class="flex items-center ml-1 space-x-[4px]">
                    <img src="/imgs/limited.svg" alt="Placeholder" class="w-[14px] h-[14px] "/>
                    <span class="">Declined  </span>
                  </div>
                </td>
                <td class="py-3 px-6 text-left ">
                  <div class="flex items-center space-x-[8px]">
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 1V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V1H11C11 1 11.4142 1 11.7071 1.29289C11.7071 1.29289 12 1.58579 12 2V12C12 12 12 12.4142 11.7071 12.7071C11.7071 12.7071 11.4142 13 11 13H1C1 13 0.585785 13 0.292893 12.7071C0.292893 12.7071 0 12.4142 0 12V2C0 2 0 1.58579 0.292893 1.29289C0.292893 1.29289 0.585786 1 1 1H2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V1H8.5ZM1 5V12H11V5H1ZM11 4H1V2H2.5V2.5C2.5 2.77614 2.72386 3 3 3C3.27614 3 3.5 2.77614 3.5 2.5V2H8.5V2.5C8.5 2.77614 8.72386 3 9 3C9.27614 3 9.5 2.77614 9.5 2.5V2H11V4Z" fill="black" fill-opacity="0.4"/>
                          </svg>
                                            <span class="">Feb 3, 2023</span>
                  </div>
                </td>
              </tr>
       
          </tbody>
        </table>
      </div>
      <div class="bg-white w-full h-[450px] mt-[32px]  flex flex-col items-center justify-center rounded-[10px] space-y-[16px] p-[32px]">


  


        
            <img src="/imgs/no_orders.png" class="w-[67px] h-[71px]" alt="">
            <div class="text-[14px] leading-[28px] font-[400] text-darkGrey w-1/4 text-center">
              There are no orders at the moment
            </div>

    

     
    </div>

      <div class="flex flex-col lg:flex-row md:flex-row justify-between items-center pb-[16px] mt-[16px]">
        <div class="flex items-center rtl:space-x-reverse space-x-2 mb-4 lg:mb-0">
          <span class="dark:text-whiteTamkin text-darkGrey text-[13px] leading-[21px] font-[400]">
            Per Page
          </span>
          <div class="flex space-x-2 rtl:space-x-reverse">
            <!-- Static buttons for per-page options -->
            <button
              style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);"
              class="px-3 py-1 rounded-md text-white focus:outline-none !text-[13px]"
            >
              10
            </button>
            <button
              class="px-3 py-1 rounded-md text-white focus:outline-none !text-[13px] bg-[#A7A7A7] hover:bg-lightGrey"
            >
              20
            </button>
            <button
              class="px-3 py-1 rounded-md text-white focus:outline-none !text-[13px] bg-[#A7A7A7] hover:bg-lightGrey"
            >
              50
            </button>
          </div>
        </div>
        <div class="flex items-center rtl:space-x-reverse space-x-2">
          <span class="text-darkGrey dark:text-whiteTamkin text-[13px] leading-[21px] font-[400]">
            Page
          </span>
          <button
            class="p-[4px] rounded-md bg-transparent !text-[13px] dark:text-whiteTamkin text-darkGrey hover:bg-light-grey"
            disabled
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
          <div class="flex space-x-2 rtl:space-x-reverse">
            <!-- Static buttons for page numbers -->
            <button
              style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);"
              class="px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-white focus:outline-none flex items-center justify-center"
            >
              1
            </button>
            <button
              class="px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin focus:outline-none flex items-center justify-center hover:bg-light-grey"
            >
              2
            </button>
            <button
              class="px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin focus:outline-none flex items-center justify-center hover:bg-light-grey"
            >
              3
            </button>
          </div>
          <button
            class="p-[4px] rounded-md bg-transparent text-darkGrey dark:text-whiteTamkin hover:bg-light-grey"
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
      
      
      
  </div>
</template>

<style>
.table-row:last-child {
  border-bottom: none !important;
}
</style>

