<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
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
// middleware:['auth'],
// ,'permissions'
});

const currentPlan = ref("tryit");
const changePlan = (plan: string) => {
  currentPlan.value = plan;
};
const route = useRoute()
const router = useRouter()
const checkPaymentStatus = async () => {
  if (route.query && route.query.paid && route.query.locale) {
    if (route.query.locale === "ar") {
      await router.push({
        name: route.name,
        query: { paid: route.query.paid, locale: "ar" },
      });

      await nextTick();
      openModal("success_pay_mysite", "internalMediaservices");
    } else {
      openModal("success_pay_mysite", "internalMediaservices");
    }
  }
};


onMounted(()=>{
  checkPaymentStatus()
})
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
</script>

<template>
  <div class="w-full h-full relative">
    <TranslateModalsUpgrade/>
  <TranslateModalsShare/>
      <TranslateModalsTranslate v-if="isOpen('translate_video')" translate-type="video" key="video_modal" />
      <TranslateModalsTranslate v-if="isOpen('translate_audio')" translate-type="audio" />
      <TranslateModalsTranslate v-if="isOpen('translate_live_video')" translate-type="live video" />

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
    <div class="mb-[16px]" id="package" >
      <div class="flex items-center justify-between w-full">
        <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
      {{$t('Media services')}}
      </h1>

   
      </div>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      {{ $t('We make translations easy, convenient, and closer than ever for your enjoyment.') }}      </h2>
    </div>

    <TranslatePackage :type="currentPlan" @change-plan="changePlan" id="types" />
    <TranslateTypes :plan="currentPlan"/>
    <TranslatePlan />
<TranslateHerobanner/>
    <TranslateStats
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslatePlanCard
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslateTable type="Translate Videos"/>
  </div>
</template>
