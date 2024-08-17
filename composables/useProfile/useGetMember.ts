import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const member = ref([]);

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();


  const getMember = async () => {
    try {
      const res = await api.post('/Team/Get/CurrentTeam');

      if(!res.data.succeeded) throw(res.data.message);
      member.value = res.data.data;
    }catch (error) {
      throw error;
    }
  }

  return {
    getMember,
    member,
    loading
  }
}