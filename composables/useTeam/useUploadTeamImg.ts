import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const userStore = useUserStore();

    const uploadTeamImg = async (imgFile) => {
        try {
            const res = await api.post('/Team/post/UploadImage', {
                files: {
                    img: imgFile
                }
            }, {
                headers: {
                    sid: userStore.user.sid ?? null
                }
            });
            if(!res.data.succeeded) throw(res.data.message);

        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        uploadTeamImg,
        loading
    }
}