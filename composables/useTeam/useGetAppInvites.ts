import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const apps = ref([]);
const defaultApp = ref(null);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getInviteApps = async (state) => {
        if(!state.agency) {
            console.log("state", state);
            throw Error('Curr Team Id not exists!');
        }
        try {
            const res = await api.post('/Tamkin Agency Apps/Get', {
                where: {
                    agency: state.agency,
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            apps.value = res.data.data;
            defaultApp.value = res.data.data.find(ele => ele.isdefault) || res.data.data?.[0]
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        apps,
        defaultApp,
        getInviteApps,
        loading
    }
}