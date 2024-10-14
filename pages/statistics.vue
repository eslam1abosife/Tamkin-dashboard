<script lang="ts" setup>
const statsStore = useStatsStore();

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
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
      :title="$t('Save  your changes')"
      :sub-title="$t('Do you want to save the changes before moving on?')"
      confirm-btn-type="other"
      @control-other="handleSaveAndMove"
      cancelButtonName="Discard"
      :savetoAllSitesBtn="true"
      @control-cancel="handleSaveAndMove"
    />
    <div class="w-full h-full relative">
      <HeaderAccess
        :section-title="$t('Statistics')"
        :section-sub-title="
          $t(
            'Statistics involves collecting, analyzing, and interpreting data to provide useful insights.'
          )
        "
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
</style>
