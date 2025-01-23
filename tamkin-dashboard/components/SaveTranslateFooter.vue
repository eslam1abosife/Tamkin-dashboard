<script lang="ts" setup>

const props = defineProps({
    showFooter:Boolean,
    done:Boolean,
    loading:Boolean
})
const emit = defineEmits(['cancel_action','saveToAllSites','Save'])

const saveToAllSites =() =>{
emit('saveToAllSites')
}

const cancelfn =() =>{
emit('cancel_action')
}
const saveFn =() =>{
emit('Save')
}
</script>




<template>
    <div v-if="showFooter" class="lg:!px-0 fixed z-[50] 
 bottom-0 w-full rtl:right-[50%] ltr:left-[50%] !px-[0] transform rtl:translate-x-[50%] 
    ltr:translate-x-[-50%]" >
        <div class="bg-whiteTamkin dark:bg-tamkinDarkPrimary h-auto sm:h-[100px] lg:h-[75px] rounded-t-[10px] lg:p-0 px-[16px] " 
        style="box-shadow: 4px 4px 24px 8px #51459F1A;">
            <div class="flex items-center  lg:flex-nowrap flex-wrap w-full justify-between
             ipad-max:px-[40px] 
            lg:px-[40px] py-[16px] h-full">
                <div class="flex items-center rtl:space-x-reverse space-x-[10px] rtl:mr-[350px] ipad-max:ltr:ml-[300px]
                 lg:ltr:ml-[300px] mt-2">
                    <div>
                        <img  src="/assets/imgs/info.svg" />
                    </div>
                    <div class="text-[12px] leading-[10px] lg:leading-[21.6px] text-darkGrey dark:text-whiteTamkin font-[500] lg:w-auto w-full">
                        {{ $t('Make sure to save all changes before moving to another page') }}
                    </div>
                </div>
                <div class="flex items-stretch gap-y-[10px] sm:items-center w-full lg:w-auto lg:justify-start justify-center flex-col sm:flex-row gap-x-[10px] lg:gap-x-[32px] lg:mt-0 mt-4">
                    <button class="btn_bordered_dashboard hover_tamkin flex-1 lg:flex-[unset] max-md:!px-0" :disabled="loading" @click="cancelfn">{{$t('Cancel')}}</button>
                    <button class="btn-dashboard hover_tamkin lg:w-auto flex-1 lg:flex-[unset] max-md:!px-0" :disabled="loading" @click="saveFn">
                        <div class="flex items-center justify-center">
                            <div :class="loading ? 'rtl:ml-2 ltr:mr-2' : ''">
                              {{ $t("Save") }}
                            </div>
              
                            <svg
                              v-if="loading"
                              class="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                              ></circle>
                              <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div> 


                    </button>
                </div>
            </div>
        </div>
    </div>

</template>