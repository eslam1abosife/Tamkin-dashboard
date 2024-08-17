import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const inviteApp = async (state) => {
        try {
            const res = await api.post('/Team/post/inviteApp', {
                data: {
                    app_name: state.app_name,
                    email: state.email,
                    agency: state.agency
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        inviteApp,
        loading,
    }
}