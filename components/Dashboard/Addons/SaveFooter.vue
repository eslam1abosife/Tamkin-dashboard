<script lang="ts" setup>

const props = defineProps({
    showFooter:Boolean
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
        <div class="bg-whiteTamkin dark:bg-tamkinDarkPrimary h-[100px] lg:h-[75px] rounded-t-[10px] lg:p-0 px-[20px] " 
        style="box-shadow: 4px 4px 24px 8px #51459F1A;">
            <div class="flex items-center  lg:flex-nowrap flex-wrap w-full justify-between
             ipad-max:px-[40px] 
            lg:px-[40px] py-[16px] h-full">
                <div class="flex items-center rtl:space-x-reverse space-x-[10px] rtl:mr-[350px] ipad-max:ltr:ml-[300px]
                 lg:ltr:ml-[300px] mt-2">
                    <div>
                        <img  src="/assets/imgs/info.svg" />
                    </div>
                    <div class="text-[10px] lg:text-[12px] leading-[10px] lg:leading-[21.6px] text-darkGrey dark:text-whiteTamkin font-[500] lg:w-auto w-full">
                        Make sure to save all changes before moving to another page
                    </div>
                </div>
                <div class="flex items-center lg:justify-start justify-center xs:space-x-[4px] space-x-[20px] rtl:space-x-reverse lg:space-x-[32px] lg:mt-0 mt-4">
                    <button class="btn_bordered_dashboard hover_tamkin" @click="cancelfn">Discard</button>
                    <button class="btn_bordered_dashboard w-[160px]" @click="saveToAllSites">Save to all sites</button>
                    <button class="btn-dashboard hover_tamkin w-[74px]" @click="saveFn">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>