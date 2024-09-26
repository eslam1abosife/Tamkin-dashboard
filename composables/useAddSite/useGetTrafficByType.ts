import { useApi } from "@/composables/useApi";

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const addSiteStore = useAddSiteStore()
const codeStatus = ref('')
const messageStatus = ref('')
    const getTrafficType = async (name) => {
        try {
            const res = await api.post('/Packages/GetPackage',{
                "data":{
                    "name":name
                }
            });
            codeStatus.value = res.data.statusCode
            messageStatus.value = res.data.message
            addSiteStore.levelsTraffic = res.data.price_roles.sort((a, b) => a.idx - b.idx).map(t=>{
                return {
                    id:t.name,
                    name:t.title
                }
            })  
           
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getTrafficType,
        loading,
        messageStatus,
        codeStatus
    }
}