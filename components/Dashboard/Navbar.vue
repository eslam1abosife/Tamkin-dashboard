<script lang="ts" setup>


const props = defineProps({
  sideBarOpen: Boolean,
});

const emit = defineEmits(['toggleSidebar']);

function toggleSidebar() {
  emit('toggleSidebar');
}
const showSubMenu = ref(new Array(3).fill(false)); // initialize an array of booleans to track the visibility of each submenu

const openMenuSub = (id: any) => {
//   showSubMenu.fill(false); // reset all submenus to hidden
  showSubMenu.value[id] = !showSubMenu.value[id]; // toggle the visibility of the clicked submenu

  console.log(showSubMenu.value[id])
}
</script>


<template>
    <div class="flex flex-col items-center justify-evenly relative" :class="[sideBarOpen ? '':'w-[99px]']">
     
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

        <div class="flex flex-col items-center  mt-[14.5px] " :class="[!sideBarOpen ? 'justify-center' : 'justify-start']">
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
            <div class="relative w-full" 
            
            :class="{'active':showSubMenu[1] === true,'w-[55px]':!sideBarOpen}" @click="openMenuSub(1)">
          
            <div class=" dashboard-nav-link-has-menu ">
                <div>
                    <img src="/assets/imgs/icons/signlang.svg" alt=""  class="pl-[16px] bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2]  text-transparent bg-clip-text">
                </div>
                <div  v-if="sideBarOpen">Sign language Services</div>
                <div v-if="sideBarOpen">
                    <svg width="7" height="12" :class="[showSubMenu[1] ? 'rotate-90' : '']" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                                <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                            </linearGradient>
                        </defs>
                        <path :fill="showSubMenu[1] ? 'url(#grad1)' : '#585B5B'" fill-rule="evenodd" clip-rule="evenodd" d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z" />
                    </svg>
                    
                        
              
                        
                                        </div>
            </div>
                <div class="menu_item bg-white  top-full rounded-[10px] h-[215px] " 
                :class="[sideBarOpen? 'left-[-30px] ': 'left-[85px] ' , showSubMenu[1] ? 'block' : 'hidden']"           
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
            <div class="relative w-full" 
            
            :class="{'active':showSubMenu[2] === true,'w-[55px]':!sideBarOpen}" @click="openMenuSub(2)">
          
            <div class=" dashboard-nav-link-has-menu ">
                <div>
                    <img src="/assets/imgs/icons/signlang.svg" alt=""  class="pl-[16px] bg-gradient-to-r from-[#2DADA3]  to-[#71DAD2]  text-transparent bg-clip-text">
                </div>
                <div  v-if="sideBarOpen">Sign language Services</div>
                <div v-if="sideBarOpen">
                    <svg width="7" height="12" :class="[showSubMenu[2] ? 'rotate-90' : '']" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="#2DADA3" stop-opacity="1" />
                                <stop offset="100%" stop-color="#71DAD2" stop-opacity="1" />
                            </linearGradient>
                        </defs>
                        <path :fill="showSubMenu[2] ? 'url(#grad1)' : '#585B5B'" fill-rule="evenodd" clip-rule="evenodd" d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z" />
                    </svg>
                    
                        
              
                        
                                        </div>
            </div>
                <div class="menu_item bg-white  top-full rounded-[10px] h-[215px] " 
                :class="[sideBarOpen? 'left-[-30px] ': 'left-[85px] ' , showSubMenu[2] ? 'block' : 'hidden']"           
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