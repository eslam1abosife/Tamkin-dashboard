<script lang="ts" setup>
import {useFullUrl} from '@/composables/useSharedFunctions'
const {fullUrl} = useFullUrl()
const packagesStore = usePackgesStore();
const openedTabs = ref(['addons']);
const props = defineProps({
  
  currentPage: String
})
const toggleTab = (tab) => {
  const index = openedTabs.value.indexOf(tab);
  if (index === -1) {
    openedTabs.value.push(tab);
  } else {
    openedTabs.value.splice(index, 1);
  }
};



const uniqueValues = (items) => {
  const seen = new Set();
  
  const uniqueItems = items.filter(item => {
    if (seen.has(item.title)) {
      return false; 
    }
    seen.add(item.title);
    return true; 
  });

  return uniqueItems.sort((a, b) => a.idx - b.idx);
};

const filteredItem = (sectionName, index,title) => {
  const currentPackage =props.currentPage === 'sign'? packagesStore.getPackageByTypeAndCategory("Package")[index]?.name :packagesStore.getPackagesByPricingAndViews('Package',packagesStore.traffic_level)[index]?.name;
  return packagesStore.sections[sectionName]?.filter(x => x.title === title && x.parent === currentPackage)[0];
};

const filteredSections = computed(() => {
  const sections = packagesStore.sections;
  
  return Object.keys(sections)
    .filter(sectionName => sectionName !== 'none' && sectionName !== 'xx')
    .reduce((filtered, sectionName) => {
      filtered[sectionName] = sections[sectionName];
      return filtered;
    }, {});
});
const getFeaturesForSection = (sectionName) => {
  const featuresObject = packagesStore.sections.find(obj => obj[sectionName]);
  return featuresObject ? featuresObject[sectionName] : {};
};

</script>

<template>
    <div class="flex items-center justify-center flex-col w-full" >
        <div class="flex items-center justify-between ipad-max:flex-col ipadmax:justify-center  mt-[32px] w-full sticky top-[70px] 
         z-[20]" :class="[packagesStore.currentType.title === 'Sign language'?'bg-[#F4F8FF]':'bg-white']">
 
            <div class="text-left mb-8  w-2/4 ipad-max:w-full">
                <h2 class="text-2xl font-semibold text-black">Compare features</h2>
              </div>
              
              <div class="flex justify-end divide-x-2 divide-white w-full ">
                <!-- Free -->
                <div class="bg-white/50 rounded-l-xl p-6 w-1/4 ipad-max:w-full text-center">
                    <div class="flex items-center justify-between w-full">
                       <h3 class="text-[10px] 2xl:text-xs text-left font-semibold text-black "> {{
                        packagesStore.getPackageByTypeAndCategory("Package").length &&
                        packagesStore.getPackageByTypeAndCategory("Package")[0]
                          ? packagesStore.getPackageByTypeAndCategory("Package")[0].title
                          : ""
                      }}</h3>
                      <div class="flex justify-center mb-2" v-if="packagesStore.getPackageByTypeAndCategory('Package').length &&
                      packagesStore.getPackageByTypeAndCategory('Package')[0]">
                         <img :src="`https://tamkin.app/${packagesStore.getPackageByTypeAndCategory('Package')[0].icon}`"
                          alt="Pro" class="w-4 h-4 2xl:w-8 2xl:h-8 lg:w-5 lg:h-5">
                     </div>
                    </div>
                    <button class="mt-6 btn-dashboard !text-[14px] !p-1 hover_tamkin">
                       Get started
                    </button>
                </div>
                <!-- Pro -->
                <div class="bg-tamkinLight p-6  w-1/4 ipad-max:w-full text-center">
                    <div class="flex items-center justify-between">
                        <h3 class="text-[10px]  2xl:text-xs font-semibold text-black"> {{
                            packagesStore.getPackageByTypeAndCategory("Package").length &&
                            packagesStore.getPackageByTypeAndCategory("Package")[1]
                              ? packagesStore.getPackageByTypeAndCategory("Package")[1].title
                              : ""
                          }}</h3>
                          <div class="flex justify-center mb-2" v-if="packagesStore.getPackageByTypeAndCategory('Package').length &&
                          packagesStore.getPackageByTypeAndCategory('Package')[1]">
                             <img :src="`https://tamkin.app/${packagesStore.getPackageByTypeAndCategory('Package')[1].icon}`" 
                             alt="Pro" class="w-4 h-4 2xl:w-8 2xl:h-8 lg:w-5 lg:h-5">
                         </div>
                    </div>
                    <button class="mt-6 btn-dashboard !text-[14px] !p-1 hover_tamkin">
                        Get started
                    </button>
                </div>
                <!-- Teams -->
                <div class="bg-tamkinEnd/30 rounded-r-xl p-6  w-1/4 ipad-max:w-full text-center">
                    <div class="flex items-center justify-between">
                       <h3 class="text-[10px] 2xl:text-xs font-semibold text-black"> {{
                        packagesStore.getPackageByTypeAndCategory("Package").length &&
                        packagesStore.getPackageByTypeAndCategory("Package")[2]
                          ? packagesStore.getPackageByTypeAndCategory("Package")[2].title
                          : ""
                      }}</h3>
                       <div class="flex justify-center mb-2" v-if="packagesStore.getPackageByTypeAndCategory('Package').length &&
                        packagesStore.getPackageByTypeAndCategory('Package')[2]">
                           <img :src="`https://tamkin.app/${packagesStore.getPackageByTypeAndCategory('Package')[2].icon}`"
                            alt="Pro" class="w-4 h-4 2xl:w-8 2xl:h-8 lg:w-5 lg:h-5">
                       </div>
                    </div>
                    <button class="mt-6 btn_bordered_dashboard !text-[14px] !p-1 w-full hover_tamkin">
                       Get started
                    </button>
                </div>
              </div>
        </div>
    
     <div v-for="(section, name, index) in filteredSections" :key="index" class="w-full" >
        <div  @click="toggleTab(name)" class="bg-[#ECECF0]  cursor-pointer w-full h-[50px]
         mt-[32px] flex items-center justify-between px-[20px]" :class="[openedTabs.includes(name) ? 'rounded-t-[10px]':'rounded-[10px]']">
            <div class="flex items-center justify-center gap-4">
             <svg v-if="name === 'addons'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
             stroke-width="1.5" stroke="currentColor" class="size-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
               </svg>
               
           
              <svg v-if="name === 'support'"  class="size-6" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"></path>
              </svg>
              
              <svg v-if="name === 'management'" class="size-6"  data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"></path>
              </svg>
             <div class="text-[17px] !font-[700]  text-[#18181B] leading-[20px]">
                 {{ name.toUpperCase() }}
             </div>
          
            </div>
               
             <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
             </svg>
          
         </div>
         <div class="overflow-x-auto w-full " v-if="openedTabs.includes(name)">
             <table class="min-w-full table-auto border-collapse border bg-white border-gray-200">
               <tbody>
                 <!-- First Row -->
                  
                 <tr class="relative" v-for="(value, key, i) in uniqueValues(filteredSections[name])" :key="key">
                   <td class="px-6 w-2/4 py-4 text-sm text-gray-700 border border-gray-200">
                    
                    <div class="flex items-center justify-between text-[14px] leading-[12px] text-[#18181B] font-[500] whitespace-nowrap">
                        <div class="whitespace-nowrap"> {{ value.title }}</div>
                        <span v-if="value && value.note" class="tooltip packages " :data-tamkin="value.note">
                          <svg
                            width="16"
                            class="mr-[100px]"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                              fill="#71DAD2"
                            />
                          </svg>
                        </span>
                      </div>
                </td>
                   <td class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200" v-if="filteredItem(name,0,value.title)">

                    <div class="flex justify-center items-center h-full" v-if="filteredItem(name,0,value.title).is_available 
                    && !filteredItem(name,0,value.title).description">
                      <img :src="filteredItem(name,0,value.title).is_available? '/assets/imgs/checked_list_active.svg' : '/assets/imgs/checked_list_inactive.svg'" />
                    </div>
                    <div v-else-if="filteredItem(name,0,value.title).description" class="text-[14px] text-darkGrey">
                      {{ filteredItem(name,0,value.title).description }}
                    </div>
                    <div v-else class="flex justify-center items-center h-full">
                      <img src="/assets/imgs/checked_list_inactive.svg" />
                    </div>
                   </td>
                  
                   <td class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200" v-if="filteredItem(name,1,value.title)">

                    <div class="flex justify-center items-center h-full" v-if="filteredItem(name,1,value.title).is_available 
                    && !filteredItem(name,1,value.title).description">
                      <img :src="filteredItem(name,1,value.title).is_available? '/assets/imgs/checked_list_active.svg' : '/assets/imgs/checked_list_inactive.svg'" />
                    </div>
                    <div v-else-if="filteredItem(name,1,value.title).description" class="text-[14px] text-darkGrey">
                      {{ filteredItem(name,1,value.title).description }}
                    </div>
                    <div v-else class="flex justify-center items-center h-full">
                      <img src="/assets/imgs/checked_list_inactive.svg" />
                    </div>
                   </td>
                   <td class="px-6 w-1/6 py-4 text-sm text-center text-gray-700 border border-gray-200" v-if="filteredItem(name,2,value.title)">

                    <div class="flex justify-center items-center h-full" v-if="filteredItem(name,2,value.title).is_available 
                    && !filteredItem(name,2,value.title).description">
                      <img :src="filteredItem(name,2,value.title).is_available? '/assets/imgs/checked_list_active.svg' : '/assets/imgs/checked_list_inactive.svg'" />
                    </div>
                    <div v-else-if="filteredItem(name,2,value.title).description" class="text-[14px] text-darkGrey">
                      {{ filteredItem(name,2,value.title).description }}
                    </div>
                    <div v-else class="flex justify-center items-center h-full">
                      <img src="/assets/imgs/checked_list_inactive.svg" />
                    </div>
                   </td>
                 </tr>
                
   
            
                
               </tbody>
             </table>
           </div>
     </div>
    </div>
    
      

</template>