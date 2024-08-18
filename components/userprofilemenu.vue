<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const localePath = useLocalePath();
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
const { getAvatarLetters } = useGetAvatarLetters();

const profileStore = useProfileStore();


import { useUserStore } from "@/stores/auth"; // Import the Pinia store
import { useRouter } from "#vue-router";
const router = useRouter();
const isMenuOpen = ref(false)

const fullName = computed(() => {
  return `${profileStore.member.first_name} ${profileStore.member.last_name}`
})




const openLangSwitchMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => {
    isMenuOpen.value =false
}

const isOwner = () => {
    const userStore = useUserStore();
    const user = userStore.user;
    if(user) {
      return user?.role_profile_name?.toString().toLowerCase().includes('owner of agency');
    }
    return false;
};

const userImg = computed(() => {
    const userStore = useUserStore();
    const user = userStore.user;
    if(user) {
      if (user.user_image) {
        return `https://tamkin.app/${user.user_image}`;
      }
      else if (user.photoURL) {
        return user.photoURL;
      }
    }
    return null;
});


const userName = () => {
  const userStore = useUserStore();
  const user = userStore.user;
  if(user) {
    return userStore.user?.full_name || userStore.user?.displayName
  }
  return '';
}

const logout = () => {
  const userStore = useUserStore();
  userStore.logout();
  localStorage.removeItem('user');
  localStorage.removeItem('registerd_email');
  localStorage.removeItem('registerd_user');

  router.push('/auth/login');
}
const helpWindow = ()=>{
  if(process.client){
    window.$chatwoot.toggle()
  }
}

</script>

<template>
    <div class=" h-auto w-[220px]  !mr-[40px]  flex items-center justify-center relative"
       @click.prevent="openLangSwitchMenu"
       
       v-on-click-outside="closeMenu">


        <div class="cursor-pointer relative flex items-center justify-between space-x-[14px]  w-full 
        bg-[#EFF1F6] rounded-[10px] h-[50px] p-[10px]">

            <div class="flex items-center justify-start space-x-[14px]">
              <div class="">
                <img v-if="profileStore.member.user_image" :src="`https://tamkin.app/${profileStore.member.user_image}`"
                 class="ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px] rounded-full" alt="">
                <img
                  v-else
                  src="/assets/imgs/avatar.png"
                  class="ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px]"
                />
              </div>
              <div class="flex flex-col items-start justify-start ">
                <h2
                  class="font-[400] ipad-max:text-[10px] text-[12px] dark:text-white whitespace-nowrap leading-[14.4px]"
                >
                 {{userName()}} 
                </h2>
                <p
                    v-if="isOwner()"
                class="font-[400] text-[10px] dark:text-white whitespace-nowrap text-darkGrey leading-[14.4px]"
              >
              {{ profileStore.getRole }}
            </p>
              </div>
            </div>
              <div >
                <svg :class="[isMenuOpen ? 'rotate-90':'rotate-0']" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00075 4.50016L1.75775 8.74316L0.34375 7.32816L3.17275 4.50016L0.34375 1.67216L1.75775 0.257164L6.00075 4.50016Z" fill="#23262F"/>
                    </svg>
                    
              </div>
             
        </div>

        <div v-if="isMenuOpen" 
        style="box-shadow: 1px 1px 7.6px 0px #00000040;
"
        class=" p-[10px] w-full absolute top-[60px] right-[-0.5px]  bg-white rounded-[10px] h-auto w-full rounded-b-[10px]
         flex flex-col items-start justify-start ">


  <div @click="$router.push(localePath('/profile'))" class="cursor-pointer p-[10px] flex items-center justify-start w-full  space-x-[10px] hover:bg-tamkinLight rounded-[10px]">
      <div>
          <img src="/imgs/my_acc_icon.png" class="w-full h-full" alt="">
        </div>
    <div  class="text-[12px] leading-[18px] font-[500] text-darkGrey">
      My Account
    </div>
   
  </div>


  <div @click="$router.push(localePath('/subscriptions'))" class="cursor-pointer p-[10px] flex items-center justify-start w-full  space-x-[10px] hover:bg-tamkinLight rounded-[10px]">
      <div>
          <img src="/imgs/subscription_icon.png" class="w-full h-full" alt="">
        </div>
        <div  class="text-[12px] leading-[18px] font-[500] text-darkGrey">
      Subscriptions
  </div>

   
  </div>



  <div @click="$router.push(localePath('/billing'))" class="cursor-pointer p-[10px] flex items-center justify-start w-full  space-x-[10px] hover:bg-tamkinLight rounded-[10px]">
      <div>
          <img src="/imgs/billing.png" class="w-[11px] h-[13px]" alt="">
        </div>
        <div   class="text-[12px] leading-[18px] font-[500] text-darkGrey">
      Billing & Invoices
  </div>
   
  </div>
  <div @click="$router.push(localePath('/orders'))" class="cursor-pointer p-[10px] flex items-center justify-start w-full  space-x-[10px] hover:bg-tamkinLight rounded-[10px]">
    <div>
        <img src="/imgs/cart.png" class="w-[13px] h-[13px]" alt="">
      </div>
      <div class="text-[12px] leading-[18px] font-[500] text-darkGrey">
    Orders
      </div>
 
</div>
  <div @click="$router.push(localePath('/referral'))" class="cursor-pointer p-[10px] flex items-center justify-start w-full  space-x-[10px] hover:bg-tamkinLight rounded-[10px]">
      <div>
          <img src="/imgs/ref.png" class="w-[11px] h-[13px]" alt="">
        </div>
        <div class="text-[12px] leading-[18px] font-[500] text-darkGrey">
      Referral
        </div>
   
  </div>
<hr class="bg-[#EAEAEA] w-full !p-0">
  <div @click="helpWindow" class="cursor-pointer p-[10px] flex items-center justify-start w-full  space-x-[10px] hover:bg-tamkinLight rounded-[10px]">
      <div>
          <img src="/imgs/help_icon.png" class="w-[13px] h-[13px]" alt="">
        </div>
    <div class="text-[12px] leading-[18px] font-[500] text-darkGrey">
      Help
    </div>
   
  </div>

  <div class="cursor-pointer p-[10px] flex items-center justify-start w-full  space-x-[10px] hover:bg-tamkinLight rounded-[10px]">
      <div>
          <img src="/imgs/logout.png" class="w-[13px] h-[13px]" alt="">
        </div>
    <div @click="logout" class="text-[12px] leading-[18px] font-[500] text-darkGrey">
      Logout
    </div>
   
  </div>


  <div class="my-[13px] flex items-center justify-center w-full">
<div class="text-[10px] leading-[12px] font-[500] text-black underline">
Privacy Policy 
</div>
<div class="text-[10px] leading-[12px] font-[500] text-black ">•</div>
<div class="text-[10px] leading-[12px] font-[500] text-black underline">
 Terms of Service
</div>
  </div>
        </div>
      

    </div>
</template>
