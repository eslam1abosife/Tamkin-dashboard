import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const setAppCharacter = async (Character: string, AppName: string = 'all') => {
        try {
            const res = await api.post('/Market/SetAppCharacter', {
                AppName,  
                Character
            });
            // if(!res.data.succeeded) throw(res.data.message);
            return res.data.succeeded;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    const setCharacterOptions = async (items: Array<any>, character: string, AppName: string = 'all') => {
        try {
            const res = await api.post('/Market/SetAppCharacterOption', {
                AppName,
                character,
                items
            });
            // if(!res.data.succeeded) throw(res.data.message);
            return res.data.succeeded;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        setAppCharacter,
        setCharacterOptions,
        loading
    }
}