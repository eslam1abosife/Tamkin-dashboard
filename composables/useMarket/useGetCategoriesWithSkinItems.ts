import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const categoriesWithSkinItems = ref([]);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getCategoriesWithSkinItems = async () => {
        try {
            const res = await api.post('/Market/Get/SkinItem', {
                where: {},
                PgNo: 0,
                PgSize: 100
            });
            if(!res.data.succeeded) throw(res.data.message);
            categoriesWithSkinItems.value = res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getCategoriesWithSkinItems,
        categoriesWithSkinItems,
        loading
    }
}