import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  let sendSuccessfully = ref();

  const contactSales = async (data: Object) => {
    try {
      const res = await api.post('/Contact Request/Add', data);

      if (!res.data.succeeded) throw(res.data.message);

      sendSuccessfully.value = res.data.succeeded ? 1 : 0;

    } catch (error) {
      throw error;
    }
  };

  return {
    contactSales,
    sendSuccessfully,
  };
}
