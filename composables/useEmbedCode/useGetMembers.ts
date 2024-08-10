import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const members = ref([]);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getMembers = async (state) => {
        try {
            const res = await api.post('/mySite/Get/MemberApp', {
                data: {
                    app: state.appName
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            members.value = res.data.data;
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
        getMembers,
        members,
        loading
    }
}