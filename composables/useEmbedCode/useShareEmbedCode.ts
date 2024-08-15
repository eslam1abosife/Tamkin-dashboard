import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const shareEmbedCode = async (state) => {
        try {
            const res = await api.post('/Apps/ShareEmbededCode', {
                data:{
                    app_name: state.appName,
                    email: state.email
                }
            });

            if(!res.data.succeeded) throw(res.data.message);

        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        shareEmbedCode,
        loading
    }
}