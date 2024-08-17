import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();


  const changeAccountPassword = async (data: Object) => {
    try {
      const res = await api.post('/Account/ChangePassword', {
        data: data
      });

      if(!res.data.succeeded) throw(res.data.message);

      // if(!res.data.succeeded) {
      //   $toast(res.data.message, {
      //     "theme": "colored",
      //     "type": "error",
      //     "autoClose": 4000,
      //     "dangerouslyHTMLString": true
      //   })
      //   throw(res.data.message);
      // }
    }catch (error) {
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
    changeAccountPassword,
    loading
  }

}