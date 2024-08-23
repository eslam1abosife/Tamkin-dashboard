import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const userStore = useUserStore();


  const changeCompanyInfo = async (data: Object) => {

    try {

      const res = await api.post('/Profile/ChangeinfoCompany', {
        data: data
      },
      {
        headers: {
          sid: userStore.token ?? null
        }
      }
    )

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
    changeCompanyInfo,
    loading
  }

}