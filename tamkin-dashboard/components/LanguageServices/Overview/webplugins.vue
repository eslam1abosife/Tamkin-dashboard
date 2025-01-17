<script lang="ts" setup>
import { Line } from "vue-chartjs";
import { ref, onMounted, nextTick, computed, watch } from "vue";
import { useNavbarStore } from "@/stores/navbar";
import { useCollapseStore } from "@/stores/collapse.js";
import { useCustomizeStore } from "@/stores/customize.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
const {t,locale} = useI18n();
const navStore = useNavbarStore();
const collapseStore = useCollapseStore();
const customizeStore = useCustomizeStore();
const colorMode = useColorMode();
const statsStore = useStatsStore();
const chart12 = ref("");
const chartData = ref({
  labels: [],
  datasets: []
});

// const chartData = ref({
//   labels: [
//     "2024-10-01",
//     "2024-10-02",
//     "2024-10-03",
//     "2024-10-04",
//     "2024-10-05",
//     "2024-10-06",
//     "2024-10-07",
//     "2024-10-08",
//     "2024-10-09",
//   ],
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [10, 5, 15, 20, 10, 15, 25, 10, 5],
//       borderColor: "rgba(75, 192, 192, 1)",
//       backgroundColor: "rgba(75, 192, 192, 0.2)",
//       fill: false,
//       tension: 0.5,
   
//     },
//     {
//       label: "Dataset 2",
//       data: [15, 10, 25, 15, 20, 25, 30, 20, 15],
//       borderColor: "rgba(255, 99, 132, 0)",
//       backgroundColor: "rgba(255, 99, 132, 0.1)",
//       fill: true,
//       tension: 0.5,
//     },
//     {
//       label: "Dataset 3",
//       data: [35, 10, 25, 55, 50, 25, 20, 20, 65],
//       borderColor: "rgba(255, 99, 132, 1)",
  
//       fill: false,
//       tension: 0.5,
//     },
//   ],
// });

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale
);
const { width, height } = useWindowSize();



const resizeCharts = () => {
  const containerWidth = document.querySelector('.container_chart')?.offsetWidth || width.value;

  if (chart12.value ) {
    chart12.value.chart.resize(containerWidth, 100);
  }
};



watch(() => width   , () => {
  resizeCharts();
});
// Ensure to clean up the tooltip element on destroy
onUnmounted(() => {
  const tooltipEl = document.getElementById('chartjs-tooltip');
  if (tooltipEl) {
    tooltipEl.remove();
  }
});

const options = ref({
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      enabled: false, // Disable the default tooltip
      external: function (context) {
        let tooltipEl = document.getElementById('chartjs-tooltip');

        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        const tooltipModel = context.tooltip;

        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);

          let innerHtml = '<thead>';
          titleLines.forEach((title) => {
            innerHtml += `<tr><th>${title}</th></tr>`;
          });
          innerHtml += '</thead><tbody>';
          bodyLines.forEach((body) => {
            innerHtml += `<tr><td>${body}</td></tr>`;
          });
          innerHtml += '</tbody>';

          tooltipEl.querySelector('table').innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left =
          position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top =
          position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel.options.bodyFont.family;
        tooltipEl.style.fontSize = tooltipModel.options.bodyFont.size + 'px';
        tooltipEl.style.fontStyle = tooltipModel.options.bodyFont.style;
        tooltipEl.style.pointerEvents = 'none';

        Object.assign(tooltipEl.style, {
          backgroundColor: 'white',
          color: '#333',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          padding: '15px',
        });
      },
    },
    legend: {
      display: false,
      rtl: locale.value === 'ar', // Dynamically set RTL for legend
    },
  },
  scales: {
    x: {
      reverse: locale.value === 'ar', // Reverse the X-axis for RTL
      border: {
        display: true,
      },
      grid: {
        display: false,
      },
      type: 'time',
      time: {
        unit: 'day',
        tooltipFormat: 'MMM dd',
        displayFormats: {
          day: 'MMM dd',
        },
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
        color: (c) => (colorMode.preference === 'dark' ? 'white' : 'black'),
        callback: function (value) {
          const date = new Date(value);
          const options = { month: 'short', day: 'numeric' };
          return date.toLocaleDateString(
            locale.value === 'ar' ? 'ar-EG' : 'en-US',
            options
          );
        },
        rtl: locale.value === 'ar', // Dynamically set RTL for X-axis ticks
      },
    },
    y: {
      position: locale.value === 'ar' ? 'right' : 'left', // Move Y-axis to the right for RTL
      grid: {
        display: true,
      },
      ticks: {
        display: true,
        color: (c) => (colorMode.preference === 'dark' ? 'white' : 'black'),
      },
      border: {
        display: false,
      },
    },
  },
});


const updateChartOptions = async (isDarkMode) => {
  options.value.scales.x.ticks.color = isDarkMode === "dark" ? "#ffffff" : "#000000";

  await nextTick();
  if (chart12.value) {
    chart12.value.chart.update();
  }
};
watch(
      () => colorMode.preference,
      async (newVal) => {
        await nextTick();

        updateChartOptions(newVal);
      }
    );
onMounted(async () => {

});

watch(() => colorMode.preference, async (newVal) => {
  await nextTick();
  updateChartOptions(newVal);
});

const myStyles = computed(() => ({
  height: "100%",
  width: "100%",
  position: "relative",
}));
import { useGetSignLangStats } from "@/composables/useAccessibility";

const { getStatsSignLanguage } = useGetSignLangStats();
const loadingStts = ref(true)
onMounted(async () => {
  
  await getStatsSignLanguage();
  await nextTick();
  updateChartOptions(colorMode.preference);
  loadingStts.value = false
  statsStore.loadingStatsIntranlsation = false
})

watchEffect(() => {
  if (statsStore.chartsData && statsStore.chartsData?.opencount?.length > 0 && statsStore.chartsData?.loadscount?.length > 0) {
    
    const sortedOpenData = statsStore.chartsData?.opencount
      .slice()
      .sort((a: any, b: any) => new Date(a.date) - new Date(b.date));  // Sort opencount by date
    
    const sortedLoadData = statsStore.chartsData?.loadscount
      .slice()
      .sort((a: any, b: any) => new Date(a.date) - new Date(b.date));  // Sort loadscount by date

    // Combine both datasets into a single chartData object
    chartData.value = {
      labels: sortedOpenData.map((t: any) => t.date),  // Using opencount's date as common labels
      datasets: [
        {
          label: t("Widget Opens"),  // Dataset for opencount
          data: sortedOpenData.map((t: any) => t.count),
           borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: false,
      tension: 0.5,
        },
        {
          label: t("Widget Load"),  // Dataset for loadscount
          data: sortedLoadData.map((t: any) => t.count),
       borderColor: "rgba(255, 99, 132, 0)",
      backgroundColor: "rgba(255, 99, 132, 0.1)",
      fill: true,
      tension: 0.5,

        },
      ],
    };
  } 
});

</script>

<template>
  <div v-if="!loadingStts" class="flex flex-col items-center justify-center w-full my-[30px] ">
    <div 
      class="bg-white dark:bg-tamkinDarkPrimary rounded-[10px] w-full  shadow-md relative px-[15px]" 
      :class="[collapseStore.collapses.includes('webplugins_chart_card') ? 'pb-[24px]' : 'pb-[10px]']">
      <div class="flex items-center justify-start pt-[16px]">
        <div>
          <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">{{$t('Web Plugins')}}</h1>
          <p class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin pt-[6px]">
          </p>
        </div>
        <!-- {{ statsStore.chartsData }} -->
      </div>
      <div v-if="!collapseStore.collapses.includes('webplugins_chart_card')"
        class="container_chart mt-[30px] h-[300px] w-full relative  ">
        <Line ref="chart12" :data="chartData" :options="options" :style="myStyles" />
      </div>
    </div> 

</div>
<div v-else class="flex flex-col items-center justify-center w-full my-[30px]">
  <div 
    class="bg-white dark:bg-tamkinDarkPrimary rounded-[10px] w-full shadow-md relative px-[15px]"
    :class="[collapseStore.collapses.includes('webplugins_chart_card') ? 'pb-[24px]' : 'pb-[10px]']">
    
    <!-- Skeleton loader for the header -->
    <div class="flex items-center justify-start pt-[16px] animate-pulse">
  
        <div class="h-4 bg-gray-300 rounded w-1/2"></div>

     

      <div class="space-y-2">
        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
        <div class="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
    
    <!-- Skeleton loader for the chart -->
    <div v-if="!collapseStore.collapses.includes('webplugins_chart_card')" class="container_chart mt-[30px] h-[300px] w-full relative">
      <div class="bg-gray-300 animate-pulse h-full w-full rounded-md"></div>
    </div>
  </div>
</div>

  
</template>
<style>

#chartjs-tooltip {
    position: absolute;
    transform: translate(-50%, -100%);
    pointer-events: none;
    white-space: nowrap;
  }
  
  #chartjs-tooltip:before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
  </style>