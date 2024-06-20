<script lang="ts" setup>

const head = useLocaleHead({
    addDirAttribute: true,
    addSeoAttributes: true,
})
const htmlAttrs = computed(() => head.value.htmlAttrs!)

const isSearchfilled = ref(false)
const search  = ref('')
const sideBarOpen = ref(true);

function toggleSidebar() {
  sideBarOpen.value = !sideBarOpen.value;
}
watch(search,(ov,nv)=>{
    return search.value.length >0 ? isSearchfilled.value = true : isSearchfilled.value = false
})
const clearInput = ()=>{
    search.value = ""
}

</script>

<template>
    <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">

        <div class="bg_dashboard w-full h-full max-h-screen">
            <div class="flex items-center justify-between h-screen relative">
              <!-- sidebar-->
              <div :class="[sideBarOpen ? 'w-[450px]' : 'w-[100px]']" class="h-full relative flex items-center justify-start flex-col bg-white border-r border-[1px] border-lightGrey">
                <div @click="toggleSidebar" :class="[!sideBarOpen ? 'left-[80px] rotate-180' : '']" class="close_sidebar_btn group z-[300]">
                  <svg width="9" height="15" viewBox="0 0 9 15" fill="none" class="fill-tamkin group-hover:stroke-white group-hover:fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"/>
                  </svg>
                </div>
                <div class="overflow-y-auto no-scrollbar">
                  <DashboardNavbar :sideBarOpen="sideBarOpen" @toggleSidebar="toggleSidebar" class="fixed"/>
                </div>
              </div>
              <!-- end of sidebar-->
              
              <!-- upper nav and content -->
              <div class="relative top-0 w-full h-full container" >
                <nav class="absolute top-0 flex flex-shrink-0 items-center justify-evenly w-full bg-whiteTamkin space-x-[16px]">
                  <div class="ipad-max:w-3/6 lg:w-4/6">
                    <div class="py-[17px] search_input">
                      <input type="text" class="input_dashboard_search w-full" v-model="search" placeholder="Search ...">
                      <div class="absolute top-[16px] p-[16px]"><img src="/assets/imgs/icons/search.svg" alt=""></div>
                      <div v-if="isSearchfilled" @click="clearInput" class="absolute top-[16px] right-0 p-[16px] cursor-pointer"><img src="/assets/imgs/icons/clear_search.svg" alt=""></div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between space-x-[32px]">
                    <div class="flex items-center justify-center border-[1px] border-[#EAEAEA] active_notification rounded-[8px] bg-white w-[48px] h-[48px]">
                      <div class="relative stroke-current text-darkGrey">
                        <div class="absolute bottom-[10px] ltr:left-[5px] rtl:right-[5px] bg-[#FB726D] w-[24px] h-[24px] rounded-full flex items-center justify-center"><span class="text-[12px] font-[700] text-white" style="line-height: 68px;">5</span></div>
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" class="active_bell" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M11.7295 20C11.5537 20.3031 11.3014 20.5547 10.9978 20.7295C10.6941 20.9044 10.3499 20.9965 9.99953 20.9965C9.64915 20.9965 9.30492 20.9044 9.0013 20.7295C8.69769 20.5547 8.44534 20.3031 8.26953 20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div class="flex items-center justify-center space-x-[19px]">
                      <div>
                        <img src="/assets//imgs/avatar.png" class="w-[50px] h-[50px]" alt="">
                      </div>
                      <div>
                        <h2 class="font-[400] text-[12px]" style="line-height:14.4px;">Ali Ahmed</h2>
                      </div>
                      <div>
                        <img src="/assets/imgs/arrow.svg" alt="">
                      </div>
                    </div>
                  </div>
                </nav>
                <div class="mt-[94px] w-full container mx-auto px-[40px]">
                  <NuxtPage />
                </div>
              </div>
              <!-- end of upper nav and content-->
            </div>
          </div>
          

    </Html>
</template>