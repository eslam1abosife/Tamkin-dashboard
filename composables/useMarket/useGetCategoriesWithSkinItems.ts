import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const categoriesWithSkinItems = ref([]);
const characters = ref([]);

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

    
    const getFullDataFormated = async () => {
        try {
            const { data } = await api.post('/Market/GetFullDataFormated', {"AppName": "default"});
            if(!data.succeeded) throw(data.message);
            categoriesWithSkinItems.value = data.data.categories;
            characters.value = data.data.charachters;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };



    return {
        getCategoriesWithSkinItems,
        getFullDataFormated,
        categoriesWithSkinItems,
        characters,
        loading
    }
}