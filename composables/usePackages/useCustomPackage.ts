import { useProfileStore } from './../../stores/profile';
import { useApi } from "@/composables/useApi";

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const profileStore = useProfileStore()
const codeStatus = ref('')
const messageStatus = ref('')
    const sendCustomPackage = async (state) => {
        try {
            const res = await api.post('/Tamkin Custom Package/Add',{
              ...state,
              agency:profileStore.company.name
            });
            codeStatus.value = res.data.statusCode
            messageStatus.value = res.data.message
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        sendCustomPackage,
        loading,
        messageStatus,
        codeStatus
    }
}