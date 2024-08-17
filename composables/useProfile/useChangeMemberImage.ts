import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const userStore = useUserStore();

  const changeMemberImage = async (imageFile: Object) => {
    try {
      const res = await api.post('/Profile/ChangeImageMember', {
        files: {
          img: imageFile
        }
      },
      {
        headers: {
          sid: userStore.user.sid
        }
      }
    );
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
    changeMemberImage,
    loading
  }
}