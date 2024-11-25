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
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">{{$t('Company')}} </h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px] truncate w-44">
        <!-- {{ profileStore.company.agency_name ? profileStore.company.agency_name : 'N/A' }} -->
        {{ profileStore.company.agency_name ? profileStore.company.agency_name : 'N/A' }}
      </p>
    </div>
    <div class="rtl:-mr-12 ipad-max:ltr:!ml-[40px] lg:ltr:-ml-[85px]"> 
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">{{$t('Account ID')}} </h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">
        {{ profileStore.company.name }}
      </p>
    </div>
    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">{{$t('Created')}}</h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">
        {{ createdDate }}
      </p>
    </div>
    <div class="rtl:-mr-12 ipad-max:ltr:!ml-[40px] lg:ltr:-ml-[85px]">
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">{{ $t('Business Email') }} </h3>
      <p class="text-[#474E57] font-medium text-[14px] leading-[24px]">{{ profileStore.company.owner_of_agency ? profileStore.company.owner_of_agency : 'N/A' }}</p>
    </div>
    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">{{$t('Phone')}}</h3>
      <p v-if="profileStore.company.phone" class="text-[#474E57] font-medium text-[14px] leading-[24px] truncate w-44">
   {{   profileStore.company.phone}}
      </p>

      <p v-else class="text-[#EA4335] font-medium text-[14px] leading-[24px]">
      {{ $t('Phone not Added') }}
       </p>
    </div>
    <div class="rtl:-mr-12 ipad-max:ltr:!ml-[40px] lg:ltr:-ml-[85px]">
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">{{$t('Country')}}</h3>
      <p v-if="profileStore.company.country " class="text-[#15191f] font-medium text-[14px] leading-[24px]">

        {{ $t(profileStore.company.country )  }}
      </p>
      <p v-else class="text-[#EA4335] font-medium text-[14px] leading-[24px]">
        {{ $t('Country not Added') }}
       </p>
    </div>

    <div>
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">{{ $t('Company specialization') }}
     
           </h3>
      <p v-if="profileStore.company.company_specialization" class="text-[#474E57] font-medium text-[14px] leading-[24px]">
        {{ $t(profileStore.company.company_specialization) }}</p>
   
      <p v-else class="text-[#EA4335] font-medium text-[14px] leading-[24px]">
    {{ $t('Specialization not Added') }}
         </p>
    </div>
      <div class="rtl:-mr-12 ipad-max:ltr:!ml-[40px] lg:ltr:-ml-[85px]">
      <h3 class="text-[#A0AEC0] font-medium text-[14px] leading-[24px]">{{$t('Team')}}</h3>
      <p v-if="profileStore.company.team_name" class="text-[#474E57] font-medium text-[14px] leading-[24px]">
       {{profileStore.company.team_name }}
      </p>
      <p v-else class="text-[#EA4335] font-medium text-[14px] leading-[24px]">
       {{ $t('Team not Added') }}
       </p>
    </div>

    
  

  </div>
</template>
