import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const apps = ref(null);

    const getInviteApps = async (state) => {
        if(!state.agency) {
            throw Error('Curr Team Id not exists!')
        }
        if(!state.email) {
            throw Error('member email not exists!')
        }
        try {
            const res = await api.post('/Tamkin Team Member App/Get', {
                data: {
                    tamkin_agency: state.agency,
                    member_email: state.email
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            apps.value = res.data.data;
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
        apps,
        getInviteApps,
    }
}