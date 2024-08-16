import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const members = ref([]);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getMembers = async (state) => {
        try {
            const data = {};
            if(state.appName) {
                data.app = state.appName
            }
            const res = await api.post('/Tamkin Agent/Get', {
                data
            });
            if(!res.data.succeeded) throw(res.data.message);
            members.value = res.data.data;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getMembers,
        members,
        loading
    }
}