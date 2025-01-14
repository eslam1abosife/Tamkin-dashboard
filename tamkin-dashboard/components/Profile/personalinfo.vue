<script lang="ts" setup>
const profileStore = useProfileStore();

const fullName = computed(() => {
  return `${profileStore.member.first_name} ${profileStore.member.last_name}`;
});

const joiningDate = computed(() => {
  if (profileStore.member.creation) {
    const date = new Date(profileStore.member.creation);

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  return null;
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-full w-full pt-[10px]">
    <div>
      <!-- Full Name -->
      <div v-if="!profileStore.loadingProfile">
        <h3
          class="text-[#A0AEC0] dark:text-whiteTamkin font-medium text-[14px] leading-[24px]"
        >
          {{ $t("Full Name") }}
        </h3>
        <p
          class="text-[#474E57] dark:text-[#A0A3A6] font-medium text-[14px] leading-[24px] truncate w-44"
        >
          {{ fullName }}
        </p>
      </div>
      <div v-else class="skeleton-loader animate-pulse mt-2">
        <div
          class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-2"
        ></div>
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
      </div>
    </div>

    <div>
      <!-- User ID -->
      <div
        v-if="!profileStore.loadingProfile"
        class="rtl:-mr-12 ipad-max:ltr:!ml-[40px] lg:ltr:-ml-[85px]"
      >
        <h3
          class="text-[#A0AEC0] dark:text-whiteTamkin font-medium text-[14px] leading-[24px]"
        >
          {{ $t("User ID") }}
        </h3>
        <p
          class="text-[#15191f] font-medium dark:text-[#A0A3A6] text-[14px] leading-[24px]"
        >
          {{ profileStore.member.name }}
        </p>
      </div>
      <div v-else class="skeleton-loader animate-pulse mt-2">
        <div
          class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-2"
        ></div>
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
      </div>
    </div>

    <div>
      <!-- Joining Date -->
      <div v-if="!profileStore.loadingProfile">
        <h3
          class="text-[#A0AEC0] font-medium text-[14px] leading-[24px] dark:text-whiteTamkin"
        >
          {{ $t("Joining Date") }}
        </h3>
        <p
          class="text-[#474E57] dark:text-[#A0A3A6] font-medium text-[14px] leading-[24px]"
        >
          {{ joiningDate }}
        </p>
      </div>
      <div v-else class="skeleton-loader animate-pulse mt-2">
        <div
          class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-2"
        ></div>
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
      </div>
    </div>

    <div>
      <!-- Email -->
      <div
        v-if="!profileStore.loadingProfile"
        class="rtl:-mr-12 ipad-max:ltr:!ml-[40px] lg:ltr:-ml-[85px]"
      >
        <h3
          class="text-[#A0AEC0] dark:text-whiteTamkin font-medium text-[14px] leading-[24px]"
        >
          {{ $t("Email") }}
        </h3>
        <p
          class="text-[#474E57] dark:text-[#A0A3A6] font-medium text-[14px] leading-[24px]"
        >
          {{ profileStore.member.member_email }}
        </p>
      </div>
      <div v-else class="skeleton-loader animate-pulse mt-2">
        <div
          class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-2"
        ></div>
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
      </div>
    </div>

    <div>
      <!-- Mobile -->
      <div v-if="!profileStore.loadingProfile">
        <h3
          class="text-[#A0AEC0] dark:text-whiteTamkin font-medium text-[14px] leading-[24px]"
        >
          {{ $t("Mobile") }}
        </h3>
        <div v-if="!profileStore.member.phone" class="">
          <h3 class="text-[#EA4335] font-medium text-[14px] leading-[24px]">
            {{ $t("Mobile not added") }}
          </h3>
        </div>
        <p
          v-else
          class="text-[#474E57] dark:text-[#A0A3A6] font-medium text-[14px] leading-[24px]"
        >
          {{ profileStore.member.phone }}
        </p>
      </div>
      <div v-else class="skeleton-loader animate-pulse mt-2">
        <div
          class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-2"
        ></div>
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
      </div>
    </div>

    <div>
      <!-- Country -->
      <div
        v-if="!profileStore.loadingProfile"
        class="rtl:-mr-12 ipad-max:ltr:!ml-[40px] lg:ltr:-ml-[85px]"
      >
        <h3
          class="text-[#A0AEC0] dark:text-whiteTamkin font-medium text-[14px] leading-[24px]"
        >
          {{ $t("Country") }}
        </h3>
        <div v-if="!profileStore.member.country" class="">
          <h3 class="text-[#EA4335] font-medium text-[14px] leading-[24px]">
            {{ $t("Country not added") }}
          </h3>
        </div>
        <p
          v-else
          class="text-[#474E57] dark:text-[#A0A3A6] font-medium text-[14px] leading-[24px]"
        >
          {{ $t(profileStore.member.country) }}
        </p>
      </div>
      <div v-else class="skeleton-loader animate-pulse mt-2">
        <div
          class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-2"
        ></div>
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
      </div>
    </div>
  </div>
</template>
