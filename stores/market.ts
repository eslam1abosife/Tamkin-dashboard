import { defineStore, acceptHMRUpdate } from 'pinia';
// import { v4 as uuidv4 } from 'uuid';
import { useFullUrl } from "@/composables/useSharedFunctions";
import { useCart, useEditCustomerCharacter } from "@/composables/useMarket";
import { rand } from '@vueuse/core';
const { fullUrl } = useFullUrl();

export const useMarketStore = defineStore('market', {
  state: () => ({
    currentTab:'character',
    selectedForPreview:[],
    cartItems:[],
    cartNotification:false,
    firstItemNotificationShown: false, // Add this flag

    showCart:false,
    requestModal:false,
    resetModal:false,
    showSaveFooter:false,
  }),

  actions: {
    resetAll(){
        this.selectedForPreview = []
        this.showSaveFooter = false


    },
    closeCartNotification() {
      this.cartNotification = !this.cartNotification;
      this.firstItemNotificationShown = !this.firstItemNotificationShown;
    },
    selectItemforPreview(item) {
        const existingItemIndex = this.selectedForPreview.findIndex(it => it.category_title === item.category_title);
      
        if (existingItemIndex !== -1) {
          if (this.selectedForPreview[existingItemIndex].name === item.name) {
            // If the same item is clicked again, remove it
            this.selectedForPreview.splice(existingItemIndex, 1);
            this.showSaveFooter = false;

          } else {
            // If an item of the same type is already selected but it's a different item, replace it with the new item
            this.selectedForPreview.splice(existingItemIndex, 1, item);
            this.showSaveFooter = true;

          }

        } else {
          // Otherwise, add the new item
          this.selectedForPreview.push(item);
          this.showSaveFooter = true;
        }
    },
      
    openResetModal() {
      this.resetModal = !this.resetModal;
    },
    openReqestModal() {
      this.requestModal = !this.requestModal;
    },
    openCart() {
      this.showCart = !this.showCart;
    },
    switchTabs(tab: string) {
      this.currentTab = tab;
    },
    setCartItems(items: any) {      
      items.forEach((item: any) => {
        if (item.type == 'custom_character') {
          item.category_title = 'Custom Character'
          item.category_image = '/assets/pngs/market/character-grey.svg';
          // note that if overriding item.image, this will override the custom character image array
          item.image_url = '/assets/pngs/market/special_character.png';
        }else{
          item.type = (item.skin_item || item.item_doc == 'Skin Item') ? 'skin_Item' : 'character';
          item.image_url = fullUrl(item.image);
          item.category_image = fullUrl(item.category_image);
        }
      })
      this.cartItems = items;
    },
    convertFromItemToCartItem(item, type, category_title, category_image) {
      item.item_name = item.name; // for coloring item addToCart icon in market listing
      item.cost = item.offer_cost > 0 ? item.offer_cost : item.cost; // for calculating total
      item.category_title = category_title; // for showing in cart
      if (type == 'custom_character'){
        item.item_title = item.name
        item.category_image = '/assets/pngs/market/character-grey.svg';
        item.image = '/assets/pngs/market/special_character.png';
      }else{
        item.category_image = fullUrl(category_image); // for showing in cart
        item.image = fullUrl(item.image); // for showing in cart
        item.item_title = item.text
        if (type == 'character'){
          item.category_image = '/assets/pngs/market/character-grey.svg';
        }
      }
      return item;
    },
    async addToCart(item: any, type = 'skin_Item', category_title = 'Character', category_image = '') {
      const { addItemToCart, getCartItems } = useCart();
      const { AddCustomCharacterToCart } = useEditCustomerCharacter();
      if (!this.cartItems.includes(item)) {
        // add to item until the request finishes
        let cartItem = this.convertFromItemToCartItem(item, type, category_title, category_image);
        this.cartItems.push(cartItem);

        if (type == 'custom_character') {
          await AddCustomCharacterToCart(item);
        }else{
          addItemToCart(item.name, type);
        }
        this.animateCartIcon();
  
        // Show notification if it's the first item and the notification hasn't been shown yet
        if (this.cartItems.length === 1 && !this.firstItemNotificationShown) {
          this.showFirstItemNotification();
          this.firstItemNotificationShown = true;
        }
      } else {
        this.removeFromCart(item, type);
      }
    },
    removeFromCart(item, type: string = 'skin_Item') {
      const { removeItemFromCart } = useCart();
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        removeItemFromCart(item.name, type);
        // Reset the flag if the cart is empty
        if (this.cartItems.length === 0) {
          this.firstItemNotificationShown = false;
        }
      } else {
        alert('Item not found in cart');
      }
    },
    animateCartIcon() {
      if (process.client) {
        const cartIcon = document.querySelector('.animate_cart');
        cartIcon.classList.remove('animate-scale');
        void cartIcon.offsetWidth; // Trigger reflow
        cartIcon.classList.add('animate-scale');
      }
    },
    showFirstItemNotification() {
      // Your notification logic here
    //   alert('First item added to the cart!');
    },
    isInCart(item_name) {
      return this.cartItemsNames.includes(item_name);
    }
  },
  
  getters: {
    cartItemsNames: (state) => state.cartItems.map((item) => item.item_name),
    cartSubtotal(state) {
      return state.cartItems.reduce((sum, item) => sum + parseFloat(item.cost), 0);
    },
    cartDiscount(state) {
      return 0;
      // return state.cartItems.reduce((discountSum, item) => {
      //   if (item.offer_cost > 0) {
      //     return discountSum + (item.cost - item.offer_cost);
      //   }
      //   return discountSum;
      // }, 0);
    },
    cartTotal(state) {
      return state.cartSubtotal - state.cartDiscount;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMarketStore, import.meta.hot));
}
