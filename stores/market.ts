import { defineStore, acceptHMRUpdate } from 'pinia';
// import { v4 as uuidv4 } from 'uuid';
import { useFullUrl } from "@/composables/useSharedFunctions";
import { useCart, useEditCustomerCharacter } from "@/composables/useMarket";
import { rand } from '@vueuse/core';
const { fullUrl } = useFullUrl();
import {useCouponCode} from "@/composables/useMarket";



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
    promo:'',
    noDiscount:false,
    validPromo:false,
    currentDiscount:0,
    isPromoFilled:'',
    selectedCrypto:'',
    loadingPromo:false
  }),

  actions: {
    /**
     * Apply promo code to the current cart items and update the currentDiscount state
     * @returns {Promise<void>}
     */
    removeMultipleFromCart(cartItemsToRemove: any[], type: string = 'skin_Item', is_cart_item: boolean = true): void {
      const { removeItemFromCart } = useCart();
    
      // Iterate through each item in cartItemsToRemove array
      cartItemsToRemove.forEach((cartItem) => {
        let name_to_delete = cartItem.name; 
        let item_name_to_check_in_cart = cartItem.item_name; 
    
        if (!is_cart_item) {
          item_name_to_check_in_cart = cartItem.name;
          this.cartItems.forEach((it) => {
            if (it.item_name === item_name_to_check_in_cart) {
              name_to_delete = it.name;
            }
          });
        }
    
        // Check if the item is in the cart
        if (this.isInCart(item_name_to_check_in_cart)) {
          const index = this.cartItems.findIndex((it) => it.name === name_to_delete);
          if (index > -1) {
            // Remove the item
            this.cartItems.splice(index, 1);
          }
          // Call the removeItemFromCart function
          removeItemFromCart(name_to_delete, type);
        } else {
          console.warn(`Item ${item_name_to_check_in_cart} not found in cart`);
        }
      });
    
      // Reset the flag if the cart is empty
      if (this.cartItems.length === 0) {
        this.firstItemNotificationShown = false;
      }
    },
    
    async addPromoCode(){
      this.loadingPromo = true
      const {ApplyCoupon,noCodeFound} = useCouponCode()
      const res = await ApplyCoupon(this.promo)
      if(res){
    
       if(res.isValid){
        this.validPromo = res.isValid
        this.currentDiscount = Number(res.discount)
        this.noDiscount = false
        this.loadingPromo = false

       }else {
        this.noDiscount = !res.isValid
        this.loadingPromo = false

       }
      }

    },
    
     removePromoCode (){
       if(this.promo){
        this.validPromo = false
        this.promo =""
        this.noDiscount =false
        this.currentDiscount = 0

       }
    },
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
          item.type = (item.type == 'skin_Item' ||item.skin_item || item.item_doc == 'Skin Item') ? 'skin_Item' : 'character';
          item.image_url = fullUrl(item.image);
          item.category_image = fullUrl(item.category_image);
          if (item.type == 'character'){
            item.category_image = '/assets/pngs/market/character-grey.svg';
          }
        }
      })
      this.cartItems = items;
    },
    convertFromItemToCartItem(item, type, category_title, category_image) {
      
      let new_item = { ...item }
      new_item.item_name = new_item.name; // for coloring item addToCart icon in market listing
      new_item.category_title = category_title; // for showing in cart
      new_item.type = type; // for use in setCartItems
      if (type == 'custom_character'){
        const { customCharacterCost } = useEditCustomerCharacter();
        new_item.cost = customCharacterCost.value
        new_item.item_title = new_item.name
        new_item.category_image = '/assets/pngs/market/character-grey.svg';
        new_item.image_url = '/assets/pngs/market/special_character.png';
      }else{
        new_item.cost = new_item.offer_cost > 0 ? new_item.offer_cost : new_item.cost; // for calculating total
        new_item.category_image = fullUrl(category_image); // for showing in cart
        new_item.image_url = fullUrl(new_item.image); // for showing in cart
        new_item.item_title = new_item.text
        if (type == 'character'){
          new_item.category_image = '/assets/pngs/market/character-grey.svg';
        }
      }
      return new_item;
    },
    owned(item: any){
        return item.is_purchased || item.is_package;
    },
    cartable(item: any){
        return !this.owned(item)
    },
    async addToCart(item: any, type = 'skin_Item', category_title = 'Character', category_image = '') {
      
      const { addItemToCart /* , getCartItems */ } = useCart();
      if (!this.isInCart(item.name)) {
        // add to item until the request finishes
        let cartItem = this.convertFromItemToCartItem(item, type, category_title, category_image);
        let cartItemsCount = this.cartItems.push(cartItem);
  
        // Show notification if it's the first item and the notification hasn't been shown yet
        if (cartItemsCount === 1 && !this.firstItemNotificationShown) {
          this.showFirstItemNotification();
          this.firstItemNotificationShown = true;
        }
this.animateCartIcon();
      
        var cartItemName;
        if (type == 'custom_character') {
            cartItemName = await addItemToCart(item.name, type, item);
     
        }else{
            cartItemName = await addItemToCart(item.name, type);
    

        }
        this.cartItems[cartItemsCount - 1].name = cartItemName; // to be used when deleting the item

      } else {
        this.removeFromCart(item, type, false);
      }
    },
    
    // @param {boolean} [is_cart_item=true] - Whether the cart item is being deleted: from the cart or from the items listing.
    removeFromCart(cartItem: any, type: string = 'skin_Item', is_cart_item: boolean = true): void {
      const { removeItemFromCart } = useCart();
      let name_to_delete = cartItem.name; // 4e5fde354f
      let item_name_to_check_in_cart = cartItem.item_name; // Fares, sara_clothes_orignal_hijab_blueblack_0027
      if (!is_cart_item) {
        item_name_to_check_in_cart = cartItem.name;
        this.cartItems.forEach((it) => {
          if (it.item_name == item_name_to_check_in_cart) {
            name_to_delete = it.name;
          }
        })
      }
      if (this.isInCart(item_name_to_check_in_cart)) {
        // let item_to_delete = this.cartItems.find((it) => it.name == name_to_delete);
        const index = this.cartItems.findIndex((it) => it.name === name_to_delete);
        if (index > -1) {
          this.cartItems.splice(index, 1);
        }
        removeItemFromCart(name_to_delete, type);

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
    // the item_name like 'Fares', 'sara_clothes_orignal_hijab_blueblack_0027', 'ahmed mohsen custom char'
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
