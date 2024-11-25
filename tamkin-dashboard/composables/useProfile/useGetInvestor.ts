import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();
const profileStore = useProfileStore()
  const getInvestor = async () => {
    try {
      let data = {
        PgSize:1
      }
      const res = await api.post('/Profile/GetInvestor',data);
      profileStore.investor = Object.keys(res.data.data).length !== 0 ? res.data.data : {};
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
    getInvestor,
    loading
  }

}