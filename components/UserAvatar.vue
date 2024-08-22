<script   setup>
import { vOnClickOutside } from "@vueuse/components";
const localePath = useLocalePath();
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
const { getAvatarLetters } = useGetAvatarLetters();

const profileStore = useProfileStore();

const props =  defineProps({
  member: Object 
})


// const Image = computed(() => {
//   if(!profileStore.member?.first_name && !profileStore.member?.last_name) {
//     return '';
//   }
//   return `${profileStore.member.first_name} ${profileStore.member.last_name}`
// })

</script>

<template>
 

  <img v-if="member.user_image" :src="`https://tamkin.app/${member.user_image}`"
  class="ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px] rounded-full" alt="">
  
  <div v-else-if="member.first_name && member.last_name"
    class="avatar_img ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px] rounded-full bg-[#2dada3] text-[#fff] grid place-content-center select-none">
    <span>
      {{
        getAvatarLetters(member.first_name + " " + member.last_name)
      }}
    </span>
  </div>
  
  <div v-else
    class="user-img__skeleton animate-pulse flex space-x-4">
    <div class="ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px] rounded-full">XX</div>
  </div>
</template>
