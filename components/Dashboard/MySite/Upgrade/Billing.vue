<script lang="ts" setup>
const selectedPlan = ref('')

</script>

<template>

    <div class="flex flex-col items-start justify-center w-full ">

        <h1 class="text-[24px] leading-[36px] font-[600]  text-darkGrey ml-[30px]">Upgrade Plan</h1>
        <div class="flex flex-col items-start justify-center bg-white w-full h-full   rounded-[10px] mt-[33px] " style="box-shadow: 0px 4px 24px 8px #51459F14;
">
<h1 class="text-[24px] leading-[36px] font-[600] ml-[10px]  text-darkGrey mt-[31px]">Select Your Plan</h1>

<div class="flex items-center justify-start w-full space-x-[14px] px-[10px] ">

    <div
    class="flex items-center custom-border justify-start space-x-[16px] relative  w-full pt-2.5 pr-2.5 pb-2.5 pl-2 h-[87px]  !rounded-[10px] mt-[35px]"
    style="padding: 16px, 10px, 16px, 10px"
    :class="[selectedPlan === 'premium' ? 'bg-selected' :'bg-whiteTamkin']"

  >
   
   

    <div class="flex items-center justify-center relative w-full">
      <div class="order-2  relative w-full">
        <h1 class="font-[500] text-[14px]">Monthly Plan</h1>
     
      </div>
      <div class="order-1 mx-[4px]">
        <input
          id="radio52222"
          type="radio"
          name="radio"
          class="hidden"
             value="premium"
                v-model="selectedPlan"
        />
        <label for="radio52222" class="flex items-center cursor-pointer">
          <span
            class="w-[24px] h-[24px] inline-block mr-1 rounded-full border border-grey"
          ></span>
        </label>
      </div>
    </div>

    
   
  </div>

  <div
  class="flex items-center custom-border-tamkin justify-start space-x-[16px] relative  w-full pt-2.5 pr-2.5 pb-2.5 pl-2 h-[87px]  !rounded-[10px] mt-[35px]"
  style="padding: 16px, 10px, 16px, 10px"
  :class="[selectedPlan === 'premium' ? 'bg-selected' :'bg-whiteTamkin']"

>
 
 

  <div class="flex items-center justify-center relative w-full">
    <div class="order-2  relative w-full">
        <div style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
" class="absolute text-[13px] leading-[17.76px] font-[600] font-[Manrope] w-[69px] custom-border rounded-[10px] h-[22px] 
flex items-center justify-center py-[4.5] px-[0.5px] top-[-35px] left-[15%] text-white ">
            <span>Popular</span>
        </div>
      <h1 class="font-[500] text-[14px]">Annual Plan</h1>
      <h2
      class="font-[500] text-[10px] font-[Manrope]"
    >
    <span class="!text-[#021328] text-[700] ">12%</span> <span class=" text-[#536174]">discount on the monthly Plan</span>
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
<div class="flex items-center custom-border justify-start space-x-[16px] relative  w-full pt-2.5 pr-2.5 pb-2.5 pl-2 h-[87px]  !rounded-[10px] mt-[35px]"
style="padding: 16px, 10px, 16px, 10px"
:class="[selectedPlan === 'premium' ? 'bg-selected' :'bg-whiteTamkin']"

>



<div class="flex items-center justify-center relative w-full">
  <div class="order-2  relative w-full">
      <div style="background: #C16487;
" class="absolute text-[13px] leading-[17.76px] font-[600] font-[Manrope] w-[89px]  rounded-[10px] h-[22px] 
flex items-center justify-center py-[4.5] px-[0.5px] top-[-35px] left-[15%] text-white ">
          <span>Best Value</span>
      </div>
    <h1 class="font-[500] text-[14px]">3- Year Plan</h1>
    <h2
    class="font-[500] text-[10px] "
  >
  <span class="!text-[#021328] text-[700] ">20%</span> <span class=" text-[#536174]">discount on the monthly Plan</span>
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

<div class="flex items-center justify-start w-full space-x-[14px] px-[10px] mt-[50px]">

<div class="flex-1  w-full ">
    <input
    type="text"
    class="input_floating_label h-[45px]  "
   value="tamkin.app"
    placeholder="Search ..."
  />
</div>

<div>
    
<button class="btn-dashboard-normal normal_hover text-[14px] leading-[21px] font-[600]">Add Website</button>
</div>
</div>

<table class="min-w-full bg-white mt-[62px]">
    <thead>
        <tr>
            <th class="py-2 px-4 border-b text-[16px] leading-[24px] text-[#A7A7A7] font-[500] text-left">Website</th>
            <th class="py-2 px-4 border-b text-[16px] leading-[24px] text-[#A7A7A7] font-[500] text-left">Tier</th>
            <th class="py-2 px-4 border-b text-[16px] leading-[24px] text-[#A7A7A7] font-[500] text-right">Price</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="py-2 px-4  border-b text-left text-[16px] leading-[24px] font-[400] text-darkGrey flex items-center justify-start space-x-[33px]">
                <div class="w-[150px]">
                    <span >Tamkin.App</span>
                </div>
                <div>
                    <img src="/assets/imgs/icons/bin.svg" alt="">
                </div>

            </td>
            <td class="py-2 px-4 border-b text-left  text-[16px] leading-[24px] font-[400] text-darkGrey">Large</td>
            <td class="py-2 px-4 border-b text-right  text-[16px] leading-[24px] font-[400] text-darkGrey">$30,444.00</td>
        </tr>
        <tr>
            <td class="py-2 px-4 border-b text-left text-[16px] leading-[24px] font-[400] text-darkGrey flex items-center justify-start space-x-[33px]">
                <div class="w-[150px]">
                    <span class="w-[150px]">Pinterest.App</span>
                </div>
                <div>
                    <img src="/assets/imgs/icons/bin.svg" alt="">
                </div>

            </td>            <td class="py-2 px-4 border-b text-left  text-[16px] leading-[24px] font-[400] text-darkGrey">Small</td>
            <td class="py-2 px-4 border-b text-right  text-[16px] leading-[24px] font-[400] text-darkGrey">$20,444.00</td>
        </tr>
        <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE]">
            <td class="py-2 px-4 border-b text-right font-semibold w-full" colspan="2" >Subtotal</td>
            <td class="py-2 px-4 border-b text-right w-full" colspan="2">$50,444.00</td>
        </tr>
        <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE]">
            <td class="py-2 px-4 border-b text-right font-semibold w-full" colspan="2" >Total</td>
            <td class="py-2 px-4 border-b text-right w-full" colspan="2">$50,444.00</td>
        </tr>
    </tbody>
</table>
        </div>
    </div>

</template>