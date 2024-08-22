import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function () {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const userStore = useUserStore();
const profileStore = useProfileStore()
const {currentTab : profiletab} = storeToRefs(profileStore)
  const addSocialAccount = async (data: Object, currentTab: string) => {
    let url = '';

    if (profileStore.currentTab === 'personal') {
      url = '/Profile/UpdateSocialAccountMember';
    } else if (profileStore.currentTab === 'company') {
      url = '/Profile/updateSocialAccounts';
    }
// alert(profiletab.value)
    console.log(data);

    console.log('here composable');

    if (!url) return;

    try {

      const res = await api.post(url,
      data
     
        , {

          headers: {
            sid: userStore.token
          }
        })
    } catch (error) {

      throw error;
    }
  };


  return {
    addSocialAccount,
    loading
  }

}