import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const memberData = ref(null);

    const inviteMember = async (state, onSuccess = null) => {
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
            memberData.value = res.data.data;
            if(onSuccess) {
                onSuccess();
            }
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        inviteMember,
        loading,
        memberData
    }
}