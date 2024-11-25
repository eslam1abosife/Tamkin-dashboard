import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const userStore = useUserStore();
  const errorFields = ref([]);

  const changeAccountPassword = async (data: Object) => {
    try {
      const res = await api.post('/Account/ChangePassword', {
        data: data
      });

      if (!res.data.succeeded) throw(res.data.message);

      if (res.data.succeeded) {
        userStore.setToken(res.data.data.sid);
        $toast('Password updated successfully', { hideIn: 3000 });
      }

    } catch (error) {
      errorFields.value = [];

      if (typeof error === 'string') {
        // console.log(errorFields)
        if (error === 'Invalid password') {
          errorFields.value.push({ field: 'old_password', message: error });
        } else if (error === 'select New Password Strong') {
          errorFields.value.push({ field: 'password', message: error });
        } else {
          errorFields.value.push({ field: 'general', message: 'There is something wrong' });
        }
      } else {
        errorFields.value.push({ field: 'general', message: 'There is something wrong' });
      }

      throw error;
    }
  };

  return {
    changeAccountPassword,
    loading,
    errorFields,
  };
}
