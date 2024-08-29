import { defineStore, acceptHMRUpdate } from 'pinia';
import { useFullUrl } from "@/composables/useSharedFunctions";
import { useGetCategoriesWithSkinItems } from "@/composables/useMarket";

const { fullUrl } = useFullUrl();
const {$toast} = useNuxtApp();

export const usePlayerStore = defineStore('player', {
  state: () => ({
    // player
    characterLoaded: false,
    isFullscreen: false,
    cameraPosition: 1,
    userSelectedClothes: {},
    persistClothesError: '',
    setActiveCharacterError: '',
    persistClothesSubmitStatus: null,
    skinCategoryItems: {},
    clothesChanged: false,
    activeCharacter: null,
    clothes: [
        "clothes_glasses1",
        "clothes_belt",
        "clothes_BADGE",
        "clothes_tie1_blueblack",
        "clothes_orignal_pants_blueblack",
        "clothes_orignal_shirt_aquamarine",
        "clothes_orignal_shoes_Havana",
        "clothes_sunglasse_black",
        "clothes_glasses01_silver",
        "clothes_cap_jeans",
        "clothes_beret_grey",
        "clothes_sneakers_yellow",
        "clothes_shorts_jeans",
        "clothes_tamkin_tshirt_aquamarine",
        "clothes_tshirt1_yellow",
        "clothes_shirt_purple",
        "clothes_shirt_black",
        "clothes_pants_grey",
    ],

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
        // this.clothes.forEach(code => {
        //   window.hideClothesVisibility(code)
        // })
        // or
        window.without_outfit();
      },
      wearSavedClothes(){
        // get the clothes of the active character and set it to the top character
        // if (this.characterLoaded) {
        //   this.userSelectedClothes = {}
        //   this.hideAllClothes()
        //   let active_char = this.skinCategoryItems['characters'].find((character) => character.name == this.activeCharacter?.name)
        //   active_char.weared_skins.forEach(skin_item => {
        //     this.showClothes(skin_item)
        //   });
        // }
        // this.checkClothesChanged()
      },
      owned(item){
          return item.applied || item.purchaser || item.package;
      },
      getOriginalSkinItem(code: string){
          const { categoriesWithSkinItems } = useGetCategoriesWithSkinItems();
          // const already_weared_skin = categoriesWithSkinItems.value.find(item => item.code == weared_skin_of_same_category)
          const allSkins = categoriesWithSkinItems.value.map(item => item.category_items).flat();
          const skin_item = allSkins.find(item => item.code == code)
          return skin_item;
      },
      wearClothes(skin_item){
        // if (!this.owned(skin_item))
        //   return $toast('You must buy this item first.', { hideIn: 3000, type: 'warning' })
        this.showClothes(skin_item)
        // this.checkClothesChanged()
      },
      showClothes(skin_item) {
        let new_skin_code = skin_item.code
        let category  = skin_item.category
        let outfit_skins = skin_item.outfit_skins
        
        // if skin is an outfit
        if (outfit_skins && outfit_skins.length) {
          this.hideAllClothes()
          this.userSelectedClothes = {}
          outfit_skins.forEach(item => {
            this.userSelectedClothes[item.category] = item.code
            window.showClothesVisibility(item.code)
          })
        }else{
          // hide skin if he is wearing it already if it can be unweared (get unweared if clicked twice)
          // skin_item.can_be_weared_with_its_category_skins
          let weared_skins_of_same_category = this.userSelectedClothes[category] || [];
          // clicking twice on the same skin item should remove the skin if it can be unweared (unwearable) (ينفع يتخلع)
          if (weared_skins_of_same_category && weared_skins_of_same_category.includes(new_skin_code) && skin_item.can_be_unweared){
            this.userSelectedClothes[category].splice(this.userSelectedClothes[category].indexOf(new_skin_code), 1);
            window.hideClothesVisibility(new_skin_code)
          }else{
            // if wearing skin of the same category, other than the weared one, unwear it first unless it can be weared with its category skins
            // get the already weared skin from categoriesWithSkinItems by code to check its can_be_weared_with_its_category_skins
            
            //! if the new skin is unfriendly
            if (!skin_item.can_be_weared_with_its_category_skins) {
              // 1. has any unfriendly skin(s) -> remove the unfriendly skin(s) and add the new skin
              if (weared_skins_of_same_category && weared_skins_of_same_category.some(skin => !this.getOriginalSkinItem(skin).can_be_weared_with_its_category_skins)) {
                weared_skins_of_same_category.filter(skin => !this.getOriginalSkinItem(skin).can_be_weared_with_its_category_skins).forEach(skin => {
                  this.userSelectedClothes[category].splice(this.userSelectedClothes[category].indexOf(skin), 1);
                  window.hideClothesVisibility(skin)
                })
              }
            }
            this.userSelectedClothes[category] = this.userSelectedClothes[category] || [];
            this.userSelectedClothes[category].push(new_skin_code);
            window.showClothesVisibility(new_skin_code);
          }
        }
        console.log(new_skin_code);
      },
      // hideClothes(code){
      //   if (this.userSelectedClothes.includes(code)){
      //     this.userSelectedClothes.splice(this.userSelectedClothes.indexOf(code), 1);
      //     window.hideClothesVisibility(code)
      //   }
      // },
      changeCharacter(character: any) {
        // if (!this.owned(character))
        //   return $toast('You must buy this item first.', { hideIn: 3000, type: 'warning' })
        console.log(character);
        // check if the character has loaded before
        if (!window.loadedByName(character.name))
            this.characterLoaded = false;
        window.changeCharacter(character.name);

        this.activeCharacter = character;
        // this.checkClothesChanged();

      },

      checkType(variable) {
        if (typeof variable === 'string') {
            return 'string';
        } else if (typeof variable === 'object') {
            if (Array.isArray(variable)) {
                return 'array';
            } else {
                return 'object';
            }
        } else if (typeof variable === 'number') {
            return 'number';
        } else {
            return 'other';
        }
      },
      isArray(variable) {
        return this.checkType(variable) === 'array';
      },
      values(obj) {
        return Object.keys(obj).map(function(key) {
          return obj[key];
        });
      },
      flatten(arr) {
        arr = this.values(arr);
        var flatArray = [];
        arr.forEach(function(element) {
          if (Array.isArray(element)) {
            flatArray = flatArray.concat(element);
          } else {
            flatArray.push(element);
          }
        });
        return flatArray;
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
      checkClothesChanged(){
        let active_char = this.skinCategoryItems['characters'].find((character) => character.name == this.activeCharacter?.name)
        let selectedClothes = this.flatten(this.userSelectedClothes)
        if (active_char && selectedClothes.length) {
          let savedClothes = active_char.weared_skins.map(skin_item => skin_item.code);
          this.clothesChanged = !this.arraysHaveSameItems(selectedClothes, savedClothes)
        }else{
          this.clothesChanged = false
        }
      },
      async persistClothes(){
        try {
          this.persistClothesSubmitStatus = 'P'
          let form = {'clothes': JSON.stringify(this.values(this.userSelectedClothes))}
          // await this.$store.dispatch('market/persistClothes', form)
          this.persistClothesSubmitStatus = 'S'
          this.checkClothesChanged()
          // this.$store.dispatch('general/updateAndShowToast', {header: 'Success', body: 'Clothes applied successfully.', type: 'success'})
        } catch (error) {
          this.persistClothesSubmitStatus = 'E'
          this.persistClothesError = error.message || 'An error occurred.';
          // this.$store.dispatch('general/updateAndShowToast', {header: 'Error', body: this.persistClothesError, type: 'error'})
        }
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
    // cartItemsNames: (state) => state.selectedForPreview.map((item) => item.item_name),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot));
}
