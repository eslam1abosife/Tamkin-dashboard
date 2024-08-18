import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api , loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const userStore = useUserStore();
  const score = ref(0);

  const getProfileCompleteScore = async (currentTab: string) => {
    let url = '';
    if (currentTab === 'personal') {
      url = '/Profile/MemberCompleteProfile';
    }else if (currentTab === 'company') {
      url = '/Profile/CompanyCompleteProfile';
    }

    if (!url) return;


    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const res = await api.post(url, {}, {
        headers: {
          // sid: userStore.user.sid ?? user.sid
          sid: userStore.token
        }
      });
      score.value = res.data.data;
    }catch (error) {
      throw error;
    }
  }

  return {
    getProfileCompleteScore,
    score,
    loading
  }
}