import { useApi } from "@/composables/useApi";

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const mysiteStore = useMySiteStore()
const codeStatus = ref('')
const messageStatus = ref('')
    const getPackage = async (name) => {
        try {
            const res = await api.post('/Packages/GetPackage',{
                "data":{
                    "name":name
                }
            });
            codeStatus.value = res.data.statusCode
            messageStatus.value = res.data.message
            mysiteStore.levelsTraffic = res.data.price_roles.sort((a, b) => a.idx - b.idx).map(t=>{
                return {
                    id:t.name,
                    name:t.title
                }
            })  
           
            return res.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getPackage,
        loading,
        messageStatus,
        codeStatus
    }
}