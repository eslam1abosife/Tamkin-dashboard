<script lang="ts" setup>
const selectedPlan = ref("");
</script>

<template>
  <div class="flex flex-col items-start justify-center w-full">
    <h1 class="text-[24px] leading-[36px] font-[600] text-darkGrey ml-[30px]">
      Upgrade Plan
    </h1>
    <div
      class="flex flex-col items-start justify-center bg-white w-full h-full rounded-[10px] mt-[33px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[24px] leading-[36px] font-[600] ml-[10px] text-darkGrey mt-[31px]"
      >
        Select Your Plan
      </h1>

      <div
        class="flex items-center justify-start w-full space-x-[14px] px-[10px]"
      >
        <div
          class="flex items-center custom-border justify-start bg-selected space-x-[16px] relative w-full pt-2.5 pr-2.5 pb-2.5 pl-2 h-[87px] !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
        
        >
          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 relative w-full">
              <h1 class="font-[500] text-[14px]">Monthly Plan</h1>
            </div>
            <div class="order-1 mx-[4px]">
              <input
                id="radio522224"
                type="radio"
                name="radio"
                class="hidden"
                value="premium"
                v-model="selectedPlan"
              />
              <label for="radio522224" class="flex items-center cursor-pointer">
                <span
                  class="w-[24px] h-[24px] inline-block mr-1 rounded-full border border-grey"
                ></span>
              </label>
            </div>
          </div>
        </div>

        <div
          class="flex items-center custom-border-tamkin justify-start bg-selected space-x-[16px] relative w-full pt-2.5 pr-2.5 pb-2.5 pl-2 h-[87px] !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
        
        >
          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 relative w-full">
              <div
                style="
                  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
                "
                class="absolute text-[13px] leading-[17.76px] font-[600] font-[Manrope] w-[69px] custom-border rounded-[10px] h-[22px] flex items-center justify-center py-[4.5] px-[0.5px] top-[-35px] left-[15%] text-white"
              >
                <span>Popular</span>
              </div>
              <h1 class="font-[500] text-[14px]">Annual Plan</h1>
              <h2 class="font-[500] text-[10px] font-[Manrope]">
                <span class="!text-[#021328] text-[700]">12%</span>
                <span class="text-[#536174]">discount on the monthly Plan</span>
              </h2>
            </div>
            <div class="order-1 mx-[4px]">
              <input
                id="radio534"
                type="radio"
                name="radio"
                class="hidden"
                value="premium"
                v-model="selectedPlan"
              />
              <label for="radio534" class="flex items-center cursor-pointer">
                <span
                  class="w-[24px] h-[24px] inline-block mr-1 rounded-full border border-grey"
                ></span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="flex items-center custom-border justify-start bg-selected space-x-[16px] relative w-full pt-2.5 pr-2.5 pb-2.5 pl-2 h-[87px] !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
         
        >
          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 relative w-full">
              <div
                style="background: #c16487"
                class="absolute text-[13px] leading-[17.76px] font-[600] font-[Manrope] w-[89px] rounded-[10px] h-[22px] flex items-center justify-center py-[4.5] px-[0.5px] top-[-35px] left-[15%] text-white"
              >
                <span>Best Value</span>
              </div>
              <h1 class="font-[500] text-[14px]">3- Year Plan</h1>
              <h2 class="font-[500] text-[10px]">
                <span class="!text-[#021328] text-[700]">20%</span>
                <span class="text-[#536174]">discount on the monthly Plan</span>
              </h2>
            </div>
            <div class="order-1 mx-[4px]">
              <input
                id="radio5"
                type="radio"
                name="radio"
                class="hidden"
                value="premium"
                v-model="selectedPlan"
              />
              <label for="radio5" class="flex items-center cursor-pointer">
                <span
                  class="w-[24px] h-[24px] inline-block mr-1 rounded-full border border-grey"
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex items-center justify-start w-full space-x-[14px] px-[10px] mt-[50px]"
      >
        <div class="flex-1 w-full">
          <input
            type="text"
            class="input_floating_label h-[45px]"
            value="tamkin.app"
            placeholder="Search ..."
          />
        </div>

        <div>
          <button
            class="btn-dashboard-normal normal_hover text-[14px] leading-[21px] font-[600]"
          >
            Add Website
          </button>
        </div>
      </div>

      <table class="min-w-full bg-white mt-[62px]">
        <thead>
          <tr>
            <th
              class="py-2 px-4 border-b text-[16px] leading-[24px] text-[#A7A7A7] font-[500] text-left"
            >
              Website
            </th>
            <th
              class="py-2 px-4 border-b text-[16px] leading-[24px] text-[#A7A7A7] font-[500] text-left"
            >
              Tier
            </th>
            <th
              class="py-2 px-4 border-b text-[16px] leading-[24px] text-[#A7A7A7] font-[500] text-right"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              class="py-2 px-4 border-b text-left text-[16px] leading-[24px] font-[400] text-darkGrey flex items-center justify-start space-x-[33px]"
            >
              <div class="w-[150px]">
                <span>Tamkin.App</span>
              </div>
              <div class="cursor-pointer">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  class="text-[#D9D9D9] hover:text-[#E80902]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </td>
            <td
              class="py-2 px-4 border-b text-left text-[16px] leading-[24px] font-[400] text-darkGrey"
            >
              Large
            </td>
            <td
              class="py-2 px-4 border-b text-right text-[16px] leading-[24px] font-[400] text-darkGrey"
            >
              $30,444.00
            </td>
          </tr>
          <tr>
            <td
              class="py-2 px-4 border-b text-left text-[16px] leading-[24px] font-[400] text-darkGrey flex items-center justify-start space-x-[33px]"
            >
              <div class="w-[150px]">
                <span class="w-[150px]">Pinterest.App</span>
              </div>
              <div class="cursor-pointer">
                <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                class="text-[#D9D9D9] hover:text-[#E80902]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                  fill="currentColor"
                />
              </svg>
              </div>
            </td>
            <td
              class="py-2 px-4 border-b text-left text-[16px] leading-[24px] font-[400] text-darkGrey"
            >
              Small
            </td>
            <td
              class="py-2 px-4 border-b text-right text-[16px] leading-[24px] font-[400] text-darkGrey"
            >
              $20,444.00
            </td>
          </tr>
          <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE]">
            <td
              class="py-2 px-4 border-b text-right font-semibold w-full"
              colspan="2"
            >
              Subtotal
            </td>
            <td class="py-2 px-4 border-b text-right w-full" colspan="2">
              $50,444.00
            </td>
          </tr>
          <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE]">
            <td
              class="py-2 px-4 border-b text-right font-semibold w-full"
              colspan="2"
            >
              Total
            </td>
            <td class="py-2 px-4 border-b text-right w-full" colspan="2">
              $50,444.00
            </td>
          </tr>
        </tbody>
      </table>
 
    </div>
    <div class="mt-[26px] ml-auto ">
        <button class="btn-dashboard hover_tamkin">
            Continue to Payment
        </button>
      </div>
  </div>
</template>
