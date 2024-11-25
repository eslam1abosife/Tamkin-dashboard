// composables/useGetAllCompanySpecializations.ts
import { useApi } from "@/composables/useApi";
import { ref } from "vue";

export default function useGetAllCompanySpecializations() {
  const companySpecializations = ref([]);
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();

  // Fetch function that returns a Promise
  const fetchCompanySpecializations = async () => {
    try {
      const res = await api.post('/Company Specialization/Get', {
        PgNo: 0,
        PgSize: 5000,
      });

      if (!res.data.succeeded) throw new Error(res.data.message);
      companySpecializations.value = res.data.data;

      return companySpecializations.value;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchCompanySpecializations,  // For use with useFetch
    companySpecializations,
    loading,
  };
}
