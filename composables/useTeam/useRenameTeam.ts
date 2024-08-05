import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function(teamName) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const renameTeam = async () => {
        try {
            const res = await api.post('/Team/set/Rename', {
                data: {
                    name: teamName
                }
            });
            if(!res.data.succeeded) throw(res.data.message);

            $toast(`your team renamed successfully!`, {
                "theme": "colored",
                "type": "success",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            });
        } catch (error) {
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'There is something wrong'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            })
        }
    };

    return {
        renameTeam,
        loading
    }
}