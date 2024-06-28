<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import mysiteAnimation from "~/assets/animation/mysite.json";
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
const dataAvailable = ref(true);
const editTeamNameMode = ref(false);

const currentTab = ref("saved");

const switchTab = (tab: any) => {
    currentTab.value = tab;
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
        return (
            deletedSites.value && checked.value.length === deletedSites.value.length
        );
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
</script>

<template>
    <div class="mt-[23px]">
        <div class="space-y-[10px]">
            <h1 class="text-left text-[24px] leading-[36px] font-[600]">My Site</h1>

            <h2 class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey">
                Add New Site for TAMKIN to enjoy the features
            </h2>
        </div>

        <div class="mt-[18px] flex items-center justify-start space-x-[36px]">
            <div>
                <button class="btn-dashboard-normal normal_hover text-[16px] leading-[24px] font-[500]" @click="$router.push(localePath('/add-site'))">
                    Add New Site
                </button>
            </div>
            <div>
                <button class="btn_bordered_dashboard normal_hover bg-white text-[16px] leading-[24px] font-[500]">
                    Upgrade Plans
                </button>
            </div>
        </div>

        <div
            class="ipad-max:-mx-6 mt-[44px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col 
            justify-center lg:justify-start ">
            <div class="flex items-center lg:flex-row flex-col justify-start px-[16px] py-[23px]
             w-full bg-white lg:w-[73%] 2xl:w-[75%] h-[200px] lg:h-[129px] rounded-[10px]"
                style="box-shadow: 0px 4px 24px 8px #51459f1a">
                <div class="w-full space-y-[16px]">
                    <div>
                        <h1 class="font-[500] text-[18px] leading-[27px] text-darkGrey">
                            Select your default site
                        </h1>
                    </div>

                    <div class="flex flex-col lg:flex-row items-center justify-between">
                        <div class="flex items-center justify-start space-x-[8px]">
                            <img src="/assets/imgs/icons/mysite_select.svg" alt="" />
                            <div class="flex items-center space-x-[16px]">
                                <!-- <h2 class="font-[600] text-[16px] leading-[24px] text-[#C5C5C5]">Select Site</h2> -->
                                <div>
                                    <h2 class="font-[600] text-[16px] leading-[24px] text-darkGrey underline">
                                        Tamkin.App
                                    </h2>
                                </div>
                                <div>
                                    <a href="" class="text-tamkin font-[600] text-[16px] leading-[24px] flex ]">Visit
                                        Site
                                        <img src="/assets/imgs/icons/external_link.svg" class="ml-[14px]" alt="" /></a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button @click="modalStore.controlSelectSiteModal"
                                class="btn_bordered_dashboard text-[15px] leading-[22.5px] font-[600]">
                                Select Site
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ml-auto absolute right-0 ipad-max:top-[170px] top-[119px] ipad-max:w-1/4">
                <Vue3Lottie :animationData="mysiteAnimation" class="absolute left-[25%] top-[125px] " :height="32"
                    :width="39" />
                <img src="/assets/imgs/man_mysite.svg " class="h-[300px] lg:block hidden" alt="" />
            </div>
        </div>

        <section class="w-full mx-auto mt-[24px]">
            <div class="flex flex-col" v-if="dataAvailable">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full align-middle md:px-6 ipad-max:px-2 lg:px-8">
                        <div class="flex flex-col  justify-start rounded-[10px] pb-[42px]  mb-[16px] bg-white"
                            style="box-shadow: 0px 4px 24px 8px #51459f1a">
                            <div class="flex items-center justify-center lg:justify-between flex-row ">
                                <div class="flex items-center space-x-[16px] pl-[16px] ">
                                    <div class="hover:bg-tamkinLight px-[1px] pt-[16px] cursor-pointer">
                                        <div @click="switchTab('saved')" :class="[
                                currentTab === 'saved'
                                    ? 'border-b-[3px] border-tamkin  font-[600] '
                                    : 'border-b-[1px] border-[#C5C5C5]',
                            ]" class="text-[14px] px-[4px] pb-[16px] text-[#021328]" style="line-height: 21px">
                                            My Sites (4)
                                        </div>
                                    </div>
                                    <div class="hover:bg-tamkinLight px-[1px] pt-[16px] cursor-pointer"
                                        @click="switchTab('deleted')">
                                        <div :class="[
                                currentTab === 'deleted'
                                    ? 'border-b-[3px] border-tamkin  font-[600]'
                                    : 'border-b-[1px] border-[#C5C5C5]',
                            ]" class="text-[14px] px-[4px] font-[400] pb-[16px] text-[#021328]" style="line-height: 21px">
                                            Deleted Sites (4)
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between  ">
                                    <div class="py-[17px] search_input w-full mr-[16px]">
                                        <input
                                          type="text"
                                          class="input_dashboard_search w-[289px]"
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
                                </div>
                            </div>
                            <table class="table-fixed  min-w-full divide-y divide-gray-200" v-if="currentTab === 'saved'">
                                <thead>
                                    <tr class="h-[50px]">
                                        <th
                                            class="pl-[16px] h-[50px] text-left text-[14px] font-[600] leading-[21px] text-darkGrey">
                                            Sites URL
                                        </th>
                                        <th class="text-left w-[150px] text-[14px] font-[600] leading-[21px] text-darkGrey">
                                            Billing
                                        </th>
                                        <th class="text-left w-[150px] text-[14px] font-[600] leading-[21px] text-darkGrey">
                                            Products
                                        </th>
                                        <th
                                            >
                                            <div class="w-[150px] flex items-center justify-start space-x-[6px] text-left text-[14px] font-[600] leading-[21px] text-darkGrey">
                                                <div>Status</div>
                                            <div>
                                                <span class="tooltip left" id="saveButton"
                                                    title="Estimated accessibility compliance level based on currently active solutions">
                                                    <span id="saveButton_label" class="">
                                                        <svg width="16" class="mx-[3px]" height="15" viewBox="0 0 16 15"
                                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                                                                fill="#71DAD2" />
                                                        </svg>
                                                    </span>
                                                </span>
                                            </div>
                                            </div>
                                        </th>

                                        <th class="w-[150px] text-left text-[14px] font-[600] leading-[21px] text-darkGrey">
                                            Date
                                        </th>

                                        <th
                                            >
                                           <div class="flex items-center justify-center w-[150px] space-x-[6px]  text-[14px] 
                                            font-[600] leading-[21px] text-darkGrey">
                                            <div>Traffic</div>
                                            <div>
                                                <span class="tooltip right" id="saveButton"
                                                    title="Estimated accessibility compliance level based on currently active solutions">
                                                    <span id="saveButton_label" class="">
                                                        <svg width="16" class="mx-[3px]" height="15" viewBox="0 0 16 15"
                                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                                                                fill="#71DAD2" />
                                                        </svg>
                                                    </span>
                                                </span>
                                            </div>
                                           </div>
                                        </th>
                                        <th class="w-[150px] text-center text-[14px] 
                                        font-[600] leading-[21px] text-darkGrey  ">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr class="h-[50px]">
                                        <td
                                            class="w-[25%]">
                                            <div class="flex h-[50px] items-center justify-start space-x-[16px]
                                             pl-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey">
                                             <img src="/assets/imgs/icons/avatar_table.svg" alt=""
                                             class="w-[20px] h-[20px]" />
                                         <div class="order-1">Tamkin.App</div>
                                         <div class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] w-[47px] h-[23px] rounded-[17px] p-[10px]"
                                             style="
                       background: linear-gradient(
                         180deg,
                         #2dada3 0%,
                         #71dad2 100%
                       );
                     ">
                                             Default
                                         </div>
                                        </div>
                                         
                                        </td>
                                        <td class="w-[150px] text-[14px] text-left leading-[21px] font-[400] text-darkGrey">
                                            Monthly
                                        </td>
                                        <td class="w-[150px] text-[14px] font-[400] text-darkGrey">
                                            <div class="billing_badge pro mr-auto">PRO</div>
                                        </td>

                                        <td class="w-[150px] mx-auto text-center text-darkGrey">
                                            <div style="
                          background: linear-gradient(
                            180deg,
                            #2dada3 0%,
                            #71dad2 100%
                          );
                        " class="rounded-[17px] border-[1px] flex items-center justify-center
                         border-[#71DAD2] h-[25px] w-[88px] text-white text-[12px] leading-[18px]">
                                                Active
                                            </div>
                                        </td>

                                        <td class="w-[150px] text-left text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            May 11 ,2024
                                        </td>

                                        <td class="w-[150px] text-center pr-[36px] text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            2.35K
                                        </td>

                                        <td class="w-[150px] text-[14px] font-[400] text-darkGrey pl-[38px]">
                                            <div class="flex items-center justify-start space-x-[16px]">
                                                <div class="hover:opacity-50">
                                                    <img src="/assets/imgs/installed.svg" alt="" />
                                                </div>
                                                <div>
                                                    <svg width="18" height="17" viewBox="0 0 18 17"
                                                        class="text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
<!-- 
                                    <tr class="bg-[#FAEBEB] h-[50px]">
                                        <td
                                            class="flex h-[50px] items-center justify-start space-x-[16px] pl-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey">
                                            <img src="/assets/imgs/icons/avatar_table.svg" alt=""
                                                class="lg:block hidden w-[20px] h-[20px] lg:mt-0" />
                                            <div class="order-1">Tamkin.App</div>
                                            <div class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] w-[47px] h-[23px] rounded-[17px] p-[10px]"
                                                style="
                          background: linear-gradient(
                            180deg,
                            #2dada3 0%,
                            #71dad2 100%
                          );
                        ">
                                                Default
                                            </div>
                                        </td>
                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            _
                                        </td>
                                        <td class="text-[14px] font-[400] text-darkGrey">
                                            <div class="billing_badge pro">PRO</div>
                                        </td>

                                        <td class="text-darkGrey text-left">
                                            <div class="text-[14px] font-[500] leading-[21px] text-[#DE4134]">
                                                Not installed
                                            </div>
                                        </td>

                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            May 11 ,2024
                                        </td>

                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            5.0K
                                        </td>

                                        <td class="text-[14px] font-[400] text-darkGrey">
                                            <div class="flex items-center justify-start space-x-[10px]">
                                                <div class="hover:opacity-50">
                                                    <img src="/assets/imgs/install.svg" alt="" />
                                                </div>
                                                <div>
                                                    <svg width="18" height="17" viewBox="0 0 18 17"
                                                        class="text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="h-[50px]">
                                        <td
                                            class="flex h-[50px] items-center justify-start space-x-[16px] pl-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey">
                                            <img src="/assets/imgs/icons/avatar_table.svg" alt=""
                                                class="w-[20px] h-[20px]" />
                                            <div class="order-1">Tamkin.App</div>
                                            <div class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] w-[47px] h-[23px] rounded-[17px] p-[10px]"
                                                style="
                          background: linear-gradient(
                            180deg,
                            #2dada3 0%,
                            #71dad2 100%
                          );
                        ">
                                                Default
                                            </div>
                                        </td>
                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            Monthly
                                        </td>
                                        <td class="text-[14px] font-[400] text-darkGrey">
                                            <div class="billing_badge pro">PRO</div>
                                        </td>

                                        <td class="text-darkGrey">
                                            <div style="
                          background: linear-gradient(
                            180deg,
                            #2dada3 0%,
                            #71dad2 100%
                          );
                        " class="rounded-[17px] border-[1px] flex items-center justify-center border-[#71DAD2] h-[25px] w-[88px] text-white text-[12px] leading-[18px]">
                                                Active
                                            </div>
                                        </td>

                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            May 11 ,2024
                                        </td>

                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            2.335K
                                        </td>

                                        <td class="text-[14px] font-[400] text-darkGrey w-[70px]">
                                            <div class="flex items-center justify-start space-x-[16px] ">
                                                <div class="hover:opacity-50">
                                                    <img src="/assets/imgs/installed.svg" alt="" />
                                                </div>
                                                <div>
                                                    <svg width="18" height="17" viewBox="0 0 18 17"
                                                        class="text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="h-[50px] ">
                                        <td
                                            class="flex h-[50px] items-center justify-start space-x-[16px] pl-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey">
                                            <img src="/assets/imgs/icons/avatar_table.svg" alt=""
                                                class="w-[20px] h-[20px]" />
                                            <div class="order-1">Tamkin.App</div>
                                            <div class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] w-[47px] h-[23px] rounded-[17px] p-[10px]"
                                                style="
                          background: linear-gradient(
                            180deg,
                            #2dada3 0%,
                            #71dad2 100%
                          );
                        ">
                                                Default
                                            </div>
                                        </td>
                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            Monthly
                                        </td>
                                        <td class="text-[14px] font-[400] text-darkGrey">
                                            <div class="billing_badge pro">PRO</div>
                                        </td>

                                        <td class="text-darkGrey">
                                            <div style="
                          background: linear-gradient(
                            180deg,
                            #2dada3 0%,
                            #71dad2 100%
                          );
                        " class="rounded-[17px] border-[1px] flex items-center justify-center border-[#71DAD2] h-[25px] w-[88px] text-white text-[12px] leading-[18px]">
                                                Active
                                            </div>
                                        </td>

                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            May 11 ,2024
                                        </td>

                                        <td class="text-[14px] leading-[21px] font-[400] text-darkGrey">
                                            2.35K
                                        </td>

                                        <td class="text-[14px] font-[400] text-darkGrey">
                                            <div class="flex items-center justify-start space-x-[16px]">
                                                <div class="hover:opacity-50">
                                                    <img src="/assets/imgs/installed.svg" alt="" />
                                                </div>
                                                <div>
                                                    <svg width="18" height="17" viewBox="0 0 18 17"
                                                        class="text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                                                            fill="currentColor" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>

                            <table class="min-w-full divide-y divide-gray-200" v-if="currentTab === 'deleted'">
                                <thead>
                                    <tr class="h-[50px]">
                                        <th
                                            class="px-4 h-[50px] text-left text-[14px] font-[600] leading-[21px] text-darkGrey">
                                            Sites URL
                                        </th>

                                        <!-- <th
                                            class="h-[50px] pr-[18px] text-right text-[15px] leading-[22.5px] font-[600] text-darkGrey flex items-center justify-end space-x-[10px]">
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
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="dSite in deletedSites" :key="dSite.id" class="h-[50px]">
                                        <td
                                            class="flex h-[50px] items-center justify-start space-x-[10px] pl-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey">
                                        
                                            <img :src="dSite.image" alt="" class="h-[14px] w-[14px]" />
                                            <div class="order-1">
                                                {{ dSite.name }}
                                            </div>
                                        </td>

                                        <td class="text-[14px] pr-[16px] font-[400] text-darkGrey">
                                            <button
                                                class="ml-auto btn_bordered_dashboard normal_hover w-[108px] h-[31px] flex items-center justify-center">
                                                Restore
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col" v-else>
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full align-middle md:px-6 lg:px-8">
                        <div class="flex flex-col items-between justify-center rounded-[10px] pb-[42px] mb-[16px] bg-white"
                            style="box-shadow: 0px 4px 24px 8px #51459f1a">
                            <div class="flex items-center justify-center lg:justify-between flex-row">
                                <div class="flex items-center space-x-[16px] pl-[16px]">
                                    <div class="hover:bg-tamkinLight px-[1px]  cursor-pointer">
                                        <div @click="switchTab('saved')"
                                            class="text-[14px] border-b-[3px] border-tamkin px-[4px] font-[600]
                                             pb-[16px] text-[#021328]"
                                            style="line-height: 21px">
                                            My Sites
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between  pr-[16px] w-2/4">
                                    <div class="py-[17px] search_input w-full mr-[16px]">
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
                                </div>
                            </div>
                            <table class="min-w-full divide-y divide-gray-200">
                                <div class="flex items-center justify-center h-[188px] mt-[74px]">
                                    <div class="flex flex-col items-center justify-center space-y-[12px]">
                                        <div>
                                            <img src="/assets/imgs/no_sites.svg" alt="" />
                                        </div>
                                        <div class="mx-auto">
                                            <h2 class="text-[15px] leading-[22.5px] font-[400] text-darkGrey">
                                                You don't have any sites now
                                            </h2>
                                            <div class="w-[140px] mt-[40px] mx-auto">
                                                <button @click="modalStore.controlSelectSiteModal"
                                                    class="btn-dashboard hover_tamkin text-[16px] mx-auto leading-[24px] font-[500]">
                                                    Add New Site
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
            <div class="py-[4px]" v-if="!dataAvailable"></div>
            <div class="flex justify-between items-center py-[16px]" v-if="dataAvailable">
                <div class="flex items-center space-x-2">
                    <span class="text-darkGrey text-[14px] leading-[21px] font-[400]">Per Page</span>
                    <button style="
              background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
            " class="px-3 py-1 rounded-md text-white focus:outline-none">
                        10
                    </button>
                    <button
                        class="px-3 py-1 rounded-md text-white bg-[#A7A7A7] hover:bg-lightGrey  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        20
                    </button>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-darkGrey text-[14px] leading-[21px] font-[400]">Page</span>
                    <button class="p-[4px] rounded-md bg-transparent text-darkGrey hover:bg-light-grey">
                        <img src="/assets/imgs/arrow-left.svg" alt="" />
                    </button>
                    <button
                        class="px-3 py-1 rounded-md bg-transparent text-darkGrey hover:bg-light-grey focus:outline-none">
                        1
                    </button>
                    <button style="
              background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
            " class="px-3 py-1 rounded-md hover:bg-[#A7A7A7] text-white focus:outline-none">
                        2
                    </button>
                    <button class="p-[4px] rounded-md bg-transparent text-darkGrey hover:bg-light-grey">
                        <img src="/assets/imgs/arrow-right-pagination.svg" alt="" />
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>
