import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const inviteAppsForMember = ref(null);

    const getMemberInviteApps = async (state) => {
        if(!state.agency) {
            throw Error('Curr Team Id not exists!')
        }
        if(!state.email) {
            throw Error('email not exists!')
        }
        try {
            const res = await api.post('/Tamkin Team Member App/Get', {
                "Where":{
                    tamkin_agency: state.agency ,
                    member_email: state.email
                }
                ,"PgNo":0
                ,"PgSize":1000
            });
            if(!res.data.succeeded) throw(res.data.message);
            inviteAppsForMember.value = res.data.data;
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
        inviteAppsForMember,
        getMemberInviteApps,
    }
}