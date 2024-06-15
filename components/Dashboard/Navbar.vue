<script lang="ts" setup>


const props = defineProps({
  sideBarOpen: Boolean,
});

const emit = defineEmits(['toggleSidebar']);

function toggleSidebar() {
  emit('toggleSidebar');
}
const openMenuSub = (id:any)=>{

}
</script>


<template>
    <div class="flex flex-col items-center justify-evenly relative" :class="[sideBarOpen ? '':'w-[99px]']">
        <div class="close_sidebar_btn group" @click="toggleSidebar">
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" class="fill-tamkin group-hover:stroke-white group-hover:fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"/>
            </svg>
            
                
        </div>
        <div class="self-start">
            <img src="/assets//imgs/logo.png" class="h-[74px] w-[146px]" alt="" v-if="sideBarOpen">
            <img src="/assets//imgs/icons/tamkin_small.svg" class="py-[16px]" alt="" v-else>
        </div>
        <img src="/assets/imgs/team.png" class="w-[40px] h-[40px]" alt="" :class="[!sideBarOpen ? 'block':'hidden']">

        <div class="tamkin_team_card" :class="[!sideBarOpen ? 'border-none bg-transparent hidden':'']">
            <img src="/assets/imgs/team.png" class="w-[40px] h-[40px]" alt="" :class="[!sideBarOpen ? 'block':'']">

            <div class="flex items-center space-x-[100px]">
                <div class="order-2 ltr:ml-[12px] rtl:mr-[12px]" :class="[!sideBarOpen ? 'hidden':'block']">
                    <h2 class="font-[400] text-[16px]  " style="line-height:24px;">{{ $t('Tamkin') }}</h2>
                    <h3 class="font-[400] text-[13px]  " style="line-height:19.5px;">3 {{ $t('teamcount') }}
                    </h3>

                </div>
                <div class="order-3  " :class="[!sideBarOpen ? 'hidden':'block']">
                    <svg class="arrow_svg" width="7" height="12" viewBox="0 0 7 12"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z" />
                    </svg>



                </div>
            </div>

        </div>


        <hr class="w-full mx-auto h-[1px] bg-lightGrey my-[28px]">
        <button class="btn-dashboard flex items-center justify-start" v-if="sideBarOpen">
            <div class="order-2 flex-1 ">Add site </div>
          <div class="order-1 ml-[16px]">
            <img src="/assets/imgs/icons/add.svg" alt=""  class=" bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2]  text-transparent bg-clip-text">


          </div>
            <!-- <i class="fa-regular fa-circle-plus"></i> -->


        </button>
        <button class="rounded-full bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2] flex items-center justify-start" v-else>
          
            <img src="/assets/imgs/icons/add.svg" alt=""  class=" bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2]  text-transparent bg-clip-text">


            <!-- <i class="fa-regular fa-circle-plus"></i> -->


        </button>

        <div class="flex flex-col items-center  mt-[14.5px]" :class="[!sideBarOpen ? 'justify-center' : 'justify-start']">
            <div class="dashboard-nav-link " :class="[!sideBarOpen ? 'w-[55px]' : 'w-full lg:w-[325px]']">
                <div>
                <img src="/assets/imgs/icons/dashboard.svg" alt=""  class="pl-[16px] bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2]  text-transparent bg-clip-text">
            </div>
                <span v-if="sideBarOpen">Dashboard</span>
            </div>
            <div class="dashboard-nav-link " :class="[!sideBarOpen ? 'w-[55px]' : 'w-full lg:w-[325px]']">
                <div>
                <img src="/assets/imgs/icons/dashboard.svg" alt=""  class="pl-[16px] bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2]  text-transparent bg-clip-text">
            </div>
                <span v-if="sideBarOpen">Dashboard</span>
            </div>
            <div class="dashboard-nav-link " :class="[!sideBarOpen ? 'w-[55px]' : 'w-full lg:w-[325px]']">
                <div>
                <img src="/assets/imgs/icons/dashboard.svg" alt=""  class="pl-[16px] bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2]  text-transparent bg-clip-text">
            </div>
                <span v-if="sideBarOpen">Dashboard</span>
            </div>
            <div class="dashboard-nav-link has_menu active" :class="[!sideBarOpen ? 'closedNav' :'w-full lg:w-[325px]']">
                <div>
                    <img src="/assets/imgs/icons/signlang.svg" alt=""  class="pl-[16px] bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2]  text-transparent bg-clip-text">
                </div>
                <div  v-if="sideBarOpen">Sign language Services</div>
                <div>
                    <font-awesome-icon :icon="['fas', 'caret-down']" class="icon" :mask="['fas', 'square-full']" />
                </div>
                <div class="menu_item bg-white absolute top-full   rounded-[10px] h-[215px]" :class="[sideBarOpen ? 'left-[-30px]' : 'left-[70px]']"
                    style="

padding: 10px 40px 10px 40px;


">

<div class="flex w-full">

<div class=" bg-white  relative w-full h-full left-0">

<div class="absolute inset-y-0 left-0 w-1 rounded-[10px] bg-lightMenuBarColor h-full"></div>
<ul class="mt-4 space-y-[10px]">
<li class=" rounded-[10px] relative">
<div class="absolute inset-y-0 left-0 w-1 rounded-[10px] bg-tamkin h-full"></div>
<a href="#" class="block text-gray-800 hover:bg-gray-200 py-[10px] ml-[10px] w-[225px] h-[40px] active_sub_menu">Overview</a>
</li>
<li class=" rounded-[10px] relative w-full">

<a href="#" class="block text-gray-800 hover:bg-gray-200 py-[10px] ml-[10px]  w-[225px] h-[40px]">Overview</a>
</li>
<li class=" rounded-[10px] relative">

<a href="#" class="block text-gray-800 hover:bg-gray-200 py-[10px] ml-[10px] w-[225px] h-[40px]">Overview</a>
</li>

</ul>
</div>
</div>

                </div>
            </div> 
        </div>
    </div>
</template>