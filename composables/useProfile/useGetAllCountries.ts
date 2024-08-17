import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const countries = ref([]);

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const getCountries = async () => {
    try {
      const res = await api.post('/Country/Get', {
        "PgNo":0, 
        "PgSize":5000
      });

      if(!res.data.succeeded) throw(res.data.message);
      countries.value = res.data.data;
      // foreach through countries and add "https://tamkin.app/" to image url at beginning

      countries.value.forEach((country: any) => {
        country.image = "https://tamkin.app/" + country.image;
      })

    }catch (error) {
      throw error;
    }
  }

  return {
    getCountries,
    countries,
    loading
  }
}