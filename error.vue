<script setup>
const error = useError();
const localePath = useLocalePath()
const layoutStore = useLayoutStore()
const route = useRoute()
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  const pattern = localePath(path);

  // If the pattern does not contain a wildcard, do an exact match
  if (!pattern.includes("*")) {
    return currentPath === pattern;
  }

  // Convert wildcard pattern to regex
  const regex = new RegExp("^" + pattern.replace(/\/\*/g, ".*") + "$");

  return regex.test(currentPath);
};

const router = useRouter()

const currentLay = computed(()=>{
  return layoutStore.currentLayout;
})
const goBack = () => {
  router.back()
}
onBeforeMount(()=>{
  if(isLinkActive('/auth/*')){
    layoutStore.setLayout('error')

  }else {
    layoutStore.setLayout('dashboard')

  }

})

</script>

<template>
<div class="h-full w-full">
 
    <NuxtLayout :name="currentLay"  v-if="currentLay === 'dashboard'" >
     
      <div class="absolute top-[-20px] left-[-20px] h-[258px] w-[221px] bg-gradient-to-br from-[#651FFF]/20 rounded-full blur-3xl  to-[#00BCD4]/20">
      
      </div>
      
      <div class="absolute top-[-100px] left-[350px] h-[258px] w-[221px] bg-gradient-to-br from-[#651FFF]/20 via-[#00E5FF]/20
      rounded-full blur-3xl  to-[#FF4081]/20">
      
      </div>
      
      <div class="absolute top-[-100px] left-[350px] h-[258px] w-[221px] bg-gradient-to-br from-[#D81B60]/20 via-[#84FFFF]/20
      rounded-full blur-3xl  to-[#311B92]/20">
      
      </div>
      <div class="absolute top-[-100px] right-[0] h-[258px] w-[221px] bg-gradient-to-br from-[#FF4081]/20 
      rounded-full blur-3xl  to-[#F8BBD0]/20">
      
      <div class="absolute top-[-60px] right-[300px] h-[258px] w-[221px] bg-gradient-to-br from-[#FF4081]/20 
      rounded-full blur-3xl  to-[#F8BBD0]/20"></div>
      </div>
          <div class="flex items-center justify-center h-full w-full mt-[100px]">
            <!-- Container for the image and text side-by-side -->
            <div class="flex items-center">
              <!-- Image Section -->
    
              <div class="mr-[30px]">
                <img src="/imgs/notfound.png" class="w-[175px] h-[203px]" alt="Not Found">
              </div>
              
              <!-- Text Section -->
              <div class="flex flex-col items-start">
                <div class="bg-gradient-to-br from-[#B2EBF2] via-[#D1C4E9] to-[#F8BBD0] text-[68px] text-transparent bg-clip-text font-[800] mb-[20px]">
                  {{error.statusCode}}
      
            
                </div>
                <div class="text-[21px] font-[500] leading-[26px] text-black mb-[10px]">
                  {{error.statusCode === 404 ? 'This page could not be found' : 'Something wrong happend !'}}
                </div>
                <div class="text-[14px] font-[500] leading-[21px] text-black">
                  You can either stay and chill here, or go back to the beginning.
      
                </div>
                {{ currentLay}}
      
                <button class="btn-dashboard hover_tamkin mt-[32px] max-w-[151px]" @click="goBack">GO Back</button>
              </div>
            </div>
          </div>
          

      </NuxtLayout>
      
<div class="relative" v-else :class="[currentLay !== 'dashboard' ? 'bg-[#0D0725] h-screen' : '']">
  <div class="absolute top-[-20px] left-[-20px] h-[258px] w-[221px] bg-gradient-to-br from-[#651FFF]/20 rounded-full blur-3xl  to-[#00BCD4]/20">
      
  </div>
  
  <div class="absolute top-[-100px] left-[350px] h-[258px] w-[221px] bg-gradient-to-br from-[#651FFF]/20 via-[#00E5FF]/20
  rounded-full blur-3xl  to-[#FF4081]/20">
  
  </div>
  
  <div class="absolute top-[-100px] left-[350px] h-[258px] w-[221px] bg-gradient-to-br from-[#D81B60]/20 via-[#84FFFF]/20
  rounded-full blur-3xl  to-[#311B92]/20">
  
  </div>
  <div class="absolute top-[-100px] right-[0] h-[258px] w-[221px] bg-gradient-to-br from-[#FF4081]/20 
  rounded-full blur-3xl  to-[#F8BBD0]/20">
  
  <div class="absolute top-[-60px] right-[300px] h-[258px] w-[221px] bg-gradient-to-br from-[#FF4081]/20 
  rounded-full blur-3xl  to-[#F8BBD0]/20"></div>
  </div>
      <div class="flex items-center justify-center h-full w-full ">
        <!-- Container for the image and text side-by-side -->
        <div class="flex items-center">
          <!-- Image Section -->

          <div class="mr-[30px]">
            <img src="/imgs/notfound.png" class="w-[175px] h-[203px]" alt="Not Found">
          </div>
          
          <!-- Text Section -->
          <div class="flex flex-col items-start">
            <div class="bg-gradient-to-br from-[#B2EBF2] via-[#D1C4E9] to-[#F8BBD0] text-[68px] text-transparent bg-clip-text font-[800] mb-[20px]">
              {{error.statusCode}}
  
        
            </div>
            <div class="text-[21px] text-whiteTamkin  font-[500] leading-[26px]  mb-[10px]">
              {{error.statusCode === 404 ? 'This page could not be found' : 'Something wrong happend !'}}
            </div>
            <div class="text-[14px]  text-whiteTamkin font-[500] leading-[21px]">
              You can either stay and chill here, or go back to the beginning.
  
            </div>
            {{ currentLay}}
  
            <button class="btn-dashboard hover_tamkin mt-[32px] max-w-[151px]" @click="goBack">GO Back</button>
          </div>
        </div>
      </div>
      
</div>
  
</div>
</template>
