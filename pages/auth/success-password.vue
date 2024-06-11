<script lang="ts" setup>
definePageMeta({
    layout:'auth'
})

</script>

<template>

<div class="">
<div class="">
    <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px] lg:mx-0 mx-auto lg:mb-0 mb-6 ">

</div>
    <div class=" pt-[6px] max-w-[580px] mx-auto text-center">
       <div class="flex-grow">
        <h1 class="text-[32px] font-medium ">{{$t('successfully')}}</h1>
       
        <h3 class="text-[20px] font-[600] text-secondary_text">{{$t('password_reset_successfully')}}</h3>

       </div>
     

  
       



       </div>
       <div class=" mt-[52px] flex flex-col items-center justify-center">
        <button class="btn-grad-action" @click="$router.push('/auth/login')" >{{$t('login')}}</button>
    </div>
  
</div>

</template>


