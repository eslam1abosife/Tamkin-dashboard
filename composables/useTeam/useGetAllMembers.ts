import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const teamMembers = ref([]);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getAllTeamMember = async (currTeamId, pageNo = 1, PgSize= 10) => {
        if(!currTeamId) {
            throw Error('Curr Team Id not exists!')
        }
        try {
            const res = await api.post('/Tamkin Agency Team/Get', {
                "Where":{
                    "agency": currTeamId
                },
                "PgNo": 0,
                "PgSize": 100
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