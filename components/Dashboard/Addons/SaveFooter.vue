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
    <div v-if="showFooter" class="lg:!px-0 fixed z-[50] bottom-0 w-full rtl:right-[50%] ltr:left-[50%] !px-[0] transform rtl:translate-x-[50%] 
    ltr:translate-x-[-50%]" >
        <div class="bg-whiteTamkin h-[75px] rounded-t-[10px] " 
        style="box-shadow: 4px 4px 24px 8px #51459F1A;">
            <div class="flex items-center justify-between ipad-max:px-[20px] px-[40px] py-[16px]">
                <div class="flex items-center rtl:space-x-reverse space-x-[10px] rtl:mr-[350px] ltr:ml-[350px]">
                    <div>
                        <img src="/assets/imgs/info.svg" alt="">
                    </div>
                    <div class="text-[12px] leading-[21.6px] text-darkGrey font-[500]">
                        Make sure to save all changes before moving to another page
                    </div>
                </div>
                <div class="flex items-center rtl:space-x-reverse space-x-[32px]">
                    <button class="btn_bordered_dashboard hover_tamkin" @click="cancelfn">Cancel</button>
                    <button class="btn_bordered_dashboard w-[160px]" @click="saveToAllSites">Save to all sites</button>
                    <button class="btn-dashboard hover_tamkin w-[74px]" @click="saveFn">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>