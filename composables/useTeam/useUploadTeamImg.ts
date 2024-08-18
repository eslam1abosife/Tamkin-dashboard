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
                    sid: userStore.token ?? null
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            if (res.data.succeeded) {
                $toast.success('Uploaded successfully!', {
                    theme: 'colored',
                    autoClose: 4000,
                    dangerouslyHTMLString: true
                });
            }

        } catch (error) {
            
            // throw typeof(error) === 'string' ? error : 'There is something wrong';
            $toast(`Oops!<br/>${  typeof(error) === 'string' ? error : 'There is something wrong' }`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
              });
              throw error;
        }
    };

    return {
        uploadTeamImg,
        loading
    }
}