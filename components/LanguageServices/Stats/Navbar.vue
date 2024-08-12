<script setup>


const selectedTab = ref('webplugins')

const emit = defineEmits(['selectTabs'])

const selectTabs =(tab)=>{
    selectedTab.value = tab
    emit('selectTabs',tab)
}


</script>

<template>
  <div
    ref="navContainer"
    class="absolute top-[225px] z-[50] flex items-center justify-start space-x-[50px]
 left-0 w-full "
  >

<div class="relative border-b-1 border-transparent cursor-pointer"  style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);" @click="selectTabs('webplugins')">
<div class="text-[14px]  leading-[24px]  " :class="[selectedTab === 'webplugins' ? 'font-[600] text-black' : 'font-[500] text-darkGrey']">
    Web Plugins
</div>
    <div v-if="selectedTab === 'webplugins'" class="absolute inset-0 top-full h-[2px] bg-gradient-to-b from-[#2DADA3] to-[#71DAD2]"></div>

</div>


<div class="relative border-b-1 border-transparent cursor-pointer " @click="selectTabs('Media')">
    <div class="text-[14px]  leading-[24px]  "
    :class="[selectedTab === 'Media' ? 'font-[600] text-black' : 'font-[500] text-darkGrey']"
    style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);">
       Media
    </div>
        <div v-if="selectedTab === 'Media'" class="absolute inset-0 top-full h-[2px] bg-gradient-to-b from-[#2DADA3] to-[#71DAD2]"></div>
    
    </div>

    <div class="relative border-b-1 border-transparent cursor-pointer " @click="selectTabs('Documents')">
        <div class="text-[14px]  leading-[24px]  "
        :class="[selectedTab === 'Documents' ? 'font-[600] text-black' : 'font-[500] text-darkGrey']"
        style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);">
        Documents
        </div>
            <div v-if="selectedTab === 'Documents'" class="absolute inset-0 top-full h-[2px] bg-gradient-to-b from-[#2DADA3] to-[#71DAD2]"></div>
        
        </div>


        <div class="relative border-b-1 border-transparent cursor-pointer " @click="selectTabs('Images')">
            <div class="text-[14px]  leading-[24px]  "
            :class="[selectedTab === 'Images' ? 'font-[600] text-black' : 'font-[500] text-darkGrey']"
            style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);">
            Images
            </div>
                <div v-if="selectedTab === 'Images'" class="absolute inset-0 top-full h-[2px] bg-gradient-to-b from-[#2DADA3] to-[#71DAD2]"></div>
            
            </div>
    </div>


</template>

<style scoped>
.active_subNavb {

  @apply bg-accessNavbarbg dark:bg-tamkin-accessibility-navbar transition-all dark:border-0  ease-in w-full lg:w-[96px] h-[31px] cursor-pointer rounded-[22px] 
  border-[1px] border-black flex items-center justify-center text-darkGrey  text-[11px] font-[500] text-center;
}

.active_subNavb__div {

  @apply  bg-accessNavbarbg dark:bg-tamkin-accessibility-navbar dark:border-0 transition-all ease-out 
  w-full lg:w-[96px] h-[31px] cursor-pointer rounded-[22px]  dark:!bg-darkSecondary
  border-[1px] border-black flex items-center justify-center text-darkGrey dark:!text-white  !text-[13px] font-[500] text-center;
}

.router-link-active.router-link-exact-active{
@apply   !text-[13px] !font-[500] text-center text-darkGrey dark:text-white;

}
a{
  @apply  
  !text-[13px] font-[500] text-center;
}
.sub_menu_item {
  @apply text-[#A7A7A7] text-[13px] w-full lg:w-[96px] h-[31px] bg-transparent rounded-[22px] border-[1px]
   border-transparent flex items-center justify-center leading-[22.5px] font-[600] text-center cursor-pointer;
}

.slider-transition-enter-active, .slider-transition-leave-active {
  transition: transform 0.3s ease-out, width 0.3s ease-out;
}
.slider-transition-enter, .slider-transition-leave-to {
  transform: translateX(0);
  width: 0;
}

.slider-transition {
  transition: transform 0.3s ease-out, width 0.3s ease-out;
}
</style>
