import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const cartItems = ref([]);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getCartItems = async () => {
        try {
            const { data } = await api.post('/Market/GetCartItems');
            if(!data.succeeded) throw(data.message);
            cartItems.value = data.data.items;
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
            // getCartItems();
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    const createOrder = async () => {
        try {
            const { data } = await api.post('/Market/ConfirmOrderItems');
            if(!data.succeeded) throw(data.message);
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
        loading
    }
}