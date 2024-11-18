<script lang="ts" setup>
// import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
// import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
// import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; 
// import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
// // import './index.css'; 

// export default defineComponent({
//   name: 'Home',
//   components: { VuePdf },
//   setup() {
//     const pdfSrc = ref<VuePdfPropsType['src']>(
//       'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
//     );
//     const numOfPages = ref(0);
//     const currentPage = ref(1);
//     const scale = ref(1.0);  

    
//     const pdfKey = ref(0);

   
//     const toolbar = reactive({
//       zoomIn() {
//         if (scale.value < 3.0) {
//           scale.value += 0.2;
//           pdfKey.value++; 
//         }
//       },
//       zoomOut() {
//         if (scale.value > 0.5) {
//           scale.value -= 0.2;
//           pdfKey.value++; 
//         }
//       },
//       nextPage() {
//         if (currentPage.value < numOfPages.value) {
//           currentPage.value++;
//           pdfKey.value++; 
//         }
//       },
//       prevPage() {
//         if (currentPage.value > 1) {
//           currentPage.value--;
//           pdfKey.value++; 
//         }
//       },
//       goToPage(page: number) {
//         if (page >= 1 && page <= numOfPages.value) {
//           currentPage.value = page;
//           pdfKey.value++; 
//         }
//       },
//     });
//     function makeCuesDraggable() {
//     const cueElements = document.querySelectorAll('.vjs-text-track-display .vjs-text-track-cue div');

//     if (cueElements.length === 0) {
//         console.warn('No cue elements found. Retrying in 100ms...');

//         // Retry after a short delay if no cues are found
//         setTimeout(makeCuesDraggable, 100);
//         return;
//     }

//     cueElements.forEach(cue => {
//         let offsetY;

//         cue.addEventListener('mousedown', (e) => {
//             offsetY = e.clientY - cue.getBoundingClientRect().top;
//             document.addEventListener('mousemove', mouseMoveHandler);
//             document.addEventListener('mouseup', mouseUpHandler);
//         });

//         const mouseMoveHandler = (e) => {
//             cue.style.position = 'absolute'; // Set position to absolute
//             cue.style.top = `${e.clientY - offsetY}px`; // Update the top position
//         };

//         const mouseUpHandler = () => {
//             document.removeEventListener('mousemove', mouseMoveHandler);
//             document.removeEventListener('mouseup', mouseUpHandler);
//         };
//     });
// }

// function loadScript(src) {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.defer = true;
//     script.onload = () => resolve();
//     script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
//     document.body.appendChild(script);
//   });
// }
// function loadCSS(href) {
//   return new Promise((resolve, reject) => {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = href;
//     link.onload = () => resolve();
//     link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
//     document.head.appendChild(link);
//   });
// }
// async function loadfares() {
//   try {
//     await Promise.all([
//       loadScript('https://cdn.tamkin.app/runtime.js'),
//       loadScript('https://cdn.tamkin.app/app.js'),
//       loadCSS('https://cdn.tamkin.app/app.css'),
//     ]);
//     console.log('All assets loaded successfully');
//   } catch (error) {
//     console.error(error);
//   }
// }

//     onMounted(() => {
//         loadfares()
//       const loadingTask = createLoadingTask(pdfSrc.value);
//       loadingTask.promise.then((pdf: PDFDocumentProxy) => {
//         numOfPages.value = pdf.numPages;
//       });
//     });

//     const handleTextSelection = () => {
//       const selectedText = window.getSelection()?.toString();
//       if (selectedText) {
//         console.log('Selected text:', selectedText);
//       }
//     };

//     return {
//       pdfSrc,
//       numOfPages,
//       currentPage,
//       scale,
//       pdfKey, 
//       toolbar,
//       handleTextSelection,
//     };
//   },
// });
</script>
<template>
    <!-- <div class="relative h-screen overflow-y-scroll">
        <div class="toolbar fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center space-x-4 z-10">
          <img src="https://dv2.gdforce.com/assets/imgs/logo.png" alt="Logo" class="h-10 sm:h-12 md:h-16 lg:h-[60px] w-auto" />
        
          <div class="flex flex-wrap gap-2 justify-center items-center">
            <button @click="toolbar.zoomIn" class="bg-[#52C5BD] text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-xl text-xs sm:text-sm md:text-base">
              Zoom In
            </button>
            <button @click="toolbar.zoomOut" class="bg-[#52C5BD] text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-xl text-xs sm:text-sm md:text-base">
              Zoom Out
            </button>
            <button @click="toolbar.prevPage" class="bg-[#52C5BD] text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-xl text-xs sm:text-sm md:text-base">
              Previous Page
            </button>
            <button @click="toolbar.nextPage" class="bg-[#52C5BD] text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-xl text-xs sm:text-sm md:text-base">
              Next Page
            </button>
        
            <input 
              type="number" 
              v-model="currentPage" 
              @change="toolbar.goToPage(parseInt(currentPage))" 
              class="w-12 border border-gray-300 rounded px-2 py-1 text-center text-xs sm:text-sm md:text-base"
            />
        
            <span class="text-xs sm:text-sm md:text-base">/ {{ numOfPages }}</span>
            <span class="text-xs sm:text-sm md:text-base">Zoom: {{ scale.toFixed(1) }}x</span>
          </div>
        </div>
      
        <div class="pdf-container flex justify-center items-center h-full mt-36"> 
          <div @mouseup="handleTextSelection" class="shadow-lg bg-gray-100 p-2 sm:p-4 max-w-full">
            <VuePdf 
              :src="pdfSrc" 
              :key="pdfKey" 
              :page="currentPage" 
              :scale="scale" 
              enableTextSelection
              enableAnnotations
            />

            <tamkin-sdk-web-character class="fixed top-[200px] lg:right-0 inset-0 w-full " charWidth="400" charHeight="400" ></tamkin-sdk-web-character>

          </div>
        </div>
      </div> -->
      <div></div>
  </template>
  <style >

.toolbar {
  z-index: 10;
}

.pdf-container {
  padding-top: 5rem; /* Added padding to ensure the toolbar doesn't overlap the PDF */
}
</style>
