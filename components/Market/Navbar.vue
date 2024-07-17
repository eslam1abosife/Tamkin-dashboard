<script lang="ts" setup>
import { useNavbarStore } from "@/stores/navbar";

const scrollContainer = ref(null);

const navStore = useNavbarStore();

const navStoreRef = storeToRefs(navStore);

navStoreRef.sideBarOpen
onMounted(() => {
if(process.client){
    const container = scrollContainer.value;
  container.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  });
}
});
</script>


<template>

    <div ref="scrollContainer" class="scroll-container no-scrollabar bg-[#F7F7F7] h-[61px] rounded-xl overflow-x-auto overflow-y-hidden">
        <div class="scroll-content flex items-center justify-between   pt-[5px] space-x-2">
          <div class="scroll-item cursor-pointer flex items-center justify-center space-x-[10px] bg-white rounded-t-xl flex-grow ">
            <div>
              <img src="/assets/pngs/market/character.png" class="w-[25px] h-[25px]" alt="" />
            </div>
            <div>Character</div>
          </div>
          <div class="scroll-item cursor-pointer flex items-center justify-center space-x-[10px] rounded-t-xl flex-grow ">
            <div>
              <img src="/assets/pngs/market/top.svg" class="w-[25px] h-[25px]" alt="" />
            </div>
            <div>Top</div>
          </div>
          <div class="scroll-item cursor-pointer flex items-center justify-center space-x-[10px] rounded-t-xl flex-grow ">
            <div>
              <img src="/assets/pngs/market/bottom.svg" class="w-[25px] h-[25px]" alt="" />
            </div>
            <div>Bottom</div>
          </div>
          <div class="scroll-item cursor-pointer flex items-center justify-center space-x-[10px] rounded-t-xl flex-grow ">
            <div>
              <img src="/assets/pngs/market/outfit.svg" class="w-[25px] h-[25px]" alt="" />
            </div>
            <div>Outfit</div>
          </div>
          <div class="scroll-item cursor-pointer flex items-center justify-center space-x-[10px] rounded-t-xl flex-grow ">
            <div>
              <img src="/assets/pngs/market/shoes.svg" class="w-[25px] h-[25px]" alt="" />
            </div>
            <div>Shoes</div>
          </div>
          <div class="scroll-item cursor-pointer flex items-center justify-center space-x-[10px] rounded-t-xl flex-grow ">
            <div>
              <img src="/assets/pngs/market/cap.svg" class="w-[25px] h-[25px]" alt="" />
            </div>
            <div>Cap</div>
          </div>
          <div class="scroll-item cursor-pointer flex items-center justify-center space-x-[10px] rounded-t-xl flex-grow ">
            <div>
              <img src="/assets/pngs/market/belt.svg" class="w-[25px] h-[25px]" alt="" />
            </div>
            <div>Belt</div>
          </div>
          <div class="scroll-item cursor-pointer flex items-center justify-center space-x-[10px] rounded-t-xl flex-grow ">
            <div>
              <img src="/assets/pngs/market/glasses.svg" class="w-[25px] h-[25px]" alt="" />
            </div>
            <div>Glasses</div>
          </div>
        </div>
      </div>
      
</template>

<style scoped>
.scroll-container {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  width:100%;
}

.scroll-content {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;

}

.scroll-item {
  flex: 0 0 150px; /* Fixed width for each item */
@apply h-[60px];

}

.scroll-container::-webkit-scrollbar {
    height: 6px; /* Adjust scrollbar height */
  }
  
  .scroll-container::-webkit-scrollbar-thumb {
@apply bg-tamkin/40;
    border-radius: 10px; /* Roundness of the scrollbar */
  }
  
  .scroll-container::-webkit-scrollbar-thumb:hover {
    @apply bg-tamkin/80;
}
  
</style>