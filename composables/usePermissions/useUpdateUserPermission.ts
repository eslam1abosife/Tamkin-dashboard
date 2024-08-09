import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const updateUserPermission = async (state) => {
        try {
            const res = await api.post('/Team/set/UpdatePermission', {
                data: {
                    member_email: state.email,
                    permissions: state.permissions
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            $toast(`User permissions saved successfully!`, {
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
        updateUserPermission,
        loading,
    }
}