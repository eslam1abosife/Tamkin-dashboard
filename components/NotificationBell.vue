<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import {
  useGetNotification,
  useMarkAllNotification,
} from "@/composables/useNotificationBell";
const notificationBellStore = useNotificationBellStore();

const { getNotification } = useGetNotification();
const { markAllNotification } = useMarkAllNotification();
// import { formatDistanceToNow, parseISO } from 'date-fns';
const isMenuOpen = ref(false);
const clickedOutside = ref(false);


const openLangSwitchMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // if(isMenuOpen.value){
  //       isMenuOpen.value =false
  //   }else {
  //       isMenuOpen.value =true
  //   }
};
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();


const closeMenu = async () => {
  closeModal('notificationsModal')
  await markAllNotification();

  await getNotification();
};
const sentNotificationsCount = computed(() => {
  return notificationBellStore.notifications.filter(
    (notification) => notification.status === "Sent"
  ).length;
});
onBeforeMount(() => {});
</script>

<template>
  <div
    class="h-[40px] w-[40px] rounded-full  flex items-center justify-center relative "
    :class="[isOpen('notificationsModal') ? 'active_notification' : 'bg-[#EFF1F6]']"
    @click.prevent="openModal('notificationsModal')"
    v-on-click-outside="closeMenu"
  >
    <div class="cursor-pointer relative">
      <div
        class="h-[13px] w-[13px] !text-whiteTamkin bg-[#FB726D]   
        rounded-full flex items-center justify-center text-[10px] font-[500] absolute right-[-2px] top-[-5px]"
      >
        {{ sentNotificationsCount }}
      </div>
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1585 6.44016C14.1585 5.04422 13.604 3.70545 12.6169 2.71837C11.6298 1.73129 10.291 1.17676 8.8951 1.17676C7.49916 1.17676 6.1604 1.73129 5.17332 2.71837C4.18624 3.70545 3.6317 5.04422 3.6317 6.44016C3.6317 12.5808 1 14.3353 1 14.3353H16.7902C16.7902 14.3353 14.1585 12.5808 14.1585 6.44016Z"
          :class="[isOpen('notificationsModal') ? 'stroke-white' : 'stroke-darkGrey']"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.4141 17.8438C10.2599 18.1096 10.0385 18.3303 9.7722 18.4837C9.50586 18.6371 9.20388 18.7179 8.89652 18.7179C8.58916 18.7179 8.28719 18.6371 8.02084 18.4837C7.7545 18.3303 7.53313 18.1096 7.37891 17.8438"
          :class="[isOpen('notificationsModal') ? 'stroke-white' : 'stroke-darkGrey']"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

 
  </div>
</template>
<style>
/* Hide the scrollbar by default */
.notification_scroll {
  overflow-y: hidden; /* Hide vertical scrollbar */
}

/* Hide the scrollbar by default */
.notification_scroll {
  overflow-y: hidden; /* Hide vertical scrollbar */
}

/* Show the scrollbar when hovering over the container */
.notification_scroll:hover {
  overflow-y: auto; /* Show vertical scrollbar on hover */
}

/* Custom scrollbar for WebKit browsers (Chrome, Safari) */
.notification_scroll::-webkit-scrollbar {
  width: 6px; /* Set the width of the scrollbar */
}

/* The scrollbar track (the background of the scrollbar) */
.notification_scroll::-webkit-scrollbar-track {
  background: transparent; /* No background for the track */
  border-radius: 10px !important; /* Rounded corners for the track, just for consistency */
}

/* The draggable part of the scrollbar */
.notification_scroll::-webkit-scrollbar-thumb {
  background: #888; /* Darker grey color for the scrollbar thumb */
  border-radius: 10px; /* Rounded corners for the thumb */
  @apply transition-all ease-in-out duration-300;
}

/* Hover effect for the scrollbar thumb */
.notification_scroll::-webkit-scrollbar-thumb:hover {
  background: #555; /* Darker shade on hover */
  @apply transition-all ease-in-out duration-300;
}

/* Custom scrollbar for Firefox */
.notification_scroll {
  scrollbar-width: 2px; /* Makes the scrollbar thin */
  scrollbar-color: #888 transparent; /* Thumb color and no background for track */
}
</style>
