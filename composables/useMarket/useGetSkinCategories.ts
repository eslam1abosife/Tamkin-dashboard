import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const skinCategories = ref([]);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getSkinCategories = async () => {
        try {
            const res = await api.post('/Skin Category/Get', {
                where: {},
                PgNo: 0,
                PgSize: 100
            });
            if(!res.data.succeeded) throw(res.data.message);
            skinCategories.value = res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getSkinCategories,
        skinCategories,
        loading
    }
}