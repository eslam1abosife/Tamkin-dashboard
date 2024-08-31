import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api, loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const checkuserInTeam = async (email) => {
        try {
            const res = await api.post('/Tamkin Agency Team/Get', {
                "where": {
                    "member_email": email,
                    // "is_active": 1
                }
            });
            
            if (!res.data.succeeded) throw new Error(res.data.message);

            // Ensure res.data.data is an array
            const result = Array.isArray(res.data.data) ? res.data.data : [];
            return result;
        } catch (error) {
            $toast.error(typeof(error) === 'string' ? error : 'There is something wrong');
            throw error; // Propagate the error to be handled in the component
        }
    };

    return {
        checkuserInTeam,
        loading
    };
}
