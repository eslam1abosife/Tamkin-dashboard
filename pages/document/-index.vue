<script lang="ts" setup>
import {useGetPackages,useGetStats} from '@/composables/useInternal'

const {getPackages} = useGetPackages()
const {getStats} = useGetStats()
const {locale} = useI18n()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],
requiredPermission: "sign-language-documents",

});

const currentPlan = ref("freetrial");
const changePlan = (plan: string) => {
  currentPlan.value = plan;
};

const route = useRoute()
const router = useRouter()

const translateStore = useTranslateStore()
const refreshData = async () => {
  const result = await getPackages()
      const result2 = await getStats()
      if(result){
        translateStore.currentApp = result
translateStore.internalPackages = result.package
translateStore.statsPackage = result2

      }


};
const localePath = useLocalePath()
const checkPaymentStatus = async () => {
  if (route.query && route.query.paid && route.query.locale) {
    const targetLocale = route.query.locale === "ar" ? "ar" : "en"

    let localizedPath = route.path;
    if (!localizedPath.startsWith(`/${targetLocale}`)) {
      localizedPath = `/${targetLocale}${localizedPath}`;
    }

    await router.push({
      path: route.query.locale === 'en' ? route.path: localizedPath,
      query: { ...route.query, locale: targetLocale },
    });

    await nextTick();
    openModal("success_pay_mysite", "internalMediaservices");
  }else if(route.query && route.query.paid && route.query.locale === 'en') {
    openModal("success_pay_mysite", "internalMediaservices");
  }
};



onMounted(async ()=>{
  await checkPaymentStatus()
})

</script>

<template>
  <div class="w-full h-full relative">
    <TranslateModalsUpgrade 
    typeofPackage="Documents"
    header="Upgrade to upload more Documents" text="Sorry, you do not have enough words and characters available to translate the Documents Please upgrade to continue the translation process without interruption"/>
  
  

      <TranslatedocsModalsTranslate v-if="isOpen('translate_pdf_documents')" translate-type="PDF Documents"/>
      <TranslatedocsModalsTranslate v-if="isOpen('translate_word_documents')" translate-type="Word Documents"/>
      <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
        <!-- Modal for adding a package -->
        <PackagesPaymentModalsPackage v-if="isOpen('add_package_modal_packages')" />
      </transition>
      <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
        <PackagesPaymentModalsPaymentMethods />
      </transition>
      <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
        <PackagesPaymentModalsCard v-if="isOpen('cardModal_packages')" />
      </transition>
      <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
        <PackagesPaymentModalsSuccess v-if="isOpen('success_pay_package')" />
      </transition>
    

  
      <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
        <PackagesPaymentModalsCryptoStep1 v-if="isOpen('crypto_packages_step1')" />
      </transition>
      <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
        <PackagesPaymentModalsCryptoStep2 v-if="isOpen('crypto_packages_step2')" />
      </transition>
      <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
        <PackagesPaymentModalsCryptoSuccess />
      </transition>
      <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
        <PackagesPaymentModalsPaypal />
      </transition>
      <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in" >
      <MySitePaymentSuccess v-if="isOpen('success_pay_mysite')" @update-data="refreshData"/>
    </transition>
      <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySiteNopackagebuy
        :class="isOpen('shareModal') ? 'z-[99]' : 'z-[9999]'"
        v-if="isOpen('upgrade_no_package')"
      />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySiteUpgrade
        :class="isOpen('shareModal') ? 'z-[99]' : 'z-[9999]'"
        v-if="isOpen('upgrade_mysite_package')"
      />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <!-- Modal for adding a package -->
      <MySitePaymentPackage v-if="isOpen('add_package_modal_mysite')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentPaymentmethods />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentCard v-if="isOpen('cardModal_mysite')" />
    </transition>

    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <ProfileBillingModalsAddnewCard v-if="isOpen('add_new_card_billing')" />
    </transition>

    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentCryptoStep1 v-if="isOpen('crypto_mysite_step1')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentCryptoStep2 v-if="isOpen('crypto_mysite_step2')" />
    </transition>

    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentPaypal />
    </transition>
    <div class="space-y-[10px] mb-[16px]">
      <div class="flex items-center justify-between w-full">
        <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
      {{ $t('Documents Services') }}      </h1>

    
      </div>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      {{ $t('We make translations easy, convenient, and closer than ever for your enjoyment.') }}      </h2>
    </div>


    <div v-if="!translateStore.loadingProjects" class="flex items-center justify-start
     rtl:space-x-reverse space-x-[24px] mb-[16px]" >

        <div  class="flex items-center justify-center  rtl:space-x-reverse space-x-[8px] h-[72px] p-[24px] custom-border bg-white rounded-[10px]">
<div>
    <img src="/assets/imgs/translatedocs/doc_header.svg" alt="">
</div>
<div class="text-[16px] font-[600] leading-[24px] text-darkGrey">
    {{ $t('Total DOCX') }}
</div>
<div class="text-[16px] font-[600] leading-[24px] text-darkGrey">
   {{translateStore.docxCount}}
</div>
        </div>
        <div class="flex items-center justify-center  rtl:space-x-reverse space-x-[8px] h-[72px]  p-[24px] custom-border bg-white rounded-[10px]">
            <div>
                <img src="/assets/imgs/translatedocs/pdf_header.svg" alt="">
            </div>
            <div class="text-[16px] font-[600] leading-[24px] text-darkGrey">
                {{ $t('Total PDF') }}
            </div>
            <div class="text-[16px] font-[600] leading-[24px] text-darkGrey">
               {{ translateStore.pdfCount}}
            </div>
                    </div>

          
    </div>

    <div v-if="translateStore.loadingProjects" class="mb-[16px] flex items-center justify-start rtl:space-x-reverse space-x-[24px] ">
      <div v-for="s in 2" class="h-[72px] w-[217px] rounded-[10px] animate-pulse bg-gray-200">

      </div>
     </div>

    <TranslatedocsPackage :type="currentPlan" @change-plan="changePlan" />
    <TranslatedocsTypes :plan="currentPlan" />
    <TranslatePlan />
    <TranslateStats
      v-if="currentPlan === 'freetrial_Ex' || currentPlan === 'pro_pack'"
    />
    <TranslatePlanCard
      v-if="currentPlan === 'freetrial_Ex' || currentPlan === 'pro_pack'"
    />
    <TranslateTable type="Translate Documents"/>

  </div>
</template>
