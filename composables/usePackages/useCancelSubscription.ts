import { useProfileStore } from './../../stores/profile';
import { useApi } from "@/composables/useApi";

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const profileStore = useProfileStore()
const codeStatus = ref('')
const messageStatus = ref('')
    const cancelPackage = async (id,app) => {
        try {
            const res = await api.post('/Billing/CancelSubscription',{
            "invoice_name":id,
    "app_name":app
            });
            codeStatus.value = res.data.statusCode
            messageStatus.value = res.data.message
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        cancelPackage,
        loading,
        messageStatus,
        codeStatus
    }
}