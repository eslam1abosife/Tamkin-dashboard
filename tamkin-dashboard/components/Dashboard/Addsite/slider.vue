<template>
  <div class="slider-container" ref="slider">
    <div class="div-slider flex lg:flex-col lg:items-start items-center justify-center w-full overflow-hidden" v-swipe:left="onSwipeLeft" v-swipe:right="onSwipeRight">
      <div v-for="(plan, index) in plans" :key="index" class="plan" :class="{ 'is-active': currentIndex === index }">
        <div
          class="flex items-center custom-border justify-start rtl:space-x-reverse lg:space-x-[16px] relative w-[700px] lg:w-full py-[62px] px-[10px] h-[149px] !rounded-[10px] mt-[35px]"
          :class="[selectedPlan && selectedPlan === plan.value ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"
        >
          <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
            <img :src="plan.image" class="w-[50px] h-[50px]" />
          </div>
          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[500] text-[18px] leading-[30px] dark:text-whiteTamkin ipad-max:text-[14px] ipad-max:leading-[16px]">{{ plan.name }}</h1>
              <h2 class="font-[400] text-[14px] leading-[21.86px] text-[#536174] dark:text-whiteTamkin/80 ipad-max:text-[12px] ipad-max:leading-[16px]">{{ plan.description }}</h2>
            </div>
            <div class="order-1 mx-[15px] ipad-max:mx-2">
              <input :id="'radio' + index" type="radio" name="plans_radio" class="hidden" :value="plan.value" @click.stop="selectPlan(plan.value)" />
              <label :for="'radio' + index" class="flex items-center cursor-pointer">
                <span class="radio-tamkin"></span>
              </label>
            </div>
          </div>
          <div
            class="custom-border-collapse lg:h-[350px] w-full left-[-16px] lg:top-[90%] top-[120px] absolute z-[100] mt-2 p-4 dark:bg-tamkinDarkPrimary bg-white"
            v-if="collapsed && selectedPlan === plan.value"
          >
            <div
              class="flex flex-col items-start lg:h-full lg:pt-0 pt-14 h-[100px] lg:overflow-hidden overflow-y-scroll justify-center space-y-[16px] pl-[42px] w-full rounded-t-none rounded-[10px]"
              :class="[selectedPlan && selectedPlan === plan.value ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"
            >
              <div v-for="(feature, featureIndex) in plan.features" :key="featureIndex" class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
                <div><img :src="feature.active ? '/assets/imgs/checked_list_active.svg' : '/assets/imgs/checked_list_inactive.svg'" /></div>
                <div><h3 class="text-[14px] font-[400] leading-[20px]">{{ feature.name }}</h3></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSwipe } from '@vueuse/core'

const slider = ref(null)
const currentIndex = ref(0)
const selectedPlan = ref(null)
const collapsed = ref(false)

const plans = [
  { value: 'free', name: 'Free Widget', description: 'For Individuals and Small Teams', image: '/assets/imgs/freeplan.svg', features: [{ name: 'All analytics features', active: true }, { name: 'All analytics features', active: true }] },
  { value: 'pro', name: 'Pro-Accessibility Widget', description: 'For Individuals and Small Teams', image: '/assets/imgs/proplan.svg', features: [{ name: 'All analytics features', active: true }, { name: 'All analytics features', active: true }] },
  { value: 'premium', name: 'Premium', description: 'For Individuals and Small Teams', image: '/assets/imgs/platplan.svg', features: [{ name: 'All analytics features', active: true }, { name: 'All analytics features', active: true }] },
  { value: 'platinum', name: 'Platinum', description: 'For Individuals and Small Teams', image: '/assets/imgs/plat_plan.svg', features: [{ name: 'All analytics features', active: true }, { name: 'All analytics features', active: true }] }
]

const selectPlan = (plan) => {
  selectedPlan.value = plan
}

const onSwipeLeft = () => {
  if (currentIndex.value < plans.length - 1) {
    currentIndex.value++
  }
}

const onSwipeRight = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

onMounted(() => {
  // Optional: Any additional setup when component is mounted
})
</script>

<style scoped>
.slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 700px;
  margin: auto;
}

.div-slider {
  display: flex;
  transition: transform 0.3s ease;
}

.plan {
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plan-content {
  text-align: center;
}

.plan-icon {
  width: 50px;
  height: 50px;
}


</style>
