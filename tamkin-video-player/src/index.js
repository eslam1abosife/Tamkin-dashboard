// import { App as VueApp } from 'vue'; // Correct import for Vue 3

import VTamkinPlayer from './VTamkinPlayer.vue';
import VTamkinPdf from './VTamkinPdf.vue';
import Player from './Player.vue';
import MarketPlayer from './MarketPlayer.vue';
const VTamkinVideoPlayer = {
  install(Vue) {
    Vue.component('VTamkinPlayer', VTamkinPlayer);
    Vue.component('VTamkinPdf', VTamkinPdf);
    Vue.component('Player', Player);
    Vue.component('MarketPlayer', MarketPlayer);
  },
};




export { VTamkinPlayer,VTamkinPdf ,Player,MarketPlayer};
export default VTamkinVideoPlayer;
