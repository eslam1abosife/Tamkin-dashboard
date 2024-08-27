import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const checkuserInTeam = async (email) => {
        try {
            const res = await api.post('/Tamkin Agency Team/Get', {
                "where":{
                    "member_email":email,
                    "is_active":1
                }
            });
            if(!res.data.succeeded) throw(res.data.message);


            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        checkuserInTeam,
        loading
    }
}