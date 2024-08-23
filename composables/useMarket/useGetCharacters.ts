import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


const characters = ref([]);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getCharacters = async () => {
        try {
            const res = await api.post('/Market/Get/Character', {
                where: {},
                PgNo: 0,
                PgSize: 100
            });
            if(!res.data.succeeded) throw(res.data.message);
            characters.value = res.data.data;
            return res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getCharacters,
        characters,
        loading
    }
}