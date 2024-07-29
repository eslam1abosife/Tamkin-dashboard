<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import Vue3TagsInput from "vue3-tags-input";
definePageMeta({
  layout: "dashboard",
});
const tags = ref([]);

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();const back  = ref(false)
const currentIndex = ref(0)
const currentTab = ref("1stpackages");
const collapsed = ref(false);
const customValidate = (value) =>{
  const regex = new RegExp('\\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}\\b');
  return regex.test(value)
    }
const handleChangeTag = (tags: any) => {
  tags.value = tags;
}
const selectedPlan = ref('')
const selectPlan = (plan:any)=>{
  selectedPlan.value = plan
}

const next = ()=>{
      back.value = false;
      currentIndex.value++;
    }
    const prev = () =>{
      back.value = true;
     if(currentIndex.value == 1){
      currentIndex.value--;
     }
    }

</script>

<template>
  <div class="mt-[23px] overflow-x-hidden">
    <div class="space-y-[10px]">
      <h1 class="text-left text-[18px] leading-[36px] font-[600] dark:text-whiteTamkin">Add Site</h1>

      <h2
        class="text-left text-[14px] font-[400] leading-[22.5px] text-darkGrey dark:text-whiteTamkin" 
      >
        Enhance your site to improve accessibility and meet compliance standards
      </h2>
    </div>

    <div class="mt-[18px] flex items-center justify-between mt-[32px]">
      <div>
        <h2 class="text-[14px] lg:text-[16px] font-[600] leading-[30px] text-[#151515] dark:text-whiteTamkin">
          Select Your package
        </h2>
      </div>
      <div class="flex items-center rtl:space-x-reverse space-x-[10px] ">
        <div>
          <h2
            class="underline text-[14px] font-[400] leading-[24px] text-[#151515] dark:text-whiteTamkin"
          >
            What’s included?
          </h2>
        </div>
        <div class="cursor-pointer" @click="collapsed = !collapsed">
          <img  src="/assets/imgs/arrow-right.svg" class="w-[12px] h-[10px] rtl:rotate-180" :class="[collapsed ? '!rotate-90 ' :'rotate-0']"  />
        </div>
      </div>
    </div>
      <transition-group mode="in-out" tag="div" class="div-slider flex flex-col items-start justify-center" name="slide-fade">

      <div

      v-if="currentIndex === 0" key="1"
      class="flex items-center lg:flex-row flex-col justify-start rtl:space-x-reverse lg:space-x-[48px]  w-full" 
      >
        <div         class="flex items-center lg:flex-row flex-col ipad-max:flex-col justify-start rtl:space-x-reverse lg:space-x-[8px] ipad-max:space-x-0 w-full"
        >
          <div
        class="flex items-center custom-border justify-start rtl:space-x-reverse space-x-[16px]
         relative w-full py-[62px] px-[10px] h-[149px] !rounded-[10px] mt-[35px]"
        style="padding: 16px, 10px, 16px, 10px"
          :class="[selectedPlan && selectedPlan === 'free' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"
        >
          <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
            <img 
              src="/assets/imgs/freeplan.svg"
              class="w-[50px] h-[50px]"
              
            />
          </div>

          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[500] text-[18px] leading-[30px] dark:text-whiteTamkin">Free Widget</h1>
              <h2
                class="font-[400] text-[14px] leading-[21.86px]  text-[#536174] dark:text-whiteTamkin/80"
              >
                For Individuals and Small Teams
              </h2>
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="radio5"
                type="radio"
                name="plans_radio"
                class="hidden"
                value="free"
                @click.stop="selectPlan('free')"
            
              />
              <label for="radio5" class="flex items-center cursor-pointer">
                <span
                  class="radio-tamkin"
                ></span>
              </label>
            </div>
          </div>

          <div   class="custom-border-collapse lg:h-[350px]  w-full  left-[-16px]  
 lg:top-[90%] top-[120px] absolute z-[100] mt-2 p-4 bg-white"  v-if="collapsed">
            <div
        
            class="flex flex-col items-start  lg:h-full lg:pt-0 pt-14 h-[100px]  lg:overflow-hidden overflow-y-scroll   justify-center space-y-[16px] 
           
            pl-[42px] w-full rounded-t-none rounded-[10px]  "
            :class="[selectedPlan && selectedPlan === 'free' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"

            >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]   dark:text-whiteTamkin ">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>

            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_inactive.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div
        
          class="flex items-center custom-border justify-start rtl:space-x-reverse space-x-[16px] relative w-full py-[62px] px-[10px] h-[149px] !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
          :class="[selectedPlan && selectedPlan === 'pro' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"

         
        >
          <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
            <img 
              src="/assets/imgs/proplan.svg"
              class="w-[50px] h-[50px]"
              
            />
          </div>

          <div class="flex items-center justify-center relative ">
            <div class="absolute   flex items-center justify-center text-[13px] leading-[17.76px]  font-[600] w-[90px]
             h-[30px] rounded-[10px] text-white ipad-max:top-[-25%] ipad-max:left-[150px] top-[-70%] rtl:right-[200px] 
             ltr:left-[200px] rtl:lg:right-[250px] ltr:lg:left-[250px]" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
">
<div class=" text-white">
    Best Deal
</div>
            </div>
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[500] text-[18px] leading-[30px] dark:text-whiteTamkin">
                Pro-Accessibility Widget
              </h1>
              <h2
                class="font-[400] text-[14px] leading-[21.86px]  text-[#536174] dark:text-whiteTamkin/80"
              >
                For Individuals and Small Teams
              </h2>
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="radio523"
                type="radio"
                name="plans_radio"
                class="hidden"
                 value="pro"
                 @click.stop="selectPlan('pro')"

                 
              />
              <label for="radio523" class="flex items-center cursor-pointer">
                <span
                  class="radio-tamkin"
                ></span>
              </label>
            </div>
          </div>

          <div   class="custom-border-collapse lg:h-[350px]  w-full  left-[-16px]  
          lg:top-[90%] top-[120px] absolute z-[100] mt-2 p-4 bg-white"  v-if="collapsed">
                     <div
                 
                     class="flex flex-col items-start  lg:h-full lg:pt-0 pt-14 h-[100px]  lg:overflow-hidden overflow-y-scroll   justify-center space-y-[16px] 
                    
                     pl-[42px] w-full rounded-t-none rounded-[10px]  "
                     :class="[selectedPlan && selectedPlan === 'free' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"
         
                     >
                     <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]   dark:text-whiteTamkin ">
                       <div>
                         <img  src="/assets/imgs/checked_list_active.svg"  />
                       </div>
                       <div>
                         <h3 class="text-[14px] font-[400] leading-[20px]">
                           All analytics features
                         </h3>
                       </div>
                     </div>
                     <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                       <div>
                         <img  src="/assets/imgs/checked_list_active.svg"  />
                       </div>
                       <div>
                         <h3 class="text-[14px] font-[400] leading-[20px]">
                           All analytics features
                         </h3>
                       </div>
                     </div>
         
                     <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                       <div>
                         <img  src="/assets/imgs/checked_list_active.svg"  />
                       </div>
                       <div>
                         <h3 class="text-[14px] font-[400] leading-[20px]">
                           All analytics features
                         </h3>
                       </div>
                     </div>
                     <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                       <div>
                         <img  src="/assets/imgs/checked_list_active.svg"  />
                       </div>
                       <div>
                         <h3 class="text-[14px] font-[400] leading-[20px]">
                           All analytics features
                         </h3>
                       </div>
                     </div>
                     <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                       <div>
                         <img  src="/assets/imgs/checked_list_active.svg"  />
                       </div>
                       <div>
                         <h3 class="text-[14px] font-[400] leading-[20px]">
                           All analytics features
                         </h3>
                       </div>
                     </div>
                     <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                       <div>
                         <img  src="/assets/imgs/checked_list_active.svg"  />
                       </div>
                       <div>
                         <h3 class="text-[14px] font-[400] leading-[20px]">
                           All analytics features
                         </h3>
                       </div>
                     </div>
                     <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin">
                       <div>
                         <img  src="/assets/imgs/checked_list_active.svg"  />
                       </div>
                       <div>
                         <h3 class="text-[14px] font-[400] leading-[20px]">
                           All analytics features
                         </h3>
                       </div>
                     </div>
                     <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin">
                       <div>
                         <img  src="/assets/imgs/checked_list_inactive.svg"  />
                       </div>
                       <div>
                         <h3 class="text-[14px] font-[400] leading-[20px]">
                           All analytics features
                         </h3>
                       </div>
                     </div>
                   </div>
                   </div>
        </div>
        <div
        
        class="flex items-center custom-border justify-start rtl:space-x-reverse space-x-[16px] relative w-full py-[62px] px-[10px] h-[149px] !rounded-[10px] mt-[35px]"
        style="padding: 16px, 10px, 16px, 10px"
        :class="[selectedPlan && selectedPlan === 'pro_custom' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"

       
      >
        <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
          <img 
            src="/assets/imgs/proplan.svg"
            class="w-[50px] h-[50px]"
            
          />
        </div>

        <div class="flex items-center justify-center relative ">
  
          <div class="order-2 mt-[22px] relative w-full">
            <h1 class="font-[500] text-[18px] leading-[30px] dark:text-whiteTamkin">
              Pro-Accessibility Widget
            </h1>
            <h2
              class="font-[400] text-[14px] leading-[21.86px]  text-[#536174] dark:text-whiteTamkin/80"
            >
              For Individuals and Small Teams
            </h2>
          </div>
          <div class="order-1 mx-[15px]">
            <input
              id="radio_custom_pro"
              type="radio"
              name="plans_radio"
              class="hidden"
               value="pro"
               @click.stop="selectPlan('pro_custom')"

               
            />
            <label for="radio_custom_pro" class="flex items-center cursor-pointer">
              <span
                class="radio-tamkin"
              ></span>
            </label>
          </div>
        </div>

        <div   class="custom-border-collapse lg:h-[350px]  w-full  left-[-16px]  
        lg:top-[90%] top-[120px] absolute z-[100] mt-2 p-4 bg-white"  v-if="collapsed">
                   <div
               
                   class="flex flex-col items-start  lg:h-full lg:pt-0 pt-14 h-[100px]  lg:overflow-hidden overflow-y-scroll   justify-center space-y-[16px] 
                  
                   pl-[42px] w-full rounded-t-none rounded-[10px]  "
                   :class="[selectedPlan && selectedPlan === 'free' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"
       
                   >
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]   dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
       
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin">
                     <div>
                       <img  src="/assets/imgs/checked_list_inactive.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                 </div>
                 </div>
      </div>
        </div>
      </div>
 
      <div    class="flex items-center lg:flex-row flex-col justify-start rtl:space-x-reverse lg:space-x-[48px]  w-full" 
         v-if="currentIndex === 1" key="2"
      >
        <div
        class="flex items-center lg:flex-row ipad-max:flex-col flex-col justify-start rtl:space-x-reverse lg:space-x-[8px] ipad-max:space-x-0 w-full"
      >
        <div
     
        class="flex items-center custom-border justify-start rtl:space-x-reverse space-x-[16px] relative w-full py-[62px] px-[10px] h-[149px] !rounded-[10px] mt-[35px]"
        style="padding: 16px, 10px, 16px, 10px"
          :class="[selectedPlan && selectedPlan === 'premium' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"

        >
          <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
            <img 
              src="/assets/imgs/platplan.svg"
              class="w-[50px] h-[50px]"
              
            />
          </div>

          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[500] text-[18px] leading-[30px] dark:text-whiteTamkin">Premium</h1>
              <h2
                class="font-[400] text-[14px] leading-[21.86px]  text-[#536174] dark:text-whiteTamkin/80"
              >
                For Individuals and Small Teams
              </h2>
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="radio558t6666"
                type="radio"
                name="plans_radio"
                class="hidden"
                @click.stop="selectPlan('premium')"

                   value="premium"
                  
              />
              <label for="radio558t6666" class="flex items-center cursor-pointer">
                <span
                  class="radio-tamkin"
                ></span>
              </label>
            </div>
          </div>

          <div
            v-if="collapsed"

            class="flex flex-col pl-[42px] items-start justify-center space-y-[16px] left-[-16px] top-[90%] absolute z-[100]  h-[350px]  w-full custom-border-collapse rounded-t-none rounded-[10px] mt-2 p-4"
            :class="[selectedPlan && selectedPlan === 'premium' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"

            >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_inactive.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>

          </div>
        </div>

        <div
  
          class="flex items-center custom-border justify-start rtl:space-x-reverse space-x-[16px] relative  w-full py-[62px] px-[10px] h-[149px]  !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
          :class="[selectedPlan && selectedPlan === 'platinum_1' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"

        >
          <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
            <img 
              src="/assets/imgs/plat_plan.svg"
              class="w-[50px] h-[50px]"
              
            />
          </div>

          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[500] text-[18px] leading-[30px] dark:text-whiteTamkin">Platinum</h1>
              <h2
                class="font-[400] text-[14px] leading-[21.86px]  text-[#536174] dark:text-whiteTamkin/80"
              >
                For Individuals and Small Teams
              </h2>
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="radio665"
                type="radio"
                name="plans_radio"
                class="hidden"
               
                value="platinum_1"
                @click.stop="selectPlan('platinum_1')"
                         
              />
              <label for="radio665" class="flex items-center cursor-pointer">
                <span
                  class="radio-tamkin"
                ></span>
              </label>
            </div>
          </div>

          <div
            v-if="collapsed"
            class="flex  pl-[42px] flex-col items-start justify-center space-y-[16px] left-[-16px] top-[90%] absolute z-[100] h-[350px]  w-full custom-border-collapse rounded-t-none rounded-[10px] mt-2 p-4"
            :class="[selectedPlan && selectedPlan === 'platinum' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"
          
            >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_inactive.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img  src="/assets/imgs/checked_list_active.svg"  />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div
  
        class="flex items-center custom-border justify-start rtl:space-x-reverse space-x-[16px] relative  w-full py-[62px] px-[10px] h-[149px]  !rounded-[10px] mt-[35px]"
        style="padding: 16px, 10px, 16px, 10px"
        :class="[selectedPlan && selectedPlan === 'platinum' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"

      >
        <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
          <img 
            src="/assets/imgs/plat_plan.svg"
            class="w-[50px] h-[50px]"
            
          />
        </div>

        <div class="flex items-center justify-center relative w-full">
          <div class="order-2 mt-[22px] relative w-full">
            <h1 class="font-[500] text-[18px] leading-[30px] dark:text-whiteTamkin">Platinum</h1>
            <h2
              class="font-[400] text-[14px] leading-[21.86px]  text-[#536174] dark:text-whiteTamkin/80"
            >
              For Individuals and Small Teams
            </h2>
          </div>
          <div class="order-1 mx-[15px]">
            <input
              id="radioplatcustom"
              type="radio"
              name="plans_radio"
              class="hidden"
             
              value="platinum"
              @click.stop="selectPlan('platinum')"
                       
            />
            <label for="radioplatcustom" class="flex items-center cursor-pointer">
              <span
                class="radio-tamkin"
              ></span>
            </label>
          </div>
        </div>

        <div   class="custom-border-collapse lg:h-[350px]  w-full  left-[-16px]  
        lg:top-[90%] top-[120px] absolute z-[100] mt-2 p-4 bg-white"  v-if="collapsed">
                   <div
               
                   class="flex flex-col items-start  lg:h-full lg:pt-0 pt-14 h-[100px]  lg:overflow-hidden overflow-y-scroll   justify-center space-y-[16px] 
                  
                   pl-[42px] w-full rounded-t-none rounded-[10px]  "
                   :class="[selectedPlan && selectedPlan === 'free' ? 'bg-selected dark:bg-p ' :'bg-whiteTamkin dark:bg-tamkinDarkPrimary']"
       
                   >
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]   dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
       
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin ">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin">
                     <div>
                       <img  src="/assets/imgs/checked_list_active.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                   <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin  dark:text-whiteTamkin">
                     <div>
                       <img  src="/assets/imgs/checked_list_inactive.svg"  />
                     </div>
                     <div>
                       <h3 class="text-[14px] font-[400] leading-[20px]">
                         All analytics features
                       </h3>
                     </div>
                   </div>
                 </div>
                 </div>
      </div>
      
      </div>
      </div>
  
 

 
</transition-group>
    <div
   :class="[collapsed ? 'lg:mt-[365px] mt-[150px]':' mt-[22px]']"
      class="flex items-center justify-center  mx-auto rtl:space-x-reverse space-x-[8px]"
    >
      <div
        :class="[currentIndex === 0 ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
        class=" w-[15px] h-[15px] rounded-full cursor-pointer"
        @click="prev"
      ></div>
      <div
        :class="[currentIndex === 1 ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
        class="w-[15px] h-[15px] rounded-full cursor-pointer"
        @click="next"
      ></div>
    </div>

    <div class="flex items-center justify-center lg:justify-start  w-full  " :class="[collapsed ? '':'lg:mt-[28px] mt-[36px]']" >
 
        <h1 class="font-[500] text-[16px] leading-[30px] dark:text-whiteTamkin" >Enter Website URLS</h1>
  
    </div>
 <Client-only  >
    <vue3-tags-input
    :tags="tags"
    class="mt-[16px] w-full h-[164px] border-[1px] !rounded-[10px] border-[#C5C5C5] dark:bg-[#333333] 
    dark:bg-tamkinDarkPrimary bg-white focus:outline-none focus:ring-1  dark:text-whiteTamkin
    focus:ring-[#C5C5C5]"
    :validate="customValidate"
    
    placeholder="Add new website"
    @on-tags-changed="handleChangeTag"
    >
  <template #item="{ name, index }" >
    <div class="flex items-center justify-center p-[6px] rtl:space-x-reverse space-x-[13px]">
<div>
  {{ name }} 
</div>
<img  src="/assets/imgs/tick.svg"  v-if="name !== 'alaa.com'"/>
<svg xmlns="http://www.w3.org/2000/svg" v-else fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-tamkingErrorInput">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

    </div>
  </template>
 </vue3-tags-input>
 </Client-only>
<!-- 
 <div class="mt-[16px] w-full h-[164px]  bg-transparent focus:outline-none focus:ring-0 
    focus:ring-transparent" v-if="collapsed"></div> -->

 <button class="btn-dashboard-normal normal_hover my-[16px] mx-auto lg:mx-0 lg:ml-auto" @click="openModal('upgrade','add-site'),openModal('billing','add-site')">Add Sites and Continue</button>
  </div>
</template>



<style>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(60px);
}
.div-slider{

 
}
.slide-fade-leave-active {
 display: none;
}
</style>