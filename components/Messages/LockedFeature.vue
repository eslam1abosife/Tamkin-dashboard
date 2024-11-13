<script lang="ts" setup>


</script>

<template>
    <div class="absolute z-[50] h-full w-full inset-0 bg-white bg-opacity-50 backdrop-filter
     backdrop-blur-sm flex items-center justify-center rounded-[10px]">
        <!-- Modal -->
        <div class="bg-white  px-6 rounded-lg shadow-lg text-center h-[200px]">
            <div class="mt-[12px] ">
             <img  src="/assets/imgs/customize/locked.svg" class="mx-auto w-[64px] h-[64px]" />
            </div>
            <h2 class="text-md font-semibold my-2">{{$t('Unlock Features')}}</h2>
            <p class="text-gray-600 text-sm mb-[12px]">{{$t('To access these additional features, please Upgrade your plan')}}</p>
            <button class="btn-dashboard hover_tamkin w-[150px] mx-auto">{{$t('Upgrade Plan')}}</button>
        </div>
</div>
    
</template>