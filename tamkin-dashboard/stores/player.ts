import { defineStore, acceptHMRUpdate } from "pinia";
import { useFullUrl } from "@/composables/useSharedFunctions";
import {
  useSetCharacter,
  useGetCategoriesWithSkinItems,
} from "@/composables/useMarket";
import { useMarketStore } from "@/stores/market";

const { fullUrl } = useFullUrl();
export const usePlayerStore = defineStore("player", {
  state: () => ({
    // player
    characterLoaded: false,
    isFullscreen: false,
    cameraPosition: 2,
    userSelectedClothes: {},
    skinCategoryItems: {},
    characters: [],
    activeCharacter: null,
    loadingChanges: false,
    savetoallloading: false,
    lastClickedSkinItemName: null,
    clothes: [
      "sara_clothes_orignal_belt_havana_0036",
      "clothes_belt",
      "fares_clothes_original_belt_Havana_0018",
      "qasem_clothes_belt1_black_0025",
      "sara_clothes_orignal_pants_grey_0031",
      "clothes_orignal_pants_blueblack",
      "clothes_pants_grey",
      "fares_clothes_orignal_pants_blueblack_color_002",
      "fares_clothes_pants_grey_Color_009",
      "fares_clothes_shorts_jeans_Color_0012",
      "qassem_clothes_pants_grey_Color_0023",
      "sara_clothes_pants_white_0032",
      "sara_clothes_hijab_white_0035",
      "clothes_beret_grey",
      "clothes_cap_jeans",
      "fares_clothes_beret_grey_color1_004",
      "fares_clothes_cap_jeans_color1_005",
      "qassem_clothes_hair_black_Color_0021",
      "qassem_CLOTHES_original_iqal_black_0026",
      "qassem_CLOTHES_original_SHEMAGH_white_Color_0020",
      "sara_clothes_orignal_hijab_blueblack_0027",
      "clothes_glasses01_silver",
      "clothes_glasses1",
      "clothes_sunglasse_black",
      "fares_clothes_glasses01_silver_Color_006",
      "fares_clothes_original_glasses_0016",
      "fares_clothes_sunglasse_black_color_007",
      "default_outfit",
      "sara_clothes_belt_shoes_white_0034",
      "clothes_orignal_shoes_Havana",
      "clothes_sneakers_yellow",
      "fares_clothes_orignal_shoes_Havana_color_003",
      "fares_clothes_sneakers_yellow_Color_008",
      "qassem_CLOTHES_original_shoes_black_0024",
      "sara_clothes_orignal_belt_shoes_havana_0029",
      "clothes_tie1_blueblack",
      "fares_clothes_original_tie1_blueblack_Color_0013",
      "sara_clothes_tamkin_tshirt_aquamarine01_0033",
      "clothes_orignal_shirt_aquamarine",
      "clothes_shirt_purple",
      "clothes_tamkin_tshirt_aquamarine",
      "clothes_tshirt1_yellow",
      "fares_clothes_original_BADGE_0017",
      "fares_clothes_orignal_shirt_aquamarine_001",
      "fares_clothes_shirt_black_color_0010",
      "fares_clothes_shirt_purple_color_0011",
      "fares_clothes_tamkin_tshirt_aquamarine_color_0015",
      "fares_clothes_tshirt1_yellow_Color_0014",
      "qassem__clothes_shirt_black_color_0022",
      "qassem_CLOTHES_original_THWB_white_Color_0019",
      "sara_clothes_orignal_jacket_blueblack_0028",
      "sara_clothes_orignal_top_white_0030",
    ],
    currentBackground: {
      isImage: false,
      colorOrUrl: "",
    },
  }),

  actions: {
    /**
     * Toast message
     *
     * @param {string} message - Toast message
     * @param {object} [options] - Options for toast
     * @returns {void}
     */
    toast(message, options) {
      const { $toast } = useNuxtApp();
      $toast(message, options);
    },
    // player
    hideAllClothes() {
      this.activeCharAllowedSkins.forEach((skin_item) => {
        this.unwear(skin_item);
      });
    },
    addToWearedClothes(
      category: string,
      skin_item_name: string,
      character_name = null
    ) {
      if (!character_name) character_name = this.activeCharacter.name;

      if (!this.userSelectedClothes[character_name])
        this.userSelectedClothes[character_name] = {};
      if (!this.userSelectedClothes[character_name][category])
        this.userSelectedClothes[character_name][category] = [];
      this.userSelectedClothes[character_name][category].push(skin_item_name);
    },
    wearSavedClothes() {
      // get the clothes of the active character and set it to the top character
      if (this.characterLoaded) {
        this.unwearAllSkins();
        // if character has no is_weared use is_default instead
        if (!this.activeCharBackendWearedSkins.length) {
          this.activeCharacter.allowed_skins_list.map(function (skin_item) {
            skin_item.is_weared = skin_item.is_default;
          });
        }

        this.activeCharBackendWearedSkins.forEach((skin_item) => {
          this.showClothes(skin_item);
        });
      }
    },
    resetActiveCharacterAndWearSavedClothes() {
      this.changeCharacter(this.backendActiveChar);

      const marketStore = useMarketStore();
      marketStore.switchTabs("character");
    },
    owned(item) {
      return item.is_purchased || item.is_package;
    },
    getOriginalSkinItem(name: string) {
      const marketStore = useMarketStore();
      // const already_weared_skin = categoriesWithSkinItems.value.find(item => item.name == weared_skin_of_same_category)
      const allSkins = marketStore.categoriesWithSkinItems
        .map((item) => item.skin_items_list)
        .flat();
      const skin_item = allSkins.find((item) => item.name == name);
      return skin_item;
    },
    wearClothes(skin_item) {

      // for framing around the skin item
      this.lastClickedSkinItemName = skin_item.name;

      const marketStore = useMarketStore();
      // if there is a character in the preview
      if (marketStore.selectedForPreview?.[0]?.allowed_skins_list) {
        marketStore.resetAll();
      }
      this.showClothes(skin_item);

      // if (this.isClothesChanged) {
      //   // marketStore.selectItemforPreview(skin_item);
      //   marketStore.showSaveFooter = true;
      // } else {
      //   marketStore.showSaveFooter = false;
      //   // marketStore.resetAll();
      // }
      if (skin_item.is_package || skin_item.is_purchased) {
        marketStore.showSaveFooter = true;
      } else {
        marketStore.showSaveFooter = false;
      }
    },
    unwearAllSkins() {
      this.hideAllClothes();
      this.userSelectedClothes[this.activeCharacter.name] = {};
    },
    showClothes(skin_item) {
      console.log("skin_item", skin_item);
      let category = skin_item.category;
      let outfit_skins = skin_item.outfit_skins_list;

      // if skin is an outfit
      if (outfit_skins && outfit_skins.length) {
        this.unwearAllSkins();
        outfit_skins.forEach((item) => {
          this.showClothes(this.getOriginalSkinItem(item.skin_item));
        });
      } else {
        // hide skin if he is wearing it already if it can be unweared (get unweared if clicked twice)
        let weared_skins_of_same_category = this.activeCharCurrentlyWearedSkinsCategories?.[category] || [];
        if (
          weared_skins_of_same_category &&
          weared_skins_of_same_category.includes(skin_item.name)
        ) {
          console.log(skin_item.category === 'Background')
          if (skin_item.can_be_unweared || skin_item.category === 'Background') {
            this.activeCharCurrentlyWearedSkinsCategories[category].splice(
              this.activeCharCurrentlyWearedSkinsCategories[category].indexOf(
                skin_item.name
              ),
              1
            );
            // if(skin_item.category === 'Background') {

            // }
            this.unwear(skin_item);
          }
          // else: do nothing if it is weared and can't be unweared and got clicked
        } else {
          // if wearing skin of the same category, other than the weared one, unwear it first unless it can be weared with its category skins
          // get the already weared skin from categoriesWithSkinItems by code to check its can_be_weared_with_its_category_skins
          //! if the new skin is unfriendly
          if (!skin_item.can_be_weared_with_its_category_skins) {
            var $this = this;
            // 1. character has any unfriendly skin(s) -> remove the unfriendly skin(s) and add the new skin
            if (
              weared_skins_of_same_category &&
              weared_skins_of_same_category.some(
                (skin) =>
                  !this.getOriginalSkinItem(skin)
                    .can_be_weared_with_its_category_skins
              )
            ) {
              console.log(6)
              weared_skins_of_same_category
                .filter(function (skin) {
                  return !$this.getOriginalSkinItem(
                    skin
                  ).can_be_weared_with_its_category_skins;
                })
                .forEach((skin) => {
                  this.activeCharCurrentlyWearedSkinsCategories[
                    category
                  ].splice(
                    this.activeCharCurrentlyWearedSkinsCategories[
                      category
                    ].indexOf(skin),
                    1
                  );
                  let skin_to_delete = $this.getOriginalSkinItem(skin);
                  this.unwear(skin_to_delete);
                });
            }
          }
          
          if (this.activeCharCurrentlyWearedSkinsCategories[skin_item.category]) {
            this.activeCharCurrentlyWearedSkinsCategories[skin_item.category].push(skin_item.name);
          } else {
            this.activeCharCurrentlyWearedSkinsCategories[skin_item.category] = [skin_item.name];
          }
          
          this.addToWearedClothes(category, skin_item.name);
          this.wear(skin_item);
        }
      }
    },
    async changeCharacter(character: any, preview = true) {
      this.characterLoaded = false;
      
      const marketStore = useMarketStore();
      // check if this is not the backend active character
      if (character.name != this.activeCharacter?.name && preview) {
        marketStore.selectItemforPreview(character);
      } 
      else {
        marketStore.resetAll();
        this.currentBackground.isImage = false;
        this.currentBackground.colorOrUrl = "";
      }

      this.activeCharacter = character;

      setTimeout(() => {
        window.changeCharacter(character.name);
      }, 2000);

      // check if the character has loaded before
      if (!window.loadedByName(character.name)) {
        this.characterLoaded = false;
      } else {
        // character is loaded
        this.wearSavedClothes();
      }
    },
    async resetCharacterSkinsToDefault(AppName = "default") {
      var $this = this;
      this.unwearAllSkins();
      this.activeCharacter.allowed_skins_list.forEach(function (skin_item) {
        skin_item.is_weared = skin_item.is_default;
        if (skin_item.is_weared) {
          $this.addToWearedClothes(skin_item.category, skin_item.name);
          $this.wear(skin_item);
        }
      });
      await this.saveCharacterOptions(AppName, true);
      this.toast(
        useNuxtApp().$i18n.t("Default Mode Has Been Restored Successfully"),
        { hideIn: 3000, type: "success" }
      );

      const marketStore = useMarketStore();
      marketStore.resetModal = false;
      // todo
      // call api endpoint to set each skin_item.is_weared = skin_item.is_default
      // then get fresh fomatted data
    },
    wear(skin_item: any) {
      if (skin_item.category == "Background") {
        if (skin_item.background_color) {
          window.changeBackgroundColor(skin_item.background_color);
          this.currentBackground.isImage = false;
          this.currentBackground.colorOrUrl = skin_item.background_color;
        } else if (skin_item.background_image) {
          window.changeBackgroundImage(fullUrl(skin_item.background_image));
          this.currentBackground.isImage = true;
          this.currentBackground.colorOrUrl =
            "https://tamkin.app" + skin_item.background_image;
        }
      } else {
        window.showClothesVisibility(skin_item.name);
      }
    },
    unwear(skin_item: any) {
      if (skin_item.category == "Background") {
        // if (skin_item.background_color) {
          //   window.changeBackgroundColor("");
          // } else if (skin_item.background_image) {
            //   window.changeBackgroundImage("");
            // }
        window.changeBackgroundImage("");
        this.currentBackground.isImage = false;
        this.currentBackground.colorOrUrl = '';
      } else {
        window.hideClothesVisibility(skin_item.name);
      }
    },
    async saveCharacterOptions(AppName, reset) {
      const { setAppCharacter, setCharacterOptions } = useSetCharacter();
      const marketStore = useMarketStore();
      let item = null;
      let items = marketStore.selectedForPreview;
      item = items?.[0] || null;
      // if it is a character, item here means character
      if (AppName === "default") {
        this.loadingChanges = true;
      } else {
        this.savetoallloading = true;
      }
      if (item?.allowed_skins_list) {
        if (!this.owned(item)) {
          this.loadingChanges = false;
          this.savetoallloading = false;
          return this.toast("You must buy this character first.", {
            hideIn: 3000,
            type: "warning",
          });
        }

        let succeeded = await setAppCharacter(item.name, AppName);

        if (succeeded) {
          this.characters.map(function (character) {
            character.is_used = character.name == item.name;
          });
          // emptying the selectedForPreview array
          marketStore.resetAll();

          if (!reset) {
            this.toast("Character saved successfully.", {
              hideIn: 3000,
              type: "success",
            });
            this.loadingChanges = false;
            this.savetoallloading = false;
          }
        }
      }
      // if a skin item
      // skin item does not require existing skins in the selectedForPreview array
      // it gets the items from userSelectedClothes
      else {
        if (this.isActiveCharCurrentlyWearedSkinsHaveUnownedSkins) {
          this.loadingChanges = false;
          this.savetoallloading = false;
          return this.toast("You must buy all the skins first.", {
            hideIn: 3000,
            type: "warning",
          });
        }

        let skins = this.activeCharCurrentlyWearedSkinsNames.map(
          (item_name) => ({ skin_item: item_name })
        );
        let succeeded = await setCharacterOptions(
          skins,
          this.activeCharacter.name,
          AppName
        );

        if (succeeded) {
          // emptying the selectedForPreview array and hide the save footer
          marketStore.resetAll();
          let $this = this;
          // updating the ui with the applied tag
          marketStore.categoriesWithSkinItems.map(function (category) {
            category.skin_items_list.map(function (skin_item) {
              if ($this.activeCharAllowedSkinsNames.includes(skin_item.name)) {
                let is_weared =
                  $this.activeCharCurrentlyWearedSkinsNames.includes(
                    skin_item.name
                  );
                // used in applying the "applied" badge
                skin_item.is_weared = is_weared;
                // used in wearSavedClothes
                $this.activeCharAllowedSkins.find(
                  (item) => item.name == skin_item.name
                ).is_weared = is_weared;
                // both should be done automatically after the getFullDataFormated() below
              }
            });
          });
          this.toast("Character clothes saved successfully.", {
            hideIn: 3000,
            type: "success",
          });
          this.loadingChanges = false;
          this.savetoallloading = false;
        }
      }
      // updating the ui from backend
      // obligatory in case saved character, to mark its clothes as applied specially if its a freshly purshased character
      // optional in saving character clothes (handled in the client side above)
      // get fresh fomatted data
      const { getFullDataFormated } = useGetCategoriesWithSkinItems();
      getFullDataFormated();
    },
    arraysHaveSameItems(arr1: any[], arr2: any[]) {
      const hasCommonElement = arr1.some(element => arr2.includes(element));

      if (hasCommonElement) {
          return true;
      } else {
          return false;
      }
      // if (arr1.length !== arr2.length) return false;
      // // Sort arrays
      // const sortedArr1 = arr1.slice().sort();
      // const sortedArr2 = arr2.slice().sort();
      // // Compare sorted arrays
      // for (let i = 0; i < sortedArr1.length; i++) {
      //   if (sortedArr1[i] !== sortedArr2[i]) return false;
      // }
      // return true;
    },
    toggleCamera() {
      // this.cameraPosition = this.cameraPosition == 1 ? 2 : 1;
      window.adjustCameraBasedOnCharacter(this.cameraPosition, 250, 500);
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
    },
  },

  getters: {
    activeCharAllowedSkins: (state) =>
      state.activeCharacter?.allowed_skins_list || [],
    activeCharAllowedSkinsNames: (state) =>
      state.activeCharAllowedSkins.map((skin_item) => skin_item.name),

    activeCharBackendDefaultSkins: (state) =>
      state.activeCharAllowedSkins.filter((skin_item) => skin_item.is_default),
    activeCharBackendDefaultSkinsNames: (state) =>
      state.activeCharBackendDefaultSkins.map((skin_item) => skin_item.name),

    activeCharBackendWearedSkins: (state) =>
      state.activeCharacter.allowed_skins_list.filter(
        (skin_item) => skin_item.is_weared
      ),
    activeCharBackendWearedSkinsNames: (state) =>
      state.activeCharBackendWearedSkins.map((skin_item) => skin_item.name),

activeCharCurrentlyWearedSkinsCategories: (state) => {
  const activeClothes = {};

  state.activeCharacter?.allowed_skins_list.forEach((item) => {
    if(item.is_weared) {
      if (activeClothes[item.category]) {
        activeClothes[item.category].push(item.name);
      } else {
        activeClothes[item.category] = [item.name];
      }
    }
  });

  return activeClothes;
},

    // activeCharCurrentlyWearedSkinsCategories: (state) =>
    //   state.userSelectedClothes[state.activeCharacter.name],
    activeCharCurrentlyWearedSkinsNames: (state) =>
      Object.values(state.activeCharCurrentlyWearedSkinsCategories).flat(),
    isClothesChanged: function (state) {
      if (state.activeCharacter?.name) {
        return !state.arraysHaveSameItems(
          state.activeCharBackendWearedSkinsNames,
          state.activeCharCurrentlyWearedSkinsNames
        );
      } else {
        return false;
      }
    },
    isActiveCharCurrentlyWearedSkinsHaveUnownedSkins: (state) =>
      state.activeCharCurrentlyWearedSkinsNames.some(
        (skin_name) => !state.owned(state.getOriginalSkinItem(skin_name))
      ),
    backendActiveChar: function (state) {
      return (
        state.characters.find((character) => character.is_used) ||
        state.characters[0]
      );
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot));
}
