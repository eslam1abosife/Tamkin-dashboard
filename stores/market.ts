import { defineStore, acceptHMRUpdate } from 'pinia';
// import { v4 as uuidv4 } from 'uuid';
import { useFullUrl } from "@/composables/useSharedFunctions";
import { useCart } from "@/composables/useMarket";
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
    addToCart(item, category_title = '', category_image = '') {
      const { addItemToCart } = useCart();

      item.final_cost = item.offer_cost > 0 ? item.offer_cost : item.cost;
      item.category_title = category_title;
      item.category_image = fullUrl(category_image);
      item.title = item.text
      item.image = fullUrl(item.image);
      let type = 'skin_Item';
      if (item.category_title == 'Character'){
        item.category_image = '/assets/pngs/market/character-grey.svg';
        type = 'character'
      }else if (item.is_special_character){
        type = 'custom_character'
      }
      
      if (!this.cartItems.includes(item)) {
        this.cartItems.push(item);
        addItemToCart(item.name, type);
        this.animateCartIcon();
  
        // Show notification if it's the first item and the notification hasn't been shown yet
        if (this.cartItems.length === 1 && !this.firstItemNotificationShown) {
          this.showFirstItemNotification();
          this.firstItemNotificationShown = true;
        }
      } else {
        this.removeFromCart(item);
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
        // alert('Item not found in cart');
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
    }
  },
  
  getters: {
    cartSubtotal(state) {
      return state.cartItems.reduce((sum, item) => sum + item.final_cost, 0);
    },
    cartDiscount(state) {
      return state.cartItems.reduce((discountSum, item) => {
        if (item.offer_cost > 0) {
          return discountSum + (item.cost - item.offer_cost);
        }
        return discountSum;
      }, 0);
    },
    cartTotal(state) {
      return state.cartSubtotal - state.cartDiscount;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMarketStore, import.meta.hot));
}
