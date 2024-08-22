import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const addItemToCart = async (item_name: string, type: string) => {
        try {
            let order_name = localStorage.getItem('order_name') || '';
            console.log(order_name);
            
            if (!(order_name && order_name !== undefined && order_name.length > 0)) {
                const order_res = await api.post('/Market/CreateOrder');
                if(!order_res.data.succeeded) throw(order_res.data.message);
                order_name = order_res.data.data.name;
                localStorage.setItem('order_name', order_name);
            }

            const { data } = await api.post('/Market/AddProductFromCart', {
                data: {
                    order_name: order_name,
                    item: {
                        type: type,
                        name: item_name
                    }
                }
            });
            if(!data.succeeded) throw(data.message);
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    const removeItemFromCart = async (item_name: string, type: string) => {
        try {
            let order_name = localStorage.getItem('order_name');
            if (!order_name) return;

            const { data } = await api.post('/Market/RemoveProductFromCart', {
                data: {
                    order_name: order_name,
                    item: {
                        type: type,
                        name: item_name
                    }
                }
            });
            if(!data.succeeded) throw(data.message);
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        addItemToCart,
        removeItemFromCart,
        loading
    }
}