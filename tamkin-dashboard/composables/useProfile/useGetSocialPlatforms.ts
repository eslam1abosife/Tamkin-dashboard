import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const socialPlatforms = ref([]);

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();



  const getSocialPlatforms = async () => {
    try {
      const res = await api.post('/social platform/Get', {
        "PgNo":0,
        "PgSize":5000
      })

      if(!res.data.succeeded) throw(res.data.message);
      socialPlatforms.value = res.data.data;
    }catch (error) {
      throw error;
    }
  }

  return {
    getSocialPlatforms,
    socialPlatforms,
    loading
  }

}