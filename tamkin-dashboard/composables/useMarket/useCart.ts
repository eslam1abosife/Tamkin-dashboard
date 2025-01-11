import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


export default function() {
const cartItems = ref([]);

    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const marketStore = useMarketStore()
const messageData = ref('')
const codeStatus = ref(0)
    const getCartItems = async () => {
        try {
            const { data } = await api.post('/Market/GetCartItems');
            if(!data.succeeded) throw(data.message);
            cartItems.value = data.data.items;
            marketStore.setCartItems(cartItems.value);
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };
    const addItemToCart = async (item_name: string, type: string, custom_character = {}) => {
        try {
            const req = { data: { item: { type: type, name: item_name, ...custom_character } } }
            const { data } = await api.post('/Market/AddProductFromCart', req);
            if(!data.succeeded) throw(data.message);
            return data.data.name
            // getCartItems();
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    const removeItemFromCart = async (item_name: string, type: string) => {
        try {
            const { data } = await api.post('/Market/RemoveProductFromCart', {
                data: {
                    type: type,
                    item_name: item_name
                }
            });
            if(!data.succeeded) throw(data.message);
            cartItems.value = data.data.items;
            marketStore.setCartItems(cartItems.value);
            // getCartItems();
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    const createOrder = async (paymentType,card =null,locale =null) => {
        try {
            const { data } = await api.post('/Market/ConfirmOrderItems',{
              data:{
                "pay_type":paymentType, 
                "card":card, 
                "coupon_code":marketStore.promo,
                "locale":locale
              }
            });
            // if(!data.succeeded) throw(data.message);
            messageData.value = data.message ? data.message : 'Please try again later or contact support'
            codeStatus.value = data.statusCode
         
            return data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        addItemToCart,
        removeItemFromCart,
        createOrder,
        getCartItems,
        cartItems,
        loading,
        messageData,
        codeStatus
    }
}