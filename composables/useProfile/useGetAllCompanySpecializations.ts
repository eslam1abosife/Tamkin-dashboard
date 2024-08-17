import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const companySpecializations = ref([]);

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const getAllCompanySpecializations = async () => {
    try {
      const res = await api.post('/Company Specialization/Get', {
        "PgNo":0,
        "PgSize":5000
      });

      if(!res.data.succeeded) throw(res.data.message);
      companySpecializations.value = res.data.data;
    }catch (error) {
      throw error;
    }
  }

  return {
    getAllCompanySpecializations,
    companySpecializations,
    loading
  }
}