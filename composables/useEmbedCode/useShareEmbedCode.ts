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

            $toast(`the code shared successfully!`, {
                "theme": "colored",
                "type": "success",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            });
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
        shareEmbedCode,
        loading
    }
}