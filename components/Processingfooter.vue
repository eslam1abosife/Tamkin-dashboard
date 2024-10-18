<script lang="ts" setup>

const props = defineProps({
    showFooter:Boolean,
    done:Boolean
})
const emit = defineEmits(['cancel_action','saveToAllSites','Save','closeFooter'])

const saveToAllSites =() =>{
emit('saveToAllSites')
}

const cancelfn =() =>{
emit('cancel_action')
}
const saveFn =() =>{
emit('Save')
}

const closeFooter = () => {

    emit("closeFooter");
}
</script>




<template>
    <div v-if="showFooter" class="lg:!px-0 fixed z-[50] 
 bottom-0 w-full rtl:right-[50%] ltr:left-[50%] !px-[0] transform rtl:translate-x-[50%] 
    ltr:translate-x-[-50%]" >
        <div class="bg-whiteTamkin dark:bg-tamkinDarkPrimary h-[100px] lg:h-[75px] rounded-t-[10px] lg:p-0 px-[20px] " 
        style="box-shadow: 4px 4px 24px 8px #51459F1A;">
            <div v-if="!done" class="flex items-center  lg:flex-nowrap flex-wrap w-full justify-between
             ipad-max:px-[40px] 
            lg:px-[40px] py-[16px] h-full">
                <div class="flex items-center rtl:space-x-reverse space-x-[10px] rtl:mr-[350px] ipad-max:ltr:ml-[300px]
                 lg:ltr:ml-[300px] mt-2">
                 <div class="border-gray-300 dark:border-whiteTamkin dark:border-t-tamkin h-6 w-6 animate-spin rounded-full border-4 border-t-tamkin" />

                    <div class="text-[16px] lg:text-[14px] leading-[10px] lg:leading-[21.6px] text-darkGrey dark:text-whiteTamkin font-[500] lg:w-auto w-full">
                        {{ $t('Please wait while we process your request. This may take a few moments') }}
                    </div>
                </div>
                <div class="flex items-center lg:justify-start justify-center xs:space-x-[4px] space-x-[20px] rtl:space-x-reverse lg:space-x-[32px] lg:mt-0 mt-4">
                    <button class="btn_bordered_dashboard hover_tamkin" @click="cancelfn">{{$t('Cancel')}}</button>
                </div>
            </div>
            <div v-else class="flex items-center  lg:flex-nowrap flex-wrap w-full justify-between
            ipad-max:px-[40px] 
           lg:px-[40px] py-[16px] h-full">
               <div class="flex items-center rtl:space-x-reverse space-x-[10px] rtl:mr-[350px] ipad-max:ltr:ml-[300px]
                lg:ltr:ml-[300px] mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-tamkin">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                  </svg>
                  
                   <div class="text-[16px] lg:text-[14px] leading-[10px] lg:leading-[21.6px] text-darkGrey dark:text-whiteTamkin font-[500] lg:w-auto w-full">
                     {{ $t('Processing Complete') }} 
                   </div>
               </div>
               <div class="flex items-center lg:justify-start justify-center xs:space-x-[4px] space-x-[20px] rtl:space-x-reverse lg:space-x-[32px] lg:mt-0 mt-4">
                   <button class="btn_bordered_dashboard hover_tamkin" @click="closeFooter">{{$t('Done')}}</button>
               </div>
           </div>
        </div>
    </div>

</template>