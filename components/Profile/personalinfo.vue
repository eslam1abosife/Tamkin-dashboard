<script lang="ts" setup>
const profileStore = useProfileStore();

const fullName = computed(() => {
  return `${profileStore.member.first_name} ${profileStore.member.last_name}`
})

const joiningDate = computed(() => {
  if (profileStore.member.creation) {
    const date = new Date(profileStore.member.creation);
  
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
  }

  return null;
})

</script>

<template>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full pt-[10px]">
    <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Full Name</h3>
          <div v-if="!profileStore.member.first_name && !profileStore.member.last_name" class="skeleton-loader animate-pulse mt-2">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <p v-else class="text-[#474E57] font-medium text-[14px] leading-[24px] truncate w-44">{{ fullName }}</p>
        </div>
        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">User ID</h3>
          <div v-if="!profileStore.member.name" class="skeleton-loader animate-pulse mt-2">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <p v-else class="text-[#15191f] font-medium text-[14px] leading-[24px]">{{ profileStore.member.name }}</p>
        </div>
      
        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Joining Date</h3>
          <div v-if="!joiningDate" class="skeleton-loader animate-pulse mt-2">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ joiningDate }}</p>
        </div>


        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Email</h3>
          <div v-if="!profileStore.member.member_email" class="skeleton-loader animate-pulse mt-2">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <p v-else class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.member.member_email }}</p>
        </div>
       

        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Mobile</h3>
          <div v-if="!profileStore.member.phone" class=" ">
        
            <h3 class="text-darkGrey font-medium text-[14px] leading-[24px]"> Mobile not added</h3>

          </div>
          <p v-else class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.member.phone }}</p>
        </div>
        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Country</h3>
          <div v-if="!profileStore.member.country" class=" ">
        
            <h3 class="text-darkGrey font-medium text-[14px] leading-[24px]"> Country not added</h3>

          </div>
          <p v-else class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.member.country }}</p>
        </div>
      </div>

</template>