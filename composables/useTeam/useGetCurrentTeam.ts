import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const currTeam = ref(null);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getCurrentTeam = async (sid = null) => {
        try {
            const config = {};
            if (sid) {
                config.headers = { sid: sid };
            }
            const res = await api.post('/Team/Get/CurrentAgency', null , config);
            if(!res.data.succeeded) throw(res.data.message);
            currTeam.value = res.data.data;
        } catch (error) {
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'The user not assigned to team'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            })
            throw error;
        }
    };

    return {
        getCurrentTeam,
        currTeam
    }
}