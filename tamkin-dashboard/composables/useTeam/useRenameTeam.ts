import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();

    const renameTeam = async (teamName: String) => {
        try {
            const res = await api.post('/Team/set/Rename', {
                data: {
                    name: teamName
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        renameTeam,
        loading
    }
}