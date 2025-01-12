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

const navStore = useNavbarStore();
const collapseStore = useCollapseStore();
const customizeStore = useCustomizeStore();
const colorMode = useColorMode();
const statsStore = useStatsStore();
const chart12 = ref("");
const chartData = ref({
  labels: [
    "2024-10-01",
    "2024-10-02",
    "2024-10-03",
    "2024-10-04",
    "2024-10-05",
    "2024-10-06",
    "2024-10-07",
    "2024-10-08",
    "2024-10-09",
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 5, 15, 20, 10, 15, 25, 10, 5],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: false,
      tension: 0.5,
   
    },
    {
      label: "Dataset 2",
      data: [15, 10, 25, 15, 20, 25, 30, 20, 15],
      borderColor: "rgba(255, 99, 132, 0)",
      backgroundColor: "rgba(255, 99, 132, 0.1)",
      fill: true,
      tension: 0.5,
    },
    {
      label: "Dataset 3",
      data: [35, 10, 25, 55, 50, 25, 20, 20, 65],
      borderColor: "rgba(255, 99, 132, 1)",
  
      fill: false,
      tension: 0.5,
    },
  ],
});

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


const options = ref({
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      enabled: false,  // Disable the default tooltip
      external: function(context) {
        // Tooltip Element
        let tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml = '<thead>';

          titleLines.forEach(function(title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });

          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function(body, i) {
            innerHtml += '<tr><td>' + body + '</td></tr>';
          });

          innerHtml += '</tbody>';

          let tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }

        // Display, position, and set styles for font
        const position = context.chart.canvas.getBoundingClientRect();

        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel.options.bodyFont.family;
        tooltipEl.style.fontSize = tooltipModel.options.bodyFont.size + 'px';
        tooltipEl.style.fontStyle = tooltipModel.options.bodyFont.style;
        tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
        tooltipEl.style.pointerEvents = 'none';

        // Apply custom styles for the tooltip
        tooltipEl.style.backgroundColor = 'white'; // Background color
        tooltipEl.style.color = '#333'; // Text color
        tooltipEl.style.borderRadius = '10px'; // Rounded corners
        tooltipEl.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)'; // Drop shadow
        tooltipEl.style.textAlign = 'center'; // Center-align text
        tooltipEl.style.padding = '15px'; // Add padding
      }
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      border: {
        display: true,
      },
      
      grid: {
        display: false,
      },
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "MMM dd",
        displayFormats: {
          day: "MMM dd",
        },
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
        color: (c) => {
            return colorMode.preference === 'dark' ?'white' :'black'
          },
        callback: function (value) {
          const date = new Date(value);
          const options = { month: "short", day: "numeric" };
          return date.toLocaleDateString("en-US", options);
        },
      },
    },
    y: {
      grid: {
        display: true,
        
      },
      ticks: {
        display: true,
      },
      border: {
        display: false,
      },
    },
  },
});
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
onBeforeMount(async () => {
  
  await getStatsSignLanguage();
  await nextTick();
  updateChartOptions(colorMode.preference);
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full my-[30px] ">
    <div 
      class="bg-white dark:bg-tamkinDarkPrimary rounded-[10px] w-full  shadow-md relative px-[15px]" 
      :class="[collapseStore.collapses.includes('webplugins_chart_card') ? 'pb-[24px]' : 'pb-[10px]']">
      <div class="flex items-center justify-start pt-[16px]">
        <div>
          <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">{{$t('Web Plugins')}}</h1>
          <p class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin pt-[6px]">
            {{ $t('Analyze the uses of Web Plugins and the number of times Plugins are used') }}
          </p>
        </div>
        {{ statsStore.chartsData }}
      </div>
      <div v-if="!collapseStore.collapses.includes('webplugins_chart_card')"
        class="container_chart mt-[30px] h-[300px] w-full relative  ">
        <Line ref="chart12" :data="chartData" :options="options" :style="myStyles" />
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