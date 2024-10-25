import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const profileStore = useProfileStore()

    const getCapacity = async (state) => {
        try {
            const res = await api.post('/Team/Get/TeamCapacityLimit', {
             
            });
          
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getCapacity,
        loading
    }
}