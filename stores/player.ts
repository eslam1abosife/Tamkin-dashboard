import { defineStore, acceptHMRUpdate } from 'pinia';
import { useFullUrl } from "@/composables/useSharedFunctions";
import { useSetCharacter, useGetCategoriesWithSkinItems } from "@/composables/useMarket";
import { useMarketStore } from "@/stores/market";

const { fullUrl } = useFullUrl();
const { $toast } = useNuxtApp();
export const usePlayerStore = defineStore('player', {
  state: () => ({
    // player
    characterLoaded: false,
    isFullscreen: false,
    cameraPosition: 1,
    userSelectedClothes: {},
    setActiveCharacterError: '',
    skinCategoryItems: {},
    activeCharacter: null,
    clothes: ['sara_clothes_orignal_belt_havana_0036','clothes_belt','fares_clothes_original_belt_Havana_0018','qasem_clothes_belt1_black_0025','sara_clothes_orignal_pants_grey_0031','clothes_orignal_pants_blueblack','clothes_pants_grey','fares_clothes_orignal_pants_blueblack_color_002','fares_clothes_pants_grey_Color_009','fares_clothes_shorts_jeans_Color_0012','qassem_clothes_pants_grey_Color_0023','sara_clothes_pants_white_0032','sara_clothes_hijab_white_0035','clothes_beret_grey','clothes_cap_jeans','fares_clothes_beret_grey_color1_004','fares_clothes_cap_jeans_color1_005','qassem_clothes_hair_black_Color_0021','qassem_CLOTHES_original_iqal_black_0026','qassem_CLOTHES_original_SHEMAGH_white_Color_0020','sara_clothes_orignal_hijab_blueblack_0027','clothes_glasses01_silver','clothes_glasses1','clothes_sunglasse_black','fares_clothes_glasses01_silver_Color_006','fares_clothes_original_glasses_0016','fares_clothes_sunglasse_black_color_007','default_outfit','sara_clothes_belt_shoes_white_0034','clothes_orignal_shoes_Havana','clothes_sneakers_yellow','fares_clothes_orignal_shoes_Havana_color_003','fares_clothes_sneakers_yellow_Color_008','qassem_CLOTHES_original_shoes_black_0024','sara_clothes_orignal_belt_shoes_havana_0029','clothes_tie1_blueblack','fares_clothes_original_tie1_blueblack_Color_0013','sara_clothes_tamkin_tshirt_aquamarine01_0033','clothes_orignal_shirt_aquamarine','clothes_shirt_purple','clothes_tamkin_tshirt_aquamarine','clothes_tshirt1_yellow','fares_clothes_original_BADGE_0017','fares_clothes_orignal_shirt_aquamarine_001','fares_clothes_shirt_black_color_0010','fares_clothes_shirt_purple_color_0011','fares_clothes_tamkin_tshirt_aquamarine_color_0015','fares_clothes_tshirt1_yellow_Color_0014','qassem__clothes_shirt_black_color_0022','qassem_CLOTHES_original_THWB_white_Color_0019','sara_clothes_orignal_jacket_blueblack_0028','sara_clothes_orignal_top_white_0030',],

  }),

  actions: {
      // player
      setActiveCharacter(character){
          try {
          //   if (!this.owned(character))
          //     $toast('You must buy this item first.', { hideIn: 3000 })
            if (character.name == this.activeCharacter?.name)
              $toast(character.text + ' is already your active character.', { hideIn: 3000 })
            // await this.$store.dispatch('market/setActiveCharacter', character.name)
            this.activeCharacter = character
            $toast(character.text + ' has been set as your active character successfully.', { hideIn: 3000 })
          } catch (error) {
            this.setActiveCharacterError = error.message || 'An error occurred.';
            $toast('There is something wrong: ' + this.setActiveCharacterError, { hideIn: 3000 })
          }
      },
      hideAllClothes(){
        this.activeCharacter.allowed_skins_list.forEach(skin_item => {
          window.hideClothesVisibility(skin_item.name)
        })
      },
      addToWearedClothes(category:string, skin_item_name:string){
        if (!this.userSelectedClothes[this.activeCharacter.name])
          this.userSelectedClothes[this.activeCharacter.name] = {}
        if (!this.userSelectedClothes[this.activeCharacter.name][category])
          this.userSelectedClothes[this.activeCharacter.name][category] = []
        this.userSelectedClothes[this.activeCharacter.name][category].push(skin_item_name);      
      },
      wearSavedClothes(){
        // get the clothes of the active character and set it to the top character
        if (this.characterLoaded) {
          this.userSelectedClothes[this.activeCharacter.name] = {}
          this.hideAllClothes()
        // if character has no is_weared use is_default instead
        if (!this.activeCharBackendWearedSkins.length){
            this.activeCharacter.allowed_skins_list.map(function (skin_item) {
              skin_item.is_weared = skin_item.is_default;
            })
        }
        this.activeCharBackendWearedSkins.forEach(skin_item => {
            this.showClothes(skin_item)
        })
        }
      },
      owned(item){
        return item.is_purchased;
      },
      getOriginalSkinItem(name: string){
          const { categoriesWithSkinItems } = useGetCategoriesWithSkinItems();
          // const already_weared_skin = categoriesWithSkinItems.value.find(item => item.name == weared_skin_of_same_category)
          const allSkins = categoriesWithSkinItems.value.map(item => item.skin_items_list).flat();
          const skin_item = allSkins.find(item => item.name == name)
          return skin_item;
      },
      wearClothes(skin_item){
        const marketStore = useMarketStore();

        // if (!this.owned(skin_item))
        //   return $toast('You must buy this item first.', { hideIn: 3000, type: 'warning' })
        // if there is a character in the preview
        if (marketStore.selectedForPreview?.[0]?.allowed_skins_list){
          marketStore.resetAll();
        }
        this.showClothes(skin_item)
        console.log('skin_item', skin_item.name);
        console.log('this.activeCharBackendWearedSkinsNames',this.activeCharBackendWearedSkinsNames);
        console.log('this.activeCharCurrentlyWearedSkinsNames',this.activeCharCurrentlyWearedSkinsNames);
        console.log('this.isClothesChanged',this.isClothesChanged);
        
        
        if (this.isClothesChanged) {
          // marketStore.selectItemforPreview(skin_item);
          marketStore.showSaveFooter = true;
        }else{
          marketStore.showSaveFooter = false;
          // marketStore.resetAll();
        }
      },
      showClothes(skin_item) {
        let new_skin_code = skin_item.name
        let category  = skin_item.category
        let outfit_skins = skin_item.outfit_skins_list
        
        // if skin is an outfit
        if (outfit_skins && outfit_skins.length) {
          this.hideAllClothes()
          this.userSelectedClothes[this.activeCharacter.name] = {}
          outfit_skins.forEach(item => {
            // this.userSelectedClothes[this.activeCharacter.name][item.category] = item.name
            // window.showClothesVisibility(item.name)
            this.showClothes(this.getOriginalSkinItem(item.skin_item));
          })
        }else{
          // hide skin if he is wearing it already if it can be unweared (get unweared if clicked twice)
          // skin_item.can_be_weared_with_its_category_skins
          let weared_skins_of_same_category = this.userSelectedClothes[this.activeCharacter.name]?.[category] || [];
          // clicking twice on the same skin item should remove the skin if it can be unweared (unwearable) (ينفع يتخلع)
          if (weared_skins_of_same_category && weared_skins_of_same_category.includes(new_skin_code) && skin_item.can_be_unweared){
            this.userSelectedClothes[this.activeCharacter.name][category].splice(this.userSelectedClothes[this.activeCharacter.name][category].indexOf(new_skin_code), 1);
            window.hideClothesVisibility(new_skin_code)
          }else{
            // if wearing skin of the same category, other than the weared one, unwear it first unless it can be weared with its category skins
            // get the already weared skin from categoriesWithSkinItems by code to check its can_be_weared_with_its_category_skins
            //! if the new skin is unfriendly
            if (!skin_item.can_be_weared_with_its_category_skins) {
              const $this = this;
              
              // 1. has any unfriendly skin(s) -> remove the unfriendly skin(s) and add the new skin
              if (weared_skins_of_same_category && weared_skins_of_same_category.some(skin => !this.getOriginalSkinItem(skin).can_be_weared_with_its_category_skins)) {
                weared_skins_of_same_category.filter((skin) => !$this.getOriginalSkinItem(skin).can_be_weared_with_its_category_skins).forEach(skin => {
                  this.userSelectedClothes[this.activeCharacter.name][category].splice(this.userSelectedClothes[this.activeCharacter.name][category].indexOf(skin), 1);
                  window.hideClothesVisibility(skin)
                })
              }
            }         
            this.addToWearedClothes(category, new_skin_code)
            window.showClothesVisibility(new_skin_code);
          }
        }
      },
      async changeCharacter(character: any) {
        // if (!this.owned(character))
        //   return $toast('You must buy this item first.', { hideIn: 3000, type: 'warning' })
        this.activeCharacter = character;
        
        window.changeCharacter(character.name);
        // check if the character has loaded before
        if (!window.loadedByName(character.name)){
          this.characterLoaded = false;
          // this.wearSavedClothes() is handled in this case in Player.vue: window.characterLoadFinished = ()
        }else{
          // character is loaded
          this.wearSavedClothes();
        }
        const marketStore = useMarketStore();
        marketStore.selectItemforPreview(character);
      },
      async saveCharacterOptions(AppName) {
        const { setAppCharacter, setCharacterOptions } = useSetCharacter();
        const marketStore = useMarketStore();
        let item = null;
        let items = marketStore.selectedForPreview;
        item = items?.[0] || null;
        // if it is a character
        if (item?.allowed_skins_list){
          let succeeded = await setAppCharacter(item.name, AppName);
          if (succeeded){
            // emptying the selectedForPreview array
            marketStore.resetAll();
            $toast('Character saved successfully.', { hideIn: 3000, type: 'success' })
          }
        }
        // if a skin item
        // skin item does not require existing skins in the selectedForPreview array
        // it gets the items from userSelectedClothes
        else {
          let skins = this.activeCharCurrentlyWearedSkinsNames.map(item_name => ({ skin_item: item_name }));
          let succeeded = await setCharacterOptions(skins, this.activeCharacter.name, AppName);
          if (succeeded){
            // emptying the selectedForPreview array and hide the save footer
            marketStore.resetAll();
            let $this = this;
            this.activeCharacter.allowed_skins_list.map(function (skin_item) {
              skin_item.is_weared = $this.activeCharCurrentlyWearedSkinsNames.includes(skin_item.name)
            })
            const { $toast } = useNuxtApp();  
            $toast('Character clothes saved successfully.', { hideIn: 3000, type: 'success' })
          }
        }

      },
      arraysHaveSameItems(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        // Sort arrays
        const sortedArr1 = arr1.slice().sort();
        const sortedArr2 = arr2.slice().sort();
        // Compare sorted arrays
        for (let i = 0; i < sortedArr1.length; i++) {
          if (sortedArr1[i] !== sortedArr2[i])
            return false;
        }
        return true;
      },
      toggleCamera(){
        this.cameraPosition = this.cameraPosition == 1 ? 2 : 1;
        window.adjustCameraBasedOnCharacter(this.cameraPosition)
      },
      toggleFullscreen() {
        // Toggle the full screen state
        this.isFullscreen = !this.isFullscreen;
      
        // If going into fullscreen mode, request fullscreen
        if (this.isFullscreen) {
          const fullscreenDiv = this.$refs.fullscreenDiv;
          if (fullscreenDiv.requestFullscreen) {
            fullscreenDiv.requestFullscreen();
          } else if (fullscreenDiv.mozRequestFullScreen) {
            fullscreenDiv.mozRequestFullScreen();
          } else if (fullscreenDiv.webkitRequestFullscreen) {
            fullscreenDiv.webkitRequestFullscreen();
          } else if (fullscreenDiv.msRequestFullscreen) {
            fullscreenDiv.msRequestFullscreen();
          }
        } else {
          // If exiting fullscreen mode, exit fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      }      
  },
  
  getters: {
    activeCharBackendDefaultSkins: (state) => state.activeCharacter.allowed_skins_list.filter(skin_item => skin_item.is_default),
    activeCharBackendDefaultSkinsNames: (state) => state.activeCharBackendDefaultSkins.map(skin_item => skin_item.name),

    activeCharBackendWearedSkins: (state) => state.activeCharacter.allowed_skins_list.filter(skin_item => skin_item.is_weared),
    activeCharBackendWearedSkinsNames: (state) => state.activeCharBackendWearedSkins.map(skin_item => skin_item.name),

    activeCharCurrentlyWearedSkinsNames: (state) => Object.values(state.userSelectedClothes[state.activeCharacter.name]).flat(),
    isClothesChanged: function(state){
      if (state.activeCharacter?.name) {
        return !state.arraysHaveSameItems(state.activeCharBackendWearedSkinsNames, state.activeCharCurrentlyWearedSkinsNames)
      }else{
        return false
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot));
}
