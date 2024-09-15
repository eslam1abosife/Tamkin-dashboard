<script lang="ts" setup>
const localePath = useLocalePath()
const pakcagesStore = usePackgesStore()
onMounted(async ()=>{
  await pakcagesStore.getProgramInvestor()
})
const dynamicWidth = computed(() => {
  const percent = pakcagesStore.investorProgram.tokens_raised_percent;
  return `${percent}%`; // Format as a percentage string
});
</script>

<template>
<div class="w-full" v-if="pakcagesStore.investorProgram">
  <div class="my-[48px] text-center w-2/4 mx-auto">
   <span class="bg-gradient-to-r from-[#11A290] to-[#9747FF] text-transparent bg-clip-text text-[20px] 
   font-[700] leading-[35px]">Join our Investor Program  </span><span class="text-[20px] font-[600] leading-[35px] text-darkGrey"> for tailored investment opportunities and expert support

   </span>


  </div>
  <div class="bg-gradient-to-l  w-full from-[#EEE4FF] via-[#BCD7FF]
   to-[#F5FFFE] relative space-x-[80px] flex items-center justify-between p-6 rounded-lg  mt-[32px]">
    <div class="flex items-start justify-center flex-col w-3/4">
        <h2 class="text-[16px] font-[600] leading-[22px] text-black">{{pakcagesStore.investorProgram.name}}</h2>

        <div class="flex justify-between items-center mt-4 w-3/4">
          <div>
            <p class="text-[14px]  font-[500] text-gray-900 ">{{ pakcagesStore.investorProgram.dollar_symbol}}</p>
            <p class="text-[14px] text-darkGrey">Investors Count</p>
          
          </div>
          <div class="text-right">
            <p class="text-[14px]  font-[500]  text-gray-900">{{pakcagesStore.investorProgram.tokens_raised}} {{pakcagesStore.investorProgram.token_symbol}}</p>
            <p class="text-[14px] text-darkGrey">Investors Tokens</p>
          </div>
       
        </div>
            
        <div class="relative mt-6 w-3/4">
            <div class="h-4 bg-white rounded-full">
              <div class="h-4 bg-gradient-to-t  from-tamkinEnd to-tamkinStart rounded-full" :style="{ width:dynamicWidth }"></div>
            </div>
            <div class="absolute  transform -translate-x-1/2 -top-8 text-center" :style="{ left: dynamicWidth }">
              <span class=" px-2 py-1 rounded text-gray-700 text-sm font-semibold">{{Number(pakcagesStore.investorProgram.tokens_raised_percent)}}%</span>
            </div>
          <div class="flex items-center justify-between w-full mt-4 ">
            <p class="text-sm text-gray-500">{{ pakcagesStore.investorProgram.softcap}}</p>
            <p class="text-right text-sm text-gray-500">{{ pakcagesStore.investorProgram.tokens_for_sale}} {{ pakcagesStore.investorProgram.token_symbol}}</p>
          </div>
          </div>
          <div class="mt-6 flex justify-between items-center">
            <nuxt-link :to="localePath({name: 'how-to-join'})" class="btn-dashboard hover_tamkin max-w-[250px]">
              Join to Investor Program
            </nuxt-link>
          
          </div>
    </div>
    
        
    <div class="relative w-[240px] right-[-25px] h-[210px] bg-[#A6D8E8] rounded-[10px]">
        <div class="absolute right-8 top-[40px]">
            <img src="/imgs/man-invest.png" class="w-[128px] h-[224px]" alt="">
           </div>
           <div class="absolute right-2 top-[-40px]">
            <img src="/imgs/invest_coin.png" class="w-[60px] h-[89px]" alt="">
           </div>
           <div class="absolute left-1 top-[40px]">
            <img src="/imgs/invest_coin.png" class="w-[40px] h-[69px]" alt="">
           </div>

          
   </div>
   <div class="absolute right-[180px] top-[140px] bg-white rounded-[10px] p-[16px] flex flex-col items-center justify-center " style="box-shadow: 0px 0px 13.8px 0.31px #5ECCC38F;
   ">
               <div class="text-[10px] font-[600] text-[#2E323B] ">
                   Our Creative Team
               </div>
   
               <div class="flex items-center justify-center space-x-[-10px] mt-[10px]">
                   <div>
                       <img src="/imgs/team_member.png" class="w-[25px] h-[25px] rounded-full object-fit object-center" alt="">
                   </div>
                   <div>
                       <img src="/imgs/team_member2.png" class="w-[25px] h-[25px] rounded-full object-fit object-center" alt="">
                   </div>
                   <div>
                       <img src="/imgs/team_member.png" class="w-[25px] h-[25px] rounded-full object-fit object-center" alt="">
                   </div>
                   <div>
                       <img src="/imgs/team_member.png" class="w-[25px] h-[25px] rounded-full object-fit object-center" alt="">
                   </div>
               </div>
   
               <button class="mt-[10px] btn-dashboard hover_tamkin max-w-[80px] !text-[8px] !p-3 !h-[20px]">Contact US</button>
              </div>
        
      
      </div>
</div>
      
</template>