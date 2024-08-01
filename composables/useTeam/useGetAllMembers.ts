import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const teamMembers = ref(null);

    const getAllTeamMember = async (currTeamId) => {
        if(!currTeamId) {
            throw Error('Curr Team Id not exists!')
        }
        try {
            const res = await api.post('/Team/GET/AllMembers', {
                "Where":{
                    "agency": currTeamId
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            teamMembers.value = res.data.data;
        } catch (error) {
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'There is something wrong'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            })
            throw error;
        }
    };

    return {
        teamMembers,
        getAllTeamMember,
    }
}