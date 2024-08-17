<script lang="ts" setup>
const profileStore = useProfileStore();

const fullName = computed(() => {
  return `${profileStore.member.first_name} ${profileStore.member.last_name}`
})

const joiningDate = computed(() => {
  const date = new Date(profileStore.member.creation ? profileStore.member.creation : 0);

  return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
})

</script>

<template>

  <div class="grid grid-cols-1 md:grid-cols-2  h-full w-full py-[16px]">
    <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Full Name</h3>
          <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ fullName }}</p>
        </div>
        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">User ID</h3>
          <p class="text-[#15191f] font-medium text-[14px] leading-[24px]">{{ profileStore.member.name }}</p>
        </div>
      
        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Joining Date</h3>
          <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ joiningDate }}</p>
        </div>


        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Email</h3>
          <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.member.member_email }}</p>
        </div>
       

        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Mobile</h3>
          <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.member.phone ? profileStore.member.phone : 'N/A' }}</p>
        </div>
        <div>
          <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Country</h3>
          <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.member.country ? profileStore.member.country : 'N/A' }}</p>
        </div>
      </div>

</template>