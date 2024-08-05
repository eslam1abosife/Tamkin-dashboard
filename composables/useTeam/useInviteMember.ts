import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const inviteMember = async (onSuccess) => {
        try {
            const res = await api.post('/Team/invite', {
                Data: {
                    team_name: state.firstName + ' ' + state.lastName,
                    first_name: state.firstName,
                    last_name: state.lastName,
                    member_email: state.email,
                    agency: state.currTeamId
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            if(onSuccess) {
                onSuccess();
            }
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
        inviteMember,
        loading
    }
}