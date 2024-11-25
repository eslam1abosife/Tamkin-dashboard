import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const userStore = useUserStore();

    const removeMemberImage = async () => {
        try {
            const res = await api.post('/Profile/RemoveImageMember', {}, {
                headers: {
                    sid: userStore.token
                }
            } );

            if(!res.data.succeeded) throw(res.data.message);

        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        removeMemberImage,
        loading
    }
}