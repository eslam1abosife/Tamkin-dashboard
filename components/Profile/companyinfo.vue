<script lang="ts" setup>
  const profileStore = useProfileStore();

  const createdDate = computed(() => {
    const date = new Date(profileStore.company.creation ? profileStore.company.creation : 0);

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
  })

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-full w-full pt-[10px]">
    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Company </h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">
        <!-- {{ profileStore.company.agency_name ? profileStore.company.agency_name : 'N/A' }} -->
        {{ profileStore.company.agency_name ? profileStore.company.agency_name : 'N/A' }}
      </p>
    </div>
    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Account ID </h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">
        {{ profileStore.company.name }}
      </p>
    </div>
    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Created</h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">
        {{ createdDate }}
      </p>
    </div>
    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Business Email </h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.company.owner_of_agency ? profileStore.company.owner_of_agency : 'N/A' }}</p>
    </div>
    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Phone</h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">
        {{ profileStore.company.phone ? profileStore.company.phone : 'N/A' }}
      </p>
    </div>
    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Country</h3>
      <p class="text-[#15191f] font-medium text-[14px] leading-[24px]">
        {{ profileStore.company.country ? profileStore.company.country : 'N/A' }}
      </p>
    </div>

    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Company specialization
     
           </h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.company.company_specialization ? profileStore.company.company_specialization : 'N/A' }}</p>
    </div>
      <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">Team</h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">
        {{ profileStore.company.team_name ? profileStore.company.team_name : 'N/A' }}
      </p>
    </div>

    
  

  </div>
</template>
