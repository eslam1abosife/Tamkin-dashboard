import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const inviteApp = async (state) => {
        try {
            const res = await api.post('/Team/post/inviteApp', {
                Data: {
                    app_name: state.app_name,
                    email: state.email,
                    agency: state.agency
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
        } catch (error) {
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'There is something wrong'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            });
            throw error;
        }
    };

    return {
        inviteApp,
        loading,
    }
}