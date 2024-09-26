import { useApi } from "@/composables/useApi";

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const profileStore = useProfileStore()
const codeStatus = ref('')
const messageStatus = ref('')
    const getPakcagesAddSite = async () => {
        try {
            const res = await api.post('/Packages/GetAddSitePagePackages',{
       
            });
            codeStatus.value = res.data.statusCode
            messageStatus.value = res.data.message
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getPakcagesAddSite,
        loading,
        messageStatus,
        codeStatus
    }
}