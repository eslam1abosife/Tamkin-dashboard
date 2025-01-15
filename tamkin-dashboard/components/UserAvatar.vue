<script setup>
import { vOnClickOutside } from "@vueuse/components";
const localePath = useLocalePath();
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
const { getAvatarLetters } = useGetAvatarLetters();

const profileStore = useProfileStore();

const props = defineProps({
  member: Object,
});

// const Image = computed(() => {
//   if(!profileStore.member?.first_name && !profileStore.member?.last_name) {
//     return '';
//   }
//   return `${profileStore.member.first_name} ${profileStore.member.last_name}`
// })
</script>

<template>
  <div v-if="member.user_image" class="h-[35px] w-[35px] mr-2 rounded-full">
    <img
      :src="`https://tamkin.app/${member.user_image}`"
      class="h-[100%] w-[100%] rounded-full"
      alt=""
    />
  </div>

  <div
    v-else-if="member.first_name && member.last_name"
    class="avatar_img ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px] rounded-full bg-[#2dada3] text-[#fff] grid place-content-center select-none"
  >
    <span>
      {{ getAvatarLetters(member.first_name + " " + member.last_name) }}
    </span>
  </div>
  <div
    v-else
    class="avatar_img ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px] rounded-full bg-[#2dada3] text-[#fff] grid place-content-center select-none"
  >
    <span>
      {{ getAvatarLetters(member.first_name + " " + member.last_name) }}
    </span>
  </div>
</template>
