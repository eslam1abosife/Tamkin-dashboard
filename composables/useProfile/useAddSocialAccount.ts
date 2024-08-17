import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const addSocialAccount = async (data: Object, currentTab: string) => {
    let url = '';

    if (currentTab === 'personal') {
      url = '/Profile/AddSocialAccountMember';
    }else if (currentTab === 'company') {
      url = '/Profile/AddSocialAccountCompany';
    }
    try {

      const res = await api.post(url, {
        data: data
      })
    }catch (error) {

      throw error;
    }
  };

}