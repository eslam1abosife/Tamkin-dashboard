<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import { useGetNotification ,useMarkAllNotification } from "@/composables/useNotificationBell";
// import { formatDistanceToNow, parseISO } from 'date-fns';


const notificationBellStore = useNotificationBellStore();
const isMenuOpen = ref(false)
const clickedOutside = ref(false)
const { getNotification } = useGetNotification();
const { markAllNotification } = useMarkAllNotification();

onMounted(async () => {
  await getNotification();

});
const openLangSwitchMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // if(isMenuOpen.value){
  //       isMenuOpen.value =false
  //   }else {
  //       isMenuOpen.value =true
  //   }
};

const timeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `Just ${diffInSeconds} SEC AGO`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Just ${diffInMinutes} MIN AGO`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} HRS AGO`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} DAYS AGO`;
};

const closeMenu = async () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
  await markAllNotification();

  await getNotification();
};
const sentNotificationsCount = computed(() => {
  return notificationBellStore.notifications.filter(notification => notification.status === 'Sent').length;
});

</script>

<template>
  <div class=" h-[40px] w-[40px] rounded-full flex items-center justify-center relative cursor-pointer "
       :class="[isMenuOpen ? 'active_notification' : 'bg-[#EFF1F6]']" @click.prevent="openLangSwitchMenu"
       v-on-click-outside="closeMenu">


    <div class="cursor-pointer relative">
      <div class="h-[13px] w-[13px] !text-whiteTamkin bg-[#FB726D] rounded-full flex items-center justify-center text-[10px] font-[500]
absolute right-[-2px] top-[-5px]">
        {{ sentNotificationsCount }}
      </div>
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.1585 6.44016C14.1585 5.04422 13.604 3.70545 12.6169 2.71837C11.6298 1.73129 10.291 1.17676 8.8951 1.17676C7.49916 1.17676 6.1604 1.73129 5.17332 2.71837C4.18624 3.70545 3.6317 5.04422 3.6317 6.44016C3.6317 12.5808 1 14.3353 1 14.3353H16.7902C16.7902 14.3353 14.1585 12.5808 14.1585 6.44016Z"
            :class="[isMenuOpen ? 'stroke-white':'stroke-darkGrey']" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        <path
            d="M10.4141 17.8438C10.2599 18.1096 10.0385 18.3303 9.7722 18.4837C9.50586 18.6371 9.20388 18.7179 8.89652 18.7179C8.58916 18.7179 8.28719 18.6371 8.02084 18.4837C7.7545 18.3303 7.53313 18.1096 7.37891 17.8438"
            :class="[isMenuOpen ? 'stroke-white':'stroke-darkGrey']"  stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    </div>


    <div v-if="isMenuOpen"
         class=" absolute top-[50px] right-0 drop-shadow-xl bg-white rounded-[10px] h-auto w-[351px] rounded-b-[10px]
             flex flex-col items-start justify-start ">
      <div class="h-[69px] bg-[#35C0B4] p-[20px] flex items-center justify-start rounded-t-[10px] w-full">
        Notifications ({{ notificationBellStore.notifications.length }})
      </div>

      <!-- No Notifications -->
      <div v-if="notificationBellStore.notifications.length === 0" class="p-4 text-center text-gray-500">
        No notifications available.
      </div>

      <!-- Notifications List -->
      <div v-else>
        <div
            v-for="notification in notificationBellStore.notifications"
            :key="notification.name"
            class="flex items-start space-x-4 p-4 cursor-pointer hover:bg-tamkinLight">
          <!-- Indicator -->
          <div
              class="w-3 h-3 rounded-full mt-1"
              :class="notification.status === 'Sent' ? 'bg-[#35C0B4]' : 'bg-[#A7A7A7]'">
          </div>

          <!-- Content -->
          <div class="flex-1 w-full">
            <p
                :class="notification.status === 'Sent' ? 'text-darkGrey' : 'text-[#A7A7A7]'"
                class="font-[500] text-[13px] leading-[20px]">
              {{ notification.message }}
            </p>
            <div class="flex items-center text-[10px] text-[#878787] gap-1 mt-2">
              <img src="/imgs/clock.png" class="w-[15px] h-[15px]" :class="notification.status === 'Sent' ? '' : 'opacity-20'"  alt="Clock Icon">
              {{ timeAgo(notification.creation) }}
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
