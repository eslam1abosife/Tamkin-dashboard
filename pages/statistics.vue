<script lang="ts" setup>
const statsStore = useStatsStore();

definePageMeta({
  layout: "dashboard",
});

const localePath = useLocalePath();

const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return isLinkActive("/statistics") && statsStore.google_enabled;
};

const handleSaveAndMove = () => {
  statsStore.saveAndMove();
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const handleCancelLeave = () => {
  statsStore.routeLeaveModal = false; // Close the modal
};

onBeforeRouteLeave((to, from, next) => {
  if (detectUnsavedChanges()) {
    statsStore.showSaveBeforeLeaveModal();
    pendingNavigation = { next, to };
  } else {
    next(); // No unsaved changes, proceed normally
  }
});
</script>

<template>
  <div class="relative h-full w-full">
    <LazyModalsConfirm
      :showModal="statsStore.routeLeaveModal"
      title="Save  your changes"
      sub-title="Do you want to save the changes before moving on?"
      confirm-btn-type="other"
      @control-other="handleSaveAndMove"
      cancelButtonName="Discard"
      :savetoAllSitesBtn="true"
      @control-cancel="handleSaveAndMove"
    />
    <div class="w-full h-full relative">
      <HeaderAccess
        websiteImgName="tamkin_hand.svg"
        website-title="Tamkin.App"
        website-link="google.com"
        section-title="Statistics"
        section-sub-title="Statistics involves collecting, analyzing, and interpreting data to provide
          useful insights."
      />

      <StatisticsChart />

      <StatisticsUsagebyfunction />
      <StatisticsUsagebyprofile />
      <StatisticsEnablegoogleanalytics />

      <StatisticsLivetranslation />
    </div>
  </div>
</template>

<style lang="scss">
.toggle {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #eef5ff 47.07%,
    #f6f3fc 72.04%,
    #fef5f6 100%
  );
  box-shadow: 0px 4px 24px 8px rgba(81, 69, 159, 0.1);
}

.bg_interval_open {
  @apply text-white bg-gradient-to-b from-tamkinStart to-tamkinEnd dark:bg-tamkinDarkPrimary #{!important};

  &.tamkin {
    @apply rounded-[10px] h-[32px];
  }
}

.tamkin_date_input {
  box-shadow: 0px 1.54px 3.08px 0px #61616133, 0px 0.77px 1.54px 0px #61616133;
  @apply rtl:pr-[14px] ltr:pl-[14px] text-[15px] w-full h-[32px] rounded-[10px] border-[1px] dark:border-darkborder
   border-[#585B5B8C] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin focus:outline-0 #{!important};
}

.dp__pointer::placeholder {
  @apply text-darkGrey dark:!text-whiteTamkin opacity-100 font-[400] font-[Poppins] #{!important};
}

.dp__input.dp__input_icon_pad.dp__input_focus {
  @apply outline-0 ring-0 border-[1px] !border-[#585B5B8C] #{!important}; 
}

.dp__input {
  @apply rtl:pr-[14px] ltr:pl-[14px] text-[15px];
}

.dp__input_wrap .dp__input_icon {
  @apply ltr:right-[14px] rtl:left-[14px];
  inset-inline-start: auto !important;
}

.dp__calendar_item .dp__range_start,
.dp__calendar_item .dp__range_end {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply rounded-full;
}

.dp__calendar_item .dp__range_between {
  @apply bg-tamkinLight border-0;
}

.dp__calendar_item .dp__today {
  @apply rounded-full bg-white dark:bg-tamkinDarkPrimary font-[700] text-darkGrey dark:text-whiteTamkin 
  border-[1px] border-[#616161] dark:border-darkborder;
}

.dp__calendar_item .dp__today.dp__range_end,
.dp__calendar_item .dp__today.dp__range_start {
  @apply rounded-full bg-white font-[700] text-white border-0 dark:bg-tamkinDarkPrimary dark:text-whiteTamkin #{!important};
}

.dp__calendar_item .dp__date_hover_start,
.dp__calendar_item .dp__date_hover {
  @apply bg-tamkinLight;
}

.dp__inner_nav,
.dp--arrow-btn-nav:hover {
  @apply text-tamkin;
}

.custom-legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.legend-text h3 {
  margin: 0;
  font-size: 1.2em;
}

.legend-text p {
  margin: 0;
  font-size: 0.9em;
  color: #666;
}

.legend-percentage {
  font-size: 1.2em;
  font-weight: bold;

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }
}

.dp__arrow_top {
  @apply rtl:top-[-6px] rtl:!rotate-45 rtl:translate-x-[50%];
}

.dp__overlay_cell_active {
  @apply bg-tamkin;
}

.dp__overlay_cell_pad:hover {
  @apply bg-tamkinLight text-darkGrey;
}

.dp__theme_dark {
  --dp-background-color: #323e50;
  --dp-text-color: #fffefe;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>

