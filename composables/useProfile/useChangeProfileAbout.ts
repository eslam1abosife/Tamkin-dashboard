import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();


  const changeProfileAbout = async (data: Object) => {
    try {

      const res = await api.post('/Profile/ChangeAbout', {
        data: data
      });

    }catch (error) {

      throw error;
    }
  };


  return {
    changeProfileAbout,
    loading
  }
}