<script setup>
import { useNavbarStore } from "@/stores/navbar";
import { useMarketStore } from "@/stores/market";
import { useGetCategoriesWithSkinItems } from "@/composables/useMarket";
import { useFullUrl } from "@/composables/useSharedFunctions";
const { fullUrl } = useFullUrl();

const marketStore = useMarketStore();
const scrollNav = ref(null);
const navStore = useNavbarStore();
const  glasses =  ref(null)
const navStoreRef = storeToRefs(navStore);


const props = defineProps(["categoriesWithSkinItems", "loading"]);

const categoriesHavingSkinItems = computed(() => {
  return props.categoriesWithSkinItems && props.categoriesWithSkinItems.length > 0 ?  props.categoriesWithSkinItems.filter((category) => category.skin_items_list.length > 0) :[];
});

const scrollItemRefs = ref({});

onMounted(async () => {
  if (process.client) {
    const container = scrollNav.value;
    container.addEventListener("wheel", (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    });
  }

if(categoriesHavingSkinItems.value.length >0){
  categoriesHavingSkinItems.value.forEach((category) => {
    scrollItemRefs.value[category.name] = null;
  });
}

});



const scrollToItem = async (itemRef) => {
  await nextTick(); // Ensure DOM updates


  const container = scrollNav.value;
  const item = itemRef;

  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  const offsetLeft = itemRect.left - containerRect.left;
  const scrollPosition = offsetLeft + (itemRect.width / 2) - (containerRect.width / 2);

  container.scroll({
    left: scrollPosition,
    behavior: 'smooth'
  });
};

const switchTabAndScroll = async (tabName) => {
  marketStore.switchTabs(tabName);
  await nextTick(); 
  const itemRef = scrollItemRefs.value[tabName];
  console.log(itemRef)

  if (!itemRef) {
    console.error(`No ref found for tab: ${tabName}`);
    return;
  }

  scrollToItem(itemRef);
};



</script>

<template>
  <div
    ref="scrollNav"
    class="scroll-container w-full no-scrollbar  bg-[#F7F7F7] dark:bg-tamkinDarkPrimary  rounded-t-xl overflow-x-auto h-[60px]  relative z-[20]"
  >
    <div class="w-[200px] flex items-center justify-between rtl:space-x-reverse space-x-2">
      <div
      
       ref="character"
      @click="switchTabAndScroll('character')"
          :class="[marketStore.currentTab === 'character' ? 'bg-white dark:bg-[#344153]' : '']"
        class="scroll-item cursor-pointer flex items-center justify-center rtl:space-x-reverse space-x-[10px] rounded-t-xl  flex-grow"
      >
        <div>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.881 24.7544C23.1236 22.3925 21.6358 20.3322 19.6319 18.8705C17.6281 17.4087 15.2119 16.6211 12.7315 16.6211C10.2512 16.6211 7.83496 17.4087 5.83114 18.8705C3.82732 20.3322 2.33944 22.3925 1.58203 24.7544H23.881Z"
              :class="marketStore.currentTab === 'character' ? 'stroke-[#2DB9B0]' : 'stroke-[#878787] dark:stroke-whiteTamkin/60'"
              stroke-width="1.05241"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.7318 16.6317C16.9486 16.6317 20.367 13.2133 20.367 8.99649C20.367 4.77971 16.9486 1.36133 12.7318 1.36133C8.51506 1.36133 5.09668 4.77971 5.09668 8.99649C5.09668 13.2133 8.51506 16.6317 12.7318 16.6317Z"
              :class="marketStore.currentTab === 'character' ? 'stroke-[#2DB9B0]' : 'stroke-[#878787] dark:stroke-whiteTamkin/60'"
              stroke-width="1.05241"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.2245 11.9531C15.2245 11.9531 14.591 13.1997 12.7314 13.1997C10.8718 13.1997 10.2383 11.9531 10.2383 11.9531"
              :class="marketStore.currentTab === 'character' ? 'stroke-[#2DB9B0]' : 'stroke-[#878787] dark:stroke-whiteTamkin/60'"
              stroke-width="1.05241"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.2281 7.5428C20.2111 7.54292 20.1941 7.54297 20.1771 7.54297C17.9577 7.54297 15.9652 6.57201 14.6011 5.03172C13.2369 6.57204 11.2444 7.54302 9.02502 7.54302C7.73626 7.54302 6.52397 7.2156 5.4668 6.6394C6.46003 3.57615 9.33696 1.36133 12.7312 1.36133C16.4509 1.36133 19.5493 4.02127 20.2281 7.5428Z"
                :class="marketStore.currentTab === 'character' ? 'stroke-[#2DB9B0]' : 'stroke-[#878787] dark:stroke-whiteTamkin/60'"
              stroke-width="1.05241"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          :class="[
            marketStore.currentTab === 'character'
              ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
              : 'dark:text-whiteTamkin',
          ]"
        >
          {{$t('Character')}}
        </div>
      </div>
      <!-- loader -->
      <MarketLoader v-if="loading" />
      <!-- dynamic -->
      <div v-for="category in categoriesHavingSkinItems" :key="category.name"
      :ref="el => {
        if (el) {
          scrollItemRefs[category.text] = el;
        }
      }"      @click="switchTabAndScroll(category.text)"
        :class="[marketStore.currentTab === category.text ? 'bg-white dark:bg-darkSecondary' : '']"
        class="scroll-item cursor-pointer flex items-center justify-center rtl:space-x-reverse space-x-[10px] rounded-t-xl rounded-b-none flex-grow">
        <div>

          <img
            class="w-[25px] h-[25px]"
            width="27"
            height="27"
            :src="fullUrl(category.file)"
            >
        </div>
        <div
          :class="[
            marketStore.currentTab === category.name
              ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd bg-clip-text text-transparent'
              : 'dark:text-white',
          ]"
        >
          {{ $t(category.text )}}
        </div>
      </div>
      <!-- end dynamic -->
      
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  width: 100%;
  @apply h-[45px];
  
}

.scroll-content {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}

.scroll-item {
  flex: 0 0 150px; /* Fixed width for each item */
  @apply h-[45px];
}

.scroll-container::-webkit-scrollbar {
  height: 4px; /* Adjust scrollbar height */
}


.scroll-container::-webkit-scrollbar-thumb {
  @apply bg-tamkin/40;
  border-radius: 10px; /* Roundness of the scrollbar */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  @apply bg-tamkin/80;
  
}
</style>
