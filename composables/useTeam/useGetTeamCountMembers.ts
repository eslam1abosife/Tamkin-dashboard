import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const countMembers = ref(null);

    const getTeamCountMembers = async (currTeamId) => {
        try {
            if(!currTeamId) {
                throw Error('Curr Team Id not exists!')
            }
            const res = await api.post('/Team/GET/CountMembers', {
                "Where":{
                    "agency": currTeamId
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            countMembers.value = res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        countMembers,
        getTeamCountMembers,
    }
}