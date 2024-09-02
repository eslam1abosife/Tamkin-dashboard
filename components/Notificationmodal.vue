

<script setup lang="ts">
import {
  useGetNotification,
  useMarkAllNotification,
} from "@/composables/useNotificationBell";
const { t, locale } = useI18n();

const notificationBellStore = useNotificationBellStore();

const { getNotification } = useGetNotification();
const { markAllNotification } = useMarkAllNotification();

import dayjs from "dayjs";
// import 'dayjs/locale/ar-sa'; // Import the locale you need
import relativeTime from "dayjs/plugin/relativeTime";
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const timeAgo = (dateString: string) => {
  const date = dayjs(dateString);
  dayjs.extend(relativeTime);
  const customArabicLocale = {
    name: "ar",
    relativeTime: {
      future: "في %s",
      past: "منذ %s",
      s: "ثوان",
      m: "دقيقة",
      mm: (number) => {
        if (number === 1) {
          return "دقيقة واحدة";
        } else if (number === 2) {
          return "دقيقتان";
        } else if (number <= 10) {
          return `${number} دقائق`;
        } else {
          return `${number} دقيقة`;
        }
      },
      h: "ساعة",
      hh: (number) => {
        if (number === 1) {
          return "ساعة واحدة";
        } else if (number === 2) {
          return "ساعتان";
        } else if (number <= 10) {
          return `${number} ساعات`;
        } else {
          return `${number} ساعة`;
        }
      },
      d: "يوم",
      dd: (number) => {
        if (number === 1) {
          return "يوم واحد";
        } else if (number === 2) {
          return "يومان";
        } else {
          return `${number} أيام`;
        }
      },
      M: "شهر",
      MM: (number) => {
        if (number === 1) {
          return "شهر واحد";
        } else if (number === 2) {
          return "شهران";
        } else {
          return `${number} أشهر`;
        }
      },
      y: "سنة",
      yy: (number) => {
        if (number === 1) {
          return "سنة واحدة";
        } else if (number === 2) {
          return "سنتان";
        } else if (number <= 10) {
          return `${number} سنوات`;
        } else {
          return `${number} سنة`;
        }
      },
    },
  };

  dayjs.locale(locale.value === "ar" ? customArabicLocale : "en-gb");

  return dayjs().to(dayjs(date)); // This will return strings like "a minute ago", "20 hours ago", "2 days ago", etc.
};

onMounted(async () => {
  await getNotification();
});
function beforeEnterCart(el) {
  const isRTL = document.documentElement.dir === 'rtl';
  el.style.transform = isRTL ? "translateX(-100%)" : "translateX(100%)";
  el.style.opacity = "0";
}

function enterCart(el, done) {
  setTimeout(() => {
    el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
    done();
  }, 0);
}
const localePath = useLocalePath()
function leaveCart(el, done) {
  const isRTL = document.documentElement.dir === 'rtl';
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  el.style.transform = isRTL ? "translateX(-100%)" : "translateX(100%)";
  el.style.opacity = "0";
  setTimeout(() => {
    done();
  }, 500);
}
watch(isOpen('notificationsModal'),(nv,ov)=>{
    if(nv === true){
        window.$chatwoot.toggleBubbleVisibility("hide");
    }if(!nv && process.client && window.$chatwoot){ 
        window.$chatwoot.toggleBubbleVisibility("show");

    }
})
</script>
<template>
    <transition @before-enter="beforeEnterCart" @enter="enterCart" @leave="leaveCart">

    <div
    v-if="isOpen('notificationsModal')"
    class="fixed top-[0]  z-[9999]  rtl:left-[0] ltr:right-[0%] drop-shadow-xl bg-white  ltr:!rounded-r-[0]
    rtl:rounded-l-0 rtl:rounded-r-[10px] ltr:rounded-tl-[10px] h-full max-h-[100vh] w-[310px] rounded-b-[10px] flex flex-col items-start justify-start"
  >
    <div
      class="h-[69px] bg-[#35C0B4] rtl:rounded-l-[0] ltr:!rounded-r-[0] p-[20px] flex items-center justify-between rounded-t-[10px] w-full"
    >
      <div class="flex items-center justify-start text-white">
        {{ $t("Notifications") }} ({{ notificationBellStore.notifications.length }})
      </div>
      <div
        class="bg-white h-[24px] w-[24px] rounded-full flex items-center
         justify-center cursor-pointer hover:bg-gradient-to-r from-tamkinStart to-tamkinEnd group"
         @click.prevent="closeMenu"
      >
        <svg
          width="14"
          height="13"
          class="w-[12.5px] h-[11.95px]"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.64832 6.92484L13.0968 2.66806C13.2076 2.58072 13.2981 2.47236 13.3626 2.34987C13.427 2.22737 13.4641 2.09343 13.4714 1.95655C13.4786 1.81967 13.456 1.68284 13.4048 1.55477C13.3536 1.42669 13.2751 1.31017 13.1741 1.2126C13.0732 1.11503 12.952 1.03856 12.8184 0.988038C12.6848 0.937517 12.5416 0.914053 12.398 0.919137C12.2543 0.924222 12.1134 0.957744 11.9841 1.01757C11.8547 1.0774 11.7399 1.16223 11.6468 1.26666L7.18651 5.53096L2.72621 1.26666C2.52652 1.10921 2.27221 1.0288 2.01342 1.0413C1.75463 1.0538 1.51014 1.15829 1.32816 1.33418C1.14617 1.51007 1.03989 1.74458 1.03028 1.99149C1.02067 2.2384 1.10841 2.47979 1.27622 2.66806L5.7247 6.92484L1.27622 11.1779C1.08185 11.3632 0.972656 11.6146 0.972656 11.8767C0.972656 12.1388 1.08185 12.3902 1.27622 12.5755C1.47059 12.7608 1.73422 12.865 2.0091 12.865C2.28398 12.865 2.5476 12.7608 2.74198 12.5755L7.18651 8.31872L11.6468 12.5755C11.8466 12.7289 12.0991 12.8063 12.3552 12.7925C12.6114 12.7787 12.8531 12.6748 13.0335 12.5008C13.2139 12.3269 13.3203 12.0954 13.332 11.851C13.3437 11.6066 13.2599 11.3667 13.0968 11.1779L8.64832 6.92484Z"
            class="fill-[#585B5B] group-hover:fill-white"
          />
        </svg>
      </div>
    </div>

    <!-- No Notifications -->
    <!-- notificationBellStore.notifications.length === 0 -->
    <div class="flex flex-col items-center justify-center h-full mx-auto" v-if="notificationBellStore.notifications.length === 0">
      <div>
        <img
          src="/imgs/notifications_not_available.png"
          class="w-[49px] h-[49px]"
          alt=""
        />
      </div>
      <div class="mt-[8px] text-center text-gray-500">
        {{ $t("No notifications available") }}
      </div>
    </div>

    <!-- Notifications List -->
    <div
      class="w-full notification_scroll overflow-y-scroll max-h-[86vh]"
      v-else
    >
      <div
        v-for="notification in notificationBellStore.notifications"
        :key="notification.name"
        class="flex items-start rtl:space-x-reverse space-x-4 p-4 cursor-pointer hover:bg-tamkinLight w-full last:rounded-b-[10px]"
      >
        <!-- Indicator -->
        <div
          class="w-3 h-3 rounded-full mt-1"
          :class="notification.status === 'Sent' ? 'bg-[#35C0B4]' : 'bg-[#A7A7A7]'"
        ></div>

        <!-- Content -->
        <div class="flex-1 w-full">
          <p
            :class="notification.status === 'Sent' ? 'text-darkGrey' : 'text-[#A7A7A7]'"
            class="font-[500] text-[13px] leading-[20px]"
          >
            {{ $t(notification.message) }}
          </p>
          <div
            class="flex items-center text-[10px] text-[#878787] justify-start gap-2 mt-2"
          >
            <img
              src="/imgs/clock.png"
              class="w-[15px] h-[15px] ml-[-2px]"
              :class="notification.status === 'Sent' ? '' : 'opacity-20'"
              alt="Clock Icon"
            />
            {{ timeAgo(notification.creation) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>